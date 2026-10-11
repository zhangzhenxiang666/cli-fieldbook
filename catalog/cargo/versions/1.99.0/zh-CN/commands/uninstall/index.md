---
title: cargo uninstall
command:
  - uninstall
---

移除先前由 `cargo install` 安装的二进制包。

## 简介

本命令移除用 [cargo install](cli:command:install) 安装的包。`<spec>` 位置参数是要移除的包的包 ID 规格（格式见 [cargo pkgid](cli:command:pkgid)）。默认移除该包的全部二进制；`--bin <NAME>` 可只移除指定的二进制。要移除的包必须存在于安装跟踪记录中，否则报错 `package ... is not installed`（依据源码）。

同时给出多个 `<spec>` 时会逐一卸载，最后汇总成功与失败的条目；未给出任何 `<spec>` 也没有 `-p`/`--package` 时，卸载当前目录中的包（依据源码）。

卸载使用的安装根目录与 install 的解析规则相同：`--root` 旗标 → `CARGO_INSTALL_ROOT` 环境变量 → `install.root` 配置 → `$CARGO_HOME`（依据源码 `resolve_root`）。

共享选项 `-p`/`--package <SPEC>` 也可指定要卸载的包，作用与 `<spec>` 位置参数相同，二者取其一即可（依据源码）。

## 参数

### `spec`

可选，可重复，写作 `<spec>`。要卸载的包的包 ID 规格（见 [cargo pkgid](cli:command:pkgid)）。

## 选项

### `--root`

格式：`--root <DIR>`。卸载所用的安装根目录（从中移除 `<DIR>/bin` 下的二进制）。解析优先级见简介。

### `--bin`

格式：`--bin <NAME>`。只卸载名为 `NAME` 的二进制，而不是该包的全部二进制。可重复给出。多个 `<spec>` 与 `--bin` 同用是冗余的，会被拒绝（依据源码）。

## 使用提醒

- 本命令没有 `rm` 别名；`cargo rm` 是 [cargo remove](cli:command:remove) 的别名，用于从 `Cargo.toml` 移除依赖，与本命令无关。
- man 手册提及可用 `--example` 只移除示例二进制，但本版命令定义中未注册 `--example` 旗标，实际使用会报无法识别的选项（依据源码与 man 手册的差异）。
- `-p`/`--package` 为共享选项（非本命令内联定义），释义见 [cargo build](cli:command:build)；不带值单独给出 `-p` 会报错要求 SPEC 格式的值（依据源码）。
- 全局选项（`-v`、`-q`、`--color` 等）见 [cargo](cli:command:)。

## 示例

```sh
# 卸载先前安装的包
cargo uninstall ripgrep

# 只卸载包中的某个二进制
cargo uninstall --bin rg ripgrep

# 从指定的安装根目录卸载
cargo uninstall --root /custom/cargo-home ripgrep
```

以上示例为说明性内容，未实际运行。

## 源码补充

- 命令定义见 [src/bin/cargo/commands/uninstall.rs](https://github.com/rust-lang/cargo/blob/797e8a9bca276c1c9f9f738d2a20f484fa4eea9d/src/bin/cargo/commands/uninstall.rs)。
- 卸载行为（多 spec 汇总、当前目录回退、跟踪记录校验）见 [src/cargo/ops/cargo_uninstall.rs](https://github.com/rust-lang/cargo/blob/797e8a9bca276c1c9f9f738d2a20f484fa4eea9d/src/cargo/ops/cargo_uninstall.rs)；根目录解析见 [src/cargo/ops/common_for_install_and_uninstall.rs](https://github.com/rust-lang/cargo/blob/797e8a9bca276c1c9f9f738d2a20f484fa4eea9d/src/cargo/ops/common_for_install_and_uninstall.rs)。
