---
title: uv tool install
command:
  - tool
  - install
---

## 简介

安装 Python 包提供的命令。

包被安装到 uv 工具目录中一个隔离的 venv 里，其可执行文件链接（Unix）或复制（Windows）到工具可执行目录；可执行目录按 XDG 标准确定，可用 [uv tool dir](cli:command:tool/dir) 的 `--bin` 查看。若工具此前已安装，通常会被替换。未指定版本时安装最新可用版本，也支持 `<package>@<version>` 与 `@latest` 规格。工具机制的背景见 [Tools 概念](../../../concepts/tools.md)。

## 参数

### `package`

格式：`<PACKAGE>`。要从中安装命令的包，可带版本规格（如 `black>=24`、`ruff@0.6.0`、`ruff@latest`）。

## 选项

### `--help`

短旗标 `-h`。显示简明帮助；传入 `--help` 时显示长帮助。

### `--from`

格式：`--from <FROM>`。指定要从中安装命令的包；为与 `uv tool run` 对齐而提供，与位置参数 `<PACKAGE>` 冗余。该选项在帮助中隐藏。

### `--with`

短旗标 `-w`。格式：`--with <WITH>`。在工具环境中附带安装给定包作为依赖，支持版本规格；逗号分隔或多次传入。

### `--with-requirements`

格式：`--with-requirements <WITH_REQUIREMENTS>`。从给定文件读取附带安装的包，支持 `requirements.txt`、带内联元数据的 `.py` 文件与 `pylock.toml`；逗号分隔或多次传入。

### `--editable`

短旗标 `-e`。以 editable 模式安装目标包，使包源码目录中的变更无需重装即可生效。

### `--with-editable`

格式：`--with-editable <WITH_EDITABLE>`。以 editable 模式附带安装给定包（本地目录）。

### `--with-executables-from`

格式：`--with-executables-from <WITH_EXECUTABLES_FROM>`。附带安装给定包，并把其可执行文件一并装入同一工具环境。与 `--with` 的区别：`--with` 只把包作为依赖、不安装其可执行文件。逗号分隔或多次传入。

### `--constraints`

短旗标 `-c`。格式：`--constraints <CONSTRAINTS>`。用给定 requirements 文件约束版本：只限制所安装的版本，不会触发安装。等价于 pip 的 `--constraint` 选项。对应环境变量 `UV_CONSTRAINT`。

### `--overrides`

格式：`--overrides <OVERRIDES>`。用给定 requirements 文件强制覆盖版本：无论依赖各方声明什么需求，一律以覆盖文件为准。约束是叠加合并，覆盖是绝对替换。对应环境变量 `UV_OVERRIDE`。

### `--excludes`

格式：`--excludes <EXCLUDES>`。用给定 requirements 文件从解析中剔除包：被剔除的包从依赖列表中完全省略，其自身依赖也在解析阶段忽略；剔除是无条件的，版本规格与 marker 一律不生效。可多次传入。对应环境变量 `UV_EXCLUDE`。

### `--build-constraints`

短旗标 `-b`。格式：`--build-constraints <BUILD_CONSTRAINTS>`。构建 sdist 时用给定 requirements 文件约束构建依赖，同样只限版本、不触发安装。对应环境变量 `UV_BUILD_CONSTRAINT`。

### `--force`

强制安装：重建工具的既有环境，并替换可执行目录中的同名入口点。默认情况下，uv 不会覆盖并非由 uv 安装的可执行文件（例如 pipx 安装的工具会令安装失败），需要覆盖时使用此选项。

### `--lfs`

从 Git 添加依赖时使用 Git LFS。

### `--python`

短旗标 `-p`。格式：`--python <PYTHON>`。构建工具环境所用的 Python 解释器请求（版本、路径等）。对应环境变量 `UV_PYTHON`。

### `--python-platform`

格式：`--python-platform <PYTHON_PLATFORM>`。面向目标平台（而非当前平台）安装依赖，取值为目标三元组，如 `x86_64-unknown-linux-gnu` 或 `aarch64-apple-darwin`；macOS 默认最低版本 `13.0`（可用 `MACOSX_DEPLOYMENT_TARGET` 调整）。面向高级场景：所选 wheel 可能与当前平台不兼容。

### `--torch-backend`

格式：`--torch-backend <TORCH_BACKEND>`。获取 PyTorch 生态包时使用的后端，如 `cpu`、`cu126` 或 `auto`（按已安装的 CUDA 驱动自动检测）；设置后忽略为这些包配置的索引 URL。预览特性，可能随时变化。对应环境变量 `UV_TORCH_BACKEND`。

### `--index`

格式：`--index <INDEX>`。除默认索引外额外使用的索引，接受 PEP 503 兼容仓库或同构布局的本地目录；可多次传入，先传入者优先，且优先级高于 `--default-index`。对应环境变量 `UV_INDEX`。

### `--default-index`

格式：`--default-index <DEFAULT_INDEX>`。默认包索引，默认 `https://pypi.org/simple`；优先级低于所有经 `--index` 提供的索引。对应环境变量 `UV_DEFAULT_INDEX`。

### `--index-url`

短旗标 `-i`。格式：`--index-url <INDEX_URL>`。默认索引 URL，pip 兼容命名，已弃用，改用 `--default-index`。对应环境变量 `UV_INDEX_URL`。

### `--extra-index-url`

格式：`--extra-index-url <EXTRA_INDEX_URL>`。额外索引 URL，pip 兼容命名，已弃用，改用 `--index`；优先级高于 `--index-url`，可多次传入且先传入者优先。对应环境变量 `UV_EXTRA_INDEX_URL`。

### `--find-links`

短旗标 `-f`。格式：`--find-links <FIND_LINKS>`。除注册表索引外的候选来源：本地目录（顶层放置 wheel 或 sdist 文件）或包含包文件链接列表的页面。对应环境变量 `UV_FIND_LINKS`。

### `--no-index`

忽略注册表索引（如 PyPI），仅依赖直接 URL 依赖与 `--find-links` 提供的来源。

### `--upgrade`

短旗标 `-U`。允许包升级，忽略既有固定版本；蕴含 `--refresh`。

### `--no-upgrade`

禁止包升级，`--upgrade` 的反义项。该选项在帮助中隐藏。

### `--upgrade-package`

短旗标 `-P`。格式：`--upgrade-package <UPGRADE_PACKAGE>`。仅允许给定包升级，忽略既有固定版本；蕴含 `--refresh-package`；可多次传入。

### `--upgrade-group`

格式：`--upgrade-group <UPGRADE_GROUP>`。允许给定依赖组内的所有包升级；可多次传入。

### `--reinstall`

无论是否已安装都重装所有包；别名 `--force-reinstall`；蕴含 `--refresh`。

### `--no-reinstall`

禁止重装，`--reinstall` 的反义项。该选项在帮助中隐藏。

### `--reinstall-package`

格式：`--reinstall-package <REINSTALL_PACKAGE>`。无论是否已安装都重装给定包；蕴含 `--refresh-package`；可多次传入。

### `--index-strategy`

格式：`--index-strategy <INDEX_STRATEGY>`。多索引解析时的策略。默认 `first-index`：使用首个提供该包的索引，并仅在该索引的版本中解析，可防范"依赖混淆"攻击。对应环境变量 `UV_INDEX_STRATEGY`。

### `--keyring-provider`

格式：`--keyring-provider <KEYRING_PROVIDER>`。对索引 URL 尝试使用 `keyring` 认证；目前仅支持 `subprocess`（通过 `keyring` CLI 处理认证），默认 `disabled`。对应环境变量 `UV_KEYRING_PROVIDER`。

### `--resolution`

格式：`--resolution <RESOLUTION>`。在兼容版本之间做选择的策略，如 `highest`、`lowest`、`lowest-direct`；默认 `highest`（最新兼容版本）。对应环境变量 `UV_RESOLUTION`。

### `--prerelease`

格式：`--prerelease <PRERELEASE>`。预发布版本的考虑策略，如 `if-necessary`、`if-necessary-or-explicit`、`explicit`、`disable`；默认 `if-necessary`（仅在全部稳定候选都被约束拒绝后才回退到预发布）。对应环境变量 `UV_PRERELEASE`。

### `--prerelease-package`

格式：`--prerelease-package <PRERELEASE_PACKAGE>`。针对特定包的预发布策略，格式 `PACKAGE=MODE`，`MODE` 为 `--prerelease` 接受的任意值；可对不同包多次传入。

### `--pre`

允许考虑预发布版本的旧式开关。该选项在帮助中隐藏，建议改用 `--prerelease` 明确策略。

### `--fork-strategy`

格式：`--fork-strategy <FORK_STRATEGY>`。跨 Python 版本与平台为同一包选择多个版本的策略。默认为每个受支持的 Python 版本选最新版本，同时尽量减少跨平台的版本数；`fewest` 则最小化每个包的版本总数，可能偏向兼容范围更宽的旧版本。对应环境变量 `UV_FORK_STRATEGY`。

### `--config-setting`

短旗标 `-C`。格式：`--config-setting <CONFIG_SETTING>`。传给 PEP 517 构建后端的设置，`KEY=VALUE` 形式；可多次传入。

### `--config-settings-package`

格式：`--config-settings-package <CONFIG_SETTINGS_PACKAGE>`。针对特定包传给 PEP 517 构建后端的设置，`PACKAGE:KEY=VALUE` 形式；可多次传入。

### `--no-build-isolation`

构建 sdist 时禁用构建隔离，假定 PEP 518 声明的构建依赖已安装。对应环境变量 `UV_NO_BUILD_ISOLATION`。

### `--build-isolation`

启用构建隔离，`--no-build-isolation` 的反义项。该选项在帮助中隐藏。

### `--no-build-isolation-package`

格式：`--no-build-isolation-package <NO_BUILD_ISOLATION_PACKAGE>`。仅对给定包禁用构建隔离，假定其构建依赖已安装；可多次传入。

### `--exclude-newer`

格式：`--exclude-newer <EXCLUDE_NEWER>`。仅考虑给定时间之前上传的候选包，比较对象是每个分发产物自身的上传时间。接受 RFC 3339 时间戳（如 `2006-12-02T02:07:43Z`）、同格式本地日期（如 `2006-12-02`）、友好时长（如 `24 hours`、`1 week`）或 ISO 8601 时长（如 `PT24H`、`P7D`）；传 `false` 禁用。对应环境变量 `UV_EXCLUDE_NEWER`。

### `--exclude-newer-package`

格式：`--exclude-newer-package <EXCLUDE_NEWER_PACKAGE>`。针对特定包的上传时间上限，格式 `PACKAGE=DATE`，日期写法同 `--exclude-newer`；可多次传入。

### `--link-mode`

格式：`--link-mode <LINK_MODE>`。从全局缓存安装包的链接方式；默认 macOS 与 Linux 为 `clone`（写时复制），Windows 为 `hardlink`。不建议 `symlink`：它使缓存与目标环境强耦合，清理缓存（`uv cache clean`）会破坏已安装的包。对应环境变量 `UV_LINK_MODE`。

### `--compile-bytecode`

安装后将 Python 文件编译为字节码（`__pycache__/*.pyc`），以更长的安装时间换取更快的启动，适合 CLI 应用与容器镜像等在意启动时间的场景。默认不编译，首次导入时惰性编译。对应环境变量 `UV_COMPILE_BYTECODE`。

### `--no-compile-bytecode`

不编译字节码，`--compile-bytecode` 的反义项；别名 `--no-compile`。该选项在帮助中隐藏。

### `--no-sources`

解析依赖时忽略 `tool.uv.sources` 表，按标准、可发布的包元数据进行解析，不使用 workspace、Git、URL 或本地路径来源。对应环境变量 `UV_NO_SOURCES`。

### `--no-sources-package`

格式：`--no-sources-package <NO_SOURCES_PACKAGE>`。仅对给定包不使用 `tool.uv.sources` 表中的来源；可多次传入。

### `--no-build`

不构建 sdist：可复用此前构建缓存的 wheel，但需要构建 sdist 的操作会报错退出；第一方包（如 workspace 中的项目）与 editable 需求仍会构建，其后端可能执行任意 Python 代码。对应环境变量 `UV_NO_BUILD`。

### `--build`

允许构建 sdist，`--no-build` 的反义项。该选项在帮助中隐藏。

### `--no-build-package`

格式：`--no-build-package <NO_BUILD_PACKAGE>`。仅对给定包不构建 sdist（第一方包仍会构建）；可多次传入。

### `--no-binary`

不安装预构建 wheel，改为从源码构建并安装；解析器仍可能使用 wheel 提取包元数据。对应环境变量 `UV_NO_BINARY`。

### `--binary`

允许安装预构建 wheel，`--no-binary` 的反义项。该选项在帮助中隐藏。

### `--no-binary-package`

格式：`--no-binary-package <NO_BINARY_PACKAGE>`。仅对给定包不安装预构建 wheel；可多次传入。

### `--refresh`

刷新所有缓存数据。

### `--no-refresh`

不刷新缓存数据，`--refresh` 的反义项。该选项在帮助中隐藏。

### `--refresh-package`

格式：`--refresh-package <REFRESH_PACKAGE>`。仅刷新给定包的缓存数据；可多次传入。

## 环境变量

本命令本地选项对应的主要 `UV_*` 变量：`UV_CONSTRAINT`、`UV_BUILD_CONSTRAINT`、`UV_OVERRIDE`、`UV_EXCLUDE`、`UV_PYTHON`、`UV_TORCH_BACKEND`、`UV_INDEX`、`UV_DEFAULT_INDEX`、`UV_INDEX_URL`、`UV_EXTRA_INDEX_URL`、`UV_FIND_LINKS`、`UV_INDEX_STRATEGY`、`UV_KEYRING_PROVIDER`、`UV_RESOLUTION`、`UV_PRERELEASE`、`UV_FORK_STRATEGY`、`UV_NO_BUILD_ISOLATION`、`UV_EXCLUDE_NEWER`、`UV_LINK_MODE`、`UV_COMPILE_BYTECODE`、`UV_NO_SOURCES`、`UV_NO_BUILD`、`UV_NO_BINARY`。工具目录相关的 `UV_TOOL_DIR`、`UV_TOOL_BIN_DIR` 见 [uv tool dir](cli:command:tool/dir)。全局变量见[根命令](cli:command:)。

## 使用提醒

- 可执行目录不在 `PATH` 上时 uv 会给出警告，可用 [uv tool update-shell](cli:command:tool/update-shell) 修补 shell 配置。
- 每个工具环境绑定特定 Python 版本；该解释器被卸载后工具环境会损坏、工具可能无法运行。
- 升级用 [uv tool upgrade](cli:command:tool/upgrade)，但会保留安装时的版本约束与设置；要替换约束或设置，重新执行 `uv tool install`。
- 依赖包提供的可执行文件不会安装；需要一并安装时用 `--with-executables-from`。
- 多数场景下免安装的 [uv tool run](cli:command:tool/run)（`uvx`）比安装更合适；需要系统级、供其他程序调用时才安装。

## 示例

安装工具及其附带依赖：

```console
$ uv tool install ruff
$ uv tool install --with mkdocs-material mkdocs
```

安装指定版本，或连同相关工具的可执行文件一起安装：

```console
$ uv tool install ruff@0.6.0
$ uv tool install --with-executables-from ansible-core,ansible-lint ansible
```

以上示例为说明性内容，未实际运行。

## 源码补充

命令与专属选项定义于 `ToolCommand::Install`/`ToolInstallArgs`；解析器、索引与构建类选项来自 `ResolverInstallerArgs`、`IndexArgs`、`BuildOptionsArgs`、`RefreshArgs` 等共享组（均见 [crates/uv-cli/src/lib.rs](https://github.com/astral-sh/uv/blob/70fe1196a546e49148a73b1c592b2f74c33af80e/crates/uv-cli/src/lib.rs)）。
