---
title: cargo package
command:
  - package
---

把当前包组装为可分发的压缩 `.crate` 文件，存放于 `target/package` 目录，不上传。

## 简介

`cargo package` 为当前目录（或选中的）包创建可分发的压缩 `.crate` 文件，结果存放在 `target/package` 目录。流程依次为：

1. 加载并检查当前工作区，做一些基础检查。例如 path 依赖必须带 `version` 键（发布包中 cargo 会忽略 path 键），`dev-dependencies` 不受此限制。
2. 创建压缩 `.crate` 文件：
   - 原始 `Cargo.toml` 被重写并规范化，原始文件以 `Cargo.toml.orig` 保留；
   - 清单中的 `[patch]`、`[replace]` 与 `[workspace]` 段会被移除；
   - `Cargo.lock` 总是被包含；缺失时会生成新的 lockfile（`--exclude-lockfile` 可改变这一行为）。[cargo install](cli:command:install) 配合 `--locked` 时会使用打包内的 lockfile；
   - 包含 `.cargo_vcs_info.json`，记录当前 VCS 检出的哈希（有 VCS 时）以及工作区是否 dirty；
   - 符号链接会被平摊为指向的目标文件；
   - 文件按清单的 `include`、`exclude` 字段规则取舍。
3. 解开 `.crate` 文件并从零构建，验证它能在干净状态下构建；`--no-verify` 可跳过这一步。
4. 检查构建脚本没有修改任何源文件。

`-l/--list` 只打印将包含进包的文件清单，不实际生成包；`human` 格式为每行一个文件。

`--registry <REGISTRY>` 指定"为哪个注册表打包"：不会把包发布到该注册表，但打包多个相互依赖的 crate 时，lockfile 会以"依赖将发布到该注册表"为假设生成。`--index <INDEX>` 直接给出注册表索引 URL，与 `--registry` 互斥。二者均为共享参数声明，本页选项表内不单列条目。

## 选项

以下仅列出 `cargo package` 自有的选项。包选择（`-p/--package`、`--workspace`、`--exclude`）、特性（`-F/--features`、`--all-features`、`--no-default-features`）、编译（`--target`、`--target-dir`、`-j/--jobs`、`--keep-going`）与清单（`-m/--manifest-path`）等共享选项见 [cargo build](cli:command:build)；全局选项（`-v`、`-q`、`--color`、`--locked`、`--offline`、`--frozen`、`--config`、`-Z`）见 [cargo](cli:command:)。

### `--list`

短旗标 `-l`。格式：`--list`。只打印将包含在包里的文件，不生成包。

### `--no-verify`

格式：`--no-verify`。跳过验证步骤，不通过构建来检验包内容。

### `--no-metadata`

格式：`--no-metadata`。忽略缺少人类可读元数据（如 `description`、`license`）的警告。

### `--allow-dirty`

格式：`--allow-dirty`。允许在有未提交 VCS 改动的工作目录中打包。

### `--exclude-lockfile`

格式：`--exclude-lockfile`。打包时不包含 lockfile。手册注明这不是常规用途选项：一些工具预期包内有 lockfile（例如 `cargo install --locked`），应先考虑其他方案。

### `--message-format`

格式：`--message-format <FMT>`。指定输出表示方式，取值 `human`、`json`；默认 `human`。目前只与 `--list` 同用，影响文件清单的格式：`human` 为每行一个文件；`json` 为机器可读的 JSON，每个包一行（换行分隔的 NDJSON），记录包的 Package ID 与各文件的来源（从原文件复制 `copy`，或打包过程中生成 `generate`，及对应的原始路径）。该选项不稳定，需要 nightly 与 `-Zunstable-options`。

## 使用提醒

- `--message-format` 在稳定版上会因不稳定而报错（源码门控编号 15353），且必须与 `--list` 同用。
- `--index` 与 `--registry` 互斥，同时给出会触发参数冲突错误。
- 验证步骤会从零重新构建包，耗时可能与常规构建相当；`--no-verify` 跳过它但会失去"能从干净状态构建"的保证。
- 本版的 `cargo package` 没有 `-n/--dry-run`：干跑只作为 [cargo publish](cli:command:publish) `--dry-run` 的内部行为存在（打包本身无副作用，源码中干跑标志固定为关闭）。
- 需要把包上传到注册表时使用 [cargo publish](cli:command:publish)。

## 示例

```sh
# 为当前包创建压缩 .crate 文件
cargo package

# 只查看将包含的文件清单
cargo package --list

# 有未提交改动时仍允许打包，并跳过构建验证
cargo package --allow-dirty --no-verify
```

以上示例为说明性内容，未实际运行。

## 源码补充

- 命令定义见 [src/bin/cargo/commands/package.rs](https://github.com/rust-lang/cargo/blob/797e8a9bca276c1c9f9f738d2a20f484fa4eea9d/src/bin/cargo/commands/package.rs)；打包流程、文件清单与消息格式见 [src/cargo/ops/cargo_package/mod.rs](https://github.com/rust-lang/cargo/blob/797e8a9bca276c1c9f9f738d2a20f484fa4eea9d/src/cargo/ops/cargo_package/mod.rs)。
