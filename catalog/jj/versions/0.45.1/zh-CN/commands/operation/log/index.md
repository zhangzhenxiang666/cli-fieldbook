---
title: jj operation log
command:
  - operation
  - log
---

## 简介

查看仓库操作日志。

## 选项

### `--limit`

最多显示的操作数量。

### `--reversed`

反转显示顺序。

### `--no-graph`

不画操作图。

### `--template`

操作输出模板。

### `--op-diff`

显示每个操作造成的仓库状态差异。

### `--patch`

显示提交补丁差异；隐含 --op-diff。

### `--show-changes-in`

只显示这些修订的 change 差异；默认 revsets.op-diff-changes-in。

### `--help`

显示帮助。

## 使用提醒

全局参数见 [Global Options](../../../concepts/global-options.md)。

**注意：** 默认也可能先快照工作副本 / 调和并发操作。需要观察已有状态时可用 jj --at-op=@ --ignore-working-copy op log。

源码：[cli/src/commands/operation/log.rs](https://github.com/jj-vcs/jj/blob/7c41cdeb16b6b321c64e789a966b6adf723816a5/cli/src/commands/operation/log.rs)。
