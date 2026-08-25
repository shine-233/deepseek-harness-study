/**
 * 五个步进实验页的 jsdom 冒烟。
 *
 * 背景：2026-08-23 的加固轮给五个实验室加了时间轴步进器，但当时的验证是手工
 * 点验，没有留下可重放的测试；guard-loop 页随后就发现过「select 值 yes/no 与
 * 模型枚举 on/off 不匹配、页面加载即报错」的接线 bug——正是这类冒烟能抓住的。
 *
 * 本文件把手工点验变成机器可重放的一条规则：
 * 对每个实验室的每一档控件输入，页面重建后不允许出现错误反馈，
 * 且步进滑杆的上界必须等于纯模型按同一输入算出的步骤数减一。
 */

import assert from 'node:assert/strict'
import { test } from 'node:test'
import { readFileSync } from 'node:fs'
import { JSDOM } from 'jsdom'
import { buildApprovalFlowModel } from '../website/public/approval-flow-model.js'
import { buildGuardLoopModel } from '../website/public/guard-loop-model.js'
import { buildSubagentDelegateModel } from '../website/public/subagent-delegate-model.js'
import { buildHookFlowModel } from '../website/public/hook-flow-model.js'
import { buildSessionForkModel } from '../website/public/session-fork-model.js'
import { buildCodeRunModel } from '../website/public/code-run-model.js'
import { buildHostGatewayModel } from '../website/public/host-gateway-model.js'
import { buildInvariantModel } from '../website/public/invariant-model.js'
import { buildStorageModel } from '../website/public/storage-hub-model.js'

const PUBLIC_DIR = new URL('../website/public/', import.meta.url)
const read = name => readFileSync(new URL(name, PUBLIC_DIR), 'utf8')

const LABS = [
  {
    id: 'approval-flow',
    page: 'approval-flow-lab.html',
    script: 'approval-flow-lab.js',
    feedback: '#af-feedback',
    step: '#af-step',
    caption: '#af-step-caption',
    selects: {
      policy: ['ask', 'never'],
      responder: ['ui-answerer', 'none'],
      decision: ['allow', 'deny'],
      abort: ['live', 'pre-aborted'],
    },
    ranges: {},
    expectedSteps: input => buildApprovalFlowModel(input).steps.length,
    modelInput: picked => ({
      policy: picked.policy,
      responder: picked.responder,
      decision: picked.decision,
      abort: picked.abort,
    }),
  },
  {
    id: 'guard-loop',
    page: 'guard-loop-lab.html',
    script: 'guard-loop-lab.js',
    feedback: '#gl-feedback',
    step: '#gl-step',
    caption: '#gl-step-caption',
    selects: {
      guard: ['on', 'off'],
      'reset-mode': ['none', 'user-interjection', 'key-reorder', 'value-change'],
    },
    // attempts 的两端各取一档，中间交给模型测试的全网格覆盖。
    ranges: { attempts: [1, 8, 12] },
    expectedSteps: input => buildGuardLoopModel(input).steps.length,
    modelInput: picked => ({
      attempts: Number(picked.attempts),
      guard: picked.guard,
      resetMode: picked['reset-mode'],
    }),
  },
  {
    id: 'subagent-delegate',
    page: 'subagent-delegate-lab.html',
    script: 'subagent-delegate-lab.js',
    feedback: '#sd-feedback',
    step: '#sd-step',
    caption: '#sd-step-caption',
    selects: {
      depth: ['0', '1', '2', '3'],
      outcome: ['report', 'fail'],
    },
    ranges: {},
    expectedSteps: input => buildSubagentDelegateModel(input).steps.length,
    modelInput: picked => ({
      parentDepth: Number(picked.depth),
      outcome: picked.outcome,
    }),
  },
  {
    id: 'hook-flow',
    page: 'hook-flow-lab.html',
    script: 'hook-flow-lab.js',
    feedback: '#hook-feedback',
    step: '#hf-step',
    caption: '#hf-step-caption',
    selects: {
      behavior: ['call-next', 'return-direct'],
      verdict: ['allow', 'deny'],
    },
    ranges: {},
    expectedSteps: input => buildHookFlowModel(input).steps.length,
    modelInput: picked => ({ behavior: picked.behavior, verdict: picked.verdict }),
  },
  {
    id: 'session-fork',
    page: 'session-fork-lab.html',
    script: 'session-fork-lab.js',
    feedback: '#sf-feedback',
    step: '#sf-step',
    caption: '#sf-step-caption',
    selects: {
      crash: ['complete', 'crash-mid-tool'],
      fork: ['no-fork', 'fork'],
    },
    ranges: {},
    expectedSteps: input => buildSessionForkModel(input).steps.length,
    modelInput: picked => ({ crash: picked.crash, fork: picked.fork }),
  },
  {
    id: 'code-run',
    page: 'code-run-lab.html',
    script: 'code-run-lab.js',
    feedback: '#code-run-feedback',
    step: '#cr-step',
    caption: '#cr-step-caption',
    selects: {
      'code-run-scenario': ['success', 'exception', 'timeout', 'abort', 'worker-exit', 'invalid-output', 'output-limit'],
      'code-run-binding': ['tools', 'app_data', '$tools', 'console', '__dsh_main__', 'for'],
    },
    ranges: {},
    expectedSteps: input => buildCodeRunModel(input).steps.length,
    modelInput: picked => ({
      scenario: picked['code-run-scenario'],
      binding: picked['code-run-binding'],
    }),
  },
  {
    id: 'host-gateway',
    page: 'host-gateway-lab.html',
    script: 'host-gateway-lab.js',
    feedback: '#host-feedback',
    step: '#hg-step',
    caption: '#hg-step-caption',
    selects: {
      'host-request': ['inventory-api', 'picker-api', 'spa-doc', 'spa-asset'],
      'host-picker': ['native', 'browse', 'auto'],
    },
    ranges: {},
    expectedSteps: input => buildHostGatewayModel(input).steps.length,
    modelInput: picked => ({
      request: picked['host-request'],
      picker: picked['host-picker'],
    }),
  },
  {
    id: 'invariant',
    page: 'invariant-lab.html',
    script: 'invariant-lab.js',
    feedback: '#invariant-feedback',
    step: '#iv-step',
    caption: '#iv-step-caption',
    selects: {
      'invariant-package': ['@deepseek-ai/dsh-jobs', '@deepseek-ai/dsh-invariants'],
      'invariant-filter': ['unfiltered', 'allowlist-match', 'allowlist-miss', 'blocklist-hit', 'disabled'],
      'invariant-outcome': ['pass', 'violation', 'startup-error'],
    },
    ranges: {},
    expectedSteps: input => buildInvariantModel(input).steps.length,
    modelInput: picked => ({
      packageName: picked['invariant-package'],
      filter: picked['invariant-filter'],
      outcome: picked['invariant-outcome'],
    }),
  },
  {
    id: 'storage-hub',
    page: 'storage-hub-lab.html',
    script: 'storage-hub-lab.js',
    feedback: '#storage-feedback',
    step: '#sh-step',
    caption: '#sh-step-caption',
    selects: {
      'storage-backend': ['json', 'sqlite', 'nofacet'],
      'storage-scenario': ['happy-path', 'version-mismatch', 'malformed-medium', 'double-open', 'closed-unit', 'missing-key-delete'],
      'storage-unit': ['todos_v2', 'Todos-V2'],
    },
    ranges: {},
    expectedSteps: input => buildStorageModel(input).steps.length,
    modelInput: picked => ({
      backend: picked['storage-backend'],
      scenario: picked['storage-scenario'],
      unitName: picked['storage-unit'],
    }),
  },
]

function mountDom(page) {
  const dom = new JSDOM(read(page), {
    url: 'https://localhost/' + page,
    pretendToBeVisual: true,
  })
  global.window = dom.window
  global.document = dom.window.document
  global.location = dom.window.location
  global.history = dom.window.history
  // 渲染层的 requireElements 用裸 HTMLElement 判型；每个 dom 都要用它自己的
  // 构造器覆盖全局，上一个 dom 关闭后旧构造器会让判型失败、初始化静默跳过。
  for (const key of ['HTMLElement', 'HTMLInputElement', 'HTMLSelectElement', 'Element', 'Node', 'SVGElement']) {
    global[key] = dom.window[key]
  }
  return dom
}

function combinations(lab) {
  const dimensions = [
    ...Object.entries(lab.selects).map(([name, values]) => ({ name, kind: 'select', values })),
    ...Object.entries(lab.ranges).map(([name, values]) => ({ name, kind: 'range', values })),
  ]
  let current = [{}]
  for (const dimension of dimensions) {
    const next = []
    for (const base of current) {
      for (const value of dimension.values) next.push({ ...base, [dimension.name]: value })
    }
    current = next
  }
  return current.map(picked => ({ picked, input: lab.modelInput(picked) }))
}

for (const lab of LABS) {
  test(`${lab.id}: 每一档输入重建都不报错，滑杆步数与纯模型一致`, async () => {
    const dom = mountDom(lab.page)
    try {
      await import(`../website/public/${lab.script}?stepper-smoke=${lab.id}`)

      const feedback = dom.window.document.querySelector(lab.feedback)
      const step = dom.window.document.querySelector(lab.step)
      const caption = dom.window.document.querySelector(lab.caption)
      assert.ok(feedback !== null, '缺反馈区')
      assert.ok(step !== null, '缺步进滑杆')

      const cases = combinations(lab)
      assert.ok(cases.length >= 4, `${lab.id}: 输入网格太小（${cases.length}）`)
      for (const { picked, input } of cases) {
        for (const [name, value] of Object.entries(picked)) {
          const control = dom.window.document.getElementById(name)
          assert.ok(control !== null, `${lab.id}: 缺控件 #${name}`)
          control.value = String(value)
        }
        for (const [name] of Object.entries(lab.ranges)) {
          const control = dom.window.document.getElementById(name)
          control.dispatchEvent(new dom.window.Event('input', { bubbles: true }))
        }
        for (const [name] of Object.entries(lab.selects)) {
          const control = dom.window.document.getElementById(name)
          control.dispatchEvent(new dom.window.Event('change', { bubbles: true }))
        }

        assert.notEqual(feedback.dataset.tone, 'error',
          `${lab.id} ${JSON.stringify(picked)}: ${feedback.textContent}`)
        assert.equal(Number(step.max), lab.expectedSteps(input) - 1,
          `${lab.id} ${JSON.stringify(picked)}: 滑杆上界与模型步骤数不一致`)
        assert.ok(caption.textContent.length > 0,
          `${lab.id} ${JSON.stringify(picked)}: 步骤说明为空`)
      }
    } finally {
      dom.window.close()
    }
  })

  test(`${lab.id}: 步进到首末时前后按钮的可用性正确`, async () => {
    const dom = mountDom(lab.page)
    try {
      await import(`../website/public/${lab.script}?stepper-smoke-ends=${lab.id}`)
      const step = dom.window.document.querySelector(lab.step)
      const prev = dom.window.document.querySelector('[id$="-step-prev"]')
      const next = dom.window.document.querySelector('[id$="-step-next"]')
      assert.ok(prev !== null && next !== null, '缺上一步/下一步按钮')

      step.value = step.min
      step.dispatchEvent(new dom.window.Event('input', { bubbles: true }))
      assert.equal(prev.disabled, true, '在第一步时上一步应禁用')

      step.value = step.max
      step.dispatchEvent(new dom.window.Event('input', { bubbles: true }))
      assert.equal(next.disabled, true, '在最后一步时下一步应禁用')
    } finally {
      dom.window.close()
    }
  })
}
