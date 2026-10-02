---
title: uv export
command:
  - export
---

## 简介

把[项目](../../concepts/projects.md)的 [lockfile](../../concepts/lockfile.md)（`uv.lock`）导出为其他格式，目前支持 `requirements.txt`、`pylock.toml`（PEP 751）与 CycloneDX v1.5 JSON。

导出前默认会重新锁定项目，除非提供 `--locked` 或 `--frozen`。uv 会在当前目录及父目录搜索项目，找不到时报错退出。

在 workspace 中操作时默认导出根项目，可用 `--package` 选择具体成员、`--all-packages` 导出全部成员。

## 选项

### `--help`

短旗标 `-h`。显示当前命令的简明帮助。传入 `--help` 时显示长帮助。

### `--format`

格式：`--format <FORMAT>`。导出格式，支持 `requirements.txt`、`pylock.toml`（PEP 751）与 CycloneDX v1.5 JSON。提供输出文件时可从其扩展名推断格式，否则默认 `requirements.txt`。

### `--all-packages`

导出整个 workspace：全部成员的依赖都会写入导出的需求文件；通过 `--extra`、`--group` 等指定的 extras 与依赖组会应用到所有成员。与 `--package` 互斥。

### `--package`

格式：`--package <PACKAGE>`。导出 workspace 中特定包的依赖，可多次传入。任一成员不存在时 uv 报错退出；与 `--all-packages` 互斥。

### `--prune`

格式：`--prune <PACKAGE>`。从依赖树中剪除指定包：被剪除的包，以及剪除后不再被需要的依赖，都不会写入导出文件。与 `--all-packages` 互斥。

### `--extra`

格式：`--extra <EXTRA>`。包含指定 extra 的可选依赖，可多次传入或用逗号分隔。与 `--all-extras` 互斥。

### `--all-extras`

包含全部可选依赖。与 `--extra` 互斥。

### `--no-extra`

格式：`--no-extra <NO_EXTRA>`。在启用了 `--all-extras` 的情况下排除指定的可选依赖，可多次传入。

### `--no-all-extras`

不包含任何可选依赖，`--all-extras` 的反义项。该选项在帮助中隐藏。

### `--no-annotate`

不输出标注每个包来源的注释。

### `--annotate`

输出来源注释，`--no-annotate` 的反义项。该选项在帮助中隐藏。

### `--no-header`

不在生成文件顶部包含注释头。

### `--header`

包含注释头，`--no-header` 的反义项。该选项在帮助中隐藏。

### `--emit-index-url`

在生成文件中包含 `--index-url` 与 `--extra-index-url` 条目。

### `--no-emit-index-url`

不包含索引 URL 条目，`--emit-index-url` 的反义项。该选项在帮助中隐藏。

### `--emit-find-links`

在生成文件中包含 `--find-links` 条目。

### `--no-emit-find-links`

不包含 `--find-links` 条目，`--emit-find-links` 的反义项。该选项在帮助中隐藏。

### `--editable`

将本以非可编辑方式导出的依赖（包括项目与任何 workspace 成员）以可编辑形式导出。该选项在帮助中隐藏。

### `--no-editable`

将可编辑依赖（包括项目与任何 workspace 成员）以非可编辑形式导出。对应环境变量 `UV_NO_EDITABLE`。

### `--no-editable-package`

格式：`--no-editable-package <NO_EDITABLE_PACKAGE>`。将指定的可编辑包以非可编辑形式导出，可用空格分隔多个包。

### `--hashes`

为全部依赖包含哈希。该选项在帮助中隐藏。

### `--no-hashes`

在生成的输出中省略哈希。

### `--output-file`

短旗标 `-o`。格式：`--output-file <OUTPUT_FILE>`。把导出的需求写入给定文件；提供时可从扩展名推断输出格式。

### `--batch`

格式：`--batch <BATCH>`。从包含 `[[export]]` 条目的 TOML 清单一次导出多个选择集：每个条目指定自己的 `output-file` 与包、extra、依赖组选择，输出路径相对该清单解析。该选项在帮助中隐藏；与 `--output-file`、`--script`、`--package`、`--all-packages` 及 extras、依赖组等选项互斥。

### `--no-emit-project`

不导出当前项目。默认当前项目与其全部依赖一起写入导出文件；此选项排除项目本身但保留其依赖。别名 `--no-install-project`；与 `--only-emit-project` 互斥。

### `--only-emit-project`

只导出当前项目，排除全部依赖。别名 `--only-install-project`；与 `--no-emit-project` 互斥。该选项在帮助中隐藏。

### `--no-emit-workspace`

不导出任何 workspace 成员（包括根项目），但保留其依赖。别名 `--no-install-workspace`；与 `--only-emit-workspace` 互斥。

### `--only-emit-workspace`

只导出 workspace 成员（包括根项目），排除其他依赖。别名 `--only-install-workspace`；与 `--no-emit-workspace` 互斥。该选项在帮助中隐藏。

### `--no-emit-local`

在导出的需求中不包含本地路径依赖：省略当前项目、workspace 成员及其他本地（路径或可编辑）包，只写入远程/索引依赖；适合 Docker 与 CI 中先导出并缓存第三方依赖。别名 `--no-install-local`；与 `--only-emit-local` 互斥。

### `--only-emit-local`

在导出的需求中只包含本地路径依赖。别名 `--only-install-local`；与 `--no-emit-local` 互斥。该选项在帮助中隐藏。

### `--no-emit-package`

格式：`--no-emit-package <NO_EMIT_PACKAGE>`。不导出指定的包。别名 `--no-install-package`；与 `--only-emit-package` 互斥。

### `--only-emit-package`

格式：`--only-emit-package <ONLY_EMIT_PACKAGE>`。只导出指定的包，排除其他所有包。别名 `--only-install-package`；与 `--no-emit-package` 互斥。该选项在帮助中隐藏。

### `--locked`

断言 `uv.lock` 保持不变。对应环境变量 `UV_LOCKED`。要求 lockfile 是最新的；若 lockfile 缺失或需要更新，uv 将报错退出。与 `--frozen`、`--upgrade` 互斥。

### `--no-locked`

禁用 locked 模式，覆盖 `UV_LOCKED`。该选项在帮助中隐藏。

### `--frozen`

导出前不更新 `uv.lock`。对应环境变量 `UV_FROZEN`。若 `uv.lock` 不存在，uv 将报错退出。与 `--locked`、`--upgrade` 互斥。

### `--no-frozen`

禁用 frozen 模式，覆盖 `UV_FROZEN`。该选项在帮助中隐藏。

### `--script`

格式：`--script <SCRIPT>`。导出指定的 PEP 723 Python 脚本而非当前项目的依赖：依据其内联元数据表解析。与 `--all-packages`、`--package`、`--no-emit-project`、`--no-emit-workspace` 互斥。

### `--python`

短旗标 `-p`。格式：`--python <PYTHON>`。解析期间使用的 Python 解释器：无 wheel 可用时构建源码分发以确定包元数据需要它；`requires-python` 未设置时，它也作为最低 Python 版本的回退值。请求格式见 [uv python](cli:command:python)。对应环境变量 `UV_PYTHON`。

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

本命令的多数选项有对应的环境变量：`UV_NO_EDITABLE`、`UV_LOCKED`、`UV_FROZEN`、`UV_PYTHON`、`UV_DEV`、`UV_NO_DEV`、`UV_NO_GROUP`、`UV_NO_DEFAULT_GROUPS`、`UV_INDEX`、`UV_DEFAULT_INDEX`、`UV_INDEX_URL`、`UV_EXTRA_INDEX_URL`、`UV_FIND_LINKS`、`UV_INDEX_STRATEGY`、`UV_KEYRING_PROVIDER`、`UV_RESOLUTION`、`UV_PRERELEASE`、`UV_FORK_STRATEGY`、`UV_EXCLUDE_NEWER`、`UV_NO_BUILD_ISOLATION`、`UV_LINK_MODE`、`UV_NO_SOURCES`、`UV_NO_BUILD`、`UV_NO_BINARY` 等。

## 使用提醒

- 导出的内容以 lockfile 为准：`--locked` 断言 lockfile 最新（否则报错），`--frozen` 直接使用现有 lockfile。
- 默认输出写入 stdout；用 `--output-file` 写入文件，格式可由扩展名推断。
- `--no-emit-*` 系列只影响写入哪些条目，依赖解析仍按完整 lockfile 进行；别名与 `uv sync` 的 `--no-install-*` 系列一致。
- 导出 PEP 723 脚本的依赖用 `--script`，与 workspace 选择类选项互斥。

## 示例

导出为 `requirements.txt`（含哈希）并写入文件：

```console
$ uv export --format requirements.txt --output-file requirements.lock
```

只导出生产依赖，剪除某个包：

```console
$ uv export --no-dev --prune mkdocs --output-file prod.txt
```

按现有 lockfile 导出 PEP 751 的 `pylock.toml`：

```console
$ uv export --frozen --format pylock.toml --output-file pylock.toml
```

以上示例为说明性内容，未实际运行。

## 源码补充

命令与选项定义于 `ProjectCommand::Export` 与 `ExportArgs`（[crates/uv-cli/src/lib.rs](https://github.com/astral-sh/uv/blob/70fe1196a546e49148a73b1c592b2f74c33af80e/crates/uv-cli/src/lib.rs)）；索引与解析器类选项来自 `IndexArgs`、`ResolverArgs` 等共享参数组。

## 差异与兼容性

与 [uv pip compile](cli:command:pip/compile) 的关系：两者都能产出 `requirements.txt`，但 `uv export` 从 `uv.lock` 导出（先保证锁定一致），且默认包含哈希、可导出 pylock.toml 与 CycloneDX。多数 `--no-emit-*` 选项带有与 `uv sync` 安装类选项一致的别名。`--index-url` 与 `--extra-index-url` 为兼容 pip 的旧拼写，已弃用。
