---
title: jj git fetch
command:
  - git
  - fetch
---

## 简介

获取远端 Git 引用与对象，并导入 jj。

## 选项

### `--branch`

要获取的分支模式；可重复；有限 Git glob，不等于完整 revset。

### `--tag`

要获取的标签模式；可重复。

### `--tracked`

只获取已经跟踪的书签和标签。

### `--remote`

从匹配名称的远端获取；可重复；远端名默认支持 glob。

### `--all-remotes`

从所有已配置远端获取。

### `--help`

显示帮助。

## 使用提醒

全局参数见 [Global Options](../../../concepts/global-options.md)。

**注意：** 未指定远端时读取 git.fetch，或使用唯一远端 / origin。默认分支和标签筛选受 remotes.`<name>` 配置与 Git refspec 影响。fetch 不会自动把你的开发变更 rebase 到最新主干；引用失去可达性后是否 abandon 受 git.abandon-unreachable-commits 控制。

源码：[cli/src/commands/git/fetch.rs](https://github.com/jj-vcs/jj/blob/7c41cdeb16b6b321c64e789a966b6adf723816a5/cli/src/commands/git/fetch.rs)。
