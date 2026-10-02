---
title: uv build-backend
command:
  - build-backend
---

## 简介

构建后端的实现（隐藏入口，由构建前端经由 PEP 517 调用）。

`uv build-backend` 暴露 uv 自带构建后端（`uv_build`）的 PEP 517/PEP 660 钩子。这些命令不直接面向用户：用户调用构建前端（如 pip、build 或 [uv build](cli:command:build)），前端调用随包声明的 Python shim，shim 再回调 uv 的这些子命令完成实际构建。该命令组在帮助中隐藏，钩子的参数规格见 PEP 517 与 PEP 660。

子命令（均为隐藏入口）：

- [uv build-backend build-sdist](cli:command:build-backend/build-sdist)：钩子 `build_sdist`。
- [uv build-backend build-wheel](cli:command:build-backend/build-wheel)：钩子 `build_wheel`。
- [uv build-backend build-editable](cli:command:build-backend/build-editable)：钩子 `build_editable`（PEP 660）。
- [uv build-backend get-requires-for-build-sdist](cli:command:build-backend/get-requires-for-build-sdist)：钩子 `get_requires_for_build_sdist`。
- [uv build-backend get-requires-for-build-wheel](cli:command:build-backend/get-requires-for-build-wheel)：钩子 `get_requires_for_build_wheel`。
- [uv build-backend prepare-metadata-for-build-wheel](cli:command:build-backend/prepare-metadata-for-build-wheel)：钩子 `prepare_metadata_for_build_wheel`。
- [uv build-backend get-requires-for-build-editable](cli:command:build-backend/get-requires-for-build-editable)：钩子 `get_requires_for_build_editable`（PEP 660）。
- [uv build-backend prepare-metadata-for-build-editable](cli:command:build-backend/prepare-metadata-for-build-editable)：钩子 `prepare_metadata_for_build_editable`（PEP 660）。

## 选项

### `--help`

短旗标 `-h`。

显示当前命令的简明帮助。

## 使用提醒

- 这些子命令由构建后端 shim 自动调用，钩子行为随 uv 版本变化，不作稳定接口，不应在脚本或配置中直接依赖。
- 用户构建包应使用 `uv build` 或其他构建前端，而不是本命令组。
- 各钩子的目录参数与返回值约定见各子命令页及 PEP 517/PEP 660 规范。

## 源码补充

命令组定义于 `Commands::BuildBackend` 与 `BuildBackendCommand`，各子命令与 PEP 517/PEP 660 钩子一一对应（[crates/uv-cli/src/lib.rs](https://github.com/astral-sh/uv/blob/70fe1196a546e49148a73b1c592b2f74c33af80e/crates/uv-cli/src/lib.rs)）。
