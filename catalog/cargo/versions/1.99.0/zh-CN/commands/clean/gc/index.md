---
title: cargo clean gc
command:
  - clean
  - gc
---

隐藏且不稳定的子命令：清理 cargo 的全局缓存，需要 nightly 工具链并通过 `-Z gc` 启用，稳定版 cargo 会直接报错；该子命令也不会出现在 `cargo clean --help` 中。

## 简介

`cargo clean gc`（gc，垃圾回收）按年龄或大小阈值清理 `$CARGO_HOME` 下的全局缓存，覆盖以下类别：

- 注册表的源码缓存与 crate 压缩包缓存（`.crate` 文件）；
- 注册表索引；
- git 依赖的检出（checkout）与裸克隆（`db`）；
- 其他已下载的缓存数据。

`--max-*-age` 类选项删除"超过给定时长未使用"的对应缓存；`--max-*-size` 类选项持续删除对应缓存，直到其总量降到给定大小以下。

只要设置了任一 `--max-*` 选项，就只执行所请求的清理；一个选项都不给时执行默认清理行为（源码注释明确：用户设置了任何选项则只做所请求的项，未设置则做默认行为）。

`-n`/`--dry-run` 显示将要删除的内容而不实际删除。全局选项（`-v`/`--verbose`、`--color` 等）见 [cargo](cli:command:)。

## 选项

### `--max-src-age`

格式：`--max-src-age <DURATION>`。删除超过给定时长未使用的源码缓存（不稳定）。

### `--max-crate-age`

格式：`--max-crate-age <DURATION>`。删除超过给定时长未使用的 crate 缓存（不稳定）。

### `--max-index-age`

格式：`--max-index-age <DURATION>`。删除超过给定时长未使用的注册表索引（不稳定）。

### `--max-git-co-age`

格式：`--max-git-co-age <DURATION>`。删除超过给定时长未使用的 git 依赖检出（不稳定）。

### `--max-git-db-age`

格式：`--max-git-db-age <DURATION>`。删除超过给定时长未使用的 git 依赖克隆（不稳定）。

### `--max-download-age`

格式：`--max-download-age <DURATION>`。删除超过给定时长未使用的任何已下载缓存数据（不稳定）。

### `--max-src-size`

格式：`--max-src-size <SIZE>`。删除源码缓存，直到其总量降到给定大小以下（不稳定）。

### `--max-crate-size`

格式：`--max-crate-size <SIZE>`。删除 crate 缓存，直到其总量降到给定大小以下（不稳定）。

### `--max-git-size`

格式：`--max-git-size <SIZE>`。删除 git 依赖缓存，直到其总量降到给定大小以下（不稳定）。

### `--max-download-size`

格式：`--max-download-size <SIZE>`。删除已下载的缓存数据，直到其总量降到给定大小以下（不稳定）。

## 环境变量

- `CARGO_HOME`：cargo 主目录，`gc` 清理的全局缓存位于其中。

完整清单见[环境变量](../../../reference/environment.md)。

## 使用提醒

- 稳定版 cargo 上执行会直接报错；需要 nightly 工具链并传 `-Z gc` 启用（上游跟踪 issue 12633）。
- 各 `--max-*` 选项的帮助文本均标注 unstable，上游注明其中一些是低层细节，未来可能变化。
- `cargo clean` 自身的选项与 `gc` 子命令互斥，不能混用。
- `cargo clean`（不带 `gc`）只清理项目的 target 目录，不涉及这些全局缓存。

## 示例

```sh
# 查看默认清理会删除哪些全局缓存（不实际删除）
cargo +nightly -Z gc clean gc --dry-run

# 只删除超过给定时长未使用的 crate 缓存
cargo +nightly -Z gc clean gc --max-crate-age <DURATION>
```

以上示例为说明性内容，未实际运行。

## 源码补充

- 子命令定义、`-Z gc` 门控与"设了任一选项则只执行所请求清理"的默认行为见 [src/bin/cargo/commands/clean.rs](https://github.com/rust-lang/cargo/blob/797e8a9bca276c1c9f9f738d2a20f484fa4eea9d/src/bin/cargo/commands/clean.rs)。
