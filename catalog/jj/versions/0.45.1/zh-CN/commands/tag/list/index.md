---
title: jj tag list
command:
  - tag
  - list
---

## 简介

显示标签与目标。

## 参数

### `NAMES`

标签名模式，默认 glob。

## 选项

### `--all-remotes`

包括所有跟踪和未跟踪远端标签，也显示与本地同步的目标。

### `--remote`

按远端名称模式过滤，可重复；可与 --tracked、--conflicted 组合。

### `--tracked`

只列出已跟踪远端标签，默认不包括本地 Git-tracking 标签。

### `--conflicted`

只列出存在目标冲突的标签。

### `--revision`

只列出本地目标落在所给修订集合中的标签，可重复。

### `--template`

标签输出模板，类型 CommitRef；默认 templates.tag_list。

### `--sort`

排序键，可组合；末尾加 - 表示降序。键：name、author-name、author-email、author-date、committer-name、committer-email、committer-date，及各自的降序形式。默认 ui.tag-list-sort-keys。

### `--help`

显示帮助。

## 使用提醒

全局参数见 [Global Options](../../../concepts/global-options.md)。

**注意：** 默认省略未跟踪的远端标签及与本地同步的远端目标。冲突项用 - / + 表示旧 / 新目标。模板配置 templates.tag_list；排序配置 ui.tag-list-sort-keys。

源码：[cli/src/commands/tag/list.rs](https://github.com/jj-vcs/jj/blob/7c41cdeb16b6b321c64e789a966b6adf723816a5/cli/src/commands/tag/list.rs)。
