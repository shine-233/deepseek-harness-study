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
  { test: p => isTestCase(p), role: '测试用例', purpose: '这个文件用自动化检查一个行为、边界或回归问题。它把“应该发生什么”写成可以重复运行的证据。' },
  { test: p => isFixtureFile(p), role: '测试夹具', purpose: '这个文件提供测试需要的固定输入、输出或快照。它不是线上功能本身，而是让测试每次使用同一份材料。' },
  { test: p => isTestFile(p), role: '测试支持', purpose: '这个文件是测试运行需要的支持代码；它准备输入、启动替身或复用断言，但不把自己冒充成最终测试用例。' },
  { test: p => /(^|\/)scripts?\//i.test(p), role: '仓库自动化脚本', purpose: '这个文件执行构建、检查、生成、打包、发布或开发辅助命令，把容易重复出错的步骤固定成可复用的自动化流程。' },
  { test: p => /(^|\/)native\/[^/]+\/scripts?\//i.test(p), role: '原生包自动化脚本', purpose: '这个文件为原生包执行构建、打包或平台验证，把编译器、目标平台和发布产物规则集中在原生边界内。' },
  { test: p => p === 'vendor/cordis/src/context.ts', role: 'Cordis 上下文', purpose: '这个文件定义插件共享的 Context，以及事件、服务和插件能力怎样挂到这个上下文上。它是理解“一切皆插件”的起点。' },
  { test: p => /\.css$/i.test(p), role: '界面样式', purpose: '这个文件描述网页元素的外观、布局或状态样式，让界面逻辑和视觉规则可以分别修改。' },
  { test: p => /(^|[._-])(locale|locales|i18n)([._-]|$)/i.test(basename(p)), role: '本地化资源', purpose: '这个文件集中提供界面或运行时使用的语言文本和本地化键，让语言切换不必散落在业务组件里。' },
  { test: p => /(^|[._-])(slot|slots)([._-]|$)/i.test(basename(p)), role: '扩展槽位契约', purpose: '这个文件定义可插入能力的槽位、输入和生命周期，让插件或界面扩展可以接入明确的位置。' },
  { test: p => /(^|[._-])brand([._-]|$)/i.test(basename(p)), role: '品牌类型', purpose: '这个文件为字符串或标识符增加只在类型层可区分的品牌，避免把语义不同的 ID 当成同一种普通字符串传递。' },
  { test: p => /(^|[._-])(render|renderer|presentation)([._-]|$)/i.test(basename(p)), role: '呈现转换', purpose: '这个文件把领域数据、工具结果或协议消息转换成界面或终端可以呈现的结构，保持执行逻辑和显示逻辑分开。' },
  { test: p => /(^|[._-])(store|stores|settings-store|section-store|seat-store|welcome-store)([._-]|$)/i.test(basename(p)), role: '状态存储', purpose: '这个文件维护一块可观察的状态、快照或队列，把状态更新和读取规则集中起来，避免多个界面各自保存一份事实。' },
  { test: p => /(^|[._-])(projection|projection-store)([._-]|$)/i.test(basename(p)), role: '状态投影', purpose: '这个文件从事件或领域事实计算读取侧的状态投影，让查询和界面可以快速消费，同时保留重算投影的可能。' },
  { test: p => /(^|[._-])(session|sessions|conversation)([._-]|$)/i.test(basename(p)), role: '会话状态模型', purpose: '这个文件描述或维护一次会话、对话或其客户端状态，把会话边界、状态变化和读取方式集中起来。' },
  { test: p => /(^|[._-])(connection|connect|rpc|websocket)([._-]|$)/i.test(basename(p)), role: '连接与传输边界', purpose: '这个文件管理客户端与宿主或远端服务之间的连接、消息传输和断开状态，把网络不稳定性挡在上层逻辑之外。' },
  { test: p => /(^|[._-])api([._-]|$)/i.test(basename(p)), role: 'API 边界', purpose: '这个文件把一个对外 API 的请求、响应或客户端调用集中起来，让协议字段和内部服务之间有明确的转换位置。' },
  { test: p => /(^|[._-])protocol([._-]|$)/i.test(basename(p)), role: '协议边界', purpose: '这个文件定义进程、线程或网络双方交换的消息形状和生命周期，让两端可以独立实现并按同一契约验证。' },
  { test: p => /(^|[._-])controller([._-]|$)/i.test(basename(p)), role: '交互控制器', purpose: '这个文件把用户操作或外部事件编排成状态更新和命令调用，让界面组件不必直接管理完整业务流程。' },
  { test: p => /(^|[._-])manager([._-]|$)/i.test(basename(p)), role: '状态管理器', purpose: '这个文件协调一组相关实例、缓存或生命周期，把创建、选择、更新和清理规则放在一个可观察的管理边界内。' },
  { test: p => /(^|[._-])domain([._-]|$)/i.test(basename(p)), role: '领域模型', purpose: '这个文件表达一个领域对象或领域状态如何创建、折叠和约束，让外部存储与界面层不必重新定义业务语义。' },
  { test: p => /(^|[._-])(runner|run)([._-]|$)/i.test(basename(p)), role: '运行驱动', purpose: '这个文件启动、推进或收束一类任务运行，把输入、执行、输出和退出状态连接起来。' },
  { test: p => /(^|[._-])translate([._-]|$)/i.test(basename(p)), role: '协议翻译', purpose: '这个文件在两种消息、错误或配置表示之间做明确转换，让供应商或传输格式差异停留在边界。' },
  { test: p => /(^|[._-])(format|serialize|serialization|codec)([._-]|$)/i.test(basename(p)), role: '格式编解码', purpose: '这个文件负责把内存对象转换为线上的或磁盘上的表示，并在读回时检查格式边界。' },
  { test: p => /(^|[._-])(policy|guard|authority)([._-]|$)/i.test(basename(p)), role: '策略与权限边界', purpose: '这个文件集中判断一项操作是否允许、应使用哪条策略或需要哪种授权，让权限规则不散落在调用方。' },
  { test: p => /(^|[._-])(paths?|directory|roots?)([._-]|$)/i.test(basename(p)), role: '路径边界', purpose: '这个文件集中解析、规范化和约束文件或工作区路径，避免不同调用方各自处理平台差异和越界风险。' },
  { test: p => /(^|[._-])query([._-]|$)/i.test(basename(p)), role: '查询实现', purpose: '这个文件把筛选、游标、排序或读取逻辑组织成可复用查询，让调用方不必直接操作底层事件或存储。' },
  { test: p => /(^|[._-])(queue|inbox)([._-]|$)/i.test(basename(p)), role: '队列状态', purpose: '这个文件管理尚未处理或等待发送的项目，定义入队、出队、顺序和取消规则。' },
  { test: p => /(^|[._-])(message|messages|content)([._-]|$)/i.test(basename(p)), role: '消息模型', purpose: '这个文件定义消息或内容块的结构和转换，使模型、会话日志、工具和界面使用同一份消息语义。' },
  { test: p => /(^|[._-])startup([._-]|$)/i.test(basename(p)), role: '启动服务', purpose: '这个文件提供应用或 Bundle 启动阶段的一项服务，把环境检查、启动顺序和可关闭资源接到正式生命周期。' },
  { test: p => /(^|[._-])profile([._-]|$)/i.test(basename(p)), role: 'Profile 配置解析', purpose: '这个文件解析或组合 Profile 清单、bundle 和 patch，让同一套能力可以按宿主选择不同启动配置。' },
  { test: p => /(^|[._-])(invariant|invariants)([._-]|$)/i.test(basename(p)), role: '运行时不变量', purpose: '这个文件把必须始终成立的条件集中起来，并在条件被破坏时尽早报错。它帮助其他实现保持同一套边界。' },
  { test: p => /(^|[._-])(repair|recovery)([._-]|$)/i.test(basename(p)), role: '故障修复', purpose: '这个文件处理中断、损坏或不完整状态，把可以安全解释的事实恢复成一致状态，同时保留不能确定的部分。' },
  { test: p => /(^|[._-])(persistence|storage|sqlite|jsonl)([._-]|$)/i.test(basename(p)), role: '持久化边界', purpose: '这个文件负责把内存里的事实写到磁盘或从磁盘读回来。把它和领域逻辑分开，可以替换存储后端并单独测试崩溃和格式问题。' },
  { test: p => /(^|[._-])surface([._-]|$)/i.test(basename(p)), role: '可见表面投影', purpose: '这个文件把原始事件折叠成模型或界面真正需要看到的有序内容，同时保留原始事件作为来源。' },
  { test: p => /(^|[._-])(json|json-schema)([._-]|$)/i.test(basename(p)), role: 'JSON 边界', purpose: '这个文件检查或转换可安全序列化的 JSON 数据，阻止不可重放的对象穿过持久化和协议边界。' },
  { test: p => /(^|\/)(tsdown|vite|vitest|webpack|rollup)(?:\.[^.]+)*\.config\.[^.]+$/i.test(p) || /(^|\/)(tsdown|vite|vitest)\.[^.]+\.[^.]+$/i.test(p), role: '构建或测试配置', purpose: '这个文件告诉构建器或测试运行器怎样找到入口、解析依赖和选择环境。把它单独放置，能让工具链规则可见且可重复。' },
  { test: p => /(^|\/)index\.[^.]+$/i.test(p), role: '模块入口', purpose: '这个文件是所在目录的门口，负责组装内部实现并决定哪些能力对外公开。调用者因此不必记住所有内部文件。' },
  { test: p => /(^|[._-])(types?|interfaces?)([._-]|$)/i.test(basename(p)), role: '类型契约', purpose: '这个文件集中说明数据长什么样、哪些字段必填以及各部分怎样关联。它让不同模块先对同一份“约定”达成一致。' },
  { test: p => /(^|[._-])(schema|schemas|config|options|manifest)([._-]|$)/i.test(basename(p)), role: '配置与数据形状', purpose: '这个文件定义配置或输入数据的形状，并通常负责校验。把校验集中起来，可以在错误进入深层逻辑前尽早发现。' },
  { test: p => /(^|[._-])(events?|event-map)([._-]|$)/i.test(basename(p)), role: '事件契约', purpose: '这个文件列出模块之间可以发送和接收的事件。用事件传递信息，能让生产者和消费者少互相导入，插件也更容易替换。' },
  { test: p => /(^|[._-])(service|provider|registry|providers)([._-]|$)/i.test(basename(p)), role: '服务或提供方', purpose: '这个文件定义一项可被上下文取得的服务，或实现服务的注册与查找。接口和实现分开后，同一能力可以换成本地、远程或测试版本。' },
  { test: p => /(^|[._-])(adapter|backend|client|transport)([._-]|$)/i.test(basename(p)), role: '外部能力适配层', purpose: '这个文件把外部协议或后端的说法转换成 Harness 内部的说法。转换集中在边界，核心逻辑就不必到处处理供应商差异。' },
  { test: p => /(^|\/)packages\/client\/runtime\/src\/client\/sessions\//i.test(p), role: '客户端会话投影', purpose: '这个文件把会话事件投影成客户端可观察的行、状态或操作，供 Web/CLI 展示和交互使用。' },
  { test: p => /(^|\/)packages\/client\/ui-conversation\/src\//i.test(p), role: '对话界面逻辑', purpose: '这个文件实现对话界面中的一个节点、输入或显示边界，把会话模型转换为用户可以操作和阅读的 UI。' },
  { test: p => /(^|\/)packages\/client\/ui-tool\/src\//i.test(p), role: '工具呈现模型', purpose: '这个文件为工具卡片准备 diff、读取、搜索、终端或 Web 等展示模型；它描述工具结果怎样显示，不负责执行工具。' },
  { test: p => /(^|\/)packages\/client\/ui-trajectory\/src\//i.test(p), role: '轨迹界面逻辑', purpose: '这个文件实现 Agent 轨迹时间线或 ledger 的展示和折叠交互，让事件顺序与用户可读的视图保持一致。' },
  { test: p => /(^|\/)tool[s]?(\/|$)/i.test(p), role: '工具能力', purpose: '这个文件属于工具包，负责工具的参数、执行、结果或安全边界；分成独立工具后，权限和测试可以逐项控制。' },
  { test: p => /(^|[._-])(agent|loop|runtime|turn|step|request)([._-]|$)/i.test(basename(p)), role: '智能体运行时', purpose: '这个文件参与一次智能体轮次：领取输入、请求模型、处理工具或结束轮次。把运行时状态集中管理，可以保住顺序、取消和错误处理规则。' },
  { test: p => /(^|[-_])(assembler|prompt|context)([-_.]|$)/i.test(basename(p)), role: '提示词与上下文', purpose: '这个文件把分散的上下文片段整理成模型能读的请求。集中组装可以保持顺序、来源和可重放性一致。' },
  { test: p => /(^|[-_])(route|router|http|server)([-_.]|$)/i.test(basename(p)), role: '网络或路由层', purpose: '这个文件把外部请求映射到内部服务，并处理协议边界。这样 Web、命令行和内部逻辑不会混在同一个函数里。' },
  { test: p => /(^|[-_])(worker|thread|process|subprocess)([-_.]|$)/i.test(basename(p)), role: '进程或线程边界', purpose: '这个文件负责把工作放进独立进程、线程或 worker 中。边界能隔离资源、取消和崩溃影响，也方便替换执行后端。' },
  { test: p => /(^|[-_])(hook|middleware|plugin)([-_.]|$)/i.test(basename(p)), role: '扩展钩子', purpose: '这个文件在既有流程的指定位置接入额外行为。钩子让新功能不必复制整个主流程，同时保留卸载和组合能力。' },
  { test: p => /(^|[-_])(util|utils|helper|helpers|common)([-_.]|$)/i.test(basename(p)), role: '共享小工具', purpose: '这个文件放一个跨模块复用的小能力。把它单独放置可以减少重复，但它不应偷偷承担业务流程。' },
  { test: p => /(^|[-_])(error|errors|exception)([-_.]|$)/i.test(basename(p)), role: '错误模型', purpose: '这个文件统一错误的类型、名称或转换方式。统一错误格式能让日志、用户界面和重试策略看懂同一件事。' },
  { test: p => /(^|\/)(bin|main|cli)\.[^.]+$/i.test(p), role: '程序入口', purpose: '这个文件接收启动参数并把程序交给真正的应用层。入口保持薄，可以让同一套业务逻辑被命令行、测试或其他宿主复用。' },
  { test: p => /(^|\/)(constants?|defaults?)\.[^.]+$/i.test(p), role: '常量与默认值', purpose: '这个文件集中放不会随一次调用改变的名称、默认值或限制。集中管理能避免不同模块悄悄使用不同的数字和字符串。' },
  { test: p => /\.(d\.ts|d\.tsx)$/i.test(p), role: '类型声明', purpose: '这个文件补充运行时库或构建工具的类型声明，让调用者在编译期知道可用字段、参数和返回值，而不改变运行时行为。' },
  { test: p => /\.(vue|svelte)$/i.test(p) || /\.(tsx)$/i.test(p), role: '界面组件或界面逻辑', purpose: '这个文件实现一个可复用的界面组件或其交互逻辑，把输入、状态和用户操作组织成可渲染的 UI 单元。' },
  { test: p => /\.(c|cc|cpp|h|hh|hpp|rs)$/i.test(p), role: '原生实现', purpose: '这个文件实现与操作系统、进程或底层性能有关的原生部分；把它放在原生边界内，可以让上层通过稳定接口使用而不必了解平台细节。' },
  { test: p => /\.py$/i.test(p), role: 'Python 模块', purpose: '这个文件实现 Python SDK、运行时辅助或示例中的一项职责；它把 Python 调用方式与 Harness 的协议或运行载体连接起来。' },
  { test: p => /\.sql$/i.test(p), role: '数据库脚本', purpose: '这个文件定义数据库结构、查询或迁移步骤，让持久化格式的变化可以被审查、重复执行和回滚验证。' },
  { test: p => /\.html?$/i.test(p), role: '页面模板', purpose: '这个文件提供浏览器页面所需的静态容器和入口资源；具体交互交给脚本或组件，页面模板只保留宿主必须知道的结构。' },
  { test: p => /^vendor\//i.test(p), role: '第三方实现', purpose: '这个文件是 DSH 固定并维护的第三方实现，提供一个可被 Harness 依赖的底层能力；阅读时要同时核对 vendor Manifest 和 DSH 的本地修改。' },
  { test: p => /^native\//i.test(p), role: '原生实现', purpose: '这个文件位于原生运行时边界，负责把操作系统或平台能力提供给上层；上层不应绕过这里自行处理平台差异。' },
  { test: p => /(^|\/)tool-[^/]+\//i.test(p), role: '工具能力', purpose: '这个文件属于一个具体工具包，负责工具的参数、执行、结果或安全边界；工具包独立后，权限和测试可以逐项控制。' },
  { test: p => /(^|\/)ui-[^/]+\//i.test(p), role: '界面交互逻辑', purpose: '这个文件属于一个界面功能包，负责用户操作、视图状态或 UI 适配；它把浏览器体验接到稳定的运行时契约上。' },
  { test: p => /packages\/client\/runtime\/src\/client\/sessions\//i.test(p), role: '客户端会话投影', purpose: '这个文件把会话事件投影成客户端可观察的行、状态或操作，供 Web/CLI 展示和交互使用。' },
  { test: p => /packages\/client\/ui-conversation\/src\//i.test(p), role: '对话界面逻辑', purpose: '这个文件实现对话界面中的一个节点、输入或显示边界，把会话模型转换为用户可以操作和阅读的 UI。' },
  { test: p => /packages\/client\/locale\/src\/locales\//i.test(p), role: '本地化资源', purpose: '这个文件提供一组语言或领域文本资源，并与本地化键保持同一份类型契约；组件只消费键名，不直接复制文案。' },
  { test: p => /packages\/client\/runtime\/src\/client\/(agents|contract|workspaces)\//i.test(p), role: '客户端运行时契约', purpose: '这个文件定义客户端运行时的 agent、设置或 workspace 状态契约，让界面包通过稳定端口读取宿主事实。' },
  { test: p => /packages\/client\/web-react\/src\//i.test(p), role: 'React 宿主适配', purpose: '这个文件把 Harness 的运行时能力绑定到 React 组件或 hooks，隔离框架生命周期与核心服务。' },
  { test: p => /packages\/client\/web\/src\//i.test(p), role: 'Web 宿主运行时', purpose: '这个文件负责 Web 宿主的启动、平台能力或加载状态，把浏览器环境接到客户端插件组合。' },
  { test: p => /packages\/client\/schema-form\/src\//i.test(p), role: 'Schema 表单模型', purpose: '这个文件把 schema 解析成表单模型或可编辑状态，让配置 UI 不必直接理解底层校验实现。' },
  { test: p => /packages\/host\/apiproxy\/src\/api\//i.test(p), role: '宿主 API 资源处理', purpose: '这个文件实现宿主 API 的一组资源操作，把认证、输入校验、领域服务和响应格式接在同一个路由边界上。' },
  { test: p => /packages\/host\/directory-picker-(auto|native)\/src\//i.test(p), role: '目录选择宿主适配', purpose: '这个文件把目录选择请求适配到自动探测或原生对话框，并把平台结果转换成统一的 workspace 路径。' },
  { test: p => /packages\/core\/agent\/src\//i.test(p), role: 'Agent 状态实现', purpose: '这个文件实现 Agent 的输入、工作、分发或结果状态，是上层 agent loop 使用的领域边界。' },
  { test: p => /packages\/compaction\/[^/]+\/src\//i.test(p), role: '上下文压缩实现', purpose: '这个文件负责会话上下文压缩的一项阶段、区域或摘要规则，减少历史占用同时保留后续运行所需事实。' },
  { test: p => /packages\/context\/[^/]+\/src\//i.test(p), role: '上下文来源实现', purpose: '这个文件把时间、指令、引用或文件信息整理成 Agent 可消费的上下文来源。' },
  { test: p => /packages\/e2b\/[^/]+\/src\//i.test(p), role: '远程执行适配', purpose: '这个文件把 E2B 或远程执行环境适配成 Harness 的子进程、终端和输出接口。' },
  { test: p => /packages\/fs\/[^/]+\/src\//i.test(p), role: '文件系统实现', purpose: '这个文件实现文件系统读取、写入、搜索或安全边界的一部分，并让工具层通过统一文件接口使用它。' },
  { test: p => /packages\/hooks\/[^/]+\/src\//i.test(p), role: '钩子协议实现', purpose: '这个文件实现钩子匹配、合并、分发或生命周期的一部分，让外部自动化可以接入而不复制主流程。' },
  { test: p => /packages\/lsp\/[^/]+\/src\//i.test(p), role: 'LSP 传输实现', purpose: '这个文件处理 LSP stdio 连接的 framing、实例、消息或退出边界，把编辑器协议接到 Harness 工具能力。' },
  { test: p => /packages\/preset\/agent-presets\/src\//i.test(p), role: 'Agent preset 实现', purpose: '这个文件负责 Agent preset 的发现、挂载、元数据或创作，把可复用的 Agent 配置组合成用户可选择的入口。' },
  { test: p => /packages\/sandbox\/[^/]+\/src\//i.test(p), role: '沙箱策略实现', purpose: '这个文件实现沙箱的路径、权限、进程或平台策略，限制工具能力的影响范围。' },
  { test: p => /packages\/session-query\/[^/]+\/src\//i.test(p), role: '会话查询实现', purpose: '这个文件从会话事件或索引中抽取、筛选、追踪和呈现查询结果，让历史读取不必修改原始日志。' },
  { test: p => /packages\/session\/[^/]+\/src\//i.test(p), role: '会话持久化实现', purpose: '这个文件负责会话日志的写入、恢复、版本、统计或标题等一项持久化职责，保持事件事实与读取投影分离。' },
  { test: p => /packages\/settings\/[^/]+\/src\//i.test(p), role: '设置实现', purpose: '这个文件实现配置设置的解析、脱敏或作用域规则，让用户配置可以被校验并安全地传递给运行时。' },
  { test: p => /packages\/shell\/[^/]+\/src\//i.test(p), role: 'Shell 执行实现', purpose: '这个文件把 Shell 命令、PowerShell 或输出处理接到统一的进程和工具边界。' },
  { test: p => /packages\/storage\/[^/]+\/src\//i.test(p), role: '存储后端实现', purpose: '这个文件实现 JSON、SQLite 或领域存储后端的一项读写、原子性或单位转换职责。' },
  { test: p => /packages\/subprocess\/[^/]+\/src\//i.test(p), role: '子进程执行实现', purpose: '这个文件把本地子进程的启动、终端、输出或退出状态接到统一执行接口。' },
  { test: p => /packages\/terminal\/[^/]+\/src\//i.test(p), role: '终端会话实现', purpose: '这个文件管理持久终端的命令、输出、取消或清理边界，让工具调用可以复用终端状态。' },
  { test: p => /packages\/typert\/generator\/src\//i.test(p), role: '类型代码生成实现', purpose: '这个文件把类型模型、Cordis catalog 或 schema 生成成可消费的代码和元数据，保持生成结果与源模型一致。' },
  { test: p => /packages\/workflow\/[^/]+\/src\//i.test(p), role: '工作流执行实现', purpose: '这个文件实现工作流 worker 的宿主、协议、realm 或运行时状态，隔离工作流执行和主进程。' },
  { test: p => /packages\/workspace\/[^/]+\/src\//i.test(p), role: 'Workspace 领域实现', purpose: '这个文件定义 workspace 的实体、路径和约束，让文件、会话和沙箱共享同一工作区语义。' },
  { test: p => /packages\/goal\/[^/]+\/src\//i.test(p), role: '目标状态实现', purpose: '这个文件维护目标的领域状态、折叠或收束规则，让 Agent 可以把工作结果与目标进度关联起来。' },
  { test: p => /packages\/schedule\/[^/]+\/src\//i.test(p), role: '调度实现', purpose: '这个文件实现定时任务或事务调度的一项状态转换，集中处理时间、提交和收束边界。' },
  { test: p => /packages\/sdk\/[^/]+\/src\//i.test(p), role: 'SDK 生命周期实现', purpose: '这个文件把 SDK 调用、资源释放或运行时连接封装成外部调用者可使用的接口。' },
  { test: p => /packages\/test-support\/[^/]+\/src\//i.test(p), role: '测试支持', purpose: '这个文件为多个测试提供客户端运行时、夹具、远程替身或契约辅助；它不是生产路径，而是测试环境的共同基础。' },
  { test: p => /packages\/llm\/llm[^/]*\/src\//i.test(p), role: '模型服务实现', purpose: '这个文件属于 LLM 服务或供应商适配包，负责模型消息、流、配置或错误的一项具体转换；上层 Agent 通过统一 LLM 契约使用它。' },
  { test: p => /packages\/subagent\/[^/]+\/src\//i.test(p), role: '子 agent 实现', purpose: '这个文件负责子 agent 的描述、启动、通信或结果收束，把子任务生命周期接到父级运行时。' },
  { test: p => /packages\/extensions\/[^/]+\/src\//i.test(p), role: '扩展实现', purpose: '这个文件把一项可选能力挂进 Cordis 插件树或宿主边界，让核心流程保持稳定而扩展可以独立组合。' },
]

function parseArgs(argv) {
  const result = { commit: undefined, sourceRoot: undefined, outDir: 'study/文件索引' }
  for (let i = 0; i < argv.length; i += 1) {
    const value = argv[i]
    if (value === '--commit') result.commit = argv[++i]
    else if (value === '--source-root') result.sourceRoot = argv[++i]
    else if (value === '--out') result.outDir = argv[++i]
    else if (value === '--help') {
      console.log('用法: node study-tools/generate-source-index.mjs [--commit <提交>] [--source-root <同一提交的完整源码目录>] [--out <输出目录>]')
      console.log('提示：不提供 --source-root 只能生成路径覆盖；会缺少行数、声明、测试主题和 import 证据。')
      process.exit(0)
    }
  }
  return result
}

function git(args, cwd) {
  return execFileSync('git', args, { cwd, encoding: 'utf8' }).trim()
}

function isTestFile(file) {
  return /(^|\/)(test|tests|__tests__|fixtures?)(\/|$)|\.(test|spec|e2e|compat|snapshot|stress|perf)\.[^.]+$/i.test(file)
}

function isTestCase(file) {
  return /(^|\/)test_[^/]+\.[^.]+$/i.test(file)
    || /\.(test|spec|e2e|compat|snapshot|stress|perf)\.[^.]+$/i.test(file)
}

function isTestSupportFile(file) {
  return isTestFile(file) && !isTestCase(file)
}

function isFixtureFile(file) {
  return /(^|\/)(fixtures?|snapshots?)(\/|$)/i.test(file)
    || /\.snapshot\.[^.]+$/i.test(basename(file))
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
  return basename(file).replace(/\.[^.]+$/, '').replace(/\.(test|spec|e2e|compat|snapshot|stress|perf)$/i, '')
}

function packageRootFor(file) {
  const parts = file.split('/')
  if (parts[0] === 'packages') return parts.slice(0, 3).join('/')
  if (['apps', 'examples', 'native', 'python', 'vendor'].includes(parts[0])) return parts.slice(0, 2).join('/')
  return parts.slice(0, 1).join('/')
}

const ROLE_OVERRIDES = new Map([
  ['packages/mcp/mcp-client/src/tools.ts', { role: 'MCP 工具桥接', purpose: '它把外部 MCP server 发现到的工具转换成 Harness ToolRuntime 能注册和调用的定义，生成带 server 命名空间的稳定工具名，并在连接代际变化时同步增删。' }],
  ['packages/feedback/message-feedback/src/spec.ts', { role: '反馈数据规格', purpose: '它集中定义 message feedback 的版本、评分、会话身份和条目 schema，让反馈服务、持久化和读取方共享同一份可校验数据规格。' }],
  ['.github/issue-management/policy.mjs', { role: 'GitHub Issue 规则验证器', purpose: '它解析 issue、pull request 和命令文本，检查可见字符、模板要求、标签和状态规则，避免自动化流程接受不符合项目政策的输入。' }],
  ['apps/cli/src/args.ts', { role: 'CLI 参数与 patch 解析', purpose: '它解析 Commander 参数、Profile 选择、patch overlay，并把未知剩余参数原样交给插件命令。' }],
  ['apps/cli/src/dump-config.ts', { role: '配置组合与诊断命令', purpose: '它组合 Profile、overlay 和补丁层，并输出最终配置或诊断信息，让用户看到实际生效的配置。' }],
  ['apps/cli/src/plugin.ts', { role: 'Profile 插件依赖管理', purpose: '它转发插件管理命令，并根据已安装依赖重新整理 Profile 的 bundle 层。' }],
  ['apps/cli/src/profile-boot.ts', { role: 'CLI Profile 启动编排', purpose: '它按顺序装配 Profile、bundle patch、用户 patch 和 telemetry patch，并把失败和关闭交给 CLI 的生命周期边界。' }],
  ['apps/cli/src/process-shutdown.ts', { role: 'CLI 优雅退出协调器', purpose: '它协调 graceful dispose、超时强退、重复信号升级和测试替身，保证 CLI 退出时插件资源有机会清理。' }],
  ['apps/cli/tsdown.config.ts', { role: 'CLI 构建配置', purpose: '它定义 CLI 的 Node/ESM 构建入口和产物边界。' }],
  ['apps/web/index.html', { role: 'HTML 页面壳', purpose: '它提供浏览器启动所需的 #root、manifest、favicon 和 TypeScript 入口。' }],
  ['apps/web/src/main.ts', { role: 'Web 启动入口', purpose: '它找到 #root，检查页面契约，再创建并运行 AppWebEntry。' }],
  ['apps/web/src/node-module-stub.ts', { role: '浏览器兼容桩', purpose: '它为浏览器构建提供故意失败的 node:module 桩，防止 Node-only 动态模块路径静默失效。' }],
  ['apps/web/stress-tests/reasoning-chunks.stress.ts', { role: '浏览器压力测试', purpose: '它是一个需要显式运行的浏览器压力测试，用 100,000 个 reasoning chunk 测量事件处理和交互延迟；它不是默认功能测试，也不是线上业务入口。' }],
  ['apps/web/tests/complex-history.perf.ts', { role: '浏览器性能基准', purpose: '它是一个需要显式运行的浏览器性能基准，构造高基数 workspace、history 和 trajectory 场景并报告测量结果；它没有严格的耗时断言，因此不能被当成性能门禁。' }],
  ['vitest.snapshot.config.ts', { role: '构建或测试配置', purpose: '它为 snapshot 测试套件选择运行环境、文件范围和共享测试配置，让快照更新与普通单元测试使用明确且可重复的规则。' }],
  ['packages/sandbox/sandbox-windows-acl/verify/abi-probe.cpp', { role: 'Windows ABI 探针', purpose: '它读取实际 MinGW Windows 头文件中的 sizeof、offsetof 和枚举值，为 Node.js/Koffi FFI 定义提供 ABI 事实；它是验证探针，不是生产沙箱实现。' }],
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
  ['python/sdk/src/deepseek_harness/client.py', { role: 'Python JSON-RPC 客户端', purpose: '它通过标准输入输出启动并管理 Harness runtime 子进程，发送 JSON-RPC 请求、接收响应和通知，并把子 agent 的会话关系交给 Python 调用者。' }],
  ['python/sdk/tests/manual_sdk_agent_smoke.py', { role: '手动 SDK Smoke Test', purpose: '它是需要显式运行的 Python SDK 手动 smoke test，不由 pytest 自动收集，用来检查真实 runtime carrier、turn 和最终回答链路。' }],
  ['packages/core/agent-loop/src/runtime-context.ts', { role: '运行时上下文投影', purpose: '它把动态运行时上下文投影成可以保留到会话历史里的消息。' }],
  ['packages/core/agent-loop/src/tool-calls.ts', { role: '工具调用调度器', purpose: '它调度并发工具调用，处理独占屏障、取消、结果顺序和持久化事件。' }],
  ['packages/core/agent/src/model-selection.ts', { role: '模型选择与请求路由', purpose: '它管理 Agent 的 provider、model、reasoning 选择，并把选择同步到 prompt assembly 和请求路由。' }],
  ['packages/core/scope/src/scoped-events.generated.ts', { role: '生成的事件作用域路由表', purpose: '它由事件定义生成，把事件名映射到所属 scope subject。' }],
  ['packages/core/tools/src/json-schema.ts', { role: 'JSON Schema 子集验证器', purpose: '它验证 DSH 支持的 JSON Schema 子集、关键字组合和 object-root 约束。' }],
  ['packages/core/tools/src/presentation.ts', { role: '工具呈现契约', purpose: '它定义工具调用和结果如何呈现，不负责真正执行工具。' }],
  ['packages/core/tools/src/testing.ts', { role: '工具测试夹具工厂', purpose: '它提供 canonical tool-definition 测试夹具，让各个工具测试共享一致的定义材料。' }],
  ['packages/llm/llm-deepseek/src/index.ts', { role: 'DeepSeek 模型插件入口', purpose: '它把 DeepSeek provider 注册到 `ctx.llm`，在每次请求解析最新的 endpoint、凭据、模型目录和超时配置，并只在 retry policy 改变时原位替换注册；这样设置变化不会让进行中的流失去已经采用的连接事实。' }],
  ['packages/terminal/tool-terminal/src/invariant.ts', { role: '不变量伴随插件', purpose: '它是终端工具包的 Cordis companion：声明需要 `invariants` 服务并注册一个空安装器，明确记录这个包不拥有可检查的运行时不变量，PTY 生命周期和后台任务关系仍由组合它的服务负责。' }],
  ['packages/client/ui-conversation/src/client/chat/accessibility.module.css', { role: '界面无障碍样式', purpose: '它提供 `.visuallyHidden` 样式：元素仍留在可访问性树中，但从视觉布局中移开，供屏幕阅读器读取隐藏的辅助文本。' }],
  ['packages/client/ui-conversation/src/client/skeleton/ConversationRoot.module.css', { role: '对话列布局样式', purpose: '它定义 ConversationRoot 的列布局、标题、标签、滚动区、composer seat、hero 阶段和窄屏宽度变量，让会话正文与输入区在不同视图状态下共享同一条几何规则。' }],
  ['packages/core/session/src/preparation.ts', { role: '会话发布前生命周期', purpose: '它管理尚未发布的 Session 及 provider-owned 状态，明确 prepare、publish、release 的幂等边界。' }],
  ['packages/core/session/src/chunk-rows.ts', { role: '会话分页行构建器', purpose: '它把会话事件整理成可分页、可渲染的读取行。' }],
  ['packages/core/session/src/request-header.ts', { role: '请求配置持久化锚点', purpose: '它记录请求配置变化，让会话恢复时能解释每次请求使用的选择。' }],
  ['packages/client/connection/src/api-path.ts', { role: 'Web 传输路径契约', purpose: '它集中定义 Web 传输共用的 /api 前缀，以及浏览器 mux/host WebSocket 的两个固定路径。' }],
  ['packages/client/connection/src/client/fixture.ts', { role: '浏览器连接测试夹具', purpose: '它在没有真实服务器时模拟完整的客户端 API、历史会话、流式回复、审批和工具卡片数据；fixture 自己实现 fake carrier，并沿真实 RPC/Session 形状生成可重复的 UI 开发与测试场景。' }],
  ['packages/client/connection/src/client/random-uuid.ts', { role: 'RPC 标识符生成器', purpose: '它生成浏览器连接层使用的随机 UUID，给 RPC 请求提供不会与其他请求冲突的关联 ID。' }],
  ['packages/client/connection/src/loopback-hostname.ts', { role: 'Loopback 主机判断器', purpose: '它判断一个主机名是否指向本机回环地址，用于决定连接是否可以按本地宿主的安全规则处理。' }],
  ['packages/client/modules/src/client/system.ts', { role: '客户端模块系统', purpose: '它定义客户端模块系统如何注册、获取和组合模块，让 Web 入口可以按模块边界装配运行时能力。' }],
  ['packages/client/runtime/src/client/ordered-baseline.ts', { role: '有序基线合并器', purpose: '它把带顺序的基线片段合并成客户端可消费的稳定结果，避免增量事件到达顺序变化时产生不同快照。' }],
  ['packages/client/runtime/src/client/time-zone.ts', { role: '客户端时区解析器', purpose: '它解析浏览器当前可用的时区并提供稳定结果，让时间展示和会话相关计算不必在各个组件中重复探测。' }],
  ['packages/code-runtime/code-runtime-worker-thread/src/bootstrap.ts', { role: '代码运行 Worker 启动器', purpose: '它在 Worker 侧创建受限的 console、绑定命名空间、捕获 stdout/stderr，并通过 port 运行用户代码；日志和完成值都受统一 JSON 字节预算约束。' }],
  ['packages/examples/jsonrpc-demo/src/packaged-bin.ts', { role: '打包 JSON-RPC 示例入口', purpose: '它把 JSON-RPC 示例连接到打包后的 CLI 可执行入口，用于验证发布产物仍能被外部进程启动和调用。' }],
  ['packages/host/apiproxy/src/fetch/handler.ts', { role: 'API Fetch 处理器', purpose: '它把 API proxy 的资源定义转换成 Fetch handler，统一处理方法匹配、单请求调用、完整响应和错误响应。' }],
  ['packages/llm/token-meter/src/estimate.ts', { role: '模型 token 估算器', purpose: '它按固定启发式估算消息、系统提示词和工具 schema 的 token 占用，为上下文预算和 UI token meter 提供一致的计算入口。' }],
  ['packages/client/runtime/src/client/sessions/manager.ts', { role: '客户端 Session 管理器', purpose: '它维护客户端的 Session 实例簇、会话列表快照、选择状态、未实例化请求缓冲、子 agent 目录和后台任务投影。' }],
  ['packages/client/locale/src/client/LanguageRow.tsx', { role: '设置语言选择行', purpose: '它把语言偏好注册到 General 设置区的 item slot，显示当前语言并打开选择菜单；选择后通过标准 locale seat 写回 active locale。' }],
  ['packages/client/ui-agent-preset/src/client/AgentPresetLabel.tsx', { role: 'Session Agent preset 标签', purpose: '它在已经开始的 Session header 中只读显示 agent preset 名称；它不提供切换控制，preset 选择留在新建 Session 页面。' }],
  ['packages/client/runtime/src/client/sessions/tool-call-tree.ts', { role: '工具调用树投影器', purpose: '它从 Session 的 Code Dispatch 事件维护父子调用索引，投影递归 ToolCallBlock 树和 running tool 列表，并对递归深度设上限。' }],
  ['packages/client/runtime/src/client/workspaces/path.ts', { role: '工作区路径解析器', purpose: '它把工作区相对路径转换成 Host.openPath 能理解的绝对或工作区路径；有工作区根目录时补全绝对路径，没有根目录时保留调用者能提供的原始形式。' }],
  ['packages/api/remotes/src/agent-lookup.ts', { role: '远程 Agent 查找器', purpose: '它按远程 session、owner 和 parent 关系查找可访问的 Agent，并在找不到或越过所有权边界时返回可诊断的错误。' }],
  ['packages/attachment/attachment-local/src/image.ts', { role: '图像格式探测器', purpose: '它在附件进入本地存储时完整解码图像，在已经验证过的读取路径上只探测头部元数据，并统一处理格式、尺寸和像素限制。' }],
  ['packages/attachment/attachment-local/src/store.ts', { role: '本地附件内容存储', purpose: '它把附件按内容摘要保存到 DSH_HOME 下的私有目录，校验文件、去重相同字节，并在读取时重新检查所有者和部署限制。' }],
  ['packages/attachment/attachment-local/src/request-image.ts', { role: '图像请求版本缓存', purpose: '它为随模型请求发送的图像生成确定性的缓存版本：按总像素预算投影尺寸，在允许的质量列表内编码，并让缓存键携带变换版本号。' }],
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
  ['scripts/agent-note-tree.ts', { role: 'Agent Note 目录真值', purpose: '它定义 Agent Note 的根目录、生命周期和分类集合，并提供纯的目录遍历结果；其他 Agent Note 门禁都从这份结构真值读取规则。' }],
  ['scripts/archived-agent-notes.ts', { role: 'Agent Note 归档助手', purpose: '它读取和写入不可变的 Agent Note archive manifest，集中处理归档格式与历史记录，而不是运行时 Agent 状态。' }],
  ['scripts/verify-agent-note-classification.ts', { role: 'Agent Note 分类门禁', purpose: '它检查 Agent Note 是否放在允许的 lifecycle/class 目录、文件名是否带日期，并阻止旧的 RFC 路径重新出现。' }],
  ['scripts/verify-agent-note-format.ts', { role: 'Agent Note 格式门禁', purpose: '它检查 Agent Note 的标题、生命周期段落、替代方案和 retired 标记；目录分类与翻译配对分别由相邻门禁负责。' }],
  ['scripts/verify-archived-agent-notes.ts', { role: 'Agent Note 归档门禁', purpose: '它验证已归档 Agent Note 的 manifest、内容摘要和不可变关系，并在需要时追加新的归档记录。' }],
  ['scripts/smoke-python-runtime.py', { role: 'Python SDK 运行 Smoke Test', purpose: '它在无密钥条件下启动 Python SDK runtime，执行完整 turn 和 snapshot smoke，检查子进程、JSON-RPC、Session 事件和最终回答链路。' }],
  ['scripts/gen-cordis-api.ts', { role: 'Cordis API 兼容入口', purpose: '它是统一 Typert-backed Cordis catalog 生成器的兼容命令入口；真正的提取、校验和渲染由相邻 catalog 实现完成。' }],
  ['scripts/gen-tool-catalog.ts', { role: '工具 schema 文档生成器', purpose: '它启动各工具插件收集运行时计算出的 schema，生成 `docs/tool-catalog.md`，并检查清单是否覆盖磁盘上的 `tool-*` 包。' }],
  ['scripts/verify-runtime-closure.ts', { role: '发布运行时依赖门禁', purpose: '它检查可部署 executable manifest 是否包含 workspace peer 的完整依赖图，避免缺包只在 Cordis 加载发布产物时才暴露。' }],
  ['scripts/verify-built-package-invariants.mjs', { role: '构建包不变量门禁', purpose: '它通过 staged package self-reference 在普通 Node 中验证编译后的 companion 包，确认发布产物的入口和互相依赖没有断裂。' }],
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
    purpose: '',
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
  ['locale', '本地化'], ['locales', '本地化'], ['i18n', '国际化'], ['slot', '扩展槽位'], ['slots', '扩展槽位'],
  ['brand', '品牌类型'], ['render', '渲染'], ['renderer', '渲染器'], ['presentation', '呈现'],
  ['store', '状态存储'], ['stores', '状态存储'], ['projection', '状态投影'], ['session', '会话'], ['sessions', '会话'],
  ['conversation', '对话'], ['connection', '连接'], ['connect', '连接'], ['websocket', 'WebSocket'],
  ['protocol', '协议'], ['rpc', 'RPC'], ['controller', '控制器'], ['manager', '管理器'], ['domain', '领域模型'],
  ['runner', '运行驱动'], ['run', '运行驱动'], ['translate', '协议翻译'], ['format', '格式'], ['serialize', '序列化'],
  ['serialization', '序列化'], ['codec', '编解码'], ['policy', '策略'], ['guard', '权限保护'], ['authority', '授权'],
  ['path', '路径'], ['paths', '路径'], ['directory', '目录'], ['directories', '目录'], ['root', '根目录'],
  ['query', '查询'], ['queue', '队列'], ['inbox', '输入队列'], ['message', '消息'], ['messages', '消息'],
  ['content', '内容'], ['spec', '数据规格'], ['profile', 'Profile'], ['startup', '启动'], ['bootstrap', '启动'],
  ['resolve', '解析'], ['normalize', '规范化'], ['parse', '解析'], ['parser', '解析器'], ['fetch', '请求获取'],
  ['stream', '流式传输'], ['sse', 'SSE 流'], ['chunk', '分块'], ['history', '历史记录'], ['timeline', '时间线'],
])

function conceptFor(file) {
  const parts = file
    .replace(/\.[^.]+$/, '')
    .split(/[\/_.-]/)
    .filter(token => token && !['src', 'tests', 'test', 'fixtures', 'fixture', 'packages', 'apps', 'index', 'types', 'type', 'utils', 'util', 'helpers', 'helper', 'common', 'config', 'configs', 'spec', 'e2e', 'compat', 'snapshot', 'stress', 'tsdown', 'vite', 'vitest', 'webpack', 'rollup'].includes(token.toLowerCase()))
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

function fileSubject(file) {
  const base = basename(file).replace(/\.[^.]+$/, '').replace(/\.module$/i, '')
  const tokens = base
    .split(/[._-]/)
    .filter(token => token && !['src', 'index', 'types', 'type', 'utils', 'util', 'common', 'module', 'style', 'styles'].includes(token.toLowerCase()))
  const labels = []
  for (const token of tokens) {
    const value = CONCEPT_WORDS.get(token.toLowerCase())
    if (value && !labels.includes(value)) labels.push(value)
  }
  if (labels.length > 0) return `${labels.slice(0, 3).join('、')}（\`${base}\`）`
  return `\`${base}\``
}

const SPECIFIC_PURPOSES = new Map([
  ['packages/core/agent/src/consumed-work.ts', '它从 Agent 的 Turn 结束和 durable inbox 变更中判断哪些输入真正被消费、哪些输入被取消而未运行，避免只看 `turn/end` 就把无操作或被丢弃的工作算错。'],
  ['packages/core/agent/src/dispatch.ts', '它定义带 Agent scope 的事件分发和 prompt assembly 辅助，让事件 payload 中的 agent 与当前作用域绑定，避免错误的 Agent 交叉消费事件。'],
  ['packages/core/agent/src/inbox.ts', '它从 Session 日志增量重建 Agent 的 `next-turn`、`next-step` 输入队列，并在插入、丢弃和领取时发出 live 通知；队列因此既可恢复又可被运行时观察。'],
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
  ['packages/core/session/src/request-header.ts', '它定义请求配置变化的持久化 header，给每次请求选择和后续恢复提供锚点；它是会话日志解释请求上下文的一部分。'],
  ['apps/cli/tsdown.config.ts', '它定义 CLI 的 Node/ESM 构建边界，入口指向 `lib/types/bin.js`，并关闭不需要的 declaration 输出；构建产物因此从真正的命令入口开始，而不是把开发源文件路径暴露给用户。'],
  ['packages/core/agent-default-model/tsdown.config.ts', '它把默认模型包拆成 `index.js` 和 `invariant.js` 两个入口：正常能力与运行时不变量可以分别被依赖，避免只想检查配置的调用者加载完整实现。'],
  ['apps/web/vite.config.ts', '它约束浏览器构建边界，禁止 standalone serve，安排 vendor chunk，并把 boot grammar 等资源纳入构建；Web 开发服务器不能绕过 Harness 正式的启动组合。'],
  ['apps/web/src/main.ts', '它完成 Web 启动的三步：找到 `#root`，缺失时报告页面契约错误，再创建并运行 AppWebEntry；启动入口保持短小，具体组合放在应用对象和 Profile 层。'],
  ['packages/acp/acp/src/codec.ts', '它把 Harness 的 turn 结束原因、prompt 内容和不支持的 ACP prompt block 转成 automation-only ACP wire 能接受的值；它是生命周期到协议的纯翻译层，不负责 Session 磁盘恢复。'],
  ['packages/context/session-reference/src/serialization.ts', '它把 model-visible reference envelope 序列化为 JSON，并把字面量 `<` 转成 `\\u003c`；解析后的数据不变，但模型可见内容不会直接拼出 XML-like opening tag。'],
  ['packages/hooks/hook-protocol/src/codec.ts', '它解析 hook 进程的退出码、stdout 和 stderr，把结构化 JSON 或纯文本统一映射成 HookOutput；退出码 2 表示阻断，其他非零退出表示非阻断错误。'],
  ['packages/llm/llm-deepseek/src/serialize.ts', '它把 Harness 消息序列化为 DeepSeek chat-completions wire：合并用户文本、生成 assistant content/tool_calls、单独发送 tool result，并在 text-only 路由中明确拒绝图像块。'],
  ['packages/storage/storage-json/src/format.ts', '它定义 JSON storage unit 的磁盘格式和内存状态：当前 net state、version、global 值以及 tables；文件保持可读并按稳定的插入顺序写出。'],
  ['scripts/verify-agent-note-format.ts', '它检查 Agent Note 的标题、生命周期段落、替代方案和 retired 标记；目录分类由 sibling tree gate 负责，翻译结构由 pairing gate 负责。'],
])

const SPECIFIC_DESIGN_REASONS = new Map([
  ['packages/core/agent/src/consumed-work.ts', '“已消费”不能只从 Turn 是否结束推断，因为被取消的 inbox 输入可能从未打开 Step；把 work accounting 单独投影出来，恢复和统计就能区分完成、失败和未运行。'],
  ['packages/core/agent/src/dispatch.ts', 'Agent 事件同时需要 payload 中的 agent 和 `this` 上的 scope carrier；把两者绑定成一个 dispatcher，可以在类型层和运行时共同阻止跨 Agent 分发。'],
  ['packages/core/agent/src/inbox.ts', 'inbox 是会影响下一次请求的 durable 状态，不是普通内存队列；独立的 replay projection 让日志恢复、live notification 和队列操作共享同一套顺序规则。'],
  ['.github/issue-management/policy.mjs', '项目政策必须在机器人、CI 和人工命令之间保持同一套解释；把可见字符、模板、标签和状态检查集中在这里，自动化就能在输入进入后续流程前拒绝不合规数据。'],
  ['apps/cli/src/args.ts', 'CLI 只拥有 profile、patch 和诊断参数，其余参数必须原样交给已启动的插件树；把这条所有权边界单独解析，才能避免 CLI 抢走插件自己的选项。'],
  ['apps/cli/src/dump-config.ts', '配置诊断需要解析 patch 层却不能启动应用或执行 `!!js`；单独的 dump 路径让用户看到安全、可复现的最终配置，也避免诊断命令产生运行时副作用。'],
  ['apps/cli/src/plugin.ts', '插件安装是外部包管理状态与 Profile bundle 列表之间的同步问题；把转发和 reconcile 集中在这里，启动流程只读取已经整理好的组合，不必重新猜测安装状态。'],
  ['apps/cli/src/profile-boot.ts', 'Profile 的 bundle、profile patch、命令行 patch 和 telemetry patch 有明确覆盖顺序；集中编排并绑定关闭流程，才能让不同 CLI 模式得到相同的配置语义和资源生命周期。'],
  ['apps/cli/src/process-shutdown.ts', 'CLI 进程可能持有连接、监听器和子进程，退出不能只调用一次无界的 dispose；把信号升级、有限等待和强退顺序集中起来，既给插件清理机会，也避免进程永远挂住。'],
  ['apps/cli/tsdown.config.ts', 'CLI 的开发入口、Node/ESM 产物和用户实际执行的文件必须是同一个构建契约；单独声明入口与产物边界，发布时就不会把源码路径或无关 declaration 暴露给终端用户。'],
  ['apps/web/index.html', '浏览器在加载 JavaScript 之前只认识静态页面契约；把 `#root`、manifest、favicon 和启动模块留在 HTML，Web 应用可以替换 TypeScript 组合而不改变浏览器宿主的最低要求。'],
  ['apps/web/src/main.ts', '页面根节点检查和 AppWebEntry 创建是 Web 启动的唯一宿主责任；入口保持薄并尽早报告缺失的 `#root`，可以把 HTML 错误与应用组合错误区分开。'],
  ['apps/web/src/node-module-stub.ts', '浏览器构建不能真正提供 Node 的动态模块能力，因此用显式失败桩取代假实现；这样错误会在错误路径第一次被执行时暴露，而不是以静默缺功能的方式传播到界面。'],
  ['apps/web/stress-tests/reasoning-chunks.stress.ts', '增量 reasoning 的性能风险来自事件数量和主线程调度，不应与普通功能测试混在一起；独立压力场景可以固定输入规模、测量延迟，并避免把性能假设藏在业务断言里。'],
  ['apps/web/tests/complex-history.perf.ts', '浏览器速度会受到机器和宿主影响，不能把一次耗时读数当成跨机器的正确性断言；把高基数数据构造、结构性断言和观测报告放在 opt-in 基准中，既能发现退化，也不会把环境噪声误报成产品失败。'],
  ['vitest.snapshot.config.ts', '快照测试需要稳定的环境、文件选择和更新边界；把这些规则单独放在配置文件中，运行器和贡献者都能看见何时会读取或更新快照，避免快照行为藏在业务代码里。'],
  ['packages/sandbox/sandbox-windows-acl/verify/abi-probe.cpp', 'FFI 的结构体布局和枚举值不能靠手工猜测；在目标 MinGW 头文件环境中编译并打印 sizeof、offsetof 和枚举值，再由 probe 测试与 Node.js/Koffi 定义交叉核对，可以把 ABI 漂移尽早暴露。'],
  ['packages/llm/llm-deepseek/src/index.ts', 'DeepSeek provider 的可变连接事实和 Cordis 注册事实不是同一种状态；把每次请求的 endpoint、凭据和 catalog 解析，与 retry policy 的原位 replace 分开，既能让新设置进入下一次请求，又不会让路由在 dispose/re-register 的空窗期短暂消失。'],
  ['packages/terminal/tool-terminal/src/invariant.ts', '不拥有运行时不变量的包也需要明确的 companion 入口，否则自动化工具会把“没有 companion”误读为遗漏；空 installer 把责任边界写进插件树，同时让真正拥有 PTY 和后台任务关系的服务保留唯一维护位置。'],
  ['packages/client/ui-conversation/src/client/chat/accessibility.module.css', '无障碍辅助文本需要从布局中移开但不能使用 `display: none` 或 `visibility: hidden`；把这条视觉隐藏规则独立成 CSS module，可以让组件复用同一套可访问样式而不把屏幕阅读器语义散落在 JSX 中。'],
  ['packages/client/ui-conversation/src/client/skeleton/ConversationRoot.module.css', 'ConversationRoot 同时承载 header、transcript、view overlay 和 composer seat；把共享宽度、滚动条预留、sticky/absolute seat 以及 hero/active/settling 状态放在根样式中，兄弟子树才能使用同一几何约束而不各自计算输入区位置。'],
  ['apps/web/tests/assembled-boot.ts', 'Web 测试需要真实的插件组合和可控的浏览器环境；共享启动脚手架把装配和清理固定下来，场景测试才能只改变一个行为变量并避免各自启动出不同的应用。'],
  ['apps/web/tests/chat-scroll-fixture.ts', '滚动和虚拟列表回归依赖事件顺序、消息长度和分页边界；用 Session 生成固定 JSONL，比复制一堆 UI 假对象更接近真实读取侧，同时仍然不依赖用户数据。'],
  ['apps/web/tests/scaffold.ts', 'E2E 测试同时占用插件树、端口、临时目录和 replay 状态；把这些资源的获取与释放集中处理，才能保证测试之间隔离，并在失败时保留可诊断证据。'],
  ['apps/web/tests/support.ts', '浏览器测试的等待、端口、产物定位和失败截图属于环境能力而不是业务断言；集中封装能减少每个场景的样板，也让失败诊断方式保持一致。'],
  ['apps/web/tests/support/listen-probe.mjs', '测试基础设施必须能证明服务真的调用了 `listen`，否则一个只渲染页面的假流程也可能被当成网络测试通过；探针只观察调用，不改变服务实现。'],
  ['examples/acp-agent/pty-snapshot-backend.mjs', 'PTY 接口需要可读、可写、可 signal 和可关闭的完整状态机，但真实终端会带来平台和时序噪声；内存 SnapshotSession 复用同一 Cordis 服务契约，给示例和测试提供确定性后端。'],
  ['examples/acp-agent/tests/fixtures/shell/tool-pwsh/driver.ts', 'Shell 工具最容易在“测试替身成功、真实进程失败”之间产生错觉；这个驱动保留真实 PowerShell 前后台进程和报告链路，把操作系统边界作为可观察的测试对象。'],
  ['examples/acp-agent/web-fetch-fixture-server.mjs', 'Web Fetch 需要真实 HTTP framing 和 Markdown 转换，但不应依赖公网状态；固定 loopback server 将网络边界保留下来，同时让响应、端口和清理都可重复。'],
  ['examples/headless-agent/tests/fixtures/cli-mock-llm.ts', '无头轮次的测试重点是 Agent、工具和 JSONL 事件的协作，不是供应商网络；模拟 LLM 保留请求到最终回答的协议形状，让完整轮次无需密钥也能稳定回归。'],
  ['examples/headless-agent/tests/fixtures/headless-driver.ts', 'Headless 流程的关键证据在进程输出和 Session event，而不只在返回值；驱动统一启动 Loader 并输出 JSONL，测试就能观察真实边界和最终收束。'],
  ['examples/jsonrpc-agent/minimal.py', '最小示例应该只展示公共 SDK 的组合顺序，不掺入产品内部插件；把参数解析、一次 turn 和最终回答保持在一个短文件中，读者能从示例直接追到 SDK 契约。'],
  ['python/sdk/src/deepseek_harness/client.py', '底层 JSON-RPC 客户端需要处理子进程、双向通知、响应关联和退出，但高层 API 不应承担这些字节级细节；把 stdio 协议封装在 client 内，Python 调用者才能专注于会话语义。'],
  ['python/sdk/tests/manual_sdk_agent_smoke.py', '真实 runtime carrier 和环境配置并非所有 CI 都具备，因此这个 smoke test 明确选择手动运行而不伪装成普通单测；它保留一条真实集成入口，同时让自动测试的前置条件透明。'],
  ['packages/core/agent-loop/src/runtime-context.ts', '动态上下文可能包含当前运行时对象，不能直接写进可恢复日志；先投影成稳定消息，Session 才能在重启后重建同样的模型输入，而运行时实现仍可变化。'],
  ['packages/core/agent-loop/src/tool-calls.ts', '工具调用同时有并发、独占屏障、取消、顺序和持久化几个不变量；让一个调度器拥有这些决策，比让每个工具或 Agent 回调各自解释更不容易产生竞态。'],
  ['packages/core/agent/src/model-selection.ts', '模型选择既影响 prompt assembly 又影响请求路由，且一轮执行中不能因为配置热更新而前后不一致；在 Agent 边界解析并传播选择，可以固定一次请求的语义。'],
  ['packages/core/scope/src/scoped-events.generated.ts', '事件到 scope subject 的映射是定义文件的派生结果，手写会在新增事件时悄悄漂移；生成表让源定义成为唯一事实，运行时只消费稳定的查找结果。'],
  ['packages/core/tools/src/json-schema.ts', '工具参数的 schema 需要在执行前统一判断支持范围和 object-root 约束；把不完整或不安全的形状挡在边界处，工具实现就不用各自维护一套互不兼容的验证规则。'],
  ['packages/core/tools/src/presentation.ts', '工具给模型的结果和给人的界面卡片不是同一种表示；定义 provider-neutral 的呈现意图，CLI、Web 和其他宿主可以各自渲染，而执行层不依赖某个 UI。'],
  ['packages/core/tools/src/testing.ts', '工具测试需要稳定的定义、参数 schema 和结果材料，但这些材料不应注册成生产工具；独立的 canonical fixture 工厂复用测试输入，又保持产品组合与测试准备分离。'],
  ['packages/core/session/src/preparation.ts', 'Session 发布前可能暂时持有 provider-owned 资源，并且释放可能被重复触发；将 prepare、publish、release 的状态机集中在这里，可以把“尚不可见”和“已可恢复”区分清楚。'],
  ['packages/core/session/src/chunk-rows.ts', '原始 Session 事件适合追加和回放，界面分页需要另一种行结构；把读取侧的折叠、游标和渲染边界单独投影，既不破坏事实日志，也能优化历史读取。'],
  ['packages/core/session/src/request-header.ts', '请求模型、工具或配置发生变化时，恢复逻辑必须知道当时采用了什么选择；把配置变化写成 Session 可识别的 header，能让持久化事实解释请求，而不是依赖当前环境猜测。'],
  ['packages/client/connection/src/api-path.ts', 'API 前缀和两个 WebSocket 路径是浏览器与宿主共同遵守的协议常量；集中定义并让两端复用，能防止字符串漂移造成“服务已启动但客户端连错地址”。'],
  ['packages/client/connection/src/client/fixture.ts', 'UI 开发需要完整的 RPC、Session、流式回复和审批形状，但不应每次都启动真实服务；fake carrier 复用真实协议结构，既能模拟复杂状态，又不会把测试简化成错误的裸对象。'],
  ['packages/client/connection/src/client/random-uuid.ts', 'RPC 关联 ID 属于传输层，不应由各个界面组件自行生成或复用业务 ID；集中生成随机 UUID 可以保证并发请求的响应匹配不依赖 UI 生命周期。'],
  ['packages/client/connection/src/loopback-hostname.ts', '回环主机判断会影响本地连接的安全和宿主选择，别名、IPv4/IPv6 和浏览器输入也需要统一解释；把判断收束在一个函数中，调用者不会各自放宽边界。'],
  ['packages/client/modules/src/client/system.ts', '客户端模块需要按宿主组合、注册和查找，而不是让 Web 入口直接知道所有功能包；模块系统提供稳定装配面，功能增删不会把依赖列表散落到界面代码。'],
  ['packages/client/runtime/src/client/ordered-baseline.ts', '增量事件如果只按到达顺序合并，重连或批处理就可能产生不同快照；有序基线合并器明确顺序和覆盖规则，让客户端状态可以稳定重算。'],
  ['packages/client/runtime/src/client/time-zone.ts', '时区是浏览器环境事实，组件各自探测会造成显示不一致和重复回退；集中解析并提供稳定值，时间显示和会话计算共享同一个宿主判断。'],
  ['packages/code-runtime/code-runtime-worker-thread/src/bootstrap.ts', '用户代码执行必须与宿主插件树隔离，并限制日志、返回值和通信预算；Worker 启动器统一建立 console、port 和 JSON 边界，异常或超量输出不会直接污染主进程。'],
  ['packages/examples/jsonrpc-demo/src/packaged-bin.ts', '示例如果只 import 源代码，无法证明发布后的可执行入口仍然可用；单独保留打包进程入口，让 JSON-RPC 示例覆盖真实产物和外部进程边界。'],
  ['packages/host/apiproxy/src/fetch/handler.ts', '资源定义与 Fetch 协议之间需要一次统一转换，方法匹配、单请求调用、完整响应和错误响应不能由每个资源重复实现；集中处理使 API proxy 的行为保持一致。'],
  ['packages/llm/token-meter/src/estimate.ts', 'token 估算不是供应商精确计费，但上下文预算和界面提示必须使用同一套近似规则；将启发式集中后，UI、压缩和请求前检查不会各算各的。'],
  ['packages/client/runtime/src/client/sessions/manager.ts', '客户端同时面对会话列表、懒加载实例、未打开会话的事件、子 agent 和后台任务；由一个 manager 合并这些来源，才能保持选择状态与快照一致，避免组件各自维护副本。'],
  ['packages/client/locale/src/client/LanguageRow.tsx', '语言设置既要读 locale store，又要通过 slot 接收标准写入动作；把它做成自己的设置行，locale 包可以拥有菜单和文案，而 General 设置区只负责提供插槽。'],
  ['packages/client/ui-agent-preset/src/client/AgentPresetLabel.tsx', 'Session 开始后 composition 是固定的，header 中提供切换按钮会承诺宿主并不支持的行为；只读标签把“当前运行什么”与“新建时选择什么”分成两个清楚的界面边界。'],
  ['packages/client/runtime/src/client/sessions/tool-call-tree.ts', '工具调用可以递归嵌套且事件可能先到子调用再到结果；独立 parent index 和 projection 把事件折叠成稳定的树，并用深度上限防止异常 wire 数据耗尽递归消费者。'],
  ['packages/client/runtime/src/client/workspaces/path.ts', '工作区相对路径既有跨平台差异也有越界风险，还要满足 Host.openPath 的输入契约；集中解析和保留无根目录的原始形式，能避免 UI、连接层和宿主各自改写路径。'],
  ['packages/api/remotes/src/agent-lookup.ts', '远程 Agent 的可见性取决于 session、owner 和 parent 关系，不能让每个 API handler 自己拼接授权判断；查找器统一关系遍历和错误语义，越权会在进入业务操作前被挡住。'],
  ['packages/attachment/attachment-local/src/image.ts', '图像安全检查要区分完整解码和已验证读取路径的快速头部探测；把格式、尺寸和像素限制放在附件边界，既控制资源消耗，也避免各消费者用不一致的猜测。'],
  ['packages/attachment/attachment-local/src/store.ts', '附件内容适合按摘要去重，但文件系统读取又必须检查所有者、私有目录和部署限制；把内容寻址、写入校验和读取复核集中在存储层，调用者不用重复实现安全规则。'],
  ['packages/attachment/attachment-local/src/request-image.ts', '同一张附件图会被多条消息反复读取；把尺寸投影、质量选择和缓存收敛到同一个确定性入口，读取结果可以复现，验证测试也能逐条核对解码事实与编码结果一致。'],
  ['packages/session/session-persistence-jsonl/src/format.ts', 'JSONL 是会话恢复和审计依赖的长期格式，路径编码、header、事件记录和截断修复必须由同一规则解释；格式层独立后，Session 领域代码不必承担磁盘细节。'],
  ['packages/llm/llm-pi-ai/src/catalog.ts', '模型能力来自安装的 catalog 和用户 route 配置两处来源，必须在请求前合并并校验；把物化过程放在配置边界，可以把缺字段和不兼容模型变成清晰的启动错误。'],
  ['packages/llm/llm-deepseek/src/sse.ts', '网络字节边界不等于 SSE 事件边界，UTF-8、CRLF、多行 data 和 DONE 还会跨 chunk 出现；独立 framing 解析器把这些协议细节挡在 DeepSeek 适配器之外，并能明确报告截断。'],
  ['native/landlock-run/src/index.ts', 'TypeScript 上层需要选择平台 launcher、生成只读/读写 allow-list 并理解能力等级；把这些选择集中在 API 层，业务代码不必知道预编译文件布局和 probe 参数。'],
  ['native/landlock-run/src/main.c', '沙箱必须在子命令执行前由操作系统真正施加，并在无法强制时拒绝继续；C launcher 保持参数解析、规则创建和 `exec` 的最小边界，避免限制逻辑被上层绕过。'],
  ['native/landlock-run/packages/entry/src/index.ts', '发布到 native 子包的入口仍要向上层提供统一 launcher API；把预编译产物定位和能力探测放在 package entry，工作区布局变化不会传到调用者。'],
  ['native/landlock-run/packages/entry/src/main.c', '原生发布包必须保留与源码 launcher 一致的 fail-closed 行为；独立的 C 入口让构建产物可以单独编译、探测和验证，不把平台规则隐藏在 JavaScript wrapper 中。'],
  ['website/.vitepress/config.ts', '网站导航、搜索和编辑链接应由发布清单驱动，而不是在 VitePress 配置里重复维护路径；集中构建配置能让文档源树变化时尽早暴露缺页或错链。'],
  ['website/docs.ts', 'canonical Markdown、语言版本、章节顺序和网站路由是一次发布映射；把它们集中成清单，便于生成 sidebar 和 fallback，也避免英文与中文页面各自漂移。'],
  ['python/sdk-runtime/hatch_build.py', 'runtime wheel 携带平台相关可执行载体，而高层 SDK wheel 不应偷偷复制这些文件；构建钩子明确区分 executable、平台 tag 和 sdist，发布边界才可审查和复现。'],
  ['python/sdk-runtime/src/deepseek_harness_runtime/__init__.py', '生产 SDK 必须优先使用已打包 carrier，开发 carrier 只能显式选择；把平台解析、路径和启动参数集中在 runtime 载体包，能避免调用者静默退回源码导致环境差异。'],
  ['python/sdk/src/deepseek_harness/__init__.py', 'Python 用户需要稳定的导入门面，而内部 client、models 和生命周期实现仍可能拆分；集中导出公共对象可以保持示例和外部程序的导入路径不随内部重构变化。'],
  ['python/sdk/src/deepseek_harness/api.py', '高层 SDK 应表达“创建会话、执行 turn、收集通知、取最终回答”，不应让调用者手动驱动 JSON-RPC；API 层拥有 runtime 生命周期，协议 client 因而可以独立替换。'],
  ['python/sdk/src/deepseek_harness/models.py', '通知、入站请求和 initialize 响应是 Python 与 runtime 共同遵守的协议数据；集中建模让字段形状可复用和校验，也避免高层 API 在每个分支中重复解包。'],
  ['scripts/build-exe-for-python-sdk.ts', 'Python SDK 的 runtime 需要跨平台、可启动且布局稳定的单文件载体；把 SEA/pkg、开发 carrier 和输出目录规则集中在构建器中，发布脚本就不会各自拼装不同产物。'],
  ['scripts/build-python-release.py', 'wheel 发布同时涉及版本格式、平台 tag 和 runtime payload，任何一项不一致都会产生“能安装但不能运行”的包；单独的发布构建器把这些检查放在同一条流水线。'],
  ['scripts/check-vendor-manifest.sh', 'vendor 源码变更会影响许可证和来源声明，且很容易被普通代码审查漏掉；在 staged diff 上做清单门禁，能把第三方 provenance 变成发布前的强制约束。'],
  ['scripts/clean.ts', '清理构建产物具有破坏性，必须根据 project-reference 图和明确的 allow-list 删除；把 symlink、跨仓库路径和未知残留检查集中起来，避免“clean”误伤源码或别的项目。'],
  ['scripts/gen-third-party-notices.ts', '发布声明需要合并 npm、Python、vendor 和 SPDX 多种元数据；生成器把来源转换成可重复的 notices，避免人工复制遗漏许可证或版本。'],
  ['scripts/project-doc-site.ts', '网站是 canonical Markdown 的投影，不应反过来成为文档真源；单独的投影器集中处理链接、图片和 frontmatter，网站结构调整不会修改作者维护的原文。'],
  ['scripts/run-gates.ts', '质量门禁有依赖、并发、模式和跳过规则，分散到 shell 命令会让结果难以解释；调度器集中收集状态并保留 gate 关系，才能区分真正通过与被跳过。'],
  ['scripts/translation-pairing.ts', '中文、英文和国际化清单必须知道彼此对应的源文件及 Git blob；用配对检查和 hash 维护关系，可以在翻译落后时给出确定诊断，而不是靠人工记忆。'],
  ['scripts/release/process.ts', '发布命令执行需要统一捕获 stdout/stderr、退出码、重试和入口判断；将进程边界集中后，具体 release 步骤可以复用相同的失败语义。'],
  ['scripts/release/publish.ts', 'registry 发布可能重试、重复执行或遇到暂时错误，状态和完整性 hash 必须先被记录；集中协调发布状态可以把幂等性写成明确规则。'],
  ['scripts/release/verify.ts', '发布前要同时检查 release family、版本基线、tag 和 publishability；独立资格验证器让“可以发布”成为有证据的门禁，而不是某个命令碰巧成功。'],
  ['scripts/wine-windows-gates.sh', 'Linux 通过不能代表 Wine/Windows 的 launcher、路径和包行为也正确；把目标平台差异放进专门门禁，能在发布前暴露跨平台风险而不污染普通测试。'],
  ['scripts/agent-note-tree.ts', 'Agent Note 的 lifecycle 和 class 是一个封闭集合，目录遍历又必须被多个 gate 复用；把它作为纯结构真值，其他检查器就不会各自维护一套稍有差异的分类规则。'],
  ['scripts/archived-agent-notes.ts', '归档记录一旦发布就应保持不可变，新增归档只能扩展 manifest 不能改写旧 seal；单独的 helper 把历史 provenance 和当前目录检查分开。'],
  ['scripts/verify-agent-note-classification.ts', '分类 gate 只负责生命周期、class、日期文件名和旧路径禁用；把它与 Markdown 格式 gate 分开，错误可以明确指向“放错目录”而不是笼统地说格式失败。'],
  ['scripts/verify-archived-agent-notes.ts', '归档校验需要同时比较内容摘要、manifest seal 和目录中的三件套；独立门禁可以在不可变历史被替换时拒绝发布，而不影响普通 Agent Note 编辑。'],
  ['scripts/smoke-python-runtime.py', 'Python SDK 的完整 turn 既涉及子进程又涉及 JSON-RPC 和 Session snapshot，不能只用单元测试模拟；keyless smoke 保留真实 runtime carrier 边界，同时用固定响应避免依赖 API key。'],
  ['scripts/gen-cordis-api.ts', '旧命令名仍可能被 CI、文档或贡献者使用，但实现已统一到 Typert catalog；保留一个薄兼容入口，既不复制生成逻辑，也不让旧调用方式突然失效。'],
  ['scripts/gen-tool-catalog.ts', '工具 schema 可能由插件启动时计算出来，静态读取源码并不能代表运行时结果；生成器从真实注册流程收集 schema，再与磁盘包 manifest 对照，文档才不会漏掉动态能力。'],
  ['scripts/verify-runtime-closure.ts', '发布包关闭自动 peer 安装后，缺失依赖可能延迟到 Cordis 加载插件才出现；在构建阶段遍历 executable manifest 的依赖闭包，把部署失败提前变成可诊断 gate。'],
  ['scripts/verify-built-package-invariants.mjs', '编译产物可能在源码 workspace 中看似可用，却在自引用 package 环境中缺入口或缺 companion；把 staged package 当普通 Node 消费者验证，才能检查真正的发布边界。'],
  ['packages/acp/acp/src/codec.ts', 'ACP 对外只接受自己的 stop reason 和 prompt 内容 vocabulary；把 Harness lifecycle 到 ACP wire 的转换集中在纯函数中，宿主可以替换协议适配而不污染 Session 和 Agent 领域逻辑。'],
  ['packages/context/session-reference/src/serialization.ts', 'model-visible 引用可能被放进 XML-like prompt 环境，必须防止数据本身闭合或开启标签；转义 `<` 且保持 JSON parse 结果不变，能把安全约束放在唯一序列化边界。'],
  ['packages/hooks/hook-protocol/src/codec.ts', 'Hook 是独立进程，退出码、结构化 stdout、纯文本 stdout 和 stderr 都可能表达结果；统一 codec 后，桥接层只处理已经规范化的 HookOutput，不必各自解释进程细节。'],
  ['packages/llm/llm-deepseek/src/serialize.ts', '核心消息模型需要支持多种 provider，而 DeepSeek wire 对 tool call、reasoning passback 和图像有自己的限制；适配器在边界显式转换或拒绝，Agent 就不必分支处理供应商协议。'],
  ['packages/storage/storage-json/src/format.ts', 'JSON 后端存在的价值就是人能读懂磁盘状态；把当前净状态、稳定写出顺序和 JSON-safe 约束放进格式层，调试和迁移可以检查文件本身而不依赖数据库工具。'],
  ['scripts/verify-agent-note-format.ts', 'Agent Note 的格式规则与目录分类、翻译配对是不同不变量；分成独立 gate 后，格式迁移可以单独设置 grandfather 规则，目录和翻译门禁也不会互相吞掉错误。'],
  ['vendor/cordis/bin.js', 'Cordis loader 入口需要用当前目录建立根上下文并读取 cordis.yml，但不能把应用 CLI 参数混进框架层；保持这个薄入口，框架加载和应用启动各自拥有清晰责任。'],
  ['vendor/cordis/src/events.ts', '事件分发有 broadcast、串行、短路和 waterfall 等不同顺序语义，且监听器属于插件 fiber；集中实现这些模式并绑定清理，插件之间才能共享一致的协作和卸载规则。'],
  ['vendor/cordis/src/fiber.ts', '插件安装产生的监听器、服务和子插件都必须可撤销，异步失败还要能回滚；fiber 作为生命周期所有者统一等待、记录和反向清理，避免效果脱离插件树残留。'],
  ['vendor/cordis/src/reflect.ts', '服务访问需要同时支持查找、提供、代理和上下文扩展，调用者不应知道服务实例存在哪里；反射层集中这些访问方式，插件可以替换实现而不改变消费方。'],
  ['vendor/cordis/src/registry.ts', '插件声明、依赖解析和 runtime 实例是不同概念，混在业务代码中会让依赖顺序不可见；注册表把定义与解析集中起来，为 loader 和测试提供同一份插件图。'],
  ['vendor/cordis/src/service.ts', '服务的所有权属于注册它的 fiber，fiber 销毁时服务也必须撤销；把注册和自动移除放在服务层，可以防止插件卸载后仍留下可访问的旧实例。'],
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

function scannedTestTopics(meta = {}) {
  const topics = (meta.tests ?? []).length > 0
    ? meta.tests
    : (meta.exports ?? []).filter(name => /^test[_A-Z]/i.test(name))
  return topics
    .filter(Boolean)
    .slice(0, 4)
    .map(value => value.length > 90 ? `${value.slice(0, 87)}...` : value)
}

function scannedDeclarationSummary(meta = {}) {
  if (!meta.exports || meta.exports.length === 0) return ''
  return meta.exports.slice(0, 5).map(name => `\`${name}\``).join('、')
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

function scannedStructureSummary(file, text) {
  if (extension(file) === '.html' || extension(file) === '.htm') {
    const ids = [...text.matchAll(/\bid=["']([^"']+)["']/gi)].map(match => `#${match[1]}`)
    const scripts = [...text.matchAll(/\bsrc=["']([^"']+)["']/gi)].map(match => match[1])
    const links = [...text.matchAll(/\bhref=["']([^"']+)["']/gi)].map(match => match[1])
    const parts = []
    if (ids.length > 0) parts.push(`id ${[...new Set(ids)].slice(0, 6).join('、')}`)
    if (scripts.length > 0) parts.push(`脚本 ${[...new Set(scripts)].slice(0, 4).join('、')}`)
    if (links.length > 0) parts.push(`链接资源 ${[...new Set(links)].slice(0, 4).join('、')}`)
    return parts.length > 0 ? `HTML 结构包含 ${parts.join('；')}` : 'HTML 文件没有扫描到 id、脚本或链接资源属性'
  }
  if (extension(file) === '.css' || extension(file) === '.scss') {
    const selectors = [...text.matchAll(/\.([A-Za-z_][\w-]*)\s*(?=[{,:])/g)].map(match => `.${match[1]}`)
    const variables = [...text.matchAll(/--([A-Za-z_][\w-]*)\s*:/g)].map(match => `--${match[1]}`)
    const parts = []
    if (selectors.length > 0) parts.push(`选择器 ${[...new Set(selectors)].slice(0, 6).join('、')}`)
    if (variables.length > 0) parts.push(`自定义属性 ${[...new Set(variables)].slice(0, 6).join('、')}`)
    return parts.length > 0 ? `样式结构包含${parts.join('；')}` : ''
  }
  if (extension(file) === '.sql') {
    const statements = [...text.matchAll(/\b(CREATE|ALTER|INSERT|UPDATE|DELETE|SELECT|WITH|DROP)\b/gi)]
      .map(match => match[1].toUpperCase())
    return statements.length > 0 ? `SQL 中扫描到 ${[...new Set(statements)].join('、')} 语句` : ''
  }
  return ''
}

function rawPurposeFor(file, role, meta = {}) {
  const specific = SPECIFIC_PURPOSES.get(file)
  if (specific) return specific
  const overridden = ROLE_OVERRIDES.get(file)
  if (overridden?.purpose) return overridden.purpose
  const rawConcept = conceptFor(file)
  const concept = rawConcept.endsWith('`') ? `${rawConcept} ` : rawConcept
  const subject = fileSubject(file)
  if (role.role === 'Cordis 上下文') return '它定义 Cordis 插件共享的 Context，让服务、事件、注册表和插件生命周期可以在同一个作用范围内协作。'
  if (role.role === '测试服务器') return `它为 ${concept} 提供受控的模拟网络或模型服务，记录请求并返回可重复的响应，让测试不依赖真实网络。`
  if (role.role === '共享测试契约') return `它为 ${concept} 定义多种实现都必须通过的共同测试规则，避免 JSONL、SQLite 或不同宿主各自测试出不同标准。`
  if (role.role === '测试工具') return `它为 ${concept}的测试提供组装、模拟或渲染辅助，让真正的测试用例可以把重点放在行为和断言上。`
  if (role.role === '测试夹具') {
    const topics = scannedTestTopics(meta)
    // concept 回退成「某包里的 tests/…」路径回声时，改用不自指的表述。
    const subject = rawConcept.startsWith('`') ? '同包测试' : concept
    return topics.length > 0
      ? `它为 ${subject}提供固定输入、进程、事件或快照；源码中可见的测试主题包括${topics.map(topic => `“${topic}”`).join('、')}。`
      : `它为 ${subject}提供固定输入、进程、事件或快照，让每次验证都从同一个受控状态开始。`
  }
  if (role.role === '测试用例') {
    const topics = scannedTestTopics(meta)
    const testName = stem(file)
    if (topics.length > 0) {
      // 路径回声会让句子变成「检查自己」，此时让扫描到的真实测试主题领句。
      return rawConcept.startsWith('`')
        ? `它围绕“${testName}”写出可重复运行的断言，覆盖的场景包括${topics.map(topic => `“${topic}”`).join('、')}；这些断言把“应该发生什么”变成可以重复运行的证据。`
        : `它用自动化测试检查 ${concept}的具体场景，包括${topics.map(topic => `“${topic}”`).join('、')}；这些断言把“应该发生什么”变成可以重复运行的证据。`
    }
    return `它围绕“${testName}”写出可重复运行的断言，覆盖成功、失败或边界行为；读者可以从测试输入、触发动作和断言反推实现契约。`
  }
  if (role.role === '测试支持') return `它为“${stem(file)}”相关测试提供共享准备或环境支持；真正的行为断言由导入它的测试用例完成。`
  if (role.role === '测试与验证') return `它围绕 ${concept}写出可重复运行的断言，覆盖成功、失败或边界行为。`
  if (role.role === '测试材料') return `它为 ${concept}的测试提供固定输入、输出或快照，让每次验证使用同一份材料。`
  if (role.role === '本地化资源') return `它为 ${concept}提供语言文本、键名或本地化格式，让界面切换语言时不必改动业务流程。`
  if (role.role === '扩展槽位契约') return `它为 ${concept}定义可插入的槽位和输入契约，让插件或界面扩展可以在不复制主流程的情况下接入。`
  if (role.role === '品牌类型') return `它为 ${concept}定义带语义的品牌类型，使编译器能阻止不同用途的标识符互相替换。`
  if (role.role === '呈现转换') return `它把 ${concept}转换成界面或终端可以消费的呈现结构，执行逻辑因此不需要知道具体 UI 组件。`
  if (role.role === '状态存储') return `它维护 ${concept}的状态、快照或队列，并集中处理更新、读取和清理规则。`
  if (role.role === '状态投影') return `它把 ${concept}的事件或领域事实计算成读取侧投影，查询和界面可以直接消费而不修改原始事实。`
  if (role.role === '会话状态模型') return `它描述或维护 ${concept}的生命周期和状态变化，让日志、客户端和运行时共享同一条会话边界。`
  if (role.role === '连接与传输边界') return `它负责 ${concept}的建立、消息传输、断开和错误状态，把网络细节隔离在上层业务之外。`
  if (role.role === 'API 边界') return `它集中处理 ${concept}的请求、响应或客户端调用，把外部字段转换成内部可以使用的形状。`
  if (role.role === '协议边界') return `它规定 ${concept}两端交换的消息形状和生命周期，避免不同进程或线程各自解释协议。`
  if (role.role === '交互控制器') return `它把 ${concept}的用户操作或外部事件编排成状态更新和命令调用，让组件只需要呈现结果。`
  if (role.role === '状态管理器') return `它协调 ${concept}的一组实例、缓存或生命周期，集中处理创建、选择、更新和清理。`
  if (role.role === '领域模型') return `它表达 ${concept}的领域状态、创建方式和约束，让存储与界面层依赖稳定语义。`
  if (role.role === '运行驱动') return `它推进 ${concept}的输入、执行、输出和退出状态，把一类运行流程封装成可观察的边界。`
  if (role.role === '协议翻译') return `它在两种 ${concept}表示之间做明确转换，让供应商、协议或错误格式差异停留在边界。`
  if (role.role === '格式编解码') return `它把 ${concept}在内存与外部表示之间转换，并在协议或磁盘边界检查数据；具体格式语义以源码顶部说明和对应测试为准。`
  if (role.role === '策略与权限边界') return `它集中判断 ${concept}是否允许以及需要哪种授权，让调用方不必各自复制权限规则。`
  if (role.role === '路径边界') return `它负责 ${concept}的解析、规范化和安全约束，统一处理不同平台的路径差异与越界检查。`
  if (role.role === '查询实现') return `它把 ${concept}的筛选、排序、游标或读取逻辑组织成可复用查询，调用方不必直接操作底层记录。`
  if (role.role === '队列状态') return `它维护 ${concept}中尚未处理的项目，集中定义入队、出队、顺序和取消规则。`
  if (role.role === '消息模型') return `它定义 ${concept}的消息或内容块结构，使模型、日志、工具和界面使用同一份消息语义。`
  if (role.role === '数据规格') return `它集中描述 ${concept}的字段、默认值和约束，供实现、序列化和校验共同使用。`
  if (role.role === '模块入口') return `它把 ${concept}相关的公开能力集中导出，并决定调用者可以依赖哪些边界；调用者因此不必记住所有内部文件。`
  if (role.role === '类型契约') return `它描述 ${concept}中流转的数据长什么样、哪些字段必填以及各部分怎样关联，让不同模块先共享同一份约定。`
  if (role.role === '配置与数据形状') return `它定义 ${concept}可接受的配置或输入形状，并在数据进入深层逻辑前集中校验。`
  if (role.role === '构建或测试配置') return `它告诉工具链怎样处理 ${concept}：从哪里开始、使用哪个环境、解析哪些依赖以及输出什么产物；这些规则集中后，构建和测试才可重复。`
  if (role.role === '事件契约') return `它列出 ${concept}可以发送和接收的事件。用事件传递信息，能让生产者和消费者少互相导入，插件也更容易替换。`
  if (role.role === '服务或提供方') return `它定义或提供 ${concept}的可取得服务，负责注册、查找或具体实现；接口和实现分开后，同一能力可以换成本地、远程或测试版本。`
  if (role.role === '外部能力适配层') return `它把外部协议转换成 ${concept}能理解的内部协议。转换集中在边界，核心逻辑就不必到处处理供应商差异。`
  if (role.role === '智能体运行时') return `它参与 ${concept}的一次运行：领取输入、请求模型、处理工具或结束轮次；把状态集中管理可以保住顺序、取消和错误处理规则。`
  if (role.role === '工具能力') return `它提供 ${concept}的一项可调用能力，通常同时处理参数、执行和结果展示；独立工具让权限和测试可以逐项控制。`
  if (role.role === '提示词与上下文') return `它把 ${concept}的分散信息整理成模型能读的请求。集中组装可以保持顺序、来源和可重放性一致。`
  if (role.role === '网络或路由层') return `它把外部请求接到 ${concept}的内部服务，并处理协议边界；这样 Web、命令行和业务逻辑不会混在同一个函数里。`
  if (role.role === '进程或线程边界') return `它把 ${concept}的工作放进独立进程、线程或 worker 中，隔离资源、取消和崩溃影响，也方便替换执行后端。`
  if (role.role === '运行时不变量') return `它检查 ${concept}必须始终成立的条件，在错误刚出现时报告，而不是等到更深层才出现难以解释的结果。`
  if (role.role === '故障修复') return `它处理 ${concept}发生中断或不完整时的修复路径，保留不能确定的事实而不把失败伪装成成功。`
  if (role.role === '持久化边界') return `它负责 ${concept}在内存和磁盘格式之间的转换，把写入、读取、校验和崩溃恢复集中到可替换的边界。`
  if (role.role === '可见表面投影') return `它把 ${concept}的原始事件折叠成模型或界面需要看到的有序内容，同时保留事件来源以便重放。`
  if (role.role === 'JSON 边界') return `它检查或转换 ${concept}的可安全序列化 JSON 数据，阻止不可重放的对象穿过协议和持久化边界。`
  if (role.role === '界面样式') return `它定义 ${fileSubject(file)} 的网页外观、布局和状态样式，让界面逻辑与视觉规则可以分别修改。`
  if (role.role === '界面组件或界面逻辑') {
    const component = stem(file)
    const exports = meta.exports.length > 0 ? `，并导出 ${meta.exports.slice(0, 3).map(name => `\`${name}\``).join('、')}` : ''
    const comment = meta.doc ? `；源码顶部还说明：${meta.doc}` : ''
    return `它实现名为 \`${component}\` 的界面组件或交互逻辑${exports}，把输入、局部状态和用户操作组织成可渲染的 UI 单元${comment}。`
  }
  if (role.role === '工具呈现模型') return `它为工具结果准备可展示的 ${fileSubject(file)} 模型，供 UI 读取和渲染；它不负责启动、审批或执行工具。`
  if (role.role === '轨迹界面逻辑') return `它实现 ${fileSubject(file)} 的时间线或 ledger 展示逻辑，处理用户可见的顺序、折叠和筛选状态。`
  if (role.role === '仓库自动化脚本') {
    const sourceHint = meta.doc
      ? `固定提交的顶部注释把它定位为“${meta.doc}”`
      : scannedDeclarationSummary(meta)
        ? `固定提交中扫描到的声明包括 ${scannedDeclarationSummary(meta)}`
        : '固定提交没有扫描到顶部注释或顶层声明'
    return `它执行 ${concept}相关的构建、检查、打包、发布或开发辅助步骤，把容易重复出错的操作固定成可复用命令；${sourceHint}，具体命令和输入输出仍应回到源码确认。`
  }
  if (role.role === '原生实现') return `它实现 ${concept}需要的操作系统或底层能力；上层通过边界接口使用它，不必把平台细节散落到业务代码中。`
  if (role.role === 'Python 模块') return `它实现 ${concept}的 Python 侧职责，把 SDK 调用、runtime 载体或示例流程连接到 Harness 的协议边界。`
  if (role.role === '数据库脚本') return `它定义 ${concept}使用的数据库结构、查询或迁移步骤，让持久化变化可以被审查、重复执行和验证。`
  if (role.role === '页面模板') return `它提供 ${concept}的浏览器静态容器和启动资源；具体交互由脚本或组件实现，模板只保留页面宿主必须知道的结构。`
  if (role.role === '程序入口') {
    const packageRoot = packageRootFor(file)
    return `它接收启动参数并把程序交给 \`${packageRoot}\` 中的应用入口；入口保持薄，可以让同一套业务逻辑被不同宿主复用。`
  }
  if (role.role === '常量与默认值') return `它集中放置 ${concept}使用的名称、默认值或限制，避免不同模块悄悄使用不同的数字和字符串。`
  if (role.purpose) return role.purpose
  const declarations = scannedDeclarationSummary(meta)
  const declarationHint = declarations
    ? `固定提交中可见的公开或顶层声明包括 ${declarations}，这些声明构成它对外提供的主要入口。`
    : '固定提交没有扫描到顶层声明，职责可能通过默认导出、闭包或配置副作用提供。'
  const packageRoot = packageRootFor(file)
  return `它位于 \`${packageRoot}\`，围绕${subject}组织实现；${declarationHint}阅读时应沿直接协作者和测试继续确认具体输入、输出与失败边界。`
}

function purposeFor(file, role, meta = {}) {
  return rawPurposeFor(file, role, meta)
    .replace(/` +/g, '` ')
    .replace(/([\u3400-\u9fff]) +(?=[\u3400-\u9fff])/g, '$1')
}

function cleanChineseSpacing(value) {
  return value.replace(/([\u3400-\u9fff]) +(?=[\u3400-\u9fff])/g, '$1')
}

function designReason(file, role, meta = {}, graph = {}) {
  const subject = fileSubject(file)
  const specific = SPECIFIC_DESIGN_REASONS.get(file)
  if (specific) return specific
  if (file.startsWith('vendor/')) return 'Vendored 源码单独放置，便于记录来源、版本、许可证和 DSH 的本地修改；它不是未经维护的黑盒上游，学习时要同时区分上游概念与 DSH 固定的 fork 行为。'
  if (role === '测试夹具' || role === '测试支持') return '测试材料和被测实现分开，测试可以反复使用同一个受控输入；它不应该被误认为线上入口或生产服务。'
  if (role === '测试服务器') return '网络或模型依赖放进受控的模拟服务，测试才能重复触发成功、断开和错误响应；生产连接实现不必为了测试而改变行为。'
  if (role === '共享测试契约') return '多个实现共享同一组契约测试，才能比较它们是否遵守相同的外部行为；契约与具体实现分开也能减少复制断言。'
  if (role === '测试工具') return '测试辅助代码集中准备环境和输入，最终断言留在具体测试用例里；这样辅助逻辑可复用，又不会把“准备了什么”误当成“验证通过了什么”。'
  if (role === '第三方实现') return '第三方代码固定在 vendor 目录并通过 Manifest 管理，便于审查许可证、上游来源和 DSH 的本地改动；上层只通过稳定边界依赖它。'
  if (role === '原生实现') return '平台细节集中在原生边界，JavaScript/TypeScript 上层可以通过稳定接口使用它；替换操作系统实现时，业务流程不必跟着分叉。'
  if (role === '界面交互逻辑' || role === '对话界面逻辑') return '把用户操作和视图状态放在界面包内，能让 Web 组件复用同一套交互契约，也让服务端和领域逻辑不被浏览器细节污染。'
  if (role === '客户端会话投影') return '客户端看到的会话行和状态是原始事件的读取侧投影；单独维护投影可以优化渲染和分页，同时保留从日志重新计算的能力。'
  if (role === '模型服务实现') return '统一 LLM 契约隔离供应商字段、流式协议和错误形状；模型服务包只负责边界转换，Agent 不必为每个供应商写分支。'
  if (role === '子 agent 实现') return '子 agent 的生命周期与父 agent 有明确边界，单独组织可以处理取消、回报和失败传播，而不把子任务状态混进主轮次。'
  if (role === '扩展实现') return '可选能力通过扩展包接入插件树，核心包保持窄而稳定；扩展可以独立发布、替换和测试。'
  if (role === '启动服务') return '启动阶段的检查和资源注册集中在生命周期边界，正式运行、测试和关闭流程就能复用同一套顺序。'
  if (role === 'Profile 配置解析') return 'Profile 只描述组合关系，具体插件实现留在 bundle 和包内；把 patch 层集中解析可以让宿主差异可见且可追踪。'
  if (role === '客户端运行时契约') return '客户端运行时通过窄契约暴露宿主事实，界面可以替换而不改变服务端和 Session 的核心语义。'
  if (role === 'React 宿主适配') return 'React 生命周期和 Harness 服务生命周期不是同一层，单独适配可以处理挂载、卸载和订阅清理而不污染核心服务。'
  if (role === 'Web 宿主运行时') return '浏览器专属对象和加载时序集中在 Web 宿主，CLI、测试和服务端可以继续复用不依赖 DOM 的运行时。'
  if (role === 'Schema 表单模型') return 'Schema 与表单视图分层，配置规则由 schema 保持权威，UI 只负责编辑和展示校验结果。'
  if (role === '宿主 API 资源处理') return '每类 API 资源在宿主边界集中处理认证、校验和响应，内部领域服务不必重复协议防护。'
  if (role === '目录选择宿主适配') return '自动探测与原生对话框是两种宿主实现，适配层统一它们的返回形状，让上层不分支处理平台差异。'
  if (role === 'Agent 状态实现') return 'Agent 的工作状态和分发规则独立于具体 loop，便于 Agent loop、测试和其他宿主共享同一领域对象。'
  if (role === '上下文压缩实现') return '压缩阶段单独组织，才能在不改变原始会话事实的前提下替换摘要策略并测试信息保留边界。'
  if (role === '上下文来源实现') return '每种上下文来源有独立的采集和格式化边界，组装器可以控制顺序、优先级和可重放性。'
  if (role === '远程执行适配') return '远程执行与本地执行共享上层契约，E2B 差异集中在适配包内，失败和清理规则才不会散落到工具调用者。'
  if (role === '文件系统实现') return '文件系统实现与工具意图分开，路径安全、平台差异和底层 I/O 可以独立替换和测试。'
  if (role === '钩子协议实现') return '钩子协议独立于具体宿主，匹配和合并规则可以被多个入口复用，外部自动化也不必复制主流程。'
  if (role === 'LSP 传输实现') return 'LSP framing 和连接生命周期集中在传输层，工具逻辑只消费完整消息，不必处理半包、EOF 和进程退出。'
  if (role === 'Agent preset 实现') return 'preset 的发现、元数据和挂载分开于 Agent 执行，用户可以选择或复制配置而不直接编辑系统组合。'
  if (role === '沙箱策略实现') return '沙箱策略是工具执行的安全边界，集中处理权限和平台行为可以让默认拒绝、升级和清理保持一致。'
  if (role === '会话查询实现') return '查询侧只读取会话事实并构造索引或结果，避免历史搜索反向修改 Session；不同查询后端也能共享上层语义。'
  if (role === '会话持久化实现') return 'Session 事实需要可追加、可恢复和可审计，持久化组件分层后可以单独处理崩溃、版本和写入延迟。'
  if (role === '设置实现') return '配置校验、脱敏和作用域规则集中在设置包，运行时得到的是已经解释清楚的值，不必各处重复防御。'
  if (role === 'Shell 执行实现') return 'Shell 差异限制在执行包内，命令、环境、输出和取消可以通过统一工具协议提供给 Agent。'
  if (role === '存储后端实现') return '领域语义与 JSON/SQLite 后端分开，未来更换存储或加入原子写入时不会重写上层 Session 逻辑。'
  if (role === '子进程执行实现') return '进程启动和退出规则集中，工具调用者只处理统一的输出、信号和错误结果，便于替换本地执行后端。'
  if (role === '终端会话实现') return '持久终端封装状态和清理，多个工具调用可以复用同一会话而不直接依赖操作系统终端 API。'
  if (role === '类型代码生成实现') return '类型模型是源事实，生成器负责把它投影成代码和 catalog；生成层独立后可以单测输出稳定性而不影响运行时 loader。'
  if (role === '工作流执行实现') return 'worker、realm 和协议隔离工作流资源与主进程，取消或崩溃不会直接破坏宿主的插件树。'
  if (role === 'Workspace 领域实现') return 'workspace 是文件、会话和沙箱共享的边界，集中定义实体与路径可以避免各包对工作目录作不同解释。'
  if (role === '目标状态实现') return '目标状态与 Agent 执行分开，折叠和收束规则可以被界面、日志和工作流共同观察。'
  if (role === '调度实现') return '调度事务的状态转换集中管理，时间触发和提交失败不会被每个调用者分别解释。'
  if (role === 'SDK 生命周期实现') return 'SDK 将外部调用者看到的生命周期封装起来，资源释放和 runtime 连接不泄漏到使用方。'
  if (role === '测试支持') return '测试支持代码集中提供受控运行时和固定材料，生产实现保持原样，测试也不会靠隐式全局状态通过。'
  if (role === '测试用例') {
    const topics = scannedTestTopics(meta)
    const focus = topics.length > 0
      ? `测试主题“${topics[0]}”`
      : `测试文件 \`${stem(file)}\``
    const separator = topics.length > 0 ? '' : ' '
    return `把${focus}${separator}写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。`
  }
  if (role === '本地化资源') return '文本资源与业务流程分开，新增语言或修改措辞时不必改动状态机和领域逻辑；键名也能成为组件与翻译文件之间的稳定契约。'
  if (role === '扩展槽位契约') return '把扩展点先定义成窄契约，可以让提供方和消费方独立演进；插件不需要复制宿主流程，也更容易在测试中替换。'
  if (role === '品牌类型') return '在编译期区分语义不同的标识符，能把一类容易被普通字符串掩盖的调用错误提前暴露，而不增加运行时序列化成本。'
  if (role === '呈现转换') return '领域事实和可见表示分开，CLI、Web 或其他宿主可以各自渲染同一份结果；执行代码也不会被 UI 细节反向污染。'
  if (role === '状态存储') return '状态更新集中在一个边界，调用者不需要维护多份副本；未来替换观察、缓存或持久化方式时，消费方依赖仍然稳定。'
  if (role === '状态投影') return '原始事实保留可审计和可重放性，读取投影单独计算并可丢弃重建；这样查询性能优化不会改变领域事件本身。'
  if (role === '会话状态模型') return '会话状态需要被日志、运行时和界面共同理解，单独建模可以让生命周期与恢复规则不被某一个宿主私有化。'
  if (role === '连接与传输边界') return '连接断开、重连和协议错误集中处理，业务层只面对稳定的请求与事件接口；测试也能用替身验证网络边界而不依赖真实服务。'
  if (role === 'API 边界') return '外部 API 的字段和错误格式集中在边界转换，内部服务不必到处携带 HTTP/RPC 细节，客户端和服务端也能分别演进。'
  if (role === '协议边界') return '协议独立于两端实现，消息版本、生命周期和失败语义才有单一的审查位置；进程或线程替换不会改变上层契约。'
  if (role === '交互控制器') return '把用户动作编排从展示组件中抽出，组件可以保持可组合，流程也可以在没有浏览器的测试环境中被验证。'
  if (role === '状态管理器') return '一组对象的创建、选择和清理若由多个调用者分别负责，状态容易分叉；管理器集中生命周期可以保持快照与事件顺序一致。'
  if (role === '领域模型') return '领域规则放在模型层，存储、协议和 UI 只做转换；同一语义可以被不同入口复用，也更容易用纯数据测试。'
  if (role === '运行驱动') return '运行流程的输入、输出和退出状态集中，宿主只负责提供环境；这样命令行、测试和服务端可以复用同一条执行路径。'
  if (role === '协议翻译') return '把两种表示的差异限制在翻译函数内，核心逻辑不必分支处理供应商字段；翻译规则也可以用成对输入输出单独测试。'
  if (role === '格式编解码') return '序列化格式是持久化或传输的长期契约，单独封装能集中处理版本、截断、非法输入和兼容性，而不让领域代码承担字节细节。'
  if (role === '策略与权限边界') return '权限判断集中后，所有调用路径可以共享同一条拒绝规则；策略变化也不会要求每个工具、路由和界面分别修补。'
  if (role === '路径边界') return '路径是跨平台且涉及安全的输入，集中规范化和越界判断可以避免不同调用方产生不一致的文件目标。'
  if (role === '查询实现') return '查询与原始存储分开，调用方只依赖筛选和游标语义；底层换成另一种索引或数据库时，上层不必重写。'
  if (role === '队列状态') return '等待中的项目需要稳定顺序、取消和重试语义，单独的队列边界可以避免这些规则散落在生产者和消费者之间。'
  if (role === '消息模型') return '消息是模型、日志、工具和 UI 的共同语言，集中定义可以避免每一层都做一套不兼容的内容判断。'
  if (role === '数据规格') return '把字段、默认值和约束集中成规格，运行时实现与存储校验就能共享同一份输入契约。'
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
  if (role === '界面样式') return `把 ${fileSubject(file)} 的样式与业务流程分开，浏览器端可以调整外观而不改变服务端或 agent 的行为；组件只通过 class 和状态选择器使用它。`
  if (role === '工具呈现模型') return '工具执行结果和 UI 卡片不是同一种结构；单独维护呈现模型，能让 CLI/Web 选择各自的视觉表达，而不会把执行层绑死在某个组件上。'
  if (role === '轨迹界面逻辑') return '轨迹时间线需要把事件顺序、耗时和折叠状态呈现给用户，但这些状态不应反向修改 Session 原始事实；单独的界面层保留了这种读取侧边界。'
  if (role === '原生包自动化脚本') {
    const sourceHint = meta.doc
      ? `固定提交的顶部注释把它定位为“${meta.doc}”`
      : scannedDeclarationSummary(meta)
        ? `固定提交中扫描到的声明包括 ${scannedDeclarationSummary(meta)}`
        : '固定提交没有扫描到顶部注释或顶层声明'
    return `原生构建和平台验证依赖编译器、目标系统和产物布局；把这组步骤留在原生包的自动化边界中，JavaScript 业务层就不必携带平台分支。${sourceHint}。`
  }
  if (role === '功能实现') {
    const importedCount = graph.importsByFile?.get(file)?.length ?? 0
    const importerCount = graph.importersByTarget?.get(file)?.size ?? 0
    const packageRoot = packageRootFor(file)
    return `把${subject}单独放在 \`${packageRoot}\`，可以让这一段实现拥有清楚的输入、输出和替换边界；固定版本中它连接 ${importedCount} 个本地依赖和 ${importerCount} 个直接使用者，读者可以沿这些连接验证设计是否成立。`
  }
  if (meta.doc) return `固定提交的文件顶部注释把它定位为“${meta.doc}”；把这项职责单独放置，可以让边界、输入和失败处理在一个地方被阅读和测试。`
  const declarations = scannedDeclarationSummary(meta)
  if (declarations) {
    return `固定提交中扫描到的声明包括 ${declarations}；把这些相互关联的声明集中在同一文件，可以让输入、输出和修改边界更容易一起检查。`
  }
  const importedCount = graph.importsByFile?.get(file)?.length ?? 0
  const importerCount = graph.importersByTarget?.get(file)?.size ?? 0
  if (importedCount > 0 || importerCount > 0) {
    return `固定提交中它与 ${importedCount} 个相对依赖和 ${importerCount} 个直接使用者相连；保持这个文件职责较窄，可以让依赖方向和替换边界清楚。`
  }
  return `它位于 ${file.split('/').slice(0, -1).join('/') || '仓库根部'}的${role}层；固定提交没有解析到本地依赖或顶层声明，因此先把它作为独立边界阅读，再回到源码确认具体实现。`
}

function designEvidenceFor(file, meta = {}, graph = {}, sourceRead = false) {
  if (!sourceRead) {
    return '本次生成没有提供固定提交的源码归档，未执行顶部注释、声明、结构或本地 import 扫描；不能把 import 数量写成 0，也不能把路径模板当成源码事实。这是文件级证据不可用的提醒，仍不替代人工源码阅读。'
  }
  const parts = []
  const imports = graph.importsByFile?.get(file) ?? []
  const importers = [...(graph.importersByTarget?.get(file) ?? [])].sort()
  const declarations = scannedDeclarationSummary(meta)
  if (meta.doc) parts.push(`源码顶部注释把它定位为“${meta.doc}”`)
  if (declarations) parts.push(`固定提交中扫描到的声明包括 ${declarations}`)
  if (meta.structure) parts.push(`固定提交中扫描到的结构线索是：${meta.structure}`)
  parts.push(`本地静态 import 图显示它直接依赖 ${imports.length} 个源文件，并被 ${importers.length} 个源文件直接引用`)
  if (parts.length === 1) {
    parts.unshift('本次固定提交归档没有扫描到顶部注释、顶层声明或专门的结构线索')
  }
  return `${parts.join('；')}。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。`
}

function sourceFilePath(file, sourceRoot) {
  return join(sourceRoot, ...file.split('/'))
}

function verifySourceRoot(sourceFiles, sourceRoot, commit, root) {
  if (!existsSync(sourceRoot)) {
    throw new Error(`--source-root 不存在：${sourceRoot}`)
  }
  const mismatches = []
  const present = []
  for (const file of sourceFiles) {
    const full = sourceFilePath(file, sourceRoot)
    if (!existsSync(full)) {
      mismatches.push(`${file}: 归档缺少文件`)
      continue
    }
    present.push({ file, full })
  }
  if (present.length > 0) {
    const expectedOutput = execFileSync('git', ['cat-file', '--batch-check=%(objectname)'], {
      cwd: root,
      encoding: 'utf8',
      input: `${present.map(({ file }) => `${commit}:${file}`).join('\n')}\n`,
    }).trim().split(/\r?\n/)
    const actualOutput = execFileSync('git', ['hash-object', '--no-filters', '--stdin-paths'], {
      cwd: root,
      encoding: 'utf8',
      input: present.map(({ full }) => full).join('\n'),
    }).trim().split(/\r?\n/)
    for (let index = 0; index < present.length; index += 1) {
      const { file } = present[index]
      const expected = expectedOutput[index]
      const actual = actualOutput[index]
      if (!expected || !actual || expected !== actual) mismatches.push(`${file}: Git blob ${actual ?? 'missing'} != ${expected ?? 'missing'}`)
    }
  }
  if (mismatches.length > 0) {
    const preview = mismatches.slice(0, 12).join('\n')
    const remainder = mismatches.length > 12 ? `\n其余 ${mismatches.length - 12} 个不匹配省略` : ''
    throw new Error(`--source-root 必须是固定提交 ${commit} 的逐文件归档；发现 ${mismatches.length} 个不匹配：\n${preview}${remainder}`)
  }
  return { status: 'verified', method: 'git-blob', fileCount: sourceFiles.length }
}

function readSourceText(file, sourceRoot) {
  if (!sourceRoot) return undefined
  return readFileSync(sourceFilePath(file, sourceRoot), 'utf8')
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
    structure: scannedStructureSummary(file, text),
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
      if (!nameMatch || (!samePackage && !sameDirectory)) return { candidate, score: -1 }
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

function pathList(paths, fallback) {
  return paths.length > 0
    ? paths.slice(0, 3).map(value => `\`${value}\``).join('、')
    : fallback
}

function readmeInstructionFor(file, pathSet) {
  const readme = packageReadme(file, pathSet)
  return readme
    ? `先读 \`${readme}\``
    : '固定提交没有找到近邻 README，直接阅读当前文件和它的真实消费者'
}

function readingOrderFor(file, role, relation, graph, pathSet) {
  const imports = (graph.importsByFile.get(file) ?? []).filter(candidate => candidate !== file)
  const importers = [...(graph.importersByTarget.get(file) ?? [])].sort().filter(candidate => candidate !== file)
  const tests = [...(relation.files ?? []), ...(relation.indirectFiles ?? [])]
  const testHint = pathList(tests, '同包中与它同名或覆盖相近场景的测试')
  const importerHint = pathList(importers, '所在包的入口或服务')
  const importHint = pathList(imports, '相关类型、协议或实现')
  const readmeHint = readmeInstructionFor(file, pathSet)
  const manualHint = MANUAL_FILES.has(file)
    ? '本文件另有人工精读，可继续看 [核心文件精读](../03-核心文件精读.md)；自动索引只提供定位线索，复杂行为需要回到源码和测试确认。'
    : '自动索引只提供定位线索，复杂行为需要回到源码和测试确认。'

  if (isTestCase(file)) {
    const productionImports = imports.filter(candidate => !isTestFile(candidate))
    const supportImports = imports.filter(candidate => isTestSupportFile(candidate))
    if (productionImports.length > 0) {
      return `先看它直接导入的被测实现 ${pathList(productionImports, importHint)}，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。${manualHint}`
    }
    if (supportImports.length > 0) {
      return `先看它直接使用的测试支持 ${pathList(supportImports, importHint)}，再读本文件的测试主题、输入和断言；最后回到被测表面和失败输出。${manualHint}`
    }
    return `先看源码中与它对应的被测实现或契约 ${importHint}，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。${manualHint}`
  }
  if (role === '测试夹具' || role === '测试支持' || role === '测试工具' || role === '测试服务器') {
    return `先看它提供的固定输入或环境，再跳到实际使用它的测试 ${testHint}，最后回看被测实现和清理路径。${manualHint}`
  }
  if (role === 'Windows ABI 探针') {
    return `${readmeHint}、Node/Koffi FFI 定义和实际头文件，再读当前探针，最后对照 ${testHint}，确认打印出来的布局和枚举值确实被交叉核对。${manualHint}`
  }
  if (/构建或测试配置|配置与数据形状|Profile 配置解析|文档网站构建配置|文档发布清单|.*构建器|.*发布构建器|.*门禁|.*验证器/.test(role)) {
    return `${readmeHint}，再读本配置/脚本，沿着 ${importerHint} 确认它如何影响入口和产物，最后对照对应 gate 或快照测试。${manualHint}`
  }
  if (/程序入口|HTML 页面壳|页面模板|启动入口|启动服务|Bundle 组合/.test(role)) {
    return `${readmeHint} 和组合清单，再读当前入口，沿着它交给的应用或 ${importerHint} 继续，最后对照启动、配置和 E2E 测试。${manualHint}`
  }
  if (/模块入口|类型契约|类型声明|数据规格|配置与数据形状|事件契约|协议边界|JSON Schema|JSON 边界|扩展槽位契约|品牌类型|消息模型/.test(role)) {
    return `${readmeHint}、入口和消费者，再读当前契约，沿着 ${importerHint} 看它怎样约束运行时，最后对照 ${testHint}。${manualHint}`
  }
  if (/持久化|会话|状态投影|状态存储|不变量|故障修复|查询|队列|状态管理器|领域模型/.test(role)) {
    return `先读相关类型和事件，再读当前状态或存储实现，沿着 ${importHint} 和 ${importerHint} 理解状态变化，最后对照 ${testHint}。${manualHint}`
  }
  if (/界面|React|Web 宿主|呈现|本地化|客户端/.test(role)) {
    return `先读客户端运行时契约或呈现模型，再读当前界面文件，沿着 ${importerHint} 确认状态如何进入 UI，最后对照 ${testHint}。${manualHint}`
  }
  if (/脚本|生成器|发布|清理|清单|翻译|Wine/.test(role) || file.startsWith('scripts/')) {
    return `${readmeHint} 和贡献/发布配置，再读当前脚本，沿它调用的配置、命令和 ${importHint} 确认输入输出，最后对照同目录的门禁或发布测试。${manualHint}`
  }
  if (file.startsWith('vendor/') || file.startsWith('native/')) {
    return `${readmeHint}、上游 Manifest 和平台说明，再读当前边界，沿 wrapper 和 ${importerHint} 确认平台影响，最后对照原生或兼容性测试。${manualHint}`
  }
  return `${readmeHint} 和入口，再读当前实现，沿着 ${importHint} 和 ${importerHint} 确认输入输出，最后对照 ${testHint}。${manualHint}`
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
  const sourceVerification = sourceRoot
    ? verifySourceRoot(sourceFiles, sourceRoot, commit, root)
    : { status: 'not-provided', method: 'git-blob', fileCount: 0 }
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
    // 大页按所属包插入二级标题：VitePress 右侧大纲因此获得分组导航，
    // 平铺几百个条目的页面不再只能靠浏览器搜索定位。
    const useGroups = files.length >= 40
    const groupOf = file => packageRootFor(file)
    const lines = [
      `# 源文件索引：${titleForBucket(bucket)}`,
      '',
      `本页由 \`study-tools/generate-source-index.mjs\` 根据官方提交 \`${commit}\` 生成，共 ${files.length} 个代码或界面源文件。每个标题对应一个真实路径；用途和拆分原因是面向初学者的结构化解释，自动索引不等于人工精读。`,
      '',
    ]
    if (useGroups) {
      const groupCounts = new Map()
      for (const file of files) {
        const key = groupOf(file)
        groupCounts.set(key, (groupCounts.get(key) ?? 0) + 1)
      }
      lines.push(`条目按所属包分组：${[...groupCounts.entries()].map(([key, count]) => `${key}（${count} 条）`).join('、')}。`, '')
    }
    let currentGroup
    for (const file of files) {
      if (useGroups) {
        const group = groupOf(file)
        if (group !== currentGroup) {
          currentGroup = group
          lines.push(`## ${group}`, '')
        }
      }
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
      if (meta.structure) details.push(meta.structure)
      if (meta.doc) details.push(`源码顶部原注释（英文，仅作回查线索）：${meta.doc}`)
      lines.push(`### ${markdownLink(file, commit)}`)
      lines.push('')
      lines.push(`- 所属层：${layerFor(file)}`)
      lines.push(`- 文件角色：${role.role}`)
      lines.push(`- 这个文件有什么用：${cleanChineseSpacing(purposeFor(file, role, meta))}`)
      lines.push(`- 为什么这样设计：${cleanChineseSpacing(designReason(file, role.role, meta, importGraph))}`)
      lines.push(`- 文件级设计证据：${cleanChineseSpacing(designEvidenceFor(file, meta, importGraph, sourceTexts.has(file)))}`)
      lines.push(`- 直接协作者：${links.length > 0 ? links.map(link => markdownLink(link, commit)).join('、') : '同目录没有可由路径确定的相邻源文件；先读当前文件的真实消费者和所在层入口。'}`)
      lines.push(`- 对应测试：${testFiles.length > 0 ? testFiles.map(test => markdownLink(test, commit)).join('、') : indirectTestFiles.length > 0 ? `间接测试线索（通过本地 import 链，非直接覆盖）：${indirectTestFiles.map(test => markdownLink(test, commit)).join('、')}` : isTestCase(file) ? '本文件本身就是测试用例。' : isTestSupportFile(file) ? '没有发现直接使用本支持文件的测试用例。' : '没有确认到直接测试；公共入口可能仍有间接覆盖。'}`)
      lines.push(`- 测试关联依据：${cleanChineseSpacing(relation.basis)}`)
      if (testSupport.length > 0) {
        lines.push(`- 测试支持：${testSupport.map(test => markdownLink(test, commit)).join('、')}`)
      }
      lines.push(`- 阅读顺序：${cleanChineseSpacing(readingOrderFor(file, role.role, relation, importGraph, pathSet))}`)
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
    sourceRootVerification: sourceVerification,
    staticImportEdgeCount,
    localPackageAliasCount: moduleAliases.packageAliases.size,
    localPythonModuleAliasCount: moduleAliases.pythonModules.size,
    files: sourceFiles,
  }
  writeFileSync(join(output, '..', 'source-index-manifest.json'), `${JSON.stringify(manifest, null, 2)}\n`, 'utf8')
  console.log(`已生成 ${sourceFiles.length} 个源文件条目，分成 ${buckets.size} 个索引页。读取源码 ${sourceTexts.size} 个文件，解析本地静态 import ${staticImportEdgeCount} 条。提交：${commit}`)
}

main()
