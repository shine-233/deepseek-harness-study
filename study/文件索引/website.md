# 源文件索引：website

本页由 `study-tools/generate-source-index.mjs` 根据官方提交 `47f943859bef60e4160492346772ded9b24f765a` 生成，共 2 个代码或界面源文件。每个标题对应一个真实路径；用途和拆分原因是面向初学者的结构化解释，自动索引不等于人工精读。

### [website/.vitepress/config.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/website/.vitepress/config.ts)

- 所属层：文档网站或网站构建代码
- 文件角色：文档网站构建配置
- 这个文件有什么用：它配置 VitePress，依据发布清单生成 sidebar、搜索、编辑链接、canonical 文档监听和网站样式。
- 为什么这样设计：把“文档网站构建配置”作为独立边界，可以让调用者只依赖这一项职责；它的实现变化不会迫使整个应用层一起重写。
- 直接协作者：[README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/README.md)、[scripts/project-doc-site.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/project-doc-site.ts)、[website/docs.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/website/docs.ts)
- 对应测试：没有确认到直接测试；公共入口可能仍有间接覆盖。
- 测试关联依据：固定提交中没有找到直接或传递的本地静态 import，也没有找到明显的同包同名测试；公共入口可能仍有间接覆盖。
- 阅读顺序：先看所在层的说明，再看包 README 和入口，然后读本文件，最后对照测试；本条是自动索引，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 342 行；扫描到的声明包括 `sidebar`、`guideSidebar`、`moduleNav`、`watchCanonicalDocs`、`escapeVueInterpolation`、`siteTitle`；文件顶部注释线索：VitePress configuration for the locally projected documentation site.。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [website/docs.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/website/docs.ts)

- 所属层：文档网站或网站构建代码
- 文件角色：文档发布清单
- 这个文件有什么用：它定义 locale、源 Markdown 到网站路由的映射、章节顺序、sidebar、outline 和翻译 fallback。
- 为什么这样设计：把“文档发布清单”作为独立边界，可以让调用者只依赖这一项职责；它的实现变化不会迫使整个应用层一起重写。
- 直接协作者：[README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/README.md)、[scripts/project-doc-site.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/project-doc-site.spec.ts)、[scripts/project-doc-site.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/project-doc-site.ts)、[website/.vitepress/config.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/website/.vitepress/config.ts)
- 对应测试：[scripts/project-doc-site.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/scripts/project-doc-site.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先看所在层的说明，再看包 README 和入口，然后读本文件，最后对照测试；本条是自动索引，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 524 行；扫描到的声明包括 `DocsLocale`、`DocsSidebar`、`DocsPage`、`DocsSection`、`sectionSpec`、`docsPages`、`orderedPages`、`routeLink`；文件顶部注释线索：Canonical publication manifest for the documentation website. Markdown stays in its owning repository tier. This manifest maps each canonical source into matching route trees for both site locales; when a translation is absent, both routes intentionally pro...。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。
