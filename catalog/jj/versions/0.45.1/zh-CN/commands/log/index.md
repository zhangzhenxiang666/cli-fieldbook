---
title: jj log
command:
  - log
---

## 简介

显示提交图。

## 参数

### `FILESETS`

按路径变化筛选历史。

## 选项

### `--revision`

要显示的修订集合；无路径筛选时默认读取 revsets.log。

### `--limit`

最多显示多少个修订。

### `--reversed`

反转显示顺序。

### `--no-graph`

不显示图形连线。

### `--template`

提交输出模板，默认 templates.log。

### `--patch`

同时显示每个修订的补丁。

### `--count`

输出匹配修订的数量。

### `--help`

显示帮助。

## 使用提醒

全局参数见 [Global Options](../../concepts/global-options.md)。

**Hidden / Compatibility Options（源码补充，不是普通 help 可见项）**

```text
  --revisions <REVSETS>
          --revision 的隐藏长别名；不应据此推断所有命令都接受这两个拼写。
```

**注意：** 仅给路径、未给 -r 时，会从 all() 中筛选修改这些路径的修订，而不是继续采用 revsets.log。--count 与图形/补丁/反转/模板及差异格式选项互斥。

源码：[cli/src/commands/log.rs](https://github.com/jj-vcs/jj/blob/7c41cdeb16b6b321c64e789a966b6adf723816a5/cli/src/commands/log.rs)。
