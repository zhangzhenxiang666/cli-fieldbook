---
title: cargo info
command:
  - info
---

显示一个包的信息：从其 `Cargo.toml` 清单取数并以人类可读的形式呈现。

## 简介

`cargo info` 按 `<spec>` 指定的包 ID 规格（格式见 [cargo pkgid](cli:command:pkgid)，如 `serde` 或 `serde@1.0.0`）获取并显示包信息。数据取自包的 `Cargo.toml`。

行为要点（依据 man 手册）：

- 若指定的包是当前工作区的成员，显示本地 `Cargo.toml` 的信息。
- 若 `Cargo.lock` 不存在，会先创建它。
- 未指定版本时，按包声明的最低支持 Rust 版本（MSRV）选择合适的版本。

默认从 crates.io 获取；共享选项 `--registry <REGISTRY>`（按名称）与 `--index <INDEX>`（按索引 URL，两者互斥）可指定其他注册表。

## 参数

### `package`

必填，写作 `<spec>`。要查看的包，为包 ID 规格（见 [cargo pkgid](cli:command:pkgid)）。

## 选项

本命令没有自身定义的选项；除全局选项（见 [cargo](cli:command:)）外，仅接受共享选项 `--registry` 与 `--index`（互斥），用于选择注册表。

## 示例

```sh
# 查看 crates.io 上的 serde
cargo info serde

# 指定版本
cargo info serde@1.0.0

# 从指定注册表查看
cargo info serde --registry my-registry
```

以上示例为说明性内容，未实际运行。

## 源码补充

- 命令定义见 [src/bin/cargo/commands/info.rs](https://github.com/rust-lang/cargo/blob/797e8a9bca276c1c9f9f738d2a20f484fa4eea9d/src/bin/cargo/commands/info.rs)。
