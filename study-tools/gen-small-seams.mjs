/**
 * 生成六个小缝实验页的 HTML 外壳与每页存根。
 *
 * 用法：node study-tools/gen-small-seams.mjs
 * 单一事实来源是 website/public/small-seams-configs.js：门选项、控件默认值、
 * 指标标签都从那里静态渲染进 HTML（满足 lab-prediction-gates 等门禁对
 * 「静态可读」的要求），行为逻辑在 small-seams-runtime.js 的 bootSmallSeam。
 */

import { writeFileSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { SMALL_SEAMS_LABS } from '../website/public/small-seams-configs.js'

const here = dirname(fileURLToPath(import.meta.url))
const publicDir = resolve(here, '../website/public')
const ids = Object.keys(SMALL_SEAMS_LABS)

/** 门禁测试按单引号字面量解析；这里生成与其正则兼容的源码文本。 */
function sq(text) {
  return "'" + String(text).replace(/\\/g, '\\\\').replace(/'/g, "\\'") + "'"
}

for (const id of ids) {
  const config = SMALL_SEAMS_LABS[id]
  const html = renderPage(id, config)
  writeFileSync(resolve(publicDir, `${id}-lab.html`), html)

  const stub = [
    '/** 由 gen-small-seams.mjs 生成的页面入口：差异全部在 small-seams-configs.js。 */',
    "import { bootSmallSeam } from './small-seams-runtime.js'",
    '',
    'if (typeof document !== \'undefined\') {',
    `  bootSmallSeam(${sq(id)}, {`,
    `    correct: ${sq(config.gate.correct)},`,
    '    explain: {',
    ...Object.entries(config.gate.explain).map(([value, text]) =>
      `      ${sq(value)}: ${sq(text)},`),
    '    },',
    `    hint: ${sq(config.gate.hint)},`,
    '  })',
    '}',
    '',
  ].join('\n')
  writeFileSync(resolve(publicDir, `${id}-lab.js`), stub)
}
console.log(`gen-small-seams: wrote ${ids.length} pages + stubs ->`, ids.join(', '))

function gateOptionsMarkup(config) {
  return config.gate.options.map(([value, label]) =>
    `          <label class="gate-option"><input type="radio" name="prediction" value="${value}"><span>${label}</span></label>`,
  ).join('\n')
}

function controlsMarkup(config) {
  return config.controls.map((control) => {
    if (control.kind === 'range') {
      return `          <label><span>${control.label}：<output id="ctl-${control.id}-output">${control.value}</output></span>` +
        `<input id="ctl-${control.id}" type="range" min="${control.min}" max="${control.max}" step="${control.step}" value="${control.value}"></label>`
    }
    if (control.kind === 'select') {
      const options = control.options.map(([value, label]) =>
        `<option value="${value}">${label}</option>`).join('')
      return `          <label><span>${control.label}</span><select id="ctl-${control.id}">${options}</select></label>`
    }
    const checked = control.value === true ? ' checked' : ''
    return `          <label class="sb-check"><input id="ctl-${control.id}" type="checkbox"${checked}><span>${control.label}</span></label>`
  }).join('\n')
}

function metricsMarkup(config) {
  const rows = config.metrics.map(([label, key]) => {
    if (key === 'forkShape') return `          <div><dt>${label}</dt><dd id="metric-shape">—</dd></div>`
    return `          <div><dt>${label}</dt><dd id="metric-${key}">—</dd></div>`
  })
  rows.push('          <div class="metric-oracle"><dt>独立校验</dt><dd id="metric-oracle">—</dd></div>')
  return rows.join('\n')
}

/** 阶梯挂载点：只有声明了 ladder 配置的页面才展开这一节。 */
function ladderMarkup(ladder) {
  return `        <section class="card" aria-labelledby="seam-ladder-title">
          <div class="section-heading"><div><p class="section-label">零跳步概念阶梯</p><h2 id="seam-ladder-title">${ladder.title}</h2></div><span class="schema-pill">每级一个概念</span></div>
          <div id="concept-ladder-root"></div>
        </section>
`
}

function renderPage(id, config) {
  const radios = gateOptionsMarkup(config)
  const controls = controlsMarkup(config)
  const metrics = metricsMarkup(config)
  const ladderSection = config.ladder === undefined ? '' : ladderMarkup(config.ladder)
  return `<!doctype html>
<html lang="zh-CN">
<head>
  <meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover"><meta name="color-scheme" content="light dark">
  <meta http-equiv="Content-Security-Policy" content="default-src 'self'; script-src 'self'; style-src 'self'; img-src 'self' data:; connect-src 'none'; object-src 'none'; base-uri 'none'; form-action 'none'">
  <title>${config.title}</title>
  <link rel="stylesheet" href="./study-tokens.css"><link rel="stylesheet" href="./study-lab-shell.css">
  <link rel="icon" href="./favicon.svg"><script src="./study-theme-boot.js"></script>
</head>
<body>
  <a class="skip-link" href="#ss-main">跳到实验</a>
  <main class="lab-shell" id="ss-main">
    <header class="hero-panel">
      <div class="hero-copy">
        <p class="eyebrow">${config.eyebrow}</p>
        <h1>${config.h1}</h1>
        <p class="hero-lead">${config.lead}</p>
        <div class="hero-actions">
          <button type="button" class="theme-toggle" id="motion-toggle" aria-pressed="false">暂停动画</button>
          <button type="button" class="theme-toggle" id="theme-toggle" aria-pressed="false">跟随系统</button>
          <a class="button button-primary" href="${config.lessonHref}">${config.lessonLabel}</a>
          <a class="button button-secondary" href="${config.siblingHref}">${config.siblingLabel}</a>
        </div>
      </div>
      <aside class="model-warning" aria-label="证据边界">
        <span class="warning-index">MODEL / SS</span>
        <strong>纯函数模型 · 独立校验。</strong>
        <p>${config.warning}</p>
      </aside>
    </header>

    <section class="control-strip card" aria-label="先预测，再改参数">
      <form id="prediction-gate" class="prediction-gate">
        <p class="gate-question" id="gate-question">${config.gate.q}</p>
        <div class="gate-options" role="radiogroup" aria-labelledby="gate-question">
${radios}
        </div>
        <div class="gate-actions"><button class="button button-primary" type="submit">提交预测，解锁控件</button><button class="button button-quiet" type="button" data-gate-skip>跳过</button></div>
        <p class="feedback" id="gate-feedback" role="status" aria-live="polite"></p>
      </form>
      <div id="gated-controls">
${ladderSection}        <form class="lab-form sb-controls" id="seam-form">
${controls}
          <button class="button button-quiet" type="button" id="reset-inputs">恢复默认输入</button>
          <small>当前选择写在地址栏 #state= 后面：刷新不丢。</small>
        </form>
        <p class="feedback" id="seam-feedback" role="status" aria-live="polite"></p>
        <dl class="metric-grid" aria-label="观测值">
${metrics}
        </dl>
      </div>
    </section>

    <section class="card" aria-labelledby="seam-steps-title">
      <div class="section-heading"><div><p class="section-label" data-icon="table">完整文字替代</p><h2 id="seam-steps-title">有序推演表</h2></div><span class="schema-pill">不用脚本也能读</span></div>
      <div class="table-scroll">
        <table>
          <caption id="seam-caption">当前输入的全部步骤</caption>
          <thead><tr><th scope="col">#</th><th scope="col">泳道</th><th scope="col">阶段</th><th scope="col">说明</th></tr></thead>
          <tbody id="seam-steps-body"></tbody>
        </table>
      </div>
      <details class="sb-oracle-details">
        <summary>独立校验逐条判定（只读步骤与观测值，自己重算）</summary>
        <ol class="oracle-list" id="oracle-list"></ol>
      </details>
    </section>

    <section class="evidence-grid" aria-label="证据边界">
      <article class="boundary-card card">
        <div class="section-heading"><div><p class="section-label" data-icon="shield">证据边界</p><h2>哪些结论可以带走</h2></div></div>
        <div class="boundary-columns">
          <div class="boundary-yes"><h3>能证明什么</h3><ul id="can-prove-list"></ul></div>
          <div class="boundary-no"><h3>不能证明什么</h3><ul id="cannot-prove-list"></ul></div>
        </div>
      </article>
    </section>

    <footer class="page-footer"><span>纯函数模型 · 独立校验 · 完整表格替代 · 不连接任何 Host</span><a href="./study-labs.html">返回实验室总览</a></footer>
  </main>
  <script type="module" src="./${id}-lab.js"></script>
</body>
</html>
`
}
