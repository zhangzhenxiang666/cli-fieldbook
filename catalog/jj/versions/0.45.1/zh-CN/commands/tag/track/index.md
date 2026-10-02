---
title: jj tag track
command:
  - tag
  - track
---

## 简介

开始跟踪远端标签。

## 参数

### `TAG@REMOTE`

TAG 是名称模式（默认 glob）；TAG\@REMOTE 精确指定一个远端标签。

## 选项

### `--remote`

限定远端名称模式；可重复；未给则作用于匹配名称的所有远端标签。

### `--help`

显示帮助。

## 使用提醒

全局参数见 [Global Options](../../../concepts/global-options.md)。

**注意：** 跟踪使之后获取的远端变化传播到同名本地标签；停止跟踪不删除服务器标签。

源码：[cli/src/commands/tag/track.rs](https://github.com/jj-vcs/jj/blob/7c41cdeb16b6b321c64e789a966b6adf723816a5/cli/src/commands/tag/track.rs)。
