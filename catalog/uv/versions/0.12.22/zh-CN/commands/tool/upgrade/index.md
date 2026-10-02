---
title: uv tool upgrade
command:
  - tool
  - upgrade
---

## 简介

升级已安装的工具。

升级会尊重安装时提供的版本约束：要在约束之外升级，需用 [uv tool install](cli:command:tool/install) 重新安装。安装时的设置同样被保留，例如安装时传了 `--prerelease allow`，升级会继续遵守。即使可执行文件没有变化，升级也会重装它们。别名 `update`。

## 参数

### `name`

格式：`<NAME>...`。要升级的工具名，可附带版本规格；至少提供一个，或改用 `--all`。

## 选项

### `--help`

短旗标 `-h`。显示简明帮助；传入 `--help` 时显示长帮助。

### `--all`

升级全部工具；与 `<NAME>` 互斥。

### `--python`

短旗标 `-p`。格式：`--python <PYTHON>`。为工具环境指定构建所用的 Python 解释器请求（版本、路径等）；配合 `--all` 时作用于全部工具。对应环境变量 `UV_PYTHON`。

### `--python-platform`

格式：`--python-platform <PYTHON_PLATFORM>`。面向目标平台（而非当前平台）解析依赖，取值为目标三元组，如 `x86_64-unknown-linux-gnu` 或 `aarch64-apple-darwin`；macOS 默认最低版本 `13.0`（可用 `MACOSX_DEPLOYMENT_TARGET` 调整）。面向高级场景：所选 wheel 可能与当前平台不兼容。

### `--upgrade`

短旗标 `-U`。允许包升级，忽略既有固定版本；蕴含 `--refresh`。本命令本身即执行升级，该选项在帮助中隐藏。

### `--upgrade-package`

短旗标 `-P`。格式：`--upgrade-package <UPGRADE_PACKAGE>`。仅允许给定包升级，忽略既有固定版本；蕴含 `--refresh-package`；可多次传入。该选项在帮助中隐藏。

### `--upgrade-group`

格式：`--upgrade-group <UPGRADE_GROUP>`。允许给定依赖组内的所有包升级；可多次传入。该选项在帮助中隐藏。

### `--config-setting`

短旗标 `-C`。格式：`--config-setting <CONFIG_SETTING>`。传给 PEP 517 构建后端的设置，`KEY=VALUE` 形式；可多次传入。

### `--config-setting-package`

格式：`--config-setting-package <CONFIG_SETTING_PACKAGE>`。针对特定包传给 PEP 517 构建后端的设置，`PACKAGE:KEY=VALUE` 形式；别名 `--config-settings-package`；可多次传入。

### `--link-mode`

格式：`--link-mode <LINK_MODE>`。从全局缓存安装包的链接方式；默认 macOS 与 Linux 为 `clone`（写时复制），Windows 为 `hardlink`。不建议 `symlink`：它使缓存与目标环境强耦合，清理缓存（`uv cache clean`）会破坏已安装的包。对应环境变量 `UV_LINK_MODE`。

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

### `--reinstall`

无论是否已安装都重装所有包；别名 `--force-reinstall`。升级中需要重装包时使用。

### `--no-reinstall`

禁止重装，`--reinstall` 的反义项。该选项在帮助中隐藏。

### `--reinstall-package`

格式：`--reinstall-package <REINSTALL_PACKAGE>`。无论是否已安装都重装给定包；可多次传入。

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

## 环境变量

本命令本地选项对应的主要 `UV_*` 变量：`UV_PYTHON`、`UV_INDEX`、`UV_DEFAULT_INDEX`、`UV_INDEX_URL`、`UV_EXTRA_INDEX_URL`、`UV_FIND_LINKS`、`UV_INDEX_STRATEGY`、`UV_KEYRING_PROVIDER`、`UV_RESOLUTION`、`UV_PRERELEASE`、`UV_FORK_STRATEGY`、`UV_NO_BUILD_ISOLATION`、`UV_EXCLUDE_NEWER`、`UV_LINK_MODE`、`UV_COMPILE_BYTECODE`、`UV_NO_SOURCES`、`UV_NO_BUILD`、`UV_NO_BINARY`。全局变量见[根命令](cli:command:)。

## 使用提醒

- 升级保留安装时的版本约束与设置；要突破约束（如 `>=23,<24` 之外）或更换设置，重新执行 [uv tool install](cli:command:tool/install)。
- 升级会重装工具的可执行文件，即使它们没有变化；升级过程中重装包用 `--reinstall`/`--reinstall-package`。
- 工具清单与安装时的版本规格可用 [uv tool list](cli:command:tool/list)（`--show-version-specifiers`）查看。

## 示例

升级一个工具，或只升级工具环境中的某个依赖：

```console
$ uv tool upgrade black
$ uv tool upgrade black --upgrade-package click
```

升级全部工具：

```console
$ uv tool upgrade --all
```

以上示例为说明性内容，未实际运行。

## 源码补充

命令与专属选项定义于 `ToolCommand::Upgrade`/`ToolUpgradeArgs`（等价于隐藏了 `--upgrade` 系列并去掉 `--no-upgrade` 的 `ResolverInstallerArgs` 展开），索引与构建类选项来自 `IndexArgs`、`ReinstallArgs`、`VersionSelectionArgs` 等共享组（均见 [crates/uv-cli/src/lib.rs](https://github.com/astral-sh/uv/blob/70fe1196a546e49148a73b1c592b2f74c33af80e/crates/uv-cli/src/lib.rs)）。
