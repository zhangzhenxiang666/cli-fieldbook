---
title: uv
command: []
---

## 简介

极快的 Python 包管理器。

uv 用 Rust 编写，管理 Python 项目依赖、lockfile、Python 版本、虚拟环境与命令行工具，并提供 pip 兼容接口。本页是全局选项的总入口；各子命令的说明见对应命令页。

## 选项

### `--help`

短旗标 `-h`。

显示当前命令的简明帮助。传入 `--help` 时显示长帮助。

### `--version`

短旗标 `-V`。

显示 uv 的版本。

### `--no-cache`

短旗标 `-n`。格式：`--no-cache`。避免读写缓存，改在操作期间使用临时目录。等价于 pip 的 `--no-cache-dir`；由环境变量 `UV_NO_CACHE` 控制，接受 `true/false/1/0` 等布尔写法。

### `--cache-dir`

格式：`--cache-dir <CACHE_DIR>`。缓存目录路径。默认在 Unix 上为 `$XDG_CACHE_HOME/uv` 或 `$HOME/.cache/uv`，在 Windows 上为 `%LOCALAPPDATA%\uv\cache`；可用 `uv cache dir` 查看。缓存目录与目标环境位于同一文件系统时性能最好。对应环境变量 `UV_CACHE_DIR`。

### `--config-file`

格式：`--config-file <CONFIG_FILE>`。指定要使用的 `uv.toml` 配置文件路径。此上下文中不允许使用 `pyproject.toml` 提供配置。对应环境变量 `UV_CONFIG_FILE`。

### `--no-config`

避免发现配置文件（`pyproject.toml`、`uv.toml`）。默认会从当前目录、父目录与用户配置目录发现配置。对应环境变量 `UV_NO_CONFIG`。

### `--python-preference`

格式：`--python-preference <PYTHON_PREFERENCE>`。系统 Python 与受管理 Python 的优先级。该选项在帮助中隐藏；对应环境变量 `UV_PYTHON_PREFERENCE`。

### `--managed-python`

要求使用 uv 管理的 Python 版本。默认 uv 优先使用自管理的 Python，但在未安装时回退到系统 Python；此选项禁用系统 Python 回退。与 `--no-managed-python` 互相覆盖。对应环境变量 `UV_MANAGED_PYTHON`。

### `--no-managed-python`

禁用 uv 管理的 Python 版本，改为在系统上查找合适的 Python 版本。与 `--managed-python` 互相覆盖。对应环境变量 `UV_NO_MANAGED_PYTHON`。

### `--allow-python-downloads`

允许在需要时自动下载 Python。该选项在帮助中隐藏；对应环境变量 `UV_PYTHON_DOWNLOADS=auto`。

### `--no-python-downloads`

禁用 Python 的自动下载。对应环境变量 `UV_PYTHON_DOWNLOADS=never`。

### `--python-fetch`

格式：`--python-fetch <PYTHON_FETCH>`。已弃用的下载策略选项，由 `python-downloads` 设置取代。该选项在帮助中隐藏。

### `--quiet`

短旗标 `-q`。格式：`--quiet`。使用安静输出。重复传入（如 `-qq`）进入静默模式，uv 不向 stdout 写任何内容。与 `--verbose` 互斥。

### `--verbose`

短旗标 `-v`。格式：`--verbose`。使用详细输出。可用 `RUST_LOG` 环境变量配置细粒度日志。与 `--quiet` 互斥。

### `--no-color`

禁用颜色。为兼容 pip 提供；建议改用 `--color`。该选项在帮助中隐藏，与 `--color` 互斥。

### `--color`

格式：`--color <COLOR_CHOICE>`。控制输出中的颜色使用，取值 `auto`、`always` 或 `never`。默认在写入终端时自动检测颜色支持。

### `--native-tls`

已弃用：改用 `--system-certs`。是否从平台原生证书库加载 TLS 证书。该选项在帮助中隐藏。

### `--no-native-tls`

禁用平台原生证书库，对应已弃用的 `--native-tls` 反义项。该选项在帮助中隐藏。

### `--system-certs`

从平台原生证书库加载 TLS 证书。默认使用内置 Mozilla 根证书（可移植性更好，macOS 上尤其快）；依赖企业信任根（如强制代理）时启用此选项。对应环境变量 `UV_SYSTEM_CERTS`。

### `--no-system-certs`

禁用平台原生证书库，`--system-certs` 的反义项。该选项在帮助中隐藏。

### `--offline`

禁用网络访问。仅使用本地缓存数据与本地文件。对应环境变量 `UV_OFFLINE`。

### `--no-offline`

允许网络访问，`--offline` 的反义项。该选项在帮助中隐藏。

### `--allow-insecure-host`

格式：`--allow-insecure-host <ALLOW_INSECURE_HOST>`。允许与指定主机的不安全连接。接受主机名（如 `localhost`）、主机-端口对（如 `localhost:8080`）或 URL（如 `https://localhost`），可多次传入。列入的主机不做证书校验，仅在已验证来源的安全网络中使用。别名 `--trusted-host`；对应环境变量 `UV_INSECURE_HOST`。

### `--preview`

是否启用全部实验性预览特性。预览特性可能随时变化。该选项在帮助中隐藏；对应环境变量 `UV_PREVIEW`。

### `--no-preview`

禁用全部实验性预览特性。该选项在帮助中隐藏。

### `--preview-features`

格式：`--preview-features <PREVIEW_FEATURES>`。启用指定的实验性预览特性。接受逗号分隔值或多次传入。该选项在帮助中隐藏；别名 `--preview-feature`；对应环境变量 `UV_PREVIEW_FEATURES`。

### `--isolated`

避免发现 `pyproject.toml` 或 `uv.toml`。已弃用，建议改用 `--no-config`。该选项在帮助中隐藏。

### `--show-settings`

显示当前命令解析后的设置，用于调试与开发。该选项在帮助中隐藏。

### `--no-progress`

隐藏全部进度输出（如旋转指示器、进度条）。对应环境变量 `UV_NO_PROGRESS`。

### `--no-installer-metadata`

跳过向 site-packages 的 `.dist-info` 目录写入 uv 安装器元数据文件（`INSTALLER`、`REQUESTED`、`direct_url.json`）。该选项在帮助中隐藏；对应环境变量 `UV_NO_INSTALLER_METADATA`。

### `--directory`

格式：`--directory <DIRECTORY>`。运行命令前切换到指定目录。相对路径以该目录为基准解析。只切换项目根目录时改用 `--project`。对应环境变量 `UV_WORKING_DIR`。

### `--project`

格式：`--project <PROJECT>`。在指定目录中发现项目。从项目根向上遍历发现 `pyproject.toml`、`uv.toml`、`.python-version` 与 `.venv`；其他命令行参数仍相对当前工作目录解析。在 `uv pip` 接口中无效。对应环境变量 `UV_PROJECT`。

## 环境变量

各选项的环境变量映射见上文各选项说明；完整的变量清单另见官方参考。示例：`UV_NO_CACHE`、`UV_CACHE_DIR`、`UV_PYTHON_DOWNLOADS`、`UV_OFFLINE`、`UV_PROJECT`。

## 使用提醒

- 全局选项对所有子命令可用，通常也可通过环境变量与配置文件提供；命令行优先级最高。
- 多数 `--xxx`/`--no-xxx` 成对选项互相覆盖，以最后传入者为准。
- 隐藏选项（如 `--preview`、`--isolated`）在帮助中不显示，行为可能随版本变化，不建议在脚本中依赖。
- 本页帮助内容自固定提交源码重建，未采集二进制原始帮助；示例未实测。

## 示例

在附带详细输出的情况下运行任意子命令：

```console
$ uv --verbose sync
```

切换工作目录后再发现项目：

```console
$ uv --directory /path/to/project sync
```

以上示例为说明性内容，未实际运行。

## 源码补充

全局选项定义于 `Cli`/`TopLevelArgs`/`GlobalArgs`（[crates/uv-cli/src/lib.rs](https://github.com/astral-sh/uv/blob/70fe1196a546e49148a73b1c592b2f74c33af80e/crates/uv-cli/src/lib.rs)）；`--no-cache` 与 `--cache-dir` 定义于 `CacheArgs`（[crates/uv-cache/src/cli.rs](https://github.com/astral-sh/uv/blob/70fe1196a546e49148a73b1c592b2f74c33af80e/crates/uv-cache/src/cli.rs)）。
