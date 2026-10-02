---
title: jj git push
command:
  - git
  - push
---

## 简介

把本地书签 / 标签更新推送到一个 Git 远端。

## 选项

### `--remote`

推送目标远端名称；默认 git.push，或唯一远端 / origin。跟踪关系不等于自动决定推送远端。

### `--bookmark`

推送匹配书签；可重复，名称默认 glob；新远端引用会建立跟踪。

### `--tag`

推送匹配标签；可重复，新引用会建立跟踪。

### `--all`

推送所有书签和标签，包括新建引用；谨慎使用。

### `--tracked`

推送已跟踪的书签和标签。

### `--deleted`

只推送已跟踪引用的删除。

### `--allow-empty-description`

允许推送描述为空的提交。

### `--allow-private`

允许推送匹配 git.private-commits 的提交；默认 private revset 为 none()。

### `--allow-conflicts`

允许把冲突提交推送出去；接收端未必能按期望处理。

### `--revision`

推送指向指定修订的引用；可重复；不是凭空为每个修订建立分支。

### `--change`

为指定 change 创建 / 更新自动命名书签并推送；可重复。名称受 templates.git_push_bookmark 控制。

### `--named`

创建 / 更新明确命名的书签并推送；可重复。

### `--dry-run`

显示计划，不实际推送。不要误记为全局选项，也不要假定所有命令都支持它。

### `--option`

向 Git 服务端传递 push option；可重复。

### `--help`

显示帮助。

## 使用提醒

全局参数见 [Global Options](../../../concepts/global-options.md)。

**Hidden / Compatibility Options（源码补充，不是普通 help 可见项）**

```text
  --revisions <REVSETS>
          --revision 的隐藏长别名；不应据此推断所有命令都接受这两个拼写。

  --branch <BOOKMARK>
          --bookmark 的隐藏兼容长别名。
```

**注意：** 默认只选择当前工作相关的已跟踪引用，并不推送所有本地 change。jj 使用预期远端状态检查来保护历史重写，不能照搬 git push --force；先 fetch 再检查差异。--no-integrate-operation 不能替代这里的 --dry-run。 v0.45.1 的实现会直接拒绝全局 --no-integrate-operation。--all 与 --tracked 互斥；显式 -b/-t/-r/-c/--named 选择可互相组合，但不能与 --all、--tracked、--deleted 组合。--deleted 可与 --all 或 --tracked 配合。

源码：[cli/src/commands/git/push.rs](https://github.com/jj-vcs/jj/blob/7c41cdeb16b6b321c64e789a966b6adf723816a5/cli/src/commands/git/push.rs)。
