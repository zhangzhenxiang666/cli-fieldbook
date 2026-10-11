---
title: cargo fetch
command:
  - fetch
---

从网络下载一个包的全部依赖到本地缓存，不执行任何编译。

## 简介

若项目已有 `Cargo.lock`，`cargo fetch` 会确保其中列出的全部 git 依赖与注册表依赖都已下载并在本地可用；随后在不改动 lockfile 的前提下，后续的 cargo 命令可以配合全局旗标 `--offline` 离线运行（全局旗标总述见 [cargo](cli:command:)）。

若 `Cargo.lock` 尚不存在，本命令会先生成 lockfile，再下载依赖。下载过程只写入本地缓存（注册表 crate 与 git 检出所在的位置，见 `CARGO_HOME`），不会构建任何产物，也不改动项目的 `target` 目录。

未指定 `--target` 时，会下载所有目标平台的依赖；指定一个或多个 `--target <TRIPLE>` 时只下载匹配目标三元组的依赖。`-m`/`--manifest-path` 与 `--target` 均为与其他命令共享的选项（`--target` 在本命令中可重复给出），格式与释义见 [cargo build](cli:command:build)。

## 选项

本命令没有自身定义的选项；除全局选项（见 [cargo](cli:command:)）外，仅接受共享选项 `-m`/`--manifest-path` 与 `--target`（可重复），释义见 [cargo build](cli:command:build)。

## 使用提醒

- 本命令只下载、不编译；编译请使用 [cargo build](cli:command:build) 等命令。
- lockfile 变更（例如依赖版本更新）后需要重新 fetch，才能继续离线构建。
- `--frozen`、`--locked`、`--offline` 等全局旗标的行为与在其他命令中一致，见 [cargo](cli:command:)。

## 示例

```sh
# 下载当前包的全部依赖（所有目标平台）
cargo fetch

# 只下载指定目标三元组的依赖
cargo fetch --target x86_64-unknown-linux-gnu

# 为另一个清单下载依赖
cargo fetch --manifest-path path/to/Cargo.toml
```

以上示例为说明性内容，未实际运行。

## 源码补充

- 命令定义见 [src/bin/cargo/commands/fetch.rs](https://github.com/rust-lang/cargo/blob/797e8a9bca276c1c9f9f738d2a20f484fa4eea9d/src/bin/cargo/commands/fetch.rs)。
- 下载行为（按 lockfile 解析并下载全部依赖）见 [src/cargo/ops/cargo_fetch.rs](https://github.com/rust-lang/cargo/blob/797e8a9bca276c1c9f9f738d2a20f484fa4eea9d/src/cargo/ops/cargo_fetch.rs)。
