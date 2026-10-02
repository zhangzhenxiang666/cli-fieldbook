---
title: uv python install
command:
  - python
  - install
---

## 简介

下载并安装 Python 版本。

支持 CPython 与 PyPy：CPython 发行版来自 Astral 的 `python-build-standalone` 项目，PyPy 发行版来自 `python.org`。可用的 Python 版本列表随每个 uv 发布打包，安装新版本前可能需要先升级 uv。版本安装到 uv 的 Python 目录（可用 [uv python dir](cli:command:python/dir) 查看）；默认还会把带次版本后缀的可执行文件（如 `python3.13`）加入可执行目录，要同时安装 `python3` 与 `python` 需使用 `--default`。可一次请求多个版本，请求语法见概念文章 [Python 版本](../../../concepts/python-versions.md)。

## 参数

### `targets`

格式：`[TARGETS]...`。可选，可多次传入。要安装的 Python 版本请求。未提供时依次从 `UV_PYTHON` 环境变量与 `.python-versions`、`.python-version` 文件读取；若都不存在，uv 会检查是否安装过任何版本，没有则安装最新的稳定版 Python。

## 选项

### `--help`

短旗标 `-h`。

显示本命令的简明帮助。

### `--install-dir`

短旗标 `-i`。格式：`--install-dir <INSTALL_DIR>`。存放 Python 安装的目录，默认 `~/.local/share/uv/python`（当前值可用 [uv python dir](cli:command:python/dir) 查看）。使用此选项后，后续操作需设置 `UV_PYTHON_INSTALL_DIR` 才能让 uv 发现该安装。对应环境变量 `UV_PYTHON_INSTALL_DIR`。

### `--bin`

把 Python 可执行文件安装到 `bin` 目录。这是默认行为；显式提供该旗标时，若无法安装可执行文件 uv 会报错。该选项在帮助中隐藏。也可用 `UV_PYTHON_INSTALL_BIN=1` 设置；目标目录由 `UV_PYTHON_BIN_DIR` 控制。

### `--no-bin`

不把 Python 可执行文件安装到 `bin` 目录。可用 `UV_PYTHON_INSTALL_BIN=0` 设置。与 `--default` 互斥。

### `--registry`

把 Python 安装注册到 Windows 注册表。这是 Windows 上的默认行为；显式提供该旗标时，若无法创建注册表项 uv 会报错。该选项在帮助中隐藏。可用 `UV_PYTHON_INSTALL_REGISTRY=1` 设置。

### `--no-registry`

不把 Python 安装注册到 Windows 注册表。可用 `UV_PYTHON_INSTALL_REGISTRY=0` 设置。

### `--mirror`

格式：`--mirror <MIRROR>`。下载 Python 安装包的来源 URL 前缀，替换默认的 `https://github.com/astral-sh/python-build-standalone/releases/download`。支持 `file://` URL 从本地目录读取发行版。

### `--pypy-mirror`

格式：`--pypy-mirror <PYPY_MIRROR>`。下载 PyPy 安装包的来源 URL 前缀，替换默认的 `https://downloads.python.org/pypy`。支持 `file://` URL 从本地目录读取发行版。

### `--python-downloads-json-url`

格式：`--python-downloads-json-url <PYTHON_DOWNLOADS_JSON_URL>`。指向自定义 Python 安装清单 JSON 的 URL，用于替代内置的可用版本列表。

### `--reinstall`

短旗标 `-r`。重新安装已安装的请求版本；请求次版本时，所有匹配的已安装补丁版本都会被重装。默认版本已安装时 uv 直接成功退出。

### `--force`

短旗标 `-f`。安装时替换现有 Python 可执行文件。默认 uv 拒绝替换非其管理的可执行文件。隐含 `--reinstall`。

### `--upgrade`

短旗标 `-U`。把已安装的 Python 升级到最新补丁版本。默认 uv 不升级已安装版本；请求的版本尚未安装时会直接安装。仅支持次版本请求（如 `3.12`），请求补丁版本（如 `3.12.2`）时报错退出。

### `--default`

把请求的版本用作默认 Python 版本：除 `python{major}.{minor}`（如 `python3.10`）外，同时安装 `python{major}`（如 `python3`）与 `python`。替代变体仍保留标签，如安装 `3.13+freethreaded` 时提供 `python3t` 与 `pythont`。请求多个版本时报错；与 `--no-bin` 互斥。

### `--compile-bytecode`

安装后把 Python 标准库编译为字节码。默认 uv 不把 `.py` 文件编译为 `__pycache__/*.pyc`，而是在模块首次导入时懒编译；对启动时间敏感的场景（如 CLI 应用与 Docker 容器）可启用，以更长的安装时间和少量磁盘空间换取更快的启动。启用时处理该版本的 `stdlib` 目录并忽略编译错误。别名 `--compile`；对应环境变量 `UV_COMPILE_BYTECODE`。

### `--no-compile-bytecode`

`--compile-bytecode` 的反义项，不编译标准库字节码。该选项在帮助中隐藏。别名 `--no-compile`。

## 环境变量

- `UV_PYTHON`：未提供 `targets` 时的默认请求。
- `UV_PYTHON_INSTALL_DIR`：对应 `--install-dir`。
- `UV_PYTHON_INSTALL_BIN`：`1`/`0` 分别对应安装/不安装可执行文件（即 `--bin` / `--no-bin`）。
- `UV_PYTHON_INSTALL_REGISTRY`：`1`/`0` 分别对应是否写入 Windows 注册表（即 `--registry` / `--no-registry`）。
- `UV_PYTHON_BIN_DIR`：可执行文件的目标目录。
- `UV_COMPILE_BYTECODE`：对应 `--compile-bytecode`。

## 使用提醒

- 默认不覆盖非 uv 管理的现有可执行文件（如已存在的 `~/.local/bin/python3.12`）；确需覆盖用 `--force`。
- `--upgrade` 只接受次版本请求；对已装版本的常规升级也可用 [uv python upgrade](cli:command:python/upgrade)。
- 官方文档将 `--default` 标记为实验性选项，行为可能变化。

## 示例

安装指定次版本的最新补丁：

```console
$ uv python install 3.12
```

安装满足约束的版本：

```console
$ uv python install '>=3.8,<3.10'
```

一次安装多个版本：

```console
$ uv python install 3.9 3.10 3.11
```

以上示例为说明性内容，未实际运行。

## 源码补充

命令与选项定义见 `PythonCommand::Install` 与 `PythonInstallArgs`，字节码选项见 `PythonInstallCompileBytecodeArgs`（[crates/uv-cli/src/lib.rs](https://github.com/astral-sh/uv/blob/70fe1196a546e49148a73b1c592b2f74c33af80e/crates/uv-cli/src/lib.rs)）。
