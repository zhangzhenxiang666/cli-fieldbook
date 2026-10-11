---
title: 清单与工作区
uses:
  - command:metadata
  - command:read-manifest
---

每个包的 `Cargo.toml` 称为它的清单（manifest），TOML 格式，承载编译所需的全部元数据。本文概览清单的段落结构，并说明工作区如何把多个包组织在一起。本文为 cargo 书《The Manifest Format》与《Workspaces》两章的译文整理（上游文档译文）。

## 清单的定位

`Cargo.toml` 与 `Cargo.lock` 存放在包根。cargo 从当前目录向上查找清单来确定操作的包；[cargo locate-project](cli:command:locate-project) 可直接输出当前生效的 `Cargo.toml` 位置，加 `--workspace` 则输出工作区根清单（默认输出 JSON，源码补充）。清单的完整段落如下：

- `[package]`：定义包本身。
- 目标表：`[lib]`、`[[bin]]`、`[[example]]`、`[[test]]`、`[[bench]]`，见[包、crate 与编译目标](package-model.md)。
- 依赖表：`[dependencies]`、`[dev-dependencies]`、`[build-dependencies]` 与平台特定的 `[target.*.dependencies]`，见[依赖解析与 Cargo.lock](dependencies.md)。
- `[features]` 与 `[lints]`、`[hints]`：条件编译特性（见[特性与 profile](features-profiles.md)）与 lint 级别配置；`[hints]` 目前没有稳定可用的 hint。
- `[patch]`、`[replace]`（已弃用）、`[profile]`：依赖覆盖与编译配置；这三者只在工作区根清单中生效，成员清单中的同名段落被忽略。
- `[workspace]`：工作区定义（见下文）。

## `[package]` 段

对 cargo 而言唯一必填的字段是 `name`（仅允许字母数字与 `-`/`_`，不能为空）；crates.io 在此之上还有附加限制——仅 ASCII、不用保留名与 Windows 特殊名（如 `nul`）、首字符须为字母、大小写不敏感查重、不允许仅以 `-` 与 `_` 之差区分的名字、不超过 64 个字符，[cargo new](cli:command:new) 与 [cargo init](cli:command:init) 还会要求名字是合法的 Rust 标识符且非关键字。`version` 按 SemVer 三段式书写，可用 `-` 附预发布段（数字段按数值比较，`1.0.0-alpha.11` 高于 `1.0.0-alpha.4`）、用 `+` 附元数据段（仅信息性，cargo 忽略）；缺省为 `0.0.0`，发布到注册表时必填。

常用字段：`edition` 缺省按 2015 处理（`cargo new` 目前自动写入 2024）；`rust-version` 声明最低支持的 Rust 版本；`license`/`license-file` 采用 SPDX 2.3 表达式（`AND`/`OR`/`WITH` 组合，crates.io 要求二者必有其一，且 `description` 必填、须为纯文本）；`readme` 未指定时自动探测包根的 `README.md`/`README.txt`/`README`；`homepage`/`documentation`/`repository` 是三个 URL 字段，建议各自独立不重复；`keywords` 与 `categories` 便于检索（crates.io 各至多 5 个；关键词须 ASCII 且不超过 20 字符，分类须与官方列表精确匹配）；`build` 声明构建脚本（默认 `"build.rs"`，`false` 禁用）；`links` 声明链接的原生库名；`exclude`/`include` 用 gitignore 风格模式控制打包内容（`include` 覆盖 `exclude`；子包与根下 `target` 目录总是排除，`Cargo.toml`、最小化的 `Cargo.lock` 与 `license-file` 总是包含），这份清单同时参与 rustdoc 与无 `rerun-if-*` 指令的构建脚本的变更跟踪；`publish` 限定可发布的注册表（`false` 完全禁止）；`default-run` 指定 [cargo run](cli:command:run) 的默认二进制；`metadata` 表供外部工具存放配置，cargo 不对其报警。`autolib`/`autobins` 等五个开关与 `resolver` 分别见目标自动发现与依赖解析文章。`[lints]` 表按 `rust`/`clippy` 前缀分组覆盖 lint 级别（`forbid`/`deny`/`warn`/`allow`，`priority` 整数控制组间覆盖），只作用于当前包；`[badges]` 段已无实际展示渠道（crates.io 已移除徽章显示）。

## 工作区

工作区（workspace）是一组作为一个整体管理的包。要点：

- 全部成员共享工作区根的一份 `Cargo.lock` 与一个 target 目录（默认为工作区根下的 `target`）。
- `[patch]`、`[replace]`、`[profile.*]` 只在根清单识别。
- 常用命令可用 `--workspace` 跨成员运行；包选择旗标 `-p`/`--package` 与 `--workspace` 的语义见各命令页。

两种根形态：清单同时含 `[workspace]` 与 `[package]` 时，该包是工作区的根包（root package）；只有 `[workspace]` 而没有 `[package]` 的清单称为虚拟清单（virtual manifest）——适合没有"主包"的项目。虚拟清单必须显式设置 `resolver`（无 `package.edition` 可供推断），且在工作区根运行命令时默认作用于全部成员。

## 成员与继承

`members` 列出成员目录（支持 `*`、`?` glob），`exclude` 排除路径；位于工作区目录内的 `path` 依赖会自动成为成员。在子目录中运行命令时，cargo 向上搜索带 `[workspace]` 的清单确定所属工作区，成员也可用 `[package]` 的 `workspace` 字段显式指定根（该字段不能与 `[workspace]` 表并存）。`default-members` 指定在工作区根未用包选择旗标时操作的成员；未指定时用根包，虚拟清单则相当于全部成员。

工作区根可集中声明、由成员继承的内容（继承要求 cargo 1.64+）：

- `[workspace.package]`：可继承的元数据键，含 `version`、`authors`、`edition`、`rust-version`、`license`、`repository`、`publish` 等（`license-file`/`readme` 相对工作区根解析）。
- `[workspace.dependencies]`：成员依赖的统一定义。此处不能声明 `optional`；成员继承时可叠加 `features`，但除 `optional` 与 `features` 外不得再带其他键。
- `[workspace.lints]`：lint 配置，成员用 `[lints] workspace = true` 继承（1.74+）。
- `[workspace.metadata]`：与 `package.metadata` 一样被 cargo 忽略，供外部工具使用。

```toml
# 工作区根：集中声明
[workspace.package]
version = "1.2.3"
edition = "2024"

[workspace.dependencies]
regex = { version = "1.6.0", default-features = false, features = ["std"] }

# 成员 bar/Cargo.toml：按键继承
[package]
name = "bar"
version.workspace = true
edition.workspace = true

[dependencies]
regex = { workspace = true, features = ["unicode"] }
```

## 机器可读视图

[cargo metadata](cli:command:metadata) 以机器可读格式输出包的解析结果——实际选用的依赖版本（含覆盖）等信息；`--no-deps` 只输出工作区成员信息而不获取依赖。隐藏命令 [cargo read-manifest](cli:command:read-manifest) 打印单个清单的 JSON 表示，已弃用，官方建议改用 `cargo metadata --no-deps`。
