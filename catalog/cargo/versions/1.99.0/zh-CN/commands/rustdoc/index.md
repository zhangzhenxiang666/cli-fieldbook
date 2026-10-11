---
title: cargo rustdoc
command:
  - rustdoc
---

cargo rustdoc 构建包的文档，并把指定的自定义旗标透传给最终的 `rustdoc` 调用。无内置别名。

## 简介

当前包（或 `-p` 指定的包）的指定目标会被文档化，依赖不会作为本命令的一部分被文档化（这点与 [`cargo doc`](cli:command:doc) 不同）。`--` 之后的参数只会加到最终那次 `rustdoc` 调用上；注意 `rustdoc` 仍会无条件收到 `-L`、`--extern`、`--crate-type` 等参数，透传的参数只是追加。要给 cargo 发起的全部 `rustdoc` 进程传旗标，用 `RUSTDOCFLAGS` 环境变量或 `build.rustdocflags` 配置。

未给出目标选择选项时，文档化所选包的全部二进制目标与库目标；与库目标同名的二进制会被跳过，声明了 `required-features` 而所需特性未启用的二进制也会被跳过。

包选择、目标选择、特性选择与编译选项均为编译族共享选项，释义见 [`cargo build`](cli:command:build)。

## 参数

### `args`

可选，写作 `ARGS`。额外的 `rustdoc` 旗标，应写在 `--` 之后。

## 选项

编译族共享选项（包选择、特性、profile、目标等）见 [cargo build](cli:command:build)。全局选项见 [cargo](cli:command:)。本命令的本地选项如下。

### `--open`

格式：`--open`。构建完成后在浏览器中打开文档。默认用系统浏览器，可用 `BROWSER` 环境变量或 `doc.browser` 配置覆盖。

### `--output-format`

格式：`--output-format <FMT>`。取值 `html`、`json`。输出的格式，未提供时按源码为 `html`。不稳定：需 nightly 与 `-Z unstable-options`。

## 环境变量

- `RUSTDOCFLAGS`/`CARGO_ENCODED_RUSTDOCFLAGS`：传给全部 `rustdoc` 调用的旗标。
- `BROWSER`：`--open` 打开文档所用浏览器。

完整清单见[环境变量](../../reference/environment.md)。

## 使用提醒

- `--output-format` 属不稳定功能，稳定渠道报错。
- 透传旗标只影响最终目标的文档构建；需要为依赖也传旗标时应改用 `RUSTDOCFLAGS`。

## 示例

```sh
# 构建文档并把自定义 CSS 文件并入输出
cargo rustdoc --lib -- --extend-css extra.css
```

以上示例为说明性内容，未实际运行。

## 源码补充

- 命令定义与透传逻辑见 [src/bin/cargo/commands/rustdoc.rs](https://github.com/rust-lang/cargo/blob/797e8a9bca276c1c9f9f738d2a20f484fa4eea9d/src/bin/cargo/commands/rustdoc.rs)。
- 文档构建行为见 [src/cargo/ops/cargo_doc.rs](https://github.com/rust-lang/cargo/blob/797e8a9bca276c1c9f9f738d2a20f484fa4eea9d/src/cargo/ops/cargo_doc.rs)。
- man 手册见 [src/doc/man/cargo-rustdoc.md](https://github.com/rust-lang/cargo/blob/797e8a9bca276c1c9f9f738d2a20f484fa4eea9d/src/doc/man/cargo-rustdoc.md)。
