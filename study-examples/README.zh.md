# 学习示例

[English](README.md) | 中文

这个目录保存刻意保持很小的非官方学习材料。它和 `examples/` 不同：后者保存 DSH 已交付组合及其面向产品的测试；这里的每个包一次只讲一个扩展决策，并在代码旁写清证据边界。

## 现有示例

| 示例 | 学习内容 | 确定性检查 | 不能证明什么 |
| --- | --- | --- | --- |
| [最小观察插件](minimal-observer-plugin/README.zh.md) | 一个第三方 Bundle 通过公开 `tools/result` 事件观察结果，但不改写结果 | `demo`、Node 单元测试和本地 lint | Loader 安装、真实 DSH 运行时、provider token、延迟或模型质量 |

## 怎样使用一个示例

1. 先读它的 README，再读源文件。
2. 先运行它写明的 demo，再运行测试和 lint 命令。
3. 做一个小修改，同步修改对应测试，再运行检查。
4. 同时记录已经支持的结论和仍缺少的运行时证据。

<div class="dsh-next-actions" aria-label="学习示例下一步">
  <a class="dsh-action-link dsh-action-link-primary" href="minimal-observer"><strong>先读最小观察插件</strong><small>只讲一个公开事件和一条证据边界</small></a>
  <a class="dsh-action-link" href="../lessons/28-最小插件示例与学习检查"><strong>按课程做一次修改</strong><small>先 test/lint，再写已证明与未证明</small></a>
</div>

当示例成长为真实包时，把可复用代码迁到归属明确的 `packages/` workspace，补 Loader 组合测试，声明版本／权限／清理行为；只有在这类行为被纳入范围时，才补真实 provider 或 UI 测试。
