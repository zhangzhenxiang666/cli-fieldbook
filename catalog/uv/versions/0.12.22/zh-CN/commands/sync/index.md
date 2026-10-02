---
title: uv sync
command:
  - sync
---

## 简介

更新[项目](../../concepts/projects.md)的[环境](../../concepts/environments.md)：确保全部项目依赖已安装且与 lockfile 一致。项目虚拟环境（`.venv`）不存在时会创建。

默认执行**精确同步**：uv 会移除环境中未声明为项目依赖的包；用 `--inexact` 保留多余包（若多余包与项目依赖冲突，仍会被移除；使用 `--no-build-isolation` 时 uv 也不会移除多余包，以免误删构建依赖）。

同步前默认会重新锁定项目，除非提供 `--locked` 或 `--frozen`。从 lockfile 安装时，uv 不会对已撤回（yanked）的包版本发出警告。

## 选项

### `--help`

短旗标 `-h`。显示当前命令的简明帮助。传入 `--help` 时显示长帮助。

### `--extra`

格式：`--extra <EXTRA>`。安装指定 extra 的可选依赖，可多次传入或用逗号分隔。注意全部可选依赖始终参与解析，此选项只影响安装的包的选择；若指定的多个 extras 或依赖组出现在 `tool.uv.conflicts` 中，uv 将报错。与 `--all-extras` 互斥。

### `--output-format`

格式：`--output-format <OUTPUT_FORMAT>`。选择输出格式，取值 `text` 或 `json`，默认 `text`。JSON 输出写入 stdout、诊断信息写入 stderr；JSON schema 为实验性，可能无预告变更。

### `--all-extras`

安装全部可选依赖。当两个及以上 extras 在 `tool.uv.conflicts` 中声明为冲突时，使用此旗标总会报错。与 `--extra` 互斥。

### `--no-extra`

格式：`--no-extra <NO_EXTRA>`。在启用了 `--all-extras` 的情况下排除指定的可选依赖，可多次传入。

### `--no-all-extras`

不安装任何可选依赖，`--all-extras` 的反义项。该选项在帮助中隐藏。

### `--editable`

将本以非可编辑方式安装的依赖（包括项目与任何 workspace 成员）以可编辑方式安装。该选项在帮助中隐藏。

### `--no-editable`

将可编辑依赖（包括项目与任何 workspace 成员）以非可编辑方式安装。对应环境变量 `UV_NO_EDITABLE`。

### `--no-editable-package`

格式：`--no-editable-package <NO_EDITABLE_PACKAGE>`。将指定的可编辑包以非可编辑方式安装，可用空格分隔多个包。

### `--inexact`

不移除环境中的多余包：uv 只做满足需求的最小变更。默认 `uv sync` 执行精确同步、移除未声明为依赖的包。别名 `--no-exact`。

### `--exact`

执行精确同步，移除环境中的多余包。这是默认行为。该选项在帮助中隐藏。

### `--active`

把依赖同步到活动虚拟环境：若设置了 `VIRTUAL_ENV` 环境变量，将优先使用活动环境，而非为项目或脚本创建/更新环境。

### `--no-active`

优先使用项目的虚拟环境而非活动环境，这是默认行为。该选项在帮助中隐藏。

### `--no-install-project`

不安装当前项目。对应环境变量 `UV_NO_INSTALL_PROJECT`。默认项目与其全部依赖一起安装；此选项排除项目本身但保留其依赖，适合 Docker 构建等把项目与依赖分层缓存的场景。与 `--only-install-project` 互斥。

### `--only-install-project`

只安装当前项目，排除全部依赖。与 `--no-install-project` 互斥。该选项在帮助中隐藏。

### `--no-install-workspace`

不安装任何 workspace 成员（包括根项目）。对应环境变量 `UV_NO_INSTALL_WORKSPACE`。成员的依赖仍会安装，适合分层缓存；与 `--only-install-workspace` 互斥。

### `--only-install-workspace`

只安装 workspace 成员（包括根项目），排除其他依赖。与 `--no-install-workspace` 互斥。该选项在帮助中隐藏。

### `--no-install-local`

不安装本地路径依赖。对应环境变量 `UV_NO_INSTALL_LOCAL`。跳过当前项目、workspace 成员及其他本地（路径或可编辑）包，只安装远程/索引依赖；适合 Docker 构建中先缓存重型第三方依赖、再单独分层本地包。与 `--only-install-local` 互斥。

### `--only-install-local`

只安装本地路径依赖，排除全部远程依赖。与 `--no-install-local` 互斥。该选项在帮助中隐藏。

### `--no-install-package`

格式：`--no-install-package <NO_INSTALL_PACKAGE>`。不安装指定的包。注意这可能导致环境损坏，应谨慎使用；与 `--only-install-package` 互斥。

### `--only-install-package`

格式：`--only-install-package <ONLY_INSTALL_PACKAGE>`。只安装指定的包，排除其他所有包。与 `--no-install-package` 互斥。该选项在帮助中隐藏。

### `--locked`

断言 `uv.lock` 保持不变。对应环境变量 `UV_LOCKED`。要求 lockfile 是最新的；若 lockfile 缺失或需要更新，uv 将报错退出。与 `--frozen`、`--upgrade` 互斥。

### `--no-locked`

禁用 locked 模式，覆盖 `UV_LOCKED`。该选项在帮助中隐藏。

### `--frozen`

在不更新 `uv.lock` 的情况下同步。对应环境变量 `UV_FROZEN`。不检查 lockfile 是否最新，而是以 lockfile 中的版本为准；lockfile 缺失时报错退出，`pyproject.toml` 中尚未写入 lockfile 的依赖变更不会出现在环境中。与 `--locked`、`--upgrade` 互斥。

### `--no-frozen`

禁用 frozen 模式，覆盖 `UV_FROZEN`。该选项在帮助中隐藏。

### `--dry-run`

试运行：不写 lockfile、不修改项目环境。uv 会解析项目依赖并报告对 lockfile 与项目环境的变更，但都不落盘。

### `--all-packages`

同步 workspace 中的全部包：workspace 环境（`.venv`）会更新为包含全部成员，通过 `--extra`、`--group` 等指定的 extras 与依赖组会应用到所有成员。与 `--package` 互斥。

### `--package`

格式：`--package <PACKAGE>`。针对 workspace 中的特定包同步：环境更新为反映指定成员所声明依赖的子集，可多次传入。任一成员不存在时 uv 报错退出；与 `--all-packages` 互斥。

### `--script`

格式：`--script <SCRIPT>`。为指定的 Python 脚本而非当前项目同步环境：依据脚本 PEP 723 内联元数据表安装依赖。与 `--all-packages`、`--package`、`--no-install-*` 系列及 extras、依赖组选项互斥。

### `--python`

短旗标 `-p`。格式：`--python <PYTHON>`。项目环境使用的 Python 解释器，默认取第一个满足项目 `requires-python` 约束的解释器。若传入的是虚拟环境中的解释器，包不会同步到该环境，而是用它为项目创建虚拟环境。请求格式见 [uv python](cli:command:python)。对应环境变量 `UV_PYTHON`。

### `--python-platform`

格式：`--python-platform <PYTHON_PLATFORM>`。以目标三元组（如 `x86_64-unknown-linux-gnu` 或 `aarch64-apple-darwin`）指定安装依赖所面向的平台。macOS 默认最低版本 `13.0`（可用 `MACOSX_DEPLOYMENT_TARGET` 调整），iOS 默认 `13.0`（`IPHONEOS_DEPLOYMENT_TARGET`），Android 默认 API 级别 24（`ANDROID_API_LEVEL`）。警告：选定的 wheel 面向目标平台，可能与当前平台不兼容；从源码构建的分发则面向当前平台构建。此选项面向高级用例。

### `--check`

检查 Python 环境是否与项目同步。若环境不是最新的，uv 将报错退出。

### `--no-check`

不检查环境是否同步，`--check` 的反义项。该选项在帮助中隐藏。

### `--dev`

包含开发依赖组，`--group dev` 的别名。对应环境变量 `UV_DEV`。仅在项目中可用。该选项在帮助中隐藏。

### `--no-dev`

禁用开发依赖组，`--no-group dev` 的别名；要改为禁用全部默认组见 `--no-default-groups`。对应环境变量 `UV_NO_DEV`。仅在项目中可用。

### `--only-dev`

仅包含开发依赖组，省略项目及其依赖；`--only-group dev` 的别名，隐含 `--no-default-groups`。

### `--group`

格式：`--group <GROUP>`。安装指定依赖组的依赖，可多次传入。若指定的多个 extras 或依赖组出现在 `tool.uv.conflicts` 中，uv 将报错。

### `--no-group`

格式：`--no-group <NO_GROUP>`。禁用指定的依赖组，可多次传入（可用空格分隔）；总是优先于默认组、`--all-groups` 与 `--group`。对应环境变量 `UV_NO_GROUP`。

### `--no-default-groups`

忽略默认依赖组（`tool.uv.default-groups` 中定义的组）；仍可用 `--group` 包含特定组。对应环境变量 `UV_NO_DEFAULT_GROUPS`。

### `--only-group`

格式：`--only-group <ONLY_GROUP>`。仅安装指定依赖组的依赖，省略项目及其依赖；可多次传入，隐含 `--no-default-groups`。

### `--all-groups`

安装全部依赖组的依赖；可用 `--no-group` 排除特定组。

### `--index`

格式：`--index <INDEX>`。在默认索引之外使用的索引，接受 PEP 503 兼容仓库或同构布局的本地目录。多个 `--index` 时先传入者优先，且全部优先于 `--default-index`（默认 PyPI）；可用 `./`、`../`（Unix）区分相对路径与索引名。对应环境变量 `UV_INDEX`。

### `--default-index`

格式：`--default-index <DEFAULT_INDEX>`。默认包索引（默认 `https://pypi.org/simple`），接受 PEP 503 兼容仓库或本地目录；优先级低于所有 `--index`。对应环境变量 `UV_DEFAULT_INDEX`。

### `--index-url`

短旗标 `-i`。格式：`--index-url <INDEX_URL>`。已弃用，改用 `--default-index`。包索引 URL，接受 PEP 503 兼容仓库或本地目录，优先级低于 `--extra-index-url`。对应环境变量 `UV_INDEX_URL`。

### `--extra-index-url`

格式：`--extra-index-url <EXTRA_INDEX_URL>`。已弃用，改用 `--index`。在 `--index-url` 之外使用的额外索引 URL；多次传入时先传入者优先。对应环境变量 `UV_EXTRA_INDEX_URL`。

### `--find-links`

短旗标 `-f`。格式：`--find-links <FIND_LINKS>`。除索引外用于查找候选分发的位置：若为路径，须为顶层含 wheel（`.whl`）或源码分发（如 `.tar.gz`、`.zip`）的目录；若为 URL，页面须为指向这些文件的平面链接列表。对应环境变量 `UV_FIND_LINKS`。

### `--no-index`

忽略注册表索引（如 PyPI），仅依赖直接 URL 依赖与 `--find-links` 提供的来源。

### `--upgrade`

短旗标 `-U`。允许包升级，忽略现有 lockfile 中的固定版本，隐含 `--refresh`。与 `--locked`、`--frozen` 互斥。

### `--no-upgrade`

禁用升级，`--upgrade` 的反义项。该选项在帮助中隐藏。

### `--upgrade-package`

短旗标 `-P`。格式：`--upgrade-package <UPGRADE_PACKAGE>`。允许升级指定包，忽略 lockfile 中的固定版本，隐含 `--refresh-package`；可多次传入。

### `--upgrade-group`

格式：`--upgrade-group <UPGRADE_GROUP>`。允许升级某个依赖组中的全部包，忽略 lockfile 中的固定版本；可多次传入。

### `--reinstall`

重装全部包，无论是否已安装，隐含 `--refresh`。别名 `--force-reinstall`。

### `--no-reinstall`

不重装包，`--reinstall` 的反义项。该选项在帮助中隐藏。

### `--reinstall-package`

格式：`--reinstall-package <REINSTALL_PACKAGE>`。重装指定的包，隐含 `--refresh-package`；可多次传入。

### `--index-strategy`

格式：`--index-strategy <INDEX_STRATEGY>`。多索引解析策略，默认 `first-index`：在包可用的第一个索引处停止并仅在该索引内解析，以防"依赖混淆"攻击。对应环境变量 `UV_INDEX_STRATEGY`。

### `--keyring-provider`

格式：`--keyring-provider <KEYRING_PROVIDER>`。尝试用 `keyring` 为索引 URL 做认证；目前仅支持 `subprocess`（通过 `keyring` CLI 处理认证），默认 `disabled`。对应环境变量 `UV_KEYRING_PROVIDER`。

### `--resolution`

格式：`--resolution <RESOLUTION>`。在包需求的多个兼容版本间选择的策略，默认 `highest`（每个包的最新兼容版本）。对应环境变量 `UV_RESOLUTION`。

### `--prerelease`

格式：`--prerelease <PRERELEASE>`。预发布版本的考量策略，默认 `if-necessary`：优先稳定候选，仅在所有满足约束的稳定候选都被拒绝后才回退到预发布。对应环境变量 `UV_PRERELEASE`。

### `--prerelease-package`

格式：`--prerelease-package <PRERELEASE_PACKAGE>`。为特定包设置预发布策略，接受 `PACKAGE=MODE` 对（`MODE` 为 `--prerelease` 接受的任意值），可多次传入。

### `--pre`

允许预发布版本的兼容旗标。该选项在帮助中隐藏。

### `--fork-strategy`

格式：`--fork-strategy <FORK_STRATEGY>`。跨 Python 版本与平台为同一包选择多个版本的策略：默认为每个受支持的 Python 版本选择各包的最新版本，同时尽量减少跨平台的版本数量；`fewest` 则优先选择覆盖面更广的旧版本以最小化每个包的版本数。对应环境变量 `UV_FORK_STRATEGY`。

### `--config-setting`

短旗标 `-C`。格式：`--config-setting <CONFIG_SETTING>`。传给 PEP 517 构建后端的设置，以 `KEY=VALUE` 对给出，可多次传入。别名 `--config-settings`。

### `--config-settings-package`

格式：`--config-settings-package <CONFIG_SETTINGS_PACKAGE>`。为特定包传给 PEP 517 构建后端的设置，以 `PACKAGE:KEY=VALUE` 对给出，可多次传入。

### `--no-build-isolation`

构建源码分发时禁用隔离，假定 PEP 518 声明的构建依赖已安装。对应环境变量 `UV_NO_BUILD_ISOLATION`。此选项下 uv 不会移除环境中的多余包，以免误删构建依赖。

### `--build-isolation`

启用构建隔离，`--no-build-isolation` 的反义项。该选项在帮助中隐藏。

### `--no-build-isolation-package`

格式：`--no-build-isolation-package <NO_BUILD_ISOLATION_PACKAGE>`。为特定包禁用构建隔离，假定其 PEP 518 构建依赖已安装。

### `--exclude-newer`

格式：`--exclude-newer <EXCLUDE_NEWER>`。仅考虑给定日期之前上传的候选包；比较的是每个分发文件上传到索引的时间，而非版本的发布日期。接受 RFC 3339 时间戳（如 `2006-12-02T02:07:43Z`）、同格式本地日期、"友好"时长（如 `1 week`）或 ISO 8601 时长（如 `P7D`）；用 `false` 禁用。对应环境变量 `UV_EXCLUDE_NEWER`。

### `--exclude-newer-package`

格式：`--exclude-newer-package <EXCLUDE_NEWER_PACKAGE>`。为特定包设置上传日期上限，以 `PACKAGE=DATE` 对给出，日期格式同 `--exclude-newer`，可多次传入。

### `--link-mode`

格式：`--link-mode <LINK_MODE>`。从全局缓存安装包的链接方式，默认在 macOS 与 Linux 为 `clone`（写时复制）、在 Windows 为 `hardlink`。不鼓励 `symlink`：它使缓存与环境强耦合，清理缓存（`uv cache clean`）会因删除底层文件而破坏已安装的包。对应环境变量 `UV_LINK_MODE`。

### `--compile-bytecode`

安装后将 Python 文件编译为字节码。默认不编译（`.pyc` 在首次导入时惰性生成）；对启动时间敏感的场景（CLI 应用、Docker 容器）可用更长的安装时间换取更快的启动。同步类命令会处理整个 site-packages 目录，包括未修改的包。别名 `--compile`。对应环境变量 `UV_COMPILE_BYTECODE`。

### `--no-compile-bytecode`

不编译字节码，`--compile-bytecode` 的反义项。该选项在帮助中隐藏。

### `--no-sources`

解析依赖时忽略 `tool.uv.sources` 表，用于按符合标准、可发布的包元数据解析，而不使用 workspace、Git、URL 或本地路径来源。对应环境变量 `UV_NO_SOURCES`。

### `--no-sources-package`

格式：`--no-sources-package <NO_SOURCES_PACKAGE>`。不为指定包使用 `tool.uv.sources` 表中的来源，可用空格分隔多个包。

### `--no-build`

不构建源码分发。启用时复用此前构建的缓存 wheel，需要构建 sdist 的操作将报错退出；workspace 内的第一方包仍会构建；可编辑需求仍会构建，且其构建后端可能执行任意 Python 代码。对应环境变量 `UV_NO_BUILD`。

### `--build`

允许构建源码分发，`--no-build` 的反义项。该选项在帮助中隐藏。

### `--no-build-package`

格式：`--no-build-package <NO_BUILD_PACKAGE>`。不为指定的包构建源码分发；第一方包（如 workspace 中的项目）仍会构建。对应环境变量 `UV_NO_BUILD_PACKAGE`。

### `--no-binary`

不安装预构建 wheel：给定的全部包将构建源码后安装；解析器仍会使用预构建 wheel 提取包元数据（若可用）。对应环境变量 `UV_NO_BINARY`。

### `--binary`

安装预构建 wheel，`--no-binary` 的反义项。该选项在帮助中隐藏。

### `--no-binary-package`

格式：`--no-binary-package <NO_BINARY_PACKAGE>`。不为指定的包安装预构建 wheel。对应环境变量 `UV_NO_BINARY_PACKAGE`。

### `--refresh`

刷新全部缓存数据。

### `--no-refresh`

不刷新缓存数据，`--refresh` 的反义项。该选项在帮助中隐藏。

### `--refresh-package`

格式：`--refresh-package <REFRESH_PACKAGE>`。刷新指定包的缓存数据；可多次传入。

## 环境变量

本命令的多数选项有对应的环境变量：`UV_NO_EDITABLE`、`UV_NO_INSTALL_PROJECT`、`UV_NO_INSTALL_WORKSPACE`、`UV_NO_INSTALL_LOCAL`、`UV_LOCKED`、`UV_FROZEN`、`UV_PYTHON`、`UV_DEV`、`UV_NO_DEV`、`UV_NO_GROUP`、`UV_NO_DEFAULT_GROUPS`、`UV_INDEX`、`UV_DEFAULT_INDEX`、`UV_INDEX_URL`、`UV_EXTRA_INDEX_URL`、`UV_FIND_LINKS`、`UV_INDEX_STRATEGY`、`UV_KEYRING_PROVIDER`、`UV_RESOLUTION`、`UV_PRERELEASE`、`UV_FORK_STRATEGY`、`UV_EXCLUDE_NEWER`、`UV_NO_BUILD_ISOLATION`、`UV_LINK_MODE`、`UV_COMPILE_BYTECODE`、`UV_NO_SOURCES`、`UV_NO_BUILD`、`UV_NO_BINARY` 等。

## 使用提醒

- 精确同步是默认行为：未声明为项目依赖的包会被移除；需要保留手动安装的包时用 `--inexact`。
- `--locked` 与 `--frozen` 都跳过重锁定，语义不同：`--locked` 断言 lockfile 最新、否则报错；`--frozen` 无条件以现有 lockfile 为准。
- 在 workspace 中默认只同步根项目；`--all-packages` 覆盖全部成员，`--package` 选择成员子集。
- 与 [uv lock](cli:command:lock) 的关系：`uv sync` 默认先做一次 `uv lock`（除非 `--locked`/`--frozen`），再安装。

## 示例

执行默认的精确同步：

```console
$ uv sync
```

在 CI 中断言 lockfile 与环境均已是最新：

```console
$ uv sync --locked --check
```

构建 Docker 镜像时先装依赖、后装项目以优化分层缓存：

```console
$ uv sync --no-install-project
$ uv sync
```

以上示例为说明性内容，未实际运行。

## 源码补充

命令与选项定义于 `ProjectCommand::Sync` 与 `SyncArgs`（[crates/uv-cli/src/lib.rs](https://github.com/astral-sh/uv/blob/70fe1196a546e49148a73b1c592b2f74c33af80e/crates/uv-cli/src/lib.rs)）；索引、解析器、构建与刷新类选项来自 `IndexArgs`、`ResolverInstallerArgs`、`BuildOptionsArgs`、`RefreshArgs` 等共享参数组。

## 差异与兼容性

与 [uv pip sync](cli:command:pip/sync) 相似，`uv sync` 也会让环境与一组需求精确一致，但需求来源是项目的 `pyproject.toml` 与 `uv.lock`，而非 `requirements.txt`；uv 也不要求文件逐行匹配。`--index-url` 与 `--extra-index-url` 为兼容 pip 的旧拼写，已弃用。
