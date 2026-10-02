---
title: jj split
command:
  - split
---

## 简介

把一个修订的修改拆为两部分。

## 参数

### `FILESETS`

放入“选中部分”的文件集合；未指定文件集合时默认交互选择。

## 选项

### `--interactive`

交互选择补丁片段。

### `--tool`

指定 diff editor；隐含交互。

### `--revision`

要拆分的修订；默认 @。

### `--onto`

目标父修订，可重复以形成多父提交；可见长别名 --destination。 可见短别名 -d；源码未标记弃用。

### `--insert-after`

插到这些修订之后，并重接其孩子；可重复；别名 --after。

### `--insert-before`

插到这些修订之前，并重接它们；可重复；别名 --before。

### `--message`

为选中部分设置描述；另一部分保留原描述。

### `--editor`

使用 --message 后仍启动描述编辑器。

### `--parallel`

拆成兄弟修订，而非父子修订。

### `--help`

显示帮助。

## 使用提醒

全局参数见 [Global Options](../../concepts/global-options.md)。

**注意：** 默认：选中部分保留在原 change，余下部分成为新孩子。使用 -o/-A/-B 时：选中部分提取为新位置的新 change，余下部分留原位。空提交不能 split。书签行为受 split.legacy-bookmark-behavior 影响（内置 true），拆分后务必检查书签。 --parallel 与 -o/-A/-B 互斥；-o 与 -A/-B 互斥，但 -A 和 -B 可组合。

源码：[cli/src/commands/split.rs](https://github.com/jj-vcs/jj/blob/7c41cdeb16b6b321c64e789a966b6adf723816a5/cli/src/commands/split.rs)。
