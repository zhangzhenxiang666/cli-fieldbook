---
title: uv python list
command:
  - python
  - list
---

## 简介

列出可用的 Python 安装。

默认同时显示已安装的 Python 版本，以及每个受支持主版本的最新可用补丁版本下载项（仅当前平台与架构）。可提供请求过滤输出；请求语法与发现规则见概念文章 [Python 版本](../../../concepts/python-versions.md)。

## 参数

### `request`

格式：`[REQUEST]`。可选。用于过滤列表的 Python 请求，如 `3.13` 或 `pypy`。

## 选项

### `--help`

短旗标 `-h`。

显示本命令的简明帮助。

### `--all-versions`

列出全部 Python 版本，包括旧的补丁版本。默认每个次版本只显示最新补丁版本。

### `--all-platforms`

列出所有平台的 Python 下载项。默认只显示当前平台的下载项。

### `--all-arches`

列出所有架构的 Python 下载项。默认只显示当前架构的下载项。别名 `--all_architectures`。

### `--only-installed`

只显示已安装的 Python 版本。默认同时显示已安装的发行版与当前平台的可用下载项。与 `--only-downloads` 互斥。

### `--only-downloads`

只显示可用的 Python 下载项。默认同时显示已安装的发行版与当前平台的可用下载项。与 `--only-installed` 互斥。

### `--show-urls`

显示可用 Python 下载项的 URL。默认显示为 `<download available>`。

### `--output-format`

格式：`--output-format <OUTPUT_FORMAT>`。选择输出格式，取值 `text` 或 `json`，默认 `text`。

### `--python-downloads-json-url`

格式：`--python-downloads-json-url <PYTHON_DOWNLOADS_JSON_URL>`。指向自定义 Python 安装清单 JSON 的 URL，用于替代内置的可用版本列表。

## 使用提醒

- 只查看 uv 受管理的版本或将其排除，可配合继承的全局选项 `--managed-python` / `--no-managed-python`。
- 可下载的 Python 版本随每个 uv 发布打包；要看到新发布的版本，需先升级 uv。

## 示例

列出已安装版本与可用下载：

```console
$ uv python list
```

仅查看 Python 3.13 的解释器：

```console
$ uv python list 3.13
```

以 JSON 输出全部版本：

```console
$ uv python list --all-versions --output-format json
```

以上示例为说明性内容，未实际运行。

## 差异与兼容性

`ls` 是本命令的别名，`uv python ls` 等价于 `uv python list`；受命令协议中别名全局唯一的限制，该别名未登记在命令清单里。

## 源码补充

命令与选项定义见 `PythonCommand::List` 与 `PythonListArgs`（[crates/uv-cli/src/lib.rs](https://github.com/astral-sh/uv/blob/70fe1196a546e49148a73b1c592b2f74c33af80e/crates/uv-cli/src/lib.rs)）。
