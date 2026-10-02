---
title: uv python
command:
  - python
---

## 简介

管理 Python 版本与安装。

查找解释器时，uv 首先搜索虚拟环境——处于激活状态的 venv，或当前工作目录及各级父目录中 `.venv` 目录里的 venv；不需要虚拟环境时，再在 `PATH` 环境变量中搜索 Python 可执行文件，Windows 上还会额外搜索注册表。默认情况下，找不到满足请求的 Python 版本时 uv 会自动下载，该行为可用 `--no-python-downloads` 旗标或 `python-downloads` 设置禁用。uv 可发现 CPython、PyPy 与 GraalPy 解释器，不支持的实现会在发现过程中被跳过。

多数命令的 `--python` 选项可指定解释器请求，支持 `3.12`、`>=3.12,<3.13`、`3.13t`、`cpython@3.12`、可执行文件路径等多种格式，详见概念文章 [Python 版本](../../concepts/python-versions.md)。

子命令导览：[uv python list](cli:command:python/list) 列出已安装版本与可用下载；[uv python install](cli:command:python/install) 与 [uv python upgrade](cli:command:python/upgrade) 负责安装与升级；[uv python find](cli:command:python/find) 查找解释器并显示路径；[uv python pin](cli:command:python/pin) 把版本固定到 `.python-version` 文件；[uv python dir](cli:command:python/dir) 显示安装目录；[uv python uninstall](cli:command:python/uninstall) 卸载版本；[uv python update-shell](cli:command:python/update-shell) 确保 Python 可执行目录位于 `PATH`。

## 选项

### `--help`

短旗标 `-h`。

显示 `uv python` 的帮助与子命令列表。

## 使用提醒

- 各子命令继承全局选项（如 `--managed-python`、`--no-python-downloads`），参见[根命令](cli:command:)。
- uv 自行下载安装的 Python 称为受管理安装，其余安装（包括 pyenv 等工具管理的版本）统称系统安装；uv 默认优先使用受管理安装。
- 发现顺序、请求格式与自动下载的完整规则见概念文章 [Python 版本](../../concepts/python-versions.md)。

## 源码补充

分组说明与请求格式取自 `Commands::Python` 变体的长注释，子命令定义于 `PythonCommand`（[crates/uv-cli/src/lib.rs](https://github.com/astral-sh/uv/blob/70fe1196a546e49148a73b1c592b2f74c33af80e/crates/uv-cli/src/lib.rs)）。
