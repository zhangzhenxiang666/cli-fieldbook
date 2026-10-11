---
title: cargo generate-lockfile
command:
  - generate-lockfile
---

为当前包或工作区生成 `Cargo.lock` lockfile。

## 简介

`cargo generate-lockfile` 创建当前包或工作区的 `Cargo.lock`；lockfile 已存在时，会用每个包的最新可用版本重建。依据源码，重建时不以既有 lockfile 为约束（`previous_resolve` 为空），即相当于一次面向最新版本的全量解析。

[cargo update](cli:command:update) 同样能创建 `Cargo.lock`，并提供更多控制更新行为的选项（如 `--precise`、`-w`）；lockfile 不存在时，`cargo update` 与本命令走同一条生成路径。

`--publish-time`（不稳定）在解析时限制注册表包的最晚发布时间，是尽力而为的过滤：不支持发布时间的注册表一律接受；yank 状态只按当前状态判断，不回溯到 `--publish-time` 时刻；发布时间本身的精度也有限。

全局选项（`-v`/`--verbose`、`--offline` 等）见 [cargo](cli:command:)。

## 选项

### `--publish-time`

格式：`--publish-time <yyyy-mm-ddThh:mm:ssZ>`。允许注册表包的最晚发布时间（不稳定）；在稳定通道上使用会直接报错（上游跟踪 issue 5221）。

## 使用提醒

- 本命令没有包选择参数；要只更新部分依赖，使用 [cargo update](cli:command:update)。
- 与 `cargo update` 的分工：两个命令都会把依赖解析到最新版本；需要保守更新或精确钉版时用 `cargo update`。

## 示例

```sh
# 为当前包或工作区创建／重建 lockfile
cargo generate-lockfile
```

以上示例为说明性内容，未实际运行。

## 源码补充

- 命令定义与 `--publish-time` 门控见 [src/bin/cargo/commands/generate_lockfile.rs](https://github.com/rust-lang/cargo/blob/797e8a9bca276c1c9f9f738d2a20f484fa4eea9d/src/bin/cargo/commands/generate_lockfile.rs)。
- 全量解析、写入 lockfile 并打印变更见 [src/cargo/ops/cargo_update.rs](https://github.com/rust-lang/cargo/blob/797e8a9bca276c1c9f9f738d2a20f484fa4eea9d/src/cargo/ops/cargo_update.rs)。
