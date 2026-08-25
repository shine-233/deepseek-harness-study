/**
 * 时间线播放接线门禁：凡是有步进滑杆的实验室，都必须提供播放按钮与速度档位，
 * 并由 bindAutoAdvance 统一驱动——不允许「有的页能播、有的页只能手点」。
 *
 * 这条规则来自对标杆教学站的对照（GAN Lab 的 slow-motion、TF Playground 的
 * play/pause）：传输控件是学习者的公共词汇，缺一格就多一次重新学习。
 */

import { strict as assert } from 'node:assert'
import { readFileSync } from 'node:fs'
import test from 'node:test'

const PUBLIC_DIR = new URL('../website/public/', import.meta.url)
const read = name => readFileSync(new URL(name, PUBLIC_DIR), 'utf8')

/** 有步进时间线的实验室：页面 id → 控件前缀。 */
const STEPPER_LABS = [
  ['approval-flow', 'af'],
  ['guard-loop', 'gl'],
  ['hook-flow', 'hf'],
  ['jobs', 'jb'],
  ['plugin-flow', 'flow'],
  ['profile-loader', 'replay'],
  ['session-fork', 'sf'],
  ['subagent-delegate', 'sd'],
  ['trajectory', 'traj'],
  ['code-run', 'cr'],
  ['host-gateway', 'hg'],
  ['invariant', 'iv'],
  ['storage-hub', 'sh'],
  ['acp', 'acp'],
]

test('every stepper lab offers a play button and a speed select', () => {
  const offenders = []
  for (const [page, prefix] of STEPPER_LABS) {
    const html = read(`${page}-lab.html`)
    for (const suffix of ['-step', '-play', '-speed']) {
      if (!html.includes(`id="${prefix}${suffix}"`)) {
        offenders.push(`${page}: missing #${prefix}${suffix}`)
      }
    }
  }
  assert.deepEqual(offenders, [], 'a stepper lab is missing playback controls')
})

test('every stepper lab wires playback through the shared engine', () => {
  const offenders = []
  for (const [page, prefix] of STEPPER_LABS) {
    const js = read(`${page}-lab.js`)
    if (!js.includes('bindAutoAdvance(')) offenders.push(`${page}: no bindAutoAdvance call`)
    if (!js.includes(`'${prefix}-play'`)) offenders.push(`${page}: play button not wired by id`)
    if (!js.includes(`'${prefix}-speed'`)) offenders.push(`${page}: speed select not wired by id`)
  }
  assert.deepEqual(offenders, [], 'a stepper lab bypasses the shared playback engine')
})

test('the shared engine honours the motion gate and speed changes restart the beat', () => {
  const kit = read('study-lab-kit.js')
  // 总闸联动：连播计时器注册进 AUTO_ADVANCE_STOPPERS，动效暂停时一并停。
  assert.match(kit, /AUTO_ADVANCE_STOPPERS\.add\(stop\)/)
  // 速度档位：换档时按新速度重启节拍，而不是等旧 interval 自然失效。
  assert.match(kit, /if \(timer !== 0\) start\(\)/)
  // 防重复绑定：自举或手写都不得给同一个按钮挂两套节拍。
  assert.match(kit, /dataset\.wired/)
})
