---
title: uv build-backend get-requires-for-build-sdist
command:
  - build-backend
  - get-requires-for-build-sdist
---

## 简介

PEP 517 钩子 `get_requires_for_build_sdist`（隐藏入口）。

报告构建 sdist 所需的额外构建依赖。按 PEP 517 约定，后端返回构建依赖列表（PEP 508 形式的包名），前端据此准备隔离构建环境；钩子不接受位置参数。由构建前端经 PEP 517 调用，钩子行为不作稳定接口。

## 选项

### `--help`

短旗标 `-h`。

显示当前命令的简明帮助。

## 使用提醒

- 该命令在帮助中隐藏，由 uv 构建后端的 Python shim 调用，不应手动运行。
- 构建包请使用 [uv build](cli:command:build) 或其他构建前端。

## 源码补充

子命令定义于 `BuildBackendCommand::GetRequiresForBuildSdist`（[crates/uv-cli/src/lib.rs](https://github.com/astral-sh/uv/blob/70fe1196a546e49148a73b1c592b2f74c33af80e/crates/uv-cli/src/lib.rs)）。
