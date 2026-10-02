---
title: uv pip check
command:
  - pip
  - check
---

## 简介

校验已安装包的依赖兼容性。

`uv pip check` 检查环境中已安装包声明的依赖是否都已安装且满足版本要求，报告缺失或不兼容的依赖；全部满足时命令成功结束。可用 `--python-version`、`--python-platform` 按其他目标环境校验。该子命令对应 pip 的 `check`。

## 选项

### `--help`

短旗标 `-h`。显示 `uv pip check` 的帮助。

### `--python`

短旗标 `-p`。格式：`--python <PYTHON>`。校验包所用的 Python 解释器。默认校验 venv 中的包，未发现 venv 时校验系统 Python 环境中的包。对应环境变量 `UV_PYTHON`。

### `--system`

校验系统 Python 环境中的包，并禁用 venv 发现。对应环境变量 `UV_SYSTEM_PYTHON`。

### `--no-system`

`--system` 的反义项。该选项在帮助中隐藏。

### `--python-version`

格式：`--python-version <PYTHON_VERSION>`。校验面向的 Python 版本；默认按当前解释器的版本校验已安装的包。

### `--python-platform`

格式：`--python-platform <PYTHON_PLATFORM>`。校验面向的平台，默认按当前解释器的平台校验。用 target triple 表示，如 `x86_64-unknown-linux-gnu` 或 `aarch64-apple-darwin`。macOS（Darwin）与 iOS 默认最低版本 `13.0`（可用 `MACOSX_DEPLOYMENT_TARGET`、`IPHONEOS_DEPLOYMENT_TARGET` 指定其他值），Android 默认最低 API 级别 `24`（可用 `ANDROID_API_LEVEL` 指定）。

## 环境变量

常用映射：`UV_PYTHON`、`UV_SYSTEM_PYTHON`。

## 差异与兼容性

- 该命令没有 pip 兼容占位选项；与 pip 的差异主要在校验所用的元数据与标记求值细节。
- uv 不读取 `pip.conf` 与 `PIP_*` 环境变量。接口整体差异另见 [pip 接口](../../../concepts/pip-interface.md)。

## 使用提醒

- 只读取环境中已安装包的元数据，不需要联网。
- [uv pip sync](cli:command:pip/sync) 与 [uv pip install](cli:command:pip/install) 的 `--strict` 会在安装后执行同类校验。

## 示例

校验当前环境：

```console
$ uv pip check
```

按另一个 Python 版本校验：

```console
$ uv pip check --python-version 3.12
```

以上示例为说明性内容，未实际运行。

## 源码补充

参数定义于 `PipCheckArgs`（[crates/uv-cli/src/lib.rs](https://github.com/astral-sh/uv/blob/70fe1196a546e49148a73b1c592b2f74c33af80e/crates/uv-cli/src/lib.rs)）。
