---
title: jj bookmark list
command:
  - bookmark
  - list
---

## 简介

列出书签及其目标。

## 参数

### `NAMES`

按本地书签名称模式过滤，默认 glob。

## 选项

### `--all-remotes`

包括所有跟踪和未跟踪远端书签，也显示与本地同步的目标。

### `--remote`

按远端名称模式过滤，可重复；可与 --tracked、--conflicted 组合。

### `--tracked`

只列出已跟踪远端书签，默认不包括本地 Git-tracking 书签。

### `--conflicted`

只列出存在目标冲突的书签。

### `--revision`

只列出本地目标落在所给修订集合中的书签，可重复。

### `--template`

书签输出模板，类型 CommitRef；默认 templates.bookmark_list。

### `--sort`

排序键，可组合；末尾加 - 表示降序。键：name、author-name、author-email、author-date、committer-name、committer-email、committer-date，及各自的降序形式。默认 ui.bookmark-list-sort-keys。

### `--help`

显示帮助。

## 使用提醒

全局参数见 [Global Options](../../../concepts/global-options.md)。

**注意：** 默认仅在跟踪远端目标与本地不同时附带远端记录；未跟踪远端默认不显示。冲突中 - 是旧目标，+ 是新目标。

源码：[cli/src/commands/bookmark/list.rs](https://github.com/jj-vcs/jj/blob/7c41cdeb16b6b321c64e789a966b6adf723816a5/cli/src/commands/bookmark/list.rs)。
