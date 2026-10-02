---
title: jj rebase
command:
  - rebase
---

## 简介

把指定 change 移到新的父修订 / 插入位置。

## 选项

### `--branch`

移动相对目标分叉出来的整条分支及后代；可重复；未指定 -b/-s/-r 时默认 -b @。

### `--source`

移动指定修订及其所有后代；可重复；每个显式指定的修订都会成为目标的直接孩子。

### `--revision`

只移动选中修订，未选中后代接回旧父位置；保留选中修订间的依赖关系。

### `--onto`

目标父修订，可重复以形成多父提交；可见长别名 --destination。 可见短别名 -d；源码未标弃用。

### `--insert-after`

插到这些修订之后，并重接其孩子；可重复；别名 --after。

### `--insert-before`

插到这些修订之前，并重接它们；可重复；别名 --before。

### `--skip-emptied`

重放后才变空的提交会被 abandon；原本就空的提交不删除；具有多个非空父的 merge 不跳过。

### `--keep-divergent`

保留 change ID 相同的分歧版本；默认遇到目标侧已有相同改动版本时可能消除重复分歧。

### `--simplify-parents`

同时移除冗余父边；效果类似 simplify-parents。

### `--help`

显示帮助。

## 使用提醒

全局参数见 [Global Options](../../concepts/global-options.md)。

**Hidden / Compatibility Options（源码补充，不是普通 help 可见项）**

```text
  --revisions <REVSETS>
          --revision 的隐藏长别名。
```

**注意：** -b/-s/-r 选择方式互斥。-o 与插入方式互斥；-A/-B 可组合。-d 是当前源码公开保留的短别名，并非已弃用；本手册示例统一写 -o。

源码：[cli/src/commands/rebase.rs](https://github.com/jj-vcs/jj/blob/7c41cdeb16b6b321c64e789a966b6adf723816a5/cli/src/commands/rebase.rs)。
