---
title: cargo config
command:
  - config
---

不稳定命令组：用于查看 cargo 实际加载的配置值，需要 nightly cargo 并配合 `-Z unstable-options`。

## 简介

不稳定命令：`cargo config` 整组命令在稳定版 cargo 上会直接报错，需 nightly 工具链并给出 `-Z unstable-options`（跟踪 issue #9301）。

`cargo config` 提供查看 cargo 所加载配置的能力，目前只包含一个子命令 [cargo config get](cli:command:config/get)：显示合并后的配置值，或逐层显示各配置来源。

该命令设置了子命令必选（`subcommand_required`）且无参数时打印帮助：直接运行 `cargo config` 不带子命令会显示用法帮助。本命令组没有额外的自有选项。

## 选项

本命令没有自有选项；全局选项（`-v`、`-q`、`--color`、`--locked`、`--offline`、`--frozen`、`--config`、`-Z`）见 [cargo](cli:command:)。

## 使用提醒

- 需要 nightly 与 `-Z unstable-options`，例如 `cargo +nightly -Zunstable-options config get`；稳定版上会因不稳定门控报错。
- `-Z/--unstable-features` 旗标本身的说明见根命令页 [cargo](cli:command:)。

## 示例

```sh
# 查看 build.rustflags 的最终配置值（需 nightly 与 -Z unstable-options）
cargo +nightly -Zunstable-options config get build.rustflags
```

以上示例为说明性内容，未实际运行。

## 源码补充

- 命令定义（含 `subcommand_required` 与不稳定门控 `fail_if_stable_command(…, 9301, "unstable-options", …)`）见 [src/bin/cargo/commands/config.rs](https://github.com/rust-lang/cargo/blob/797e8a9bca276c1c9f9f738d2a20f484fa4eea9d/src/bin/cargo/commands/config.rs)。
- 功能背景见官方书《Unstable Features》的 `cargo config` 一节（上游路径 `src/doc/src/reference/unstable.md`）。
