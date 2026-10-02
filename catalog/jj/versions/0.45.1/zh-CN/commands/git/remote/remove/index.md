---
title: jj git remote remove
command:
  - git
  - remote
  - remove
---

## 简介

移除本地远端配置并忘记对应远端引用。

## 参数

### `REMOTE`

要移除的远端名称。

## 选项

### `--help`

显示帮助。

## 使用提醒

全局参数见 [Global Options](../../../../concepts/global-options.md)。

**注意：** 不会删除服务器仓库；与向服务器推送引用删除不是同一件事。

源码：[cli/src/commands/git/remote/remove.rs](https://github.com/jj-vcs/jj/blob/7c41cdeb16b6b321c64e789a966b6adf723816a5/cli/src/commands/git/remote/remove.rs)。
