/**
 * skill-catalog 实验页的渲染层。模型在 skill-catalog-model.js；本文件只画返回值。
 * 信封预览、digest 与探测结局读的是同一次计算；「上一轮 digest」由上一轮输入
 * 的 digest 在页面内存里接续（不进 URL、不落存储）。
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
  SKILL_NAMES,
  SKILL_TOOL_VISIBILITY,
  buildSkillCatalogModel,
  evaluateSkillCatalogOracle,
} from './skill-catalog-model.js'
import { revealOnScroll } from './study-lab-reveal.js'
import { installPredictionGate } from './study-lab-gate.js'
import { createConceptLadder } from './study-lab-ladder.js'
import { replayRungs } from './study-lab-trace-ladder.js'
import { icon } from './study-lab-icons.js'
import { installThemeToggle } from './study-lab-theme.js'

const TRANSITION_LABELS = {
  initial: '首次发布：这轮 pre-step 追加了初始目录消息',
  replacement: '替换：digest 变了，追加完整的新信封',
  retired: '退役：目录清空，显式告知不要再用旧名字',
  unchanged: '未变：digest 相同，不追加任何消息',
  omitted: '本轮省略（原因见下）',
  'unchanged-empty': '空且此前也无目录：无需墓碑',
}

/** 进 URL hash 的输入字段。「上一轮 digest」是页内时序，刻意不进链接（见文件头）。 */
const SKILL_STATE_SCHEMA = {
  commit: 'boolean',
  release: 'boolean',
  legacy: 'boolean',
  visibility: { enum: [...SKILL_TOOL_VISIBILITY] },
  description: 'string',
  probe: 'string',
}

function initializePage() {
  const elements = {
    form: document.querySelector('#skill-form'),
    commitPresent: document.querySelector('#skill-commit'),
    releasePresent: document.querySelector('#skill-release'),
    legacyPresent: document.querySelector('#skill-legacy'),
    description: document.querySelector('#skill-desc'),
    visibility: document.querySelector('#skill-visibility'),
    probe: document.querySelector('#skill-probe'),
    feedback: document.querySelector('#skill-feedback'),
    envelope: document.querySelector('#sc-envelope'),
    envelopeNote: document.querySelector('#sc-envelope-note'),
    transitionOut: document.querySelector('#metric-transition'),
    digestOut: document.querySelector('#metric-digest'),
    countOut: document.querySelector('#metric-count'),
    probeOut: document.querySelector('#metric-probe'),
    omitOut: document.querySelector('#metric-omit'),
    oracleList: document.querySelector('#oracle-list'),
    canProve: document.querySelector('#can-prove-list'),
    cannotProve: document.querySelector('#cannot-prove-list'),
    oracle: document.querySelector('#metric-oracle'),
    copyLink: document.querySelector('#copy-state-link'),
    resetInputs: document.querySelector('#reset-inputs'),
  }
  if (!requireElements(elements)) return
  const setFeedback = makeFeedback(elements.feedback)

  for (const option of SKILL_TOOL_VISIBILITY) {
    const node = document.createElement('option')
    node.value = option
    writeText(node, option)
    elements.visibility.append(node)
  }
  for (const name of [...SKILL_NAMES, 'nonexistent']) {
    const node = document.createElement('option')
    node.value = name
    writeText(node, name)
    elements.probe.append(node)
  }

  // 状态链接：hash 里带 #state= 时先还原输入，再按还原后的值渲染。
  const restored = readStateFromHash(location.hash, SKILL_STATE_SCHEMA)
  if (restored !== null && restored.ok) {
    elements.commitPresent.checked = restored.value.commit
    elements.releasePresent.checked = restored.value.release
    elements.legacyPresent.checked = restored.value.legacy
    elements.visibility.value = restored.value.visibility
    elements.description.value = restored.value.description
    elements.probe.value = restored.value.probe
  }

  // 输入写进 URL hash：复制状态链接、刷新都能带回同一份输入。previousDigest 是页内
  // 时序，不进链接——发出去的链接回到「首次发布」视角，与文件头的边界声明一致。
  const persistState = () => {
    try {
      const nextHash = writeStateToHash(location.hash, {
        commit: elements.commitPresent.checked,
        release: elements.releasePresent.checked,
        legacy: elements.legacyPresent.checked,
        visibility: elements.visibility.value,
        description: elements.description.value,
        probe: elements.probe.value,
      }, SKILL_STATE_SCHEMA)
      history.replaceState(null, '', nextHash)
    } catch {
      // 保持安静：hash 写不进去时页面行为不变。
    }
  }

  let previousDigest = null

  const rebuild = () => {
    try {
      const present = [
        ...(elements.commitPresent.checked ? ['commit-helper'] : []),
        ...(elements.releasePresent.checked ? ['release-notes'] : []),
        ...(elements.legacyPresent.checked ? ['legacy-migrate'] : []),
      ]
      const model = buildSkillCatalogModel({
        present,
        toolVisibility: elements.visibility.value,
        descriptionOverride: elements.description.value,
        previousDigest,
        probe: elements.probe.value === '' ? null : elements.probe.value,
      })
      const verdict = evaluateSkillCatalogOracle(model)

      if (model.envelope !== null) {
        elements.envelope.hidden = false
        writeText(elements.envelope, model.envelope)
      } else {
        elements.envelope.hidden = true
        writeText(elements.envelope, '')
      }
      writeText(elements.envelopeNote, model.omitReason ?? '目录按 <available_skills> 信封渲染：只有名字和截断后的描述。')
      writeText(elements.transitionOut, TRANSITION_LABELS[model.transition] ?? model.transition)
      writeText(elements.digestOut, model.digest.slice(0, 12) + '…')
      writeText(elements.countOut, `${String(model.observations.publishedCount)} / ${String(model.observations.snapshotSize)}`)
      writeText(elements.probeOut, model.probe.name === null ? '—' : `${model.probe.name}: ${model.probe.detail}`)
      writeText(elements.omitOut, model.omitReason ?? '无——满足发布条件')

      renderOracle(verdict, elements.oracleList, elements.oracle)
      renderBoundary(model, elements.canProve, elements.cannotProve)

      // 推进「上一轮」：本轮已发布的 digest 成为下一轮比较基线；省略轮不改变基线。
      if (model.transition !== 'omitted' && model.entries.length > 0) previousDigest = model.digest
      if (model.transition === 'retired') previousDigest = null

      setFeedback('目录视图已重算：' + (TRANSITION_LABELS[model.transition] ?? model.transition) + '。', 'success')
      persistState()
    } catch (error) {
      console.error('[skill-catalog] rebuild failed', error)
      setFeedback(error instanceof Error ? error.message : '输入无效。', 'error')
    }
  }

  installInputReset(elements.resetInputs, elements.form, { onReset: () => { previousDigest = null; rebuild() } })

  elements.form.addEventListener('submit', (event) => {
    event.preventDefault()
    rebuild()
  })
  for (const control of [elements.commitPresent, elements.releasePresent, elements.legacyPresent]) {
    control.addEventListener('change', rebuild)
  }
  for (const control of [elements.description, elements.visibility, elements.probe]) {
    control.addEventListener('input', rebuild)
    control.addEventListener('change', rebuild)
  }

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
    // 模型没有 steps：把「快照 → 过滤 → digest 判定」枚举成轨迹，文字引用模型字段。
    const skillTrace = input => {
      const model = buildSkillCatalogModel(input)
      const steps = [
        { lane: '目录', phase: 'snapshot', index: 0, detail: `快照共 ${String(model.observations.snapshotSize)} 个技能条目：只有 name 与截断后的 description。` },
        { lane: '目录', phase: 'filter', index: 1, detail: `可被模型调用的 ${String(model.observations.publishedCount)} 个进入 <available_skills>；其余只占快照位。` },
      ]
      if (model.transition === 'omitted') {
        steps.push({ lane: '发布', phase: 'omitted', index: 2, detail: `${model.omitReason}——整份目录本轮不发布。` })
      } else if (model.transition === 'retired') {
        steps.push({ lane: '发布', phase: 'retired', index: 2, detail: '目录清空后发布退休信封：明确告诉模型旧技能名不要再用了。' })
      } else if (model.transition === 'replacement') {
        steps.push({ lane: '发布', phase: 'replacement', index: 2, detail: `digest 变化（新值 ${model.digest.slice(0, 10)}…）：新信封整体替换旧目录。` })
      } else if (model.transition === 'initial') {
        steps.push({ lane: '发布', phase: 'initial', index: 2, detail: `首版信封随 system-reminder 注入；digest=${model.digest.slice(0, 10)}…` })
      } else {
        steps.push({ lane: '发布', phase: 'unchanged', index: 2, detail: 'digest 未变：本轮不重复注入目录。' })
      }
      return steps
    }
    createConceptLadder(ladderRoot, {
      storageKey: 'skill-catalog-ladder',
      rungs: replayRungs([
        {
          title: '首次发布：信封里只有名字和一句话简介',
          text: '可调用的技能以 name + 截断 description 进 <available_skills>，随 system-reminder 注入请求。技能正文、路径、whenToUse 一律不出现。',
          traces: [{ id: 'initial', label: '首版信封', steps: skillTrace({ descriptionOverride: '', previousDigest: null }) }],
        },
        {
          title: 'digest：改一个字就是新目录',
          text: 'digest 由排序后的 [name, description] 对算出。变化时用新信封整体替换旧目录——不存在增量补丁。',
          traces: [{ id: 'replacement', label: '描述改动后', steps: skillTrace({ descriptionOverride: '', previousDigest: 'old-digest' }), focusPhases: ['replacement'] }],
        },
        {
          title: '省略与退休：不发也是明确的决定',
          text: 'skill 工具被遮蔽时整份目录省略并给出原因；技能清空后则发退休信封，明确告诉模型旧名字作废。',
          traces: [
            { id: 'omitted', label: '工具被遮蔽', steps: skillTrace({ toolVisibility: 'shadowed', descriptionOverride: '', previousDigest: null }), focusPhases: ['omitted'] },
            { id: 'retired', label: '清空退休', steps: skillTrace({ present: [], previousDigest: 'old-digest', descriptionOverride: '' }), focusPhases: ['retired'] },
          ],
        },
      ]),
    })
  }

  installPredictionGate({
    form: document.getElementById('prediction-gate'),
    locked: document.getElementById('gated-controls'),
    feedback: document.getElementById('gate-feedback'),
    correct: 'summary-only',
    explain: {
      'summary-only': '正确。目录只含 name 和截断后的 description；正文要等模型精确调用 skill 工具才加载——这就是渐进加载。',
      'full-body': '把全部正文塞进每轮提示词正是这个设计要避免的事：上下文成本会随技能数量线性膨胀。',
      'no-entry': '完全不提会让模型错过可用的技能；一行摘要就是为此存在的最小提示。',
    },
  })
}
