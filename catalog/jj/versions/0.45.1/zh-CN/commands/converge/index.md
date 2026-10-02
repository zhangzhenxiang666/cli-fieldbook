---
title: jj converge
command:
  - converge
---

## 简介

把同一 change ID 的多个可见分歧版本收敛成一个版本。

## 选项

### `--revision`

查找分歧版本的范围，可重复；默认 revsets.converge。

### `--no-interactive`

不请求人工协助。无法自动解决时警告并不作修改；不要把退出成功当成所有分歧都已消失。

### `--help`

显示帮助。

## 使用提醒

全局参数见 [Global Options](../../concepts/global-options.md)。

**注意：** 只收敛选中集合内的分歧版本；可能仍留有其他版本。会重定位后代及本地书签，结果仍可能有文件冲突。此命令解决 change 分歧，不等于 resolve 解决文件冲突。

源码：[cli/src/commands/converge.rs](https://github.com/jj-vcs/jj/blob/7c41cdeb16b6b321c64e789a966b6adf723816a5/cli/src/commands/converge.rs)。
