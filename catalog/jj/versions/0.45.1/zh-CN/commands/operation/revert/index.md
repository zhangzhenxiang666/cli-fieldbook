---
title: jj operation revert
command:
  - operation
  - revert
---

## 简介

在当前状态上反向应用指定操作的效果。

## 参数

### `OPERATION`

要反向应用的操作；默认 @，即当前操作。

## 选项

### `--what`

选择恢复部分，可重复：repo（仓库 / 本地引用）、remote-tracking（缓存的远端跟踪状态）；默认二者都恢复，属于实验性选项。

### `--help`

显示帮助。

## 使用提醒

全局参数见 [Global Options](../../../concepts/global-options.md)。

**注意：** 和 restore 不同：revert 试图保留其他后续操作的效果，类似对一次操作做反向补丁。

源码：[cli/src/commands/operation/revert.rs](https://github.com/jj-vcs/jj/blob/7c41cdeb16b6b321c64e789a966b6adf723816a5/cli/src/commands/operation/revert.rs)。
