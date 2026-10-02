---
title: uv tool
command:
  - tool
---

## 简介

运行、安装并管理 Python 包提供的命令行工具。

工具（tools）是提供命令行接口的 Python 包。`uv tool` 子命令在彼此隔离、也与项目环境隔离的 venv 中运行或安装工具：`uv tool run`（别名 `uvx`）免安装临时执行，`uv tool install` 把可执行文件装入 `PATH` 上的可执行目录。工具环境、版本选择与可执行文件机制的背景见 [Tools 概念](../../concepts/tools.md)。

子命令：

- [uv tool run](cli:command:tool/run)：临时运行 Python 包提供的命令（`uvx` 为其别名）
- [uv tool install](cli:command:tool/install)：安装 Python 包提供的命令
- [uv tool upgrade](cli:command:tool/upgrade)：升级已安装的工具
- [uv tool list](cli:command:tool/list)：列出已安装的工具
- [uv tool audit](cli:command:tool/audit)：审计已安装工具及其依赖
- [uv tool uninstall](cli:command:tool/uninstall)：卸载工具
- [uv tool update-shell](cli:command:tool/update-shell)：确保工具可执行目录位于 `PATH`
- [uv tool dir](cli:command:tool/dir)：显示 uv 工具目录的路径

## 选项

### `--help`

短旗标 `-h`。

显示 `uv tool` 的简明帮助。传入 `--help` 时显示长帮助。

## 使用提醒

- 工具环境独立于项目环境，项目操作不会改动它；也不建议手动改动工具环境（例如用 pip 直接操作）。
- 工具的可执行目录必须位于 `PATH` 中，工具命令才能在 shell 里直接调用，否则 uv 会给出警告；可用 [uv tool update-shell](cli:command:tool/update-shell) 修补 shell 配置。
- `uv tool uvx` 是为 `uvx` 入口保留的隐藏别名，不在帮助中显示。

## 示例

安装一个工具并确认其可执行目录：

```console
$ uv tool install ruff
$ uv tool dir --bin
```

以上示例为说明性内容，未实际运行。

## 源码补充

子命令清单定义于 `ToolCommand` enum（[crates/uv-cli/src/lib.rs](https://github.com/astral-sh/uv/blob/70fe1196a546e49148a73b1c592b2f74c33af80e/crates/uv-cli/src/lib.rs)）。
