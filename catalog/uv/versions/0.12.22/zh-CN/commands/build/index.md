---
title: uv build
command:
  - build
---

## 简介

将 Python 包构建为源分发物与 wheel。

`uv build` 接受一个目录或源分发物（sdist）归档的路径，默认为当前工作目录。传入目录时，默认先从源目录构建 sdist，再由该 sdist 构建 wheel；`--sdist` 可只构建源分发物，`--wheel` 可只构建二进制分发物，`--sdist --wheel` 则两者都直接从源码构建。传入 sdist 归档时，`uv build --wheel` 会从该 sdist 构建 wheel。

产物默认写入源目录下的 `dist` 子目录（传入 sdist 时为其所在目录）。

## 参数

### `SRC`

格式：`[SRC]`。构建来源：项目目录，或要构建为 wheel 的源分发物归档；默认为当前工作目录。

## 选项

### `--help`

短旗标 `-h`。

显示当前命令的简明帮助。

### `--skip-dependency-check`

跳过无隔离构建时的构建依赖检查。仅影响启用 `build-dependency-check` 预览特性的构建：默认该特性会在构建前检查所选环境中声明、后端报告及传递的构建需求；隔离构建会自行安装所需依赖。该选项在帮助中隐藏。

### `--package`

格式：`--package <PACKAGE>`。构建 workspace 中的特定包。workspace 从源目录（未提供时为当前目录）发现；成员不存在时报错退出。与 `--all-packages` 互斥。

### `--all-packages`

构建 workspace 中的全部包。别名 `--all`；与 `--package` 互斥。

### `--out-dir`

短旗标 `-o`。格式：`--out-dir <OUT_DIR>`。分发物写入的输出目录；默认为源目录下的 `dist` 子目录，或 sdist 归档所在目录。

### `--sdist`

从给定目录构建源分发物（sdist）。

### `--wheel`

从给定目录构建二进制分发物（wheel）。

### `--list`

使用 uv 构建后端时，列出构建将会包含的文件。除构建 wheel 需要 sdist 的情况外跳过实际构建；文件列表不经 PEP 517 环境直接收集，且仅 uv 构建后端支持（PEP 517 没有对应的文件列表钩子）。可与 `--sdist`、`--wheel` 组合以检查不同构建路径；预览中，该选项在帮助中隐藏。

### `--build-logs`

显示构建后端日志，`--no-build-logs` 的反义项。该选项在帮助中隐藏。

### `--no-build-logs`

隐藏来自构建后端的日志。

### `--force-pep517`

始终经 PEP 517 构建，不对 uv 构建后端使用快速路径。默认对使用 uv 构建后端的包，uv 不创建 PEP 517 构建环境，而是直接调用构建后端的快速路径；与 `--list` 互斥。

### `--clear`

构建前清空输出目录，移除陈旧产物。

### `--create-gitignore`

在输出目录创建 `.gitignore`，`--no-create-gitignore` 的反义项。该选项在帮助中隐藏。

### `--no-create-gitignore`

不在输出目录创建 `.gitignore` 文件。默认会创建该文件，将构建产物排除出版本控制。

### `--build-constraints`

短旗标 `-b`。格式：`--build-constraints <BUILD_CONSTRAINTS>`。构建分发物时，用给定的 requirements 文件约束构建依赖。约束文件类似 `requirements.txt`，只控制构建依赖安装的版本，本身不会引入包。别名 `--build-constraint`；对应环境变量 `UV_BUILD_CONSTRAINT`。

### `--python`

短旗标 `-p`。格式：`--python <PYTHON>`。构建环境使用的 Python 解释器。默认在隔离的虚拟环境中执行构建，所发现的解释器用于创建这些环境，并按平台符号链接或复制进去。对应环境变量 `UV_PYTHON`。

### `--require-hashes`

要求每个依赖都有匹配的哈希。默认 uv 校验 requirements 文件中出现的哈希，但不要求全部依赖带哈希；启用后所有依赖必须带哈希并固定到精确版本或直接 URL，且不支持 Git、可编辑与本地目录依赖。对应环境变量 `UV_REQUIRE_HASHES`。

### `--no-require-hashes`

不强制哈希模式，`--require-hashes` 的反义项。该选项在帮助中隐藏。

### `--verify-hashes`

校验 requirements 文件中出现的哈希，`--no-verify-hashes` 的反义项。该选项在帮助中隐藏。

### `--no-verify-hashes`

禁用 requirements 文件中哈希的校验；默认会校验出现的哈希，强制校验用 `--require-hashes`。对应环境变量 `UV_NO_VERIFY_HASHES`。

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

短旗标 `-U`。允许包升级，忽略既有输出文件中的固定版本；隐含 `--refresh`。

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

格式：`--exclude-newer-package <EXCLUDE_NEWER_PACKAGE>`。特定包的上传日期过滤，格式 `PACKAGE=DATE`；可多次传入。

### `--link-mode`

格式：`--link-mode <LINK_MODE>`。从全局缓存安装包时使用的链接方式（本命令仅在构建 sdist 时使用）；macOS 与 Linux 默认 `clone`（写时复制），Windows 默认 `hardlink`。慎用 symlink：清除缓存会使已安装包失效。对应环境变量 `UV_LINK_MODE`。

### `--no-sources`

解析时忽略 `tool.uv.sources` 表，按可发布的标准元数据解析，不使用 workspace、Git、URL 或本地路径来源。对应环境变量 `UV_NO_SOURCES`。

### `--no-sources-package`

格式：`--no-sources-package <NO_SOURCES_PACKAGE>`。特定包不使用 `tool.uv.sources` 表中的来源。

### `--no-build`

不构建源分发物：复用此前构建的缓存 wheel，需要构建 sdist 的操作会报错退出；第一方包（如 workspace 内项目）仍会构建，可编辑依赖仍会构建。对应环境变量 `UV_NO_BUILD`。

### `--build`

允许构建，`--no-build` 的反义项。该选项在帮助中隐藏。

### `--no-build-package`

格式：`--no-build-package <NO_BUILD_PACKAGE>`。特定包不构建源分发物；第一方包仍会构建。

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

常用映射：`UV_PYTHON`（构建解释器）、`UV_BUILD_CONSTRAINT`（构建约束）、`UV_REQUIRE_HASHES`/`UV_NO_VERIFY_HASHES`（哈希校验）、`UV_INDEX`/`UV_DEFAULT_INDEX`/`UV_INDEX_URL`/`UV_EXTRA_INDEX_URL`/`UV_FIND_LINKS`（索引来源）、`UV_INDEX_STRATEGY`/`UV_RESOLUTION`/`UV_PRERELEASE`/`UV_FORK_STRATEGY`（解析策略）、`UV_NO_BUILD`/`UV_NO_BINARY`（构建与二进制）、`UV_NO_SOURCES`、`UV_EXCLUDE_NEWER` 等。命令行传入的选项优先于环境变量。

## 使用提醒

- 默认构建 sdist 与 wheel 两者（wheel 由 sdist 构建）；只构建其中之一时显式传 `--sdist` 或 `--wheel`。
- 在 workspace 中默认构建根包，用 `--package`/`--all-packages` 选择其他成员。
- 产物默认写入 `dist`；目录会按需创建，默认附带 `.gitignore`（用 `--no-create-gitignore` 关闭）。
- 构建完成后可用 [uv publish](cli:command:publish) 上传产物。

## 示例

构建 sdist 与 wheel 到 `dist`：

```console
$ uv build
```

只构建 wheel：

```console
$ uv build --wheel
```

从 sdist 归档构建 wheel，并输出到指定目录：

```console
$ uv build -o dist-0.1.0 dist/package-0.1.0.tar.gz --wheel
```

以上示例为说明性内容，未实际运行。

## 源码补充

命令定义于 `Commands::Build` 与 `BuildArgs`，哈希、解析、构建与刷新选项来自 `HashCheckingArgs`/`ResolverArgs`/`BuildOptionsArgs`/`RefreshArgs` 等共享参数组（[crates/uv-cli/src/lib.rs](https://github.com/astral-sh/uv/blob/70fe1196a546e49148a73b1c592b2f74c33af80e/crates/uv-cli/src/lib.rs)）。
