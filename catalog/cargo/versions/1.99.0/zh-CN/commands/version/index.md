---
title: cargo version
command:
  - version
---

打印当前 cargo 的版本信息，输出与根命令旗标 `cargo --version`（`-V`）一致。

## 简介

`cargo version` 显示 cargo 的版本。根命令的 `-V`/`--version` 旗标与该子命令走同一实现，两者输出相同；不带选项时第一行为 `cargo ` 加版本号。

加 `-v`/`--verbose`（全局选项，释义见 [cargo](cli:command:)）后追加详细版本信息：`release`；`commit-hash` 与 `commit-date`（仅当构建携带提交信息时输出）；`host`（构建宿主目标三元组）；以及 `libgit2`、`libcurl`、`ssl`、`os` 等依赖与系统信息行。

本命令没有专有选项；除 `-v` 外的其余可用选项均为全局选项。

## 示例

```sh
# 显示版本
cargo version

# 根命令旗标与子命令输出相同
cargo --version
cargo -V

# 显示额外版本信息
cargo -Vv
```

以上示例为说明性内容，未实际运行。

## 源码补充

- 命令定义见 [src/bin/cargo/commands/version.rs](https://github.com/rust-lang/cargo/blob/797e8a9bca276c1c9f9f738d2a20f484fa4eea9d/src/bin/cargo/commands/version.rs)；`--version` 旗标与冗长输出的拼装逻辑（`get_version_string`）见 [src/bin/cargo/cli.rs](https://github.com/rust-lang/cargo/blob/797e8a9bca276c1c9f9f738d2a20f484fa4eea9d/src/bin/cargo/cli.rs)。
