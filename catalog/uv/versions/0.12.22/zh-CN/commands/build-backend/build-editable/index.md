---
title: uv build-backend build-editable
command:
  - build-backend
  - build-editable
---

## 简介

PEP 660 钩子 `build_editable`（隐藏入口）。

在给定目录中构建可编辑安装用的 wheel。按 PEP 660 约定，其参数与返回值和 PEP 517 的 `build_wheel` 相同：在目标目录中创建 wheel 文件并返回其 basename，区别在于 wheel 以可编辑（开发模式）方式引用源码。由构建前端经 PEP 517 调用，钩子行为不作稳定接口。

## 参数

### `WHEEL_DIRECTORY`

格式：`<WHEEL_DIRECTORY>`。wheel 写入的目标目录，对应钩子的 `wheel_directory` 参数。

## 选项

### `--help`

短旗标 `-h`。

显示当前命令的简明帮助。

### `--metadata-directory`

格式：`--metadata-directory <METADATA_DIRECTORY>`。此前由 `prepare_metadata_for_build_editable` 生成的元数据目录，对应钩子的 `metadata_directory` 参数。

## 使用提醒

- 该命令在帮助中隐藏，由 uv 构建后端的 Python shim 调用，不应手动运行。
- 以可编辑方式安装项目请使用 [uv sync --editable](cli:command:sync) 或 [uv pip install -e](cli:command:pip/install)。

## 源码补充

子命令定义于 `BuildBackendCommand::BuildEditable`（[crates/uv-cli/src/lib.rs](https://github.com/astral-sh/uv/blob/70fe1196a546e49148a73b1c592b2f74c33af80e/crates/uv-cli/src/lib.rs)）。
