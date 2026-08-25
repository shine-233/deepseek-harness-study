# Agent Note：基础设施接缝实验室——上游最后约八个未覆盖的包组

Status: implemented

[English](2026-08-25-infra-seam-labs.md) | 中文

## Problem

对固定上游提交（aa6c361a）做覆盖盘点后，大约还有八个包组没有实验：code-runtime 的运行结局分类学、Web GUI 宿主半区（webserver 路由载体、frontend-static 回退座位、directory-picker 接缝）、runtime-diagnostics 的不变量注册台，以及存储枢纽的后端契约——再加上被判成「需要真实 React DOM 才有意义」的 client 渲染内部。这个判断经不起推敲：这些包各自拥有一份确定性契约（固定输入、固定迁移、稳定的错误词汇），教的恰恰是浏览器装不出来的东西。

## Decision

按既定四件套形状新增四个实验室（`*-model.js`、`*-lab.html/js/css`）加 Node 测试、预测门控、共用播放引擎的步进器、hash 状态持久、oracle 卡与证据边界：

- `code-run`：`run()` 永远 resolve `{ value?, logs, error? }`——失败是字段不是拒绝；六种失败类（exception / timeout / abort / worker-exit / invalid-output / output-limit）彼此正交且与剧本一一对应；binding 命名空间过三道检查（语言中立标识符、非保留字、不占 `console`/`__dsh_main__` 这类后端自有槽位），非法命名空间让时间线停在第 0 步。
- `host-gateway`：每个请求都走唯一的 `ctx.webServer` 载体；已注册路由命中即短路扫描，回退座位只在全部未命中后应答；选择器接缝在消费方契约不变的前提下替换 native/browse/auto 后端。
- `invariant`：注册先保留包名，过滤只决定是否安装检查；`fail()` 抛出带注册包归属的 `InvariantError`；失败销毁子 fiber 并释放保留位；重复注册直接拒绝。
- `storage-hub`：kv 切面缺位在任何 open 之前的解析点大声失败；单元名必须满足 `UNIT_NAME_RE`（同时当文件名和 SQL 标识符）；版本戳不符按 `version-mismatch` 拒开、介质不可解析按 `malformed-medium` 拒开；写入 resolve 即持久、删缺失键幂等、close 之后一切调用报 `closed`。

登记面：`study-labs.html` 四张新卡（计数 44 → 48）、`TRACKED_LAB_IDS` 加 id、播放接线门禁登记四个步进前缀、jsdom 冒烟覆盖全部 120 档输入组合、05/07/19/33 四课正文各补一句实验入口，`RELATED` 扩到每个在册实验都有概念邻居（47 个键）。

浏览器走查还带出两个 CSP 修复：`study-lab-kit.js` 里返回顶部按钮的哨兵用了 `style.cssText`（被 `style-src 'self'` 拦截；改成逐属性 CSSOM 赋值），`web-tool-lab.html` 带着两处内联 `style="margin-top:14px"` 属性（换成 `.wt-gap` 类）。两者此前只在加载时序竞态下冒错误日志，现在从结构上消除。

## Alternatives considered

**以「需要真实 React DOM 或进程」为由继续不建。** 否决：上述契约都是纯迁移规则；`cannotProve` 明确列出哪些仍需真实 worker、HTTP 监听或文件系统。ui-renderer/slot 层维持不做实验，但现在是写明的边界而不是遗漏。

**给所有基础设施包做一个大实验。** 否决：每条接缝有自己的词汇和 oracle；合并只会产出切换标签页式的表演，丢掉逐接缝的确定性校验。

**扩展现有 orchestration/client 模型而不是新建页面。** 否决：那两个文件是其他课的活跃工作面；独立页面保住可回滚性，也让总览网格如实反映覆盖。

## Consequences

固定上游树里的每个产品包组现在要么有专属实验，要么有一条写明理由的边界。已构建站点实测：38 个课程页与 56 个实验室页在 1280px 无头走查、61 次 375px 移动端走查，控制台零错误、横向溢出零像素；四个新实验的门控解锁、select 全组合、步进器两端按钮状态、播放开关和 hash 回填均有断言；模型测试（26 条）、步进冒烟（18 条）、播放接线、对比度（78 组）与 28 项 `doc-sync` 全绿。
