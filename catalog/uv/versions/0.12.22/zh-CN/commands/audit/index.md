---
title: uv audit
command:
  - audit
---

## 简介

审计[项目](../../concepts/projects.md)的依赖：查询已知漏洞，以及弃用、隔离（quarantine）等"不利"状态。

默认审计项目内全部 extras 与依赖组（无论 `tool.uv.default-groups` 如何设置）；用 `--no-default-groups` 略去全部依赖组，用 `--no-extra`、`--no-group` 排除个别 extras 或组。漏洞查询默认使用 OSV 服务（`https://api.osv.dev/`）。

审计需要网络访问，无法在离线模式下进行。

## 选项

### `--help`

短旗标 `-h`。显示当前命令的简明帮助。传入 `--help` 时显示长帮助。

### `--no-extra`

格式：`--no-extra <NO_EXTRA>`。不审计指定的可选依赖，可多次传入。

### `--no-dev`

不审计开发依赖组，`--no-group dev` 的别名；要改为排除全部依赖组见 `--no-default-groups`。对应环境变量 `UV_NO_DEV`。仅在项目中可用。

### `--no-group`

格式：`--no-group <NO_GROUP>`。不审计指定的依赖组，可多次传入（可用空格分隔）。对应环境变量 `UV_NO_GROUP`。

### `--no-default-groups`

除非显式请求，否则不审计依赖组：默认 `uv audit` 审计项目内全部依赖组（无论 `tool.uv.default-groups` 如何设置）；此选项关闭该默认，仍可用 `--only-group` 或 `--only-dev` 选择组。对应环境变量 `UV_NO_DEFAULT_GROUPS`。

### `--only-group`

格式：`--only-group <ONLY_GROUP>`。只审计指定依赖组，省略项目及其依赖；可多次传入，隐含 `--no-default-groups`。

### `--only-dev`

只审计开发依赖组，`--only-group dev` 的别名，隐含 `--no-default-groups`。与 `--no-dev` 互斥。

### `--locked`

断言 `uv.lock` 保持不变。对应环境变量 `UV_LOCKED`。要求 lockfile 是最新的；若 lockfile 缺失或需要更新，uv 将报错退出。与 `--frozen`、`--upgrade` 互斥。

### `--no-locked`

禁用 locked 模式，覆盖 `UV_LOCKED`。该选项在帮助中隐藏。

### `--frozen`

在不锁定项目的情况下审计需求。对应环境变量 `UV_FROZEN`。若 lockfile 缺失，uv 将报错退出。与 `--locked`、`--upgrade` 互斥。

### `--no-frozen`

禁用 frozen 模式，覆盖 `UV_FROZEN`。该选项在帮助中隐藏。

### `--offline`

该选项在帮助中隐藏。审计需要网络访问、不支持离线模式；此本地选项用于屏蔽全局 `--offline` 的继承。

### `--output-format`

格式：`--output-format <OUTPUT_FORMAT>`。选择输出格式，取值 `text`、`json` 或 `sarif`，默认 `text`。

### `--ignore`

格式：`--ignore <IGNORE>`。按 ID 忽略漏洞：匹配任一所给 ID（含别名）的漏洞将从审计结果中排除，可多次传入。

### `--ignore-until-fixed`

格式：`--ignore-until-fixed <IGNORE_UNTIL_FIXED>`。按 ID 忽略漏洞但仅在尚无修复时忽略：匹配任一所给 ID（含别名）的漏洞在其没有已知修复版本期间被排除；一旦出现修复版本，该漏洞会重新被报告。可多次传入。

### `--service-format`

格式：`--service-format <SERVICE_FORMAT>`。漏洞查询所用的服务格式，默认 `osv`（默认 URL 为 `https://api.osv.dev/`）；默认 URL 可用 `--service-url` 更改。

### `--service-url`

格式：`--service-url <SERVICE_URL>`。漏洞服务 API 端点的 URL；未提供时使用所选服务的默认 URL。服务需使用 OSV 协议，除非 `--service-format` 另有指定。

### `--script`

格式：`--script <SCRIPT>`。审计指定的 PEP 723 Python 脚本而非当前项目。脚本必须先经 [uv lock](cli:command:lock) 的 `--script` 锁定，然后才能审计。

### `--python-version`

格式：`--python-version <PYTHON_VERSION>`。审计时使用的 Python 版本，如 `--python-version 3.10` 审计在 Python 3.10 上安装时会包含的依赖。默认为所发现解释器的版本。

### `--python-platform`

格式：`--python-platform <PYTHON_PLATFORM>`。审计时使用的平台，以目标三元组表示（如 `x86_64-unknown-linux-gnu` 或 `aarch64-apple-darwin`）。

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

本命令的多数选项有对应的环境变量：`UV_NO_DEV`、`UV_NO_GROUP`、`UV_NO_DEFAULT_GROUPS`、`UV_LOCKED`、`UV_FROZEN`、`UV_INDEX`、`UV_DEFAULT_INDEX`、`UV_INDEX_URL`、`UV_EXTRA_INDEX_URL`、`UV_FIND_LINKS`、`UV_INDEX_STRATEGY`、`UV_KEYRING_PROVIDER`、`UV_RESOLUTION`、`UV_PRERELEASE`、`UV_FORK_STRATEGY`、`UV_EXCLUDE_NEWER`、`UV_NO_BUILD_ISOLATION`、`UV_LINK_MODE`、`UV_NO_SOURCES`、`UV_NO_BUILD`、`UV_NO_BINARY` 等。

## 使用提醒

- 审计结果基于 lockfile 的解析结果：`--locked` 要求 lockfile 最新，`--frozen` 直接使用现有 lockfile。
- 与多数命令不同，`uv audit` 默认纳入全部 extras 与依赖组（忽略 `tool.uv.default-groups`）；缩减范围靠 `--no-default-groups`、`--no-extra`、`--no-group`。
- 审计需要网络访问；全局 `--offline` 在此命令上不受支持。
- 审计已安装工具的依赖请用 [uv tool audit](cli:command:tool/audit)。

## 示例

审计项目的全部依赖：

```console
$ uv audit
```

排除文档类依赖组并输出 SARIF：

```console
$ uv audit --no-group docs --output-format sarif
```

审计一个已锁定的 PEP 723 脚本：

```console
$ uv lock --script example.py
$ uv audit --script example.py
```

以上示例为说明性内容，未实际运行。

## 源码补充

命令与选项定义于 `ProjectCommand::Audit`、`AuditArgs` 与 `AuditCommonArgs`（[crates/uv-cli/src/lib.rs](https://github.com/astral-sh/uv/blob/70fe1196a546e49148a73b1c592b2f74c33af80e/crates/uv-cli/src/lib.rs)）；索引与解析器类选项来自 `IndexArgs`、`ResolverArgs` 等共享参数组。

## 差异与兼容性

无 pip 对应物。语义上与 pip-audit 相近（默认同样面向 OSV 查询），但 `uv audit` 审计的是项目 lockfile 的解析结果而非已安装环境，并额外报告弃用、隔离等不利状态。`--index-url` 与 `--extra-index-url` 为兼容 pip 的旧拼写，已弃用。
