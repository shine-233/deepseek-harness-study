# 源文件索引：python

本页由 `study-tools/generate-source-index.mjs` 根据官方提交 `47f943859bef60e4160492346772ded9b24f765a` 生成，共 14 个代码或界面源文件。每个标题对应一个真实路径；用途和拆分原因是面向初学者的结构化解释，自动索引不等于人工精读。

### [python/sdk-runtime/hatch_build.py](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/python/sdk-runtime/hatch_build.py)

- 所属层：Python SDK 或运行时支持
- 文件角色：Python runtime wheel 构建钩子
- 这个文件有什么用：它把平台相关的 runtime payload 放进 wheel，检查 executable、平台 tag 和不可发布的 sdist 形态；runtime 载体因此可以与高层 SDK 分开发布。
- 为什么这样设计：runtime wheel 携带平台相关可执行载体，而高层 SDK wheel 不应偷偷复制这些文件；构建钩子明确区分 executable、平台 tag 和 sdist，发布边界才可审查和复现。
- 直接协作者：[python/sdk-runtime/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/python/sdk-runtime/README.md)
- 对应测试：没有确认到直接测试；公共入口可能仍有间接覆盖。
- 测试关联依据：固定提交中没有找到直接或传递的本地静态 import，也没有找到明显的同包同名测试；公共入口可能仍有间接覆盖。
- 阅读顺序：先读 `python/sdk-runtime` 的 README 和入口，再读当前实现，沿着相关类型、协议或实现和所在包的入口或服务确认输入输出，最后对照同包中与它同名或覆盖相近场景的测试。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 83 行；扫描到的声明包括 `_load_platforms`、`_host_platform_tag`、`RuntimeBuildHook`、`initialize`。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [python/sdk-runtime/src/deepseek_harness_runtime/__init__.py](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/python/sdk-runtime/src/deepseek_harness_runtime/__init__.py)

- 所属层：Python SDK 或运行时支持
- 文件角色：Python 运行时载体解析器
- 这个文件有什么用：它定位已打包的生产 exe 或显式选择的开发 node carrier，解析平台与架构、提供默认 cordis.yml 路径，并生成启动参数；生产模式不会静默退回源码构建。
- 为什么这样设计：生产 SDK 必须优先使用已打包 carrier，开发 carrier 只能显式选择；把平台解析、路径和启动参数集中在 runtime 载体包，能避免调用者静默退回源码导致环境差异。
- 直接协作者：[python/sdk-runtime/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/python/sdk-runtime/README.md)、[python/sdk/src/deepseek_harness/client.py](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/python/sdk/src/deepseek_harness/client.py)、[python/sdk/tests/manual_sdk_agent_smoke.py](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/python/sdk/tests/manual_sdk_agent_smoke.py)、[python/sdk/tests/test_bundled_runtime.py](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/python/sdk/tests/test_bundled_runtime.py)
- 对应测试：[python/sdk/tests/test_bundled_runtime.py](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/python/sdk/tests/test_bundled_runtime.py)、[python/sdk/tests/test_runtime_resolution.py](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/python/sdk/tests/test_runtime_resolution.py)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先读 `python/sdk-runtime` 的 README 和入口，再读当前实现，沿着相关类型、协议或实现和 `python/sdk/src/deepseek_harness/client.py`、`python/sdk/tests/manual_sdk_agent_smoke.py`、`python/sdk/tests/test_bundled_runtime.py` 确认输入输出，最后对照 `python/sdk/tests/test_bundled_runtime.py`、`python/sdk/tests/test_runtime_resolution.py`。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 164 行；扫描到的声明包括 `bundled_package_dir`、`bundled_default_config_path`、`bundled_runtime_path`、`resolve_bundled_launch_args`、`_current_platform_tag`、`_node_launch_args`。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [python/sdk/src/deepseek_harness/__init__.py](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/python/sdk/src/deepseek_harness/__init__.py)

- 所属层：Python SDK 或运行时支持
- 文件角色：Python SDK 公共导出入口
- 这个文件有什么用：它把 DeepSeekHarness、HarnessClient、Session、配置、结果、通知和协议模型集中导出，给 Python 调用者一个稳定的导入门面。
- 为什么这样设计：Python 用户需要稳定的导入门面，而内部 client、models 和生命周期实现仍可能拆分；集中导出公共对象可以保持示例和外部程序的导入路径不随内部重构变化。
- 直接协作者：[python/sdk/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/python/sdk/README.md)、[python/sdk/src/deepseek_harness/api.py](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/python/sdk/src/deepseek_harness/api.py)、[python/sdk/src/deepseek_harness/client.py](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/python/sdk/src/deepseek_harness/client.py)、[python/sdk/src/deepseek_harness/errors.py](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/python/sdk/src/deepseek_harness/errors.py)、[examples/jsonrpc-agent/minimal.py](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/examples/jsonrpc-agent/minimal.py)
- 对应测试：[python/sdk/tests/test_bundled_runtime.py](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/python/sdk/tests/test_bundled_runtime.py)、[python/sdk/tests/test_client.py](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/python/sdk/tests/test_client.py)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先读 `python/sdk` 的 README 和入口，再读当前实现，沿着 `python/sdk/src/deepseek_harness/api.py`、`python/sdk/src/deepseek_harness/client.py`、`python/sdk/src/deepseek_harness/errors.py` 和 `examples/jsonrpc-agent/minimal.py`、`python/sdk/tests/manual_sdk_agent_smoke.py`、`python/sdk/tests/test_bundled_runtime.py` 确认输入输出，最后对照 `python/sdk/tests/test_bundled_runtime.py`、`python/sdk/tests/test_client.py`。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 19 行。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [python/sdk/src/deepseek_harness/api.py](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/python/sdk/src/deepseek_harness/api.py)

- 所属层：Python SDK 或运行时支持
- 文件角色：Python 高层 SDK 会话 API
- 这个文件有什么用：它管理 DeepSeekHarness 的 runtime 生命周期、Session、turn、notification 收集和最终回答提取，把 Python 调用者与底层 JSON-RPC client 隔开。
- 为什么这样设计：高层 SDK 应表达“创建会话、执行 turn、收集通知、取最终回答”，不应让调用者手动驱动 JSON-RPC；API 层拥有 runtime 生命周期，协议 client 因而可以独立替换。
- 直接协作者：[python/sdk/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/python/sdk/README.md)、[python/sdk/src/deepseek_harness/client.py](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/python/sdk/src/deepseek_harness/client.py)、[python/sdk/src/deepseek_harness/errors.py](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/python/sdk/src/deepseek_harness/errors.py)、[python/sdk/src/deepseek_harness/models.py](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/python/sdk/src/deepseek_harness/models.py)、[python/sdk/src/deepseek_harness/__init__.py](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/python/sdk/src/deepseek_harness/__init__.py)
- 对应测试：间接测试线索（通过本地 import 链，非直接覆盖）：[python/sdk/tests/test_bundled_runtime.py](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/python/sdk/tests/test_bundled_runtime.py)、[python/sdk/tests/test_client.py](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/python/sdk/tests/test_client.py)
- 测试关联依据：固定提交源码中的本地静态 import 传递引用；这些测试通过包入口或中间模块到达本文件，不等于本文件被直接覆盖。
- 阅读顺序：先读相关类型和事件，再读当前状态或存储实现，沿着 `python/sdk/src/deepseek_harness/client.py`、`python/sdk/src/deepseek_harness/errors.py`、`python/sdk/src/deepseek_harness/models.py` 和 `python/sdk/src/deepseek_harness/__init__.py` 理解状态变化，最后对照 `python/sdk/tests/test_bundled_runtime.py`、`python/sdk/tests/test_client.py`。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 242 行；扫描到的声明包括 `DeepSeekHarnessConfig`、`RunResult`、`DeepSeekHarness`、`__init__`、`__enter__`、`__exit__`、`client`、`start`。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [python/sdk/src/deepseek_harness/client.py](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/python/sdk/src/deepseek_harness/client.py)

- 所属层：Python SDK 或运行时支持
- 文件角色：Python JSON-RPC 客户端
- 这个文件有什么用：它通过标准输入输出启动并管理 Harness runtime 子进程，发送 JSON-RPC 请求、接收响应和通知，并把子 agent 的会话关系交给 Python 调用者。
- 为什么这样设计：底层 JSON-RPC 客户端需要处理子进程、双向通知、响应关联和退出，但高层 API 不应承担这些字节级细节；把 stdio 协议封装在 client 内，Python 调用者才能专注于会话语义。
- 直接协作者：[python/sdk/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/python/sdk/README.md)、[python/sdk-runtime/src/deepseek_harness_runtime/__init__.py](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/python/sdk-runtime/src/deepseek_harness_runtime/__init__.py)、[python/sdk/src/deepseek_harness/errors.py](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/python/sdk/src/deepseek_harness/errors.py)、[python/sdk/src/deepseek_harness/models.py](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/python/sdk/src/deepseek_harness/models.py)、[python/sdk/src/deepseek_harness/__init__.py](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/python/sdk/src/deepseek_harness/__init__.py)
- 对应测试：间接测试线索（通过本地 import 链，非直接覆盖）：[python/sdk/tests/test_bundled_runtime.py](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/python/sdk/tests/test_bundled_runtime.py)、[python/sdk/tests/test_client.py](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/python/sdk/tests/test_client.py)
- 测试关联依据：固定提交源码中的本地静态 import 传递引用；这些测试通过包入口或中间模块到达本文件，不等于本文件被直接覆盖。
- 阅读顺序：先读客户端运行时契约或呈现模型，再读当前界面文件，沿着 `python/sdk/src/deepseek_harness/__init__.py`、`python/sdk/src/deepseek_harness/api.py` 确认状态如何进入 UI，最后对照 `python/sdk/tests/test_bundled_runtime.py`、`python/sdk/tests/test_client.py`。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 557 行；扫描到的声明包括 `HarnessConfig`、`HarnessClient`、`__init__`、`__enter__`、`__exit__`、`start`、`close`、`initialize`。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [python/sdk/src/deepseek_harness/errors.py](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/python/sdk/src/deepseek_harness/errors.py)

- 所属层：Python SDK 或运行时支持
- 文件角色：错误模型
- 这个文件有什么用：这个文件统一错误的类型、名称或转换方式。统一错误格式能让日志、用户界面和重试策略看懂同一件事。
- 为什么这样设计：固定提交中扫描到的声明包括 `HarnessError`、`TransportClosedError`、`SdkProtocolError`、`JsonRpcError`、`__init__`；把这些相互关联的声明集中在同一文件，可以让输入、输出和修改边界更容易一起检查。
- 直接协作者：[python/sdk/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/python/sdk/README.md)、[python/sdk/src/deepseek_harness/__init__.py](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/python/sdk/src/deepseek_harness/__init__.py)、[python/sdk/src/deepseek_harness/api.py](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/python/sdk/src/deepseek_harness/api.py)、[python/sdk/src/deepseek_harness/client.py](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/python/sdk/src/deepseek_harness/client.py)
- 对应测试：[python/sdk/tests/test_bundled_runtime.py](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/python/sdk/tests/test_bundled_runtime.py)
- 测试关联依据：固定提交源码中的本地静态 import 直接引用；测试用例直接导入了这个源文件。
- 阅读顺序：先读 `python/sdk` 的 README 和入口，再读当前实现，沿着相关类型、协议或实现和 `python/sdk/src/deepseek_harness/__init__.py`、`python/sdk/src/deepseek_harness/api.py`、`python/sdk/src/deepseek_harness/client.py` 确认输入输出，最后对照 `python/sdk/tests/test_bundled_runtime.py`。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 23 行；扫描到的声明包括 `HarnessError`、`TransportClosedError`、`SdkProtocolError`、`JsonRpcError`、`__init__`。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [python/sdk/src/deepseek_harness/models.py](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/python/sdk/src/deepseek_harness/models.py)

- 所属层：Python SDK 或运行时支持
- 文件角色：Python SDK 协议数据模型
- 这个文件有什么用：它定义 SDK 与 Harness runtime 之间的 JSON 值、通知、入站请求和 initialize 响应模型，让协议边界的字段形状可以被复用和校验。
- 为什么这样设计：通知、入站请求和 initialize 响应是 Python 与 runtime 共同遵守的协议数据；集中建模让字段形状可复用和校验，也避免高层 API 在每个分支中重复解包。
- 直接协作者：[python/sdk/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/python/sdk/README.md)、[python/sdk/src/deepseek_harness/__init__.py](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/python/sdk/src/deepseek_harness/__init__.py)、[python/sdk/src/deepseek_harness/api.py](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/python/sdk/src/deepseek_harness/api.py)、[python/sdk/src/deepseek_harness/client.py](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/python/sdk/src/deepseek_harness/client.py)
- 对应测试：间接测试线索（通过本地 import 链，非直接覆盖）：[python/sdk/tests/test_bundled_runtime.py](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/python/sdk/tests/test_bundled_runtime.py)、[python/sdk/tests/test_client.py](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/python/sdk/tests/test_client.py)
- 测试关联依据：固定提交源码中的本地静态 import 传递引用；这些测试通过包入口或中间模块到达本文件，不等于本文件被直接覆盖。
- 阅读顺序：先读 `python/sdk` 的 README 和入口，再读当前实现，沿着相关类型、协议或实现和 `python/sdk/src/deepseek_harness/__init__.py`、`python/sdk/src/deepseek_harness/api.py`、`python/sdk/src/deepseek_harness/client.py` 确认输入输出，最后对照 `python/sdk/tests/test_bundled_runtime.py`、`python/sdk/tests/test_client.py`。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 32 行；扫描到的声明包括 `Notification`、`IncomingRequest`、`ServerInfo`、`InitializeResponse`。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [python/sdk/tests/manual_sdk_agent_smoke.py](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/python/sdk/tests/manual_sdk_agent_smoke.py)

- 所属层：Python SDK 或运行时支持
- 文件角色：手动 SDK Smoke Test
- 这个文件有什么用：它是需要显式运行的 Python SDK 手动 smoke test，不由 pytest 自动收集，用来检查真实 runtime carrier、turn 和最终回答链路。
- 为什么这样设计：真实 runtime carrier 和环境配置并非所有 CI 都具备，因此这个 smoke test 明确选择手动运行而不伪装成普通单测；它保留一条真实集成入口，同时让自动测试的前置条件透明。
- 直接协作者：[python/sdk/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/python/sdk/README.md)、[python/sdk-runtime/src/deepseek_harness_runtime/__init__.py](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/python/sdk-runtime/src/deepseek_harness_runtime/__init__.py)、[python/sdk/src/deepseek_harness/__init__.py](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/python/sdk/src/deepseek_harness/__init__.py)
- 对应测试：没有发现直接使用本支持文件的测试用例。
- 测试关联依据：本文件按路径分类为测试支持，固定提交中没有发现测试用例对它的直接相对 import。
- 阅读顺序：先读 `python/sdk` 的 README 和入口，再读当前实现，沿着 `python/sdk-runtime/src/deepseek_harness_runtime/__init__.py`、`python/sdk/src/deepseek_harness/__init__.py` 和所在包的入口或服务确认输入输出，最后对照同包中与它同名或覆盖相近场景的测试。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 115 行；扫描到的声明包括 `MockCompletionHandler`、`do_POST`、`log_message`、`run_smoke`、`main`。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [python/sdk/tests/test_bundled_runtime.py](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/python/sdk/tests/test_bundled_runtime.py)

- 所属层：Python SDK 或运行时支持
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查 Python 支持、运行时的具体场景，包括“test_bundled_runtime_boots_a_cordis_config”、“test_python_sdk_boots_minimal_jsonrpc_config”、“test_bundled_runtime_surfaces_unbundled_plugin_failure”、“test_zero_config_run_injects_bundled_default_cordis_config”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“test_bundled_runtime_boots_a_cordis_config”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 直接协作者：[python/sdk/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/python/sdk/README.md)、[python/sdk-runtime/src/deepseek_harness_runtime/__init__.py](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/python/sdk-runtime/src/deepseek_harness_runtime/__init__.py)、[python/sdk/src/deepseek_harness/__init__.py](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/python/sdk/src/deepseek_harness/__init__.py)、[python/sdk/src/deepseek_harness/errors.py](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/python/sdk/src/deepseek_harness/errors.py)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `python/sdk-runtime/src/deepseek_harness_runtime/__init__.py`、`python/sdk/src/deepseek_harness/__init__.py`、`python/sdk/src/deepseek_harness/errors.py`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 148 行；扫描到的声明包括 `_launch_args`、`_client`、`test_bundled_runtime_boots_a_cordis_config`、`test_python_sdk_boots_minimal_jsonrpc_config`、`test_bundled_runtime_surfaces_unbundled_plugin_failure`、`test_zero_config_run_injects_bundled_default_cordis_config`。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [python/sdk/tests/test_client.py](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/python/sdk/tests/test_client.py)

- 所属层：Python SDK 或运行时支持
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查 Python 支持、浏览器端的具体场景，包括“test_high_level_sdk_runs_turn_and_collects_final_response”、“test_session_run_invokes_notification_callback_before_returning”、“test_high_level_sdk_rejects_turn_end_without_reason_kind”、“test_relative_cwd_is_absolute_in_process_environment_and_wire”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“test_high_level_sdk_runs_turn_and_collects_final_response”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 直接协作者：[python/sdk/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/python/sdk/README.md)、[python/sdk/src/deepseek_harness/__init__.py](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/python/sdk/src/deepseek_harness/__init__.py)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `python/sdk/src/deepseek_harness/__init__.py`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 1001 行；扫描到的声明包括 `test_high_level_sdk_runs_turn_and_collects_final_response`、`test_session_run_invokes_notification_callback_before_returning`、`test_high_level_sdk_rejects_turn_end_without_reason_kind`、`test_relative_cwd_is_absolute_in_process_environment_and_wire`、`test_session_run_includes_subagent_finished_for_parent_session`、`test_session_run_collects_nested_subagent_tree_without_polluting_root_events`、`test_session_run_ignores_notifications_for_other_sessions`、`test_high_level_session_run_does_not_accumulate_global_notifications`。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [python/sdk/tests/test_macos_deployment_target.py](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/python/sdk/tests/test_macos_deployment_target.py)

- 所属层：Python SDK 或运行时支持
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查 Python 支持的具体场景，包括“test_otool_parser_uses_the_newest_macho_slice”、“test_otool_parser_requires_a_deployment_target”、“test_wheel_tag_rejects_a_newer_executable_target”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“test_otool_parser_uses_the_newest_macho_slice”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 直接协作者：[python/sdk/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/python/sdk/README.md)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看源码中与它对应的被测实现或契约相关类型、协议或实现，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 37 行；扫描到的声明包括 `test_otool_parser_uses_the_newest_macho_slice`、`test_otool_parser_requires_a_deployment_target`、`test_wheel_tag_rejects_a_newer_executable_target`。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [python/sdk/tests/test_release_version.py](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/python/sdk/tests/test_release_version.py)

- 所属层：Python SDK 或运行时支持
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查 Python 支持的具体场景，包括“test_repository_version_matches_root_package_json”、“test_release_tag_is_optional_for_non_release_builds”、“test_release_tag_must_match_repository_version”、“test_repository_version_accepts_a_prerelease”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“test_repository_version_matches_root_package_json”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 直接协作者：[python/sdk/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/python/sdk/README.md)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看源码中与它对应的被测实现或契约相关类型、协议或实现，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 115 行；扫描到的声明包括 `test_repository_version_matches_root_package_json`、`test_release_tag_is_optional_for_non_release_builds`、`test_release_tag_must_match_repository_version`、`test_repository_version_accepts_a_prerelease`、`test_repository_version_rejects_malformed_versions`、`test_pep440_version_spells_a_prerelease_the_python_way`、`test_macos_wheel_tag_does_not_claim_unsupported_node_platforms`、`test_platform_manifest_rejects_incomplete_entries`。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [python/sdk/tests/test_runtime_resolution.py](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/python/sdk/tests/test_runtime_resolution.py)

- 所属层：Python SDK 或运行时支持
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查 Python 支持、运行时的具体场景，包括“test_default_config_is_shipped_with_the_package”、“test_unknown_explicit_mode_fails_loud”、“test_unknown_env_mode_fails_loud”、“test_explicit_mode_wins_over_env_mode”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“test_default_config_is_shipped_with_the_package”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 直接协作者：[python/sdk/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/python/sdk/README.md)、[python/sdk-runtime/src/deepseek_harness_runtime/__init__.py](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/python/sdk-runtime/src/deepseek_harness_runtime/__init__.py)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看它直接导入的被测实现 `python/sdk-runtime/src/deepseek_harness_runtime/__init__.py`，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 61 行；扫描到的声明包括 `test_default_config_is_shipped_with_the_package`、`test_unknown_explicit_mode_fails_loud`、`test_unknown_env_mode_fails_loud`、`test_explicit_mode_wins_over_env_mode`、`test_runtime_requires_spawn_helper_only_on_macos`。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。

### [python/sdk/tests/test_smoke_model.py](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/python/sdk/tests/test_smoke_model.py)

- 所属层：Python SDK 或运行时支持
- 文件角色：测试用例
- 这个文件有什么用：它用自动化测试检查 Python 支持的具体场景，包括“test_child_prompt_precedes_runtime_context”；这些断言把“应该发生什么”变成可以重复运行的证据。
- 为什么这样设计：把测试主题“test_child_prompt_precedes_runtime_context”写成独立测试用例，读者可以从输入、触发动作和断言反推实现的不变量；不同回归问题也不会互相遮蔽。
- 直接协作者：[python/sdk/README.md](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/python/sdk/README.md)
- 对应测试：本文件本身就是测试用例。
- 测试关联依据：本文件本身就是测试用例，不把同目录的其他测试冒充成它的“对应测试”。
- 阅读顺序：先看源码中与它对应的被测实现或契约相关类型、协议或实现，再读本文件的测试主题、输入和断言；最后对照测试支持和失败输出。自动索引只提供定位线索，复杂行为需要回到源码和测试确认。
- 代码证据：固定提交归档实际读取结果：约 32 行；扫描到的声明包括 `test_child_prompt_precedes_runtime_context`。 这些数字和声明用于定位，不替代源码阅读。
- 固定版本：源码链接固定到官方提交 `47f943859bef60e4160492346772ded9b24f765a`；如果当前条目与运行版本不同，应先重新生成索引再下结论。
