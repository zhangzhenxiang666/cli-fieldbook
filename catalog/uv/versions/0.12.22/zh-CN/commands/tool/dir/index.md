---
title: uv tool dir
command:
  - tool
  - dir
---

## 简介

显示 uv 工具目录的路径。

工具目录用于存放已安装工具的环境与元数据，默认位于 uv 数据目录：Unix 上为 `$XDG_DATA_HOME/uv/tools` 或 `$HOME/.local/share/uv/tools`，Windows 上为 `%APPDATA%\uv\data\tools`；可用环境变量 `UV_TOOL_DIR` 覆盖。默认显示的是工具环境目录；要查看 uv 安装可执行文件的目录，使用 `--bin`。

## 选项

### `--help`

短旗标 `-h`。显示简明帮助；传入 `--help` 时显示长帮助。

### `--bin`

显示 `uv tool` 安装可执行文件的目录；默认显示的是工具 Python 环境本身的安装目录。可执行目录按 XDG 标准依次取自以下环境变量（按优先级）：`$UV_TOOL_BIN_DIR`、`$XDG_BIN_HOME`、`$XDG_DATA_HOME/../bin`、`$HOME/.local/bin`。

## 环境变量

- `UV_TOOL_DIR`：覆盖工具目录（工具环境与元数据的存放位置）。
- `UV_TOOL_BIN_DIR`：覆盖工具可执行目录（`--bin` 显示的目标，优先级最高）。

## 使用提醒

- 可执行目录必须位于 `PATH` 中工具命令才可直接调用；不在时可用 [uv tool update-shell](cli:command:tool/update-shell) 修补 shell 配置。

## 示例

查看工具目录与可执行目录：

```console
$ uv tool dir
$ uv tool dir --bin
```

以上示例为说明性内容，未实际运行。

## 源码补充

命令与 `--bin` 的目录推导说明定义于 `ToolCommand::Dir`/`ToolDirArgs`（[crates/uv-cli/src/lib.rs](https://github.com/astral-sh/uv/blob/70fe1196a546e49148a73b1c592b2f74c33af80e/crates/uv-cli/src/lib.rs)）。
