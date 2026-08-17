## 这次改了什么

<!-- 用一两句话说明教材、学习示例、Pages 或质量工作流的改动。 -->

## 证据与边界

- [ ] 我写明每项结论来自固定源码、源码测试、文档构建、GitHub Actions 或实际运行中的哪一种。
- [ ] 我没有把“已注册”“当前 agent 可解析”“模型实际呈现”“本次执行被允许”混成一个结论。
- [ ] 我没有把 Actions 绿色、静态审计、模板复用统计或 Agent 意见写成 DSH、模型或安全已经运行验证。
- [ ] 如果涉及社区项目，我写了固定 commit、实际入口、权限、卸载/回滚情况和仍未验证项。

## 已运行的确定性检查

<!-- 填实际运行的命令和结果；没有运行就写“未运行 + 原因”，不要勾选。 -->

- [ ] `pnpm --dir study-examples/minimal-observer-plugin run test`
- [ ] `pnpm --dir study-examples/minimal-observer-plugin run lint`
- [ ] `node --test study-tools/compare-tool-visibility-ab.test.mjs`
- [ ] `node study-tools/compare-tool-visibility-ab.mjs study-tools/tool-visibility-ab.a.example.json study-tools/tool-visibility-ab.b.example.json`
- [ ] `node study-tools/benchmark-tool-visibility-ab.mjs study-tools/tool-visibility-ab.a.example.json study-tools/tool-visibility-ab.b.example.json --iterations 1000 --warmup 100`
- [ ] `node study-tools/verify-study-links.mjs`
- [ ] `node study-tools/verify-source-index.mjs`
- [ ] `pnpm run doc-sync`
- [ ] 提交范围内的 `git diff --check`（CI 会按 Pull Request 或 push 的比较范围运行）
- [ ] 其他：

## 侵入性与审阅

- [ ] 本次没有读取私有 registry、重建 Loader、替换模块缓存、改系统设置或注入进程。
- [ ] 如果有上述行为，我已将项目明确标为 patch/fork/兼容层/注入器，并说明权限、版本、回滚和卸载。
- [ ] 我已按 [Agent 审阅说明](AGENT_REVIEW.md)自查；其结论仅是辅助意见，维护者仍负责最终判断。

## 仍未验证什么

<!-- 例如：真实 DSH Profile、真实 provider token/延迟、跨版本兼容、卸载清理、第三方安全审计。 -->
