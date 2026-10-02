---
title: jj config gc
command:
  - config
  - gc
---

## 简介

找出并可选择删除仓库路径已不存在的仓库级配置目录。

## 选项

### `--help`

显示帮助。

## 使用提醒

全局参数见 [Global Options](../../../concepts/global-options.md)。

**注意：** 涉及配置目录清理；执行前阅读交互提示，不等于仓库对象的 util gc。

源码：[cli/src/commands/config/gc.rs](https://github.com/jj-vcs/jj/blob/7c41cdeb16b6b321c64e789a966b6adf723816a5/cli/src/commands/config/gc.rs)。
