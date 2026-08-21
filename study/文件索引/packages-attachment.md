# 源文件索引：packages/attachment

本页由 `study-tools/generate-source-index.mjs` 根据官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec` 生成，共 23 个代码或界面源文件。每个标题对应一个真实路径；用途和拆分原因是面向初学者的结构化解释，自动索引不等于人工精读。

### [packages/attachment/attachment-local/src/compression-limiter.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/attachment/attachment-local/src/compression-limiter.ts)

- 所属层：packages/attachment：可复用的 Harness 功能包
- 文件角色：功能实现
- 这个文件有什么用：它位于 `packages/attachment/attachment-local`，围绕`compression-limiter`组织实现；固定提交中可见的公开或顶层声明包括 `CompressionLimiter`，这些声明构成它对外提供的主要入口。阅读时应沿直接协作者和测试继续确认具体输入、输出与失败边界。
- 为什么这样设计：把`compression-limiter`单独放在 `packages/attachment/attachment-local`，可以让这一段实现拥有清楚的输入、输出和替换边界；固定版本中它连接 0 个本地依赖和 3 个直接使用者，读者可以沿这些连接验证设计是否成立。
- 文件级设计证据：源码顶部注释把它定位为“Instance-owned concurrency bound for native image transformations.”；固定提交中扫描到的声明包括 `CompressionLimiter`；本地静态 import 图显示它直接依赖 0 个源文件，并被 3 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[packages/attachment/attachment-local/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/attachment/attachment-local/README.md)、[packages/attachment/attachment-local/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/attachment/attachment-local/src/index.ts)、[packages/attachment/attachment-local/tests/encoding.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/attachment/attachment-local/tests/encoding.spec.ts)、[packages/attachment/attachment-local/tests/request-image.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/attachment/attachment-local/tests/request-image.spec.ts)
- 对应测试：[packages/attachment/attachment-local/tests/encoding.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/attachment/attachment-local/tests/encoding.spec.ts)、[packages/attachment/attachment-local/tests/request-image.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/attachment/attachment-local/tests/request-image.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先读 `packages/attachment/attachment-local/README.md` 和入口，再读当前实现，沿着相关类型、协议或实现和 `packages/attachment/attachment-local/src/index.ts`、`packages/attachment/attachment-local/tests/encoding.spec.ts`、`packages/attachment/attachment-local/tests/request-image.spec.ts` 确认输入输出，最后对照 `packages/attachment/attachment-local/tests/encoding.spec.ts`、`packages/attachment/attachment-local/tests/request-image.spec.ts`。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 43 行；扫描到的声明包括 `CompressionLimiter`；源码顶部原注释（英文，仅作回查线索）：Instance-owned concurrency bound for native image transformations.。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/attachment/attachment-local/src/encoding.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/attachment/attachment-local/src/encoding.ts)

- 所属层：packages/attachment：可复用的 Harness 功能包
- 文件角色：功能实现
- 这个文件有什么用：它位于 `packages/attachment/attachment-local`，围绕`encoding`组织实现；固定提交中可见的公开或顶层声明包括 `EncodedCandidate`、`ExhaustedEncoding`、`encodeFirstWithinLimit`、`isExhaustedEncoding`，这些声明构成它对外提供的主要入口。阅读时应沿直接协作者和测试继续确认具体输入、输出与失败边界。
- 为什么这样设计：把`encoding`单独放在 `packages/attachment/attachment-local`，可以让这一段实现拥有清楚的输入、输出和替换边界；固定版本中它连接 0 个本地依赖和 3 个直接使用者，读者可以沿这些连接验证设计是否成立。
- 文件级设计证据：源码顶部注释把它定位为“Shared lazy candidate execution for normalization and request-image encoders.”；固定提交中扫描到的声明包括 `EncodedCandidate`、`ExhaustedEncoding`、`encodeFirstWithinLimit`、`isExhaustedEncoding`；本地静态 import 图显示它直接依赖 0 个源文件，并被 3 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[packages/attachment/attachment-local/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/attachment/attachment-local/README.md)、[packages/attachment/attachment-local/src/normalization.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/attachment/attachment-local/src/normalization.ts)、[packages/attachment/attachment-local/src/request-image.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/attachment/attachment-local/src/request-image.ts)、[packages/attachment/attachment-local/tests/encoding.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/attachment/attachment-local/tests/encoding.spec.ts)
- 对应测试：[packages/attachment/attachment-local/tests/encoding.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/attachment/attachment-local/tests/encoding.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先读 `packages/attachment/attachment-local/README.md` 和入口，再读当前实现，沿着相关类型、协议或实现和 `packages/attachment/attachment-local/src/normalization.ts`、`packages/attachment/attachment-local/src/request-image.ts`、`packages/attachment/attachment-local/tests/encoding.spec.ts` 确认输入输出，最后对照 `packages/attachment/attachment-local/tests/encoding.spec.ts`。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 46 行；扫描到的声明包括 `EncodedCandidate`、`ExhaustedEncoding`、`encodeFirstWithinLimit`、`isExhaustedEncoding`；源码顶部原注释（英文，仅作回查线索）：Shared lazy candidate execution for normalization and request-image encoders.。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/attachment/attachment-local/src/image.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/attachment/attachment-local/src/image.ts)

- 所属层：packages/attachment：可复用的 Harness 功能包
- 文件角色：图像格式探测器
- 这个文件有什么用：它在附件进入本地存储时完整解码图像，在已经验证过的读取路径上只探测头部元数据，并统一处理格式、尺寸和像素限制。
- 为什么这样设计：图像安全检查要区分完整解码和已验证读取路径的快速头部探测；把格式、尺寸和像素限制放在附件边界，既控制资源消耗，也避免各消费者用不一致的猜测。
- 文件级设计证据：源码顶部注释把它定位为“Raster inspection: full decode at admission, header-only probe on verified reads.”；固定提交中扫描到的声明包括 `DetectedImage`、`encodedAlphaIsCompatible`、`probeImage`、`DecodedImageLimits`、`detectImage`；本地静态 import 图显示它直接依赖 1 个源文件，并被 6 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[packages/attachment/attachment-local/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/attachment/attachment-local/README.md)、[packages/attachment/attachment/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/attachment/attachment/src/index.ts)、[packages/attachment/attachment-local/src/normalization.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/attachment/attachment-local/src/normalization.ts)、[packages/attachment/attachment-local/src/request-image.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/attachment/attachment-local/src/request-image.ts)、[packages/attachment/attachment-local/src/store.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/attachment/attachment-local/src/store.ts)
- 对应测试：[packages/attachment/attachment-local/tests/image.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/attachment/attachment-local/tests/image.spec.ts)、[packages/attachment/attachment-local/tests/normalization.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/attachment/attachment-local/tests/normalization.spec.ts)、[packages/attachment/attachment-local/tests/request-image-verification.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/attachment/attachment-local/tests/request-image-verification.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先读 `packages/attachment/attachment-local/README.md` 和入口，再读当前实现，沿着 `packages/attachment/attachment/src/index.ts` 和 `packages/attachment/attachment-local/src/normalization.ts`、`packages/attachment/attachment-local/src/request-image.ts`、`packages/attachment/attachment-local/src/store.ts` 确认输入输出，最后对照 `packages/attachment/attachment-local/tests/image.spec.ts`、`packages/attachment/attachment-local/tests/normalization.spec.ts`、`packages/attachment/attachment-local/tests/request-image-verification.spec.ts`。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 130 行；扫描到的声明包括 `DetectedImage`、`encodedAlphaIsCompatible`、`probeImage`、`DecodedImageLimits`、`detectImage`、`carriesRetainedMetadata`、`imageMetadata`；源码顶部原注释（英文，仅作回查线索）：Raster inspection: full decode at admission, header-only probe on verified reads.。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/attachment/attachment-local/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/attachment/attachment-local/src/index.ts)

- 所属层：packages/attachment：可复用的 Harness 功能包
- 文件角色：模块入口
- 这个文件有什么用：它把 `packages/attachment/attachment-local` 包里的 `src/index.ts` 相关的公开能力集中导出，并决定调用者可以依赖哪些边界；调用者因此不必记住所有内部文件。
- 为什么这样设计：入口文件把公开边界固定下来，内部文件可以继续拆分或替换；其他包只依赖入口暴露的 API，依赖方向更稳定。
- 文件级设计证据：源码顶部注释把它定位为“Local durable attachment backend rooted below DSH_HOME. @module @deepseek-ai/dsh-attachment-local”；固定提交中扫描到的声明包括 `DEFAULT_MAX_IMAGE_BYTES`、`DEFAULT_MAX_IMAGES_PER_MESSAGE`、`DEFAULT_MAX_MESSAGE_IMAGE_BYTES`、`DEFAULT_MAX_IMAGE_PIXELS`、`DEFAULT_MAX_IMAGE_DIMENSION`；本地静态 import 图显示它直接依赖 8 个源文件，并被 5 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[packages/attachment/attachment-local/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/attachment/attachment-local/README.md)、[packages/attachment/attachment-local/src/compression-limiter.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/attachment/attachment-local/src/compression-limiter.ts)、[packages/attachment/attachment-local/src/normalization.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/attachment/attachment-local/src/normalization.ts)、[packages/attachment/attachment-local/src/request-image.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/attachment/attachment-local/src/request-image.ts)、[packages/attachment/attachment-local/tests/index.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/attachment/attachment-local/tests/index.spec.ts)
- 对应测试：[packages/attachment/attachment-local/tests/index.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/attachment/attachment-local/tests/index.spec.ts)、[packages/attachment/attachment-local/tests/request-image-verification.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/attachment/attachment-local/tests/request-image-verification.spec.ts)、[packages/attachment/attachment-local/tests/request-image.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/attachment/attachment-local/tests/request-image.spec.ts)、[packages/fs/tool-fs/tests/read-image.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/fs/tool-fs/tests/read-image.spec.ts)、[packages/mcp/mcp-client/tests/mcp-client.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/mcp/mcp-client/tests/mcp-client.e2e.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先读 `packages/attachment/attachment-local/README.md`、入口和消费者，再读当前契约，沿着 `packages/attachment/attachment-local/tests/index.spec.ts`、`packages/attachment/attachment-local/tests/request-image-verification.spec.ts`、`packages/attachment/attachment-local/tests/request-image.spec.ts` 看它怎样约束运行时，最后对照 `packages/attachment/attachment-local/tests/index.spec.ts`、`packages/attachment/attachment-local/tests/request-image-verification.spec.ts`、`packages/attachment/attachment-local/tests/request-image.spec.ts`。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 250 行；扫描到的声明包括 `DEFAULT_MAX_IMAGE_BYTES`、`DEFAULT_MAX_IMAGES_PER_MESSAGE`、`DEFAULT_MAX_MESSAGE_IMAGE_BYTES`、`DEFAULT_MAX_IMAGE_PIXELS`、`DEFAULT_MAX_IMAGE_DIMENSION`、`DEFAULT_NORMALIZED_IMAGE_MAX_DIMENSION`、`DEFAULT_NORMALIZED_IMAGE_MAX_BYTES`、`DEFAULT_IMAGE_COMPRESSION_CONCURRENCY`；源码顶部原注释（英文，仅作回查线索）：Local durable attachment backend rooted below DSH_HOME. @module @deepseek-ai/dsh-attachment-local。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/attachment/attachment-local/src/invariant.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/attachment/attachment-local/src/invariant.ts)

- 所属层：packages/attachment：可复用的 Harness 功能包
- 文件角色：运行时不变量
- 这个文件有什么用：它检查 `packages/attachment/attachment-local` 包里的 `src/invariant.ts` 必须始终成立的条件，在错误刚出现时报告，而不是等到更深层才出现难以解释的结果。
- 为什么这样设计：把不变量集中在一个位置，调用者和测试就能用同一条规则检查状态；错误在边界处报告，比在后续 UI 或网络请求中才暴露更容易修复。
- 文件级设计证据：源码顶部注释把它定位为“Package-owned invariant companion for @deepseek-ai/dsh-attachment-local. @module @deepseek-ai/dsh-attachment-local/invariant”；固定提交中扫描到的声明包括 `name`、`inject`、`apply`；本地静态 import 图显示它直接依赖 2 个源文件，并被 0 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[packages/attachment/attachment-local/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/attachment/attachment-local/README.md)、[packages/runtime-diagnostics/invariants/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/runtime-diagnostics/invariants/src/index.ts)、[vendor/cordis/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/vendor/cordis/src/index.ts)
- 对应测试：没有确认到直接测试；公共入口可能仍有间接覆盖。
- 测试关联依据：固定提交中没有找到直接或传递的本地静态 import，也没有找到明显的同包同名测试；公共入口可能仍有间接覆盖。
- 阅读顺序：先读相关类型和事件，再读当前状态或存储实现，沿着 `packages/runtime-diagnostics/invariants/src/index.ts`、`vendor/cordis/src/index.ts` 和所在包的入口或服务理解状态变化，最后对照同包中与它同名或覆盖相近场景的测试。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 20 行；扫描到的声明包括 `name`、`inject`、`apply`；源码顶部原注释（英文，仅作回查线索）：Package-owned invariant companion for @deepseek-ai/dsh-attachment-local. @module @deepseek-ai/dsh-attachment-local/invariant。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/attachment/attachment-local/src/normalization.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/attachment/attachment-local/src/normalization.ts)

- 所属层：packages/attachment：可复用的 Harness 功能包
- 文件角色：功能实现
- 这个文件有什么用：它位于 `packages/attachment/attachment-local`，围绕`normalization`组织实现；固定提交中可见的公开或顶层声明包括 `NormalizationPolicy`、`NormalizedImage`、`canPassThroughNormalization`、`hasLowColourCount`、`normalizeImage`，这些声明构成它对外提供的主要入口。阅读时应沿直接协作者和测试继续确认具体输入、输出与失败边界。
- 为什么这样设计：把`normalization`单独放在 `packages/attachment/attachment-local`，可以让这一段实现拥有清楚的输入、输出和替换边界；固定版本中它连接 3 个本地依赖和 5 个直接使用者，读者可以沿这些连接验证设计是否成立。
- 文件级设计证据：源码顶部注释把它定位为“Deterministic provider-independent image normalization.”；固定提交中扫描到的声明包括 `NormalizationPolicy`、`NormalizedImage`、`canPassThroughNormalization`、`hasLowColourCount`、`normalizeImage`；本地静态 import 图显示它直接依赖 3 个源文件，并被 5 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[packages/attachment/attachment-local/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/attachment/attachment-local/README.md)、[packages/attachment/attachment-local/src/encoding.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/attachment/attachment-local/src/encoding.ts)、[packages/attachment/attachment-local/src/image.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/attachment/attachment-local/src/image.ts)、[packages/attachment/attachment/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/attachment/attachment/src/index.ts)、[packages/attachment/attachment-local/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/attachment/attachment-local/src/index.ts)
- 对应测试：[packages/attachment/attachment-local/tests/normalization.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/attachment/attachment-local/tests/normalization.spec.ts)、[packages/attachment/attachment-local/tests/store.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/attachment/attachment-local/tests/store.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先读 `packages/attachment/attachment-local/README.md` 和入口，再读当前实现，沿着 `packages/attachment/attachment-local/src/encoding.ts`、`packages/attachment/attachment-local/src/image.ts`、`packages/attachment/attachment/src/index.ts` 和 `packages/attachment/attachment-local/src/index.ts`、`packages/attachment/attachment-local/src/request-image.ts`、`packages/attachment/attachment-local/src/store.ts` 确认输入输出，最后对照 `packages/attachment/attachment-local/tests/normalization.spec.ts`、`packages/attachment/attachment-local/tests/store.spec.ts`。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 206 行；扫描到的声明包括 `NormalizationPolicy`、`NormalizedImage`、`canPassThroughNormalization`、`hasLowColourCount`、`normalizeImage`、`encode`、`verifyNormalizedImage`、`preparedPipeline`；源码顶部原注释（英文，仅作回查线索）：Deterministic provider-independent image normalization.。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/attachment/attachment-local/src/request-image.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/attachment/attachment-local/src/request-image.ts)

- 所属层：packages/attachment：可复用的 Harness 功能包
- 文件角色：智能体运行时
- 这个文件有什么用：它参与 `packages/attachment/attachment-local` 包里的 `src/request-image.ts` 的一次运行：领取输入、请求模型、处理工具或结束轮次；把状态集中管理可以保住顺序、取消和错误处理规则。
- 为什么这样设计：轮次状态、取消和顺序是高风险逻辑，集中在运行时文件中可以让不变量有一个明确的维护位置。
- 文件级设计证据：源码顶部注释把它定位为“Deterministic cached image versions for model requests.”；固定提交中扫描到的声明包括 `REQUEST_IMAGE_TRANSFORM_VERSION`、`REQUEST_IMAGE_QUALITIES`、`requestImageDimensions`、`requestImageVariantId`、`readRequestImageFile`；本地静态 import 图显示它直接依赖 4 个源文件，并被 1 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[packages/attachment/attachment-local/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/attachment/attachment-local/README.md)、[packages/attachment/attachment-local/src/encoding.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/attachment/attachment-local/src/encoding.ts)、[packages/attachment/attachment-local/src/image.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/attachment/attachment-local/src/image.ts)、[packages/attachment/attachment-local/src/normalization.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/attachment/attachment-local/src/normalization.ts)、[packages/attachment/attachment-local/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/attachment/attachment-local/src/index.ts)
- 对应测试：间接测试线索（通过本地 import 链，非直接覆盖）：[packages/attachment/attachment-local/tests/index.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/attachment/attachment-local/tests/index.spec.ts)、[packages/attachment/attachment-local/tests/request-image-verification.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/attachment/attachment-local/tests/request-image-verification.spec.ts)、[packages/attachment/attachment-local/tests/request-image.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/attachment/attachment-local/tests/request-image.spec.ts)、[packages/fs/tool-fs/tests/read-image.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/fs/tool-fs/tests/read-image.spec.ts)、[packages/mcp/mcp-client/tests/mcp-client.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/mcp/mcp-client/tests/mcp-client.e2e.ts)
- 测试关联依据：固定提交源码中的本地静态 import 传递引用；这些测试通过包入口或中间模块到达本文件，不等于本文件被直接覆盖。
- 阅读顺序：先读 `packages/attachment/attachment-local/README.md` 和入口，再读当前实现，沿着 `packages/attachment/attachment-local/src/encoding.ts`、`packages/attachment/attachment-local/src/image.ts`、`packages/attachment/attachment-local/src/normalization.ts` 和 `packages/attachment/attachment-local/src/index.ts` 确认输入输出，最后对照 `packages/attachment/attachment-local/tests/index.spec.ts`、`packages/attachment/attachment-local/tests/request-image-verification.spec.ts`、`packages/attachment/attachment-local/tests/request-image.spec.ts`。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 279 行；扫描到的声明包括 `REQUEST_IMAGE_TRANSFORM_VERSION`、`REQUEST_IMAGE_QUALITIES`、`requestImageDimensions`、`requestImageVariantId`、`readRequestImageFile`、`digest`、`checkedInteger`、`validatePolicy`；源码顶部原注释（英文，仅作回查线索）：Deterministic cached image versions for model requests.。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/attachment/attachment-local/src/store.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/attachment/attachment-local/src/store.ts)

- 所属层：packages/attachment：可复用的 Harness 功能包
- 文件角色：本地附件内容存储
- 这个文件有什么用：它把附件按内容摘要保存到 DSH_HOME 下的私有目录，校验文件、去重相同字节，并在读取时重新检查所有者和部署限制。
- 为什么这样设计：附件内容适合按摘要去重，但文件系统读取又必须检查所有者、私有目录和部署限制；把内容寻址、写入校验和读取复核集中在存储层，调用者不用重复实现安全规则。
- 文件级设计证据：源码顶部注释把它定位为“Content-addressed, owner-private local attachment storage.”；固定提交中扫描到的声明包括 `validateImageFile`、`PreparedImageFile`、`prepareImageFile`、`commitPreparedImageFile`、`saveImageFile`；本地静态 import 图显示它直接依赖 3 个源文件，并被 2 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[packages/attachment/attachment-local/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/attachment/attachment-local/README.md)、[packages/attachment/attachment-local/src/image.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/attachment/attachment-local/src/image.ts)、[packages/attachment/attachment-local/src/normalization.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/attachment/attachment-local/src/normalization.ts)、[packages/attachment/attachment/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/attachment/attachment/src/index.ts)、[packages/attachment/attachment-local/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/attachment/attachment-local/src/index.ts)
- 对应测试：[packages/attachment/attachment-local/tests/store.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/attachment/attachment-local/tests/store.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先读 `packages/attachment/attachment-local/README.md` 和入口，再读当前实现，沿着 `packages/attachment/attachment-local/src/image.ts`、`packages/attachment/attachment-local/src/normalization.ts`、`packages/attachment/attachment/src/index.ts` 和 `packages/attachment/attachment-local/src/index.ts`、`packages/attachment/attachment-local/tests/store.spec.ts` 确认输入输出，最后对照 `packages/attachment/attachment-local/tests/store.spec.ts`。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 296 行；扫描到的声明包括 `validateImageFile`、`PreparedImageFile`、`prepareImageFile`、`commitPreparedImageFile`、`saveImageFile`、`readImageFile`、`digest`、`displayName`；源码顶部原注释（英文，仅作回查线索）：Content-addressed, owner-private local attachment storage.。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/attachment/attachment-local/tests/encoding.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/attachment/attachment-local/tests/encoding.spec.ts)

- 所属层：packages/attachment：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查 `packages/attachment/attachment-local` 包里的 `tests/encoding.spec.ts` 的具体场景，包括“lazy image encoding”、“does not execute fallback qualities after the first fitting candidate”、“executes later candidates only after earlier candidates exceed the cap”、“rejects an empty candidate list and reports the smallest exhausted candidate”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“lazy image encoding”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：本次固定提交归档没有扫描到顶部注释、顶层声明或专门的结构线索；本地静态 import 图显示它直接依赖 2 个源文件，并被 0 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[packages/attachment/attachment-local/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/attachment/attachment-local/README.md)、[packages/attachment/attachment-local/src/compression-limiter.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/attachment/attachment-local/src/compression-limiter.ts)、[packages/attachment/attachment-local/src/encoding.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/attachment/attachment-local/src/encoding.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `packages/attachment/attachment-local/src/compression-limiter.ts`、`packages/attachment/attachment-local/src/encoding.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 96 行；扫描到的测试主题包括 “lazy image encoding”、“does not execute fallback qualities after the first fitting candidate”、“executes later candidates only after earlier candidates exceed the cap”、“rejects an empty candidate list and reports the smallest exhausted candidate”、“CompressionLimiter”、“starts at most the configured number of tasks and preserves queued progress”。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/attachment/attachment-local/tests/image.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/attachment/attachment-local/tests/image.spec.ts)

- 所属层：packages/attachment：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查 `packages/attachment/attachment-local` 包里的 `tests/image.spec.ts` 的具体场景，包括“raster decoding”、“decodes every supported format and its intrinsic dimensions”、“rejects excess decoded pixels before decoding”、“rejects a side above the per-side limit and accepts a side exactly at it”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“raster decoding”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：固定提交中扫描到的声明包括 `raster`；本地静态 import 图显示它直接依赖 1 个源文件，并被 0 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[packages/attachment/attachment-local/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/attachment/attachment-local/README.md)、[packages/attachment/attachment-local/src/image.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/attachment/attachment-local/src/image.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `packages/attachment/attachment-local/src/image.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 91 行；扫描到的声明包括 `raster`；扫描到的测试主题包括 “raster decoding”、“decodes every supported format and its intrinsic dimensions”、“rejects excess decoded pixels before decoding”、“rejects a side above the per-side limit and accepts a side exactly at it”、“rejects malformed bytes and truncated payloads with readable headers”、“reports animation from a multi-frame container and perceived axes from EXIF orientation”。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/attachment/attachment-local/tests/index.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/attachment/attachment-local/tests/index.spec.ts)

- 所属层：packages/attachment：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查 `packages/attachment/attachment-local` 包里的 `tests/index.spec.ts` 的具体场景，包括“local attachment service”、“resolves every omitted admission limit explicitly”、“resolves and validates the instance image-compression concurrency”、“saves and reads through the service boundary”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“local attachment service”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：本次固定提交归档没有扫描到顶部注释、顶层声明或专门的结构线索；本地静态 import 图显示它直接依赖 2 个源文件，并被 0 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[packages/attachment/attachment-local/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/attachment/attachment-local/README.md)、[packages/attachment/attachment-local/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/attachment/attachment-local/src/index.ts)、[vendor/cordis/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/vendor/cordis/src/index.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `packages/attachment/attachment-local/src/index.ts`、`vendor/cordis/src/index.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 145 行；扫描到的测试主题包括 “local attachment service”、“resolves every omitted admission limit explicitly”、“resolves and validates the instance image-compression concurrency”、“saves and reads through the service boundary”、“commits a fully prepared image batch in input order”、“prepares every batch member before any write”。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/attachment/attachment-local/tests/normalization.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/attachment/attachment-local/tests/normalization.spec.ts)

- 所属层：packages/attachment：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查 `packages/attachment/attachment-local` 包里的 `tests/normalization.spec.ts` 的具体场景，包括“canPassThroughNormalization”、“accepts an in-budget clean PNG/JPEG/WebP and refuses GIF, animation, metadata, oversize...”、“normalizeImage”、“passes an already-normalized source through byte-identically”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“canPassThroughNormalization”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：固定提交中扫描到的声明包括 `noisePixels`、`noiseImage`、`flatImage`；本地静态 import 图显示它直接依赖 2 个源文件，并被 0 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[packages/attachment/attachment-local/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/attachment/attachment-local/README.md)、[packages/attachment/attachment-local/src/image.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/attachment/attachment-local/src/image.ts)、[packages/attachment/attachment-local/src/normalization.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/attachment/attachment-local/src/normalization.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `packages/attachment/attachment-local/src/image.ts`、`packages/attachment/attachment-local/src/normalization.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 363 行；扫描到的声明包括 `noisePixels`、`noiseImage`、`flatImage`；扫描到的测试主题包括 “canPassThroughNormalization”、“accepts an in-budget clean PNG/JPEG/WebP and refuses GIF, animation, metadata, oversized edges, and oversized bytes”、“normalizeImage”、“passes an already-normalized source through byte-identically”、“downscales an oversized PNG to the long-edge target and stays PNG”、“re-encodes the normalized output of a resize into itself (idempotence)”。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/attachment/attachment-local/tests/request-image-verification.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/attachment/attachment-local/tests/request-image-verification.spec.ts)

- 所属层：packages/attachment：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查 `packages/attachment/attachment-local` 包里的 `tests/request-image-verification.spec.ts` 的具体场景，包括“request image verification”、“rejects an encoded request whose decoded facts disagree with the encoder result”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“request image verification”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：本次固定提交归档没有扫描到顶部注释、顶层声明或专门的结构线索；本地静态 import 图显示它直接依赖 3 个源文件，并被 0 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[packages/attachment/attachment-local/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/attachment/attachment-local/README.md)、[packages/attachment/attachment-local/src/image.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/attachment/attachment-local/src/image.ts)、[packages/attachment/attachment-local/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/attachment/attachment-local/src/index.ts)、[vendor/cordis/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/vendor/cordis/src/index.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `packages/attachment/attachment-local/src/image.ts`、`packages/attachment/attachment-local/src/index.ts`、`vendor/cordis/src/index.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 47 行；扫描到的测试主题包括 “request image verification”、“rejects an encoded request whose decoded facts disagree with the encoder result”。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/attachment/attachment-local/tests/request-image.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/attachment/attachment-local/tests/request-image.spec.ts)

- 所属层：packages/attachment：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查 `packages/attachment/attachment-local` 包里的 `tests/request-image.spec.ts` 的具体场景，包括“request image dimensions”、“projects a portrait within the same total-pixel budget”、“rounds a portrait inward when integer aspect rounding crosses the pixel cap”、“local request-image cache”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“request image dimensions”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：固定提交中扫描到的声明包括 `store`、`image`、`complexOpaqueAlphaImage`；本地静态 import 图显示它直接依赖 3 个源文件，并被 0 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[packages/attachment/attachment-local/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/attachment/attachment-local/README.md)、[packages/attachment/attachment-local/src/compression-limiter.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/attachment/attachment-local/src/compression-limiter.ts)、[packages/attachment/attachment-local/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/attachment/attachment-local/src/index.ts)、[vendor/cordis/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/vendor/cordis/src/index.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `packages/attachment/attachment-local/src/compression-limiter.ts`、`packages/attachment/attachment-local/src/index.ts`、`vendor/cordis/src/index.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 348 行；扫描到的声明包括 `store`、`image`、`complexOpaqueAlphaImage`；扫描到的测试主题包括 “request image dimensions”、“projects a portrait within the same total-pixel budget”、“rounds a portrait inward when integer aspect rounding crosses the pixel cap”、“local request-image cache”、“passes through an in-budget attachment and composes ordered request reads”、“rejects invalid request policies”。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/attachment/attachment-local/tests/store.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/attachment/attachment-local/tests/store.spec.ts)

- 所属层：packages/attachment：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查状态存储的具体场景，包括“local attachment store”、“creates and persists a missing nested home directory against the filesystem root”、“publishes one private content-addressed object and deduplicates equal bytes”、“stores the normalized image of an oversized source and reads it back verified”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“local attachment store”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：固定提交中扫描到的声明包括 `root`、`parentChainToRoot`；本地静态 import 图显示它直接依赖 3 个源文件，并被 0 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[packages/attachment/attachment-local/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/attachment/attachment-local/README.md)、[packages/attachment/attachment-local/src/normalization.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/attachment/attachment-local/src/normalization.ts)、[packages/attachment/attachment-local/src/store.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/attachment/attachment-local/src/store.ts)、[packages/attachment/attachment/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/attachment/attachment/src/index.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `packages/attachment/attachment-local/src/normalization.ts`、`packages/attachment/attachment-local/src/store.ts`、`packages/attachment/attachment/src/index.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 273 行；扫描到的声明包括 `root`、`parentChainToRoot`；扫描到的测试主题包括 “local attachment store”、“creates and persists a missing nested home directory against the filesystem root”、“publishes one private content-addressed object and deduplicates equal bytes”、“stores the normalized image of an oversized source and reads it back verified”、“keeps admitted history readable after deployment limits become stricter”、“forwards read cancellation to the filesystem and preserves its reason”。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/attachment/attachment/src/admission.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/attachment/attachment/src/admission.ts)

- 所属层：packages/attachment：可复用的 Harness 功能包
- 文件角色：功能实现
- 这个文件有什么用：它位于 `packages/attachment/attachment`，围绕`admission`组织实现；固定提交中可见的公开或顶层声明包括 `admitEncodedImages`、`decodeBase64`、`saveInput`，这些声明构成它对外提供的主要入口。阅读时应沿直接协作者和测试继续确认具体输入、输出与失败边界。
- 为什么这样设计：把`admission`单独放在 `packages/attachment/attachment`，可以让这一段实现拥有清楚的输入、输出和替换边界；固定版本中它连接 3 个本地依赖和 1 个直接使用者，读者可以沿这些连接验证设计是否成立。
- 文件级设计证据：源码顶部注释把它定位为“Wire-form admission of base64-encoded image uploads. @module @deepseek-ai/dsh-attachment/admission”；固定提交中扫描到的声明包括 `admitEncodedImages`、`decodeBase64`、`saveInput`；本地静态 import 图显示它直接依赖 3 个源文件，并被 1 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[packages/attachment/attachment/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/attachment/attachment/README.md)、[packages/attachment/attachment/src/error.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/attachment/attachment/src/error.ts)、[packages/attachment/attachment/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/attachment/attachment/src/index.ts)、[packages/attachment/attachment/src/types.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/attachment/attachment/src/types.ts)
- 对应测试：间接测试线索（通过本地 import 链，非直接覆盖）：[apps/cli/tests/memory-mcp-configs.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/apps/cli/tests/memory-mcp-configs.spec.ts)、[apps/cli/tests/web-agent-presets.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/apps/cli/tests/web-agent-presets.e2e.ts)、[apps/web/tests/background-job-list.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/apps/web/tests/background-job-list.e2e.ts)、[apps/web/tests/chat-continuous-conversation.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/apps/web/tests/chat-continuous-conversation.e2e.ts)、[apps/web/tests/chat-long-interactions.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/apps/web/tests/chat-long-interactions.e2e.ts)、[apps/web/tests/chat-scroll-contract.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/apps/web/tests/chat-scroll-contract.e2e.ts)
- 测试关联依据：固定提交源码中的本地静态 import 传递引用；这些测试通过包入口或中间模块到达本文件，不等于本文件被直接覆盖。
- 阅读顺序：先读 `packages/attachment/attachment/README.md` 和入口，再读当前实现，沿着 `packages/attachment/attachment/src/error.ts`、`packages/attachment/attachment/src/index.ts`、`packages/attachment/attachment/src/types.ts` 和 `packages/attachment/attachment/src/index.ts` 确认输入输出，最后对照 `apps/cli/tests/memory-mcp-configs.spec.ts`、`apps/cli/tests/web-agent-presets.e2e.ts`、`apps/web/tests/background-job-list.e2e.ts`。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 41 行；扫描到的声明包括 `admitEncodedImages`、`decodeBase64`、`saveInput`；源码顶部原注释（英文，仅作回查线索）：Wire-form admission of base64-encoded image uploads. @module @deepseek-ai/dsh-attachment/admission。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/attachment/attachment/src/brand.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/attachment/attachment/src/brand.ts)

- 所属层：packages/attachment：可复用的 Harness 功能包
- 文件角色：品牌类型
- 这个文件有什么用：它为品牌类型定义带语义的品牌类型，使编译器能阻止不同用途的标识符互相替换。
- 为什么这样设计：在编译期区分语义不同的标识符，能把一类容易被普通字符串掩盖的调用错误提前暴露，而不增加运行时序列化成本。
- 文件级设计证据：源码顶部注释把它定位为“Attachment identifier brand. @module @deepseek-ai/dsh-attachment/brand”；固定提交中扫描到的声明包括 `AttachmentId`、`ImageVariantId`；本地静态 import 图显示它直接依赖 1 个源文件，并被 2 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[packages/attachment/attachment/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/attachment/attachment/README.md)、[packages/util/brand/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/util/brand/src/index.ts)、[packages/attachment/attachment/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/attachment/attachment/src/index.ts)、[packages/attachment/attachment/src/types.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/attachment/attachment/src/types.ts)
- 对应测试：间接测试线索（通过本地 import 链，非直接覆盖）：[apps/cli/tests/memory-mcp-configs.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/apps/cli/tests/memory-mcp-configs.spec.ts)、[apps/cli/tests/web-agent-presets.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/apps/cli/tests/web-agent-presets.e2e.ts)、[apps/web/tests/background-job-list.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/apps/web/tests/background-job-list.e2e.ts)、[apps/web/tests/chat-continuous-conversation.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/apps/web/tests/chat-continuous-conversation.e2e.ts)、[apps/web/tests/chat-long-interactions.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/apps/web/tests/chat-long-interactions.e2e.ts)、[apps/web/tests/chat-scroll-contract.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/apps/web/tests/chat-scroll-contract.e2e.ts)
- 测试关联依据：固定提交源码中的本地静态 import 传递引用；这些测试通过包入口或中间模块到达本文件，不等于本文件被直接覆盖。
- 阅读顺序：先读 `packages/attachment/attachment/README.md`、入口和消费者，再读当前契约，沿着 `packages/attachment/attachment/src/index.ts`、`packages/attachment/attachment/src/types.ts` 看它怎样约束运行时，最后对照 `apps/cli/tests/memory-mcp-configs.spec.ts`、`apps/cli/tests/web-agent-presets.e2e.ts`、`apps/web/tests/background-job-list.e2e.ts`。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 27 行；扫描到的声明包括 `AttachmentId`、`ImageVariantId`；源码顶部原注释（英文，仅作回查线索）：Attachment identifier brand. @module @deepseek-ai/dsh-attachment/brand。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/attachment/attachment/src/error.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/attachment/attachment/src/error.ts)

- 所属层：packages/attachment：可复用的 Harness 功能包
- 文件角色：错误模型
- 这个文件有什么用：这个文件统一错误的类型、名称或转换方式。统一错误格式能让日志、用户界面和重试策略看懂同一件事。
- 为什么这样设计：固定提交的文件顶部注释把它定位为“Attachment failure class. @module @deepseek-ai/dsh-attachment/error”；把这项职责单独放置，可以让边界、输入和失败处理在一个地方被阅读和测试。
- 文件级设计证据：源码顶部注释把它定位为“Attachment failure class. @module @deepseek-ai/dsh-attachment/error”；固定提交中扫描到的声明包括 `ImageAdmissionErrorCode`、`AttachmentErrorCode`、`AttachmentError`、`isImageAdmissionError`；本地静态 import 图显示它直接依赖 0 个源文件，并被 2 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[packages/attachment/attachment/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/attachment/attachment/README.md)、[packages/attachment/attachment/src/admission.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/attachment/attachment/src/admission.ts)、[packages/attachment/attachment/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/attachment/attachment/src/index.ts)
- 对应测试：间接测试线索（通过本地 import 链，非直接覆盖）：[apps/cli/tests/memory-mcp-configs.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/apps/cli/tests/memory-mcp-configs.spec.ts)、[apps/cli/tests/web-agent-presets.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/apps/cli/tests/web-agent-presets.e2e.ts)、[apps/web/tests/background-job-list.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/apps/web/tests/background-job-list.e2e.ts)、[apps/web/tests/chat-continuous-conversation.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/apps/web/tests/chat-continuous-conversation.e2e.ts)、[apps/web/tests/chat-long-interactions.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/apps/web/tests/chat-long-interactions.e2e.ts)、[apps/web/tests/chat-scroll-contract.e2e.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/apps/web/tests/chat-scroll-contract.e2e.ts)
- 测试关联依据：固定提交源码中的本地静态 import 传递引用；这些测试通过包入口或中间模块到达本文件，不等于本文件被直接覆盖。
- 阅读顺序：先读 `packages/attachment/attachment/README.md` 和入口，再读当前实现，沿着相关类型、协议或实现和 `packages/attachment/attachment/src/admission.ts`、`packages/attachment/attachment/src/index.ts` 确认输入输出，最后对照 `apps/cli/tests/memory-mcp-configs.spec.ts`、`apps/cli/tests/web-agent-presets.e2e.ts`、`apps/web/tests/background-job-list.e2e.ts`。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 68 行；扫描到的声明包括 `ImageAdmissionErrorCode`、`AttachmentErrorCode`、`AttachmentError`、`isImageAdmissionError`；源码顶部原注释（英文，仅作回查线索）：Attachment failure class. @module @deepseek-ai/dsh-attachment/error。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/attachment/attachment/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/attachment/attachment/src/index.ts)

- 所属层：packages/attachment：可复用的 Harness 功能包
- 文件角色：模块入口
- 这个文件有什么用：它把 `packages/attachment/attachment` 包里的 `src/index.ts` 相关的公开能力集中导出，并决定调用者可以依赖哪些边界；调用者因此不必记住所有内部文件。
- 为什么这样设计：入口文件把公开边界固定下来，内部文件可以继续拆分或替换；其他包只依赖入口暴露的 API，依赖方向更稳定。
- 文件级设计证据：源码顶部注释把它定位为“Durable attachment storage seam (ctx.attachments). @module @deepseek-ai/dsh-attachment”；本地静态 import 图显示它直接依赖 5 个源文件，并被 65 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[packages/attachment/attachment/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/attachment/attachment/README.md)、[packages/attachment/attachment/src/admission.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/attachment/attachment/src/admission.ts)、[packages/attachment/attachment/src/brand.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/attachment/attachment/src/brand.ts)、[packages/attachment/attachment/src/error.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/attachment/attachment/src/error.ts)、[packages/acp/acp/src/content.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/acp/acp/src/content.ts)
- 对应测试：[packages/acp/acp/tests/bridge.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/acp/acp/tests/bridge.spec.ts)、[packages/acp/acp/tests/content.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/acp/acp/tests/content.spec.ts)、[packages/attachment/attachment-local/tests/store.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/attachment/attachment-local/tests/store.spec.ts)、[packages/attachment/attachment/tests/admission.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/attachment/attachment/tests/admission.spec.ts)、[packages/attachment/attachment/tests/index.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/attachment/attachment/tests/index.spec.ts)、[packages/client/connection/tests/node-half.host.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/client/connection/tests/node-half.host.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 测试支持：[packages/acp/acp/tests/harness.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/acp/acp/tests/harness.ts)
- 阅读顺序：先读 `packages/attachment/attachment/README.md`、入口和消费者，再读当前契约，沿着 `packages/acp/acp/src/content.ts`、`packages/acp/acp/tests/bridge.spec.ts`、`packages/acp/acp/tests/content.spec.ts` 看它怎样约束运行时，最后对照 `packages/acp/acp/tests/bridge.spec.ts`、`packages/acp/acp/tests/content.spec.ts`、`packages/attachment/attachment-local/tests/store.spec.ts`。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 133 行；源码顶部原注释（英文，仅作回查线索）：Durable attachment storage seam (ctx.attachments). @module @deepseek-ai/dsh-attachment。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/attachment/attachment/src/invariant.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/attachment/attachment/src/invariant.ts)

- 所属层：packages/attachment：可复用的 Harness 功能包
- 文件角色：运行时不变量
- 这个文件有什么用：它检查 `packages/attachment/attachment` 包里的 `src/invariant.ts` 必须始终成立的条件，在错误刚出现时报告，而不是等到更深层才出现难以解释的结果。
- 为什么这样设计：把不变量集中在一个位置，调用者和测试就能用同一条规则检查状态；错误在边界处报告，比在后续 UI 或网络请求中才暴露更容易修复。
- 文件级设计证据：源码顶部注释把它定位为“Package-owned invariant companion for @deepseek-ai/dsh-attachment. @module @deepseek-ai/dsh-attachment/invariant”；固定提交中扫描到的声明包括 `name`、`inject`、`apply`；本地静态 import 图显示它直接依赖 2 个源文件，并被 0 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[packages/attachment/attachment/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/attachment/attachment/README.md)、[packages/runtime-diagnostics/invariants/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/runtime-diagnostics/invariants/src/index.ts)、[vendor/cordis/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/vendor/cordis/src/index.ts)
- 对应测试：没有确认到直接测试；公共入口可能仍有间接覆盖。
- 测试关联依据：固定提交中没有找到直接或传递的本地静态 import，也没有找到明显的同包同名测试；公共入口可能仍有间接覆盖。
- 阅读顺序：先读相关类型和事件，再读当前状态或存储实现，沿着 `packages/runtime-diagnostics/invariants/src/index.ts`、`vendor/cordis/src/index.ts` 和所在包的入口或服务理解状态变化，最后对照同包中与它同名或覆盖相近场景的测试。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 20 行；扫描到的声明包括 `name`、`inject`、`apply`；源码顶部原注释（英文，仅作回查线索）：Package-owned invariant companion for @deepseek-ai/dsh-attachment. @module @deepseek-ai/dsh-attachment/invariant。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/attachment/attachment/src/types.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/attachment/attachment/src/types.ts)

- 所属层：packages/attachment：可复用的 Harness 功能包
- 文件角色：类型契约
- 这个文件有什么用：它描述 `packages/attachment/attachment` 包里的 `src/types.ts` 中流转的数据长什么样、哪些字段必填以及各部分怎样关联，让不同模块先共享同一份约定。
- 为什么这样设计：先把形状和规则集中声明，执行代码只负责使用已经检查过的数据；这样错误更早暴露，读代码时也有一张共同的地图。
- 文件级设计证据：源码顶部注释把它定位为“Durable attachment vocabulary. @module @deepseek-ai/dsh-attachment/types”；固定提交中扫描到的声明包括 `ImageMediaType`、`ImageAttachmentRef`、`ImageAttachmentLimits`、`EncodedImageAttachment`、`SaveImageAttachment`；本地静态 import 图显示它直接依赖 1 个源文件，并被 4 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[packages/attachment/attachment/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/attachment/attachment/README.md)、[packages/attachment/attachment/src/brand.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/attachment/attachment/src/brand.ts)、[packages/attachment/attachment/src/admission.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/attachment/attachment/src/admission.ts)、[packages/attachment/attachment/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/attachment/attachment/src/index.ts)、[packages/attachment/attachment/tests/admission.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/attachment/attachment/tests/admission.spec.ts)
- 对应测试：[packages/attachment/attachment/tests/admission.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/attachment/attachment/tests/admission.spec.ts)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先读 `packages/attachment/attachment/README.md`、入口和消费者，再读当前契约，沿着 `packages/attachment/attachment/src/admission.ts`、`packages/attachment/attachment/src/index.ts`、`packages/attachment/attachment/tests/admission.spec.ts` 看它怎样约束运行时，最后对照 `packages/attachment/attachment/tests/admission.spec.ts`。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 96 行；扫描到的声明包括 `ImageMediaType`、`ImageAttachmentRef`、`ImageAttachmentLimits`、`EncodedImageAttachment`、`SaveImageAttachment`、`StoredImageAttachment`、`ImageRequestPolicy`、`RequestImageAttachment`；源码顶部原注释（英文，仅作回查线索）：Durable attachment vocabulary. @module @deepseek-ai/dsh-attachment/types。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/attachment/attachment/tests/admission.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/attachment/attachment/tests/admission.spec.ts)

- 所属层：packages/attachment：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查 `packages/attachment/attachment` 包里的 `tests/admission.spec.ts` 的具体场景，包括“admitEncodedImages”、“decodes every member and delegates one ordered batch to saveImages”、“omits the name from store inputs when the upload has none”、“delegates an empty batch unchanged”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“admitEncodedImages”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：固定提交中扫描到的声明包括 `storeOf`；本地静态 import 图显示它直接依赖 2 个源文件，并被 0 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[packages/attachment/attachment/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/attachment/attachment/README.md)、[packages/attachment/attachment/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/attachment/attachment/src/index.ts)、[packages/attachment/attachment/src/types.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/attachment/attachment/src/types.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `packages/attachment/attachment/src/index.ts`、`packages/attachment/attachment/src/types.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 66 行；扫描到的声明包括 `storeOf`；扫描到的测试主题包括 “admitEncodedImages”、“decodes every member and delegates one ordered batch to saveImages”、“omits the name from store inputs when the upload has none”、“delegates an empty batch unchanged”、“rejects non-canonical and empty base64 payloads before any store call”、“propagates the store batch rejection unchanged”。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [packages/attachment/attachment/tests/index.spec.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/attachment/attachment/tests/index.spec.ts)

- 所属层：packages/attachment：可复用的 Harness 功能包
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查 `packages/attachment/attachment` 包里的 `tests/index.spec.ts` 的具体场景，包括“AttachmentStore.saveImages”、“validates the complete batch before saving in input order”、“rejects count, aggregate bytes, and deployment media types before validation”、“starts no writes when any member fails validation”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“AttachmentStore.saveImages”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 文件级设计证据：固定提交中扫描到的声明包括 `RecordingStore`、`UnsupportedProjectionStore`、`image`；本地静态 import 图显示它直接依赖 2 个源文件，并被 0 个源文件直接引用。这些是文件级定位证据，用来约束“为什么这样设计”的解释范围；它们仍不替代人工源码阅读。
- 直接协作者：[packages/attachment/attachment/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/attachment/attachment/README.md)、[packages/attachment/attachment/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/packages/attachment/attachment/src/index.ts)、[vendor/cordis/src/index.ts](https://github.com/deepseek-ai/deepseek-harness/blob/aa6c361a972c8369148dea7380bb5c21c24e07ec/vendor/cordis/src/index.ts)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `packages/attachment/attachment/src/index.ts`、`vendor/cordis/src/index.ts`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 161 行；扫描到的声明包括 `RecordingStore`、`UnsupportedProjectionStore`、`image`；扫描到的测试主题包括 “AttachmentStore.saveImages”、“validates the complete batch before saving in input order”、“rejects count, aggregate bytes, and deployment media types before validation”、“starts no writes when any member fails validation”、“returns no partial references when storage fails after an earlier commit”、“AttachmentStore.readImageRequest”。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `aa6c361a972c8369148dea7380bb5c21c24e07ec`；如果当前条目与运行版本不同，应先重新生成索引再下结论。
