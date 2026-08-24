# Agent Note：源码索引域词映射修正

Status: implemented

[English](2026-08-23-source-index-domain-word-mapping.md) | [中文](2026-08-23-source-index-domain-word-mapping.zh.md)

## Problem

逐文件索引由生成器从路径分段推导每张卡的领域词（`CONCEPT_WORDS`）。三个包名在通用映射下读出来的领域词是错的，三张索引页上所有生成卡片的定位句因此开篇就跑偏：

- `packages/web/` 的卡片写"Web 界面"——但 `tool-web/src/index.ts` 是模型侧的 `web_search`/`web_fetch` 工具。涉及 36 张卡。
- `packages/guard/` 的卡片写"权限保护"——但这个包管的是循环卫生和工具超时保护。涉及 6 张卡。
- `mcp-client` 路径被拆成 `mcp`+`client` 两个 token，连接卡写成"MCP 连接、浏览器端、连接的建立…"——MCP 客户端是 Node 侧的连接监督器。涉及 9 张卡。

手写的导航 README 对这三页的描述反而是对的（"Web 搜索、抓取和工具消费者"），证明漂移发生在生成器的描述符映射，不在包本身。

## Decision

`study-tools/generate-source-index.mjs` 在概念层修正这三处映射，而不是事后改页面：

- `SCOPED_CONCEPT_WORDS` 按路径前缀替换单个 token 的取值：`packages/web/` 把 `web` 映射为"Web 能力"；`packages/guard/` 把 `guard` 映射为"循环卫生"。前缀限定保住了 `apps/web`（真正的浏览器应用）继续读作 Web 界面。
- `PAIRED_CONCEPT_WORDS` 在单 token 查找前把相邻分段当一个概念读：`mcp-client`→"MCP 客户端"，同时挡住裸 `client` token 产出浏览器端。
- 配对前先折叠相邻重复分段（`packages/mcp/mcp-client` 产出 `mcp,mcp,client`）。重复值本来也只会入队一次概念，所以这一步不改任何其他页面的输出，只是让配对表能看到 `mcp-client`。

78 张已提交页面全部用指向固定上游源码树的 `--source-root` 重新生成，并经 `split-packages-client.mjs` 重新拆分。完整的生成→拆分往返与每个已提交页面字节一致，仅四个预期文件不同（索引 README 加三个修正页）。

## Alternatives considered

**只手改约 55 句卡片文案、不动生成器。** 否决作为主修手段：下一次重新生成会悄悄把错误词汇带回来。已提交页面也不是手改产物——它们就是重新生成的输出，文本与工具不会分叉。

**把包名分段整体排除出概念提取。** 否决：像 `repeat-tool-reminder` 这类没有其他领域 token 的 guard 卡会退回通用句式，损失的精确度比错误领域词更多。

**全局改掉 `'client'` 的浏览器端取值。** 否决：`packages/client/` 页面对浏览器投影正确使用这个词；全局改动等于拿 9 张错卡换几十张变含糊的卡。

## Consequences

web/guard/mcp 三页索引以准确的领域词开头（修正 51 句）；未来的重新生成在构造上保持正确。概念表现在有三层（全局 / 前缀限定 / 成对），一个包改名或换用途时需要补一条限定条目——映射的失效模式从"读者发现"变成了代码里显式可见。

## Testing

- `node study-tools/verify-source-index.mjs` — 2,973 条目，0 结构错误。
- `node study-tools/verify-study-links.mjs` — 41 个手写来源 0 路径错误。
- 同一变更集里的精灵模块调整后，`node study-tools/study-companion.test.mjs` 与 `pnpm run website:build` 保持绿色。
