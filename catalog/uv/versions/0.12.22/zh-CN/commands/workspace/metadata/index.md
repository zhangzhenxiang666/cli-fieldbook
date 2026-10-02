---
title: uv workspace metadata
command:
  - workspace
  - metadata
---

## 简介

查看当前 workspace 的元数据。

输出 workspace 的解析结果信息；该命令的输出格式尚未稳定，不应在脚本中依赖。默认读取当前 workspace 的 lockfile；提供 `--sync` 时会同步环境，以便在输出中附带模块归属元数据。也可用 `--script` 查看 PEP 723 脚本的元数据。

## 选项

### `--help`

短旗标 `-h`。

显示当前命令的简明帮助。

### `--script`

格式：`--script <SCRIPT>`。查看指定 PEP 723 Python 脚本的元数据，而非当前 workspace；依赖依据脚本的内联元数据表解析。

### `--locked`

检查 lockfile 是否为最新，对应环境变量 `UV_LOCKED`。断言 `uv.lock` 在一次解析后保持不变；若 lockfile 缺失或需要更新，则报错退出。

### `--no-locked`

禁用 locked 模式，覆盖 `UV_LOCKED`。该选项在帮助中隐藏。

### `--frozen`

断言 `uv.lock` 存在而不检查其是否为最新，对应环境变量 `UV_FROZEN`。

### `--no-frozen`

禁用 frozen 模式，覆盖 `UV_FROZEN`。该选项在帮助中隐藏。

### `--sync`

同步环境，以便在输出中包含模块归属元数据（可导入模块名到提供它的包的映射）；默认以 inexact 模式同步。除非提供 `--locked` 或 `--frozen`，该选项也允许创建或更新 lockfile；对脚本，仅在 lockfile 已存在时更新。

### `--exact`

执行精确同步，移除环境中不属于选定解析结果的包。默认同步会保留这类包；需与 `--sync` 同用。

### `--active`

将依赖同步到活动虚拟环境：设置 `VIRTUAL_ENV` 时优先使用该环境，而不是为项目或脚本创建或更新虚拟环境。

### `--python`

短旗标 `-p`。格式：`--python <PYTHON>`。解析时使用的 Python 解释器；构建 sdist 以确定包元数据时需要解释器，也是未设置 `requires-python` 时最低 Python 版本的回退值。对应环境变量 `UV_PYTHON`。

### `--index`

格式：`--index <INDEX>`。除默认索引外使用的索引，接受 PEP 503 兼容仓库或同构布局的本地目录。多个 `--index` 时先传入者优先，且均优先于 `--default-index`。对应环境变量 `UV_INDEX`。

### `--default-index`

格式：`--default-index <DEFAULT_INDEX>`。默认包索引（默认为 PyPI）；优先级低于全部 `--index` 指定的索引。对应环境变量 `UV_DEFAULT_INDEX`。

### `--index-url`

短旗标 `-i`。格式：`--index-url <INDEX_URL>`。已弃用，改用 `--default-index`：包索引 URL，优先级低于 `--extra-index-url`。对应环境变量 `UV_INDEX_URL`。

### `--extra-index-url`

格式：`--extra-index-url <EXTRA_INDEX_URL>`。已弃用，改用 `--index`：除 `--index-url` 外使用的额外索引 URL。对应环境变量 `UV_EXTRA_INDEX_URL`。

### `--find-links`

短旗标 `-f`。格式：`--find-links <FIND_LINKS>`。除索引外搜索候选分发的位置；路径须为顶层存放 `.whl` 或 sdist 的目录，URL 页面须为指向包文件的平面链接列表。对应环境变量 `UV_FIND_LINKS`。

### `--no-index`

忽略注册表索引（如 PyPI），仅依赖直接 URL 依赖与 `--find-links` 提供的来源。

### `--upgrade`

短旗标 `-U`。允许包升级，忽略既有 lockfile 中的固定版本；隐含 `--refresh`。

### `--no-upgrade`

禁止升级，`--upgrade` 的反义项。该选项在帮助中隐藏。

### `--upgrade-package`

短旗标 `-P`。格式：`--upgrade-package <UPGRADE_PACKAGE>`。允许特定包升级，忽略既有输出文件中的固定版本；隐含 `--refresh-package`。

### `--upgrade-group`

格式：`--upgrade-group <UPGRADE_GROUP>`。允许依赖组内全部包升级，忽略既有输出文件中的固定版本。

### `--index-strategy`

格式：`--index-strategy <INDEX_STRATEGY>`。多索引解析策略；默认 `first-index`，在包首次出现的索引内限定解析以防依赖混淆攻击。对应环境变量 `UV_INDEX_STRATEGY`。

### `--keyring-provider`

格式：`--keyring-provider <KEYRING_PROVIDER>`。尝试用 `keyring` 为索引 URL 认证；目前仅支持 `subprocess`（通过 `keyring` CLI），默认 `disabled`。对应环境变量 `UV_KEYRING_PROVIDER`。

### `--resolution`

格式：`--resolution <RESOLUTION>`。为给定依赖选择兼容版本的策略，默认 `highest`（最新兼容版本）。对应环境变量 `UV_RESOLUTION`。

### `--prerelease`

格式：`--prerelease <PRERELEASE>`。考虑预发布版本的策略，默认 `if-necessary`（仅在全部稳定候选被拒绝后回退到预发布）。对应环境变量 `UV_PRERELEASE`。

### `--prerelease-package`

格式：`--prerelease-package <PRERELEASE_PACKAGE>`。特定包的预发布策略，格式 `PACKAGE=MODE`，`MODE` 为 `--prerelease` 接受的取值；可多次传入。

### `--pre`

允许预发布版本（pip 兼容）。该选项在帮助中隐藏。

### `--fork-strategy`

格式：`--fork-strategy <FORK_STRATEGY>`。跨 Python 版本与平台为同一包选择多版本的策略；默认在每个支持的 Python 版本上取最新并尽量减少跨平台版本数。对应环境变量 `UV_FORK_STRATEGY`。

### `--config-setting`

短旗标 `-C`。格式：`--config-setting <CONFIG_SETTING>`。传给 PEP 517 构建后端的设置，`KEY=VALUE` 对。

### `--config-settings-package`

格式：`--config-settings-package <CONFIG_SETTINGS_PACKAGE>`。针对特定包传给构建后端的设置，格式 `PACKAGE:KEY=VALUE`。

### `--no-build-isolation`

构建 sdist 时禁用隔离，假定 PEP 518 声明的构建依赖已安装。对应环境变量 `UV_NO_BUILD_ISOLATION`。

### `--build-isolation`

启用构建隔离，`--no-build-isolation` 的反义项。该选项在帮助中隐藏。

### `--no-build-isolation-package`

格式：`--no-build-isolation-package <NO_BUILD_ISOLATION_PACKAGE>`。对特定包禁用构建隔离，假定其 PEP 518 构建依赖已安装。

### `--exclude-newer`

格式：`--exclude-newer <EXCLUDE_NEWER>`。仅考虑给定日期前上传的候选包；比较对象是每个分发文件的索引上传时间。接受 RFC 3339 时间戳、同格式本地日期、友好时长（如 `1 week`）或 ISO 8601 时长。对应环境变量 `UV_EXCLUDE_NEWER`。

### `--exclude-newer-package`

格式：`--exclude-newer-package <EXCLUDE_NEWER_PACKAGE>`。特定包的上传日期过滤，格式 `PACKAGE=DATE`，日期格式同 `--exclude-newer`；可多次传入。

### `--link-mode`

格式：`--link-mode <LINK_MODE>`。从全局缓存安装包时使用的链接方式；macOS 与 Linux 默认 `clone`（写时复制），Windows 默认 `hardlink`。慎用 symlink：清除缓存会使已安装包失效。对应环境变量 `UV_LINK_MODE`。

### `--no-sources`

解析时忽略 `tool.uv.sources` 表，按可发布的标准元数据解析，不使用 workspace、Git、URL 或本地路径来源。对应环境变量 `UV_NO_SOURCES`。

### `--no-sources-package`

格式：`--no-sources-package <NO_SOURCES_PACKAGE>`。特定包不使用 `tool.uv.sources` 表中的来源。

### `--no-build`

不构建源分发物：复用此前构建的缓存 wheel，需要构建 sdist 的操作会报错退出；workspace 内的第一方包仍会构建。对应环境变量 `UV_NO_BUILD`。

### `--build`

允许构建，`--no-build` 的反义项。该选项在帮助中隐藏。

### `--no-build-package`

格式：`--no-build-package <NO_BUILD_PACKAGE>`。特定包不构建源分发物；第一方包（如 workspace 内项目）仍会构建。

### `--no-binary`

不安装预构建 wheel，改为从源码构建安装给定包；解析器仍会使用预构建 wheel 提取包元数据（如可用）。对应环境变量 `UV_NO_BINARY`。

### `--binary`

允许安装预构建 wheel，`--no-binary` 的反义项。该选项在帮助中隐藏。

### `--no-binary-package`

格式：`--no-binary-package <NO_BINARY_PACKAGE>`。特定包不安装预构建 wheel。

### `--refresh`

刷新全部缓存数据。

### `--no-refresh`

不刷新缓存数据，`--refresh` 的反义项。该选项在帮助中隐藏。

### `--refresh-package`

格式：`--refresh-package <REFRESH_PACKAGE>`。刷新特定包的缓存数据；可多次传入。

## 环境变量

本命令选项的常用环境变量映射：`UV_LOCKED`/`UV_FROZEN`（锁定模式）、`UV_PYTHON`（解释器）、`UV_INDEX`/`UV_DEFAULT_INDEX`/`UV_INDEX_URL`/`UV_EXTRA_INDEX_URL`/`UV_FIND_LINKS`（索引来源）、`UV_INDEX_STRATEGY`/`UV_KEYRING_PROVIDER`、`UV_RESOLUTION`/`UV_PRERELEASE`/`UV_FORK_STRATEGY`（解析策略）、`UV_NO_BUILD`/`UV_NO_BINARY`（构建与二进制）、`UV_NO_SOURCES`、`UV_EXCLUDE_NEWER` 等。命令行传入的选项优先于环境变量。

## 使用提醒

- 默认只读取 lockfile；输出需要模块归属信息时才用 `--sync`（会改动环境）。
- `--locked` 与 `--frozen` 用于在 CI 中断言 lockfile 状态：前者要求最新，后者仅要求存在。
- 输出格式尚未稳定，不应在脚本中解析。

## 示例

查看当前 workspace 的元数据：

```console
$ uv workspace metadata
```

以精确同步刷新环境并附带模块归属信息：

```console
$ uv workspace metadata --sync --exact
```

查看 PEP 723 脚本的元数据：

```console
$ uv workspace metadata --script example.py
```

以上示例为说明性内容，未实际运行。

## 源码补充

命令定义于 `WorkspaceCommand::Metadata` 与 `MetadataArgs`，解析、构建与刷新选项来自 `ResolverArgs`/`BuildOptionsArgs`/`RefreshArgs` 等共享参数组（[crates/uv-cli/src/lib.rs](https://github.com/astral-sh/uv/blob/70fe1196a546e49148a73b1c592b2f74c33af80e/crates/uv-cli/src/lib.rs)）。
