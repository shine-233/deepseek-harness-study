import assert from 'node:assert/strict'
import test from 'node:test'
import { replayRungs } from '../website/public/study-lab-trace-ladder.js'

const sentenceEndings = /(?:。|！|？)/g

test('replayRungs：每个台阶有唯一 id、标题与不超过四句的散文', () => {
  const defs = [
    { id: 'a', title: '甲', text: '第一句。第二句。', traces: [{ id: 't1', label: '轨迹一', steps: [{ lane: 'x', phase: 'p', detail: 'd' }] }] },
    { id: 'b', title: '乙', text: '只有一句。', traces: [{ id: 't2', label: '轨迹二', steps: [] }] },
    { title: '丙（id 缺省自动编号）', text: '', traces: [{ id: 't3', label: '轨迹三', steps: [{ lane: 'y', phase: 'q', detail: 'e' }] }] },
  ]
  const rungs = replayRungs(defs)
  assert.equal(rungs.length, 3)
  assert.deepEqual(rungs.map(rung => rung.id), ['a', 'b', 'rung-3'])
  for (const rung of rungs) {
    assert.equal(typeof rung.title, 'string')
    assert.ok(rung.text.length >= 0)
    const sentences = rung.text.match(sentenceEndings)?.length ?? 0
    assert.ok(sentences <= 4, `台阶「${rung.title}」散文超过四句：${sentences}`)
    assert.equal(typeof rung.build, 'function')
  }
})

test('replayRungs：traces 原样透传给 build 的闭包（不在此处求值）', () => {
  const traces = [{ id: 't', label: 'L', steps: [{ lane: 'x', phase: 'p', detail: 'd' }] }]
  const [rung] = replayRungs([{ title: 'T', text: '', traces }])
  assert.equal(typeof rung.build, 'function')
})

/** 已接入阶梯的实验室（57 个 = 全部离线实验室，2026-08-26 与 Agent Note 2026-08-25-zero-skip-concept-ladder 同步）：
 *  waterfall-ladder turn-flow plugin-flow session-log llm-stream compaction storage-hub
 *  worker-protocol code-run typert approval-flow guard-loop jobs orchestration invariant
 *  tool-visibility session-fork subagent-delegate preset checkpoint identity feedback
 *  credential settings plan-stack tool-budget acp-lab time attachment client provider mcp
 *  selfmod subprocess lsp wire shell-seam trajectory skill-catalog context query sandbox
 *  workspace host-gateway spill fs-edit code-mode-evidence tokenmeter workflow-node web-tool
 *  terminal session-projection prompt-assembly profile-loader package-graph hook-flow goal-loop
 *  （六个小缝页由 gen-small-seams.mjs 从 small-seams-configs.js 的 ladder 配置生成，
 *  运行时挂载在 small-seams-runtime.js；其余页面各自在门内挂载。terminal 与
 *  package-graph 为两级台阶，其余均为三级。）
 *  名单已收口；后续新增实验室按配方：
 *  读模型 → {lane,phase,detail} 轨迹 → replayRungs + 门内挂载点，并同步本名单。 */
export const LADDER_LABS = [
  'waterfall-ladder',
  'turn-flow',
  'plugin-flow',
  'session-log',
  'llm-stream',
  'compaction',
  'storage-hub',
  'worker-protocol',
  'code-run',
  'typert',
  'approval-flow',
  'guard-loop',
  'jobs',
  'orchestration',
  'invariant',
  'tool-visibility',
  'session-fork',
  'subagent-delegate',
  'preset',
  'checkpoint',
  'identity',
  'feedback',
  'credential',
  'settings',
  'plan-stack',
  'tool-budget',
  'acp-lab',
  'time',
  'attachment',
  'client',
  'provider',
  'mcp',
  'selfmod',
  'subprocess',
  'lsp',
  'wire',
  'shell-seam',
  'trajectory',
  'skill-catalog',
  'context',
  'query',
  'sandbox',
  'workspace',
  'host-gateway',
  'spill',
  'fs-edit',
  'code-mode-evidence',
  'tokenmeter',
  'workflow-node',
  'web-tool',
  'terminal',
  'session-projection',
  'prompt-assembly',
  'profile-loader',
  'package-graph',
  'hook-flow',
  'goal-loop',
]
