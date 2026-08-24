# DeepSeek Harness 研究项目交接总册

更新时间：2026-08-22
交接状态：工作树干净，全部改动已提交并推送；两条 CI 工作流绿色。
权威范围：本文件负责解释当前仓库状态、验证入口和下一步；历史研究取证（参考站浏览器记录、外部项目矩阵、许可证边界、去 AI 味来源）已归档到 [research-notes/](research-notes/)，结论本身已毕业到 study 课程页。

## 0. 新接手者先读什么

1. 本文件。
2. 根目录 [AGENTS.md](AGENTS.md) 和 [docs/AGENTS.md](docs/AGENTS.md)。
3. 学习入口：[START-HERE.md](START-HERE.md) 和 [SITE-HOME.md](SITE-HOME.md)。
4. 项目内 skill：[.agents/skills/dsh-source-grounded-course/SKILL.md](.agents/skills/dsh-source-grounded-course/SKILL.md)（改课程/实验前必读）。
5. 历史研究账本：[research-notes/](research-notes/)（只在需要复核旧结论来源时读）。

## 1. 当前基线

- 分支：`work`，推送目标 `origin/master`，两者始终同步。
- 教材固定上游提交：`aa6c361a972c8369148dea7380bb5c21c24e07ec`（`release(dsh): 0.1.1-rc.2`，2026-08-21）。换基线流程见 study/18。
- 规模：120 个中文学习页面、2,973 个源文件索引（78 页，含 1 页 packages/client 总览与 11 页分页）、24 个离线实验、190 个学习工具测试 + 8 个示例测试。

## 2. 仓库分工

- 研究课程仓库（本仓库）：课程、实验、证据门禁、Pages 网站。
- Debug 仓库：`C:\Users\Zz\Documents\projects\dsh-open-source`（`shine-233/dsh-plugin-debug`），独立 PowerShell 调试插件；与本网站只通过用户手动选择的 request/result JSON 文件协作，见 study/36-研究与-Debug-协作.md。

## 3. 已验证状态（最近一轮全绿）

- `pnpm test`：scripts 全过；packages 仅 sandbox-windows-acl 的平台探针在本机失败（需要真实 Windows ACL 环境；CI 在 ubuntu 上不执行它们）。
- `pnpm lint` / `pnpm run typecheck` / `pnpm run doc-sync`（28 门禁）：全过。
- `node --test study-tools/*.test.mjs`：190 通过。
- verify-study-links / entry / learning-contract / home-metrics / source-index / audit：全过，路径错误 0。
- translation pairing：958 对一致。
- GitHub Actions：Study material quality 与 Deploy documentation 双绿；线上 https://shine-233.github.io/deepseek-harness-study/ 返回 200。

## 4. 今天落地的八类改动（2026-08-21/22）

1. workflow spec 重写为锁定 fork 自己的两条 workflow（修掉连续红 CI 的根因）。
2. 上游基线从 rc.5 重固定到 0.1.1-rc.2：索引重生成（2,973/67）、包图重生成（227 包/50 组/1124 边）、201 处链接与全部派生数字更新。
3. 首页文案结构性去 AI 味：五个重复网格合并为三个区块，口号退役，保证各说一次；START-HERE/README 同步手术。
4. README 整页重写：徽章、三条入口、八个实验表、四阶段课程地图、当前数字。
5. 实验状态链接：study-lab-state 模块 + turn-flow 接线 + 10 个测试。
6. compaction-lab（上下文压缩实验）：模型/页面/样式/155 行测试 + 第 05 课集成。
7. CI 潜伏问题三连修：pnpm `--` 分隔符、按 SHA 拉取固定提交、upload-artifact 隐藏文件。
8. 文案证据措辞精炼（topic 计数溯源、索引计数同步）。

## 5. 剩余缺口

- ~~状态链接目前只有 turn-flow 接入~~ 已闭合：全部实验室经 `study-lab-state.js` 写 URL hash；Playwright 实测 compaction/hook/approval/session-log 四个实验室刷新后输入回填。
- ~~浏览器级 QA 矩阵未闭合~~ 已闭合（自动化走查，2026-08-24）：375px 移动端首页/课程/实验室/索引横向溢出 0px（修掉首页 `.dj-page` 负边距导致的 16px 溢出，`reading.css` 给 `.VPPage` 加 `overflow-x: clip`）；键盘 focus-visible 规则与 tablist ARIA 在位；`prefers-reduced-motion` 下首页与课程页伴侣动画停用（实测 `animation: none`）；package-graph 3D 画布带 2D 表格回退。标题锚点等 VitePress 原生小触控目标按上游原样保留。
- rc.5 → 0.1.1-rc.2 只验证了引用路径存在性，未逐行复审语义差异。
- ~~reading.css 死规则可清理~~ 已清理：36 个死类族（dsh-home-contract/dsh-proof-strip/dsh-learning-map/dsh-route-*/dsh-status-*/dsh-stuck-* 等）连同随附注释移除，1593 行 → 966 行；重建后首页 0.05%（吉祥物眨眼帧差）、课程页 0.00% 像素差，28 个 doc-sync 门禁与 407 个 study-tools 测试全绿。

## 6. 安全红线

- 先运行 `git status --short --branch`；不用 `reset --hard`/`checkout --`/`clean`。
- 不删除 untracked 研究材料、Agent Notes 或 handoff。
- 不把 dirty worktree 当成已发布；本地构建成功不等于 Pages live。
- 页面教学模型不是生产 trace；静态测试通过不是运行时证明。
- 改 bridge 保持 explicit-file-only、offline、privacy fail-closed。
- 许可证不明或 GPLv3 代码不得进入本 MIT 仓库。
- 非平凡改动必须在同一 PR 带 Agent Note（双语 + sidecar）。
