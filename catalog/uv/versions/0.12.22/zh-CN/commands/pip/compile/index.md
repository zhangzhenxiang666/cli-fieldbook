---
title: uv pip compile
command:
  - pip
  - compile
---

## 简介

将 `requirements.in` 编译为 `requirements.txt` 或 `pylock.toml`。

`uv pip compile` 解析输入文件的全部传递依赖，输出一份带精确版本锁定的清单，通常配合 [uv pip sync](cli:command:pip/sync) 或 [uv pip install](cli:command:pip/install) 使用。命令只做解析与写出，不安装任何包。输出文件已存在时，其中的现有版本会作为解析偏好被优先沿用，除非传入 `--upgrade`。该子命令对应 pip-tools 的 `pip-compile`，接口与行为存在若干差异，见下文"差异与兼容性"。

## 参数

### `src_file`

格式：`[SRC_FILE]...`。要编译的源文件，可多个。支持 `requirements.txt`、带内联元数据的 `.py` 文件、`pylock.toml`、`pyproject.toml`、`setup.py`、`setup.cfg`；提供 `pyproject.toml`、`setup.py` 或 `setup.cfg` 时，uv 会提取对应项目的依赖。传入 `-` 时从 stdin 读取。文件顺序与其中依赖的顺序共同决定解析优先级。与 `--group` 同属必需的 `sources` 参数组，至少提供其一。

## 选项

### `--help`

短旗标 `-h`。显示 `uv pip compile` 的帮助。

### `--constraints`

短旗标 `-c`。格式：`--constraints <CONSTRAINTS>`。用给定 requirements 文件约束版本：只限制需求解析到的版本，把包列进约束文件并不会触发它的安装。等价 pip 的 `--constraint` 选项，别名 `--constraint`，可多次传入。对应环境变量 `UV_CONSTRAINT`。

### `--overrides`

格式：`--overrides <OVERRIDES>`。用给定 requirements 文件覆盖版本：强制某个需求按指定版本解析，无视各组成包声明的依赖，也不考虑该结果是否会被视为无效解析。约束是"叠加"（与各包依赖合并），覆盖是"整体替换"。别名 `--override`；对应环境变量 `UV_OVERRIDE`。

### `--excludes`

格式：`--excludes <EXCLUDES>`。用给定 requirements 文件排除包：被排除的包不会出现在依赖列表中，其自身依赖在解析阶段被忽略。排除是无条件的——版本说明符与环境标记都被忽略，文件中列出的包在所有解析环境中都会被省略。别名 `--exclude`；对应环境变量 `UV_EXCLUDE`。

### `--build-constraints`

短旗标 `-b`。格式：`--build-constraints <BUILD_CONSTRAINTS>`。构建 sdist 时用给定 requirements 文件约束构建依赖，语义同 `--constraints`。别名 `--build-constraint`；对应环境变量 `UV_BUILD_CONSTRAINT`。

### `--extra`

格式：`--extra <EXTRA>`。包含指定 extra 名称的可选依赖，可多次传入；仅作用于 `pyproject.toml`、`setup.py`、`setup.cfg` 源。与 `--all-extras` 互斥。

### `--all-extras`

包含全部可选依赖；仅作用于 `pyproject.toml`、`setup.py`、`setup.cfg` 源。与 `--extra` 互斥。

### `--no-all-extras`

`--all-extras` 的反义项，二者互相覆盖。该选项在帮助中隐藏。

### `--group`

格式：`--group <GROUP>`。编译 `pyproject.toml` 中指定的依赖组；未提供路径时使用工作目录中的 `pyproject.toml`。可多次传入；与 `src_file` 同属必需的 `sources` 参数组。

### `--no-deps`

忽略包依赖，只把命令行中明确列出的包写入结果 requirements 文件。

### `--deps`

`--no-deps` 的反义项。该选项在帮助中隐藏。

### `--output-file`

短旗标 `-o`。格式：`--output-file <OUTPUT_FILE>`。把编译结果写入给定的 `requirements.txt` 或 `pylock.toml` 文件。文件已存在时，解析会优先沿用其中的现有版本，除非同时传入 `--upgrade`。

### `--format`

格式：`--format <FORMAT>`。输出格式，支持 `requirements.txt` 与 `pylock.toml`（PEP 751）。未指定时按输出文件的扩展名推断，否则默认 `requirements.txt`。

### `--no-strip-extras`

在输出文件中保留 extras。默认剥离 extras，因为 extras 引入的包已作为依赖直接写入输出；用此选项保留 extras 的输出不能再作为 `install`、`sync` 的 constraints 文件使用。

### `--strip-extras`

`--no-strip-extras` 的反义项，即恢复默认的剥离行为。该选项在帮助中隐藏。

### `--no-strip-markers`

在输出文件中保留环境标记。默认剥离标记，因为编译产出的解析结果只保证对目标环境正确。

### `--strip-markers`

`--no-strip-markers` 的反义项。该选项在帮助中隐藏。

### `--no-annotate`

省略输出中标注每个包来源的注释。

### `--annotate`

`--no-annotate` 的反义项。该选项在帮助中隐藏。

### `--no-header`

省略输出文件顶部的注释头。

### `--header`

`--no-header` 的反义项。该选项在帮助中隐藏。

### `--annotation-style`

格式：`--annotation-style <ANNOTATION_STYLE>`。来源注释的风格，默认 `split`。

### `--custom-compile-command`

格式：`--custom-compile-command <CUSTOM_COMPILE_COMMAND>`。写入输出头部的自定义命令文本，用于反映包装 `uv pip compile` 的自定义构建脚本。对应环境变量 `UV_CUSTOM_COMPILE_COMMAND`。

### `--python`

短旗标 `-p`。格式：`--python <PYTHON>`。解析所用的 Python 解释器：没有 wheel 时构建 sdist 提取包元数据需要它；未提供 `--python-version` 时也用它确定默认最低 Python 版本。尊重 `UV_PYTHON`；经环境变量设置时会被 `--python-version` 覆盖。

### `--system`

面向系统 Python 环境解析。默认先使用当前目录或父目录中的 venv，找不到时在 `PATH` 搜索 Python；`--system` 指示 uv 跳过 venv、只在系统路径中搜索。对应环境变量 `UV_SYSTEM_PYTHON`。

### `--no-system`

`--system` 的反义项。该选项在帮助中隐藏。

### `--generate-hashes`

在输出文件中包含每个分发的哈希。

### `--no-generate-hashes`

`--generate-hashes` 的反义项。该选项在帮助中隐藏。

### `--no-build`

不构建 sdist。启用后复用此前构建 sdist 得到的缓存 wheel，但需要构建 sdist 的操作会报错退出；editable 需求仍可能被构建，其构建后端可能执行任意 Python 代码。等价于 `--only-binary :all:`，与 `--no-binary`、`--only-binary` 互斥。

### `--build`

`--no-build` 的反义项。该选项在帮助中隐藏。

### `--no-binary`

格式：`--no-binary <NO_BINARY>`。不安装预构建 wheel，给定包将从源码构建并安装；解析器仍会用预构建 wheel 提取包元数据（如果可用）。可多次传入；`:all:` 对全部包生效，`:none:` 清空此前的设置。与 `--no-build` 互斥。

### `--only-binary`

格式：`--only-binary <ONLY_BINARY>`。只用预构建 wheel、不构建 sdist。启用后复用缓存 wheel，需要为给定包构建 sdist 时报错退出；editable 需求仍可能被构建，其构建后端可能执行任意 Python 代码。`:all:`、`:none:` 语义同 `--no-binary`。与 `--no-build` 互斥。

### `--python-version`

格式：`--python-version <PYTHON_VERSION>`。解析面向的 Python 版本，如 `3.8` 或 `3.8.17`。定义解析结果必须支持的最低 Python 版本；省略补丁版本号时按最低补丁处理（`3.8` 视为 `3.8.0`）。默认取解析所用解释器的版本。

### `--python-platform`

格式：`--python-platform <PYTHON_PLATFORM>`。解析面向的平台，用 target triple 表示，如 `x86_64-unknown-linux-gnu` 或 `aarch64-apple-darwin`。macOS（Darwin）与 iOS 默认最低版本 `13.0`（可用 `MACOSX_DEPLOYMENT_TARGET`、`IPHONEOS_DEPLOYMENT_TARGET` 指定其他值），Android 默认最低 API 级别 `24`（可用 `ANDROID_API_LEVEL` 指定）。

### `--universal`

执行通用解析，尝试生成一份兼容所有操作系统、架构与 Python 实现的输出。当前 Python 版本（或用户提供的 `--python-version`）作为下界，例如 `--universal --python-version 3.7` 面向 Python 3.7 及以上。隐含 `--no-strip-markers`，与 `--python-platform` 互斥。

### `--no-universal`

`--universal` 的反义项。该选项在帮助中隐藏。

### `--no-emit-package`

格式：`--no-emit-package <NO_EMIT_PACKAGE>`。把指定包从输出中省略，其依赖仍会包含在解析结果里。等价 pip-compile 的 `--unsafe-package` 选项，别名相同。

### `--emit-index-url`

在生成的输出文件中写入 `--index-url` 与 `--extra-index-url` 条目。

### `--no-emit-index-url`

`--emit-index-url` 的反义项。该选项在帮助中隐藏。

### `--emit-find-links`

在生成的输出文件中写入 `--find-links` 条目。

### `--no-emit-find-links`

`--emit-find-links` 的反义项。该选项在帮助中隐藏。

### `--emit-build-options`

在生成的输出文件中写入 `--no-binary` 与 `--only-binary` 条目。

### `--no-emit-build-options`

`--emit-build-options` 的反义项。该选项在帮助中隐藏。

### `--emit-marker-expression`

输出一段 marker 表达式，指示这组锁定依赖何时"已知有效"：表达式为真时结果必然正确，为假时结果也未必有错。该选项在帮助中隐藏。

### `--no-emit-marker-expression`

`--emit-marker-expression` 的反义项。该选项在帮助中隐藏。

### `--emit-index-annotation`

在注释中标注解析每个包所用的索引（如 `# from https://pypi.org/simple`）。

### `--no-emit-index-annotation`

`--emit-index-annotation` 的反义项。该选项在帮助中隐藏。

### `--torch-backend`

格式：`--torch-backend <TORCH_BACKEND>`。获取 PyTorch 生态包所用的后端，如 `cpu`、`cu126` 或 `auto`。设置后对这些包忽略已配置的索引 URL，改用对应的 PyTorch 索引；`auto` 依据当前安装的 CUDA 驱动自动选择。预览特性，可能随版本变化。对应环境变量 `UV_TORCH_BACKEND`。

### `--index`

格式：`--index <INDEX>`。除默认索引外使用的索引，接受 PEP 503（simple repository API）兼容的仓库或同构布局的本地目录。多个 `--index` 先传入者优先，且均优先于 `--default-index` 指定的索引。对应环境变量 `UV_INDEX`。

### `--default-index`

格式：`--default-index <DEFAULT_INDEX>`。默认包索引，默认 https://pypi.org/simple 。接受 PEP 503 兼容仓库或同构布局的本地目录，优先级低于全部 `--index`。对应环境变量 `UV_DEFAULT_INDEX`。

### `--index-url`

短旗标 `-i`。格式：`--index-url <INDEX_URL>`。已弃用，改用 `--default-index`。包索引 URL，接受 PEP 503 兼容仓库或同构本地目录，优先级低于全部 `--extra-index-url`。对应环境变量 `UV_INDEX_URL`。

### `--extra-index-url`

格式：`--extra-index-url <EXTRA_INDEX_URL>`。已弃用，改用 `--index`。在 `--index-url` 之外使用的额外索引 URL，接受 PEP 503 兼容仓库或同构本地目录；多个时先传入者优先。对应环境变量 `UV_EXTRA_INDEX_URL`。

### `--find-links`

短旗标 `-f`。格式：`--find-links <FIND_LINKS>`。除注册表索引外查找候选分发的位置：为路径时须是顶层存放 wheel（`.whl`）或 sdist（如 `.tar.gz`、`.zip`）的目录；为 URL 时页面须是符合上述格式的平面链接列表。对应环境变量 `UV_FIND_LINKS`。

### `--no-index`

忽略注册表索引（如 PyPI），仅依赖直接 URL 依赖与 `--find-links` 提供的来源。

### `--upgrade`

短旗标 `-U`。允许升级，忽略既有输出文件中锁定的版本。隐含 `--refresh`。

### `--no-upgrade`

`--upgrade` 的反义项。该选项在帮助中隐藏。

### `--upgrade-package`

短旗标 `-P`。格式：`--upgrade-package <UPGRADE_PACKAGE>`。允许指定包升级，忽略既有输出文件中锁定的版本。隐含 `--refresh-package`。

### `--upgrade-group`

格式：`--upgrade-group <UPGRADE_GROUP>`。允许依赖组内的全部包升级，忽略既有输出文件中锁定的版本。

### `--index-strategy`

格式：`--index-strategy <INDEX_STRATEGY>`。多索引解析策略，默认 `first-index`：对每个包按索引顺序搜索并在首个包含它的索引处停止，以防"依赖混淆"攻击；可改选 `unsafe-first-match` 或 pip 风格的 `unsafe-best-match`。对应环境变量 `UV_INDEX_STRATEGY`。

### `--keyring-provider`

格式：`--keyring-provider <KEYRING_PROVIDER>`。尝试用 `keyring` 为索引 URL 提供认证；当前仅支持 `subprocess`，即调用 `keyring` CLI。默认 `disabled`。对应环境变量 `UV_KEYRING_PROVIDER`。

### `--resolution`

格式：`--resolution <RESOLUTION>`。在某个需求的多个兼容版本间的选择策略，默认 `highest`（选用每个包的最新兼容版本），另可选 `lowest`、`lowest-direct`。对应环境变量 `UV_RESOLUTION`。

### `--prerelease`

格式：`--prerelease <PRERELEASE>`。预发布版本的取舍策略，默认 `if-necessary`：优先稳定候选，仅当全部满足约束的稳定候选都被拒绝后才回退预发布。对应环境变量 `UV_PRERELEASE`。

### `--prerelease-package`

格式：`--prerelease-package <PRERELEASE_PACKAGE>`。对特定包设置预发布策略，接受 `PACKAGE=MODE` 对，`MODE` 为 `--prerelease` 接受的任意值；可对不同包多次传入。

### `--pre`

`--prerelease allow` 的简写。该选项在帮助中隐藏。

### `--fork-strategy`

格式：`--fork-strategy <FORK_STRATEGY>`。跨 Python 版本与平台为一个包选择多版本的策略：默认在各支持的 Python 版本（`requires-python`）上取最新版本并尽量减少跨平台分叉；`fewest` 则最小化每个包被选中的版本数、偏好兼容面更宽的旧版本。对应环境变量 `UV_FORK_STRATEGY`。

### `--config-setting`

短旗标 `-C`。格式：`--config-setting <CONFIG_SETTING>`。传给 PEP 517 构建后端的 `KEY=VALUE` 设置，可多次传入。别名 `--config-settings`。

### `--config-settings-package`

格式：`--config-settings-package <CONFIG_SETTINGS_PACKAGE>`。对特定包传给构建后端的设置，形如 `PACKAGE:KEY=VALUE`，可多次传入。

### `--no-build-isolation`

构建 sdist 时禁用隔离，假定 PEP 518 声明的构建依赖已安装。对应环境变量 `UV_NO_BUILD_ISOLATION`。

### `--build-isolation`

`--no-build-isolation` 的反义项。该选项在帮助中隐藏。

### `--no-build-isolation-package`

格式：`--no-build-isolation-package <NO_BUILD_ISOLATION_PACKAGE>`。对特定包禁用构建隔离，假定其 PEP 518 构建依赖已安装。

### `--exclude-newer`

格式：`--exclude-newer <EXCLUDE_NEWER>`。只考虑给定时间之前上传的候选包；比较对象是每个分发文件上传到索引的时间，而非包版本的发布日期。接受 RFC 3339 时间戳（如 `2006-12-02T02:07:43Z`）、同格式本地日期、友好时长（如 `24 hours`、`30 days`）或 ISO 8601 时长（如 `PT24H`、`P7D`），传 `false` 可禁用。对应环境变量 `UV_EXCLUDE_NEWER`。

### `--exclude-newer-package`

格式：`--exclude-newer-package <EXCLUDE_NEWER_PACKAGE>`。对特定包限制候选上传时间，接受 `PACKAGE=DATE` 对，日期格式同 `--exclude-newer`；可多次传入。

### `--link-mode`

格式：`--link-mode <LINK_MODE>`。从全局缓存安装包（此命令仅在构建 sdist 时涉及）使用的链接方式，默认 macOS 与 Linux 为 `clone`（写时复制）、Windows 为 `hardlink`。慎用 symlink：它使缓存与目标环境强耦合，清理缓存（`uv cache clean`）会破坏已安装的包。对应环境变量 `UV_LINK_MODE`。

### `--no-sources`

解析时忽略 `tool.uv.sources` 表，按符合标准、可发布的包元数据锁定，而不使用 workspace、Git、URL 或本地路径来源。对应环境变量 `UV_NO_SOURCES`。

### `--no-sources-package`

格式：`--no-sources-package <NO_SOURCES_PACKAGE>`。对指定包不使用 `tool.uv.sources` 表中的来源，可多次传入。

### `--refresh`

刷新全部缓存数据。

### `--no-refresh`

`--refresh` 的反义项。该选项在帮助中隐藏。

### `--refresh-package`

格式：`--refresh-package <REFRESH_PACKAGE>`。只刷新指定包的缓存数据，可多次传入。

### `--allow-unsafe`

pip-compile 兼容选项：无效果，uv 仅发出警告（uv 可以安全地锁定 `pip` 等包）。该选项在帮助中隐藏。

### `--no-allow-unsafe`

pip-compile 兼容选项：无效果，uv 仅发出警告。该选项在帮助中隐藏。

### `--reuse-hashes`

pip-compile 兼容选项：不支持，传入时 uv 直接报错（uv 不复用哈希）。该选项在帮助中隐藏。

### `--no-reuse-hashes`

pip-compile 兼容选项：无效果，uv 仅发出警告（uv 不复用哈希）。该选项在帮助中隐藏。

### `--resolver`

格式：`--resolver <RESOLVER>`。pip-compile 兼容选项：`backtracking` 无效果、仅警告（uv 总是回溯）；`legacy` 不支持，传入报错。该选项在帮助中隐藏。

### `--max-rounds`

格式：`--max-rounds <MAX_ROUNDS>`。pip-compile 兼容选项：不支持，传入报错（uv 总是解析至收敛）。该选项在帮助中隐藏。

### `--client-cert`

格式：`--client-cert <CLIENT_CERT>`。pip-compile 兼容选项：不支持，传入报错（uv 不支持专用客户端证书）。该选项在帮助中隐藏。

### `--emit-trusted-host`

pip-compile 兼容选项：不支持，传入报错。该选项在帮助中隐藏。

### `--no-emit-trusted-host`

pip-compile 兼容选项：无效果，uv 仅警告（uv 从不向输出写入 trusted host）。该选项在帮助中隐藏。

### `--config`

格式：`--config <CONFIG>`。pip-compile 兼容选项：不支持，传入报错（uv 不使用 pip-compile 的配置文件）。该选项在帮助中隐藏。

### `--emit-options`

pip-compile 兼容选项：不支持，传入报错；如需把 `--no-binary`/`--only-binary` 写入输出，请改用 `--emit-build-options`。该选项在帮助中隐藏。

### `--no-emit-options`

pip-compile 兼容选项：无效果，uv 仅警告（uv 从不向输出写入 options）。该选项在帮助中隐藏。

### `--pip-args`

格式：`--pip-args <PIP_ARGS>`。pip-compile 兼容选项：不支持，传入报错；请把参数直接传给 uv。该选项在帮助中隐藏。

## 环境变量

常用映射：`UV_PYTHON`、`UV_SYSTEM_PYTHON`、`UV_CONSTRAINT`、`UV_OVERRIDE`、`UV_EXCLUDE`、`UV_BUILD_CONSTRAINT`、`UV_CUSTOM_COMPILE_COMMAND`、`UV_INDEX`、`UV_DEFAULT_INDEX`、`UV_INDEX_URL`、`UV_EXTRA_INDEX_URL`、`UV_FIND_LINKS`、`UV_INDEX_STRATEGY`、`UV_KEYRING_PROVIDER`、`UV_RESOLUTION`、`UV_PRERELEASE`、`UV_FORK_STRATEGY`、`UV_TORCH_BACKEND`、`UV_NO_BUILD_ISOLATION`、`UV_EXCLUDE_NEWER`、`UV_LINK_MODE`、`UV_NO_SOURCES`。

## 差异与兼容性

为兼容 `pip-compile` 保留的选项均为隐藏选项，行为分两类：

- 仅警告、无效果：`--allow-unsafe`、`--no-allow-unsafe`（uv 可安全锁定 `pip` 等包，无需 unsafe 概念）、`--no-reuse-hashes`（uv 不复用哈希）、`--resolver backtracking`（uv 总是回溯）、`--no-emit-trusted-host`、`--no-emit-options`。
- 不支持、直接报错：`--reuse-hashes`、`--resolver legacy`、`--max-rounds`、`--client-cert`、`--emit-trusted-host`、`--config`、`--emit-options`、`--pip-args`。

uv 也不读取 `pip-compile` 的配置文件与 `PIP_*` 环境变量。接口整体差异另见 [pip 接口](../../../concepts/pip-interface.md)。

## 使用提醒

- 该命令只解析并写出清单，不安装任何包；产出交给 [uv pip sync](cli:command:pip/sync) 或 [uv pip install](cli:command:pip/install) 消费。
- 源文件与 `--group` 至少提供其一（`sources` 必需参数组）；源文件传入 `-` 可从 stdin 读取。
- 输出文件已存在时，其中版本会作为解析偏好，除非传入 `--upgrade`。

## 示例

编译一个 requirements 文件：

```console
$ uv pip compile requirements.in -o requirements.txt
```

生成跨平台通用清单并包含哈希：

```console
$ uv pip compile --universal --generate-hashes pyproject.toml
```

以上示例为说明性内容，未实际运行。

## 源码补充

参数定义于 `PipCompileArgs`，共享选项见 `IndexArgs`、`ResolverArgs`、`RefreshArgs`（[crates/uv-cli/src/lib.rs](https://github.com/astral-sh/uv/blob/70fe1196a546e49148a73b1c592b2f74c33af80e/crates/uv-cli/src/lib.rs)）；pip-compile 兼容选项及警告、报错语义见 `PipCompileCompatArgs`（[crates/uv-cli/src/compat.rs](https://github.com/astral-sh/uv/blob/70fe1196a546e49148a73b1c592b2f74c33af80e/crates/uv-cli/src/compat.rs)）。
