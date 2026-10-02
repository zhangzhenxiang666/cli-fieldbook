---
title: uv pip show
command:
  - pip
  - show
---

## 简介

显示一个或多个已安装包的信息。

`uv pip show` 报告指定包的版本、位置、声明的依赖等元数据；传入 `-f/--files` 时还会列出该包安装的全部文件。多个包可一次查询。该子命令对应 pip 的 `show`。

## 参数

### `package`

格式：`[PACKAGE]...`。要显示信息的包，可多个；按包名在目标环境中查找。

## 选项

### `--help`

短旗标 `-h`。显示 `uv pip show` 的帮助。

### `--strict`

校验 Python 环境，检测缺失依赖或其他问题的包。

### `--no-strict`

`--strict` 的反义项。该选项在帮助中隐藏。

### `--files`

短旗标 `-f`。显示每个包已安装文件的完整列表。

### `--python`

短旗标 `-p`。格式：`--python <PYTHON>`。查找包所用的 Python 解释器。默认在 venv 中查找，未发现 venv 时在系统 Python 环境中查找。对应环境变量 `UV_PYTHON`。

### `--system`

在系统 Python 环境中显示包，并禁用 venv 发现。对应环境变量 `UV_SYSTEM_PYTHON`。

### `--no-system`

`--system` 的反义项。该选项在帮助中隐藏。

### `--target`

短旗标 `-t`。格式：`--target <TARGET>`。从指定的 `--target` 目录显示包。与 `--prefix` 互斥。

### `--prefix`

格式：`--prefix <PREFIX>`。从指定的 `--prefix` 目录显示包。与 `--target` 互斥。

### `--disable-pip-version-check`

pip 兼容选项：无效果，uv 仅发出警告。该选项在帮助中隐藏。

## 环境变量

常用映射：`UV_PYTHON`、`UV_SYSTEM_PYTHON`。

## 差异与兼容性

- `--disable-pip-version-check` 仅为兼容 pip 保留，无效果，uv 仅发出警告。
- uv 不读取 `pip.conf` 与 `PIP_*` 环境变量。接口整体差异另见 [pip 接口](../../../concepts/pip-interface.md)。

## 使用提醒

- 查看整个环境的依赖结构用 [uv pip tree](cli:command:pip/tree)；只看清单用 [uv pip list](cli:command:pip/list) 或 [uv pip freeze](cli:command:pip/freeze)。
- 未安装的包无法显示信息；先用列表命令确认包名。

## 示例

查看两个包的详细信息：

```console
$ uv pip show flask requests
```

连同安装的文件一起显示：

```console
$ uv pip show --files flask
```

以上示例为说明性内容，未实际运行。

## 源码补充

参数定义于 `PipShowArgs`（[crates/uv-cli/src/lib.rs](https://github.com/astral-sh/uv/blob/70fe1196a546e49148a73b1c592b2f74c33af80e/crates/uv-cli/src/lib.rs)）；pip 兼容选项及警告语义见 `PipGlobalCompatArgs`（[crates/uv-cli/src/compat.rs](https://github.com/astral-sh/uv/blob/70fe1196a546e49148a73b1c592b2f74c33af80e/crates/uv-cli/src/compat.rs)）。
