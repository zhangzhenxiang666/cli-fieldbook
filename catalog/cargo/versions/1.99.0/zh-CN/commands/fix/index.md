---
title: cargo fix
command:
  - fix
---

自动把 rustc 诊断（如警告）中给出的修改建议应用到源码。

## 简介

`cargo fix` 在底层执行类似 [cargo check](cli:command:check) 的编译，把 rustc 报告中可机器应用的修复建议直接写入源码；无法自动修复的警告在检查结束后照常显示。不带目标选择选项时，行为与 `cargo check --all-targets` 相同：默认修复所有目标，`required-features` 未满足的二进制目标会被跳过。

只有实际参与编译的代码才会被分析与修复：可选特性（feature）门控的代码需要先用 `-F`/`--features` 启用；平台相关的 `cfg` 代码需要传 `--target`，例如 `cargo fix --target x86_64-pc-windows-gnu`。

### edition 迁移

`--edition` 应用"为下一个 edition 做准备"的修改，用于把包迁移到新 edition，一般流程为：

1. 运行 `cargo fix --edition`。项目有多个特性时可加 `--all-features`；有平台相关代码时，可对不同 `--target` 多次运行；
2. 修改 `Cargo.toml`，把 `edition` 字段改为新值——`cargo fix --edition` 不会代改这一字段，需在完成后手动更新；
3. 运行项目测试验证。若出现新警告，可再运行一次不带 `--edition` 的 `cargo fix` 应用编译器的后续建议。

个别情况下编译器无法把全部代码自动迁移到新 edition，切到新 edition 构建后可能仍需手工修改。`--edition-idioms` 则应用"更新为当前 edition 推荐风格（idiom）"的建议。

## 选项

编译族共享选项（包选择、特性、profile、目标等）见 [cargo build](cli:command:build)。

### `--edition`

格式：`--edition`。应用把代码更新到下一个 edition 所需的修改；不会更新 `Cargo.toml` 清单中的 `edition` 字段，该字段需在迁移完成后手动修改。

### `--edition-idioms`

格式：`--edition-idioms`。应用把代码更新为当前 edition 推荐风格（idiom）的建议。

### `--broken-code`

格式：`--broken-code`。即使代码已有编译错误也执行修复。适用于 `cargo fix` 应用修改失败的场景：先把修改应用下来，把仍损坏的代码留在工作目录中供人工检查与修复。

### `--allow-no-vcs`

格式：`--allow-no-vcs`。未检测到版本控制系统（VCS）时也执行修复。

### `--allow-dirty`

格式：`--allow-dirty`。工作目录有改动（包括已暂存的改动）时也执行修复。

### `--allow-staged`

格式：`--allow-staged`。工作目录有已暂存（staged）的改动时也执行修复。

## 使用提醒

- 默认要求处于版本控制之下且工作目录干净：没有 VCS 时报错，可用 `--allow-no-vcs` 跳过；有改动时报错，`--allow-dirty` 同时放行未暂存与已暂存的改动，`--allow-staged` 只放行已暂存的改动。
- `cargo fix` 历史上允许 `--profile test`（稳定版同样可用）；传入它时相当于以包含测试的方式进行检查（源码中的遗留行为）。
- 全局选项（`-v`/`--verbose`、`--color` 等）见 [cargo](cli:command:)。

## 示例

```sh
# 对当前包应用编译器建议
cargo fix

# 为迁移到下一个 edition 做准备
cargo fix --edition

# 应用当前 edition 的惯用写法建议
cargo fix --edition-idioms
```

以上示例为说明性内容，未实际运行。

## 源码补充

- 命令定义与"`--edition`/`--edition-idioms` 未指定目标时默认修复全部目标"见 [src/bin/cargo/commands/fix.rs](https://github.com/rust-lang/cargo/blob/797e8a9bca276c1c9f9f738d2a20f484fa4eea9d/src/bin/cargo/commands/fix.rs)。
- VCS 检查、以包装 rustc 的方式反复应用修复，以及 `--edition` 时对清单的部分迁移见 [src/cargo/ops/fix/mod.rs](https://github.com/rust-lang/cargo/blob/797e8a9bca276c1c9f9f738d2a20f484fa4eea9d/src/cargo/ops/fix/mod.rs)。
