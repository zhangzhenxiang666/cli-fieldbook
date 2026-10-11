---
title: cargo read-manifest
command:
  - read-manifest
---

已弃用的隐藏命令：打印当前包 `Cargo.toml` 清单的 JSON 表示，源码建议改用 `cargo metadata --no-deps`。

## 简介

`cargo read-manifest` 读取当前包的清单，向标准输出打印其 JSON 表示。命令源码的 `about` 原文将其标注为 `DEPRECATED: Print a JSON representation of a Cargo.toml manifest.`，并直接建议改用 `cargo metadata --no-deps`（见 [cargo metadata](cli:command:metadata)）——新脚本不应再依赖本命令。

该命令同时是隐藏命令（`--hide`），不出现在常规帮助中。清单路径可用继承的 `-m/--manifest-path` 指定（选项释义见 [cargo build](cli:command:build)）；其余均为全局选项，见 [cargo](cli:command:)。

## 源码补充

- 命令定义与清单序列化输出见 [src/bin/cargo/commands/read_manifest.rs](https://github.com/rust-lang/cargo/blob/797e8a9bca276c1c9f9f738d2a20f484fa4eea9d/src/bin/cargo/commands/read_manifest.rs)。
