---
title: cargo clean
command:
  - clean
---

删除 cargo 此前在 target 目录中生成的构建产物。

## 简介

`cargo clean` 移除 target 目录中由 cargo 生成的产物。不带任何选项时，删除整个 target 目录。

常用范围控制方式：

- `-p <SPEC>`（可重复给出）只清理指定包的产物，SPEC 格式见 [cargo pkgid](cli:command:pkgid)；未选择任何包时，清理工作区内全部包与依赖的产物。
- `--workspace` 把工作区全部成员的包加入清理范围（与 `-p` 取并集）。
- `--doc` 只删除 target 目录下的 `doc` 子目录，即 `cargo doc` 生成的文档。
- `-r`/`--release` 删除 `release` 目录中的全部产物；`--profile <PROFILE-NAME>` 删除给定 profile 名称对应目录中的全部产物。未显式指定 profile 时，按默认（`dev`）布局处理。
- `--target <TRIPLE>` 只清理面向给定目标三元组的输出。

上述旗标中，`-p`、`-r`、`--profile`、`--target`、`--target-dir`、`-m`/`--manifest-path` 与编译命令共享，通用语义在 [cargo build](cli:command:build) 页释义；全局选项（`-v`/`--verbose`、`--color` 等）见 [cargo](cli:command:)。

`-n`/`--dry-run` 显示将要删除内容的摘要但不实际删除，结束时提示 `no files deleted due to --dry-run`；配合 `--verbose` 可列出将被删除的具体文件。

## 选项

与编译命令共享的选项（`-p`/`--package`、`-r`/`--release`、`--profile`、`--target`、`--target-dir`、`-m`/`--manifest-path`）在 [cargo build](cli:command:build) 页释义；`-n`/`--dry-run` 的行为见上文简介。

### `--doc`

格式：`--doc`。只删除 target 目录中的 `doc` 目录。

### `--workspace`

格式：`--workspace`。清理工作区全部成员的产物。

## 环境变量

- `CARGO_TARGET_DIR`：target 目录的位置，`cargo clean` 据此决定删除哪个目录。

完整清单见[环境变量](../../reference/environment.md)。

## 使用提醒

- `--doc` 不能与 `-p` 同用，源码直接报错 `--doc cannot be used with -p`。
- 显式传入 `--target-dir` 时，cargo 会先校验该目录中的 `CACHEDIR.TAG` 标记，校验失败则中止清理，以防误删与 cargo 无关的目录。
- `-p` 的 SPEC 中带版本或 URL 限定符不会缩小范围：二者均被忽略（仅给出警告），清理该包的所有版本。
- `cargo clean` 的选项与它的子命令互斥；隐藏子命令 [cargo clean gc](cli:command:clean/gc) 用于清理全局缓存。
- 传入不带值的 `-p` 会列出当前可用的包。

## 示例

```sh
# 删除整个 target 目录
cargo clean

# 只删除 release 目录中的产物
cargo clean --release

# 预览将要删除的内容，不实际删除
cargo clean --dry-run
```

以上示例为说明性内容，未实际运行。

## 源码补充

- 命令定义（`--doc`、`--workspace`、隐藏的 `gc` 子命令）见 [src/bin/cargo/commands/clean.rs](https://github.com/rust-lang/cargo/blob/797e8a9bca276c1c9f9f738d2a20f484fa4eea9d/src/bin/cargo/commands/clean.rs)。
- 清理流程、profile 目录判定、按包清理时的文件匹配与 `CACHEDIR.TAG` 校验见 [src/cargo/ops/cargo_clean.rs](https://github.com/rust-lang/cargo/blob/797e8a9bca276c1c9f9f738d2a20f484fa4eea9d/src/cargo/ops/cargo_clean.rs)。
