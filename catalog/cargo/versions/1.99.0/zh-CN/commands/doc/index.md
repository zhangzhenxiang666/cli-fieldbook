---
title: cargo doc
command:
  - doc
---

cargo doc 构建本地包及其全部依赖的文档，以 rustdoc 的通常格式输出到 `target/doc`。内置别名 `d`。

## 简介

未给出目标选择选项时，文档化所选包的全部二进制目标与库目标；与库目标同名的二进制会被跳过，声明了 `required-features` 而所需特性未启用的二进制也会被跳过。该默认可由清单中目标的 `doc` 标志改变；按名选择目标的选项忽略 `doc` 标志，始终文档化指定目标。

文档生成是累积的：target 目录中已有的文档文件在不同次 `cargo doc` 之间保留；要清除已生成的文档，向 [`cargo clean`](cli:command:clean) 传 `--doc`。

文档化二进制目标时，非公开条目默认会包含进文档；`--document-private-items` 把这一行为显式扩展到其余目标。

包选择、目标选择（`--lib`、`--bin`、`--example` 等）、特性选择与编译选项均为编译族共享选项，释义见 [`cargo build`](cli:command:build)。需要向 `rustdoc` 传自定义旗标时用 [`cargo rustdoc`](cli:command:rustdoc)。

## 选项

编译族共享选项（包选择、特性、profile、目标等）见 [cargo build](cli:command:build)。全局选项见 [cargo](cli:command:)。本命令的本地选项如下。

### `--open`

格式：`--open`。构建完成后在浏览器中打开文档。默认用系统浏览器，可用 `BROWSER` 环境变量或 `doc.browser` 配置覆盖。

### `--no-deps`

格式：`--no-deps`。不为依赖构建文档，只文档化本地包。

### `--document-private-items`

格式：`--document-private-items`。把非公开条目也包含进文档；文档化二进制目标时无需此旗标，默认已包含。

### `--output-format`

格式：`--output-format <FMT>`。取值 `html`、`json`。输出的格式，未提供时按源码为 `html`。不稳定：需 nightly 与 `-Z unstable-options`。

## 环境变量

- `BROWSER`：`--open` 打开文档所用浏览器，可被 `doc.browser` 配置覆盖。
- `RUSTDOCFLAGS`/`CARGO_ENCODED_RUSTDOCFLAGS`：传给全部 `rustdoc` 调用的旗标。

完整清单见[环境变量](../../reference/environment.md)。

## 使用提醒

- `--output-format json` 面向工具消费，属不稳定功能，稳定渠道报错。
- 依赖的文档与本地包一同构建（除非 `--no-deps`），大型工作区可据此控制构建量。

## 示例

```sh
# 构建当前包及其依赖的文档，输出到 target/doc
cargo doc

# 只文档化本地包并立即在浏览器打开
cargo doc --no-deps --open
```

以上示例为说明性内容，未实际运行。

## 源码补充

- 命令定义见 [src/bin/cargo/commands/doc.rs](https://github.com/rust-lang/cargo/blob/797e8a9bca276c1c9f9f738d2a20f484fa4eea9d/src/bin/cargo/commands/doc.rs)。
- 打开浏览器等行为见 [src/cargo/ops/cargo_doc.rs](https://github.com/rust-lang/cargo/blob/797e8a9bca276c1c9f9f738d2a20f484fa4eea9d/src/cargo/ops/cargo_doc.rs)。
- man 手册见 [src/doc/man/cargo-doc.md](https://github.com/rust-lang/cargo/blob/797e8a9bca276c1c9f9f738d2a20f484fa4eea9d/src/doc/man/cargo-doc.md)。
