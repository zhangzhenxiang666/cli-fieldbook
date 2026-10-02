---
title: uv tree
command:
  - tree
---

## 简介

显示[项目](../../concepts/projects.md)的依赖树，基于 [lockfile](../../concepts/lockfile.md) 的解析结果。默认按当前环境（所发现解释器报告的平台与 Python 版本）过滤树。

用 `--universal` 查看跨全部 Python 版本与平台的平台无关树（同一包可能显示多个版本），或用 `--python-version`、`--python-platform` 覆盖部分环境标记。支持 `--prune`、`--package`、`--invert` 等修剪与聚焦方式，以及 `--outdated`、`--show-sizes` 等附加信息。

## 选项

### `--help`

短旗标 `-h`。显示当前命令的简明帮助。传入 `--help` 时显示长帮助。

### `--universal`

显示平台无关的依赖树：展示全部 Python 版本与平台上的解析包版本，而非过滤到与当前环境相关的部分。每个包可能显示多个版本。与 `--python-version`、`--python-platform` 互斥。

### `--format`

格式：`--format <FORMAT>`。依赖图的展示格式，取值 `text` 或 `json`，默认 `text`。

### `--locked`

断言 `uv.lock` 保持不变。对应环境变量 `UV_LOCKED`。要求 lockfile 是最新的；若 lockfile 缺失或需要更新，uv 将报错退出。与 `--frozen`、`--upgrade` 互斥。

### `--no-locked`

禁用 locked 模式，覆盖 `UV_LOCKED`。该选项在帮助中隐藏。

### `--frozen`

在不锁定项目的情况下展示依赖。对应环境变量 `UV_FROZEN`。若 lockfile 缺失，uv 将报错退出。与 `--locked`、`--upgrade` 互斥。

### `--no-frozen`

禁用 frozen 模式，覆盖 `UV_FROZEN`。该选项在帮助中隐藏。

### `--script`

格式：`--script <SCRIPT>`。显示指定的 PEP 723 Python 脚本而非当前项目的依赖树：依据其内联元数据表解析依赖。

### `--python-version`

格式：`--python-version <PYTHON_VERSION>`。过滤树时使用的 Python 版本，如 `--python-version 3.10` 展示在 Python 3.10 上安装时会包含的依赖。默认为所发现解释器的版本。与 `--universal` 互斥。

### `--python-platform`

格式：`--python-platform <PYTHON_PLATFORM>`。过滤树时使用的平台，以目标三元组表示（如 `x86_64-unknown-linux-gnu` 或 `aarch64-apple-darwin`）。与 `--universal` 互斥。

### `--python`

短旗标 `-p`。格式：`--python <PYTHON>`。用于锁定与过滤的 Python 解释器：默认树按该解释器报告的平台过滤，可用 `--universal` 展示全部平台，或用 `--python-version`、`--python-platform` 覆盖部分标记。请求格式见 [uv python](cli:command:python)。对应环境变量 `UV_PYTHON`。

### `--depth`

短旗标 `-d`。格式：`--depth <DEPTH>`。依赖树的最大展示深度，默认 `255`。

### `--prune`

格式：`--prune <PRUNE>`。从依赖树的展示中剪除指定包；可多次传入。

### `--package`

格式：`--package <PACKAGE>`。只展示指定的包；可多次传入。

### `--no-dedupe`

不对重复依赖去重：通常某包已展示过其依赖后，再次出现时不再重复展示并以 `(*)` 标记；此选项使这些重复项完整展开。

### `--invert`

显示指定包的反向依赖：反转依赖树，展示依赖给定包的包。别名 `--reverse`。

### `--outdated`

显示树中每个包的最新可用版本。

### `--show-sizes`

显示树中包的压缩 wheel 大小。

### `--dev`

包含开发依赖组，`--group dev` 的别名。对应环境变量 `UV_DEV`。该选项在帮助中隐藏。

### `--no-dev`

禁用开发依赖组，`--no-group dev` 的别名；要改为禁用全部默认组见 `--no-default-groups`。对应环境变量 `UV_NO_DEV`。

### `--only-dev`

仅包含开发依赖组，省略项目及其依赖；`--only-group dev` 的别名，隐含 `--no-default-groups`。

### `--group`

格式：`--group <GROUP>`。包含指定依赖组的依赖，可多次传入。

### `--no-group`

格式：`--no-group <NO_GROUP>`。禁用指定的依赖组，可多次传入（可用空格分隔）；总是优先于默认组、`--all-groups` 与 `--group`。对应环境变量 `UV_NO_GROUP`。

### `--no-default-groups`

忽略默认依赖组（`tool.uv.default-groups` 中定义的组）；仍可用 `--group` 包含特定组。对应环境变量 `UV_NO_DEFAULT_GROUPS`。

### `--only-group`

格式：`--only-group <ONLY_GROUP>`。仅包含指定依赖组的依赖，省略项目及其依赖；可多次传入，隐含 `--no-default-groups`。

### `--all-groups`

包含全部依赖组的依赖；可用 `--no-group` 排除特定组。

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

格式：`--link-mode <LINK_MODE>`。从全局缓存安装包的链接方式，仅在建源码分发时使用；默认在 macOS 与 Linux 为 `clone`（写时复制）、在 Windows 为 `hardlink`。不鼓励 `symlink`：它使缓存与环境强耦合，清理缓存（`uv cache clean`）会因删除底层文件而破坏已安装的包。对应环境变量 `UV_LINK_MODE`。

### `--no-sources`

解析依赖时忽略 `tool.uv.sources` 表，用于按符合标准、可发布的包元数据解析，而不使用 workspace、Git、URL 或本地路径来源。对应环境变量 `UV_NO_SOURCES`。

### `--no-sources-package`

格式：`--no-sources-package <NO_SOURCES_PACKAGE>`。不为指定包使用 `tool.uv.sources` 表中的来源，可用空格分隔多个包。

## 环境变量

本命令的多数选项有对应的环境变量：`UV_LOCKED`、`UV_FROZEN`、`UV_PYTHON`、`UV_DEV`、`UV_NO_DEV`、`UV_NO_GROUP`、`UV_NO_DEFAULT_GROUPS`、`UV_INDEX`、`UV_DEFAULT_INDEX`、`UV_INDEX_URL`、`UV_EXTRA_INDEX_URL`、`UV_FIND_LINKS`、`UV_INDEX_STRATEGY`、`UV_KEYRING_PROVIDER`、`UV_RESOLUTION`、`UV_PRERELEASE`、`UV_FORK_STRATEGY`、`UV_EXCLUDE_NEWER`、`UV_NO_BUILD_ISOLATION`、`UV_LINK_MODE`、`UV_NO_SOURCES`、`UV_NO_BUILD`、`UV_NO_BINARY` 等。

## 使用提醒

- 依赖树来自 lockfile 的解析结果；`--locked` 断言 lockfile 最新，`--frozen` 直接使用现有 lockfile（缺失时报错）。
- `--invert` 需要配合 `--package` 指定目标包，展示谁依赖它。
- 需要 pip 接口下基于已安装环境的依赖树时，参见 [uv pip tree](cli:command:pip/tree)。

## 示例

显示当前环境的依赖树：

```console
$ uv tree
```

只看某个包的反向依赖：

```console
$ uv tree --invert --package httpx
```

展示平台无关的树并标注最新版本：

```console
$ uv tree --universal --outdated
```

以上示例为说明性内容，未实际运行。

## 源码补充

命令与选项定义于 `ProjectCommand::Tree` 与 `TreeArgs`（[crates/uv-cli/src/lib.rs](https://github.com/astral-sh/uv/blob/70fe1196a546e49148a73b1c592b2f74c33af80e/crates/uv-cli/src/lib.rs)）；展示类选项来自 `DisplayTreeArgs`，索引与解析器类选项来自 `IndexArgs`、`ResolverArgs` 等共享参数组。

## 差异与兼容性

与 [uv pip tree](cli:command:pip/tree) 不同，`uv tree` 展示的是 lockfile 的解析结果（项目依赖树），而非已安装环境的包树。`--index-url` 与 `--extra-index-url` 为兼容 pip 的旧拼写，已弃用。
