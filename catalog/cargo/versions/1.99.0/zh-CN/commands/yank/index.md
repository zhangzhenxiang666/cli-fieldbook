---
title: cargo yank
command:
  - yank
---

把已发布 crate 的某个版本从注册表索引中移除（yank），或用 `--undo` 恢复。

## 简介

`cargo yank` 把先前发布的 crate 版本从服务器的索引中移除。它不删除任何数据：crate 仍可通过注册表的下载链接获取。

yank 之后，cargo 不会再为任何没有既有 Cargo.lock 的新项目或新检出选用该版本；如果因此不再有任何兼容版本可用，依赖解析会报错。已有的 Cargo.lock 不受影响。

版本与 crate 的给定方式有两种：位置参数写成 `crate@version`，或用 `--version`（或别名 `--vers`）单独给版本、crate 省略时取当前目录清单中的包名。两种方式不能同时使用 `@版本` 与 `--version`；版本必须是合法的 SemVer（写成 `v1.0.0` 这类带 `v` 前缀的形式时，错误信息会提示去掉 `v`）。不给出任何版本会直接报错。

### yank 如何影响版本选择

以发布过 `1.5.0`、`1.5.1`、`1.5.2`、`2.0.0`、`3.0.0` 的 crate `bar` 为例，在没有 Cargo.lock 的前提下 yank 某个版本后，cargo 能否为常见 SemVer 要求选出版本：

| 被 yank 的版本 / 依赖要求 | `bar = "1.5.0"` | `bar = "=1.5.0"` | `bar = "2.0.0"` |
| --- | --- | --- | --- |
| `1.5.0` | 改用 `1.5.1` 或 `1.5.2` | 报错 | 仍用 `2.0.0` |
| `1.5.1` | 改用 `1.5.0` 或 `1.5.2` | 改用 `1.5.0` | 仍用 `2.0.0` |
| `2.0.0` | 仍用 `1.5.0`、`1.5.1` 或 `1.5.2` | 仍用 `1.5.0` | 报错 |

因此官方手册建议：先发布一个 semver 兼容的替代版本，再 yank 有问题的版本，降低下游无法编译的概率；只有在例外情况下（误发布、无意的 semver 破坏、严重不可用）才应 yank。安全漏洞一般更适合通过 RustSec 公告来推动升级。涉及版权、许可或个人数据问题时，仅 yank 可能不够，应联系注册表维护方（crates.io 见其政策页与 help@crates.io）。凭据泄露时应立即吊销凭据：yank 只影响默认的依赖解析，既有的 Cargo.lock 与直接下载不受影响，无法阻止泄露内容继续传播。

本命令要求认证：用 `--token` 选项提供 API 令牌，或先运行 [cargo login](cli:command:login) 登录。

`--index <INDEX>` 直接给出注册表索引 URL，`--registry <REGISTRY>` 给出 Cargo 配置文件中定义的注册表名，二者互斥；未指定时使用 `registry.default` 配置的默认注册表。这两个选项是共享参数声明，本页选项表内不单列条目。

## 参数

### `crate`

可选，写作 `<crate>`。目标 crate 的名称，可附带版本写作 `<crate>@<version>`；省略 crate 时使用当前目录清单中的包名。

## 选项

以下仅列出 `cargo yank` 自有的选项；全局选项（`-v`、`-q`、`--color`、`--locked`、`--offline`、`--frozen`、`--config`、`-Z`）见 [cargo](cli:command:)。

### `--version`

别名 `--vers`。格式：`--version <VERSION>`。要 yank 或恢复（`--undo`）的版本。

### `--undo`

格式：`--undo`。撤销一次 yank，把版本放回索引。

### `--token`

格式：`--token <TOKEN>`。认证所用的 API 令牌。

## 环境变量

- `CARGO_REGISTRY_TOKEN`：默认注册表使用的令牌（对应配置 `registry.token`）。
- `CARGO_REGISTRIES_<name>_TOKEN`：名为 `<name>` 的注册表使用的令牌（对应配置 `registries.<name>.token`）。

完整清单见[环境变量](../../reference/environment.md)。

## 使用提醒

- `@版本` 写法与 `--version` 不能同时使用；完全不给版本时报错。
- `--index` 与 `--registry` 互斥，同时给出会触发参数冲突错误。
- yank 不删除代码、不影响既有 Cargo.lock，也不能替代凭据吊销；见上文简介。

## 示例

```sh
# 从索引中移除 foo 的 1.0.7 版本
cargo yank foo@1.0.7

# 恢复 foo 的 1.0.7 版本
cargo yank --undo foo@1.0.7

# 用 --version 指定版本，crate 省略时取当前目录的包
cargo yank --version 1.0.7
```

以上示例为说明性内容，未实际运行。

## 源码补充

- 命令定义、`crate@version` 解析与版本校验见 [src/bin/cargo/commands/yank.rs](https://github.com/rust-lang/cargo/blob/797e8a9bca276c1c9f9f738d2a20f484fa4eea9d/src/bin/cargo/commands/yank.rs)；yank/unyank 的 API 调用见 [src/cargo/ops/registry/yank.rs](https://github.com/rust-lang/cargo/blob/797e8a9bca276c1c9f9f738d2a20f484fa4eea9d/src/cargo/ops/registry/yank.rs)。
- 版本选择表格与"何时 yank"的指引译自 man 手册（上游路径 `src/doc/man/cargo-yank.md`）。
