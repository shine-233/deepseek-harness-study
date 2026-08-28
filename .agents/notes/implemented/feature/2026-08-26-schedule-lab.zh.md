# Agent Note：Schedule 实验室

状态：已实现

[English](2026-08-26-schedule-lab.md) | 中文

## 问题

补上 HANDOFF 剩余缺口审计里的 schedule/time 路线（优先级紧随 goal）：第 37 课只用一段话讲 schedule，并明确把真实的定时触发时序推迟到运行证据。读者此前没有离线办法看到 `schedule/change` 事件怎样 fold 成持久提醒、固定频率提醒睡过几个间隔为什么不重放积压队列、fork 的 seed 边界对继承意味着什么。

## 决策

固定教学时钟（2026-08-26T00:00Z——确定性，绝不读墙钟）上的逐帧模拟器。三个场景对齐上游 domain.ts（aa6c361a）：一次性 dispatch 后除名；固定频率 dispatch 必带 `acceptedAt`，只应答锚点对齐的最新一拍并把下一拍写回（错过的拍直接跳过，绝不逐枚举）；fork 在 seedLength 处切日志，子会话什么都不继承，且合法地复用父会话的 id 空间。独立校验只对帧按所有权段重放 create/dispatch（段内 id 唯一、every 下限 300 秒、dispatch 只指向活动提醒、一次性至多触发一次、补发锚点对齐、fork 零继承）。端到端沿用现行房子模式：零跳步概念阶梯、预测门、共享播放引擎的步进时间线（`sch-` 前缀已登记 STEPPER_LABS 与 LAB_PAGE_IDS）、证据边界卡、`#state=` 持久化、viewport-fit=cover。第 37 课在 Schedule 一节链接本实验；README/START-HERE 实验计数 58 → 59。

## 落选方案

- 建模 `at` 形态并做真实时区解析——否决：Intl 日历算学会吃掉全部帧预算，却讲不出一次性除名之外的新规则。
- 让读者自由编辑事件——与 goal-loop 同一理由否决：实验室会变成调试器，并招来远离教学点的畸形输入。
- 用假定时器驱动真实调度器——否决：需要运行中的 harness 会话，破坏所有实验室共享的离线确定性契约。

## 后果

study-tools 新增 schedule-lab.test.mjs（5 条测试）。README.md、README.zh.md 与 START-HERE.md 的实验计数散文被门禁钉在 59；下一个实验室落地时这五处要再动一次。
