/**
 * 轨迹重放阶梯：study-lab-ladder 的第二个通用模拟引擎。
 *
 * 与瀑布链式场景不同，DSH 大多数接缝实验室的模型产出泳道式步骤
 * （{index, lane, phase, detail}）。本引擎把这样一条轨迹画成泳道时间线，
 * 用扫掠播放头逐点亮起步骤——五级台阶共用同一个渲染器，每级换一条
 * 轨迹（或同一轨迹的不同关注相位），一级只讲一个概念。
 *
 * 契约：
 * - `traces`: [{ id, label, steps, focusPhases? }]；steps 元素需要 lane/phase/detail，
 *   泳道按首次出现顺序自动生成。
 * - 返回 { replay, dispose }；读者亲手触发的一次完整重放结束后调用
 *   opts.onReplayed(activeTrace)，实验室用它触发 api.engage()。加载后的自动
 *   预览不回调 onReplayed——阶梯解锁必须来自真实交互，见 study-lab-ladder 的
 *   「一次真实交互才解锁」契约。
 * - reducedMotion 下直接呈现终态；同样只在读者亲手触发时回调。
 */

import { svgElement, writeText } from './study-lab-kit.js'

const STEP_MS_DEFAULT = 420

export function createTraceLadderSim(host, api, opts = {}) {
  const traces = opts.traces ?? []
  if (traces.length === 0) return { replay() {}, dispose() {} }
  const stepMs = opts.stepMs ?? STEP_MS_DEFAULT
  let activeIndex = 0
  let playing = false
  let playedOnce = false
  let interacted = false
  let shownCount = traces[0].steps.length
  let rafStop = null
  let anim = null

  const wrap = document.createElement('div')
  const controls = document.createElement('div')
  controls.className = 'ladder-sim-controls'
  const caption = document.createElement('p')
  caption.className = 'ladder-caption'
  caption.setAttribute('role', 'status')
  caption.setAttribute('aria-live', 'polite')
  host.append(wrap, controls, caption)
  const say = text => writeText(caption, text)

  function buildControls() {
    controls.replaceChildren()
    if (traces.length > 1) {
      for (const [index, trace] of traces.entries()) {
        const chip = document.createElement('button')
        chip.type = 'button'
        chip.className = 'button button-quiet tl-mode' + (index === activeIndex ? ' is-active' : '')
        writeText(chip, trace.label)
        chip.addEventListener('click', () => {
          interacted = true
          activeIndex = index
          shownCount = traces[index].steps.length
          buildControls()
          renderStatic()
          startReplay()
        })
        controls.append(chip)
      }
    }
    const replay = document.createElement('button')
    replay.type = 'button'
    replay.className = 'button button-primary'
    writeText(replay, '重放这条轨迹')
    replay.addEventListener('click', () => {
      interacted = true
      startReplay()
    })
    controls.append(replay)
  }

  function activeTrace() {
    return traces[activeIndex]
  }

  function lanesOf(trace) {
    const lanes = []
    for (const step of trace.steps) {
      if (!lanes.includes(step.lane)) lanes.push(step.lane)
    }
    return lanes
  }

  const laneY = (lanes, lane) => 34 + lanes.indexOf(lane) * 56
  const slotX = (count, i, width) => {
    const left = 96
    const right = 30
    return count <= 1 ? left : left + (i * (width - left - right)) / Math.max(1, count - 1)
  }

  function palette(svg) {
    // 无 DOM 的 Node 冒烟环境里没有 getComputedStyle；回退到令牌默认值。
    const s = typeof getComputedStyle === 'function' ? getComputedStyle(svg) : null
    const read = (name, fallback) => s !== null ? (s.getPropertyValue(name).trim() || fallback) : fallback
    return {
      brand: read('--brand', '#3157c8'),
      bright: read('--brand-bright', '#466fe0'),
      signal: read('--signal', '#d46b3e'),
      deny: read('--deny', '#b03040'),
      allow: read('--allow', '#0f7a52'),
      ink: read('--ink', '#1f2228'),
      muted: read('--muted', '#5b5b66'),
      line: read('--line-strong', 'rgba(60,60,67,.28)'),
    }
  }

  function renderStatic(progressCount) {
    const trace = activeTrace()
    const lanes = lanesOf(trace)
    const count = progressCount ?? trace.steps.length
    shownCount = count
    const width = Math.max(560, host.clientWidth || 760)
    const height = 46 + lanes.length * 56
    const pal = palette(wrap)

    const svg = svgElement('svg', {
      viewBox: `0 0 ${width} ${height}`,
      role: 'img',
      class: 'tl-svg',
      'aria-label': trace.label,
    })
    for (const lane of lanes) {
      const y = laneY(lanes, lane)
      svg.append(
        svgElement('text', { x: 86, y: y + 4, class: '', 'text-anchor': 'end', fill: pal.muted, 'font-size': '12' },
          opts.laneLabels?.[lane] ?? lane),
        svgElement('line', { x1: 96, y1: y, x2: width - 24, y2: y, stroke: pal.line, 'stroke-width': 1 }),
      )
    }

    const focus = new Set(trace.focusPhases ?? [])
    for (const [i, step] of trace.steps.entries()) {
      const lit = i < count
      const cx = slotX(trace.steps.length, i, width)
      const cy = laneY(lanes, step.lane)
      const isFocus = focus.has(step.phase)
      const circle = svgElement('circle', {
        cx, cy,
        r: isFocus ? 9 : 6.5,
        fill: lit ? (isFocus ? pal.signal : pal.brand) : 'none',
        stroke: lit ? (isFocus ? pal.signal : pal.brand) : pal.line,
        'stroke-width': isFocus ? 2.5 : 1.5,
        'fill-opacity': lit ? 0.92 : 0,
      })
      const title = svgElement('title', {}, `${i} ${step.phase}: ${step.detail}`)
      circle.append(title)
      svg.append(circle)
    }

    const done = count >= trace.steps.length
    const head = svgElement('circle', {
      cx: slotX(trace.steps.length, Math.min(count, trace.steps.length) - (done ? 0 : 1), width),
      cy: laneY(lanes, trace.steps[Math.min(count, trace.steps.length) - 1]?.lane ?? lanes[0]),
      r: 4,
      fill: pal.bright,
    })
    head.setAttribute('data-tl-head', done ? 'done' : 'moving')
    svg.append(head)

    wrap.replaceChildren(svg)

    if (count > 0 && count <= trace.steps.length) {
      const last = trace.steps[count - 1]
      say(done
        ? `轨迹完整：${trace.steps.length} 步。${opts.summaryFor ? opts.summaryFor(trace) : ''}`
        : `${last.index ?? count - 1} · ${opts.laneLabels?.[last.lane] ?? last.lane} · ${last.detail}`)
    }
    return { svg, lanes, pal }
  }

  function startReplay() {
    const trace = activeTrace()
    const canAnimate = typeof requestAnimationFrame === 'function'
    if (api.reducedMotion || !canAnimate) {
      renderStatic(trace.steps.length)
      finishReplay()
      return
    }
    playing = true
    let startedAt = 0
    let lastShown = -1
    if (rafStop !== null) rafStop()
    rafStop = api.everyFrame(now => {
      if (!playing) return
      if (startedAt === 0) startedAt = now
      const shown = Math.min(trace.steps.length, Math.floor((now - startedAt) / stepMs) + 1)
      if (shown !== lastShown) {
        lastShown = shown
        renderStatic(shown)
      }
      if (shown >= trace.steps.length) {
        playing = false
        finishReplay()
      }
    })
  }

  function finishReplay() {
    playedOnce = true
    // 自动预览（加载后的 setTimeout 或 reducedMotion 首渲染）不算真实交互，
    // 不能替读者解锁下一级台阶。
    if (interacted && typeof opts.onReplayed === 'function') opts.onReplayed(activeTrace())
  }

  buildControls()
  renderStatic(traces[0].steps.length)
  // 无 rAF 的冒烟环境里不安排自动重放，避免测试结束后还有异步活动。
  const autoplay = typeof requestAnimationFrame === 'function'
    ? setTimeout(() => { if (!playedOnce) startReplay() }, 900)
    : null

  return {
    replay: () => startReplay(),
    dispose() {
      if (autoplay !== null) clearTimeout(autoplay)
      rafStop?.()
      rafStop = null
    },
  }
}

/** 从实验室自己的模型场景拼一组重放台阶；每条 defs 项对应一级。 */
export function replayRungs(defs) {
  return defs.map((def, index) => ({
    id: def.id ?? 'rung-' + String(index + 1),
    title: def.title,
    text: def.text,
    build(host, api) {
      return createTraceLadderSim(host, api, {
        traces: def.traces,
        laneLabels: def.laneLabels,
        stepMs: def.stepMs,
        summaryFor: def.summaryFor,
        onReplayed: () => {
          def.onReplayed?.()
          if (def.engageOnReplay !== false) api.engage()
        },
      })
    },
  }))
}
