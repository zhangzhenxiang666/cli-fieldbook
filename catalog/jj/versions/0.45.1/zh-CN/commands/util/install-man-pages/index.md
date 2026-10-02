---
title: jj util install-man-pages
command:
  - util
  - install-man-pages
---

## 简介

把手册页安装到给定目录。

## 参数

### `PATH`

目标手册根目录，例如 /usr/share/man；程序会追加 man1 等目录。

## 选项

### `--help`

显示帮助。

## 使用提醒

全局参数见 [Global Options](../../../concepts/global-options.md)。

**注意：** 会写入指定路径，系统目录可能需要权限。

源码：[cli/src/commands/util/install_man_pages.rs](https://github.com/jj-vcs/jj/blob/7c41cdeb16b6b321c64e789a966b6adf723816a5/cli/src/commands/util/install_man_pages.rs)。
