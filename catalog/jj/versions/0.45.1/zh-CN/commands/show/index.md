---
title: jj show
command:
  - show
---

## 简介

显示修订的元数据和相对父树的补丁。

## 参数

### `REVSETS`

要查看的修订；默认 @；也可用隐藏 -r。

## 选项

### `--reversed`

较早修订优先。

### `--template`

元数据模板。

### `--no-patch`

不显示补丁。

### `--help`

显示帮助。

## 使用提醒

全局参数见 [Global Options](../../concepts/global-options.md)。

**Hidden / Compatibility Options（源码补充，不是普通 help 可见项）**

```text
  -r <REVISION>
          位置修订参数的隐藏短选项形式；不能据此使用 --revision。
```

**注意：** 本命令还支持 -w = --ignore-all-space、-b = --ignore-space-change。

源码：[cli/src/commands/show.rs](https://github.com/jj-vcs/jj/blob/7c41cdeb16b6b321c64e789a966b6adf723816a5/cli/src/commands/show.rs)。
