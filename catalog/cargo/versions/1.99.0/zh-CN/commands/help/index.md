---
title: cargo help
command:
  - help
---

显示某个 cargo 子命令的帮助，内容取自随 cargo 分发的 man 手册页。

## 简介

`cargo help <command>` 打印给定命令的帮助。不带任何参数时，打印 cargo 根命令的总帮助。

多级命令的各级之间用空格分隔：`cargo help report future-incompatibilities` 显示 `cargo report future-incompatibilities` 的帮助。空格只用于分隔父命令与其子命令的层级；命令名本身包含的连字符（如 `generate-lockfile`）必须保留。多级命令也可以写成一个连字符连接的词：`cargo help report-future-incompatibilities` 与空格形式等价。

内置命令的帮助内容取自随二进制分发的 man 手册页（源码内嵌的压缩归档）：优先用系统的 `man` 程序显示，没有 `man` 时依次尝试 `less`、`more`，都不可用时直接把文本打印到标准输出。

单个词会先按别名展开：用户在配置中定义的别名若不止是对某个子命令的简单改写，`cargo help` 会直接打印 `` `X` is aliased to `Y` `` 而不继续查找。未知主题的处理：先尝试按连字符连接形式匹配内置多级命令；再尝试把 `--help` 传给外部子命令（`cargo-<name>`）；仍找不到时报错 `no such command`，提示用 `cargo --list` 查看全部命令。多级路径中间的未知段也报错，并提示用 `cargo <前缀> --help` 查看可用子命令。

`help` 子命令不是 clap 自动生成的：根命令用 `disable_help_subcommand(true)` 关闭了自动 help 子命令，cargo 自行注册 `help`（进入内置命令表，`cargo --list` 的命令清单也单独登记它）。各命令的 `--help` 旗标同样可用，如 `cargo build --help`。

## 参数

### `COMMAND`

可选，写作 `<command>`，可一次给出多个词以组成多级命令路径（如 `report future-incompatibilities`）。省略时打印根命令的总帮助。

## 选项

本命令没有自有选项；全局选项（`-v`、`-q`、`--color`、`--locked`、`--offline`、`--frozen`、`--config`、`-Z`）见 [cargo](cli:command:)。

## 使用提醒

- 帮助优先经分页或 `man` 程序显示，具体取决于系统上可用的工具。
- 外部子命令的帮助由该子命令自行响应 `--help`，内容与格式不由 cargo 控制。

## 示例

```sh
# 查看某命令的帮助
cargo help build

# 查看多级命令的帮助
cargo help report future-incompatibilities

# 连字符连接的写法与上一条等价
cargo help report-future-incompatibilities

# --help 旗标同样可用
cargo build --help
```

以上示例为说明性内容，未实际运行。

## 源码补充

- 命令定义、别名展开、man 页提取与外部子命令回退见 [src/bin/cargo/commands/help.rs](https://github.com/rust-lang/cargo/blob/797e8a9bca276c1c9f9f738d2a20f484fa4eea9d/src/bin/cargo/commands/help.rs)；`disable_help_subcommand(true)` 与根帮助模板见 [src/bin/cargo/cli.rs](https://github.com/rust-lang/cargo/blob/797e8a9bca276c1c9f9f738d2a20f484fa4eea9d/src/bin/cargo/cli.rs)，`--list` 清单对 `help` 的单独登记见 [src/bin/cargo/main.rs](https://github.com/rust-lang/cargo/blob/797e8a9bca276c1c9f9f738d2a20f484fa4eea9d/src/bin/cargo/main.rs)。
