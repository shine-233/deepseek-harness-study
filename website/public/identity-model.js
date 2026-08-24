/**
 * 匿名用户 id（anonymous-user-id）的纯教学模型：基于上游
 * packages/identity/anonymous-user-id/src/index.ts 顶注（基线 aa6c361a）。
 *
 * 核心规则：
 * - id 是随机 UUID，以裸行形式持久在 harness home 的 `.anonymous-user-id` 里。
 * - 绝不从主机名、网络地址、git remote 或任何可识别来源派生——隐私是设计前提。
 * - 作用域是 harness home 而不是机器：共享同一个 $DSH_HOME 的进程报同一个 id；
 *   删掉文件，下次启动铸造全新身份。
 * - 结果按解析后的文件路径记忆：一个进程只碰一次磁盘；
 *   运行中删掉文件，本进程仍用记住的 id，直到下一次启动。
 *
 * 教学模型不碰真实文件系统：「文件是否存在」与「进程是否已记忆」是输入旋钮。
 */

export const ID_LANES = Object.freeze(['调用方', '身份缝', 'harness home'])

function resolveInput(input = {}) {
  if (input.home !== undefined && !['home-a', 'home-b'].includes(input.home)) {
    throw new RangeError('未知 harness home：' + String(input.home))
  }
  if (input.fileExists !== undefined && typeof input.fileExists !== 'boolean') throw new TypeError('fileExists 必须是布尔值')
  if (input.sameProcess !== undefined && typeof input.sameProcess !== 'boolean') throw new TypeError('sameProcess 必须是布尔值')
  return {
    home: input.home ?? 'home-a',
    fileExists: input.fileExists !== false,
    sameProcess: input.sameProcess === true,
  }
}

/** 稳定伪 UUID：由输入确定性派生，保证教学模型可重放。 */
const mintId = seed => 'id-' + seed + '-' + String(
  [...seed].reduce((hash, ch) => ((hash * 31 + ch.charCodeAt(0)) | 0), 7).toString(16).padStart(8, '0'))

/**
 * 推演一次身份读取。
 */
export function buildIdentityModel(input = {}) {
  const resolved = resolveInput(input)
  const { home, fileExists, sameProcess } = resolved
  const homePath = home === 'home-b' ? '/other/dsh' : '~/.dsh'
  const filePath = homePath + '/.anonymous-user-id'

  const steps = []
  const push = (laneIdx, phase, detail, extra = {}) => {
    steps.push({ index: steps.length, lane: ID_LANES[laneIdx], phase, detail, ...extra })
  }

  const memoSeed = 'memo:' + filePath
  const diskSeed = 'disk:' + filePath

  if (fileExists) {
    const id = mintId(sameProcess ? memoSeed : diskSeed)
    push(0, 'read', '请求匿名 id。')
    if (sameProcess) {
      push(1, 'memo-hit', '本进程已经读过一次磁盘：直接返回记忆中的 id——运行期间不再碰文件系统。',
        { id })
    } else {
      push(1, 'disk-read', '新进程首次读取：从 ' + filePath + ' 读到裸行 id。', { id })
    }
    push(2, 'stored', '文件保持原样；同一 home 下的所有进程报告同一个 id。', { id })
    return finish(resolved, steps, id, '沿用既有身份')
  }

  // 文件不存在：铸造新身份。
  const freshId = mintId('fresh:' + filePath)
  if (sameProcess) {
    const remembered = mintId(memoSeed)
    push(0, 'read', '请求匿名 id。')
    push(1, 'memo-hit', '本进程已把 id 记忆在内存里：文件被外部删除也不影响本次读数。', { id: remembered })
    push(2, 'file-gone-note', '磁盘上的文件已不在；下一次启动才会铸造并写入全新身份。')
    return finish(resolved, steps, remembered, '运行中删除不影响本进程')
  }

  push(0, 'read', '请求匿名 id。')
  push(1, 'mint', '文件缺失：铸造全新的随机 UUID 并写回 ' + filePath + '。',
    { id: freshId })
  push(2, 'fresh-identity', '全新身份生效——与删除前的任何 id 都无关：身份跟着 home 走，不跟机器走。',
    { id: freshId })
  return finish(resolved, steps, freshId, '文件缺失：铸造全新身份')
}

function finish(resolved, steps, id, shape) {
  return {
    input: { ...resolved },
    lanes: ID_LANES,
    steps,
    observations: {
      id,
      home: resolved.home,
      forkShape: shape,
      neverDerivedFromMachine: true,
    },
    canProve: [
      'id 是随机 UUID，与主机名、网络地址、git remote 无关。',
      '作用域是 harness home：共享 $DSH_HOME 的进程看到同一个 id。',
      '删除文件会在下次启动时铸造全新身份；运行中的进程不受影响（结果已记忆）。',
      '同一组输入重建出同一条时间线（确定性）。',
    ],
    cannotProve: [
      '不能证明真实 UUID 的随机源质量。',
      '不能证明真实文件系统的权限位或并发写入行为。',
      '不能证明遥测侧对 id 的具体用法。',
      '不能用本页回答「这个 id 能否跨 home 关联」——设计上不能。',
    ],
  }
}

/** 独立校验。 */
export function evaluateIdentityOracle(model) {
  if (typeof model !== 'object' || model === null) throw new TypeError('model must be an object')
  if (!Array.isArray(model.steps)) throw new TypeError('model.steps must be an array')
  const checks = []
  const add = (id, label, pass, expected, actual) => checks.push({ id, label, pass, expected, actual })

  const rebuilt = buildIdentityModel(model.input)
  add('ID_DETERMINISTIC', '同一输入重复推演得到同一条时间线',
    JSON.stringify(rebuilt.steps) === JSON.stringify(model.steps),
    '两次构建完全一致',
    JSON.stringify(rebuilt.steps) === JSON.stringify(model.steps) ? '一致' : '不一致')

  const o = model.observations
  add('ID_NOT_MACHINE_DERIVED', 'id 不携带任何机器指纹',
    !String(o.id).includes('host') && !String(o.id).includes(o.home),
    '随机形 id', String(o.id))

  const freshMinted = model.steps.some(s => s.phase === 'fresh-identity')
  add('ID_DELETE_MINTS_FRESH', '文件缺失且无记忆时铸造全新身份',
    model.input.fileExists || (!model.input.fileExists && !model.input.sameProcess) === freshMinted,
    model.input.fileExists ? '沿用' : '铸造',
    freshMinted ? '已铸造' : '沿用')

  const memoHit = model.steps.some(s => s.phase === 'memo-hit')
  add('ID_PROCESS_MEMO', '同一进程只碰一次磁盘',
    model.input.sameProcess ? memoHit : true,
    model.input.sameProcess ? '命中记忆' : '不适用',
    memoHit ? '命中记忆' : '走了磁盘')

  return { pass: checks.every(c => c.pass), checks }
}
