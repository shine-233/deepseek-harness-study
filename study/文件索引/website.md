# 源文件索引：website

本页由 `study-tools/generate-source-index.mjs` 根据官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec` 生成，共 2 个代码或界面源文件。每个标题对应一个真实路径；用途和拆分原因是面向初学者的结构化解释，自动索引不等于人工精读。

## 图例

本页所有条目共用以下说明：

- 自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 条目中的行数、声明、结构线索和静态 import 数字是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们用于定位，不替代人工源码阅读。
- 源码链接固定到官方提交；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [website/.vitepress/config.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/website/.vitepress/config.ts)

- 所属层：文档网站或网站构建代码
- 文件角色：文档网站构建配置
- 这个文件有什么用：它配置 VitePress，依据发布清单生成 sidebar、搜索、编辑链接、canonical 文档监听和网站样式。
- 为什么这样设计：网站导航、搜索和编辑链接应由发布清单驱动，而不是在 VitePress 配置里重复维护路径；集中构建配置能让文档源树变化时尽早暴露缺页或错链。
- 文件级设计证据：源码顶部注释把它定位为“VitePress configuration for the locally projected documentation site.”；固定提交中扫描到的声明包括 `sidebar`、`guideSidebar`、`moduleNav`、`watchCanonicalDocs`、`serveRawMarkdown`；本地静态 import 图显示它直接依赖 2 个源文件，并被 0 个源文件直接引用。
- 直接协作者：[README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/README.md)、[scripts/project-doc-site.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/scripts/project-doc-site.ts)、[website/docs.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/website/docs.ts)
- 对应测试：没有确认到直接测试；公共入口可能仍有间接覆盖。
- 测试关联依据：固定提交中没有找到直接或传递的本地静态 import，也没有找到明显的同包同名测试；公共入口可能仍有间接覆盖。
- 阅读顺序：先读 `README.md`，再读本配置/脚本，沿着所在包的入口或服务确认它如何影响入口和产物，最后对照对应 gate 或快照测试。
- 代码证据：固定提交归档实际读取结果：约 414 行；扫描到的声明包括 `sidebar`、`guideSidebar`、`moduleNav`、`watchCanonicalDocs`、`serveRawMarkdown`、`escapeVueInterpolation`、`siteTitle`；源码顶部原注释（英文，仅作回查线索）：VitePress configuration for the locally projected documentation site.。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。

### [website/docs.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/website/docs.ts)

- 所属层：文档网站或网站构建代码
- 文件角色：文档发布清单
- 这个文件有什么用：它定义 locale、源 Markdown 到网站路由的映射、章节顺序、sidebar、outline 和翻译 fallback。
- 为什么这样设计：canonical Markdown、语言版本、章节顺序和网站路由是一次发布映射；把它们集中成清单，便于生成 sidebar 和 fallback，也避免英文与中文页面各自漂移。
- 文件级设计证据：源码顶部注释把它定位为“Canonical publication manifest for the documentation website. Markdown stays in its owning repository tier. This manifest maps each canonical source into matching route trees for both site locales; when a translation is absent, both routes intentionally pro...”；固定提交中扫描到的声明包括 `DocsLocale`、`DocsSidebar`、`DocsPage`、`localeCollections`、`DocsSection`；本地静态 import 图显示它直接依赖 0 个源文件，并被 3 个源文件直接引用。
- 直接协作者：[README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/README.md)、[scripts/project-doc-site.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/scripts/project-doc-site.spec.ts)、[scripts/project-doc-site.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/scripts/project-doc-site.ts)、[website/.vitepress/config.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/website/.vitepress/config.ts)
- 对应测试：[scripts/project-doc-site.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/scripts/project-doc-site.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先读 `README.md`，再读本配置/脚本，沿着 `scripts/project-doc-site.spec.ts`、`scripts/project-doc-site.ts`、`website/.vitepress/config.ts` 确认它如何影响入口和产物，最后对照对应 gate 或快照测试。
- 代码证据：固定提交归档实际读取结果：约 535 行；扫描到的声明包括 `DocsLocale`、`DocsSidebar`、`DocsPage`、`localeCollections`、`DocsSection`、`sectionSpec`、`docsPages`、`orderedPages`；源码顶部原注释（英文，仅作回查线索）：Canonical publication manifest for the documentation website. Markdown stays in its owning repository tier. This manifest maps each canonical source into matching route trees for both site locales; when a translation is absent, both routes intentionally pro...。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`。
