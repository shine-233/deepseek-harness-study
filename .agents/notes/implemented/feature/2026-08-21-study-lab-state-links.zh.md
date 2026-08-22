# Agent Note: Study lab state lives in the URL hash

Status: implemented

[English](2026-08-21-study-lab-state-links.md) | 中文

## Problem

课程实验的输入只存在内存里：学习者设好场景、拖好步进滑杆，一刷新就归零，也没法把一个精确的实验状态交给别人。QA 缺口清单里「导出/导入与刷新持久化」一直未闭合。浏览器存储不是选项——课程承诺学习状态不进 localStorage；主题切换的存储是另一回事，是明确标注的本地便利。

## Decision

新增共享模块 [`website/public/study-lab-state.js`](../../../../website/public/study-lab-state.js)，拥有四个纯函数：

- `encodeState(value, schema)` 按 schema 的键序规范化字段再序列化，同一输入永远得到同一串字节。
- `decodeState(text, schema)` 返回 `{ ok, value }` 或 `{ ok: false, error }`，从不抛错；拒绝未知字段、缺失字段、类型错误、越界整数和枚举外的值。
- `readStateFromHash(hash, schema)` 在 hash 没有 `state=` 段时返回 null（首次打开是正常情况，不是错误），否则返回结构化结果。
- `writeStateToHash(hash, value, schema)` 只替换 `state=` 段，保留无关的锚点段。

[`turn-flow-lab.js`](../../../../website/public/turn-flow-lab.js) 接线：每次重建成功后用 `history.replaceState` 把 `{ scenario, upTo }` 写进 hash；启动时先从合法 hash 恢复控件再首次渲染；hash 缺失或损坏时静默回退默认值；「复制状态链接」按钮复制完整 URL。`replaceState` 失败（file://、沙箱环境）被吞掉——状态链接是增强，不是前提。`upTo` 的上界在应用时对照当前场景步数校验；schema 只固定整数下界。

[`study-tools/study-lab-state.test.mjs`](../../../../study-tools/study-lab-state.test.mjs) 的十个确定性测试覆盖往返、键序字节稳定性、schema 违约、损坏载荷、锚点保留和页面接线。

其余六个模型实验全部接入了同一契约。Session-log 与 turn-flow 同形（枚举场景 + 有界滑杆）。Tool-visibility 持久化勾选的 Bundle 加两个枚举；schema 新增 `stringList` 规则，条目必须来自模型认识的清单。Package-graph 的 group 枚举在启动时从 fixture 动态生成，恢复时对照当前选项校验，fixture 变化后旧链接安全回退到全貌。Profile-loader 持久化可重排的 Bundle 序列、overlay 枚举和坏引用开关；模块新增 `boolean` 规则，页面还要求恢复的 order 是默认清单的排列才接受。Code-mode 持久化 32 位 seed、三选一教学策略和并行上限；帧位置不进状态——时间轴位置是播放，不是输入。研究-Debug 桥刻意不接入：它的输入是用户手选的证据文件，链接带不动。

## Alternatives considered

- **localStorage / IndexedDB。** 否决：课程的隐私立场是学习状态不进浏览器存储，而且存起来的状态没法靠贴链接分享。
- **只用剪贴板导出/导入按钮。** 否决：剪贴板往返在页面跳转后即失效，还要权限弹窗；URL 本身就是持久、可分享的载体。
- **现在就接全部实验。** 推迟：每个实验有自己的输入契约，值得各自做 schema 决定；一个接好的旗舰实验加一套经过测试的原语，好过六个赶工的接线。

## Consequences

刷新、加书签、发链接都能复现同一个 turn-flow 实验状态，不需要存储、网络或账号。hash 对用户可见，这本身就是对「什么被持久化了」的诚实标注。代价：URL 会带上编码状态（链接变长）；接入模块的实验必须先定义 schema 才能持久化——没有绕过校验的通用后门。
