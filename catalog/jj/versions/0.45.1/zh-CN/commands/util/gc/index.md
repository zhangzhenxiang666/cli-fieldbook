---
title: jj util gc
command:
  - util
  - gc
---

## 简介

执行后端垃圾回收。

## 选项

### `--expire`

过期阈值；v0.45.1 唯一可显式传入的值为 now。省略时保留最近两周的过时对象 / 操作。

### `--help`

显示帮助。

## 使用提醒

全局参数见 [Global Options](../../../concepts/global-options.md)。

**注意：** 高风险：通常只有先 op abandon 才能回收旧操作引用的对象。op abandon 与 gc 组合会缩短甚至消除找回误操作的机会。

源码：[cli/src/commands/util/gc.rs](https://github.com/jj-vcs/jj/blob/7c41cdeb16b6b321c64e789a966b6adf723816a5/cli/src/commands/util/gc.rs)。
