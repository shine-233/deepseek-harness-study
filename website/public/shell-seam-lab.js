/**
 * shell-seam 实验页的渲染层。模型在 shell-seam-model.js；本文件只画返回值。
 * 请求/Spec 对照表、来源徽章和退出码标记面板读的是同一次解析。
 */

import {
  makeFeedback,
  renderBoundary,
  renderOracle,
  requireElements,
  writeText, installDeclaredIcons, installScrollProgress } from './study-lab-kit.js'
import { installStoryRail } from './study-lab-story.js'
import { installInputReset } from './study-lab-kit.js'
import { readStateFromHash, writeStateToHash } from './study-lab-state.js'
import {
  SHELL_EXECUTORS,
  buildShellSeamModel,
  evaluateShellSeamOracle,
} from './shell-seam-model.js'
import { revealOnScroll } from './study-lab-reveal.js'
import { installPredictionGate } from './study-lab-gate.js'
import { createConceptLadder } from './study-lab-ladder.js'
import { replayRungs } from './study-lab-trace-ladder.js'
import { icon } from './study-lab-icons.js'
import { installThemeToggle } from './study-lab-theme.js'

const SOURCE_LABELS = {
  'request': '请求显式给出',
  'config-default': '配置补默认',
  'clamped': '被 maxTimeoutMs 封顶',
  'executor-stamp': '执行器盖章',
  'executor-inert': '惰性透传（undefined）',
}

/** 进 URL hash 的输入字段；枚举与 HTML 里的选项一一对应。 */
const SHELL_STATE_SCHEMA = {
  executor: { enum: [...SHELL_EXECUTORS] },
  workdir: { enum: ['omit', '/custom/dir'] },
  timeoutMs: { enum: ['omit', '300000', '900000'] },
  policy: { enum: ['omit', 'read-only', 'danger-full-access'] },
  exitStatus: { enum: ['0', '1', '127', 'SIGTERM'] },
}

function renderTable(model, body) {
  body.replaceChildren()
  for (const entry of model.entries) {
    const row = document.createElement('tr')
    const cells = [
      entry.key,
      entry.value === null ? 'undefined' : typeof entry.value === 'object' ? JSON.stringify(entry.value) : String(entry.value),
      SOURCE_LABELS[entry.source] ?? entry.source,
      entry.note ?? '—',
    ]
    cells.forEach((cell, index) => {
      const td = document.createElement('td')
      if (index === 2) {
        const chip = document.createElement('span')
        chip.className = 'ss-source is-' + entry.source
        writeText(chip, cell)
        td.append(chip)
      } else if (index === 1) {
        const code = document.createElement('code')
        writeText(code, cell)
        td.append(code)
      } else {
        writeText(td, cell)
      }
      row.append(td)
    })
    body.append(row)
  }
}

/** parseExitStatus 契约：`[exit code: N]` / `[killed by signal: X]` 标记的往返。 */
function renderExitPanel(codeInput, output, pill) {
  const raw = codeInput.value.trim()
  if (raw.toLowerCase() === 'sigterm') {
    const text = 'command terminated\n[killed by signal: SIGTERM]'
    writeText(output, text)
    writeText(pill, 'killed by signal: SIGTERM')
    return
  }
  const code = Number(raw)
  if (!Number.isInteger(code) || code < 0 || code > 255) {
    writeText(output, '—')
    writeText(pill, '输入 0–255 的整数或 SIGTERM')
    return
  }
  const text = 'all tests passed\n[exit code: ' + String(code) + ']'
  writeText(output, text)
  writeText(pill, code === 0 ? 'exit 0（成功，不进 pill 也成立）' : '[exit code: ' + String(code) + ']')
}

function initializePage() {
  const elements = {
    form: document.querySelector('#shell-form'),
    executor: document.querySelector('#shell-executor'),
    workdir: document.querySelector('#shell-workdir'),
    timeout: document.querySelector('#shell-timeout'),
    policy: document.querySelector('#shell-policy'),
    feedback: document.querySelector('#shell-feedback'),
    tableBody: document.querySelector('#seam-table-body'),
    tableCaption: document.querySelector('#seam-table-caption'),
    oracleList: document.querySelector('#oracle-list'),
    canProve: document.querySelector('#can-prove-list'),
    cannotProve: document.querySelector('#cannot-prove-list'),
    filled: document.querySelector('#metric-filled'),
    missing: document.querySelector('#metric-missing'),
    clamped: document.querySelector('#metric-clamped'),
    policyOut: document.querySelector('#metric-policy'),
    oracle: document.querySelector('#metric-oracle'),
    exitCode: document.querySelector('#exit-code'),
    exitOutput: document.querySelector('#exit-output'),
    exitPill: document.querySelector('#exit-pill'),
    copyLink: document.querySelector('#copy-state-link'),
    resetInputs: document.querySelector('#reset-inputs'),
  }
  if (!requireElements(elements)) return
  const setFeedback = makeFeedback(elements.feedback)

  for (const executor of SHELL_EXECUTORS) {
    const option = document.createElement('option')
    option.value = executor
    writeText(option, executor)
    elements.executor.append(option)
  }

  // 状态链接：hash 里带 #state= 时先还原输入，再按还原后的值渲染。
  // 坏状态按默认输入处理，与其它实验页一致。
  const restored = readStateFromHash(location.hash, SHELL_STATE_SCHEMA)
  if (restored !== null && restored.ok) {
    elements.executor.value = restored.value.executor
    elements.workdir.value = restored.value.workdir
    elements.timeout.value = restored.value.timeoutMs
    elements.policy.value = restored.value.policy
    elements.exitCode.value = restored.value.exitStatus
  }

  // 输入写进 URL hash：复制状态链接、刷新、换设备都能带回同一份输入。
  // replaceState 在 file:// 或沙箱环境下可能被拒；写不进去时页面行为不变。
  const persistState = () => {
    try {
      const nextHash = writeStateToHash(location.hash, {
        executor: elements.executor.value,
        workdir: elements.workdir.value,
        timeoutMs: elements.timeout.value,
        policy: elements.policy.value,
        exitStatus: elements.exitCode.value,
      }, SHELL_STATE_SCHEMA)
      history.replaceState(null, '', nextHash)
    } catch {
      // 保持安静：hash 写不进去时页面行为不变。
    }
  }

  const rebuild = () => {
    try {
      const request = { command: 'npm test' }
      if (elements.workdir.value !== 'omit') request.workdir = elements.workdir.value
      if (elements.timeout.value !== 'omit') request.timeoutMs = Number(elements.timeout.value)
      if (elements.policy.value !== 'omit') request.sandboxPolicy = { mode: elements.policy.value, root: '/workspace' }

      const model = buildShellSeamModel({ executor: elements.executor.value, request })
      const verdict = evaluateShellSeamOracle(model)

      renderTable(model, elements.tableBody)
      writeText(elements.tableCaption, model.executorLabel + '：resolve 之后 Spec 的 '
        + String(model.observations.filledKeys) + ' 个键')
      renderOracle(verdict, elements.oracleList, elements.oracle)
      renderBoundary(model, elements.canProve, elements.cannotProve)

      writeText(elements.filled, String(model.observations.filledKeys))
      writeText(elements.missing, String(model.observations.missingRequiredKeys.length))
      writeText(elements.clamped, model.observations.clampedFields.join('、') || '无')
      writeText(elements.policyOut, String(model.spec.sandboxPolicy ?? 'undefined'))
      setFeedback('已解析：Spec 有 ' + String(model.observations.filledKeys) + ' 个键、缺口 '
        + String(model.observations.missingRequiredKeys.length) + ' 个；run/start 只收这份 Spec。',
      'success')
      renderExitPanel(elements.exitCode, elements.exitOutput, elements.exitPill)
      persistState()
    } catch (error) {
      console.error('[shell-seam] rebuild failed', error)
      setFeedback(error instanceof Error ? error.message : '输入无效。', 'error')
    }
  }

  installInputReset(elements.resetInputs, elements.form, { onReset: rebuild })

  elements.form.addEventListener('submit', (event) => {
    event.preventDefault()
    rebuild()
  })
  for (const control of [elements.executor, elements.workdir, elements.timeout, elements.policy]) {
    control.addEventListener('change', rebuild)
  }
  elements.exitCode.addEventListener('input', () => renderExitPanel(elements.exitCode, elements.exitOutput, elements.exitPill))

  rebuild()

  elements.copyLink.addEventListener('click', async () => {
    persistState()
    try {
      await navigator.clipboard.writeText(location.href)
      setFeedback('已复制当前实验状态的链接；粘贴到地址栏就能回到同一份输入。', 'success')
    } catch {
      setFeedback('复制失败：手动复制地址栏里的整条链接即可，状态就在 #state= 后面。', 'error')
    }
  })
}

if (typeof document !== 'undefined') {
  initializePage()
  installStoryRail()
  installDeclaredIcons()
  installScrollProgress()
  installThemeToggle(document.getElementById('theme-toggle'), name => icon(name, 15))

  const ladderRoot = document.getElementById('concept-ladder-root')
  if (ladderRoot !== null) {
    // 模型产出 spec 条目 {key,value,source,note}：source 就是「值从哪来」的相位。
    const trace = input => buildShellSeamModel(input).entries.map((entry, index) => ({
      lane: entry.key,
      phase: entry.source,
      index,
      detail: `${entry.key} = ${typeof entry.value === 'object' ? JSON.stringify(entry.value) : String(entry.value)}${entry.note ? `（${entry.note}）` : ''}`,
    }))
    createConceptLadder(ladderRoot, {
      storageKey: 'shell-seam-ladder',
      rungs: replayRungs([
        {
          title: '只给命令，其余由执行器配置补齐',
          text: '请求里只有 command：workdir、超时、输出上限都标着 config-default。非沙箱执行器的 sandboxPolicy 字段存在但不起作用——原样携带 undefined。',
          traces: [{ id: 'local', label: 'bash-local', steps: trace({ executor: 'bash-local', request: { command: 'ls -la' } }), focusPhases: ['config-default'] }],
        },
        {
          title: '沙箱执行器在 resolve 里盖默认章',
          text: '同一个请求交给 bash-sandbox：sandboxPolicy 被盖上具体档位与根目录的默认章。调用方没写的安全字段，必须由执行器显式补上。',
          traces: [{ id: 'stamped', label: 'bash-sandbox', steps: trace({ executor: 'bash-sandbox', request: { command: 'ls -la' } }), focusPhases: ['executor-stamp'] }],
        },
        {
          title: '每个键都说得出「值从哪来」',
          text: '请求显式给出的键标 request；超限的超时被封顶并注明 clamped。解析是纯函数：同一请求永远得到同一条规格。',
          traces: [{
            id: 'explicit',
            label: '全显式 + 超时封顶',
            steps: trace({ executor: 'bash-local', request: { command: 'ls -la', workdir: '/repo/app', timeoutMs: 999999, stdoutMaxBytes: 4096 } }),
            focusPhases: ['request', 'clamped'],
          }],
        },
      ]),
    })
  }

  installPredictionGate({
    form: document.getElementById('prediction-gate'),
    locked: document.getElementById('gated-controls'),
    feedback: document.getElementById('gate-feedback'),
    correct: 'stamped-by-executor',
    explain: {
      'stamped-by-executor': '正确。bash-sandbox 覆写 resolve 给 sandboxPolicy 盖默认章——这就是「同一 Service Definition 换 Provider」的落点。',
      'rejected': '上游不会拒绝：缺省策略不是错误，而是由沙箱执行器的 resolve 补齐。',
      'passed-null': 'null 只出现在非沙箱执行器上（惰性透传）；沙箱执行器的 Spec 里这个键一定有值。',
    },
  })
}
