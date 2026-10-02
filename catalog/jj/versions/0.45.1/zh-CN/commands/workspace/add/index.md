---
title: jj workspace add
command:
  - workspace
  - add
---

## 简介

创建额外工作区。

## 参数

### `DESTINATION`

新工作区目录。

## 选项

### `--name`

工作区名称；默认目标目录 basename。

### `--revision`

新工作 change 的父修订，可重复。省略时与当前工作 change 共享父修订，而不是默认以当前 @ 为父。

### `--message`

新工作 change 的描述。

### `--sparse-patterns`

copy（默认，复制当前稀疏模式）、full（展开所有文件）、empty（不展开文件）。

### `--help`

显示帮助。

## 使用提醒

全局参数见 [Global Options](../../../concepts/global-options.md)。

**注意：** 每个工作区有自己的 @ 和稀疏模式，共享提交与引用。v0.45.1 不收录 main 上尚未发布的 workspace add --colocate 新能力。

源码：[cli/src/commands/workspace/add.rs](https://github.com/jj-vcs/jj/blob/7c41cdeb16b6b321c64e789a966b6adf723816a5/cli/src/commands/workspace/add.rs)。
