#!/usr/bin/env node

/**
 * Keep the first-time learning route actionable rather than merely present.
 *
 * This is a content contract for the study repository. It checks that the
 * entry pages tell a reader what to do and how to bound the conclusion. It
 * does not check whether a reader understood the page or whether DSH runs.
 */

import { existsSync, readFileSync } from 'node:fs'
import { join, resolve } from 'node:path'

const repositoryRoot = resolve(import.meta.dirname, '..')

/**
 * Required markers for the pages that make up the beginner route.
 *
 * The markers intentionally describe reader-visible promises rather than
 * generated HTML classes. Visual redesigns may change markup without making
 * the learning route incomplete.
 */
export const BEGINNER_LEARNING_CONTRACTS = [
  {
    source: 'SITE-HOME.md',
    label: 'Pages 首页',
    markers: ['先选一条', 'dsh-route-grid', 'dsh-stuck-card', '证据边界', '不用下载'],
  },
  {
    source: 'START-HERE.md',
    label: 'GitHub 网页入口',
    markers: ['你现在只做三步', '第一次阅读不需要下载源码', '我完全不知道 DSH 是什么', '不想选择'],
  },
  {
    source: 'study/00-开始这里.md',
    label: '第一课',
    markers: ['先记住六个词', '先看一个贯穿示例', '这一页读完算什么', '还没有证明'],
  },
  {
    source: 'study/25-从首页到第一次产出的动手任务单.md',
    label: '15 分钟任务单',
    markers: ['先看这张任务卡', '你会产出', '这一步不证明什么', '第五步：复制这张学习记录'],
  },
  {
    source: 'study/27-工具预算与插件责任决策卡.md',
    label: '工具预算决策卡',
    markers: ['运行时已经注册的工具', '模型呈现', '执行策略允许的工具调用', '不能误解成'],
  },
  {
    source: 'study/28-最小插件示例与学习检查.md',
    label: '最小插件课程',
    markers: [
      '先看这张练习卡',
      'run demo',
      'pnpm --dir study-examples/minimal-observer-plugin run test',
      'pnpm --dir study-examples/minimal-observer-plugin run lint',
      '这一步不证明什么',
    ],
  },
  {
    source: 'study/29-学习仓库的质量检查与审阅.md',
    label: '质量检查课程',
    markers: ['先看这张课程卡', '最小插件 test', 'study:agent-review', 'Agent 审阅', '这一步不证明什么'],
  },
  {
    source: 'study/31-学习工具箱.md',
    label: '学习工具箱',
    markers: ['懒人入口', 'study:quick-check', '--example', '--deep', '--runtime', '不会启动 DSH'],
  },
  {
    source: 'study/32-源码学习项目的渐进式设计.md',
    label: '教材设计说明',
    markers: ['先说结论：渐进式不是把内容删薄', '你会得到什么', '卡住时先看这三种情况', '这一步没有证明什么'],
  },
  {
    source: 'study-examples/README.zh.md',
    label: '学习示例目录',
    markers: ['现有示例', '确定性检查', 'demo', '不能证明什么', '怎样使用一个示例'],
  },
  {
    source: 'study-examples/minimal-observer-plugin/README.zh.md',
    label: '最小观察插件 README',
    markers: ['这个示例能证明什么', 'Node 单元测试', '本地 lint', '尚未证明', '三步阅读和运行'],
  },
]

/**
 * Inspect the reader-facing learning contracts.
 *
 * @param {string} root - Repository root containing the contract sources.
 * @param {typeof BEGINNER_LEARNING_CONTRACTS} [contracts] - Injectable contracts for tests.
 * @returns {string[]} Human-readable missing-source and missing-marker errors.
 */
export function inspectStudyLearningContracts(root = repositoryRoot, contracts = BEGINNER_LEARNING_CONTRACTS) {
  const errors = []

  for (const contract of contracts) {
    const sourcePath = join(root, contract.source)
    if (!existsSync(sourcePath)) {
      errors.push('缺少学习契约页面：' + contract.source)
      continue
    }

    const text = readFileSync(sourcePath, 'utf8')
    for (const marker of contract.markers) {
      if (!text.includes(marker)) errors.push(contract.label + '缺少学习契约标记：' + marker)
    }
  }

  return errors
}

function main() {
  const errors = inspectStudyLearningContracts()
  if (errors.length === 0) {
    console.log('学习体验契约检查：通过（' + BEGINNER_LEARNING_CONTRACTS.length + ' 个入口页面）')
    return 0
  }

  console.error('学习体验契约检查：失败（' + errors.length + ' 个问题）')
  for (const error of errors) console.error('  ' + error)
  return 1
}

if (import.meta.main) process.exitCode = main()
