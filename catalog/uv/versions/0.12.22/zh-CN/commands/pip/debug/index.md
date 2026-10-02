---
title: uv pip debug
command:
  - pip
  - debug
---

## 简介

显示调试信息（隐藏入口，不支持）。

`uv pip debug` 输出与当前环境相关的诊断信息。该子命令在 `uv pip --help` 中隐藏，上游明确标记为不受支持（unsupported），输出内容与行为不构成稳定接口，不建议在脚本或工作流中依赖。

## 选项

### `--help`

短旗标 `-h`。显示 `uv pip debug` 的帮助。

### `--platform`

格式：`--platform <PLATFORM>`。指定调试输出的目标平台。该选项在帮助中隐藏，随不受支持的命令一并保留。

### `--python-version`

格式：`--python-version <PYTHON_VERSION>`。指定调试输出的 Python 版本。该选项在帮助中隐藏，随不受支持的命令一并保留。

### `--implementation`

格式：`--implementation <IMPLEMENTATION>`。指定调试输出的 Python 实现。该选项在帮助中隐藏，随不受支持的命令一并保留。

### `--abi`

格式：`--abi <ABI>`。指定调试输出的 ABI。该选项在帮助中隐藏，随不受支持的命令一并保留。

## 使用提醒

- 该命令在帮助中隐藏且不受支持，全部选项亦在帮助中隐藏；调试环境问题时优先考虑 `--verbose` 全局选项与 [uv pip check](cli:command:pip/check)。

## 示例

查看调试输出：

```console
$ uv pip debug
```

以上示例为说明性内容，未实际运行。

## 源码补充

参数定义于 `PipDebugArgs`（[crates/uv-cli/src/lib.rs](https://github.com/astral-sh/uv/blob/70fe1196a546e49148a73b1c592b2f74c33af80e/crates/uv-cli/src/lib.rs)），其中四个选项均标记 `hide = true`，枚举文档为 "Display debug information (unsupported)"。
