---
name: 社区插件审计
about: 提交一个社区 DSH 插件、Bundle、Hook bridge 或注入器供教材拆解
title: "[社区审计] "
labels: "community"
assignees: ""
---

## 项目身份

- 项目链接：
- 固定 commit 或 release：
- 发布包名：
- 项目是否声称官方维护：是 / 否 / 不明确

## 接入方式

- [ ] 公开 Service / Event / Tool API
- [ ] Bundle / Profile / `cordis.patch.yml`
- [ ] Hook bridge / 协议兼容层
- [ ] 源码 patch / patched fork
- [ ] 私有 registry、模块缓存或构建产物改写
- [ ] 进程注入、系统配置或 Windows 注册表
- [ ] 尚不清楚

## 需要核对的证据

请提供 README、manifest、安装脚本、权限、依赖、版本范围、测试、卸载和失败恢复位置。项目自述、静态检查和实际运行结果必须分开写。

## 安全与隐私

不要在 issue 中粘贴 API key、token、个人目录中的密钥、私有仓库内容或未经授权的系统信息。未经隔离和授权，不要为了审计运行未知安装脚本或注入器。
