---
title: cargo locate-project
command:
  - locate-project
---

定位 `Cargo.toml` 清单并打印其完整路径，默认输出 JSON 对象，便于脚本与 IDE 解析。

## 简介

从当前工作目录开始向上搜索名为 `Cargo.toml` 的文件，找到后向标准输出打印清单的完整路径。默认（`--message-format json`）输出形如 `{"root":"<路径>"}` 的 JSON 对象，路径挂在键 `root` 下。

若当前包属于某个工作区，默认输出该成员包自身的清单路径而非工作区根清单；加 `--workspace` 可改为定位工作区根的 `Cargo.toml`。工作区根通过继续向上遍历，或在定位到成员清单后读取 `package.workspace` 字段确定。

清单搜索的起点可用继承的 `-m/--manifest-path` 显式指定（该选项在 [cargo build](cli:command:build) 释义）。

## 选项

### `--workspace`

格式：`--workspace`。定位工作区根的 `Cargo.toml`，而不是当前工作区成员的清单。

### `--message-format`

格式：`--message-format <FMT>`。路径的输出表示形式。取值 `json`、`plain`。`json` 输出以 `root` 为键、值为完整路径的 JSON 对象（man 手册记载其为默认取值）；`plain` 仅输出路径本身。源码中该取值解析大小写不敏感（`.ignore_case(true)`）。

## 示例

```sh
# 依据当前目录显示清单路径
cargo locate-project

# 定位工作区根清单，并以纯文本输出路径
cargo locate-project --workspace --message-format plain
```

以上示例为说明性内容，未实际运行。

## 源码补充

- 命令定义、JSON 结构（`ProjectLocation { root }`）与 `--workspace` 的两段式查找见 [src/bin/cargo/commands/locate_project.rs](https://github.com/rust-lang/cargo/blob/797e8a9bca276c1c9f9f738d2a20f484fa4eea9d/src/bin/cargo/commands/locate_project.rs)。
