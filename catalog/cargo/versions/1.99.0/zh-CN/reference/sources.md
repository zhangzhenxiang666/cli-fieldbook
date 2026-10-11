---
title: 来源、覆盖与校对记录
---

本页声明 cargo 1.99.0 中文文档的固定来源、覆盖口径与验证边界。

## 固定基准

| 项 | 值 |
| --- | --- |
| 上游项目 | [rust-lang/cargo](https://github.com/rust-lang/cargo)（Rust 官方包管理器） |
| 稳定版本 | 1.99.0（随 Rust 1.99.0 于 2026-10-01 发布） |
| 固定 tag | `0.99.0`（cargo 仓库以 crate 版本 `0.NN.0` 打 tag，与随 Rust `1.NN.0` 发布的二进制一一对应、同一提交；`cargo --version` 自称 `cargo 1.99.0`） |
| 固定 commit | [`797e8a9bca276c1c9f9f738d2a20f484fa4eea9d`](https://github.com/rust-lang/cargo/tree/797e8a9bca276c1c9f9f738d2a20f484fa4eea9d)（2026-08-05） |
| 查证日期 | 2026-10-11 |
| 官方文档 | [doc.rust-lang.org/cargo](https://doc.rust-lang.org/cargo/)（滚动最新版，仅作交叉旁证）；仓库内 cargo 书与 man 手册页（`src/doc/`）已随本 commit 固定为快照，是主要文档证据 |

全部源码快照按原路径保存在本版本 `upstream/source-extracts/` 下（统一 `.txt` 后缀），每份带 SHA-256 校验，清单见 `upstream/source.lock.json`。

## 数量怎么计算

命令树按固定 commit 的 [src/bin/cargo/commands/mod.rs](https://github.com/rust-lang/cargo/blob/797e8a9bca276c1c9f9f738d2a20f484fa4eea9d/src/bin/cargo/commands/mod.rs) 的 `builtin()` 表与各命令文件静态枚举，全部静态节点共 **46** 个，本版全部收录：

| 口径 | 数量 |
| --- | --- |
| 收录节点（根命令 + 顶级命令 + 子命令） | 46 |
| 其中公开命令 | 37 |
| 其中隐藏命令 | 4（`git-checkout`（已移除）、`read-manifest`（已弃用）、`verify-project`、`clean gc`） |
| 其中不稳定门控命令 | 5（`config` 与 `config get` 需 nightly `-Z unstable-options`；`report timings`、`report sessions`、`report rebuilds` 需 `-Z build-analysis`） |
| 位置参数条目 | 24 |
| 选项条目（含继承的全局选项与共享参数） | 883 |
| 固定源码快照文件 | 189 |

顶级命令 39 个：add、bench、build、check、clean、config、doc、fetch、fix、generate-lockfile、git-checkout、help、info、init、install、locate-project、login、logout、metadata、new、owner、package、pkgid、publish、read-manifest、remove、report、run、rustc、rustdoc、search、test、tree、uninstall、update、vendor、verify-project、version、yank；子命令 6 个：`config get`、`report future-incompatibilities`（别名 `future-incompat`）、`report timings`、`report sessions`、`report rebuilds`、`clean gc`。

内置别名 `b`/`c`/`d`/`r`/`t`/`rm` 分别记在 build、check、doc、run、test、remove 名下（[src/bin/cargo/main.rs](https://github.com/rust-lang/cargo/blob/797e8a9bca276c1c9f9f738d2a20f484fa4eea9d/src/bin/cargo/main.rs) 的 `BUILTIN_ALIASES` 表），不另立节点。rustup 分发的 `+toolchain` 前缀、`[alias]` 配置的用户别名与 `$PATH` 上的外部 `cargo-*` 子命令不属于静态命令树，不计入分母，在概念文章《总览》中说明。

## 方法与验证限制

- 命令事实（路径、别名、用法行、参数、选项、枚举、默认值）自固定 commit 的 Rust 源码重建：[src/bin/cargo/cli.rs](https://github.com/rust-lang/cargo/blob/797e8a9bca276c1c9f9f738d2a20f484fa4eea9d/src/bin/cargo/cli.rs) 给出根命令与全局选项，各 `src/bin/cargo/commands/*.rs` 的 clap 定义给出子命令与内联旗标，共享参数助手（`arg_package_spec`、`arg_features` 等）统一解析到声明点 [src/cargo/util/command_prelude.rs](https://github.com/rust-lang/cargo/blob/797e8a9bca276c1c9f9f738d2a20f484fa4eea9d/src/cargo/util/command_prelude.rs)；**未采集目标二进制的原始帮助输出**。
- 选项显示形式为归一化约定：短旗标前置（`-p, --package`），占位符取 `value_name()`；仅在源码字面量给出 `default_value` 时记录默认值（本版共 5 处），枚举仅在快照内可见字面列表时记录（`--edition` 的取值表 `Edition::CLI_VALUES` 不在快照内，故不枚举）。
- 全局选项（`-v`/`-q`/`--color`/`--locked`/`--offline`/`--frozen`/`--config`/`-Z` 与 `--help`）为 clap `global(true)` 参数，声明于 cli.rs，在每个子命令页以继承选项收录、不重复释义；纯报错建议占位参数（如小写 `-c`/`-z`、`--out-dir`、`-s`）不收录，其行为在相关页面说明。
- 退出代码、环境变量与输出格式的整理口径见对应[专题参考](exit-codes.md)。
- **全部示例为说明性内容，未实际运行**；示例中的输出形态依源码逻辑与文档推断，可能因工具链版本、终端能力或注册表状态而不同。
- 官方在线文档为滚动版本（D04：不用滚动页面证明历史版本行为），仅用于交叉核对措辞与概念，不进入证据链。

## 分类证据边界

- **已采集帮助**：无。本版未采集二进制 `--help` 原始输出。
- **已核对源码**：全部 46 个节点的命令定义与参数注册语句，逐条绑定 `source-extracts/` 快照（`source.lock.json` 的 evidence 清单含 SHA-256）；命令行为另按命令族核对 `src/cargo/ops/` 实现快照。
- **已实测示例**：无。全部示例未运行。
