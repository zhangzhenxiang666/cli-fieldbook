---
title: uv python dir
command:
  - python
  - dir
---

## 简介

显示 uv Python 安装目录。

默认 Python 安装存放于 uv 数据目录：Unix 上为 `$XDG_DATA_HOME/uv/python` 或 `$HOME/.local/share/uv/python`，Windows 上为 `%APPDATA%\uv\data\python`。该目录可用 `UV_PYTHON_INSTALL_DIR` 覆盖。要改为查看 Python 可执行目录，使用 `--bin`。

## 选项

### `--help`

短旗标 `-h`。

显示本命令的简明帮助。

### `--bin`

显示 `uv python` 安装 Python 可执行文件的目录，而非安装目录。可执行目录按 XDG 标准确定，依次取自 `$UV_PYTHON_BIN_DIR`、`$XDG_BIN_HOME`、`$XDG_DATA_HOME/../bin`、`$HOME/.local/bin`。

## 环境变量

- `UV_PYTHON_INSTALL_DIR`：Python 安装目录，覆盖默认的数据目录位置。
- `UV_PYTHON_BIN_DIR`：Python 可执行目录，优先于其余 XDG 变量。

## 使用提醒

- 若可执行目录不在 `PATH` 中，可用 [uv python update-shell](cli:command:python/update-shell) 把它加入。
- [uv python install](cli:command:python/install) 的 `--install-dir` 与此处显示的目录对应。

## 示例

显示 Python 安装目录：

```console
$ uv python dir
```

显示 Python 可执行目录：

```console
$ uv python dir --bin
```

以上示例为说明性内容，未实际运行。

## 源码补充

命令与选项定义见 `PythonCommand::Dir` 与 `PythonDirArgs`（[crates/uv-cli/src/lib.rs](https://github.com/astral-sh/uv/blob/70fe1196a546e49148a73b1c592b2f74c33af80e/crates/uv-cli/src/lib.rs)）。
