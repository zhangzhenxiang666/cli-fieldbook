---
title: jj duplicate
command:
  - duplicate
---

## 简介

复制修订为新的 change，保留原修订。

## 参数

### `REVSETS`

要复制的修订；默认 @；支持 -r。

## 选项

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
  -r <REVSETS>
          位置修订参数的隐藏短选项形式；不能据此使用 --revision。
```

**注意：** 不指定位置时复制到原父提交或新复制的父提交上。复制产生新 change ID；与 rebase 移动原 change 不同。--onto 不能与插入选项同用；--insert-after 与 --insert-before 可以组合界定位置。

源码：[cli/src/commands/duplicate.rs](https://github.com/jj-vcs/jj/blob/7c41cdeb16b6b321c64e789a966b6adf723816a5/cli/src/commands/duplicate.rs)。
