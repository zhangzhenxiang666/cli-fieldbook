---
title: jj operation show
command:
  - operation
  - show
---

## 简介

显示一项操作的元数据和差异。

## 参数

### `OPERATION`

操作 ID；默认 @。

## 选项

### `--no-graph`

不画图。

### `--template`

操作元数据模板。

### `--patch`

显示提交补丁差异。

### `--no-op-diff`

不显示仓库状态差异。

### `--show-changes-in`

只显示这些修订的 change 差异；默认 revsets.op-diff-changes-in。

### `--help`

显示帮助。

## 使用提醒

全局参数见 [Global Options](../../../concepts/global-options.md)。

源码：[cli/src/commands/operation/show.rs](https://github.com/jj-vcs/jj/blob/7c41cdeb16b6b321c64e789a966b6adf723816a5/cli/src/commands/operation/show.rs)。
