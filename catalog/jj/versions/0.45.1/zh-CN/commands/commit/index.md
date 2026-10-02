---
title: jj commit
command:
  - commit
---

## 简介

更新当前 change 的描述，并在其上创建新的工作副本 change。

## 参数

### `FILESETS`

把所选路径的修改留在当前提交，其余修改放到新工作副本提交。

## 选项

### `--interactive`

交互选择留在当前提交的修改。

### `--tool`

差异编辑器，隐含 --interactive。

### `--message`

提交描述；可重复以组成多个段落，不打开编辑器。

### `--editor`

即使给了 --message，仍打开编辑器继续修改。

### `--help`

显示帮助。

## 使用提醒

全局参数见 [Global Options](../../concepts/global-options.md)。

**注意：** 没有 -r：始终操作 @。不选路径、不用 -i 时近似 describe 后 new。已有书签不会像普通 split 那样自动前移到新的子 change。

源码：[cli/src/commands/commit.rs](https://github.com/jj-vcs/jj/blob/7c41cdeb16b6b321c64e789a966b6adf723816a5/cli/src/commands/commit.rs)。
