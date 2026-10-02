---
title: uv build-backend prepare-metadata-for-build-wheel
command:
  - build-backend
  - prepare-metadata-for-build-wheel
---

## 简介

PEP 517 钩子 `prepare_metadata_for_build_wheel`（隐藏入口）。

在给定目录中生成 wheel 的元数据，供前端在不构建 wheel 的情况下检查依赖。按 PEP 517 约定，后端须在目标目录中创建 `NAME-VERSION.dist-info` 目录并返回其 basename。由构建前端经 PEP 517 调用，钩子行为不作稳定接口。

## 参数

### `WHEEL_DIRECTORY`

格式：`<WHEEL_DIRECTORY>`。元数据写入的目标目录，对应钩子的 `metadata_directory` 参数。

## 选项

### `--help`

短旗标 `-h`。

显示当前命令的简明帮助。

## 使用提醒

- 该命令在帮助中隐藏，由 uv 构建后端的 Python shim 调用，不应手动运行。
- 前端可选择只调用此钩子获取元数据；随后的 `build_wheel` 会经 `--metadata-directory` 收到该目录。

## 源码补充

子命令定义于 `BuildBackendCommand::PrepareMetadataForBuildWheel`（[crates/uv-cli/src/lib.rs](https://github.com/astral-sh/uv/blob/70fe1196a546e49148a73b1c592b2f74c33af80e/crates/uv-cli/src/lib.rs)）。
