---
title: uv python find
command:
  - python
  - find
---

## 简介

查找 Python 安装。

显示将使用的 Python 解释器路径。默认报告 uv 会使用的第一个解释器，包括激活 venv 中的解释器，或当前工作目录及各级父目录中 venv 的解释器；请求语法与发现规则见概念文章 [Python 版本](../../../concepts/python-versions.md)。

## 参数

### `request`

格式：`[REQUEST]`。可选。要查找的 Python 请求，如 `>=3.11`；未提供请求时，使用当前目录或父目录中所发现项目的 Python 要求。

## 选项

### `--help`

短旗标 `-h`。

显示本命令的简明帮助。

### `--no-project`

避免发现项目或 workspace。否则未提供请求时，会使用当前目录或父目录中所发现项目的 Python 要求。别名 `--no_workspace`；对应环境变量 `UV_NO_PROJECT`。

### `--system`

只查找系统 Python 解释器。默认 uv 会报告它将使用的第一个解释器，包括激活 venv 或当前目录及父目录中 venv 的解释器；此选项让 uv 跳过 venv 解释器，仅搜索系统路径。对应环境变量 `UV_SYSTEM_PYTHON`。

### `--no-system`

`--system` 的反义项，恢复默认的 venv 发现行为。该选项在帮助中隐藏。

### `--script`

格式：`--script <SCRIPT>`。为指定的 Python 脚本查找环境，而非为当前项目查找；脚本按 PEP 723 内联元数据声明解释器请求。与 `request`、`--no-project`、`--system`、`--no-system` 互斥。

### `--show-version`

显示将使用的 Python 版本而非解释器路径。

### `--resolve-links`

解析输出路径中的符号链接。启用时输出经过规范化（canonicalize）的路径。

### `--python-downloads-json-url`

格式：`--python-downloads-json-url <PYTHON_DOWNLOADS_JSON_URL>`。指向自定义 Python 安装清单 JSON 的 URL，用于替代内置的可用版本列表。

## 环境变量

- `UV_NO_PROJECT`：对应 `--no-project`。
- `UV_SYSTEM_PYTHON`：对应 `--system`。

## 使用提醒

- 默认输出受 venv 影响：`.venv` 目录出现在工作目录或其父目录，或设置了 `VIRTUAL_ENV` 时，优先于 `PATH` 上的解释器。
- 本命令只查找与显示，不安装；找不到满足请求的版本时的自动下载遵循全局 `python-downloads` 设置。

## 示例

显示默认将使用的解释器路径：

```console
$ uv python find
```

查找 3.11 及以上版本的解释器：

```console
$ uv python find '>=3.11'
```

忽略 venv，只查找系统解释器：

```console
$ uv python find --system
```

以上示例为说明性内容，未实际运行。

## 源码补充

命令与选项定义见 `PythonCommand::Find` 与 `PythonFindArgs`（[crates/uv-cli/src/lib.rs](https://github.com/astral-sh/uv/blob/70fe1196a546e49148a73b1c592b2f74c33af80e/crates/uv-cli/src/lib.rs)）。
