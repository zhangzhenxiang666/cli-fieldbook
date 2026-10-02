---
title: uv build-backend build-sdist
command:
  - build-backend
  - build-sdist
---

## 简介

PEP 517 钩子 `build_sdist`（隐藏入口）。

在给定目录中构建源分发物（sdist）。按 PEP 517 约定，后端须在目标目录中创建 `NAME-VERSION.tar.gz` 形式的归档，并返回该文件的 basename。由构建前端经 PEP 517 调用，钩子行为不作稳定接口。

## 参数

### `SDIST_DIRECTORY`

格式：`<SDIST_DIRECTORY>`。sdist 归档写入的目标目录，对应钩子的 `sdist_directory` 参数。

## 选项

### `--help`

短旗标 `-h`。

显示当前命令的简明帮助。

## 使用提醒

- 该命令在帮助中隐藏，由 uv 构建后端的 Python shim 调用，不应手动运行。
- 构建包请使用 [uv build --sdist](cli:command:build) 或其他构建前端。

## 源码补充

子命令定义于 `BuildBackendCommand::BuildSdist`（[crates/uv-cli/src/lib.rs](https://github.com/astral-sh/uv/blob/70fe1196a546e49148a73b1c592b2f74c33af80e/crates/uv-cli/src/lib.rs)）。
