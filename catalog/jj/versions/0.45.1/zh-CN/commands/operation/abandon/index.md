---
title: jj operation abandon
command:
  - operation
  - abandon
---

## 简介

丢弃一段操作历史。

## 参数

### `OPERATION`

操作 ID 或操作范围；例如 ..`<ID>` 丢弃该操作及更早祖先历史。

## 选项

### `--help`

显示帮助。

## 使用提醒

全局参数见 [Global Options](../../../concepts/global-options.md)。

**注意：** 高风险：缩短恢复历史，之后 GC 可能使对应对象永久不可恢复。这不是撤销操作，应优先使用 undo / op revert / op restore。

源码：[cli/src/commands/operation/abandon.rs](https://github.com/jj-vcs/jj/blob/7c41cdeb16b6b321c64e789a966b6adf723816a5/cli/src/commands/operation/abandon.rs)。
