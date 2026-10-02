---
title: uv python upgrade
command:
  - python
  - upgrade
---

## 简介

升级已安装的 Python 版本。

把版本升级到最新受支持的补丁发布，例如 3.13.4 到 3.13.5。可提供一个或多个要升级的次版本目标（如 `3.13`）；未提供目标时升级全部受管理的 CPython 版本。升级期间不会卸载过时的补丁版本；升级完成后，uv 创建的 venv 会自动使用新版本，但在升级机制加入之前创建的 venv 仍使用旧版本，需重建环境才能升级。跨次版本（如 3.12 到 3.13）不属此命令范围，需要新次版本时用 [uv python install](cli:command:python/install)。

## 参数

### `targets`

格式：`[TARGETS]...`。可选，可多次传入。要升级的 Python 次版本，如 `3.13`。未提供时升级全部受管理的 CPython 版本。对应环境变量 `UV_PYTHON`。

## 选项

### `--help`

短旗标 `-h`。

显示本命令的简明帮助。

### `--install-dir`

短旗标 `-i`。格式：`--install-dir <INSTALL_DIR>`。存放 Python 安装的目录，默认 `~/.local/share/uv/python`（当前值可用 [uv python dir](cli:command:python/dir) 查看）。使用此选项后，后续操作需设置 `UV_PYTHON_INSTALL_DIR` 才能让 uv 发现该安装。对应环境变量 `UV_PYTHON_INSTALL_DIR`。

### `--mirror`

格式：`--mirror <MIRROR>`。下载 Python 安装包的来源 URL 前缀，替换默认的 `https://github.com/astral-sh/python-build-standalone/releases/download`。支持 `file://` URL 从本地目录读取发行版。

### `--pypy-mirror`

格式：`--pypy-mirror <PYPY_MIRROR>`。下载 PyPy 安装包的来源 URL 前缀，替换默认的 `https://downloads.python.org/pypy`。支持 `file://` URL 从本地目录读取发行版。

### `--reinstall`

短旗标 `-r`。最新补丁版本已安装时仍重新安装。默认此时 uv 直接成功退出。

### `--python-downloads-json-url`

格式：`--python-downloads-json-url <PYTHON_DOWNLOADS_JSON_URL>`。指向自定义 Python 安装清单 JSON 的 URL，用于替代内置的可用版本列表。

### `--compile-bytecode`

安装后把 Python 标准库编译为字节码。默认 uv 不把 `.py` 文件编译为 `__pycache__/*.pyc`，而是在模块首次导入时懒编译；对启动时间敏感的场景（如 CLI 应用与 Docker 容器）可启用，以更长的安装时间和少量磁盘空间换取更快的启动。启用时处理该版本的 `stdlib` 目录并忽略编译错误。别名 `--compile`；对应环境变量 `UV_COMPILE_BYTECODE`。

### `--no-compile-bytecode`

`--compile-bytecode` 的反义项，不编译标准库字节码。该选项在帮助中隐藏。别名 `--no-compile`。

## 环境变量

- `UV_PYTHON`：未提供 `targets` 时的默认目标。
- `UV_PYTHON_INSTALL_DIR`：对应 `--install-dir`。
- `UV_COMPILE_BYTECODE`：对应 `--compile-bytecode`。

## 使用提醒

- 升级仅支持 uv 受管理的安装；PyPy、GraalPy 与 Pyodide 暂不支持升级。
- uv 不做跨次版本的透明升级，因为次版本变化会影响依赖解析。
- [uv python install](cli:command:python/install) 的 `--upgrade` 选项提供等价的升级入口。

## 示例

把 Python 3.12 升级到最新补丁版本：

```console
$ uv python upgrade 3.12
```

升级全部已安装的受管理版本：

```console
$ uv python upgrade
```

以上示例为说明性内容，未实际运行。

## 源码补充

命令与选项定义见 `PythonCommand::Upgrade` 与 `PythonUpgradeArgs`，字节码选项见 `PythonInstallCompileBytecodeArgs`（[crates/uv-cli/src/lib.rs](https://github.com/astral-sh/uv/blob/70fe1196a546e49148a73b1c592b2f74c33af80e/crates/uv-cli/src/lib.rs)）。
