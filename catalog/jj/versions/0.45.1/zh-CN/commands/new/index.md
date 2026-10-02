---
title: jj new
command:
  - new
---

## 简介

创建一个空 change，默认切换工作副本来编辑它。

## 参数

### `REVSETS`

新修订的父集合；默认 @。多个父修订形成 merge；便捷短选项 -o、-r。

## 选项

### `--message`

新 change 的描述；可重复，按段落连接。

### `--no-edit`

创建新 change 但不切换工作副本。

### `--insert-after`

插在指定修订之后，并重接其孩子；可重复；别名 --after。

### `--insert-before`

插在指定修订之前；可重复；别名 --before。

### `--help`

显示帮助。

## 使用提醒

全局参数见 [Global Options](../../concepts/global-options.md)。

**Hidden / Compatibility Options（源码补充，不是普通 help 可见项）**

```text
  -o <REVSETS>；短别名 -r、-d
          与位置父修订参数合并使用；这是隐藏短选项，不等于存在 --onto / --revision / --destination
          长选项。

  --edit
          隐藏的无操作标志；用于与 --no-edit 配对，二者互斥。
```

**注意：** 位置父集合与 -A/-B 互斥；-A 和 -B 可组合。不带插入选项时，实验性的书签自动前进配置可能影响书签。

源码：[cli/src/commands/new.rs](https://github.com/jj-vcs/jj/blob/7c41cdeb16b6b321c64e789a966b6adf723816a5/cli/src/commands/new.rs)。
