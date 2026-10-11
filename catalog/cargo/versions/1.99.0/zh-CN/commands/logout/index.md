---
title: cargo logout
command:
  - logout
---

运行凭据提供程序，从本地移除已保存的注册表 API 令牌。

## 简介

`cargo logout` 运行凭据提供程序，删除本地保存的令牌。默认的 `cargo:token` 提供程序把凭据保存在 `$CARGO_HOME/credentials.toml`（`CARGO_HOME` 默认为用户主目录下的 `.cargo`），本命令即移除其中的令牌。若注册表配置了专属凭据提供程序则优先使用；否则依次尝试配置 `registry.global-credential-providers` 列出的提供程序，且从列表末尾开始尝试（man 手册）。

未指定 `--registry` 时，移除默认注册表（由配置 `registry.default` 决定，默认为 <https://crates.io/>）的凭据。

本命令只删除本地保存的令牌，不会在服务器端吊销它；需要吊销请前往注册表网站操作（crates.io 在 <https://crates.io/me>，man 手册）。

## 选项

本命令没有自身定义的选项；除全局选项（见 [cargo](cli:command:)）外，仅接受共享选项 `--registry <REGISTRY>`，指定要登出的注册表。本命令不接受 `--index`（依据源码）。

## 示例

```sh
# 移除默认注册表的令牌
cargo logout

# 移除指定注册表的令牌
cargo logout --registry my-registry
```

以上示例为说明性内容，未实际运行。

## 源码补充

- 命令定义见 [src/bin/cargo/commands/logout.rs](https://github.com/rust-lang/cargo/blob/797e8a9bca276c1c9f9f738d2a20f484fa4eea9d/src/bin/cargo/commands/logout.rs)。
- 登出行为见 [src/cargo/ops/registry/logout.rs](https://github.com/rust-lang/cargo/blob/797e8a9bca276c1c9f9f738d2a20f484fa4eea9d/src/cargo/ops/registry/logout.rs)。
