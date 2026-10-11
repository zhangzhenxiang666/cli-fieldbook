---
title: cargo login
command:
  - login
---

运行凭据提供程序，保存注册表的 API 令牌，使发布等需要认证的命令自动完成认证。

## 简介

`cargo login` 会运行凭据提供程序来保存令牌，让 [cargo publish](cli:command:publish) 等需要认证的命令随后自动通过认证。令牌从标准输入读取：未在命令行给出 `<token>` 位置参数时，cargo 从 stdin 读取令牌行，交互式终端下由凭据提供程序自行提示（依据 man 手册与源码）。

默认的 `cargo:token` 凭据提供程序把令牌保存到 `$CARGO_HOME/credentials.toml`（`CARGO_HOME` 默认为用户主目录下的 `.cargo`）。若注册表配置了专属凭据提供程序则优先使用；否则依次尝试配置 `registry.global-credential-providers` 列出的提供程序，且从列表末尾开始尝试（man 手册）。

`--` 之后的所有参数会原样传给凭据提供程序（man 手册）。

crates.io 的 API 令牌可在 <https://crates.io/me> 获取。令牌等同于账户凭据，注意保密，不要泄露给他人（man 手册）。

## 参数

### `token`

可选（已弃用且隐藏），写作 `<token>`。直接在命令行以位置参数传入的令牌。此用法已弃用，运行时会输出弃用警告，建议改为从标准输入读取（依据源码）。

### `args`

可选，写作 `--` 之后的 `<args>`。跟在 `--` 之后的所有参数，作为传给凭据提供程序的额外参数。

## 选项

本命令没有自身定义的选项；除全局选项（见 [cargo](cli:command:)）外，仅接受共享选项 `--registry <REGISTRY>`，指定要登录的注册表（不指定时为默认注册表 crates.io）。本命令不接受 `--index`（依据源码）。

## 使用提醒

- 推荐的保存方式是从 stdin 传入令牌（例如 `cargo login < token.txt` 或在提示时粘贴），避免把令牌写进 shell 历史与进程列表。
- 除 `cargo:token` 外，cargo 还内置 `cargo:wincred`、`cargo:macos-keychain`、`cargo:libsecret` 等使用操作系统安全存储的提供程序，可通过 `registry.global-credential-providers` 配置（依据 cargo 书《Registry Authentication》一章）。
- 登出用 [cargo logout](cli:command:logout)。

## 示例

```sh
# 保存默认注册表（crates.io）的令牌，从标准输入读取
cargo login

# 保存指定注册表的令牌
cargo login --registry my-registry

# 从文件重定向令牌
cargo login < token.txt

# 把额外参数传给凭据提供程序
cargo login --registry my-registry -- --argument-for-provider
```

以上示例为说明性内容，未实际运行。

## 源码补充

- 命令定义（隐藏的 `<token>` 位置参数、`--` 后参数转发）见 [src/bin/cargo/commands/login.rs](https://github.com/rust-lang/cargo/blob/797e8a9bca276c1c9f9f738d2a20f484fa4eea9d/src/bin/cargo/commands/login.rs)。
- stdin 读取与凭据提供程序调用见 [src/cargo/ops/registry/login.rs](https://github.com/rust-lang/cargo/blob/797e8a9bca276c1c9f9f738d2a20f484fa4eea9d/src/cargo/ops/registry/login.rs)。
