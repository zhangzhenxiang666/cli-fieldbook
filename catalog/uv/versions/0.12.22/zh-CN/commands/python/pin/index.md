---
title: uv python pin
command:
  - python
  - pin
---

## 简介

固定到特定的 Python 版本。

把固定版本写入 `.python-version` 文件，其他 uv 命令用它确定所需的 Python 版本。未提供请求时，uv 查找现有 `.python-version` 文件并显示当前固定版本；找不到时报错退出。请求语法见概念文章 [Python 版本](../../../concepts/python-versions.md)。

## 参数

### `request`

格式：`[REQUEST]`。可选。要固定的 Python 版本请求。uv 支持的格式多于其他读取 `.python-version` 文件的工具（如 pyenv）；需要与这些工具互操作时，请只写版本号，避免 `cpython@3.10` 这类复杂请求。

## 选项

### `--help`

短旗标 `-h`。

显示本命令的简明帮助。

### `--resolved`

写入解析后的 Python 解释器路径，而非请求本身，确保始终使用同一个解释器。把 `.python-version` 文件提交到版本控制时，此选项通常不安全。

### `--no-resolved`

`--resolved` 的反义项，写回请求而非解释器路径。该选项在帮助中隐藏。

### `--no-project`

避免校验固定版本与项目或 workspace 的兼容性。默认会在当前目录或父目录中发现项目或 workspace，找到时把固定版本对 workspace 的 `requires-python` 约束进行校验。别名 `--no-workspace`；对应环境变量 `UV_NO_PROJECT`。

### `--global`

更新全局 Python 版本固定：把版本写入 uv 用户配置目录的 `.python-version` 文件，Linux/macOS 上为 `XDG_CONFIG_HOME/uv`，Windows 上为 `%APPDATA%/uv`。在工作目录及其祖先目录都找不到本地固定时，使用该版本。

### `--rm`

移除 Python 版本固定。与 `request`、`--resolved` 互斥。

### `--python-downloads-json-url`

格式：`--python-downloads-json-url <PYTHON_DOWNLOADS_JSON_URL>`。指向自定义 Python 安装清单 JSON 的 URL，用于替代内置的可用版本列表。

## 环境变量

- `UV_NO_PROJECT`：对应 `--no-project`。

## 使用提醒

- 固定只影响读取 `.python-version` 的 uv 命令；项目自身的 `requires-python` 约束仍会生效。
- uv 不会越过项目或 workspace 边界搜索 `.python-version` 文件（用户配置目录除外）。
- [uv init](cli:command:init) 默认也会写入 `.python-version` 文件。

## 示例

把当前项目固定到 Python 3.12：

```console
$ uv python pin 3.12
```

查看当前固定版本：

```console
$ uv python pin
```

移除固定：

```console
$ uv python pin --rm
```

以上示例为说明性内容，未实际运行。

## 差异与兼容性

`.python-version` 文件也被 pyenv 等工具读取。uv 接受的请求格式更多（如 `cpython@3.10`、版本约束）；这些工具只认版本号，需要互操作时请在文件中只保留版本号。

## 源码补充

命令与选项定义见 `PythonCommand::Pin` 与 `PythonPinArgs`（[crates/uv-cli/src/lib.rs](https://github.com/astral-sh/uv/blob/70fe1196a546e49148a73b1c592b2f74c33af80e/crates/uv-cli/src/lib.rs)）。
