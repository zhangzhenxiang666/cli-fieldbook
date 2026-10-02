---
title: uv build-backend build-wheel
command:
  - build-backend
  - build-wheel
---

## 简介

PEP 517 钩子 `build_wheel`（隐藏入口）。

在给定目录中构建 wheel。按 PEP 517 约定，后端须在目标目录中创建 wheel 文件，并返回该文件的 basename；若前端此前通过 `prepare_metadata_for_build_wheel` 获得了元数据目录，会经 `--metadata-directory` 传入。由构建前端经 PEP 517 调用，钩子行为不作稳定接口。

## 参数

### `WHEEL_DIRECTORY`

格式：`<WHEEL_DIRECTORY>`。wheel 写入的目标目录，对应钩子的 `wheel_directory` 参数。

## 选项

### `--help`

短旗标 `-h`。

显示当前命令的简明帮助。

### `--metadata-directory`

格式：`--metadata-directory <METADATA_DIRECTORY>`。此前由 `prepare_metadata_for_build_wheel` 生成的元数据目录，对应钩子的 `metadata_directory` 参数；后端可据此跳过重复的元数据生成。

## 使用提醒

- 该命令在帮助中隐藏，由 uv 构建后端的 Python shim 调用，不应手动运行。
- 构建包请使用 [uv build --wheel](cli:command:build) 或其他构建前端。

## 源码补充

子命令定义于 `BuildBackendCommand::BuildWheel`（[crates/uv-cli/src/lib.rs](https://github.com/astral-sh/uv/blob/70fe1196a546e49148a73b1c592b2f74c33af80e/crates/uv-cli/src/lib.rs)）。
