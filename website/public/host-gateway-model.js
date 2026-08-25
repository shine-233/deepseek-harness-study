/**
 * Web GUI 宿主半区：路由表扫描、回退座位与目录选择器接缝的纯模型。
 *
 * 事实来源是固定提交 aa6c361a 里 packages/host/README.md 与各包 README：
 *
 *   webserver 是所有客户端形态共用的 HTTP 路由载体（ctx.webServer）；
 *   frontend-static 坐在「回退座位」上——只在没有任何已注册路由命中时，
 *   才把 SPA dist 的文件发出去；apiproxy 是与传输无关的宿主网关，浏览器侧
 *   由 client/connection 提供载体；directory-picker 是一条共享接缝
 *   （ctx.directoryPicker），native 与 browse 两个后端互相替换，auto 按
 *   宿主能力装配其中一个；替换后端不改变消费方的请求契约。
 *
 * 教学约定：路由表是教学示例，不是 apiproxy 的完整生产清单；
 * 每一步扫描按固定顺序逐条比较。没有真实 HTTP 监听或真实文件系统。
 */

export const HOST_REQUESTS = Object.freeze(['inventory-api', 'picker-api', 'spa-doc', 'spa-asset'])
export const PICKER_BACKENDS = Object.freeze(['native', 'browse', 'auto'])

export const HOST_REQUEST_LABELS = Object.freeze({
  'inventory-api': 'GET /api/pluginInventory/list —— 插件清单只读投影',
  'picker-api': 'POST /api/directoryPicker/pick —— 选定工作区目录',
  'spa-doc': 'GET / —— SPA 文档请求',
  'spa-asset': 'GET /assets/app.css —— SPA 静态资源',
})

export const PICKER_LABELS = Object.freeze({
  native: 'native：宿主原生目录对话框',
  browse: 'browse：应用内目录浏览器',
  auto: 'auto：按宿主能力装配其一',
})

/** 教学路由表：注册顺序即扫描顺序；frontend-static 不在此表里，它守回退座位。 */
const ROUTE_TABLE = Object.freeze([
  Object.freeze({ path: '/api/directoryPicker/pick', owner: 'directory-picker 接缝', serves: 'ctx.directoryPicker 后端' }),
  Object.freeze({ path: '/api/pluginInventory/list', owner: 'plugin-inventory', serves: 'Loader 当前条目的只读投影' }),
])

function resolvePickerBackend(mode) {
  if (mode === 'auto') return 'native（本教学宿主具备原生对话框能力）'
  return mode
}

export function buildHostGatewayModel(input = {}) {
  const request = HOST_REQUESTS.find(item => item === input.request)
  if (request === undefined) throw new RangeError('未知请求：' + String(input.request))
  const picker = PICKER_BACKENDS.find(item => item === input.picker)
  if (picker === undefined) throw new RangeError('未知后端：' + String(input.picker))

  const requestPath = {
    'inventory-api': '/api/pluginInventory/list',
    'picker-api': '/api/directoryPicker/pick',
    'spa-doc': '/',
    'spa-asset': '/assets/app.css',
  }[request]

  const steps = []
  const push = (op, detail, extras = {}) => {
    steps.push({ index: steps.length, op, detail, ...extras })
  }

  push(`webserver 收到 ${requestPath}`,
    '唯一的 HTTP 载体：无论哪个客户端形态，请求都从这条载体进来',
    { kind: 'carrier' })

  let matchedIndex = -1
  for (let order = 0; order < ROUTE_TABLE.length; order += 1) {
    const route = ROUTE_TABLE[order]
    const hit = route.path === requestPath
    push(`路由扫描 #${order + 1}：${route.path}`,
      hit ? `命中——处理权交给注册方：${route.owner}` : '未命中——继续向下扫，回退座位先不动',
      { kind: 'scan', hit })
    if (hit) {
      matchedIndex = order
      break
    }
  }

  if (matchedIndex >= 0) {
    const route = ROUTE_TABLE[matchedIndex]
    push(`已注册路由应答：${route.owner}`,
      `回退座位保持沉默——frontend-static 只接没人认领的请求`,
      { kind: 'serve', fallback: false })
    if (request === 'picker-api') {
      push(`接缝解析：${resolvePickerBackend(picker)}`,
        '消费方仍调用同一个 ctx.directoryPicker 接缝；换的是接缝后面的注册者',
        { kind: 'seam' })
    }
  } else {
    push('全部已注册路由未命中',
      '没有任何插件认领这个路径——轮到回退座位',
      { kind: 'scan', hit: false })
    push('frontend-static 应答（回退座位）',
      request === 'spa-doc'
        ? 'SPA 文档请求落在回退座位：发出 dist 目录的 index.html'
        : '静态资源请求落在回退座位：按路径发出 dist 目录里的文件',
      { kind: 'serve', fallback: true })
  }

  const usedFallback = steps.some(step => step.kind === 'serve' && step.fallback === true)
  const matchedRoute = matchedIndex >= 0 ? ROUTE_TABLE[matchedIndex].path : null

  return {
    input: { request, picker },
    routeTable: ROUTE_TABLE,
    steps,
    observations: {
      matchedRoute,
      usedFallback,
      scanSteps: steps.filter(step => step.kind === 'scan').length,
      servingBackend: request === 'picker-api' ? resolvePickerBackend(picker) : null,
      oneCarrier: true,
    },
    canProve: Object.freeze([
      '回退座位只在所有已注册路由都未命中后才被咨询。',
      '已注册路由命中时短路扫描：frontend-static 保持沉默。',
      'native 与 browse 在同一条 ctx.directoryPicker 接缝后面互换，消费方的请求契约不变。',
      '所有请求共用同一个 webserver 载体；apiproxy 的契约不绑定某一种传输。',
    ]),
    cannotProve: Object.freeze([
      'apiproxy 生产路由的完整清单——本页路由表是教学示例。',
      '真实 HTTP 监听、端口分配或 TLS 终止行为。',
      'auto 模式在真实宿主上的能力探测结果；教学环境固定为具备原生对话框。',
    ]),
  }
}

export function evaluateHostGatewayOracle(model) {
  const checks = []
  const add = (id, label, pass, expected, actual) => checks.push({ id, label, pass, expected, actual })

  add('ONE_CARRIER', '每个剧本恰好一次载体接收，没有第二条通道',
    model.steps.filter(step => step.kind === 'carrier').length === 1 && model.observations.oneCarrier,
    '1 次', `${String(model.steps.filter(step => step.kind === 'carrier').length)} 次`)

  const scans = model.steps.filter(step => step.kind === 'scan')
  const firstHit = scans.findIndex(step => step.hit === true)
  add('REGISTERED_SHORTCIRCUITS', '命中即短路：命中的是首个匹配项，其后不再有扫描步骤',
    firstHit < 0 || scans.slice(firstHit + 1).every(step => step.kind !== 'scan'),
    firstHit < 0 ? '扫完整表' : `第 ${String(firstHit + 1)} 次比较后短路`,
    firstHit < 0 ? '扫完整表' : scans.slice(firstHit + 1).some(step => step.kind === 'scan') ? '命中后仍在扫描' : `第 ${String(firstHit + 1)} 次比较后短路`)

  add('FALLBACK_ONLY_ON_TOTAL_MISS', '回退座位只在全部未命中时出现',
    model.observations.usedFallback === !model.observations.matchedRoute,
    model.observations.matchedRoute === null ? '使用回退' : '不使用回退',
    model.observations.usedFallback ? '使用回退' : '不使用回退')

  if (model.input.request === 'picker-api') {
    add('SEAM_CONTRACT_UNCHANGED', '换后端不改请求侧契约：接缝步骤存在且消费方调用不变',
      model.steps.some(step => step.kind === 'seam'),
      '接缝解析 1 步',
      `${String(model.steps.filter(step => step.kind === 'seam').length)} 步`)
  }

  const rebuilt = buildHostGatewayModel(model.input)
  add('HOST_GATEWAY_DETERMINISTIC', '同一输入重建同一条时间线',
    JSON.stringify(rebuilt.steps) === JSON.stringify(model.steps),
    '两次一致', JSON.stringify(rebuilt.steps) === JSON.stringify(model.steps) ? '一致' : '不一致')

  return { pass: checks.every(check => check.pass), checks }
}
