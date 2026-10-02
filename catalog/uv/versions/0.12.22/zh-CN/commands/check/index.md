---
title: uv check
command:
  - check
---

## 简介

对[项目](../../concepts/projects.md)运行检查：目前是使用 ty 对 Python 代码做类型检查。默认检查项目中的全部 Python 文件。

用 `--fix` 应用安全修复以解决类型检查错误。检查前默认会同步项目环境（可用 `--frozen`、`--no-sync` 等控制），workspace 中可用 `--package` / `--all-packages` 选择检查范围。

此命令为 uv 0.12 新增。

## 选项

### `--help`

短旗标 `-h`。显示当前命令的简明帮助。传入 `--help` 时显示长帮助。

### `--fix`

应用安全修复以解决类型检查错误。

### `--all-packages`

检查 workspace 中的全部包：workspace 环境同步为包含全部成员，并检查每个成员中的文件。与 `--package`、`--script`、`--no-project` 互斥。

### `--package`

格式：`--package <PACKAGE>`。检查 workspace 中的特定包：环境同步为包含所选成员及其依赖，只检查所选成员拥有的文件；可多次传入。与 `--all-packages`、`--script`、`--no-project` 互斥。

### `--script`

格式：`--script <SCRIPT>`。对指定的 PEP 723 Python 脚本而非当前项目运行检查：依据脚本的内联元数据表使用依赖。与 extras、依赖组及 workspace 选择类选项互斥。

### `--extra`

格式：`--extra <EXTRA>`。安装指定 extra 的可选依赖用于检查，可多次传入或用逗号分隔。注意全部可选依赖始终参与解析，此选项只影响安装的包的选择；若指定的多个 extras 或依赖组出现在 `tool.uv.conflicts` 中，uv 将报错。与 `--all-extras` 互斥。

### `--all-extras`

安装全部可选依赖。当两个及以上 extras 在 `tool.uv.conflicts` 中声明为冲突时，使用此旗标总会报错。与 `--extra` 互斥。

### `--no-extra`

格式：`--no-extra <NO_EXTRA>`。在启用了 `--all-extras` 的情况下排除指定的可选依赖，可多次传入。

### `--no-all-extras`

不安装任何可选依赖，`--all-extras` 的反义项。该选项在帮助中隐藏。

### `--locked`

断言 `uv.lock` 保持不变。对应环境变量 `UV_LOCKED`。要求 lockfile 是最新的；若 lockfile 缺失或需要更新，uv 将报错退出。与 `--frozen`、`--upgrade` 互斥。

### `--no-locked`

禁用 locked 模式，覆盖 `UV_LOCKED`。该选项在帮助中隐藏。

### `--frozen`

在不更新 `uv.lock` 的情况下运行检查。对应环境变量 `UV_FROZEN`。不检查 lockfile 是否最新，而是以 lockfile 中的版本为准；lockfile 缺失时报错退出，`pyproject.toml` 中尚未写入 lockfile 的依赖变更不会出现在环境中。与 `--locked`、`--upgrade` 互斥。

### `--no-frozen`

禁用 frozen 模式，覆盖 `UV_FROZEN`。该选项在帮助中隐藏。

### `--no-sync`

不同步虚拟环境。对应环境变量 `UV_NO_SYNC`。

### `--no-install-project`

不安装当前项目。对应环境变量 `UV_NO_INSTALL_PROJECT`。默认项目与其全部依赖一起安装；此选项排除项目本身但保留其依赖——当项目可以不构建原生扩展、直接从源码树做类型检查时有用。与 `--no-sync`、`--script`、`--no-project` 互斥。

### `--isolated`

不改动项目状态地运行检查。对应环境变量 `UV_ISOLATED`。使用临时虚拟环境，现有环境与项目 lockfile 保持不变；声明的项目需求会解析并安装到该临时环境。

### `--python`

短旗标 `-p`。格式：`--python <PYTHON>`。项目环境使用的 Python 解释器，默认取第一个满足项目 `requires-python` 约束的解释器。请求格式见 [uv python](cli:command:python)。对应环境变量 `UV_PYTHON`。

### `--ty-version`

格式：`--ty-version <TY_VERSION>`。类型检查所用的 ty 版本：接受作为精确固定的版本（如 `0.0.1`）、版本说明符（如 `>=0.0.1`）或 `latest`（使用最新可用版本）。默认在 `ty` 是项目依赖或 dev 组依赖时使用 `uv.lock` 中解析到的精确版本，否则使用受约束的版本区间（如 `>=0.0,<0.1`）。

### `--show-version`

显示将用于类型检查的 ty 版本。该选项在帮助中隐藏。

### `--show-command`

显示将用于类型检查的 ty 命令。该选项在帮助中隐藏。

### `--no-project`

避免发现项目或 workspace。对应环境变量 `UV_NO_PROJECT`。改为在当前目录（而非当前项目）的上下文中运行检查，适合当前目录不是项目时。

### `--dev`

包含开发依赖组，`--group dev` 的别名。对应环境变量 `UV_DEV`。该选项在帮助中隐藏。

### `--no-dev`

禁用开发依赖组，`--no-group dev` 的别名；要改为禁用全部默认组见 `--no-default-groups`。对应环境变量 `UV_NO_DEV`。

### `--only-dev`

仅包含开发依赖组，省略项目及其依赖；`--only-group dev` 的别名，隐含 `--no-default-groups`。

### `--group`

格式：`--group <GROUP>`。安装指定依赖组的依赖用于检查，可多次传入。若指定的多个 extras 或依赖组出现在 `tool.uv.conflicts` 中，uv 将报错。

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

构建源码分发时禁用隔离，假定 PEP 518 声明的构建依赖已安装。对应环境变量 `UV_NO_BUILD_ISOLATION`。

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

安装后将 Python 文件编译为字节码。默认不编译（`.pyc` 在首次导入时惰性生成）；对启动时间敏感的场景（CLI 应用、Docker 容器）可用更长的安装时间换取更快的启动。别名 `--compile`。对应环境变量 `UV_COMPILE_BYTECODE`。

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

本命令的多数选项有对应的环境变量：`UV_LOCKED`、`UV_FROZEN`、`UV_NO_SYNC`、`UV_NO_INSTALL_PROJECT`、`UV_ISOLATED`、`UV_PYTHON`、`UV_NO_PROJECT`、`UV_DEV`、`UV_NO_DEV`、`UV_NO_GROUP`、`UV_NO_DEFAULT_GROUPS`、`UV_INDEX`、`UV_DEFAULT_INDEX`、`UV_INDEX_URL`、`UV_EXTRA_INDEX_URL`、`UV_FIND_LINKS`、`UV_INDEX_STRATEGY`、`UV_KEYRING_PROVIDER`、`UV_RESOLUTION`、`UV_PRERELEASE`、`UV_FORK_STRATEGY`、`UV_EXCLUDE_NEWER`、`UV_NO_BUILD_ISOLATION`、`UV_LINK_MODE`、`UV_COMPILE_BYTECODE`、`UV_NO_SOURCES`、`UV_NO_BUILD`、`UV_NO_BINARY` 等。

## 使用提醒

- 检查默认在同步后的项目环境中进行；`--isolated` 改用临时环境且不改项目状态，`--frozen`/`--no-sync` 跳过同步。
- 在 workspace 中默认检查根项目；`--all-packages` 检查全部成员，`--package` 选择成员子集。
- 用 `--show-version` / `--show-command`（帮助中隐藏）核验实际使用的 ty 版本与命令行。
- 与 [uv format](cli:command:format) 互补：前者基于 Ruff formatter 做格式化，本命令基于 ty 做类型检查。

## 示例

对项目运行类型检查：

```console
$ uv check
```

应用安全修复：

```console
$ uv check --fix
```

在不改动项目状态的情况下检查：

```console
$ uv check --isolated
```

以上示例为说明性内容，未实际运行。

## 源码补充

命令与选项定义于 `ProjectCommand::Check` 与 `CheckArgs`（[crates/uv-cli/src/lib.rs](https://github.com/astral-sh/uv/blob/70fe1196a546e49148a73b1c592b2f74c33af80e/crates/uv-cli/src/lib.rs)）；索引、解析器、构建与刷新类选项来自 `IndexArgs`、`ResolverInstallerArgs`、`BuildOptionsArgs`、`RefreshArgs` 等共享参数组。

## 差异与兼容性

无 pip 对应物；等价于在项目上下文中运行 `ty`，但由 uv 管理环境同步与 ty 的版本解析。与 [uv pip check](cli:command:pip/check) 不同：后者校验的是已安装包依赖的一致性，不是类型检查。
