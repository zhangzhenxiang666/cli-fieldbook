---
title: 退出代码
---

cargo 书在固定提交中没有独立的退出代码参考页，本页为源码补充：依据固定提交（cargo 仓库 tag `0.99.0`，对应 Rust 1.99.0 工具链中的 cargo）的 `src/cargo/util/errors.rs`、`src/cargo/lib.rs` 与 `src/bin/cargo/main.rs` 整理。来源与核对范围见 [sources](sources.md)。

## 代码含义

| 退出代码 | 含义 | 依据 |
| --- | --- | --- |
| `0` | 成功；包括 clap 判定输出到标准输出的场景（如 `--help`、`--version`） | `src/cargo/lib.rs` 的 `exit_with_error` |
| `1` | 命令行参数解析错误（clap 报错且写标准错误时），以及由 `std::io::Error` 转换来的错误 | `src/cargo/util/errors.rs` 的 `From<clap::Error>`、`From<std::io::Error>` |
| `101` | 执行阶段错误：lib 侧 anyhow 错误统一包装为 `CliError` 并以 101 退出；找不到外部子命令也用 101 | `src/cargo/util/errors.rs` 的 `From<anyhow::Error>`、`src/bin/cargo/main.rs` |

## 子进程退出码的传播

- `cargo run`：被运行的程序非零退出时，其退出码原样作为 cargo 的退出码（`ProcessError.code` 转为 `CliError::code`）；进程从未启动时用 101。依据 `src/bin/cargo/commands/run.rs` 的 `to_run_error`。
- 外部子命令（`cargo-<name>`）：同样原样传播子进程退出码；取不到退出码时用 101。依据 `src/bin/cargo/main.rs` 的 `execute_subcommand`。
- `CliError` 允许"只带退出码、不显示消息"地退出：安静模式下 cargo 假设子进程已自行打印失败原因。依据 `src/cargo/util/errors.rs` 中 `CliError.error` 字段的文档注释。

## 错误信息的呈现

- 非零退出时，错误及其原因链打印到标准错误；非冗长模式下，原因链在遇到 `VerboseError` 标记的错误处截断，需 `-v` 才能看到（依据 `src/cargo/lib.rs` 的 `display_error` 与 `error_chain`）。
- 标记为 `InternalError` 的意外内部错误会附加提示：这是不应发生的 cargo 内部错误，并给出 bug 报告地址与 cargo 版本（依据 `src/cargo/lib.rs`）。

## 上游未说明

- 除上表与上述传播规则外，cargo 书与源码注释均未登记其他退出码；例如被信号终止时的表示、cargo 自身 panic 时的退出码，上游未说明。
- rustc 侧的退出码约定不在本快照的 cargo 书或源码证据内，本页不作说明。

## 使用提醒

- 不要假设"非零即 1"：cargo 执行失败几乎都返回 101，`1` 仅对应参数解析与 IO 错误路径。
- 脚本中区分失败原因时，应结合标准错误输出而非只看退出码；需要定位子命令自身失败时，可直接使用传播来的子进程退出码。
