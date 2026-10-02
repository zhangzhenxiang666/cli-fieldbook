---
title: uv format
command:
  - format
---

## 简介

格式化[项目](../../concepts/projects.md)中的 Python 代码，使用 Ruff formatter。默认格式化项目中的全部 Python 文件，行为与在项目根目录运行 `ruff format` 相同。

用 `--check` 只检查文件是否已格式化而不修改；用 `--diff` 查看格式化变更的差异。传给 Ruff 的额外参数放在 `--` 之后。

此命令为 uv 0.12 新增。

## 参数

### `EXTRA_ARGS`

传给 Ruff 的额外参数，须放在 `--` 之后。例如 `uv format -- --line-length 100` 设置行宽，或 `uv format -- src/module/foo.py` 只格式化指定文件。

## 选项

### `--help`

短旗标 `-h`。显示当前命令的简明帮助。传入 `--help` 时显示长帮助。

### `--check`

只检查文件是否已格式化，不应用任何变更。

### `--diff`

显示格式化变更的 diff 而不应用。隐含 `--check`。

### `--version`

格式：`--version <VERSION>`。格式化所用的 Ruff 版本：接受作为精确固定的版本（如 `0.8.2`）、版本说明符（如 `>=0.8.0`）或 `latest`（使用最新可用版本）。默认使用受约束的 Ruff 版本区间（如 `>=0.15,<0.16`）。

### `--exclude-newer`

格式：`--exclude-newer <EXCLUDE_NEWER>`。仅考虑给定日期之前发布的 Ruff 版本。接受 RFC 3339 时间戳超集（如 `2006-12-02T02:07:43Z`）或同格式本地日期（如 `2006-12-02`），也接受相对"现在"的时长（如 `-1 week`）；用 `false` 禁用 `exclude-newer`。对应环境变量 `UV_EXCLUDE_NEWER`。

### `--no-project`

避免发现项目或 workspace：改为在当前目录（而非当前项目）的上下文中运行格式化工具，适合当前目录不是项目时。对应环境变量 `UV_NO_PROJECT`。

### `--show-version`

显示将用于格式化的 Ruff 版本。使用版本约束（如 `--version ">=0.8.0"`）或 `--version latest` 时，可用于核验实际解析到的版本。该选项在帮助中隐藏。

## 环境变量

`--exclude-newer` 对应 `UV_EXCLUDE_NEWER`；`--no-project` 对应 `UV_NO_PROJECT`。全局环境变量参见根命令页。

## 使用提醒

- 此命令面向项目内使用；uv 会按项目上下文（含配置发现）调用 Ruff formatter，需要脱离项目时用 `--no-project`。
- `--diff` 隐含 `--check`，二者都不会修改文件。
- Ruff 自身的选项不能直接跟在 `uv format` 后，必须置于 `--` 之后。

## 示例

格式化项目中的全部 Python 文件：

```console
$ uv format
```

检查并展示差异而不修改文件：

```console
$ uv format --check --diff
```

向 Ruff 传参并核验所用版本：

```console
$ uv format -- --line-length 100
$ uv format --show-version
```

以上示例为说明性内容，未实际运行。

## 源码补充

命令与选项定义于 `ProjectCommand::Format` 与 `FormatArgs`（[crates/uv-cli/src/lib.rs](https://github.com/astral-sh/uv/blob/70fe1196a546e49148a73b1c592b2f74c33af80e/crates/uv-cli/src/lib.rs)）。

## 差异与兼容性

无 pip 对应物；等价于在项目根目录运行 `ruff format`，但由 uv 按项目上下文管理 Ruff 的解析与执行。`--check` / `--diff` 的语义与 Ruff 同名选项一致。
