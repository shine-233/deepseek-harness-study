/**
 * 跨实验导航（概念图谱导航）：
 *
 * 在每个实验页底部渲染「相关实验」链接组。映射表是手工策划的概念邻接——
 * 不是全量互链，而是只连概念最相邻的 2-3 个实验。
 * 自举一次；无 DOM 环境不安装。
 */

const RELATED = Object.freeze({
  'turn-flow': ['session-log', 'orchestration'],
  'package-graph': ['profile-loader', 'shell-seam'],
  'profile-loader': ['package-graph', 'shell-seam', 'plan-stack'],
  'session-log': ['turn-flow', 'session-fork', 'workflow-node'],
  'tool-visibility': ['fs-edit', 'skill-catalog', 'web-tool'],
  'fs-edit': ['tool-visibility', 'provider'],
  'web-tool': ['fs-edit', 'provider'],
  'code-mode-evidence': ['worker-protocol', 'jobs'],
  'compaction': ['session-projection', 'workflow-node'],
  'plugin-flow': ['guard-loop', 'plan-stack'],
  'llm-stream': ['prompt-assembly', 'trajectory'],
  'prompt-assembly': ['llm-stream', 'skill-catalog'],
  'hook-flow': ['approval-flow', 'jobs'],
  'approval-flow': ['hook-flow', 'client'],
  'session-fork': ['session-log', 'workflow-node'],
  'subagent-delegate': ['worker-protocol', 'orchestration'],
  'guard-loop': ['plugin-flow', 'jobs'],
  'jobs': ['worker-protocol', 'orchestration', 'guard-loop'],
  'orchestration': ['jobs', 'worker-protocol', 'plan-stack'],
  'worker-protocol': ['orchestration', 'jobs'],
  'workflow-node': ['trajectory', 'session-log', 'orchestration'],
  'client': ['workflow-node', 'provider'],
  'provider': ['web-tool', 'shell-seam'],
  'shell-seam': ['provider', 'profile-loader'],
  'trajectory': ['workflow-node', 'session-log'],
  'skill-catalog': ['tool-visibility', 'client'],
})

export function installRelatedLabs() {
  if (typeof document === 'undefined') return
  const main = document.querySelector('main.lab-shell')
  if (main === null) return

  const currentId = document.body.dataset.labId
    ?? window.location.pathname.match(/\/([\w-]+)-lab\.html/)?.[1]
    ?? null
  if (currentId === null || !RELATED[currentId]) return

  const related = RELATED[currentId]
  const footer = main.querySelector('.page-footer')
  if (footer === null) return

  const nav = document.createElement('nav')
  nav.className = 'related-labs'
  nav.setAttribute('aria-label', '相关实验')
  const heading = document.createElement('p')
  heading.className = 'section-intro'
  heading.textContent = '概念相邻的实验：'
  nav.append(heading)

  const list = document.createElement('div')
  list.className = 'related-list'
  for (const labId of related) {
    const link = document.createElement('a')
    link.className = 'story-beat'
    link.href = `./${labId}-lab.html`
    const label = document.createElement('span')
    label.textContent = labId.replace(/-/g, ' ')
    link.append(label)
    list.append(link)
  }
  nav.append(list)
  footer.before(nav)
}
