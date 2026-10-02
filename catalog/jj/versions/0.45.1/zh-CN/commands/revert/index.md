---
title: jj revert
command:
  - revert
---

## 简介

在指定位置新建反向修改，用来撤销既有提交的效果。

## 选项

### `--revision`

需要逆向应用的修订集合；必填。

### `--onto`

目标父修订，可重复以形成多父提交；可见长别名 --destination。 可见短别名 -d；源码未标记弃用。

### `--insert-after`

插到这些修订之后，并重接其孩子；可重复；别名 --after。

### `--insert-before`

插到这些修订之前，并重接它们；可重复；别名 --before。

### `--help`

显示帮助。

## 使用提醒

全局参数见 [Global Options](../../concepts/global-options.md)。

**Hidden / Compatibility Options（源码补充，不是普通 help 可见项）**

```text
  --revisions <REVSETS>
          --revision 的隐藏长别名；不应据此推断所有命令都接受这两个拼写。
```

**注意：** 按逆拓扑顺序应用反向修改。不会删除原提交，适合对已经发布的提交做可审查的回退；描述模板为 templates.revert_description。

源码：[cli/src/commands/revert.rs](https://github.com/jj-vcs/jj/blob/7c41cdeb16b6b321c64e789a966b6adf723816a5/cli/src/commands/revert.rs)。
