---
title: uv pip tree
command:
  - pip
  - tree
---

## 简介

显示环境的依赖树。

`uv pip tree` 以树形展示环境中已安装包之间的依赖关系，可限制深度、剪枝、只看某些包，或用 `--invert` 反向展示"谁依赖了它"。`--outdated` 可在树中标注每个包的最新版本，`--show-sizes` 标注 wheel 的压缩体积。该子命令与 [uv tree](cli:command:tree) 类似，但面向 pip 接口管理的环境，读取的是已安装的包而非项目 lockfile。

## 选项

### `--help`

短旗标 `-h`。显示 `uv pip tree` 的帮助。

### `--show-version-specifiers`

显示施加在每个包上的版本约束（来自依赖方的需求说明符）。

### `--strict`

校验 Python 环境，检测缺失依赖或其他问题的包。

### `--no-strict`

`--strict` 的反义项。该选项在帮助中隐藏。

### `--python`

短旗标 `-p`。格式：`--python <PYTHON>`。列出包所用的 Python 解释器。默认列出 venv 中的包，未发现 venv 时显示系统 Python 环境中的包。对应环境变量 `UV_PYTHON`。

### `--system`

列出系统 Python 环境中的包，并禁用 venv 发现。对应环境变量 `UV_SYSTEM_PYTHON`。

### `--no-system`

`--system` 的反义项。该选项在帮助中隐藏。

### `--depth`

短旗标 `-d`。格式：`--depth <DEPTH>`。依赖树的最大展示深度，默认 `255`。

### `--prune`

格式：`--prune <PRUNE>`。从依赖树展示中剪除指定的包，可多次传入。

### `--package`

格式：`--package <PACKAGE>`。只展示指定的包（及其依赖子树），可多次传入。

### `--no-dedupe`

不去重重复出现的依赖。默认情况下已展示过依赖的包再次出现时不再重复展开，并以 `(*)` 标记；此选项使这些重复项完整展开。

### `--invert`

反向展示指定包的依赖关系：翻转树，显示哪些包依赖了 `--package` 给定的包。别名 `--reverse`。

### `--outdated`

显示树中每个包的最新可用版本。需要联网查询索引。

### `--show-sizes`

显示树中包的 wheel 压缩体积。

### `--index`

格式：`--index <INDEX>`。除默认索引外使用的索引，接受 PEP 503（simple repository API）兼容的仓库或同构布局的本地目录。多个 `--index` 先传入者优先，且均优先于 `--default-index` 指定的索引。对应环境变量 `UV_INDEX`。

### `--default-index`

格式：`--default-index <DEFAULT_INDEX>`。默认包索引，默认 https://pypi.org/simple 。接受 PEP 503 兼容仓库或同构布局的本地目录，优先级低于全部 `--index`。对应环境变量 `UV_DEFAULT_INDEX`。

### `--index-url`

短旗标 `-i`。格式：`--index-url <INDEX_URL>`。已弃用，改用 `--default-index`。包索引 URL，接受 PEP 503 兼容仓库或同构本地目录，优先级低于全部 `--extra-index-url`。对应环境变量 `UV_INDEX_URL`。

### `--extra-index-url`

格式：`--extra-index-url <EXTRA_INDEX_URL>`。已弃用，改用 `--index`。在 `--index-url` 之外使用的额外索引 URL，接受 PEP 503 兼容仓库或同构本地目录；多个时先传入者优先。对应环境变量 `UV_EXTRA_INDEX_URL`。

### `--find-links`

短旗标 `-f`。格式：`--find-links <FIND_LINKS>`。除注册表索引外查找候选分发的位置：为路径时须是顶层存放 wheel（`.whl`）或 sdist（如 `.tar.gz`、`.zip`）的目录；为 URL 时页面须是符合上述格式的平面链接列表。对应环境变量 `UV_FIND_LINKS`。

### `--no-index`

忽略注册表索引（如 PyPI），仅依赖直接 URL 依赖与 `--find-links` 提供的来源。

### `--index-strategy`

格式：`--index-strategy <INDEX_STRATEGY>`。多索引解析策略，默认 `first-index`：对每个包按索引顺序搜索并在首个包含它的索引处停止，以防"依赖混淆"攻击；可改选 `unsafe-first-match` 或 pip 风格的 `unsafe-best-match`。对应环境变量 `UV_INDEX_STRATEGY`。

### `--keyring-provider`

格式：`--keyring-provider <KEYRING_PROVIDER>`。尝试用 `keyring` 为索引 URL 提供认证；当前仅支持 `subprocess`，即调用 `keyring` CLI。默认 `disabled`。对应环境变量 `UV_KEYRING_PROVIDER`。

### `--exclude-newer`

格式：`--exclude-newer <EXCLUDE_NEWER>`。只考虑给定时间之前上传的候选包；比较对象是每个分发文件上传到索引的时间，而非包版本的发布日期。接受 RFC 3339 时间戳（如 `2006-12-02T02:07:43Z`）、同格式本地日期、友好时长（如 `24 hours`、`30 days`）或 ISO 8601 时长（如 `PT24H`、`P7D`），传 `false` 可禁用。对应环境变量 `UV_EXCLUDE_NEWER`。

### `--exclude-newer-package`

格式：`--exclude-newer-package <EXCLUDE_NEWER_PACKAGE>`。对特定包限制候选上传时间，接受 `PACKAGE=DATE` 对，日期格式同 `--exclude-newer`；可多次传入。

### `--disable-pip-version-check`

pip 兼容选项：无效果，uv 仅发出警告。该选项在帮助中隐藏。

## 环境变量

常用映射：`UV_PYTHON`、`UV_SYSTEM_PYTHON`、`UV_INDEX`、`UV_DEFAULT_INDEX`、`UV_INDEX_URL`、`UV_EXTRA_INDEX_URL`、`UV_FIND_LINKS`、`UV_INDEX_STRATEGY`、`UV_KEYRING_PROVIDER`、`UV_EXCLUDE_NEWER`。

## 差异与兼容性

- pip 自身没有对应的 `tree` 命令；此命令是 uv 在 pip 接口中提供的扩展。
- `--disable-pip-version-check` 仅为兼容 pip 保留，无效果，uv 仅发出警告。接口整体差异另见 [pip 接口](../../../concepts/pip-interface.md)。

## 使用提醒

- 树数据来自环境中已安装的包及其元数据；先用 [uv pip install](cli:command:pip/install) 或 [uv pip sync](cli:command:pip/sync) 准备环境。
- `--outdated`、`--show-sizes` 需要联网查询索引；`--invert` 需要配合 `--package` 指定目标包。
- 依赖兼容性校验用 [uv pip check](cli:command:pip/check)。

## 示例

限制深度并剪除噪声包：

```console
$ uv pip tree --depth 2 --prune setuptools
```

反向查看谁依赖了某个包：

```console
$ uv pip tree --invert --package requests
```

以上示例为说明性内容，未实际运行。

## 源码补充

参数定义于 `PipTreeArgs`，树展示选项见 `DisplayTreeArgs`，索引选项见 `IndexArgs`、`FetchArgs`（[crates/uv-cli/src/lib.rs](https://github.com/astral-sh/uv/blob/70fe1196a546e49148a73b1c592b2f74c33af80e/crates/uv-cli/src/lib.rs)）；pip 兼容选项及警告语义见 `PipGlobalCompatArgs`（[crates/uv-cli/src/compat.rs](https://github.com/astral-sh/uv/blob/70fe1196a546e49148a73b1c592b2f74c33af80e/crates/uv-cli/src/compat.rs)）。
