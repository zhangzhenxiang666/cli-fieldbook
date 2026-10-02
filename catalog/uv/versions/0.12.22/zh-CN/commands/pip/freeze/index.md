---
title: uv pip freeze
command:
  - pip
  - freeze
---

## 简介

以 requirements 格式列出环境中已安装的包。

`uv pip freeze` 把环境中已安装的包输出为每行一条 `package==version` 的 requirements 格式，可直接作为 [uv pip compile](cli:command:pip/compile) 的约束输入或环境快照。editable 安装的包默认以 `-e` 行的形式包含在输出中。该子命令对应 pip 的 `freeze`。

## 选项

### `--help`

短旗标 `-h`。显示 `uv pip freeze` 的帮助。

### `--exclude-editable`

从输出中排除 editable 安装的包。

### `--exclude`

格式：`--exclude <EXCLUDE>`。从输出中排除指定的包，可多次传入。

### `--strict`

校验 Python 环境，检测缺失依赖或其他问题的包。

### `--no-strict`

`--strict` 的反义项。该选项在帮助中隐藏。

### `--python`

短旗标 `-p`。格式：`--python <PYTHON>`。列出包所用的 Python 解释器。默认列出 venv 中的包，未发现 venv 时显示系统 Python 环境中的包。对应环境变量 `UV_PYTHON`。

### `--path`

格式：`--path <PATHS>`。限定列出包的安装路径，可多次传入；接受普通路径或 `file://` URL。

### `--system`

列出系统 Python 环境中的包，并禁用 venv 发现。对应环境变量 `UV_SYSTEM_PYTHON`。

### `--no-system`

`--system` 的反义项。该选项在帮助中隐藏。

### `--target`

短旗标 `-t`。格式：`--target <TARGET>`。从指定的 `--target` 目录列出包。与 `--prefix`、`--path` 互斥。

### `--prefix`

格式：`--prefix <PREFIX>`。从指定的 `--prefix` 目录列出包。与 `--target`、`--path` 互斥。

### `--disable-pip-version-check`

pip 兼容选项：无效果，uv 仅发出警告。该选项在帮助中隐藏。

## 环境变量

常用映射：`UV_PYTHON`、`UV_SYSTEM_PYTHON`。

## 差异与兼容性

- `--disable-pip-version-check` 仅为兼容 pip 保留，无效果，uv 仅发出警告。
- uv 不读取 `pip.conf` 与 `PIP_*` 环境变量。接口整体差异另见 [pip 接口](../../../concepts/pip-interface.md)。

## 使用提醒

- 需要表格形式或含过期信息的结果时改用 [uv pip list](cli:command:pip/list)。
- `--target`、`--prefix`、`--path` 用于检查以这些方式安装的包，彼此互斥（`--path` 与另两者互斥）。

## 示例

导出当前环境的精确快照：

```console
$ uv pip freeze > requirements.txt
```

排除 editable 包后输出：

```console
$ uv pip freeze --exclude-editable
```

以上示例为说明性内容，未实际运行。

## 源码补充

参数定义于 `PipFreezeArgs`（[crates/uv-cli/src/lib.rs](https://github.com/astral-sh/uv/blob/70fe1196a546e49148a73b1c592b2f74c33af80e/crates/uv-cli/src/lib.rs)）；pip 兼容选项及警告语义见 `PipGlobalCompatArgs`（[crates/uv-cli/src/compat.rs](https://github.com/astral-sh/uv/blob/70fe1196a546e49148a73b1c592b2f74c33af80e/crates/uv-cli/src/compat.rs)）。
