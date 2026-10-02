---
title: uv upgrade
command:
  - upgrade
---

## 简介

升级[项目](../../concepts/projects.md)中的依赖：更新 [lockfile](../../concepts/lockfile.md) 中选定包的锁定版本。可指定要升级的包；`--exclude` 用于排除特定包。

该命令在帮助中隐藏，属于 `uv lock --upgrade` / `--upgrade-package` 的便捷入口；脚本中建议使用显式的 [uv lock](cli:command:lock) 调用。

## 参数

### `PACKAGES`

要升级的包，可给出多个；不提供时作用于全部依赖。

## 选项

### `--help`

短旗标 `-h`。显示当前命令的简明帮助。传入 `--help` 时显示长帮助。

### `--exclude`

格式：`--exclude <EXCLUDE>`。升级时排除指定名称的包。

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

### `--index-strategy`

格式：`--index-strategy <INDEX_STRATEGY>`。多索引解析策略，默认 `first-index`：在包可用的第一个索引处停止并仅在该索引内解析，以防"依赖混淆"攻击。对应环境变量 `UV_INDEX_STRATEGY`。

### `--keyring-provider`

格式：`--keyring-provider <KEYRING_PROVIDER>`。尝试用 `keyring` 为索引 URL 做认证；目前仅支持 `subprocess`（通过 `keyring` CLI 处理认证），默认 `disabled`。对应环境变量 `UV_KEYRING_PROVIDER`。

## 环境变量

`--index` 对应 `UV_INDEX`，`--default-index` 对应 `UV_DEFAULT_INDEX`，`--index-url` 对应 `UV_INDEX_URL`，`--extra-index-url` 对应 `UV_EXTRA_INDEX_URL`，`--find-links` 对应 `UV_FIND_LINKS`，`--index-strategy` 对应 `UV_INDEX_STRATEGY`，`--keyring-provider` 对应 `UV_KEYRING_PROVIDER`。

## 使用提醒

- 该命令在帮助中隐藏，公开接口是 [uv lock](cli:command:lock) 的 `--upgrade` 与 `--upgrade-package`，以及 [uv sync](cli:command:sync)、[uv add](cli:command:add) 等命令上的同名选项。
- 升级只改 lockfile；要让环境跟上，随后执行 `uv sync`。
- 升级工具类安装请用 [uv tool upgrade](cli:command:tool/upgrade)，升级 Python 版本请用 [uv python upgrade](cli:command:python/upgrade)。

## 示例

升级全部依赖：

```console
$ uv upgrade
```

只升级指定包：

```console
$ uv upgrade httpx
```

以上示例为说明性内容，未实际运行。

## 源码补充

命令与选项定义于 `ProjectCommand::Upgrade` 与 `UpgradeArgs`（[crates/uv-cli/src/lib.rs](https://github.com/astral-sh/uv/blob/70fe1196a546e49148a73b1c592b2f74c33af80e/crates/uv-cli/src/lib.rs)）；索引与注册表客户端选项来自 `IndexArgs`、`RegistryClientArgs` 共享参数组。
