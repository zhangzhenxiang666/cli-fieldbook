---
title: cargo pkgid
command:
  - pkgid
---

打印某个包的完全限定 Package ID 规范（spec）。

## 简介

给定一个 spec 参数，`cargo pkgid` 打印当前工作区中某个包或依赖的完全限定 Package ID 规范。spec 有歧义（依赖图中有多于一个包匹配）时报错；不给 spec 时打印当前目录所在包的规范。

本命令要求存在 Cargo.lock 且依赖已获取（源码在缺少 Cargo.lock 时直接报错）。

包规范由名称、版本与来源 URL 组成，允许用部分规范简洁地指代包，只要它只匹配一个包。同一语法也被 cargo 的其他部分使用，例如 [cargo metadata](cli:command:metadata) 的输出与构建时的 JSON 消息。spec 可以是下列形式之一：

| 结构 | 示例 |
| --- | --- |
| 名称 | `bitflags` |
| 名称`@`版本 | `bitflags@1.0.4` |
| URL | `https://github.com/rust-lang/cargo` |
| URL`#`版本 | `https://github.com/rust-lang/cargo#0.33.0` |
| URL`#`名称 | `https://github.com/rust-lang/crates.io-index#bitflags` |
| URL`#`名称`@`版本 | `https://github.com/rust-lang/cargo#crates-io@0.21.0` |

`-p/--package <SPEC>` 与位置参数等效（源码在位置参数缺省时取 `-p` 的值），用于查询非当前包的规范。

## 参数

### `spec`

可选，写作 `<spec>`。要查询的包规范（见上表）；省略时打印当前包，可改用 `-p/--package` 指定。

## 选项

本命令没有自有选项。`-p/--package` 与 `-m/--manifest-path` 见 [cargo build](cli:command:build)；全局选项（`-v`、`-q`、`--color`、`--locked`、`--offline`、`--frozen`、`--config`、`-Z`）见 [cargo](cli:command:)。

## 使用提醒

- 需要先有 Cargo.lock（例如先运行过构建或 [cargo generate-lockfile](cli:command:generate-lockfile)），否则命令报错。
- 名称部分匹配多个包（如同名多版本）时，补上 `@版本` 或 URL 限定以消除歧义。

## 示例

```sh
# 查询 foo 包的完全限定规范
cargo pkgid foo

# 查询 foo 1.0.0 版本的规范
cargo pkgid foo@1.0.0

# 查询来自 crates.io 的 foo 的规范
cargo pkgid https://github.com/rust-lang/crates.io-index#foo

# 查询本地路径包的规范
cargo pkgid file:///path/to/local/package#foo
```

以上示例为说明性内容，未实际运行。

## 源码补充

- 命令定义见 [src/bin/cargo/commands/pkgid.rs](https://github.com/rust-lang/cargo/blob/797e8a9bca276c1c9f9f738d2a20f484fa4eea9d/src/bin/cargo/commands/pkgid.rs)；查询逻辑见 [src/cargo/ops/cargo_pkgid.rs](https://github.com/rust-lang/cargo/blob/797e8a9bca276c1c9f9f738d2a20f484fa4eea9d/src/cargo/ops/cargo_pkgid.rs)。
- spec 形式表与示例改编自 man 手册（上游路径 `src/doc/man/cargo-pkgid.md`），完整语法见官方书《Package ID Specifications》一章（上游路径 `src/doc/src/reference/pkgid-spec.md`）。
