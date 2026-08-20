# 研究与 Debug 协作：一份 request，另一份 result

这一章把两个可以独立使用的东西放在一条可选的学习路径上：研究网站负责解释上下文、提出问题和告诉你“需要什么证据”；`dsh-plugin-debug` 负责检查一份已经脱敏、由你明确指定的本地 evidence artifact。它们不是一个默认互相连接的程序。

如果你只想体验表单，直接打开[静态桥接工作台](/research-debug-bridge.html)。它不需要 API key，不需要启动 DSH，不需要下载 Debug 工具，也不会访问本机。若你想实际检查一份 repro，再下载[Debug 工具源码](https://github.com/shine-233/dsh-plugin-debug)，按下面的命令运行。

## 先记住边界

这条协作链只通过两个文件交接：

```text
课程网站                         Debug 工具
   │                                │
   ├─ diagnostic-request.json ─────►│ 只读用户显式指定的 request
   │                                │ 只读用户显式指定的脱敏 repro.json
   │◄─ diagnostic-result.json ──────┤ 返回 coverage / privacy / integrity
```

因此有四条必须同时成立的事实：

- 网站单独打开时仍然能生成 request、下载 JSON、查看示例 result；
- Debug 工具单独下载时仍然能在没有 evidence 的情况下返回 `UNAVAILABLE`，不扫描系统来“帮你找”；
- 只有用户把文件路径明确交给 Debug，才会发生一次本地文件读取；
- result 只陈述脱敏 artifact 声明出的证据覆盖，不能把课程里的教学推断改写成真实 DSH 运行时事实。

这里没有默认 loopback、HTTP、WebSocket、Cookie、localStorage、浏览器凭据、共享数据库、常驻 watcher 或自动启动 PowerShell。需要实时 RPC 时，必须另写一份拥有独立权限和生命周期合同的设计，不能把它从这个文件协议“推断出来”。

## 第一步：在网站生成 request

打开[静态桥接工作台](/research-debug-bridge.html)，填写课程定位、问题标题和所需 source kind，然后点击“生成 request”。页面会把规范化后的 v1 JSON 显示在预览区；点击“下载 JSON”才会创建下载文件。下次打开页面时，可以手动选择之前下载的 request JSON，页面会先做 v1 schema 校验，再恢复表单、预设边界和预览；页面不使用浏览器存储，也不会恢复 schema 之外的字段。request 预览下方还会显示两步 PowerShell 命令模板，帮助你把路径替换成自己审阅过的输入、repro 和 result 路径；页面不会自动执行模板。

request 的最小形状如下：

```json
{
  "schemaVersion": 1,
  "kind": "dsh-research-diagnostic-request",
  "requestId": "course-context-001",
  "course": {
    "siteId": "dsh-study",
    "courseId": "deepseek-harness",
    "lessonId": "debug-bridge-v1",
    "questionId": "evidence-coverage"
  },
  "question": {
    "title": "检查上下文诊断证据是否完整",
    "requiredSourceKinds": ["diagnostics", "trace"],
    "requestedChecks": ["coverage", "privacy"]
  },
  "safety": {
    "inputMode": "explicit-file-only",
    "networkAccessed": false,
    "commandsExecuted": false,
    "targetMutated": false,
    "uploads": false
  }
}
```

`requiredSourceKinds` 目前允许 `incident`、`trace`、`pointer`、`diagnostics`、`receipt`、`unknown`。它表示研究问题要求看到哪些类别，不表示网站已经拥有这些证据。

## 第二步：准备显式脱敏 evidence

Debug 的 `repro-export` 会从用户明确指定的诊断、incident、pointer 或 trace 片段中生成 bounded、metadata-only 的 `repro.json`。这一步仍然需要你自己选择输入；不要把未脱敏 Session、`.env`、凭据、原始 Tool result 或完整工作区交给工具。

示意命令（路径请换成你自己审阅过的文件）：

```powershell
Set-Location C:\path\to\dsh-plugin-debug

.\Debug-DSH.ps1 `
  -Action repro-export `
  -InputPath .\approved\diagnostics.json `
  -InputPath .\approved\trace.json `
  -ReproPath .\repro-export
```

桥接接受的 artifact 必须是 `kind=dsh-debug-repro`、`schemaVersion=1`，并声明：

```text
rawPayloadStored       = false
toolArgumentsStored    = false
toolResultBodiesStored = false
sessionContentStored   = false
workspaceContentStored = false
envContentsStored      = false
credentialsStored      = false
absolutePathsStored    = false
networkAccessed        = false
```

这些字段是安全合同，不是让工具相信一段任意文本的魔法。桥接只读取字段和允许的 source metadata；它不会读取被忽略字段，也不会为缺失字段自动扫描别处。如果 `repro-export` 输出目录旁有 `manifest.json`，桥接会核对 `repro.json` 的 SHA-256；没有 manifest 时会显示 `integrity=absent` warning，而不是声称哈希已验证。

## 第三步：显式运行 Debug bridge

把 request 和 repro 放在你能审阅的位置，然后运行：

```powershell
Set-Location C:\path\to\dsh-plugin-debug

.\Debug-DSH.ps1 `
  -Action research-bridge `
  -ResearchRequestPath C:\path\to\diagnostic-request.json `
  -ResearchEvidencePath C:\path\to\repro-export\repro.json `
  -ResearchResultPath C:\path\to\diagnostic-result.json
```

省略 `-ResearchResultPath` 时，result 只输出到 stdout。已有输出文件不会被覆盖，必须显式 `-Force`；即使使用 `-Force`，桥接也拒绝把 result 写到 request 或 evidence 的同一路径。

Debug 公共入口和完整调度入口都支持同一个动作：

```powershell
.\Debug-DSH.ps1       -Action research-bridge -ResearchRequestPath .\diagnostic-request.json
.\DSH-Provenance.ps1  -Action research-bridge -ResearchRequestPath .\diagnostic-request.json
```

普通的 `incident-capture`、`repro-export`、`diagnostics` 等动作不会自动触发 bridge。Debug 工具也不会因为网站曾经打开过就连接网站。

## 第四步：回到网站导入 result

在静态工作台选择 `diagnostic-result.json`。页面先验证 v1 schema，再只显示这些字段：状态、逐项 checks、source kind、缺失 kind、manifest integrity、findings、privacy 和 next action。导入文本通过 `textContent` 写入 DOM，不当作 HTML 模板执行；不符合 schema 的文件会被拒绝。request 和 result 都是用户手动选择的一次性文件输入，不会因为导入而自动连接 Debug 或上传到网站。

状态不是“好/坏”的装饰，它决定下一步：

| 状态 | 说明 | 接下来做什么 |
| --- | --- | --- |
| `COMPLETE` | repro 合法，所有要求的 kind 都在显式 repro 中，且每项 requested check 都是 `PASS` | 回到课程继续解释；仍要看 trust 边界 |
| `PARTIAL` | repro 合法，但缺少 kind，或某项 requested check 是 `PARTIAL`/`WARN`/`UNAVAILABLE` | 补齐缺失证据、manifest，或把问题缩小 |
| `UNAVAILABLE` | request 合法，但用户没有提供 evidence | 明确运行 `repro-export`，不要猜测 |
| `FAIL` | request、repro、privacy、manifest 或路径违反合同 | 修复输入/文件边界后重试 |

`COMPLETE` 也不是“故障已修复”。result 中的：

```text
evidence.trust = declared-metadata-only
```

意思是“这个结果只对显式 artifact 的声明和覆盖范围负责”。它不证明原始 Session 存在，不证明某个模型真的产生过课程中描述的 trace，不证明 Debug 已经修改或修复目标，更不证明生产 DSH Web 已被验证。

当前 `requestedChecks` 只有三项：`coverage` 检查 source kind 覆盖，`privacy` 检查 repro 的 metadata-only 声明，`integrity` 检查同目录 manifest 的哈希。未知或重复 check 会 fail-closed。旧 result 没有 `checks` 时仍可导入，但工作台会明确标成 legacy，不把旧的总状态解释成每项检查都通过。

课程工作台提供 8 个研究节点预设：Session 恢复、工具失败、Guard 权限、Context Compaction、Scheduler 并发、子 Agent 交接、插件溯源和桥接自身。预设只生成问题和 `canProve/cannotProve` 边界，不预先声称证据存在。

## 练习：把一个过大的问题改成可审计问题

先不要问“为什么 DSH 变慢了”。把问题改成：

> 这份已经脱敏的 repro 是否同时包含 `diagnostics` 和 `trace`？如果没有，缺哪一类？manifest 是否核对成功？

然后完成四个动作：

1. 在网站生成一个只要求 `diagnostics` 和 `trace` 的 request；
2. 用只含 `diagnostics` 的 repro 导入，观察 `PARTIAL` 和 `missingKinds`；
3. 用没有 repro 的运行观察 `UNAVAILABLE`；
4. 修改 manifest 哈希再导入，确认结果变成 `FAIL`，而不是被降级成“可能没事”。

完成后你应能区分三件容易混淆的事：课程问题的范围、artifact 的声明覆盖、真实运行时事实。只有最后一项需要真实 Host/Session/运行时证据；这条离线 bridge 刻意不代替它。

## 验证与当前缺口

网站协议的纯 Node 回归不需要联网：

```powershell
Set-Location C:\path\to\deepseek-harness-study
pnpm run study-bridge:test
node --check website/public/research-debug-bridge.js
```

Debug 侧的 PowerShell 回归会在临时目录中覆盖四种状态、privacy、manifest 哈希、输入不变、路径碰撞和公共入口路由：

```powershell
Set-Location C:\path\to\dsh-open-source
pwsh -NoLogo -NoProfile -ExecutionPolicy Bypass `
  -File .\packages\dsh-plugin-debug\tools\Test-DSHResearchBridge.ps1
```

两边的 canonical fixture 还可以做开发期契约回放：

```powershell
pnpm run study-bridge:contract-replay -- --debug-root C:\path\to\dsh-open-source\packages\dsh-plugin-debug
```

该回放会逐字节比较两仓库的 fixture，让 Debug 实际读取课程仓库的 request/repro，再由课程 JS 校验 Debug result。它仍然是离线协议证据，不是生产 Host 或真实 Session 证据。

这些检查证明的是协议和边界。它们没有证明 GitHub Pages 已部署、真实浏览器已完成全流程、真实 DSH Web 已返回业务 Session，或某个社区 Skill 的实现质量。要做后续研究，仍应回到[完成度审计与证据矩阵](17-完成度审计与证据矩阵.md)，把静态、fixture、真实 Host 和真实业务 Session 分层记录。
