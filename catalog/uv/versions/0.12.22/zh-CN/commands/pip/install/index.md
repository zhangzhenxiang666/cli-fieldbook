---
title: uv pip install
command:
  - pip
  - install
---

## 简介

向环境安装包。

`uv pip install` 解析并安装指定的包及其依赖，支持命令行包名、requirements 文件与 editable 安装。默认只做满足需求所需的最小改动，不移除环境中已有的多余包；需要"精确同步并移除多余包"时传入 `--exact` 或改用 [uv pip sync](cli:command:pip/sync)。默认要求在 venv 中安装。该子命令对应 pip 的 `install`，但不支持 `--user` 等参数，见下文"差异与兼容性"。

## 参数

### `package`

格式：`[PACKAGE]...`。要安装的包，可多个；包的顺序决定解析优先级。与 `--requirements`、`--editable`、`--group` 同属必需的 `sources` 参数组：至少提供其中之一，且可以同时组合使用（例如同时传包名、`-r` 文件与 `-e` 路径）。

## 选项

### `--help`

短旗标 `-h`。显示 `uv pip install` 的帮助。

### `--requirements`

短旗标 `-r`。格式：`--requirements <REQUIREMENTS>`。安装给定文件中列出的包，可多次传入。支持 `requirements.txt`、带内联元数据的 `.py` 文件、`pylock.toml`、`pyproject.toml`、`setup.py`、`setup.cfg`；提供 `pyproject.toml`、`setup.py` 或 `setup.cfg` 时，uv 会提取对应项目的依赖。传入 `-` 时从 stdin 读取。别名 `--requirement`；与 `package`、`--editable`、`--group` 同属必需的 `sources` 参数组。

### `--editable`

短旗标 `-e`。格式：`--editable <EDITABLE>`。以 editable 方式安装给定本地路径上的包，可多次传入。与 `package`、`--requirements`、`--group` 同属必需的 `sources` 参数组。

### `--no-editable`

把全部 editable 依赖按非 editable 方式安装。对应环境变量 `UV_NO_EDITABLE`。

### `--no-editable-package`

格式：`--no-editable-package <NO_EDITABLE_PACKAGE>`。把指定的 editable 包按非 editable 方式安装，可多次传入。

### `--constraints`

短旗标 `-c`。格式：`--constraints <CONSTRAINTS>`。用给定 requirements 文件约束版本：只限制需求安装到的版本，把包列进约束文件并不会触发它的安装。等价 pip 的 `--constraint` 选项，别名 `--constraint`，可多次传入。对应环境变量 `UV_CONSTRAINT`。

### `--overrides`

格式：`--overrides <OVERRIDES>`。用给定 requirements 文件覆盖版本：强制某个需求按指定版本解析，无视各组成包声明的依赖，也不考虑该结果是否会被视为无效解析。约束是"叠加"（与各包依赖合并），覆盖是"整体替换"。别名 `--override`；对应环境变量 `UV_OVERRIDE`。

### `--excludes`

格式：`--excludes <EXCLUDES>`。用给定 requirements 文件排除包：被排除的包不会出现在依赖列表中，其自身依赖在解析阶段被忽略。排除是无条件的——版本说明符与环境标记都被忽略，文件中列出的包在所有解析环境中都会被省略。别名 `--exclude`；对应环境变量 `UV_EXCLUDE`。

### `--build-constraints`

短旗标 `-b`。格式：`--build-constraints <BUILD_CONSTRAINTS>`。构建 sdist 时用给定 requirements 文件约束构建依赖，语义同 `--constraints`。别名 `--build-constraint`；对应环境变量 `UV_BUILD_CONSTRAINT`。

### `--extra`

格式：`--extra <EXTRA>`。包含指定 extra 名称的可选依赖，可多次传入；仅作用于 `pylock.toml`、`pyproject.toml`、`setup.py`、`setup.cfg` 源。与 `--all-extras` 互斥。

### `--all-extras`

包含全部可选依赖；仅作用于 `pylock.toml`、`pyproject.toml`、`setup.py`、`setup.cfg` 源。与 `--extra` 互斥。

### `--no-all-extras`

`--all-extras` 的反义项，二者互相覆盖。该选项在帮助中隐藏。

### `--group`

格式：`--group <GROUP>`。安装 `pylock.toml` 或 `pyproject.toml` 中指定的依赖组；未提供路径时使用工作目录中的 `pylock.toml` 或 `pyproject.toml`。可多次传入；与 `package`、`--requirements`、`--editable` 同属必需的 `sources` 参数组。

### `--no-deps`

忽略包依赖，只安装命令行或 requirements 文件中明确列出的包。

### `--deps`

`--no-deps` 的反义项。该选项在帮助中隐藏。

### `--python`

短旗标 `-p`。格式：`--python <PYTHON>`。安装包所用的 Python 解释器。默认安装要求在 venv 中进行；可以改为指向其他 Python，但仅建议在 CI 环境这样做并须谨慎使用，因为这可能修改系统 Python 安装。对应环境变量 `UV_PYTHON`。

### `--system`

安装到系统 Python 环境。默认安装到当前目录或父目录中的 venv；`--system` 指示 uv 改用系统 `PATH` 中找到的第一个 Python。该选项面向 CI 环境，可能修改系统 Python 安装，须谨慎使用。对应环境变量 `UV_SYSTEM_PYTHON`。

### `--no-system`

`--system` 的反义项。该选项在帮助中隐藏。

### `--break-system-packages`

允许 uv 修改标记为 `EXTERNALLY-MANAGED` 的 Python 安装。面向在 CI 中安装由外部包管理器（如 `apt`）管理的 Python 的场景；这类安装明确不建议被其他包管理器修改，须谨慎使用。对应环境变量 `UV_BREAK_SYSTEM_PACKAGES`。

### `--no-break-system-packages`

`--break-system-packages` 的反义项，二者互相覆盖。

### `--target`

短旗标 `-t`。格式：`--target <TARGET>`。把包安装到指定目录的顶层，而不是 venv 或系统 Python 环境。与其他安装操作不同，此时不需要发现已有的 Python 环境，只搜索一个用于解析的解释器；找不到合适解释器时 uv 会下载一个，可用 `--no-python-downloads` 禁用。与 `--prefix` 互斥。

### `--prefix`

格式：`--prefix <PREFIX>`。把包安装到指定目录下的 `lib`、`bin` 等顶层子目录，如同该位置存在一个 venv。一般建议改用 `--python` 安装到备选环境：经 `--prefix` 安装的脚本等产物会引用执行安装的解释器，而非 `--prefix` 目录中的解释器，可移植性差。此时不需要发现已有环境，找不到解析用解释器时 uv 会下载一个。与 `--target` 互斥。

### `--no-build`

不构建 sdist。启用后复用此前构建 sdist 得到的缓存 wheel，但需要构建 sdist 的操作会报错退出；editable 需求仍可能被构建，其构建后端可能执行任意 Python 代码。等价于 `--only-binary :all:`，与 `--no-binary`、`--only-binary` 互斥。

### `--build`

`--no-build` 的反义项。该选项在帮助中隐藏。

### `--no-binary`

格式：`--no-binary <NO_BINARY>`。不安装预构建 wheel，给定包将从源码构建并安装；解析器仍会用预构建 wheel 提取包元数据（如果可用）。可多次传入；`:all:` 对全部包生效，`:none:` 清空此前的设置。与 `--no-build` 互斥。

### `--only-binary`

格式：`--only-binary <ONLY_BINARY>`。只用预构建 wheel、不构建 sdist。启用后复用缓存 wheel，需要为给定包构建 sdist 时报错退出；editable 需求仍可能被构建，其构建后端可能执行任意 Python 代码。`:all:`、`:none:` 语义同 `--no-binary`。与 `--no-build` 互斥。

### `--python-version`

格式：`--python-version <PYTHON_VERSION>`。requirements 须支持的最低 Python 版本，如 `3.7` 或 `3.7.9`；省略补丁版本号时按最低补丁处理（`3.7` 视为 `3.7.0`）。

### `--python-platform`

格式：`--python-platform <PYTHON_PLATFORM>`。安装面向的平台，用 target triple 表示，如 `x86_64-unknown-linux-gnu` 或 `aarch64-apple-darwin`。macOS（Darwin）与 iOS 默认最低版本 `13.0`（可用 `MACOSX_DEPLOYMENT_TARGET`、`IPHONEOS_DEPLOYMENT_TARGET` 指定其他值），Android 默认最低 API 级别 `24`（可用 `ANDROID_API_LEVEL` 指定）。警告：启用后选择的 wheel 只保证兼容目标平台，可能与当前平台不兼容；从源码构建的分发则为当前平台构建、可能与目标平台不兼容。该选项面向高级场景。

### `--inexact`

不移除环境中已有的多余包。该选项在帮助中隐藏；别名 `--no-exact`。

### `--exact`

执行精确同步，移除多余包。默认安装只做满足需求所需的最小改动；启用后 uv 会更新环境使其与需求完全一致，移除未包含在需求中的包。

### `--strict`

安装完成后校验 Python 环境，检测缺失依赖或其他问题的包。

### `--no-strict`

`--strict` 的反义项。该选项在帮助中隐藏。

### `--dry-run`

试运行：不实际安装任何内容，只解析依赖并打印将执行的计划。

### `--check`

不修改环境，检查环境是否满足 requirements。解析并报告需要的变更，需要变更时以退出码 1 结束。与 `--dry-run` 互斥。

### `--output-format`

格式：`--output-format <OUTPUT_FORMAT>`。选择输出格式，取值 `text` 或 `json`，默认 `text`。JSON 写入 stdout，诊断信息写入 stderr；JSON schema 为实验性内容，可能无预告变化。

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

短旗标 `-U`。允许升级全部包，忽略已有输出文件中锁定的版本。隐含 `--refresh`。

### `--no-upgrade`

`--upgrade` 的反义项。该选项在帮助中隐藏。

### `--upgrade-package`

短旗标 `-P`。格式：`--upgrade-package <UPGRADE_PACKAGE>`。允许指定包升级，忽略已有输出文件中锁定的版本。隐含 `--refresh-package`。

### `--upgrade-group`

格式：`--upgrade-group <UPGRADE_GROUP>`。允许依赖组内的全部包升级，忽略已有输出文件中锁定的版本。

### `--reinstall`

重装全部包，无论是否已安装。隐含 `--refresh`。别名 `--force-reinstall`。

### `--no-reinstall`

`--reinstall` 的反义项。该选项在帮助中隐藏。

### `--reinstall-package`

格式：`--reinstall-package <REINSTALL_PACKAGE>`。重装指定包，无论是否已安装。隐含 `--refresh-package`，可多次传入。

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

格式：`--link-mode <LINK_MODE>`。从全局缓存安装包使用的链接方式，默认 macOS 与 Linux 为 `clone`（写时复制）、Windows 为 `hardlink`。慎用 symlink：它使缓存与目标环境强耦合，清理缓存（`uv cache clean`）会破坏已安装的包。对应环境变量 `UV_LINK_MODE`。

### `--compile-bytecode`

安装后把 Python 文件编译为字节码（`__pycache__/*.pyc`）。默认不编译、首次导入时惰性编译；对启动时间敏感的场景（CLI 应用、Docker 容器）可用更长的安装时间换取更快的启动。别名 `--compile`。对应环境变量 `UV_COMPILE_BYTECODE`。

### `--no-compile-bytecode`

`--compile-bytecode` 的反义项。别名 `--no-compile`。该选项在帮助中隐藏。

### `--no-sources`

解析时忽略 `tool.uv.sources` 表，按符合标准、可发布的包元数据处理，而不使用 workspace、Git、URL 或本地路径来源。对应环境变量 `UV_NO_SOURCES`。

### `--no-sources-package`

格式：`--no-sources-package <NO_SOURCES_PACKAGE>`。对指定包不使用 `tool.uv.sources` 表中的来源，可多次传入。

### `--refresh`

刷新全部缓存数据。

### `--no-refresh`

`--refresh` 的反义项。该选项在帮助中隐藏。

### `--refresh-package`

格式：`--refresh-package <REFRESH_PACKAGE>`。只刷新指定包的缓存数据，可多次传入。

### `--require-hashes`

要求每个 requirement 都有匹配的哈希。默认校验 requirements 文件中已有的哈希，但不要求所有需求都带哈希；启用后所有需求必须带哈希，且必须精确固定版本（如 `==1.0.0`）或使用直接 URL。此模式额外限制：不支持 Git 依赖、editable 安装，以及指向目录的本地依赖（须指向具体 wheel 或 `.zip`、`.tar.gz` 等源码归档）。对应环境变量 `UV_REQUIRE_HASHES`。

### `--no-require-hashes`

`--require-hashes` 的反义项。该选项在帮助中隐藏。

### `--verify-hashes`

`--no-verify-hashes` 的反义项，即默认行为。该选项在帮助中隐藏。

### `--no-verify-hashes`

禁用 requirements 文件中的哈希校验。默认校验已有哈希但不强制存在；要强制哈希校验请改用 `--require-hashes`。对应环境变量 `UV_NO_VERIFY_HASHES`。

### `--disable-pip-version-check`

pip 兼容选项：无效果，uv 仅发出警告。该选项在帮助中隐藏。

### `--user`

pip 兼容选项：不受支持，传入时 uv 直接报错（请改用 venv）。与 pip 不同，uv 的安装总是面向 venv 或显式指定的解释器环境，没有用户目录安装模式。

## 环境变量

常用映射：`UV_PYTHON`、`UV_SYSTEM_PYTHON`、`UV_BREAK_SYSTEM_PACKAGES`、`UV_NO_EDITABLE`、`UV_CONSTRAINT`、`UV_OVERRIDE`、`UV_EXCLUDE`、`UV_BUILD_CONSTRAINT`、`UV_INDEX`、`UV_DEFAULT_INDEX`、`UV_INDEX_URL`、`UV_EXTRA_INDEX_URL`、`UV_FIND_LINKS`、`UV_INDEX_STRATEGY`、`UV_KEYRING_PROVIDER`、`UV_RESOLUTION`、`UV_PRERELEASE`、`UV_FORK_STRATEGY`、`UV_TORCH_BACKEND`、`UV_NO_BUILD_ISOLATION`、`UV_EXCLUDE_NEWER`、`UV_LINK_MODE`、`UV_COMPILE_BYTECODE`、`UV_NO_SOURCES`、`UV_REQUIRE_HASHES`、`UV_NO_VERIFY_HASHES`。

## 差异与兼容性

- `--user` 不受支持：传入即报错，uv 建议改用 venv；uv 没有 pip 的用户目录安装模式。
- `--disable-pip-version-check` 仅为兼容保留，无效果，uv 仅发出警告。
- uv 不读取 `pip.conf` 与 `PIP_*` 环境变量，改用 `UV_*` 环境变量与 `uv.toml`。
- 与 pip 不同，uv 默认按 PEP 517 做构建隔离；接口整体差异另见 [pip 接口](../../../concepts/pip-interface.md)。

## 使用提醒

- 默认要求在 venv 中安装；`--system`、`--break-system-packages`、非 venv 的 `--python` 都可能修改系统 Python，主要面向 CI，须谨慎使用。
- `package`、`--requirements`、`--editable`、`--group` 同属必需的 `sources` 参数组，至少提供其一，可组合使用。
- 默认不移除环境中的多余包；需要精确一致的环境时传入 `--exact`，或改用 [uv pip sync](cli:command:pip/sync)。

## 示例

安装一个包及其依赖：

```console
$ uv pip install "flask>=3"
```

从 requirements 文件安装，并把本地项目以 editable 方式加入：

```console
$ uv pip install -r requirements.txt -e .
```

以上示例为说明性内容，未实际运行。

## 源码补充

参数定义于 `PipInstallArgs`，共享选项见 `IndexArgs`、`ResolverInstallerArgs`、`RefreshArgs`、`HashCheckingArgs`（[crates/uv-cli/src/lib.rs](https://github.com/astral-sh/uv/blob/70fe1196a546e49148a73b1c592b2f74c33af80e/crates/uv-cli/src/lib.rs)）；pip 兼容选项及警告、报错语义见 `PipInstallCompatArgs`（[crates/uv-cli/src/compat.rs](https://github.com/astral-sh/uv/blob/70fe1196a546e49148a73b1c592b2f74c33af80e/crates/uv-cli/src/compat.rs)）。
