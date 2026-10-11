---
title: cargo update
command:
  - update
---

把 `Cargo.lock` 中记录的依赖更新到最新可用版本。

## 简介

`cargo update` 更新的是 `Cargo.lock`：lockfile 不存在时以最新可用版本创建（此时行为与 [cargo generate-lockfile](cli:command:generate-lockfile) 相同）；已存在时把依赖更新到版本需求允许的最新版本。`Cargo.toml` 中的版本需求不受影响（使用 `--breaking` 时除外）。

不带 SPEC 时更新全部依赖。给出 SPEC 时执行保守更新：只更新指定的包；其传递依赖仅在"不更新它们就无法更新 SPEC"时才随之更新；其余依赖保持在 `Cargo.lock` 已记录的版本。SPEC 格式见 [cargo pkgid](cli:command:pkgid)。

`--precise <PRECISE>` 与 SPEC 同用，把包精确设为给定版本；`--recursive`（别名 `--aggressive`）与 SPEC 同用，强制连同其依赖一起更新；两者互斥。`-w`/`--workspace` 只尝试更新工作区内定义的包，其余包仅在尚未写入 lockfile 时才更新——适合修改了 `Cargo.toml` 版本号之后刷新 `Cargo.lock`。

`-n`/`--dry-run` 显示将更新什么，但不写入 lockfile。全局选项（`--offline`、`--locked` 等）见 [cargo](cli:command:)。

## 参数

### `package2`

可选（可多个），写作 `<SPEC>`。要更新的包（帮助文本中显示为 `SPEC`），格式见 [cargo pkgid](cli:command:pkgid)。

## 选项

### `--package`

短旗标 `-p`。格式：`--package <SPEC>`。要更新的包，可重复给出。该选项在帮助中隐藏，man 手册亦未记载：它与位置参数 `<SPEC>` 同属一个参数组、语义等价，位置参数是文档化的写法。

### `--recursive`

别名 `--aggressive`。格式：`--recursive`。与 SPEC 同用时，强制同时更新 SPEC 的全部依赖。与 `--precise` 互斥。

### `--precise`

格式：`--precise <PRECISE>`。与 SPEC 同用，把包精确设为给定版本；包来自 git 仓库时也可以是 git 修订（如 SHA 哈希或 tag）。可以指定已 yank 的版本，但不推荐，应尽量改用未 yank 的 SemVer 兼容版本；nightly 上还可以指定兼容的 pre-release 版本（即使 `Cargo.toml` 中的版本需求不含 pre-release 标识）。必须与 SPEC 同用。

### `--breaking`

短旗标 `-b`。格式：`--breaking`。把 SPEC 更新到最新的 SemVer 破坏性版本，并相应修改 `Cargo.toml` 中的版本需求（不稳定，仅 nightly 可用且需 `-Z unstable-options`，上游跟踪 issue 12425）。只作用于满足以下条件的依赖：是工作区成员的依赖、未被重命名、存在 SemVer 不兼容的新版本、且版本需求使用 SemVer 操作符 `^`（即默认写法）。

### `--workspace`

短旗标 `-w`。格式：`--workspace`。只尝试更新工作区内定义的包；其他包仅在尚未存在于 lockfile 中时才更新。

## 使用提醒

- `--recursive` 与 `--precise` 不能同用。
- `--precise` 必须与 SPEC（位置参数或 `-p`）同用。
- `--breaking` 在稳定通道上直接报错；它同时修改 `Cargo.toml` 与 `Cargo.lock`，与 `-n`/`--dry-run` 同用时解析后放弃写入并给出警告。
- 传入不带值的 `-p` 会列出可用包。

## 示例

```sh
# 更新 lockfile 中的全部依赖
cargo update

# 只更新指定依赖
cargo update foo bar

# 把依赖固定到具体版本
cargo update foo --precise 1.2.3
```

以上示例为说明性内容，未实际运行。

## 源码补充

- 命令定义（隐藏的 `-p`、`--precise`/`--recursive` 互斥、`--breaking` 门控）见 [src/bin/cargo/commands/update.rs](https://github.com/rust-lang/cargo/blob/797e8a9bca276c1c9f9f738d2a20f484fa4eea9d/src/bin/cargo/commands/update.rs)。
- 保守更新的实现（`to_avoid` 集合与 workspace 模式的差异）见 [src/cargo/ops/cargo_update.rs](https://github.com/rust-lang/cargo/blob/797e8a9bca276c1c9f9f738d2a20f484fa4eea9d/src/cargo/ops/cargo_update.rs)。
