---
title: uv pip
command:
  - pip
---

## 简介

以 pip 兼容接口管理 Python 包。

`uv pip` 提供与 `pip`、`pip-tools`、`virtualenv` 常用命令对应的子命令，直接操作虚拟环境与其中已安装的包，而不像 uv 的项目接口（如 [uv sync](cli:command:sync)）那样自动管理环境。uv 不依赖也不调用 pip，只是提供与 pip 接口对齐的低层命令；uv 不读取 `pip.conf` 或 `PIP_INDEX_URL` 等 pip 专属配置，改用 `UV_*` 环境变量与 `uv.toml`。接口的整体语义与已知差异另见 [pip 接口](../../concepts/pip-interface.md)。

## 子命令导览

- [uv pip compile](cli:command:pip/compile)：把 `requirements.in` 等源文件解析为带精确版本的 `requirements.txt` 或 `pylock.toml`。
- [uv pip sync](cli:command:pip/sync)：让环境精确匹配 requirements 文件，未列出的包会被移除。
- [uv pip install](cli:command:pip/install)：向环境安装包及其依赖，不移除环境中的多余包。
- [uv pip uninstall](cli:command:pip/uninstall)：从环境卸载包。
- [uv pip freeze](cli:command:pip/freeze)：以 requirements 格式输出环境中已安装的包。
- [uv pip list](cli:command:pip/list)：以表格形式列出已安装的包，可对比最新版本。
- [uv pip show](cli:command:pip/show)：显示一个或多个已安装包的详细信息。
- [uv pip tree](cli:command:pip/tree)：显示环境的依赖树。
- [uv pip check](cli:command:pip/check)：校验已安装包的依赖兼容性。
- `uv pip debug`：显示调试信息；该子命令在帮助中隐藏且不受支持。

## 选项

### `--help`

短旗标 `-h`。

显示 `uv pip` 的简明帮助与子命令列表。

## 使用提醒

- 多数子命令默认作用于当前目录或父目录中发现的 venv，可用 `--python` 指定其他解释器；个别命令（如 [uv pip compile](cli:command:pip/compile)）只做解析，不安装任何包。
- 这些命令并非 pip 的逐字复刻，越偏离常见工作流越可能遇到行为差异；各命令页的"差异与兼容性"章节列出兼容参数与警告、报错语义。
- 为兼容 pip、pip-tools 而保留的无效选项多为隐藏选项，uv 只发出警告或直接报错，不改变行为。

## 示例

先编译再同步是 `pip-tools` 风格的典型工作流：

```console
$ uv pip compile requirements.in -o requirements.txt
$ uv pip sync requirements.txt
```

以上示例为说明性内容，未实际运行。

## 源码补充

子命令定义于 `PipCommand`（[crates/uv-cli/src/lib.rs](https://github.com/astral-sh/uv/blob/70fe1196a546e49148a73b1c592b2f74c33af80e/crates/uv-cli/src/lib.rs)）；pip 兼容参数及其警告语义见 [crates/uv-cli/src/compat.rs](https://github.com/astral-sh/uv/blob/70fe1196a546e49148a73b1c592b2f74c33af80e/crates/uv-cli/src/compat.rs)。
