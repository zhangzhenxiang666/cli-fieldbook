---
title: jj file chmod
command:
  - file
  - chmod
---

## 简介

设置或移除仓库中文件的可执行位。

## 参数

### `MODE`

n（别名 normal）为不可执行；x（别名 executable）为可执行。不是 chmod 的 755 等模式。

### `FILESETS`

需要改变可执行位的路径。

## 选项

### `--revision`

待修改修订；默认 @。

### `--help`

显示帮助。

## 使用提醒

全局参数见 [Global Options](../../../concepts/global-options.md)。

**注意：** 可作用于任意可重写修订，也支持 Windows 和冲突文件。

源码：[cli/src/commands/file/chmod.rs](https://github.com/jj-vcs/jj/blob/7c41cdeb16b6b321c64e789a966b6adf723816a5/cli/src/commands/file/chmod.rs)。
