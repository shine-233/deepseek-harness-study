#!/usr/bin/env node

/**
 * 生成固定版本 DeepSeek Harness 的逐源文件中文索引。
 *
 * 这个工具只把 upstream commit 中已经存在的文件当作索引对象，因此不会
 * 把本学习仓库新增的导读文件偷偷算进官方源码范围。源码内容可以通过
 * --source-root 指向一次性下载的归档，用来补充行数和导出名；没有内容时，
 * 仍然可以只依靠 Git tree 生成完整的路径覆盖清单。
 */

import { execFileSync } from 'node:child_process'
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { basename, extname, join, posix, resolve } from 'node:path'

const SOURCE_EXTENSIONS = new Set([
  '.ts', '.tsx', '.js', '.jsx', '.mjs', '.cjs', '.vue', '.svelte',
  '.py', '.c', '.cc', '.cpp', '.h', '.hh', '.hpp', '.rs', '.go',
  '.java', '.kt', '.kts', '.sh', '.bash', '.ps1', '.bat', '.cmd',
  '.sql', '.html', '.css', '.scss',
])

const MANUAL_FILES = new Set([
  'vendor/cordis/src/context.ts',
  'vendor/cordis/src/fiber.ts',
  'vendor/cordis/src/service.ts',
  'vendor/cordis/src/events.ts',
  'packages/boot/app-boot/src/index.ts',
  'packages/boot/app-boot/src/profile.ts',
  'packages/bundle/base/src/index.ts',
  'packages/bundle/headless/src/index.ts',
  'packages/bundle/web-app/src/index.ts',
  'packages/core/session/src/index.ts',
  'packages/core/session/src/types.ts',
  'packages/core/session/src/preparation.ts',
  'packages/core/agent/src/index.ts',
  'packages/core/agent/src/types.ts',
  'packages/core/agent-loop/src/agent.ts',
  'packages/core/agent-loop/src/index.ts',
  'packages/core/agent-loop/src/runtime-context.ts',
  'packages/core/agent-loop/src/tool-calls.ts',
  'packages/core/tools/src/index.ts',
  'packages/core/tools/src/schema.ts',
  'packages/core/tools/src/presentation.ts',
  'packages/llm/llm/src/index.ts',
  'packages/llm/llm/src/assembler.ts',
  'packages/llm/llm-deepseek/src/adapter.ts',
  'packages/llm/llm-deepseek/src/sse.ts',
  'apps/cli/src/bin.ts',
  'apps/cli/src/profile-boot.ts',
])

const ROLE_RULES = [
  { test: p => /(^|\/)(mock-server|fake-api)\.[^.]+$/i.test(p), role: '测试服务器', purpose: '这个文件启动或描述测试用的模拟服务，记录请求并返回受控响应，让网络行为可以离线、重复地验证。' },
  { test: p => /(^|\/)(contract|coordinator-contract)\.[^.]+$/i.test(p), role: '共享测试契约', purpose: '这个文件把一组后端或实现都必须满足的测试规则集中起来，让多个实现用同一份契约比较。' },
  { test: p => /(^|\/)(assemble|event-script|.*helper|fake-api|tool-details-render)\.[^.]+$/i.test(p) && /\/tests\//i.test(p), role: '测试工具', purpose: '这个文件给多个测试提供组装、模拟或渲染辅助；它帮助测试表达意图，但自己通常不负责最终断言。' },
  { test: p => /(^|\/)fixtures?(\/|$)|snapshot/i.test(p), role: '测试夹具', purpose: '这个文件提供测试需要的固定输入、输出或快照。它不是线上功能本身，而是让测试每次使用同一份材料。' },
  { test: p => isTestCase(p), role: '测试用例', purpose: '这个文件用自动化检查一个行为、边界或回归问题。它把“应该发生什么”写成可以重复运行的证据。' },
  { test: p => isTestFile(p), role: '测试支持', purpose: '这个文件是测试运行需要的支持代码；它准备输入、启动替身或复用断言，但不把自己冒充成最终测试用例。' },
  { test: p => p === 'vendor/cordis/src/context.ts', role: 'Cordis 上下文', purpose: '这个文件定义插件共享的 Context，以及事件、服务和插件能力怎样挂到这个上下文上。它是理解“一切皆插件”的起点。' },
  { test: p => /\.css$/i.test(p), role: '界面样式', purpose: '这个文件描述网页元素的外观、布局或状态样式，让界面逻辑和视觉规则可以分别修改。' },
  { test: p => /(^|\/)invariant\.[^.]+$/i.test(p), role: '运行时不变量', purpose: '这个文件把必须始终成立的条件集中起来，并在条件被破坏时尽早报错。它帮助其他实现保持同一套边界。' },
  { test: p => /(^|\/)(repair|recovery)\.[^.]+$/i.test(p), role: '故障修复', purpose: '这个文件处理中断、损坏或不完整状态，把可以安全解释的事实恢复成一致状态，同时保留不能确定的部分。' },
  { test: p => /(persistence|storage|sqlite|jsonl)\.[^.]+$/i.test(p), role: '持久化边界', purpose: '这个文件负责把内存里的事实写到磁盘或从磁盘读回来。把它和领域逻辑分开，可以替换存储后端并单独测试崩溃和格式问题。' },
  { test: p => /(^|\/)surface\.[^.]+$/i.test(p), role: '可见表面投影', purpose: '这个文件把原始事件折叠成模型或界面真正需要看到的有序内容，同时保留原始事件作为来源。' },
  { test: p => /(^|\/)(json|json-schema)\.[^.]+$/i.test(p), role: 'JSON 边界', purpose: '这个文件检查或转换可安全序列化的 JSON 数据，阻止不可重放的对象穿过持久化和协议边界。' },
  { test: p => /(tsdown|vite|vitest|webpack|rollup)\.config\.[^.]+$/i.test(p) || /\/tsdown\.client\.[^.]+$/i.test(p), role: '构建或测试配置', purpose: '这个文件告诉构建器或测试运行器怎样找到入口、解析依赖和选择环境。把它单独放置，能让工具链规则可见且可重复。' },
  { test: p => /(^|\/)index\.[^.]+$/i.test(p), role: '模块入口', purpose: '这个文件是所在目录的门口，负责组装内部实现并决定哪些能力对外公开。调用者因此不必记住所有内部文件。' },
  { test: p => /(types?|interfaces?)\.[^.]+$/i.test(p), role: '类型契约', purpose: '这个文件集中说明数据长什么样、哪些字段必填以及各部分怎样关联。它让不同模块先对同一份“约定”达成一致。' },
  { test: p => /(schema|config|options|manifest)\.[^.]+$/i.test(p), role: '配置与数据形状', purpose: '这个文件定义配置或输入数据的形状，并通常负责校验。把校验集中起来，可以在错误进入深层逻辑前尽早发现。' },
  { test: p => /(^|\/)(events?|event-map)\.[^.]+$/i.test(p), role: '事件契约', purpose: '这个文件列出模块之间可以发送和接收的事件。用事件传递信息，能让生产者和消费者少互相导入，插件也更容易替换。' },
  { test: p => /(service|provider|registry)\.[^.]+$/i.test(p), role: '服务或提供方', purpose: '这个文件定义一项可被上下文取得的服务，或实现服务的注册与查找。接口和实现分开后，同一能力可以换成本地、远程或测试版本。' },
  { test: p => /(adapter|backend|client|transport)\.[^.]+$/i.test(p), role: '外部能力适配层', purpose: '这个文件把外部协议或后端的说法转换成 Harness 内部的说法。转换集中在边界，核心逻辑就不必到处处理供应商差异。' },
  { test: p => /(agent|loop|runtime|turn|step|request)\.[^.]+$/i.test(p), role: '智能体运行时', purpose: '这个文件参与一次智能体轮次：领取输入、请求模型、处理工具或结束轮次。把运行时状态集中管理，可以保住顺序、取消和错误处理规则。' },
  { test: p => /tool/i.test(basename(p)) || /(^|\/)tool[s]?(\/|$)/i.test(p), role: '工具能力', purpose: '这个文件让模型或用户能够调用一项具体能力，通常同时处理参数、执行和结果展示。分成独立工具后，权限和测试可以逐项控制。' },
  { test: p => /(assembler|prompt|context)\.[^.]+$/i.test(p), role: '提示词与上下文', purpose: '这个文件把分散的上下文片段整理成模型能读的请求。集中组装可以保持顺序、来源和可重放性一致。' },
  { test: p => /(route|router|http|server)\.[^.]+$/i.test(p), role: '网络或路由层', purpose: '这个文件把外部请求映射到内部服务，并处理协议边界。这样 Web、命令行和内部逻辑不会混在同一个函数里。' },
  { test: p => /(worker|thread|process|subprocess)\.[^.]+$/i.test(p), role: '进程或线程边界', purpose: '这个文件负责把工作放进独立进程、线程或 worker 中。边界能隔离资源、取消和崩溃影响，也方便替换执行后端。' },
  { test: p => /(hook|middleware|plugin)\.[^.]+$/i.test(p), role: '扩展钩子', purpose: '这个文件在既有流程的指定位置接入额外行为。钩子让新功能不必复制整个主流程，同时保留卸载和组合能力。' },
  { test: p => /(util|utils|helper|helpers|common)\.[^.]+$/i.test(p), role: '共享小工具', purpose: '这个文件放一个跨模块复用的小能力。把它单独放置可以减少重复，但它不应偷偷承担业务流程。' },
  { test: p => /(error|errors|exception)\.[^.]+$/i.test(p), role: '错误模型', purpose: '这个文件统一错误的类型、名称或转换方式。统一错误格式能让日志、用户界面和重试策略看懂同一件事。' },
  { test: p => /(^|\/)(bin|main|cli)\.[^.]+$/i.test(p), role: '程序入口', purpose: '这个文件接收启动参数并把程序交给真正的应用层。入口保持薄，可以让同一套业务逻辑被命令行、测试或其他宿主复用。' },
  { test: p => /(^|\/)(constants?|defaults?)\.[^.]+$/i.test(p), role: '常量与默认值', purpose: '这个文件集中放不会随一次调用改变的名称、默认值或限制。集中管理能避免不同模块悄悄使用不同的数字和字符串。' },
]

function parseArgs(argv) {
  const result = { commit: undefined, sourceRoot: undefined, outDir: 'study/文件索引' }
  for (let i = 0; i < argv.length; i += 1) {
    const value = argv[i]
    if (value === '--commit') result.commit = argv[++i]
    else if (value === '--source-root') result.sourceRoot = argv[++i]
    else if (value === '--out') result.outDir = argv[++i]
    else if (value === '--help') {
      console.log('用法: node study-tools/generate-source-index.mjs [--commit <提交>] [--source-root <源码目录>] [--out <输出目录>]')
      process.exit(0)
    }
  }
  return result
}

function git(args, cwd) {
  return execFileSync('git', args, { cwd, encoding: 'utf8' }).trim()
}

function isTestFile(file) {
  return /(^|\/)(test|tests|__tests__|fixtures?)(\/|$)|\.(test|spec|e2e|compat|snapshot)\.[^.]+$/i.test(file)
}

function isTestCase(file) {
  return /(^|\/)test_[^/]+\.[^.]+$/i.test(file)
    || /\.(test|spec|e2e|compat|snapshot)\.[^.]+$/i.test(file)
}

function isTestSupportFile(file) {
  return isTestFile(file) && !isTestCase(file)
}

function isFixtureFile(file) {
  return /(^|\/)fixtures?(\/|$)|snapshot/i.test(file)
}

function extension(file) {
  return extname(file).toLowerCase()
}

function layerFor(file) {
  const parts = file.split('/')
  if (parts.length === 1) return '仓库根部的构建、测试或开发入口'
  if (parts[0] === 'packages') return `packages/${parts[1] ?? '根部'}：可复用的 Harness 功能包`
  if (parts[0] === 'native' && /(^|\/)(scripts?|test|tests)(\/|$)/i.test(file)) {
    return '原生包的构建、发布和验证自动化'
  }
  return {
    '.agents': '供 agent 使用的规则、技能和自动化脚本',
    '.github': 'GitHub 工作流和项目自动化',
    apps: '可直接运行的 CLI 或 Web 应用',
    examples: '帮助学习和回归验证的可运行示例',
    native: '与操作系统或原生沙箱连接的运行时边界',
    python: 'Python SDK 或运行时支持',
    scripts: '构建、生成、检查和发布自动化',
    vendor: '第三方来源、由 DSH 固定并维护的 vendored fork / 本地快照',
    website: '文档网站或网站构建代码',
  }[parts[0]] ?? `仓库的 ${parts[0]} 层`
}

function packageReadme(file, pathSet) {
  const parts = file.split('/')
  for (let i = parts.length - 1; i >= 0; i -= 1) {
    const candidate = [...parts.slice(0, i), 'README.md'].join('/')
    if (pathSet.has(candidate)) return candidate
  }
  return undefined
}

function sourceLink(file, commit) {
  return `https://github.com/deepseek-ai/deepseek-harness/blob/${commit}/${file}`
}

function titleForBucket(bucket) {
  if (bucket === 'root.md') return '仓库根部'
  if (bucket === '.agents.md') return '.agents'
  if (bucket === '.github.md') return '.github'
  if (bucket === 'packages-root.md') return 'packages 根部'
  if (bucket.startsWith('packages-')) return `packages/${bucket.slice('packages-'.length, -3)}`
  return bucket.slice(0, -3)
}

function bucketFor(file) {
  const parts = file.split('/')
  if (parts[0] === 'packages') return `packages-${parts[1] ?? 'root'}.md`
  return `${parts[0] ?? 'root'}.md`
}

function stem(file) {
  return basename(file).replace(/\.[^.]+$/, '').replace(/\.(test|spec|e2e|compat|snapshot)$/i, '')
}

function packageRootFor(file) {
  const parts = file.split('/')
  if (parts[0] === 'packages') return parts.slice(0, 3).join('/')
  if (['apps', 'examples', 'native', 'python', 'vendor'].includes(parts[0])) return parts.slice(0, 2).join('/')
  return parts.slice(0, 1).join('/')
}

const ROLE_OVERRIDES = new Map([
  ['apps/cli/src/args.ts', { role: 'CLI 参数与 patch 解析', purpose: '它解析 Commander 参数、Profile 选择、patch overlay，并把未知剩余参数原样交给插件命令。' }],
  ['apps/cli/src/dump-config.ts', { role: '配置组合与诊断命令', purpose: '它组合 Profile、overlay 和补丁层，并输出最终配置或诊断信息，让用户看到实际生效的配置。' }],
  ['apps/cli/src/plugin.ts', { role: 'Profile 插件依赖管理', purpose: '它转发插件管理命令，并根据已安装依赖重新整理 Profile 的 bundle 层。' }],
  ['apps/cli/src/profile-boot.ts', { role: 'CLI Profile 启动编排', purpose: '它按顺序装配 Profile、bundle patch、用户 patch 和 telemetry patch，并把失败和关闭交给 CLI 的生命周期边界。' }],
  ['apps/cli/src/process-shutdown.ts', { role: 'CLI 优雅退出协调器', purpose: '它协调 graceful dispose、超时强退、重复信号升级和测试替身，保证 CLI 退出时插件资源有机会清理。' }],
  ['apps/cli/tsdown.config.ts', { role: 'CLI 构建配置', purpose: '它定义 CLI 的 Node/ESM 构建入口和产物边界。' }],
  ['apps/web/index.html', { role: 'HTML 页面壳', purpose: '它提供浏览器启动所需的 #root、manifest、favicon 和 TypeScript 入口。' }],
  ['apps/web/src/main.ts', { role: 'Web 启动入口', purpose: '它找到 #root，检查页面契约，再创建并运行 AppWebEntry。' }],
  ['apps/web/src/node-module-stub.ts', { role: '浏览器兼容桩', purpose: '它为浏览器构建提供故意失败的 node:module 桩，防止 Node-only 动态模块路径静默失效。' }],
  ['apps/web/stress-tests/reasoning-chunks.stress.ts', { role: '浏览器压力测试', purpose: '它用大量 reasoning chunk 测量浏览器事件处理和交互延迟，验证增量内容不会阻塞界面。' }],
  ['apps/web/tests/assembled-boot.ts', { role: '测试启动脚手架', purpose: '它装配 Web 测试插件、模拟浏览器环境并清理状态，供多个场景复用。' }],
  ['apps/web/tests/chat-scroll-fixture.ts', { role: '会话日志测试夹具', purpose: '它生成可重复的长会话 JSONL，供滚动、历史分页和虚拟列表测试使用。' }],
  ['apps/web/tests/scaffold.ts', { role: '浏览器 E2E 测试基础设施', purpose: '它统一 Web E2E 的真实组合、replay、临时目录、端口和清理流程。' }],
  ['apps/web/tests/support.ts', { role: '测试辅助工具', purpose: '它提供页面、端口、构建产物和失败截图等浏览器测试工具。' }],
  ['apps/web/tests/support/listen-probe.mjs', { role: '监听行为测试探针', purpose: '它探测 Server.prototype.listen 是否被调用，用于验证测试流程是否真的启动监听。' }],
  ['examples/acp-agent/pty-snapshot-backend.mjs', { role: '确定性 PTY 后端', purpose: '它提供内存中的 SnapshotSession，模拟 startSend、read、signal、status、close，并通过 Cordis terminals 服务注册，让 PTY 行为无需真实终端也能重复验证。' }],
  ['examples/acp-agent/tests/fixtures/shell/tool-pwsh/driver.ts', { role: 'Shell 工具测试驱动', purpose: '它启动 Loader，真实执行前台和后台 PowerShell，读取输出并写报告，用来验证 shell 工具的进程和输出边界。' }],
  ['examples/acp-agent/web-fetch-fixture-server.mjs', { role: 'Web Fetch 测试服务器', purpose: '它在固定 loopback 端口启动 HTTP server，供真实 web-fetch transport 和 Markdown 转换测试使用。' }],
  ['examples/headless-agent/tests/fixtures/cli-mock-llm.ts', { role: '无密钥模拟 LLM', purpose: '它模拟模型请求、工具调用和最终回答，让 headless CLI 测试在没有真实 API key 的条件下覆盖完整轮次。' }],
  ['examples/headless-agent/tests/fixtures/headless-driver.ts', { role: 'Headless 测试驱动', purpose: '它启动 headless Loader，以 JSONL 输出 session event 和最终结果，把命令行黑盒流程变成可观察的测试输入。' }],
  ['examples/jsonrpc-agent/minimal.py', { role: 'Python SDK 最小示例', purpose: '它解析 prompt、workspace、provider、model 和 token 参数，创建 DeepSeekHarness，执行一个 turn 并打印最终回答。' }],
  ['python/sdk/tests/manual_sdk_agent_smoke.py', { role: '手动 SDK Smoke Test', purpose: '它是需要显式运行的 Python SDK 手动 smoke test，不由 pytest 自动收集，用来检查真实 runtime carrier、turn 和最终回答链路。' }],
  ['packages/core/agent-loop/src/runtime-context.ts', { role: '运行时上下文投影', purpose: '它把动态运行时上下文投影成可以保留到会话历史里的消息。' }],
  ['packages/core/agent-loop/src/tool-calls.ts', { role: '工具调用调度器', purpose: '它调度并发工具调用，处理独占屏障、取消、结果顺序和持久化事件。' }],
  ['packages/core/agent/src/model-selection.ts', { role: '模型选择与请求路由', purpose: '它管理 Agent 的 provider、model、reasoning 选择，并把选择同步到 prompt assembly 和请求路由。' }],
  ['packages/core/scope/src/scoped-events.generated.ts', { role: '生成的事件作用域路由表', purpose: '它由事件定义生成，把事件名映射到所属 scope subject。' }],
  ['packages/core/tools/src/json-schema.ts', { role: 'JSON Schema 子集验证器', purpose: '它验证 DSH 支持的 JSON Schema 子集、关键字组合和 object-root 约束。' }],
  ['packages/core/tools/src/presentation.ts', { role: '工具呈现契约', purpose: '它定义工具调用和结果如何呈现，不负责真正执行工具。' }],
  ['packages/core/tools/src/testing.ts', { role: '工具测试夹具工厂', purpose: '它提供 canonical tool-definition 测试夹具，让各个工具测试共享一致的定义材料。' }],
  ['packages/core/session/src/preparation.ts', { role: '会话发布前生命周期', purpose: '它管理尚未发布的 Session 及 provider-owned 状态，明确 prepare、publish、release 的幂等边界。' }],
  ['packages/core/session/src/chunk-rows.ts', { role: '会话分页行构建器', purpose: '它把会话事件整理成可分页、可渲染的读取行。' }],
  ['packages/core/session/src/request-header.ts', { role: '请求配置持久化锚点', purpose: '它记录请求配置变化，让会话恢复时能解释每次请求使用的选择。' }],
  ['packages/client/connection/src/api-path.ts', { role: 'Web 传输路径契约', purpose: '它集中定义 Web 传输共用的 /api 前缀，以及浏览器 mux/host WebSocket 的两个固定路径。' }],
  ['packages/client/runtime/src/client/sessions/manager.ts', { role: '客户端 Session 管理器', purpose: '它维护客户端的 Session 实例簇、会话列表快照、选择状态、未实例化请求缓冲、子 agent 目录和后台任务投影。' }],
  ['packages/session/session-persistence-jsonl/src/format.ts', { role: 'JSONL 磁盘格式', purpose: '它定义 JSONL 会话文件的路径编码、目录布局、首行 header、事件记录和截断修复规则。' }],
  ['packages/llm/llm-pi-ai/src/catalog.ts', { role: '模型目录物化器', purpose: '它把 pi-ai 的 provider/model catalog 与用户 route 配置合并成 Harness 可使用的模型快照，并拒绝不可服务的配置。' }],
  ['packages/llm/llm-deepseek/src/sse.ts', { role: 'DeepSeek SSE 流解析器', purpose: '它把 SSE 字节流拆成事件数据，处理分块重组、UTF-8/CRLF/BOM、注释和 DONE 结束标记；流在结束前没有 DONE 时报告截断。' }],
  ['native/landlock-run/src/index.ts', { role: '原生沙箱 Launcher API', purpose: '它找到当前平台的预编译 launcher，生成 --ro/--rw allow-list 参数并探测 full、partial 或 unusable 能力。' }],
  ['native/landlock-run/src/main.c', { role: 'Landlock 沙箱 Launcher', purpose: '它解析 probe、只读/读写 allow-list 和命令分隔符，创建 Landlock 规则并在限制当前进程后 exec 子命令；无法强制时 fail closed。' }],
  ['native/landlock-run/packages/entry/src/index.ts', { role: '原生沙箱 Launcher API', purpose: '它找到当前平台的预编译 launcher，生成 --ro/--rw allow-list 参数并探测 full、partial 或 unusable 能力。' }],
  ['native/landlock-run/packages/entry/src/main.c', { role: 'Landlock 沙箱 Launcher', purpose: '它解析 probe、只读/读写 allow-list 和命令分隔符，创建 Landlock 规则并在限制当前进程后 exec 子命令；无法强制时 fail closed。' }],
  ['website/.vitepress/config.ts', { role: '文档网站构建配置', purpose: '它配置 VitePress，依据发布清单生成 sidebar、搜索、编辑链接、canonical 文档监听和网站样式。' }],
  ['website/docs.ts', { role: '文档发布清单', purpose: '它定义 locale、源 Markdown 到网站路由的映射、章节顺序、sidebar、outline 和翻译 fallback。' }],
  ['python/sdk-runtime/hatch_build.py', { role: 'Python runtime wheel 构建钩子', purpose: '它把平台相关的 runtime payload 放进 wheel，检查 executable、平台 tag 和不可发布的 sdist 形态；runtime 载体因此可以与高层 SDK 分开发布。' }],
  ['python/sdk-runtime/src/deepseek_harness_runtime/__init__.py', { role: 'Python 运行时载体解析器', purpose: '它定位已打包的生产 exe 或显式选择的开发 node carrier，解析平台与架构、提供默认 cordis.yml 路径，并生成启动参数；生产模式不会静默退回源码构建。' }],
  ['python/sdk/src/deepseek_harness/__init__.py', { role: 'Python SDK 公共导出入口', purpose: '它把 DeepSeekHarness、HarnessClient、Session、配置、结果、通知和协议模型集中导出，给 Python 调用者一个稳定的导入门面。' }],
  ['python/sdk/src/deepseek_harness/api.py', { role: 'Python 高层 SDK 会话 API', purpose: '它管理 DeepSeekHarness 的 runtime 生命周期、Session、turn、notification 收集和最终回答提取，把 Python 调用者与底层 JSON-RPC client 隔开。' }],
  ['python/sdk/src/deepseek_harness/models.py', { role: 'Python SDK 协议数据模型', purpose: '它定义 SDK 与 Harness runtime 之间的 JSON 值、通知、入站请求和 initialize 响应模型，让协议边界的字段形状可以被复用和校验。' }],
  ['scripts/build-exe-for-python-sdk.ts', { role: 'Python SDK 运行时构建器', purpose: '它构建 Python SDK 使用的 Node 单文件运行时，处理平台、架构、SEA/pkg、开发 carrier 和输出布局。' }],
  ['scripts/build-python-release.py', { role: 'Python SDK 发布构建器', purpose: '它构建 SDK wheel/runtime wheel，并验证平台 tag、runtime payload 和 PEP 440 版本。' }],
  ['scripts/check-vendor-manifest.sh', { role: 'Vendor 清单一致性检查器', purpose: '它检查 staged vendor 源码变化是否同步更新 vendor/README.md，避免来源、版本和许可证记录过期。' }],
  ['scripts/clean.ts', { role: '构建产物安全清理器', purpose: '它根据 project-reference 图计算可删除构建产物，拒绝未知残留、跨仓库路径和危险 symlink。' }],
  ['scripts/gen-third-party-notices.ts', { role: '第三方许可证声明生成器', purpose: '它从 npm、Python metadata、vendor manifest 和 SPDX 信息生成发布所需的第三方声明。' }],
  ['scripts/project-doc-site.ts', { role: '文档网站投影器', purpose: '它把 canonical Markdown 投影成 VitePress 文档树，并重写链接、图片和 frontmatter。' }],
  ['scripts/run-gates.ts', { role: '质量门禁调度器', purpose: '它按模式、并发度和依赖图调度质量门禁，处理跳过规则并汇总结果。' }],
  ['scripts/translation-pairing.ts', { role: '文档翻译配对检查器', purpose: '它维护中英文文档三件套、生成区域和 Git blob hash，防止翻译文件与源文件漂移。' }],
  ['scripts/release/process.ts', { role: '发布命令执行器', purpose: '它提供 attempt、capture、run 和 isEntry 等发布命令执行辅助，统一输出、失败和重试边界。' }],
  ['scripts/release/publish.ts', { role: '发布状态协调器', purpose: '它处理 registry 状态、完整性 hash、幂等发布和 transient error。' }],
  ['scripts/release/verify.ts', { role: '发布资格验证器', purpose: '它检查 release family、版本基线、tag 和 publishability gate。' }],
  ['scripts/wine-windows-gates.sh', { role: 'Wine Windows 兼容门禁', purpose: '它在 Wine/Windows 环境运行兼容性门禁，捕获与 Linux 原生运行不同的发布风险。' }],
  ['vendor/cordis/bin.js', { role: 'Cordis Loader 薄入口', purpose: '它以当前工作目录为 baseUrl 创建 Context，加载 Cordis Loader，安装 include 插件并读取当前目录的 cordis.yml；它不负责解析应用启动参数。' }],
  ['vendor/cordis/src/events.ts', { role: 'Cordis 事件派发核心', purpose: '它实现事件监听器注册、上下文过滤和 emit、parallel、serial、bail、waterfall 五种派发模式，并随 fiber 生命周期清理监听器。' }],
  ['vendor/cordis/src/fiber.ts', { role: 'Cordis 插件生命周期核心', purpose: '它管理插件依赖等待、配置校验、Effect 注册、反向清理、失败状态和卸载过程，是 Cordis 插件树的生命周期骨架。' }],
  ['vendor/cordis/src/reflect.ts', { role: 'Cordis 服务反射与代理', purpose: '它实现 ctx.get、ctx.set、ctx.provide、ctx.accessor、ctx.mixin 和代理上下文的服务解析。' }],
  ['vendor/cordis/src/registry.ts', { role: 'Cordis 插件注册表', purpose: '它定义插件形状、依赖声明、Inject 装饰器、插件 runtime 和依赖解析。' }],
  ['vendor/cordis/src/service.ts', { role: 'Cordis 服务生命周期', purpose: '它注册服务实例，并在所属 fiber 销毁时自动移除，保证服务不会脱离插件作用域残留。' }],
])

function roleFor(file) {
  return ROLE_OVERRIDES.get(file) ?? ROLE_RULES.find(rule => rule.test(file)) ?? {
    role: extension(file) === '.tsx' ? '界面组件或界面逻辑' : '功能实现',
    purpose: '这个文件承担所在目录的一项功能；具体用途由路径、顶部注释、声明和协作者补充。',
  }
}

const CONCEPT_WORDS = new Map([
  ['agent-loop', 'Agent 轮次'], ['agent', '智能体'], ['session-query', '会话查询'], ['session', '会话'],
  ['llm-deepseek', 'DeepSeek 模型适配'], ['llm', '大语言模型'], ['deepseek', 'DeepSeek'],
  ['system-prompt', '系统提示词'], ['prompt', '提示词'], ['tool', '工具'], ['tools', '工具'],
  ['bundle', 'Bundle 组合'], ['app-boot', '应用启动'], ['boot', '启动'], ['profile', 'Profile'],
  ['cordis', 'Cordis 插件框架'], ['context', '上下文'], ['event', '事件'], ['events', '事件'],
  ['api', 'API 边界'], ['gateway', '网关'], ['remote', '远程调用'], ['client', '浏览器端'],
  ['host', '服务端宿主'], ['web', 'Web 界面'], ['fs', '文件系统'], ['shell', 'Shell 命令'],
  ['terminal', '持久终端'], ['sandbox', '沙箱'], ['subprocess', '子进程'], ['storage', '存储'],
  ['persistence', '持久化'], ['mcp', 'MCP 连接'], ['subagent', '子 agent'], ['workflow', '工作流'],
  ['goal', '目标'], ['jobs', '后台任务'], ['schedule', '定时任务'], ['interaction', '人机交互'],
  ['hooks', '钩子'], ['native', '原生边界'], ['python', 'Python 支持'], ['example', '示例'],
  ['examples', '示例'], ['ui', '用户界面'], ['schema', '数据 schema'], ['config', '配置'],
  ['runtime', '运行时'], ['worker', '工作线程'], ['identity', '身份'], ['credential', '凭据'],
])

function conceptFor(file) {
  const parts = file
    .replace(/\.[^.]+$/, '')
    .split(/[\/_-]/)
    .filter(token => token && !['src', 'tests', 'test', 'packages', 'apps', 'index', 'types', 'type', 'utils', 'util', 'common'].includes(token.toLowerCase()))
  const concepts = []
  for (const token of parts) {
    const value = CONCEPT_WORDS.get(token.toLowerCase())
    if (value && !concepts.includes(value)) concepts.push(value)
  }
  if (concepts.length > 0) return concepts.slice(0, 3).join('、')

  const packageRoot = packageRootFor(file)
  if (packageRoot === file) return `\`${file}\``
  const relative = file.startsWith(`${packageRoot}/`)
    ? file.slice(packageRoot.length + 1)
    : basename(file)
  return `\`${packageRoot}\` 包里的 \`${relative}\``
}

const SPECIFIC_PURPOSES = new Map([
  ['packages/client/connection/src/api-path.ts', '它集中定义 Web 传输共用的 `/api` 前缀，以及浏览器 mux/host WebSocket 的两个固定路径；服务端注册路由和浏览器连接端因此不会各自拼出不同字符串。'],
  ['packages/client/runtime/src/client/sessions/manager.ts', '它维护客户端的 Session 实例簇、会话列表快照、选择状态、未实例化请求缓冲、子 agent 目录和后台任务投影；Session 按需创建，但列表和事件不能因为尚未打开某个会话就丢失。'],
  ['packages/session/session-persistence-jsonl/src/format.ts', '它定义 JSONL 会话文件的物理格式：安全编码路径片段、项目和会话目录、首行 header、事件记录以及截断日志的修复偏移；文件格式规则集中在这里，读写流程才能共享同一套版本和安全边界。'],
  ['packages/llm/llm-pi-ai/src/catalog.ts', '它把 pi-ai 已安装的 provider/model catalog 物化成 Harness 可使用的 route：继承默认模型能力，再叠加配置中的模型、上下文、输入模态和 reasoning/compat 规则，并在配置解析阶段拒绝不可服务的 route。'],
  ['apps/cli/src/dump-config.ts', '它组合 Profile、overlay 和补丁层，并把最终配置或诊断信息输出给 CLI；把“配置如何合成”集中在 dump 命令里，用户才能看见实际生效的结果而不是某一份原始 YAML。'],
  ['apps/cli/src/plugin.ts', '它转发插件管理命令，并根据已安装依赖重新整理 Profile 的 bundle 层；插件命令因此只负责依赖和组合关系，不把插件业务逻辑塞进 CLI 主启动流程。'],
  ['apps/web/index.html', '它是浏览器页面壳：提供 `#root`、manifest、favicon 和 `/src/main.ts` 的入口；真正的 Web 应用由 TypeScript 启动，HTML 只承担浏览器必须先拥有的静态容器。'],
  ['apps/web/src/node-module-stub.ts', '它给浏览器构建提供故意失败的 `node:module` 桩；浏览器代码一旦误走到只能在 Node 中工作的动态模块路径，会尽早得到明确错误，而不是出现难诊断的空对象。'],
  ['apps/web/stress-tests/reasoning-chunks.stress.ts', '它用 100,000 个 reasoning chunk 压测浏览器事件处理和交互延迟，验证大量增量内容不会让界面更新退化成不可用的长任务。'],
  ['apps/web/tests/assembled-boot.ts', '它是 Web 测试共用的 jsdom 启动脚手架，负责装配插件、模拟浏览器环境和清理状态；测试场景只描述行为，不必重复启动整棵插件树。'],
  ['apps/web/tests/chat-scroll-fixture.ts', '它通过 Session 生成可重复的长会话 JSONL，供滚动、历史分页和虚拟列表测试使用；固定日志让性能和布局回归不会依赖真实用户数据。'],
  ['apps/web/tests/scaffold.ts', '它提供浏览器 E2E 的共同基础设施：真实 Web 组合、replay、临时目录、端口分配和清理；场景测试可以把注意力放在用户行为与断言上。'],
  ['apps/web/tests/support.ts', '它提供浏览器页面、端口、构建产物和失败截图等测试工具，统一 E2E 测试的启动、等待和诊断方式。'],
  ['apps/web/tests/support/listen-probe.mjs', '它给 Server.prototype.listen 加测试探针，用来确认某个流程是否真的启动监听；这是观察测试行为的工具，不是 Web 服务实现。'],
  ['packages/core/agent-loop/src/runtime-context.ts', '它实现 RuntimeContextProjection，把动态运行时上下文投影成可以保留到会话历史里的消息；运行时对象不直接写入日志，持久化的是这份稳定投影。'],
  ['packages/core/agent-loop/src/tool-calls.ts', '它调度一轮中的工具调用，处理并发、独占调用屏障、取消、结果顺序和持久化事件；它是工具调用编排器，不是某一个具体工具。'],
  ['packages/core/agent/src/model-selection.ts', '它定义 Agent 的 provider、model 和 reasoning 选择，并把选择同步到 Prompt Assembly 与请求路由；切换发生在明确边界，当前请求仍使用已经解析出的选择。'],
  ['packages/core/scope/src/scoped-events.generated.ts', '它是根据事件定义生成的作用域解析表：把事件名映射到对应的 scope subject；生成结果不应手改，源定义变化后应重新运行 scoped-events 生成命令。'],
  ['packages/core/tools/src/json-schema.ts', '它验证 DSH 支持的 JSON Schema 子集、关键字组合和 object-root 约束；工具参数在执行前先通过这道边界，运行时就不必各自解释一套不完整的 schema。'],
  ['packages/core/tools/src/presentation.ts', '它定义工具调用和工具结果怎样呈现，包括文件位置、差异、终端、搜索和 Web 结果等类型；它描述可见结果，不负责真正执行工具。'],
  ['packages/core/tools/src/testing.ts', '它提供 canonical tool-definition 测试夹具工厂，让各个工具测试使用一致的定义和参数材料；这些对象服务于测试，不是默认产品工具。'],
  ['packages/core/session/src/preparation.ts', '它管理尚未发布的 Session 及其 provider-owned 状态，提供可释放且幂等的准备生命周期；prepare 不等于 publish，发布后旧的 provider 回调必须变成安全的 no-op。'],
  ['packages/core/session/src/chunk-rows.ts', '它把会话事件整理成可以分页和渲染的行；分页行是面向读取的结构，不等于原始事件数组，因此历史折叠、边界和游标规则集中在这里。'],
  ['packages/core/session/src/request-header.ts', '它定义请求配置变化的持久化 header，给每次请求选择和后续恢复提供锚点；这不是普通辅助函数，而是会话日志解释请求上下文的一部分。'],
  ['apps/cli/tsdown.config.ts', '它定义 CLI 的 Node/ESM 构建边界，入口指向 `lib/types/bin.js`，并关闭不需要的 declaration 输出；构建产物因此从真正的命令入口开始，而不是把开发源文件路径暴露给用户。'],
  ['packages/core/agent-default-model/tsdown.config.ts', '它把默认模型包拆成 `index.js` 和 `invariant.js` 两个入口：正常能力与运行时不变量可以分别被依赖，避免只想检查配置的调用者加载完整实现。'],
  ['apps/web/vite.config.ts', '它约束浏览器构建边界，禁止 standalone serve，安排 vendor chunk，并把 boot grammar 等资源纳入构建；Web 开发服务器不能绕过 Harness 正式的启动组合。'],
  ['apps/web/src/main.ts', '它完成 Web 启动的三步：找到 `#root`，缺失时报告页面契约错误，再创建并运行 AppWebEntry；启动入口保持短小，具体组合放在应用对象和 Profile 层。'],
])

function compactComment(value) {
  return value
    .replace(/\/\*+!?/g, ' ')
    .replace(/\*\//g, ' ')
    .replace(/^\s*\*\s?/gm, '')
    .replace(/^\s*\/\/\s?/gm, '')
    .replace(/\s+/g, ' ')
    .replace(/\{@link\s+([^}]+)\}/g, '$1')
    .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
    .replace(/\[([^\]]+)\]/g, '$1')
    .replace(/[`]/g, '')
    .trim()
}

function leadingComment(text) {
  let rest = text.replace(/^#![^\n]*\n/, '').trimStart()
  const chunks = []
  while (rest.startsWith('/*') || rest.startsWith('//')) {
    if (rest.startsWith('/*')) {
      const end = rest.indexOf('*/', 2)
      if (end === -1) break
      chunks.push(rest.slice(0, end + 2))
      rest = rest.slice(end + 2).trimStart()
      continue
    }
    const lines = []
    while (rest.startsWith('//')) {
      const newline = rest.indexOf('\n')
      if (newline === -1) {
        lines.push(rest)
        rest = ''
        break
      }
      lines.push(rest.slice(0, newline))
      rest = rest.slice(newline + 1).trimStart()
    }
    chunks.push(lines.join('\n'))
  }
  const candidates = chunks.map(chunk => compactComment(chunk)).filter(Boolean)
  const value = candidates.find(candidate => !/copyright|spdx-license|generated file/i.test(candidate))
    ?? candidates[0]
    ?? ''
  return value.length > 260 ? `${value.slice(0, 257)}...` : value
}

function purposeFor(file, role, meta = {}) {
  const specific = SPECIFIC_PURPOSES.get(file)
  if (specific) return specific
  const overridden = ROLE_OVERRIDES.get(file)
  if (overridden?.purpose) return overridden.purpose
  const concept = conceptFor(file)
  if (role.role === 'Cordis 上下文') return '它定义 Cordis 插件共享的 Context，让服务、事件、注册表和插件生命周期可以在同一个作用范围内协作。'
  if (role.role === '测试服务器') return `它为 ${concept} 提供受控的模拟网络或模型服务，记录请求并返回可重复的响应，让测试不依赖真实网络。`
  if (role.role === '共享测试契约') return `它为 ${concept} 定义多种实现都必须通过的共同测试规则，避免 JSONL、SQLite 或不同宿主各自测试出不同标准。`
  if (role.role === '测试工具') return `它为 ${concept} 的测试提供组装、模拟或渲染辅助，让真正的测试用例可以把重点放在行为和断言上。`
  if (role.role === '测试夹具') return `它为 ${concept} 的测试提供固定输入、进程、事件或快照，让每次验证都从同一个受控状态开始。`
  if (role.role === '测试用例') return `它直接验证 ${concept} 的成功、失败或边界行为，把“应该发生什么”变成可以重复运行的证据。`
  if (role.role === '测试支持') return `它为 ${concept} 的测试提供共享准备或环境支持；真正的行为断言由导入它的测试用例完成。`
  if (role.role === '测试与验证') return `它用自动化测试 ${concept} 的成功、失败或边界行为，把“应该发生什么”变成可以重复运行的证据。`
  if (role.role === '测试材料') return `它为 ${concept} 的测试提供固定输入、输出或快照，让每次验证使用同一份材料。`
  if (role.role === '模块入口') return `它把 ${concept} 相关的公开能力集中导出，并决定调用者可以依赖哪些边界；调用者因此不必记住所有内部文件。`
  if (role.role === '类型契约') return `它描述 ${concept} 中流转的数据长什么样、哪些字段必填以及各部分怎样关联，让不同模块先共享同一份约定。`
  if (role.role === '配置与数据形状' || role.role === '构建或测试配置') return `它定义 ${concept} 的配置、输入形状或工具链规则，让错误在进入深层逻辑前暴露，并让重复运行使用同一套参数。`
  if (role.role === '事件契约') return `它列出 ${concept} 可以发送和接收的事件。用事件传递信息，能让生产者和消费者少互相导入，插件也更容易替换。`
  if (role.role === '服务或提供方') return `它定义或提供 ${concept} 的可取得服务，负责注册、查找或具体实现；接口和实现分开后，同一能力可以换成本地、远程或测试版本。`
  if (role.role === '外部能力适配层') return `它把外部协议转换成 ${concept} 能理解的内部协议。转换集中在边界，核心逻辑就不必到处处理供应商差异。`
  if (role.role === '智能体运行时') return `它参与 ${concept} 的一次运行：领取输入、请求模型、处理工具或结束轮次；把状态集中管理可以保住顺序、取消和错误处理规则。`
  if (role.role === '工具能力') return `它提供 ${concept} 的一项可调用能力，通常同时处理参数、执行和结果展示；独立工具让权限和测试可以逐项控制。`
  if (role.role === '提示词与上下文') return `它把 ${concept} 的分散信息整理成模型能读的请求。集中组装可以保持顺序、来源和可重放性一致。`
  if (role.role === '网络或路由层') return `它把外部请求接到 ${concept} 的内部服务，并处理协议边界；这样 Web、命令行和业务逻辑不会混在同一个函数里。`
  if (role.role === '进程或线程边界') return `它把 ${concept} 的工作放进独立进程、线程或 worker 中，隔离资源、取消和崩溃影响，也方便替换执行后端。`
  if (role.role === '运行时不变量') return `它检查 ${concept} 必须始终成立的条件，在错误刚出现时报告，而不是等到更深层才出现难以解释的结果。`
  if (role.role === '故障修复') return `它处理 ${concept} 发生中断或不完整时的修复路径，保留不能确定的事实而不把失败伪装成成功。`
  if (role.role === '持久化边界') return `它负责 ${concept} 在内存和磁盘格式之间的转换，把写入、读取、校验和崩溃恢复集中到可替换的边界。`
  if (role.role === '可见表面投影') return `它把 ${concept} 的原始事件折叠成模型或界面需要看到的有序内容，同时保留事件来源以便重放。`
  if (role.role === 'JSON 边界') return `它检查或转换 ${concept} 的可安全序列化 JSON 数据，阻止不可重放的对象穿过协议和持久化边界。`
  if (role.role === '界面样式') return `它定义 ${concept} 的网页外观、布局和状态样式，让界面逻辑与视觉规则可以分别修改。`
  if (role.role === '程序入口') return `它接收启动参数并把程序交给 ${concept} 的真正应用层；入口保持薄，可以让同一套业务逻辑被不同宿主复用。`
  if (role.role === '常量与默认值') return `它集中放置 ${concept} 使用的名称、默认值或限制，避免不同模块悄悄使用不同的数字和字符串。`
  const declarations = meta.exports?.length > 0
    ? `固定提交中扫描到的公开或顶层声明包括 ${meta.exports.slice(0, 4).map(name => `\`${name}\``).join('、')}。`
    : ''
  const hint = meta.doc ? `文件顶部注释把它定位为“${meta.doc}”。` : ''
  return `它负责 ${concept}；${hint}${declarations}把这块责任留在自己的层里，可以让调用关系清楚，修改时只影响需要它的部分。`
}

function designReason(file, role, meta = {}, graph = {}) {
  const specific = new Map([
    ['packages/client/connection/src/api-path.ts', '路由前缀和 WebSocket 路径是两端共同遵守的协议常量；集中定义可以防止服务端注册路径和浏览器连接路径发生漂移。'],
    ['packages/client/runtime/src/client/sessions/manager.ts', '会话列表、懒实例化、事件缓冲和子 agent 目录都影响客户端看到的同一份状态；由一个 manager 统一合并，可以避免不同 UI 组件各自维护不一致的副本。'],
    ['packages/session/session-persistence-jsonl/src/format.ts', '磁盘格式必须同时满足可恢复、可升级和路径安全；把编码、header 和截断修复放在格式层，读写器与会话领域逻辑就能共享同一套规则。'],
    ['packages/llm/llm-pi-ai/src/catalog.ts', '模型能力既来自 pi-ai 安装的 catalog，也来自用户配置；先在 route 解析阶段合并并拒绝缺字段的模型，运行时请求就不必承担配置诊断责任。'],
    ['packages/core/agent-loop/src/tool-calls.ts', '工具调用涉及并发和顺序两个容易冲突的维度；调度器集中处理屏障、取消和事件落盘，Agent 主循环只需要消费明确的结果。'],
    ['packages/core/session/src/preparation.ts', 'Session 的准备状态短暂且可能被重复释放；单独的生命周期对象可以把 prepare、publish、release 的幂等边界写清楚，不让 provider 资源泄漏到正常会话之外。'],
  ]).get(file)
  if (specific) return specific
  if (file.startsWith('vendor/')) return 'Vendored 源码单独放置，便于记录来源、版本、许可证和 DSH 的本地修改；它不是未经维护的黑盒上游，学习时要同时区分上游概念与 DSH 固定的 fork 行为。'
  if (ROLE_OVERRIDES.has(file)) return `把“${role}”作为独立边界，可以让调用者只依赖这一项职责；它的实现变化不会迫使整个应用层一起重写。`
  if (role === '测试夹具' || role === '测试支持') return '测试材料和被测实现分开，测试可以反复使用同一个受控输入；它不应该被误认为线上入口或生产服务。'
  if (role === '测试服务器') return '网络或模型依赖放进受控的模拟服务，测试才能重复触发成功、断开和错误响应；生产连接实现不必为了测试而改变行为。'
  if (role === '共享测试契约') return '多个实现共享同一组契约测试，才能比较它们是否遵守相同的外部行为；契约与具体实现分开也能减少复制断言。'
  if (role === '测试工具') return '测试辅助代码集中准备环境和输入，最终断言留在具体测试用例里；这样辅助逻辑可复用，又不会把“准备了什么”误当成“验证通过了什么”。'
  if (role === '测试用例') return '把一个行为写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。'
  if (role === '运行时不变量') return '把不变量集中在一个位置，调用者和测试就能用同一条规则检查状态；错误在边界处报告，比在后续 UI 或网络请求中才暴露更容易修复。'
  if (role === '故障修复') return '修复逻辑和正常写入分开，正常路径不会被大量恢复分支打断；恢复代码还能明确哪些事实可靠、哪些事实只能标记为未知。'
  if (role === '持久化边界') return '存储格式和业务对象分开，未来可以替换 JSONL、SQLite 或其他后端而不重写 Session 的核心语义。'
  if (role === '可见表面投影') return '原始事件保留完整事实，投影单独计算模型或 UI 所需的视图；视图可以重算，日志仍能用于审计和回放。'
  if (role === 'JSON 边界') return '协议和日志只接受可重放的 JSON 数据，把检查放在边界可以阻止函数、循环对象或带原型对象混入持久化事实。'
  if (role === '构建或测试配置') return '工具链配置独立于业务实现，构建、测试和发布可以复用同一套入口规则；改配置时也能单独看出运行环境变化。'
  if (isTestFile(file)) return '实现和验证分开，读者可以先看规则，再看实现是否满足规则；测试文件本身也能作为可运行的学习例子。'
  if (file.startsWith('scripts/')) return '把重复的构建或检查步骤写成脚本，所有贡献者都能用同一条命令得到相同结果，避免依赖个人记忆。'
  if (file.startsWith('apps/')) return '应用层负责把用户输入、运行环境和底层包接起来；它不应该重新实现核心能力，所以部署方式可以变化而核心逻辑不必复制。'
  if (file.startsWith('examples/')) return '示例故意把组合方式写得短而完整，让读者看到包怎样被挂载；它和产品代码分开，避免教学代码变成默认运行路径。'
  if (role === '模块入口') return '入口文件把公开边界固定下来，内部文件可以继续拆分或替换；其他包只依赖入口暴露的 API，依赖方向更稳定。'
  if (role === '类型契约' || role === '配置与数据形状') return '先把形状和规则集中声明，执行代码只负责使用已经检查过的数据；这样错误更早暴露，读代码时也有一张共同的地图。'
  if (role === '事件契约' || role === '扩展钩子') return '事件和钩子是插件之间的连接点。把连接点单独定义，可以让新增能力接入流程而不必修改所有旧消费者。'
  if (role === '服务或提供方' || role === '外部能力适配层') return '把“接口是什么”和“这一版怎样实现”分开，替换实现或写测试替身时不必改动使用者。'
  if (role === '智能体运行时') return '轮次状态、取消和顺序是高风险逻辑，集中在运行时文件中可以让不变量有一个明确的维护位置。'
  if (role === '界面样式') return '样式不和业务流程混在一起，浏览器端可以调整外观而不改变服务端或 agent 的行为。'
  if (meta.doc) return `固定提交的文件顶部注释把它定位为“${meta.doc}”；把这项职责单独放置，可以让边界、输入和失败处理在一个地方被阅读和测试。`
  const importedCount = graph.importsByFile?.get(file)?.length ?? 0
  const importerCount = graph.importersByTarget?.get(file)?.size ?? 0
  if (importedCount > 0 || importerCount > 0) {
    return `固定提交中它与 ${importedCount} 个相对依赖和 ${importerCount} 个直接使用者相连；保持这个文件职责较窄，可以让依赖方向和替换边界清楚。`
  }
  return `它被放在 ${file.split('/').slice(0, -1).join('/') || '仓库根部'} 的 ${role} 层中；独立成文件可以让这项规则有明确的维护位置，并能单独被检查。`
}

function readSourceText(file, sourceRoot) {
  if (!sourceRoot) return undefined
  const full = join(sourceRoot, ...file.split('/'))
  if (!existsSync(full)) return undefined
  return readFileSync(full, 'utf8')
}

function loadSourceTexts(sourceFiles, sourceRoot) {
  const result = new Map()
  if (!sourceRoot) return result
  for (const file of sourceFiles) {
    const text = readSourceText(file, sourceRoot)
    if (text !== undefined) result.set(file, text)
  }
  return result
}

function readMeta(file, sourceTexts) {
  const text = sourceTexts.get(file)
  if (text === undefined) return { lines: undefined, exports: [], tests: [], doc: '' }
  const names = new Set()
  const patterns = [
    /^\s*export\s+(?:default\s+)?(?:async\s+)?(?:function|class|interface|type|const|let|var|enum)\s+([A-Za-z_$][\w$]*)/gm,
    /^\s*(?:export\s+)?(?:async\s+)?(?:function|class|def)\s+([A-Za-z_$][\w$]*)/gm,
  ]
  for (const pattern of patterns) {
    for (const match of text.matchAll(pattern)) names.add(match[1])
  }
  const tests = new Set()
  const testPattern = /\b(?:describe|it|test)\s*\(\s*[`'\"]([^`'\"]+)/g
  for (const match of text.matchAll(testPattern)) tests.add(match[1].trim())
  return {
    lines: text.split(/\r?\n/).length - (text.endsWith('\n') ? 1 : 0),
    exports: [...names].slice(0, 8),
    tests: [...tests].slice(0, 6),
    doc: leadingComment(text),
  }
}

function importSpecifiers(text, file) {
  const found = new Set()
  const patterns = [
    /\b(?:import|export)\s+(?:type\s+)?[^;]*?\sfrom\s*['"]([^'"]+)['"]/g,
    /\b(?:import|export)\s*['"]([^'"]+)['"]/g,
    /\bimport\s*\(\s*['"]([^'"]+)['"]\s*\)/g,
    /\brequire\s*\(\s*['"]([^'"]+)['"]\s*\)/g,
    /^\s*from\s+([.]{1,2}[^\s]*)\s+import\b/gm,
    /^\s*import\s+([.]{1,2}[^\s]*)/gm,
  ]
  if (extension(file) === '.py') {
    patterns.push(
      /^\s*from\s+([A-Za-z_]\w*(?:\.[A-Za-z_]\w*)*)\s+import\b/gm,
      /^\s*import\s+([A-Za-z_]\w*(?:\.[A-Za-z_]\w*)*)/gm,
    )
  }
  for (const pattern of patterns) {
    for (const match of text.matchAll(pattern)) {
      const specifier = match[1]?.trim()
      if (specifier) found.add(specifier)
    }
  }
  return [...found]
}

const IMPORT_EXTENSIONS = ['.ts', '.tsx', '.js', '.jsx', '.mjs', '.cjs', '.vue', '.svelte', '.py', '.css', '.scss']

function resolvePathCandidate(raw, pathSet) {
  const normalized = posix.normalize(raw.replaceAll('\\', '/'))
  const explicitExtension = extname(normalized).toLowerCase()
  const withoutExtension = SOURCE_EXTENSIONS.has(explicitExtension)
    ? normalized.slice(0, -explicitExtension.length)
    : normalized
  const candidates = new Set([normalized])
  if (!SOURCE_EXTENSIONS.has(explicitExtension)) candidates.add(`${normalized}/index`)
  for (const base of [withoutExtension, normalized]) {
    for (const extension of IMPORT_EXTENSIONS) candidates.add(`${base}${extension}`)
    for (const extension of IMPORT_EXTENSIONS) candidates.add(`${base}/index${extension}`)
  }
  return [...candidates].find(candidate => pathSet.has(candidate))
}

function resolveRelativeImport(importer, specifier, pathSet) {
  if (!specifier.startsWith('.')) return undefined
  const clean = specifier.split(/[?#]/, 1)[0]
  const raw = posix.normalize(posix.join(posix.dirname(importer), clean))
  return resolvePathCandidate(raw, pathSet)
}

function resolvePythonRelativeImport(importer, specifier, pathSet) {
  if (extension(importer) !== '.py' || !specifier.startsWith('.')) return undefined
  // Python 的前导点表示包层级，不能直接当作文件系统的 "./" 拼接。
  const match = /^(\.+)(.*)$/.exec(specifier)
  if (!match) return undefined

  const level = match[1].length
  const moduleName = match[2].replace(/^\./, '')
  let base = posix.dirname(importer)
  for (let index = 1; index < level; index += 1) base = posix.dirname(base)

  const raw = moduleName.length > 0
    ? posix.join(base, moduleName.replaceAll('.', '/'))
    : base
  return resolvePathCandidate(raw, pathSet)
    ?? resolvePathCandidate(posix.join(raw, '__init__'), pathSet)
}

function readJsonFile(file, sourceRoot) {
  const text = readSourceText(file, sourceRoot)
  if (text === undefined) return undefined
  try {
    return JSON.parse(text)
  } catch {
    return undefined
  }
}

function loadModuleAliases(rawPaths, sourceRoot) {
  const packageAliases = new Map()
  const pythonModules = new Map()
  if (!sourceRoot) return { packageAliases, pythonModules }

  for (const file of rawPaths.filter(path => basename(path) === 'package.json')) {
    const manifest = readJsonFile(file, sourceRoot)
    if (typeof manifest?.name !== 'string') continue
    packageAliases.set(manifest.name, {
      root: posix.dirname(file),
      manifest,
    })
  }

  for (const file of rawPaths.filter(path => extension(path) === '.py')) {
    const parts = file.split('/')
    const srcIndex = parts.lastIndexOf('src')
    if (srcIndex === -1 || parts[0] !== 'python') continue
    const relative = parts.slice(srcIndex + 1)
    if (relative.length === 0) continue
    const last = relative[relative.length - 1]
    const moduleParts = last === '__init__.py'
      ? relative.slice(0, -1)
      : [...relative.slice(0, -1), last.replace(/\.py$/i, '')]
    if (moduleParts.length > 0) pythonModules.set(moduleParts.join('.'), file)
  }
  return { packageAliases, pythonModules }
}

function exportTargets(value) {
  if (typeof value === 'string') return [value]
  if (!value || typeof value !== 'object') return []
  const preferred = ['default', 'import', 'require', 'node', 'types', 'browser']
  const result = []
  for (const key of preferred) if (key in value) result.push(...exportTargets(value[key]))
  return result
}

function resolvePackageImport(specifier, aliases, pathSet) {
  const names = [...aliases.packageAliases.keys()]
    .sort((a, b) => b.length - a.length)
  const packageName = names.find(name => specifier === name || specifier.startsWith(`${name}/`))
  if (!packageName) return undefined
  const entry = aliases.packageAliases.get(packageName)
  const subpath = specifier.slice(packageName.length).replace(/^\//, '')
  const candidates = []
  if (subpath.length > 0) {
    candidates.push(posix.join(entry.root, subpath))
    candidates.push(posix.join(entry.root, 'src', subpath))
  } else {
    const rootExport = entry.manifest.exports?.['.'] ?? entry.manifest.exports
    for (const target of exportTargets(rootExport)) {
      if (target.startsWith('./')) candidates.push(posix.join(entry.root, target.slice(2)))
    }
    for (const field of ['module', 'main', 'types']) {
      if (typeof entry.manifest[field] === 'string') candidates.push(posix.join(entry.root, entry.manifest[field]))
    }
    candidates.push(posix.join(entry.root, 'src', 'index'))
    candidates.push(posix.join(entry.root, 'src', 'index.ts'))
  }
  return candidates.map(candidate => resolvePathCandidate(candidate, pathSet)).find(Boolean)
}

function resolveModuleImport(specifier, aliases, pathSet) {
  return resolvePackageImport(specifier, aliases, pathSet)
    ?? aliases.pythonModules.get(specifier)
}

function buildImportGraph(sourceFiles, sourceTexts, aliases) {
  const pathSet = new Set(sourceFiles)
  const importsByFile = new Map()
  const importersByTarget = new Map()
  for (const file of sourceFiles) {
    const text = sourceTexts.get(file)
    if (text === undefined) continue
    const targets = new Set()
    for (const specifier of importSpecifiers(text, file)) {
      const target = resolvePythonRelativeImport(file, specifier, pathSet)
        ?? resolveRelativeImport(file, specifier, pathSet)
        ?? resolveModuleImport(specifier, aliases, pathSet)
      if (target) targets.add(target)
    }
    importsByFile.set(file, [...targets].sort())
    for (const target of targets) {
      if (!importersByTarget.has(target)) importersByTarget.set(target, new Set())
      importersByTarget.get(target).add(file)
    }
  }
  return { importsByFile, importersByTarget }
}

function fallbackTests(file, allFiles) {
  const base = stem(file).toLowerCase()
  const directory = file.split('/').slice(0, -1).join('/')
  const packageRoot = packageRootFor(file)
  return allFiles
    .filter(candidate => isTestCase(candidate) && candidate !== file)
    .map(candidate => {
      const candidateBase = stem(candidate).toLowerCase()
      const samePackage = packageRootFor(candidate) === packageRoot
      const sameDirectory = candidate.split('/').slice(0, -1).join('/') === directory
      const nameMatch = candidateBase.includes(base) || base.includes(candidateBase)
      if ((!samePackage && !sameDirectory) || (!sameDirectory && !nameMatch)) return { candidate, score: -1 }
      let score = 0
      if (sameDirectory) score += 5
      if (samePackage) score += 3
      if (nameMatch) score += 5
      return { candidate, score }
    })
    .filter(item => item.score > 0)
    .sort((a, b) => b.score - a.score || a.candidate.localeCompare(b.candidate))
    .slice(0, 3)
    .map(item => item.candidate)
}

function indirectTests(file, graph) {
  const queue = [{ file, depth: 0 }]
  const visited = new Set([file])
  const result = new Set()
  while (queue.length > 0) {
    const current = queue.shift()
    if (current.depth >= 4) continue
    for (const importer of graph.importersByTarget.get(current.file) ?? []) {
      if (isTestCase(importer)) {
        result.add(importer)
        continue
      }
      if (visited.has(importer)) continue
      visited.add(importer)
      queue.push({ file: importer, depth: current.depth + 1 })
    }
  }
  return [...result].sort().slice(0, 6)
}

function testRelations(file, allFiles, graph) {
  if (isTestCase(file)) {
    return {
      files: [],
      indirectFiles: [],
      basis: '本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。',
    }
  }
  if (isTestSupportFile(file)) {
    const importingTests = [...(graph.importersByTarget.get(file) ?? [])]
      .filter(candidate => isTestCase(candidate))
      .sort()
    return {
      files: importingTests.slice(0, 6),
      indirectFiles: [],
      basis: importingTests.length > 0
        ? '固定提交源码中的本地静态 import 直接引用；这些测试用例实际使用了本支持文件。'
        : '本文件按路径分类为测试支持，固定提交中没有发现测试用例对它的直接相对 import。',
    }
  }
  const directTests = [...(graph.importersByTarget.get(file) ?? [])]
    .filter(candidate => isTestCase(candidate))
    .sort()
  if (directTests.length > 0) {
    return {
      files: directTests.slice(0, 6),
      indirectFiles: [],
      basis: '固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。',
    }
  }
  const indirect = indirectTests(file, graph)
  if (indirect.length > 0) {
    return {
      files: [],
      indirectFiles: indirect,
      basis: '固定提交源码中的本地静态 import 传递引用；这些测试通过包入口或中间模块到达本文件，不等于本文件被直接覆盖。',
    }
  }
  const inferred = fallbackTests(file, allFiles)
  return {
    files: inferred,
    indirectFiles: [],
    basis: inferred.length > 0
      ? '按同包文件名保守推断，未确认直接 import；这不是完整覆盖证明。'
      : '固定提交中没有找到直接或传递的本地静态 import，也没有找到明显的同包同名测试；公共入口可能仍有间接覆盖。',
  }
}

function testSupportFor(file, relation, graph) {
  const tests = isTestCase(file) ? [file] : relation.files
  const support = new Set()
  for (const test of tests) {
    for (const imported of graph.importsByFile.get(test) ?? []) {
      if (isTestSupportFile(imported) && imported !== file) support.add(imported)
    }
  }
  return [...support].sort().slice(0, 6)
}

function collaborators(file, pathSet, graph) {
  const result = []
  const readme = packageReadme(file, pathSet)
  if (readme) result.push(readme)
  result.push(...(graph.importsByFile.get(file) ?? []).slice(0, 3))
  result.push(...[...(graph.importersByTarget.get(file) ?? [])].sort().slice(0, 3))
  return [...new Set(result)].filter(candidate => candidate !== file).slice(0, 5)
}

function markdownLink(file, commit) {
  return `[${file}](${sourceLink(file, commit)})`
}

function main() {
  const args = parseArgs(process.argv.slice(2))
  const root = process.cwd()
  const commit = args.commit ?? git(['rev-parse', 'HEAD'], root)
  const rawPaths = git(['ls-tree', '-r', '--name-only', commit], root)
    .split(/\r?\n/)
    .map(value => value.trim().replace(/^\/+/, ''))
    .filter(Boolean)
  const sourceFiles = rawPaths.filter(file => SOURCE_EXTENSIONS.has(extension(file)))
  const pathSet = new Set(rawPaths)
  const sourceRoot = args.sourceRoot ? resolve(root, args.sourceRoot) : undefined
  const sourceTexts = loadSourceTexts(sourceFiles, sourceRoot)
  const moduleAliases = loadModuleAliases(rawPaths, sourceRoot)
  const importGraph = buildImportGraph(sourceFiles, sourceTexts, moduleAliases)
  const staticImportEdgeCount = [...importGraph.importsByFile.values()]
    .reduce((total, targets) => total + targets.length, 0)
  const output = resolve(root, args.outDir)
  mkdirSync(output, { recursive: true })
  const buckets = new Map()
  for (const file of sourceFiles) {
    const bucket = bucketFor(file)
    if (!buckets.has(bucket)) buckets.set(bucket, [])
    buckets.get(bucket).push(file)
  }

  for (const [bucket, files] of [...buckets.entries()].sort(([a], [b]) => a.localeCompare(b))) {
    files.sort()
    const lines = [
      `# 源文件索引：${titleForBucket(bucket)}`,
      '',
      `本页由 \`study-tools/generate-source-index.mjs\` 根据官方提交 \`${commit}\` 生成，共 ${files.length} 个代码或界面源文件。每个标题对应一个真实路径；用途和拆分原因是面向初学者的结构化解释，自动索引不等于人工精读。`,
      '',
    ]
    for (const file of files) {
      const role = roleFor(file)
      const meta = readMeta(file, sourceTexts)
      const relation = testRelations(file, sourceFiles, importGraph)
      const testFiles = relation.files
      const indirectTestFiles = relation.indirectFiles ?? []
      const testSupport = testSupportFor(file, relation, importGraph)
      const links = collaborators(file, pathSet, importGraph)
      const details = []
      if (meta.lines !== undefined) details.push(`约 ${meta.lines} 行`)
      if (meta.exports.length > 0) details.push(`扫描到的声明包括 ${meta.exports.map(name => `\`${name}\``).join('、')}`)
      if (meta.tests.length > 0) details.push(`扫描到的测试主题包括 ${meta.tests.map(name => `“${name}”`).join('、')}`)
      if (meta.doc) details.push(`文件顶部注释线索：${meta.doc}`)
      lines.push(`### ${markdownLink(file, commit)}`)
      lines.push('')
      lines.push(`- 所属层：${layerFor(file)}`)
      lines.push(`- 文件角色：${role.role}`)
      lines.push(`- 这个文件有什么用：${purposeFor(file, role, meta)}`)
      lines.push(`- 为什么这样设计：${designReason(file, role.role, meta, importGraph)}`)
      lines.push(`- 直接协作者：${links.length > 0 ? links.map(link => markdownLink(link, commit)).join('、') : '同目录没有可由路径确定的相邻源文件；先看所在包的 README 和入口文件。'}`)
      lines.push(`- 对应测试：${testFiles.length > 0 ? testFiles.map(test => markdownLink(test, commit)).join('、') : indirectTestFiles.length > 0 ? `间接测试线索（通过本地 import 链，非直接覆盖）：${indirectTestFiles.map(test => markdownLink(test, commit)).join('、')}` : isTestCase(file) ? '本文件本身就是测试用例。' : isTestSupportFile(file) ? '没有发现直接使用本支持文件的测试用例。' : '没有确认到直接测试；公共入口可能仍有间接覆盖。'}`)
      lines.push(`- 测试关联依据：${relation.basis}`)
      if (testSupport.length > 0) {
        lines.push(`- 测试支持：${testSupport.map(test => markdownLink(test, commit)).join('、')}`)
      }
      lines.push(`- 阅读顺序：先看所在层的说明，再看包 README 和入口，然后读本文件，最后对照测试；${MANUAL_FILES.has(file) ? '本文件另有人工精读，见 [核心文件精读](../03-核心文件精读.md)。' : '本条是自动索引，复杂行为需要回到源码和测试确认。'}`)
      lines.push(`- 代码证据：${details.length > 0 ? `固定提交归档实际读取结果：${details.join('；')}。` : '本次索引只读取了固定提交的 Git tree；没有把未经读取的实现细节写成确定事实。'} 这些数字和声明用于定位，不替代源码阅读。`)
      lines.push(`- 固定版本：源码链接固定到官方提交 \`${commit}\`；如果当前条目与运行版本不同，应先重新生成索引再下结论。`)
      lines.push('')
    }
    while (lines.at(-1) === '') lines.pop()
    writeFileSync(join(output, bucket), `${lines.join('\n')}\n`, 'utf8')
  }

  const manifest = {
    upstreamRepository: 'https://github.com/deepseek-ai/deepseek-harness',
    commit,
    sourceExtensions: [...SOURCE_EXTENSIONS],
    sourceFileCount: sourceFiles.length,
    sourceReadFileCount: sourceTexts.size,
    staticImportEdgeCount,
    localPackageAliasCount: moduleAliases.packageAliases.size,
    localPythonModuleAliasCount: moduleAliases.pythonModules.size,
    files: sourceFiles,
  }
  writeFileSync(join(output, '..', 'source-index-manifest.json'), `${JSON.stringify(manifest, null, 2)}\n`, 'utf8')
  console.log(`已生成 ${sourceFiles.length} 个源文件条目，分成 ${buckets.size} 个索引页。读取源码 ${sourceTexts.size} 个文件，解析本地静态 import ${staticImportEdgeCount} 条。提交：${commit}`)
}

main()
