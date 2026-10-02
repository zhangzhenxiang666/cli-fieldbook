---
title: uv python uninstall
command:
  - python
  - uninstall
---

## 简介

卸载 Python 版本。

要卸载的版本用请求语法指定，可一次提供多个；`--all` 则卸载全部受管理版本。本命令作用于 uv 安装在其 Python 目录中的版本（见 [uv python dir](cli:command:python/dir)）。请求语法见概念文章 [Python 版本](../../../concepts/python-versions.md)。

## 参数

### `targets`

格式：`<TARGETS>...`。必需，可多次传入。要卸载的 Python 版本请求。与 `--all` 互斥。

## 选项

### `--help`

短旗标 `-h`。

显示本命令的简明帮助。

### `--install-dir`

短旗标 `-i`。格式：`--install-dir <INSTALL_DIR>`。Python 安装所在目录。对应环境变量 `UV_PYTHON_INSTALL_DIR`。

### `--all`

卸载全部受管理的 Python 版本。与 `targets` 互斥。

## 环境变量

- `UV_PYTHON_INSTALL_DIR`：对应 `--install-dir`。

## 使用提醒

- 只影响 uv 受管理的安装；操作系统或其他工具安装的系统 Python 不在卸载范围内。
- 在 Windows 上，卸载时会移除目标版本的注册表项以及失效的注册表项。
- 相关命令：用 [uv python list](cli:command:python/list) 查看已安装版本，用 [uv python install](cli:command:python/install) 重新安装。

## 示例

卸载 Python 3.12：

```console
$ uv python uninstall 3.12
```

卸载全部受管理版本：

```console
$ uv python uninstall --all
```

以上示例为说明性内容，未实际运行。

## 源码补充

命令与选项定义见 `PythonCommand::Uninstall` 与 `PythonUninstallArgs`（[crates/uv-cli/src/lib.rs](https://github.com/astral-sh/uv/blob/70fe1196a546e49148a73b1c592b2f74c33af80e/crates/uv-cli/src/lib.rs)）。
