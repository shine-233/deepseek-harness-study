/**
 * SQLite 会话库物理行布局的纯模型。素材逐条来自上游源码
 * packages/session/session-persistence-sqlite/src/（基线 aa6c361a）：
 *
 * - schema.ts：SCHEMA_VERSION = 17；应用 id 固定为 0x44534850——四个字节正好是
 *   ASCII 的 "DSHP"。打开数据库时校验版本与应用 id，不匹配就拒绝。
 * - codec.ts：连续的 assistant/chunk 增量（同 turn、step、index，seq 相邻，
 *   tool-call 还要求同一 call）会被打包成一条物理行：text-chunks /
 *   reasoning-chunks / tool-call-chunks 三种标记，信封只存 seq0 和 time0，
 *   成员各自的时间用增量数组 dt 表示。一条打包行最少 3 个成员，最多 1024 个，
 *   data 列不超过 1048576 UTF-8 字节（超出按二分截短）。打包行的 ignorable
 *   列写 0，作为「这是打包行」的判别标记。
 * - compression.ts：data 序列化后不足 4096 字节直接存文本；达到阈值才走 zstd
 *   （压缩级别 3），且只在真的变小后才替换原文。本页在浏览器里算不出真实
 *   压缩结果，只能标出哪些行会进入压缩分支——这一点如实写在证明边界里。
 * - compression.ts 的 encodeSourceEventSeqs/decodeSourceEventSeqs 是纯整数
 *   运算，这里逐字节移植：首值按 base-128 varint 原样写入，后续值先对
 *   前一个值做差分再 zigzag（前进偶数、后退奇数；输入的有序性由生产方
 *   保证，编码本身不排序），7 位一组、0x80 续位。打包行覆盖的序号列在
 *   本页直接给出真实编码字节，可解码还原。
 *
 * 教学约定：打包与压缩都不改变逻辑事件序列——重放结果和逐条存储完全一致。
 * 没有测量：真实 zstd 输出尺寸、真实写盘耗时、真实并发写入行为。
 */

const ENCODER = new TextEncoder()

export const SQLITE_SCHEMA_VERSION = 17
export const SQLITE_APPLICATION_ID_HEX = '0x44534850'

/** 教学流的小载荷文本：与 buildLogicalChunks 的 small 档共用同一个常量。 */
export const SQLITE_SMALL_TOKEN = 'delta-token-01'

/** 上游保留的应用 id 的 ASCII 形态：44 53 48 50 → "DSHP"。 */
export function applicationIdAscii() {
  return 'DSHP'
}

export const ZSTD_THRESHOLD_BYTES = 4096
export const ZSTD_COMPRESSION_LEVEL = 3
export const MIN_PACKED_ROW_MEMBERS = 3
export const MAX_PACKED_ROW_MEMBERS = 1024
export const MAX_PACKED_DATA_BYTES = 1048576

/** 上游 compression.ts 逐字节移植：排序 seq 列 → varint + zigzag 差分字节。 */
export function encodeSourceEventSeqs(values) {
  const bytes = []
  let previous = 0n
  for (let index = 0; index < values.length; index += 1) {
    const sourceSeq = values[index]
    if (!Number.isSafeInteger(sourceSeq) || sourceSeq < 0) {
      throw new TypeError('sourceEventSeqs must contain non-negative safe integers')
    }
    const value = BigInt(sourceSeq)
    const encoded = index === 0
      ? value
      : value >= previous
        ? (value - previous) * 2n
        : ((previous - value) * 2n) - 1n
    appendVarint(bytes, encoded)
    previous = value
  }
  return Uint8Array.from(bytes)
}

function appendVarint(bytes, value) {
  let remaining = value
  while (remaining >= 0x80n) {
    bytes.push(Number(remaining & 0x7fn) | 0x80)
    remaining >>= 7n
  }
  bytes.push(Number(remaining))
}

/** 上游 decodeSourceEventSeqs 的镜像：编码字节必须能无损还原原序列。 */
export function decodeSourceEventSeqs(bytes) {
  const values = []
  let previous = 0n
  let offset = 0
  const limit = BigInt(Number.MAX_SAFE_INTEGER)
  while (offset < bytes.length) {
    const first = values.length === 0
    const decoded = readVarint(bytes, offset, first ? limit : limit * 2n)
    offset = decoded.offset
    const delta = first
      ? decoded.value
      : (decoded.value & 1n) === 0n
        ? decoded.value / 2n
        : -((decoded.value + 1n) / 2n)
    const value = first ? delta : previous + delta
    if (value < 0n || value > limit) {
      throw new Error('malformed source_event_seqs storage value: decoded seq is out of range')
    }
    values.push(Number(value))
    previous = value
  }
  return values
}

function readVarint(bytes, offset, maxValue) {
  let value = 0n
  let shift = 0n
  while (offset < bytes.length) {
    const byte = bytes[offset]
    // 非规范编码拒绝：shift>0 时低 7 位全零的字节只会出现在截断或补零里，
    // 上游同样把它当 malformed 处理。
    if ((byte & 0x7f) === 0 && shift > 0n) {
      throw new Error('malformed source_event_seqs storage value: non-canonical varint')
    }
    value |= BigInt(byte & 0x7f) << shift
    offset += 1
    if ((byte & 0x80) === 0) {
      // 结尾再补一个全零组只出现在截断或手工拼造里，规范编码总是更短；
      // 中间的全零组是合法的（大跳差分会出现），不能拒。
      if ((byte & 0x7f) === 0 && shift > 0n) {
        throw new Error('malformed source_event_seqs storage value: non-canonical varint')
      }
      if (value > maxValue) throw new Error('malformed source_event_seqs storage value: varint out of range')
      return { value, offset }
    }
    shift += 7n
    if (shift > 56n) throw new Error('malformed source_event_seqs storage value: varint too long')
  }
  throw new Error('malformed source_event_seqs storage value: truncated varint')
}

function toHex(bytes) {
  return Array.from(bytes, byte => byte.toString(16).padStart(2, '0')).join(' ')
}

export const SQLITE_PACK_MODES = Object.freeze(['on', 'off'])
export const SQLITE_PAYLOAD_SIZES = Object.freeze(['small', 'large'])

/** 一段固定的教学流：8 条同 turn 同 step 的文本增量，seq 与时间都排好。 */
function buildLogicalChunks(payloadSize) {
  const text = payloadSize === 'large' ? 'x'.repeat(5200) : SQLITE_SMALL_TOKEN
  const gaps = [12, 9, 15, 8, 11, 10, 14]
  const chunks = []
  for (let index = 0; index < 8; index += 1) {
    chunks.push({
      type: 'assistant/chunk',
      seq: 40 + index,
      time: index === 0 ? 1000 : 1000 + gaps.slice(0, index).reduce((sum, gap) => sum + gap, 0),
      data: {
        turn: 2,
        step: 1,
        chunk: { type: 'text-delta', index: 0, text },
      },
    })
  }
  return chunks
}

function utf8Bytes(value) {
  return ENCODER.encode(value).length
}

/** 上游 packChunkRuns 的教学镜像：把连续同类增量折成一条打包记录。 */
function packRun(run) {
  const first = run[0]
  return {
    kind: 'packed',
    tag: 'text-chunks',
    seq0: first.seq,
    time0: first.time,
    members: run.map(event => event.data.chunk.text),
    dt: run.slice(1).map((event, index) => event.time - run[index].time),
    dataJson: JSON.stringify({
      turn: first.data.turn,
      step: first.data.step,
      index: first.data.chunk.index,
      dt: run.slice(1).map((event, index) => event.time - run[index].time),
      texts: run.map(event => event.data.chunk.text),
    }),
  }
}

function buildPhysicalRows(input) {
  const chunks = buildLogicalChunks(input.payload)
  if (input.packing === 'off') {
    return chunks.map(event => ({
      kind: 'scalar',
      tag: event.type,
      seqCovered: [event.seq],
      dataJson: JSON.stringify(event.data),
    }))
  }
  // 教学流整段连续：8 条折成 1 条打包行（成员数在 3..1024 内）。
  return [packRun(chunks)]
}

/**
 * Mathigon 式参数滑杆的纯函数后端：给定打包行成员数 N，按上游 codec 的
 * 序列化形状（键序 turn/step/index/dt/texts，dt 全部取代表性间隔 12）算出
 * 这条物理行的 data 字节数与压缩分支判定。
 *
 * @param memberCount - 打包行的成员数量，正整数。
 */
export function packedRowFootprint(memberCount) {
  if (!Number.isInteger(memberCount) || memberCount < 1) {
    throw new RangeError('memberCount 必须是正整数：' + String(memberCount))
  }
  const dt = Array.from({ length: memberCount - 1 }, () => 12)
  const texts = Array.from({ length: memberCount }, () => SQLITE_SMALL_TOKEN)
  const dataJson = JSON.stringify({ turn: 2, step: 1, index: 0, dt, texts })
  const dataBytes = utf8Bytes(dataJson)
  return {
    memberCount,
    dtCount: dt.length,
    dataJson,
    dataBytes,
    entersCompressionBranch: dataBytes >= ZSTD_THRESHOLD_BYTES,
    withinMemberBounds: memberCount >= MIN_PACKED_ROW_MEMBERS && memberCount <= MAX_PACKED_ROW_MEMBERS,
    withinDataLimit: dataBytes <= MAX_PACKED_DATA_BYTES,
  }
}

/**
 * 二分查找最小的越过压缩阈值的成员数：返回第一个满足
 * packedRowFootprint(n).entersCompressionBranch 为真的 n；整个范围都不越线时
 * 返回 null。搜索上界是上游的成员数上限。
 */
export function firstCompressionBranchMembers() {
  let low = MIN_PACKED_ROW_MEMBERS
  let high = MAX_PACKED_ROW_MEMBERS
  if (!packedRowFootprint(high).entersCompressionBranch) return null
  while (low < high) {
    const middle = Math.floor((low + high) / 2)
    if (packedRowFootprint(middle).entersCompressionBranch) high = middle
    else low = middle + 1
  }
  return low
}

export function buildSqliteRowModel(input) {
  const packing = SQLITE_PACK_MODES.find(item => item === input.packing)
  if (packing === undefined) throw new RangeError('未知打包开关：' + String(input.packing))
  const payload = SQLITE_PAYLOAD_SIZES.find(item => item === input.payload)
  if (payload === undefined) throw new RangeError('未知载荷规格：' + String(input.payload))

  const normalized = { packing, payload }
  const logical = buildLogicalChunks(normalized.payload)
  const physicalRaw = buildPhysicalRows(normalized)

  const rows = physicalRaw.map((row, rowIndex) => {
    const dataBytes = utf8Bytes(row.dataJson)
    const seqCovered = row.kind === 'packed'
      ? Array.from({ length: row.members.length }, (_, offset) => row.seq0 + offset)
      : row.seqCovered
    return {
      position: rowIndex + 1,
      kind: row.kind,
      tag: row.tag,
      seqLabel: row.kind === 'packed'
        ? `${row.seq0}–${row.seq0 + row.members.length - 1}`
        : String(row.seqCovered[0]),
      seqCovered,
      memberCount: row.kind === 'packed' ? row.members.length : 1,
      dtCount: row.kind === 'packed' ? row.dt.length : 0,
      dataBytes,
      entersCompressionBranch: dataBytes >= ZSTD_THRESHOLD_BYTES,
      ignorable: row.kind === 'packed' ? 0 : null,
      sourceEventSeqsHex: row.kind === 'packed'
        ? toHex(encodeSourceEventSeqs(seqCovered))
        : null,
    }
  })

  const totalLogical = logical.length
  const totalPhysical = rows.length

  return {
    input: { ...normalized },
    schemaVersion: SQLITE_SCHEMA_VERSION,
    applicationIdHex: SQLITE_APPLICATION_ID_HEX,
    applicationIdAscii: applicationIdAscii(),
    zstdThresholdBytes: ZSTD_THRESHOLD_BYTES,
    zstdCompressionLevel: ZSTD_COMPRESSION_LEVEL,
    minPackedMembers: MIN_PACKED_ROW_MEMBERS,
    maxPackedMembers: MAX_PACKED_ROW_MEMBERS,
    maxPackedDataBytes: MAX_PACKED_DATA_BYTES,
    logicalEvents: totalLogical,
    rows,
    observations: {
      logicalEvents: totalLogical,
      physicalRowCount: totalPhysical,
      scalarRowCount: rows.filter(row => row.kind === 'scalar').length,
      packedRowCount: rows.filter(row => row.kind === 'packed').length,
      totalDataBytes: rows.reduce((sum, row) => sum + row.dataBytes, 0),
      compressionCandidates: rows.filter(row => row.entersCompressionBranch).length,
      physicalRatio: `${totalPhysical}/${totalLogical}`,
    },
    canProve: Object.freeze([
      `应用 id 是 ${SQLITE_APPLICATION_ID_HEX}，四个字节就是 ASCII 的 ${applicationIdAscii()}；版本号当前是 ${SQLITE_SCHEMA_VERSION}，不匹配的库文件会被拒绝打开`,
      '连续同类增量折成一条打包行：信封只存 seq0/time0，后续时间由增量数组 dt 还原',
      '一条打包行至少 3 个成员、至多 1024 个，data 不超过 1048576 UTF-8 字节',
      'data 序列化后不足 4096 字节存文本；达到阈值才进 zstd 分支（级别 3），且只在变小后替换',
      '打包行的 ignorable 列写 0，是「这是打包行」的物理判别标记；普通行该列为 NULL',
      'source_event_seqs 按排序差分 + zigzag + base-128 varint 编码：首值原样写入，前进走偶数、后退走奇数，本页给出真实编码字节并可解码还原',
      '打包只是物理形态：覆盖的序号连起来不多不少，重放结果和逐条存储一致',
      '同一输入重建整张布局表得到完全相同的结果（确定性）',
    ]),
    cannotProve: Object.freeze([
      '真实 zstd 的输出尺寸（浏览器里没有 zlib，页面只标注哪几行会进入压缩分支）',
      '真实写盘耗时、页合并与 journal 模式下的性能差异',
      '崩溃恢复时 committed 前缀与可删尾部的判定流程（那在 fork 实验里讲）',
    ]),
  }
}

/**
 * 独立校验：不信任渲染层，自己重建布局并核对序号覆盖、边界常量、
 * 打包收益和压缩分支的判定规则。
 */
export function evaluateSqliteRowOracle(model) {
  const checks = []

  const rebuilt = buildSqliteRowModel(model.input)
  const sameRows = JSON.stringify(rebuilt.rows) === JSON.stringify(model.rows)
  checks.push({
    id: 'SQLITE_DETERMINISTIC',
    label: '同一输入重建出同一张布局表',
    expected: '两次构建完全一致',
    actual: sameRows ? '一致' : '不一致',
    pass: sameRows,
  })

  const expectedSeqs = Array.from({ length: model.logicalEvents }, (_, offset) => 40 + offset)
  const covered = model.rows.flatMap(row => row.seqCovered).sort((a, b) => a - b)
  checks.push({
    id: 'SEQ_COVERAGE',
    label: '物理行覆盖的序号连起来不多不少',
    expected: `${model.logicalEvents} 个序号无缝覆盖`,
    actual: covered.length === expectedSeqs.length && covered.every((value, index) => value === expectedSeqs[index])
      ? '无缝覆盖'
      : '覆盖有缺口或重复',
    pass: covered.length === expectedSeqs.length && covered.every((value, index) => value === expectedSeqs[index]),
  })

  const badBounds = model.rows.filter(row =>
    row.memberCount < 1 || row.memberCount > model.maxPackedMembers || row.dataBytes > model.maxPackedDataBytes)
  checks.push({
    id: 'PHYSICAL_BOUNDS',
    label: '每行成员数与 data 字节数都在上游上限内',
    expected: `成员 ≤ ${model.maxPackedMembers}，data ≤ ${model.maxPackedDataBytes} 字节`,
    actual: badBounds.length === 0 ? '全部在界内' : `${badBounds.length} 行越界`,
    pass: badBounds.length === 0,
  })

  const packingOn = model.input.packing === 'on'
  checks.push({
    id: 'PACKING_EFFECT',
    label: packingOn ? '打包后物理行数严格少于逻辑事件数' : '关闭打包时一行一事',
    expected: packingOn ? '物理行数 < 逻辑事件数' : '物理行数 = 逻辑事件数',
    actual: `${model.observations.physicalRowCount}/${model.observations.logicalEvents}`,
    pass: packingOn
      ? model.observations.physicalRowCount < model.observations.logicalEvents
      : model.observations.physicalRowCount === model.observations.logicalEvents,
  })

  const wrongFlags = model.rows.filter(row =>
    row.entersCompressionBranch !== (row.dataBytes >= model.zstdThresholdBytes))
  checks.push({
    id: 'COMPRESSION_BRANCH_RULE',
    label: `只有 data 达到 ${model.zstdThresholdBytes} 字节的行才会进入压缩分支`,
    expected: '标志位与字节数一一对应',
    actual: wrongFlags.length === 0 ? '全部对应' : `${wrongFlags.length} 行标志错位`,
    pass: wrongFlags.length === 0,
  })

  const packedRows = model.rows.filter(row => row.kind === 'packed')
  const sentinelBad = model.rows.filter(row =>
    row.ignorable !== (row.kind === 'packed' ? 0 : null))
  const roundtripBad = []
  for (const row of packedRows) {
    const bytes = row.sourceEventSeqsHex.split(' ').map(part => Number.parseInt(part, 16))
    const restored = decodeSourceEventSeqs(Uint8Array.from(bytes))
    if (JSON.stringify(restored) !== JSON.stringify(row.seqCovered)) {
      roundtripBad.push(`第 ${row.position} 行解码失真`)
    }
    const firstByte = bytes[0]
    const restBytes = bytes.slice(1)
    if (firstByte !== row.seqCovered[0] || restBytes.some(byte => byte !== 0x02)) {
      roundtripBad.push(`第 ${row.position} 行字节形状不符（首值原样、后续 zigzag 偶数）`)
    }
  }
  checks.push({
    id: 'SOURCE_EVENT_SEQS_ENCODING',
    label: '打包行的 source_event_seqs 编码字节可无损解码，且首值原样、连续前进为单字节偶数',
    expected: packedRows.length === 0 ? '无打包行' : `${packedRows.length} 行编码可还原`,
    actual: packedRows.length === 0
      ? '无打包行'
      : (sentinelBad.length === 0 && roundtripBad.length === 0
        ? `${packedRows.length} 行编码可还原`
        : [...sentinelBad, ...roundtripBad].join('；')),
    pass: sentinelBad.length === 0 && roundtripBad.length === 0,
  })

  return { pass: checks.every(check => check.pass), checks }
}
