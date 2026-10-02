---
title: uv pip uninstall
command:
  - pip
  - uninstall
---

## 简介

从环境卸载包。

`uv pip uninstall` 按包名或 requirements 文件（`-r`）卸载包，是 [uv pip install](cli:command:pip/install) 的反向操作。与 pip 不同，uv 从不请求确认，`-y/--yes` 仅为兼容保留、无效果。默认需要 venv；也可用 `--target`/`--prefix` 指定目录卸载。

## 参数

### `package`

格式：`[PACKAGE]...`。要卸载的包，可多个。与 `--requirements` 同属必需的 `sources` 参数组：至少提供其一，且可以同时组合使用。

## 选项

### `--help`

短旗标 `-h`。显示 `uv pip uninstall` 的帮助。

### `--requirements`

短旗标 `-r`。格式：`--requirements <REQUIREMENTS>`。卸载给定文件中列出的包，可多次传入。支持 `requirements.txt`、带内联元数据的 `.py` 文件、`pylock.toml`、`pyproject.toml`、`setup.py`、`setup.cfg`。别名 `--requirement`；与 `package` 同属必需的 `sources` 参数组。

### `--python`

短旗标 `-p`。格式：`--python <PYTHON>`。卸载包所用的 Python 解释器。默认卸载要求在 venv 中进行；可以改为指向其他 Python，但仅建议在 CI 环境这样做并须谨慎使用，因为这可能修改系统 Python 安装。对应环境变量 `UV_PYTHON`。

### `--keyring-provider`

格式：`--keyring-provider <KEYRING_PROVIDER>`。尝试用 `keyring` 为远程 requirements 文件提供认证；当前仅支持 `subprocess`，即调用 `keyring` CLI。默认 `disabled`。对应环境变量 `UV_KEYRING_PROVIDER`。

### `--system`

从系统 Python 环境卸载。默认从当前目录或父目录中的 venv 卸载；`--system` 指示 uv 改用系统 `PATH` 中找到的第一个 Python。该选项面向 CI 环境，可能修改系统 Python 安装，须谨慎使用。对应环境变量 `UV_SYSTEM_PYTHON`。

### `--no-system`

`--system` 的反义项。该选项在帮助中隐藏。

### `--break-system-packages`

允许 uv 修改标记为 `EXTERNALLY-MANAGED` 的 Python 安装。面向在 CI 中操作由外部包管理器（如 `apt`）管理的 Python 的场景；这类安装明确不建议被其他包管理器修改，须谨慎使用。对应环境变量 `UV_BREAK_SYSTEM_PACKAGES`。

### `--no-break-system-packages`

`--break-system-packages` 的反义项，二者互相覆盖。

### `--target`

短旗标 `-t`。格式：`--target <TARGET>`。从指定的 `--target` 目录卸载包。与 `--prefix` 互斥。

### `--prefix`

格式：`--prefix <PREFIX>`。从指定的 `--prefix` 目录卸载包。与 `--target` 互斥。

### `--dry-run`

试运行：不实际卸载任何内容，只打印将执行的计划。

### `--yes`

短旗标 `-y`。pip 兼容选项：无效果，uv 仅发出警告（uv 从不请求卸载确认）。该选项在帮助中隐藏。

### `--disable-pip-version-check`

pip 兼容选项：无效果，uv 仅发出警告。该选项在帮助中隐藏。

## 环境变量

常用映射：`UV_PYTHON`、`UV_SYSTEM_PYTHON`、`UV_BREAK_SYSTEM_PACKAGES`、`UV_KEYRING_PROVIDER`。

## 差异与兼容性

- `-y/--yes` 仅为兼容 pip 保留，无效果：uv 卸载前从不请求确认。
- `--disable-pip-version-check` 仅为兼容保留，无效果，uv 仅发出警告。
- uv 不读取 `pip.conf` 与 `PIP_*` 环境变量。接口整体差异另见 [pip 接口](../../../concepts/pip-interface.md)。

## 使用提醒

- `package` 与 `--requirements` 至少提供其一，可组合使用。
- 默认要求在 venv 中卸载；`--system`、`--break-system-packages`、非 venv 的 `--python` 都可能影响系统 Python，主要面向 CI，须谨慎使用。
- 卸载是破坏性操作；配合 [uv pip list](cli:command:pip/list) 或 [uv pip freeze](cli:command:pip/freeze) 可先确认环境现状。

## 示例

卸载两个包：

```console
$ uv pip uninstall flask requests
```

按 requirements 文件卸载：

```console
$ uv pip uninstall -r requirements.txt
```

以上示例为说明性内容，未实际运行。

## 源码补充

参数定义于 `PipUninstallArgs`（[crates/uv-cli/src/lib.rs](https://github.com/astral-sh/uv/blob/70fe1196a546e49148a73b1c592b2f74c33af80e/crates/uv-cli/src/lib.rs)）；pip 兼容选项及警告语义见 `PipUninstallCompatArgs`（[crates/uv-cli/src/compat.rs](https://github.com/astral-sh/uv/blob/70fe1196a546e49148a73b1c592b2f74c33af80e/crates/uv-cli/src/compat.rs)）。
