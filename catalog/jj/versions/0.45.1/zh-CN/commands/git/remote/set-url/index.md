---
title: jj git remote set-url
command:
  - git
  - remote
  - set-url
---

## 简介

修改远端的获取 / 推送地址。

## 参数

### `REMOTE`

远端名称。

### `URL`

新的获取地址，是 --fetch 的便捷写法。

## 选项

### `--push`

设置推送 URL。

### `--fetch`

设置获取 URL。

### `--help`

显示帮助。

## 使用提醒

全局参数见 [Global Options](../../../../concepts/global-options.md)。

源码：[cli/src/commands/git/remote/set_url.rs](https://github.com/jj-vcs/jj/blob/7c41cdeb16b6b321c64e789a966b6adf723816a5/cli/src/commands/git/remote/set_url.rs)。
