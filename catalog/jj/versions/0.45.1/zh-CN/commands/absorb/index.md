---
title: jj absorb
command:
  - absorb
---

## 简介

把源修订中的修改自动分配到最近修改相应代码行的可变祖先。

## 参数

### `FILESETS`

只考虑匹配路径中的修改；省略时考虑全部路径。

## 选项

### `--from`

源修订；默认 @。

### `--into`

允许接收修改的修订；默认 mutable()。只考虑源修订的祖先；别名 --to。

### `--interactive`

先交互选择需要吸收的修改块。

### `--tool`

选择差异编辑器，隐含 --interactive。

### `--help`

显示帮助。

## 使用提醒

全局参数见 [Global Options](../../concepts/global-options.md)。

**注意：** 不能无歧义确定归属的修改留在源修订。只有所有修改都已吸收且源修订没有描述时，源修订才会被自动放弃。用 jj op show -p 检查结果。

源码：[cli/src/commands/absorb.rs](https://github.com/jj-vcs/jj/blob/7c41cdeb16b6b321c64e789a966b6adf723816a5/cli/src/commands/absorb.rs)。
