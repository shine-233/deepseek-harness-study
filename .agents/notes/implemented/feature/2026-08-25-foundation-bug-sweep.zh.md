# Agent Note：通读共享地基后抓到的三个潜伏 bug

Status: implemented

[English](2026-08-25-foundation-bug-sweep.md) | 中文

## Problem

被追问「是不是真的通读了源码」之后，把每个页面都依赖的共享运行时逐行读了一遍（study-lab-kit.js、study-lab-state.js、study-progress-core.js、study-companion.js），并做了文件系统与各清单的交叉核对。发现三个真实缺陷，其中两个对所有现有门禁不可见——它们是死代码或静默空转，不是报错。

## Decision

**Metric 补间观察器从未触发过。** 观察器读 `mutation.oldValue`，但 textContent 赋值产生的是 childList 记录，其 oldValue 恒为 null——所以自该功能上线起，所有实验室页的数字滚动与数值变化闪光两个分支都不可能命中。修复方式：以观察的 dd 为键，用 WeakMap 自己记账旧值（记录经 `closest('.metric-grid dd')` 映射回去）。已在无头浏览器实测：变化的指标格现在会闪光，数值格会滚动。

**animateNumber 的补间链互相打架。** 上一条补间没走完就来了新目标时，会再起一条 rAF 链和旧链抢同一个元素的文本。现在每元素待处理的帧句柄放在 WeakMap 里，新链启动前先取消旧链。

**进度名单漂移，完成记录被静默丢弃。** study-progress-core.js 里的 `LAB_PAGE_IDS` 是第二份手工维护清单，比文件系统落后 12 页；其中八页（credential、settings、plan-stack、subprocess 加四个新基础设施实验）还被总览页算作可记录对象——读者在这些实验室提交预测门控时进度被无声丢弃，任何地方都不报错。十二页全部登记，并新增 `lab-progress-pages.test.mjs` 把名单钉在 `public/*-lab.html` 上：下次新增实验室页忘了登记会在这里红，而不是静默丢数据。

## Alternatives considered

**从 study-labs.js 的 TRACKED_LAB_IDS 派生 LAB_PAGE_IDS。** 否决：progress-core 必须保持无 DOM 导入，反向引入会造成循环；改为让测试把两份名单都钉在唯一不会漂移的事实来源——目录列表——上。

**把 query/sandbox/typert/workspace 当作「有意不追踪」继续留着。** 没有任何成文依据（唯一有据可查的例外是 research-debug-bridge），而且它们的门控本来就在调 rememberLab；「凡匹配 *-lab.html 一律登记」是唯一能在下次重命名后活下来的规则。

## Consequences

Metric 反馈在全站实验室页首次真正生效；重复运行不再堆叠动画链；在任何已登记实验室提交预测门控都会记入进度。全量验证：819 条 study-tools 测试、28 项 doc-sync 门禁、构建产物无头复测。
