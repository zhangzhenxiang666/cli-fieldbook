---
title: jj simplify-parents
command:
  - simplify-parents
---

## 简介

删除冗余父边，不改变修订的文件树。

## 选项

### `--source`

处理指定修订及其所有后代；可重复。

### `--revision`

仅处理指定修订；可重复。

### `--help`

显示帮助。

## 使用提醒

全局参数见 [Global Options](../../concepts/global-options.md)。

**注意：** 父节点 C 若也是另一个父节点 B 的祖先，则可以移除直接的 C 父边。未给选择器时读取 revsets.simplify-parents，默认 reachable(@, mutable())。

源码：[cli/src/commands/simplify_parents.rs](https://github.com/jj-vcs/jj/blob/7c41cdeb16b6b321c64e789a966b6adf723816a5/cli/src/commands/simplify_parents.rs)。
