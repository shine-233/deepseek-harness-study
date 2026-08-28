<script setup lang="ts">
/**
 * DSH 学习手账首页（鲸落手账方向）。
 *
 * 吉祥物「阿溟」：像素画精灵数据来自 website/public/mascot-sprite.js（与课程页
 * 伴侣共用同一份文件，构建期打包进本组件）。形象致敬社区鲸鱼娘二创
 * （原型：上善无形「溟月」、ZipZipPipe 女仆装版，CC BY-NC-SA 4.0，非商用）。
 *
 * 交互：分栏切换（课程 / 实验标本册 / 索引与数字）、集章卡（localStorage 持久化 + 进度水条，
 * 盖满触发阿溟开心表情）、迷你 Turn 五步步进模型、左栏目录联动、戳吉祥物的彩蛋台词。
 */
import { computed, onMounted, onUnmounted, ref, watchEffect } from 'vue'
import { withBase } from 'vitepress'
import { MASCOT_SPRITE_WHALE, WHALE_GRID_W, buildMascotRects } from '../../public/mascot-sprite.js'

/* ---------- 像素画鲸鱼学长（阿溟的远房表哥；旧版放大阿溟立绘会糊成噪点，故首页专用侧视鲸） ---------- */

interface PixelRect {
  x: number
  y: number
  w: number
  fill: string
  eye?: boolean
}

const BASE_RECTS = buildMascotRects(MASCOT_SPRITE_WHALE) as PixelRect[]
const WHALE_H = MASCOT_SPRITE_WHALE.length

/** 表情切换的嘴部覆盖块（普通嘴 / 开心嘴）。 */
const MOUTHS: Record<'normal' | 'happy', { x: number; y: number; w: number }[]> = {
  normal: [{ x: 2, y: 9, w: 2 }],
  happy: [{ x: 1, y: 9, w: 4 }],
}
const MOUTH_FILL = '#c9566b'

const LAB_COUNT = Number(__DSH_LAB_COUNT__)

/* ---------- 状态与交互 ---------- */

type ViewName = 'lessons' | 'labs' | 'index'

const VIEWS: { id: ViewName; label: string }[] = [
  { id: 'lessons', label: '课程' },
  { id: 'labs', label: '实验标本册' },
  { id: 'index', label: '索引与数字' },
]
const view = ref<ViewName>('lessons')

function activate(next: ViewName): void {
  view.value = next
}
function onTabKey(event: KeyboardEvent): void {
  const index = VIEWS.findIndex((item) => item.id === view.value)
  if (event.key === 'ArrowRight') activate(VIEWS[(index + 1) % VIEWS.length].id)
  else if (event.key === 'ArrowLeft') activate(VIEWS[(index - 1 + VIEWS.length) % VIEWS.length].id)
}

/** 左栏目录 → 切栏并滚动到内容区。 */
function goTo(next: ViewName): void {
  activate(next)
  document.getElementById('dj-sheet')?.scrollIntoView({
    behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
    block: 'start',
  })
}

/* ---------- 集章卡 ---------- */

interface StampLesson {
  id: string
  num: string
  title: string
  hint: string
  href: string
}
const LESSONS: StampLesson[] = [
  { id: 'l00', num: '00', title: '开始这里', hint: '六个词 + 心智模型', href: withBase('/study/lessons/00-开始这里') },
  { id: 'l01', num: '01', title: '仓库地图', hint: '输入从哪里进来', href: withBase('/study/lessons/01-仓库地图') },
  { id: 'l04', num: '04', title: 'Agent 与 Turn', hint: '主链路怎么跑', href: withBase('/study/lessons/04-Agent与Turn流程') },
  { id: 'l11', num: '11', title: '写一个合规插件', hint: '注册到卸载全程', href: withBase('/study/lessons/11-如何写一个合规插件') },
  { id: 'l25', num: '25', title: '十五分钟任务单', hint: '第一条学习记录', href: withBase('/study/lessons/25-从首页到第一次产出的动手任务单') },
  { id: 'l28', num: '28', title: '最小插件工作台', hint: '测试跑绿才算数', href: withBase('/study/examples/minimal-observer') },
]

/**
 * 确定性手绘边框：rough.js 的最小教学移植。
 * 线性同余种子随机沿矩形周界抖动，双描边取不同种子——
 * 种子固定，所以 SSR 与客户端、每次加载都逐字节一致，不破坏水合。
 */
function roughFramePath(seed: number, wobble = 1.1): string {
  let state = seed >>> 0
  const next = () => {
    state = (state * 1664525 + 1013904223) >>> 0
    return state / 4294967296
  }
  const jitter = () => (next() - 0.5) * 2 * wobble
  const points: string[] = []
  const walk = (x1: number, y1: number, x2: number, y2: number, steps: number) => {
    for (let i = 0; i <= steps; i += 1) {
      const t = i / steps
      points.push(`${(x1 + (x2 - x1) * t + jitter()).toFixed(2)} ${(y1 + (y2 - y1) * t + jitter()).toFixed(2)}`)
    }
  }
  walk(2, 2, 98, 2, 7)
  walk(98, 2, 98, 98, 7)
  walk(98, 98, 2, 98, 7)
  walk(2, 98, 2, 2, 7)
  return `M${points.join(' L')} Z`
}
const stampFrameA = roughFramePath(20260823)
const stampFrameB = roughFramePath(917421)

const STORAGE_KEY = 'am-stamps-home'
const stampedIds = ref<Record<string, boolean>>({})
const hydrated = ref(false)

onMounted(() => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) stampedIds.value = JSON.parse(raw) as Record<string, boolean>
  } catch {
    /* 忽略损坏的历史数据，按空卡处理 */
  }
  hydrated.value = true
})

function persist(): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(stampedIds.value))
  } catch {
    /* 存不了就算了，章只活在本次会话 */
  }
}
function toggleStamp(id: string): void {
  if (!hydrated.value) return
  stampedIds.value = { ...stampedIds.value, [id]: !stampedIds.value[id] }
  persist()
}
function resetStamps(): void {
  stampedIds.value = {}
  persist()
}
const doneCount = computed(
  () => LESSONS.filter((lesson) => stampedIds.value[lesson.id]).length,
)
const allDone = computed(() => doneCount.value === LESSONS.length)

/* ---------- 迷你 Turn 步进 ---------- */

interface TurnStep {
  key: string
  label: string
  blurb: string
}

/** 缩微模型：只讲五步形状；完整可验证证据在 turn-flow-lab.html。 */
const TURN_STEPS: TurnStep[] = [
  { key: 'in', label: '输入进来', blurb: '一条用户消息交给 Agent，一次 Turn 开始。' },
  { key: 'req', label: '组装请求', blurb: '系统提示和全部工具说明一起拼进这条请求。' },
  { key: 'loop', label: '模型与工具循环', blurb: '模型要调工具就执行，结果塞回请求继续问。' },
  { key: 'log', label: '落成日志', blurb: '每一步都写成 Session 事件，事后能原样重建。' },
  { key: 'next', label: '下一条 Turn', blurb: '上下文从日志里恢复，循环接着走。' },
]
const turnAt = ref(0)
function turnMove(delta: number): void {
  turnAt.value = Math.min(Math.max(turnAt.value + delta, 0), TURN_STEPS.length - 1)
}
function turnSlider(event: Event): void {
  turnAt.value = Number((event.target as HTMLInputElement).value)
}

/* ---------- 阿溟台词 ---------- */

const mood = ref<'normal' | 'happy'>('normal')
const quipIndex = ref(0)
const QUIPS = [
  '戳我干什么，去读书。',
  '印章不盖，读了白读。',
  '实验标本册里那头鲸，是我远房表哥。',
  '白饭要管饱，章也要盖满。',
  '「大概看懂了」？鱼片，你糊弄谁呢。',
  '实验标本册全做完，我承认你比我勤快。',
]
const note = computed(() =>
  allDone.value
    ? '全读完了？鱼片，\n你比我勤快。'
    : mood.value === 'normal' && !justPoked.value
      ? '今天读到哪一格了？\n盖个章再走。'
      : QUIPS[quipIndex.value % QUIPS.length],
)
const justPoked = ref(false)
let moodTimer: ReturnType<typeof setTimeout> | undefined
function poke(): void {
  if (allDone.value) return
  justPoked.value = true
  quipIndex.value += 1
  clearTimeout(moodTimer)
  moodTimer = setTimeout(() => {
    justPoked.value = false
  }, 2600)
}
watchEffect(() => {
  mood.value = allDone.value ? 'happy' : 'normal'
})
</script>

<template>
  <div class="dj-page">
    <!-- line boil 滤镜：feTurbulence 噪声场喂给 feDisplacementMap，
         baseFrequency 由 SMIL 离散步进换帧——手绘卡通的「沸腾」边缘。
         纯 SVG/SMIL 无脚本；滤镜仅在 prefers-reduced-motion: no-preference 下被引用。 -->
    <svg class="dj-defs" aria-hidden="true" focusable="false">
      <defs>
        <filter id="dj-boil" x="-6%" y="-6%" width="112%" height="112%">
          <feTurbulence type="turbulence" baseFrequency="0.55" numOctaves="1" seed="7" result="noise">
            <animate
              attributeName="baseFrequency"
              dur="0.55s"
              values="0.55;0.60;0.51;0.58;0.55"
              calcMode="discrete"
              repeatCount="indefinite"
            />
          </feTurbulence>
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="2.6" xChannelSelector="R" yChannelSelector="G" />
        </filter>
      </defs>
    </svg>
    <!-- 手账封面 -->
    <header class="dj-cover">
      <span class="dj-tape" aria-hidden="true"></span>
      <span class="dj-tape dj-tape-butter" aria-hidden="true"></span>
      <h1 class="dj-title">DSH 读源码<span>手账</span></h1>
      <p class="dj-date">
        <i>基线 aa6c361a · 上游 0.1.1-rc.2</i><i>社区自建 · 非官方</i><i>2026 年 8 月</i>
      </p>
      <p class="dj-intro">
        不用装环境，也不用 API key。这本手账把 DSH 拆成三块：<strong>课程、实验、索引</strong>。
        左边盖你的章，右边挑一块开始——读完一条算一条。
      </p>
    </header>

    <div class="dj-grid">
      <!-- 左栏便签 -->
      <aside class="dj-side">
        <div class="dj-stamp-card">
          <svg class="dj-rough-frame" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
            <path :d="stampFrameA" />
            <path :d="stampFrameB" class="dj-rough-frame-b" />
          </svg>
          <h3>
            <span>集章卡 · 已收 <b>{{ doneCount }}</b>/{{ LESSONS.length }} 枚</span>
            <button type="button" class="dj-reset" @click="resetStamps">撕掉重盖</button>
          </h3>
          <div class="dj-wavebar" role="img" :aria-label="`集章进度 ${doneCount} / ${LESSONS.length}`">
            <i :style="{ width: `${(doneCount / LESSONS.length) * 100}%` }"></i>
          </div>
          <ul class="dj-stamp-list">
            <li
              v-for="lesson in LESSONS"
              :key="lesson.id"
              :class="{ 'dj-done': stampedIds[lesson.id] }"
            >
              <button
                type="button"
                class="dj-stamp-btn"
                :class="{ 'dj-on': stampedIds[lesson.id] }"
                :aria-pressed="String(Boolean(stampedIds[lesson.id]))"
                @click="toggleStamp(lesson.id)"
              >
                {{ stampedIds[lesson.id] ? '已读' : lesson.num }}
              </button>
              <span class="dj-stamp-label">
                <a :href="lesson.href">{{ lesson.title }}</a>
                <small>{{ lesson.hint }}</small>
              </span>
            </li>
          </ul>
        </div>

        <div class="dj-mascot-card">
          <svg
            :data-mood="mood"
            class="dj-mascot"
            :viewBox="`0 0 ${WHALE_GRID_W} ${WHALE_H}`"
            shape-rendering="crispEdges"
            role="button"
            tabindex="0"
            aria-label="吉祥物鲸鱼学长（阿溟的远房表哥）：戳一下换一句台词"
            @click="poke"
            @keydown.enter.prevent="poke"
            @keydown.space.prevent="poke"
          >
            <g v-for="rect in BASE_RECTS" :key="`p${rect.x}-${rect.y}`">
              <rect :class="{ 'dj-eye': rect.eye }" :x="rect.x" :y="rect.y" width="1" height="1" :fill="rect.fill" />
            </g>
            <g :fill="MOUTH_FILL">
              <rect
                v-for="(part, i) in MOUTHS[mood]"
                :key="`m${i}`"
                :x="part.x"
                :y="part.y"
                :width="part.w"
                height="1"
              />
            </g>
          </svg>
          <p class="dj-mascot-note">{{ note }}</p>
        </div>

        <nav class="dj-toc" aria-label="翻到哪页了">
          <h3>翻到哪页了</h3>
          <button
            v-for="item in VIEWS"
            :key="item.id"
            type="button"
            :aria-current="view === item.id ? 'true' : undefined"
            @click="goTo(item.id)"
          >
            {{ item.label }}
          </button>
        </nav>
      </aside>

      <!-- 右侧正文 -->
      <main class="dj-main">
        <div class="dj-tabs" role="tablist" aria-label="手账分栏" @keydown="onTabKey">
          <button
            v-for="item in VIEWS"
            :id="`dj-tab-${item.id}`"
            :key="item.id"
            type="button"
            role="tab"
            :aria-selected="String(view === item.id)"
            :tabindex="view === item.id ? 0 : -1"
            :aria-controls="`dj-view-${item.id}`"
            @click="activate(item.id)"
          >
            {{ item.label }}
          </button>
        </div>

        <section v-show="view === 'lessons'" id="dj-view-lessons" role="tabpanel" aria-labelledby="dj-tab-lessons" class="dj-sheet">
          <article class="dj-entry dj-entry-first">
            <span class="dj-start-badge">从这里开始</span>
            <span class="dj-no">壹</span><h3>我第一次来</h3>
            <p>
              先认六个词：<strong>插件、服务、事件、Profile、Bundle、Turn</strong>。
              只读网页，什么都不装，读完你就能画出仓库的地图。
            </p>
            <p class="dj-note">六个词读完，第一课就算过了，别贪多。</p>
            <a :href="withBase('/study/')">打开第一课 →</a>
          </article>
          <article class="dj-entry">
            <span class="dj-no">贰</span><h3>照着任务单走</h3>
            <p>
              不想做选择题就抄作业：15 分钟任务单按顺序点开页面，最后<strong>写下第一条带源码证据的学习记录</strong>
              ——看过哪个文件、看到了什么、还没证明什么。
            </p>
            <p class="dj-note">记录要落到具体文件上哦，「大概看懂了」不算数。</p>
            <a :href="withBase('/study/lessons/25-从首页到第一次产出的动手任务单')">开始任务单 →</a>
          </article>
          <article class="dj-entry">
            <span class="dj-no">叁</span><h3>想动手写插件</h3>
            <p>
              先跑<strong>最小示例的单元测试和 lint</strong>。示例跑绿只证明示例没坏；
              真实 DSH 的运行证据另算，教材里两种账分开记。
            </p>
            <p class="dj-note">没跑过就写「已验证」……阿溟会顺着网线来找你的。</p>
            <a :href="withBase('/study/examples/minimal-observer')">查看最小示例 →</a>
          </article>

          <div class="dj-course-map">
            <h4>整本手账的目录</h4>
            <div class="dj-stage-grid">
              <div class="dj-stage">
                <b>① 认识 DSH</b>
                <p><a :href="withBase('/study/')">00 开始这里</a> · 01 仓库地图 · 02 Cordis 与插件树 · 25 动手任务单 · 27 工具预算决策卡</p>
              </div>
              <div class="dj-stage">
                <b>② 主链路精读</b>
                <p>03 核心文件精读 · 04 Agent 与 Turn · 05 Session 日志与恢复 · 06 LLM 与工具执行 · 07 Host/Client 与发布</p>
              </div>
              <div class="dj-stage">
                <b>③ 插件与生态</b>
                <p>10 扩展边界 · <a :href="withBase('/study/lessons/11-如何写一个合规插件')">11 写一个合规插件</a> · 13 工具插件契约 · 15 Bundle / Profile / Loader · 22 工具可见性 · 28 最小插件工作台</p>
              </div>
              <div class="dj-stage">
                <b>④ 实验与治理</b>
                <p>16 学习工作簿 · 19 测试卸载证据 · 29 质量检查与审阅 · 33 可视化实验协议 · 34 作者的判断与理由</p>
              </div>
            </div>
          </div>

          <div class="dj-turn">
            <h4>顺手玩一下 · 一次 Turn 的形状</h4>
            <ol class="dj-turn-track" aria-label="一次 Turn 的五步缩微模型">
              <li
                v-for="(step, i) in TURN_STEPS"
                :key="step.key"
                :class="{ 'dj-on': i <= turnAt, 'dj-now': i === turnAt }"
              >
                <i>{{ i + 1 }}</i><span>{{ step.label }}</span>
              </li>
            </ol>
            <div class="dj-turn-stage">
              <p class="dj-turn-blurb"><b>{{ TURN_STEPS[turnAt].label }}</b>{{ TURN_STEPS[turnAt].blurb }}</p>
              <div class="dj-turn-ctrl">
                <button type="button" :disabled="turnAt === 0" aria-label="上一步" @click="turnMove(-1)">‹</button>
                <input
                  type="range"
                  min="0"
                  :max="TURN_STEPS.length - 1"
                  :value="turnAt"
                  aria-label="Turn 步进滑杆"
                  @input="turnSlider"
                >
                <button type="button" :disabled="turnAt === TURN_STEPS.length - 1" aria-label="下一步" @click="turnMove(1)">›</button>
                <small>{{ turnAt + 1 }} / {{ TURN_STEPS.length }}</small>
              </div>
            </div>
            <p class="dj-note">缩微模型只讲形状；能逐步验证的完整证据在<a :href="withBase('/turn-flow-lab.html')">Turn 流程实验室</a>。</p>
          </div>
        </section>

        <section v-show="view === 'labs'" id="dj-view-labs" role="tabpanel" aria-labelledby="dj-tab-labs" class="dj-sheet">
          <div class="dj-lab-grid">
            <a class="dj-lab-chip" :href="withBase('/turn-flow-lab.html')"><b><i>其一</i>Turn 流程与日志</b><span>步进滑杆停在任意一步，看一次输入怎样走到 Session 日志</span></a>
            <a class="dj-lab-chip" :href="withBase('/package-graph-lab.html')"><b><i>其二</i>包依赖图</b><span>227 个包、50 个组的依赖形状，含可选 3D 场景</span></a>
            <a class="dj-lab-chip" :href="withBase('/profile-loader-lab.html')"><b><i>其三</i>Profile 解析顺序</b><span>声明顺序怎样决定最终装配出的配置</span></a>
            <a class="dj-lab-chip" :href="withBase('/session-log-lab.html')"><b><i>其四</i>Session 日志重放</b><span>模型可见内容为什么必须能从事件日志重建</span></a>
            <a class="dj-lab-chip" :href="withBase('/llm-stream-lab.html')"><b><i>其五</i>LLM 流式拼装</b><span>finish 之后迟到的重复块，为什么必须丢弃</span></a>
            <a class="dj-lab-chip" :href="withBase('/tool-visibility-lab.html')"><b><i>其六</i>工具可见性三层</b><span>已注册、模型可见、执行允许，是三件事</span></a>
            <a class="dj-lab-chip" :href="withBase('/code-mode-evidence-lab.html')"><b><i>其七</i>Code Mode 权限管线</b><span>子调用为什么仍要经过完整权限管线</span></a>
            <a class="dj-lab-chip" :href="withBase('/compaction-lab.html')"><b><i>其八</i>上下文压缩</b><span>压缩前后各保留什么、丢什么，oracle 怎样核对</span></a>
            <a class="dj-lab-chip" :href="withBase('/plugin-flow-lab.html')"><b><i>其九</i>插件订阅与日志</b><span>订阅、策略拒绝和卸载怎样影响观察插件</span></a>
            <a class="dj-lab-chip" :href="withBase('/research-debug-bridge.html')"><b><i>其十</i>研究 ↔ Debug 桥</b><span>课程网站与 Debug 工具怎样用显式文件交接</span></a>
            <a class="dj-lab-chip" :href="withBase('/hook-flow-lab.html')"><b><i>其十一</i>Hook 瀑布短路</b><span>不调用 next 就短路，兜底和结果作者跟着变</span></a>
            <a class="dj-lab-chip" :href="withBase('/approval-flow-lab.html')"><b><i>其十二</i>审批流</b><span>没有应答者时，询问怎样退化为拒绝</span></a>
            <a class="dj-lab-chip" :href="withBase('/session-fork-lab.html')"><b><i>其十三</i>Session fork 与修复</b><span>前缀继承与 interrupted 的 unknown 修复</span></a>
            <a class="dj-lab-chip" :href="withBase('/subagent-delegate-lab.html')"><b><i>其十四</i>subagent 委派</b><span>深度上限在边界拦截；回报是完整结算</span></a>
            <a class="dj-lab-chip" :href="withBase('/guard-loop-lab.html')"><b><i>其十五</i>循环卫生</b><span>阈值拦截与单调拒绝，执行账目始终平衡</span></a>
          </div>
          <p class="dj-lab-hint">全部离线可复现：固定输入、固定输出、独立 oracle。做完记得回来盖第贰格的章。</p>
        </section>

        <section v-show="view === 'index'" id="dj-view-index" role="tabpanel" aria-labelledby="dj-tab-index" class="dj-sheet">
          <div class="dj-polaroid-row">
            <figure class="dj-polaroid">
              <div class="dj-photo"><b>120</b></div>
              <figcaption>页中文教材</figcaption>
            </figure>
            <figure class="dj-polaroid">
              <div class="dj-photo"><b>2973</b></div>
              <figcaption>个逐文件导读卡</figcaption>
            </figure>
            <figure class="dj-polaroid">
              <div class="dj-photo"><b>{{ LAB_COUNT }}</b></div>
              <figcaption>个离线实验</figcaption>
            </figure>
          </div>
          <div class="dj-memo">
            <b>丑话备忘：</b>页面打得开、链接点得通，只说明教材完整。真实模型调用、插件卸载、provider 延迟是另外几种证据，
            实验里分开交代。这页贴在最前面，防止有人把「读了」写成「验证了」。
          </div>
          <div class="dj-feedback">
            <h4>发现手账有错？按类型递条子</h4>
            <div class="dj-note-row">
              <a class="dj-sticky" href="https://github.com/shine-233/deepseek-harness-study/issues/new?template=doc-fact-error.yml" target="_blank" rel="noopener">
                <b>文档事实错误</b><i>结论和源码对不上时用这张</i>
              </a>
              <a class="dj-sticky" href="https://github.com/shine-233/deepseek-harness-study/issues/new?template=tutorial-reproduction.yml" target="_blank" rel="noopener">
                <b>教程无法复现</b><i>照着做卡住时用这张</i>
              </a>
              <a class="dj-sticky" href="https://github.com/shine-233/deepseek-harness-study/issues/new?template=broken-link.yml" target="_blank" rel="noopener">
                <b>链接或页面问题</b><i>点了没反应、404 时用这张</i>
              </a>
              <a class="dj-sticky" href="https://github.com/shine-233/deepseek-harness-study/issues/new?template=community-audit.yml" target="_blank" rel="noopener">
                <b>社区扩展审计</b><i>插件风险线索用这张</i>
              </a>
            </div>
          </div>
        </section>
      </main>
    </div>

    <footer class="dj-footer">
      形象致敬社区的 DeepSeek 鲸鱼娘二创——原型：上善无形「溟月」、ZipZipPipe 女仆装版（CC BY-NC-SA 4.0，非商用）。
      本站吉祥物为原创演绎，与 DeepSeek AI 无关。
    </footer>
  </div>
</template>

<style scoped>
.dj-page{
  --paper:#faf6ee; --card:#fffdf7;
  --ink:#22364f; --ink-soft:#5a6e85; --line:#e3d9c4;
  --red:#c94f3d; --blue-ink:#2b5aa6;
  --tape-mint:#bfe8d9; --tape-butter:#ffe9a8; --tape-coral:#ffc4b8; --tape-sky:#bbd9ff;

  font-family:'Noto Serif SC',Georgia,'Microsoft YaHei',serif;
  color:var(--ink);
  background-color:var(--paper);
  background-image:radial-gradient(#ddd2bd 1.1px,transparent 1.1px);
  background-size:24px 24px;
  margin:-24px -24px 0; padding:22px clamp(16px,4vw,36px) 0;
  min-height:100vh;
}
.dj-cover{position:relative;background:var(--card);border:1px solid var(--line);border-radius:6px;
  padding:30px 32px 24px;box-shadow:4px 5px 0 rgba(43,90,166,.08);max-width:1080px;margin:0 auto;}
.dj-tape{position:absolute;width:96px;height:27px;top:-13px;left:38px;background:var(--tape-mint);
  opacity:.85;transform:rotate(-3deg);box-shadow:0 1px 3px rgba(34,54,79,.15);}
.dj-tape-butter{left:auto;right:44px;background:var(--tape-butter);transform:rotate(2.5deg);}
.dj-title{font-family:'Ma Shan Zheng','Noto Serif SC',serif;font-weight:400;font-size:clamp(32px,4.4vw,44px);
  line-height:1.35;border:none;padding:0;margin:0;}
.dj-title span{color:var(--blue-ink);}
.dj-date{font-family:'Noto Sans SC';font-size:12.5px;color:var(--ink-soft);margin:6px 0 10px;display:flex;gap:12px;flex-wrap:wrap;padding:0;}
.dj-date i{font-style:normal;border:1px solid var(--line);border-radius:4px;padding:1px 8px;background:#fdfaf2;}
.dj-intro{font-size:15.5px;color:var(--ink-soft);max-width:38em;margin:0;}
.dj-intro strong{color:var(--ink);}

.dj-grid{display:grid;grid-template-columns:280px 1fr;gap:36px;align-items:start;max-width:1080px;margin:26px auto 0;}

.dj-side{display:flex;flex-direction:column;gap:20px;position:sticky;top:70px;}
.dj-mascot-card{background:var(--card);border:1px solid var(--line);border-radius:6px;padding:18px 14px 12px;
  position:relative;transform:rotate(-1.6deg);box-shadow:3px 4px 0 rgba(43,90,166,.10);transition:.25s;text-align:center;}
.dj-mascot-card:hover{transform:rotate(0);}
.dj-mascot{width:150px;height:auto;display:block;margin:0 auto;cursor:pointer;
  image-rendering:pixelated;animation:dj-float 3.4s steps(2,end) infinite alternate;}
@keyframes dj-float{from{transform:translateY(0)}to{transform:translateY(-3px)}}
.dj-eye{animation:dj-blink 4.6s steps(1,end) infinite;}
@keyframes dj-blink{0%,91%{opacity:1}94%{opacity:.12}97%,100%{opacity:1}}
.dj-mascot[data-mood='happy']{animation-duration:2.4s;}
.dj-mascot-note{font-family:'Ma Shan Zheng',cursive;font-size:17px;color:var(--blue-ink);line-height:1.6;margin-top:8px;white-space:pre-line;}

.dj-stamp-card{background:var(--card);border:1px solid var(--line);border-radius:6px;padding:20px 18px 14px;
  box-shadow:3px 4px 0 rgba(201,79,61,.08);}
.dj-stamp-card h3{font-family:'Ma Shan Zheng',cursive;font-weight:400;font-size:19px;
  border-bottom:2px dashed var(--line);padding-bottom:8px;margin-bottom:10px;
  display:flex;justify-content:space-between;align-items:center;letter-spacing:.02em;}
.dj-stamp-card b{color:var(--red);font-weight:400;}
.dj-wavebar{height:10px;margin:2px 0 12px;border:1px solid var(--line);border-radius:6px;background:#eef4fb;overflow:hidden;}
.dj-wavebar i{display:block;height:100%;transition:width .35s ease;
  background:repeating-linear-gradient(135deg,#8fbcf7 0 8px,#7db1f2 8px 16px);}
.dj-reset{font-family:'Noto Sans SC';font-size:11px;color:#9aa8b6;background:none;border:none;
  cursor:pointer;text-decoration:underline dotted;transition:.15s;}
.dj-reset:hover{color:var(--red);}
.dj-stamp-list{list-style:none;padding:0;margin:0;}
.dj-stamp-list li{display:flex;align-items:center;gap:12px;padding:6px 0;}
.dj-stamp-btn{flex:0 0 46px;width:46px;height:46px;border-radius:50%;cursor:pointer;
  border:2px dashed #cdbfa4;background:none;color:#b3a587;
  font-family:'Noto Sans SC';font-size:13px;font-weight:700;transition:.18s;}
.dj-stamp-btn:hover{border-color:var(--red);color:var(--red);transform:scale(1.06);}
.dj-stamp-btn.dj-on{border:2.5px solid var(--red);background:rgba(201,79,61,.07);color:var(--red);
  transform:rotate(-12deg);animation:dj-stamp-in .2s ease-out;font-size:12.5px;}
@keyframes dj-stamp-in{from{transform:scale(1.9) rotate(8deg);opacity:0}to{transform:scale(1) rotate(-12deg);opacity:1}}
.dj-stamp-label{font-size:15px;line-height:1.5;}
.dj-stamp-label a{color:inherit;text-decoration:none;border-bottom:1.5px solid transparent;transition:.15s;}
.dj-stamp-label a:hover{color:var(--blue-ink);border-color:var(--tape-sky);}
.dj-stamp-label small{display:block;font-size:12px;color:var(--ink-soft);}
li.dj-done .dj-stamp-label{text-decoration:line-through solid rgba(90,110,133,.55);}

.dj-toc{background:var(--card);border:1px solid var(--line);border-radius:6px;padding:14px 18px;}
.dj-toc h3{font-family:'Ma Shan Zheng',cursive;font-weight:400;font-size:17px;margin-bottom:6px;}
.dj-toc button{display:block;width:100%;background:none;border:none;cursor:pointer;
  font-family:'Noto Serif SC',serif;font-size:14.5px;color:var(--ink-soft);
  padding:5px 2px;border-bottom:1px dashed var(--line);transition:.15s;text-align:left;}
.dj-toc button:last-child{border-bottom:none;}
.dj-toc button::before{content:'› ';color:var(--tape-coral);font-weight:700;}
.dj-toc button:hover,.dj-toc button[aria-current='true']{color:var(--blue-ink);padding-left:8px;}

.dj-tabs{display:flex;gap:6px;margin:0 0 -1px;padding-left:10px;position:relative;z-index:2;}
.dj-tabs button{font-family:'Noto Serif SC',serif;font-size:14.5px;font-weight:600;color:var(--ink-soft);
  background:var(--tape-sky);border:none;cursor:pointer;padding:8px 26px 9px;
  transform:rotate(-1.2deg) translateY(3px);box-shadow:0 1px 3px rgba(34,54,79,.14);
  transition:.18s;opacity:.72;}
.dj-tabs button:nth-child(2){background:var(--tape-butter);transform:rotate(.8deg) translateY(3px);}
.dj-tabs button:nth-child(3){background:var(--tape-coral);transform:rotate(-.6deg) translateY(3px);}
.dj-tabs button[aria-selected='true']{opacity:1;transform:rotate(0) translateY(0);
  outline:2px solid rgba(255,255,255,.65);outline-offset:-4px;}

.dj-sheet{background:var(--card);border:1px solid var(--line);border-radius:6px;
  box-shadow:4px 5px 0 rgba(43,90,166,.08);padding:28px 30px;min-height:420px;}
.dj-sheet{animation:dj-fade-up .2s ease-out;}
.dj-main{min-width:0;}
@keyframes dj-fade-up{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:none}}

.dj-entry{position:relative;border:1.5px solid var(--line);border-radius:6px;background:#fefcf6;
  padding:20px 22px 16px;margin-bottom:20px;transform:rotate(-.5deg);transition:.2s;}
.dj-entry:nth-of-type(2n){transform:rotate(.55deg);}
.dj-entry:hover{transform:rotate(0);box-shadow:3px 4px 0 rgba(43,90,166,.09);}
.dj-entry-first{border-color:#d8b98a;}
.dj-start-badge{position:absolute;top:-11px;right:18px;background:var(--tape-butter);
  font-family:'Ma Shan Zheng',cursive;font-size:14px;color:#8a6a2f;padding:2px 12px;transform:rotate(2deg);}
.dj-no{font-family:'Ma Shan Zheng',cursive;font-size:26px;color:var(--blue-ink);margin-right:10px;}
.dj-entry h3{display:inline;font-size:18px;font-weight:700;border:none;padding:0;margin:0;}
.dj-entry p{font-size:14.5px;color:var(--ink-soft);margin:8px 0 4px;line-height:1.9;}
.dj-entry p strong{color:var(--ink);}
.dj-note{font-family:'Ma Shan Zheng',cursive;font-size:16.5px;color:var(--red);margin-top:6px;}
.dj-note::before{content:'↳ ';color:var(--ink-soft);}
.dj-entry a:not([class]){font-family:'Noto Sans SC';display:inline-block;margin-top:6px;font-size:13.5px;
  font-weight:700;color:var(--blue-ink);text-decoration:none;
  border-bottom:2px solid var(--tape-sky);transition:.18s;}
.dj-entry a:not([class]):hover{border-color:var(--blue-ink);}

.dj-turn{margin-top:24px;border-top:2px dashed var(--line);padding-top:20px;}
.dj-turn h4{font-family:'Ma Shan Zheng',cursive;font-weight:400;font-size:20px;margin-bottom:14px;}
.dj-turn-track{list-style:none;display:flex;padding:0;margin:0 0 14px;}
.dj-turn-track li{flex:1;position:relative;text-align:center;
  font-family:'Noto Sans SC';font-size:12px;color:#9aa8b6;}
.dj-turn-track li:not(:last-child)::after{content:'';position:absolute;top:13px;
  left:calc(50% + 17px);right:calc(-50% + 17px);border-top:2px dashed #d8cdb6;}
.dj-turn-track li.dj-on:not(:last-child)::after{border-color:#9cc3f5;}
.dj-turn-track i{display:block;width:26px;height:26px;line-height:23px;margin:0 auto 5px;border-radius:50%;
  border:2px dashed #cdbfa4;background:#fdfaf2;font-style:normal;font-weight:700;color:#b3a587;transition:.18s;}
.dj-turn-track li.dj-on i{border:2px solid var(--blue-ink);background:var(--tape-sky);color:#1d4477;}
.dj-turn-track li.dj-now span{color:var(--red);font-weight:700;}
.dj-turn-stage{background:#fefcf6;border:1.5px solid var(--line);border-radius:6px;padding:12px 16px;}
.dj-turn-blurb{margin:0 0 10px;font-size:14px;color:var(--ink-soft);line-height:1.85;}
.dj-turn-blurb b{color:var(--ink);margin-right:8px;}
.dj-turn-ctrl{display:flex;align-items:center;gap:10px;}
.dj-turn-ctrl button{width:30px;height:30px;border-radius:50%;border:1.5px solid var(--line);
  background:var(--card);color:var(--blue-ink);font-size:17px;line-height:1;cursor:pointer;transition:.15s;}
.dj-turn-ctrl button:hover:not(:disabled){border-color:var(--blue-ink);}
.dj-turn-ctrl button:disabled{opacity:.35;cursor:default;}
.dj-turn-ctrl input[type='range']{flex:1;accent-color:var(--red);}
.dj-turn-ctrl small{font-family:'Noto Sans SC';font-size:12px;color:var(--ink-soft);min-width:38px;text-align:right;}

.dj-course-map{margin-top:28px;border-top:2px dashed var(--line);padding-top:20px;}
.dj-course-map h4{font-family:'Ma Shan Zheng',cursive;font-weight:400;font-size:20px;margin-bottom:12px;}
.dj-stage-grid{display:grid;grid-template-columns:1fr 1fr;gap:12px;}
.dj-stage{border:1.5px solid var(--line);border-radius:6px;padding:12px 14px;background:#fefcf6;}
.dj-stage b{font-size:14.5px;display:block;margin-bottom:4px;}
.dj-stage p{font-family:'Noto Sans SC';font-size:12.5px;color:var(--ink-soft);line-height:1.8;margin:0;}
.dj-stage a{color:var(--blue-ink);text-decoration:none;border-bottom:1.5px solid var(--tape-sky);}
.dj-stage a:hover{border-color:var(--blue-ink);}

.dj-lab-grid{display:grid;grid-template-columns:1fr 1fr;gap:14px;}
.dj-lab-chip{border:1.5px solid var(--line);border-radius:6px;background:#fefcf6;
  padding:13px 16px;text-decoration:none;color:inherit;transition:.2s;display:block;}
.dj-lab-chip:hover{box-shadow:3px 4px 0 rgba(201,79,61,.10);transform:translateY(-2px);}
.dj-lab-chip b{font-size:15px;display:block;}
.dj-lab-chip b i{font-style:normal;font-family:'Ma Shan Zheng',cursive;color:var(--red);margin-right:7px;font-weight:400;}
.dj-lab-chip span{font-size:12.5px;color:var(--ink-soft);display:block;margin-top:3px;line-height:1.65;}
.dj-lab-hint{font-family:'Ma Shan Zheng',cursive;font-size:17px;color:var(--blue-ink);margin-top:18px;}

.dj-polaroid-row{display:flex;gap:22px;flex-wrap:wrap;margin-bottom:26px;}
.dj-polaroid{background:#fff;border:1px solid var(--line);padding:12px 12px 10px;
  box-shadow:3px 5px 10px rgba(34,54,79,.12);width:172px;text-align:center;
  transform:rotate(-2deg);transition:.2s;}
.dj-polaroid:nth-child(2){transform:rotate(1.4deg);}
.dj-polaroid:nth-child(3){transform:rotate(-.8deg);}
.dj-polaroid:hover{transform:rotate(0) scale(1.03);}
.dj-photo{height:104px;border:1px solid #eef0f2;display:flex;align-items:center;justify-content:center;
  background:
    radial-gradient(circle at 68% 30%,#ffe9c9 0 26%,transparent 27%),
    linear-gradient(160deg,#dff0ff,#bcdcff 62%,#9fc8f2);}
.dj-photo b{font-size:34px;font-weight:700;color:#1d4477;}
.dj-polaroid figcaption{font-family:'Ma Shan Zheng',cursive;font-size:16px;color:var(--ink-soft);margin-top:8px;}
.dj-memo{position:relative;border:1px solid #ecd9b0;background:#fff9ec;padding:18px 22px;
  font-size:14px;color:#6b543a;transform:rotate(-.7deg);line-height:1.95;}
.dj-memo::before{content:'';position:absolute;top:-12px;left:50%;margin-left:-45px;width:90px;height:24px;
  background:var(--tape-butter);opacity:.9;transform:rotate(-2deg);}
.dj-memo b{color:var(--red);}

.dj-feedback{margin-top:30px;}
.dj-feedback h4{font-family:'Ma Shan Zheng',cursive;font-weight:400;font-size:20px;margin-bottom:12px;}
.dj-note-row{display:flex;gap:14px;flex-wrap:wrap;}
.dj-sticky{display:block;flex:1 1 180px;max-width:240px;text-decoration:none;color:#5a4a35;
  background:#fff9d6;border:1px solid #ecd98a;padding:14px 16px 12px;
  transform:rotate(-1.4deg);transition:.2s;line-height:1.7;}
.dj-sticky:nth-child(2){background:#e8f6ef;border-color:#bfe0cd;transform:rotate(.9deg);}
.dj-sticky:nth-child(3){background:#fdeae6;border-color:#f0c0b6;transform:rotate(-.7deg);}
.dj-sticky:nth-child(4){background:#e9f1fd;border-color:#bcd2f0;transform:rotate(1.2deg);}
.dj-sticky:hover{transform:rotate(0) translateY(-3px);}
.dj-sticky b{font-size:14.5px;display:block;color:var(--ink);}
.dj-sticky i{font-style:normal;font-size:12px;display:block;margin-top:4px;color:#8a7a5a;}

.dj-footer{max-width:1080px;margin:40px auto 0;padding:24px 4px 40px;border-top:2px dashed var(--line);
  font-family:'Noto Sans SC';text-align:center;font-size:12.5px;color:#93a1ad;line-height:2;}

/* 深色模式：同一套手账版式换成夜读纸色，只动颜色不动布局。 */
html.dark .dj-page{
  --paper:#161d29; --card:#202b3d;
  --ink:#dbe4f0; --ink-soft:#9fb0c6; --line:#3a4a63;
  --red:#e08a7a; --blue-ink:#8fb5ee;
  --tape-mint:#28483d; --tape-butter:#4d4324; --tape-coral:#5a3a31; --tape-sky:#2e4059;
}
html.dark .dj-page{background-image:radial-gradient(rgba(255,255,255,.05) 1.1px,transparent 1.1px);}
html.dark .dj-cover,html.dark .dj-sheet,html.dark .dj-mascot-card,html.dark .dj-stamp-card{box-shadow:4px 5px 0 rgba(0,0,0,.32);}
html.dark .dj-date i{background:rgba(255,255,255,.04);}
html.dark .dj-wavebar{background:#182233;}
html.dark .dj-reset{color:#7f8fa5;}
html.dark .dj-stamp-btn{border-color:#57503f;color:#8d8471;}
html.dark .dj-entry,html.dark .dj-stage,html.dark .dj-turn-stage,html.dark .dj-lab-chip{background:#243247;}
html.dark .dj-start-badge{color:#d9bc72;}
html.dark .dj-turn-track li{color:#7f8fa5;}
html.dark .dj-turn-track li:not(:last-child)::after{border-color:#41506a;}
html.dark .dj-turn-track i{border-color:#57503f;background:#243247;color:#8d8471;}
/* 活动步的特异性更高，深色下必须单独压回来，否则数字几乎不可读。 */
html.dark .dj-turn-track li.dj-on i{background:#2e4059;color:#cfe0fa;border-color:#8fb5ee;}
html.dark .dj-polaroid{background:#243247;box-shadow:3px 5px 10px rgba(0,0,0,.4);}
html.dark .dj-memo{border-color:#65552e;background:#2c2618;color:#cdb489;}
html.dark .dj-sticky{color:#cfc4ab;background:#33301c;border-color:#5a512e;}
html.dark .dj-sticky:nth-child(2){background:#1f3328;border-color:#31553f;}
html.dark .dj-sticky:nth-child(3){background:#38221e;border-color:#5f3a32;}
html.dark .dj-sticky:nth-child(4){background:#1e2b40;border-color:#31486b;}
html.dark .dj-sticky b{color:var(--ink);}
html.dark .dj-sticky i{color:#9a8f74;}
html.dark .dj-footer{color:#76879d;}
html.dark .dj-tabs button[aria-selected='true']{outline-color:rgba(10,16,28,.5);}

@media (prefers-reduced-motion:reduce){
  .dj-mascot,.dj-eye{animation:none;}
  *,*::before,*::after{animation-duration:.001s!important;transition-duration:.001s!important;}
}
@media (max-width:880px){
  .dj-grid{grid-template-columns:1fr;}
  .dj-side{position:static;flex-direction:row;flex-wrap:wrap;}
  .dj-mascot-card,.dj-stamp-card,.dj-toc{flex:1 1 250px;}
  .dj-lab-grid,.dj-stage-grid{grid-template-columns:1fr;}
  .dj-turn-track{flex-wrap:wrap;gap:8px 0;}
  .dj-turn-track li{flex:1 1 33%;}
  .dj-turn-track li:nth-child(3)::after,.dj-turn-track li:last-child::after{display:none;}
  .dj-sheet{padding:22px 18px;}
  .dj-page{margin:-24px -16px 0;padding-left:16px;padding-right:16px;}
}
:focus-visible{outline:3px solid var(--blue-ink);outline-offset:2px;border-radius:4px;}

/*
 * 滚动入场（纯 CSS 滚动时间线，2026 Baseline）。
 * 双层降级：不支持 view() 的浏览器和减少动态偏好下完全静态；
 * 只动 opacity/transform，合成器线程执行。集章卡的进度数字仍来自
 * localStorage 的真实记录，滚动只负责入场，不参与任何数值。
 */
@media (prefers-reduced-motion: no-preference) {
  @supports (animation-timeline: view()) {
    .dj-stamp-card,.dj-mascot-card,.dj-toc{
      animation:dj-enter 1ms linear both;
      animation-timeline:view();
      animation-range:entry 0% entry 55%;
    }
    .dj-lab-chip{
      animation:dj-enter 1ms linear both;
      animation-timeline:view();
      animation-range:entry 5% entry 45%;
    }
    @keyframes dj-enter{
      from{opacity:0;transform:translateY(20px)}
      to{opacity:1;transform:none}
    }
  }
}

/* line boil 滤镜容器：不占布局。 */
.dj-defs{position:absolute;width:0;height:0;overflow:hidden;}

/*
 * 阿溟的「沸腾」边缘：只在用户未要求减少动态时引用滤镜，
 * SMIL 离散换帧让像素画的轮廓像手绘卡通一样微微颤动。
 */
@media (prefers-reduced-motion: no-preference){
  .dj-mascot{filter:url('#dj-boil');}
}

/*
 * 集章卡的确定性手绘边框：rough.js 最小移植。
 * 两条种子固定的抖动路径替代直线边框，种子不变所以每次加载逐字节一致；
 * non-scaling-stroke 保证非等比拉伸下线宽恒定。
 */
.dj-stamp-card{position:relative;border-color:transparent;}
.dj-rough-frame{position:absolute;inset:5px;width:calc(100% - 10px);height:calc(100% - 10px);pointer-events:none;}
.dj-rough-frame path{fill:none;stroke:var(--blue-ink);stroke-width:1.4;stroke-linecap:round;vector-effect:non-scaling-stroke;opacity:.8;}
.dj-rough-frame .dj-rough-frame-b{stroke-width:.9;opacity:.38;}
html.dark .dj-rough-frame path{stroke:var(--blue);}
</style>
