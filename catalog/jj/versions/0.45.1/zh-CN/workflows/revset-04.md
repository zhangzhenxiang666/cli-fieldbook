---
title: R04 · 按代数查看历史，而不是按条数
uses:
  - "command:"
  - command:log
  - reference:revset/functions/ancestors
  - reference:revset/functions/first_ancestors
  - reference:revset/functions/latest
---

**场景：** 对比所有父路径与第一父链。

```sh
jj log -r 'ancestors(@, 5)'
jj log -r 'first_ancestors(@, 5)'
```

**注意：** 都包括 @，最多再向前四代。合并图第一条可能远多于五个提交；若只要 committer 时间最新五个，用 latest(::@, 5)。

**Source / 语法依据：** [官方 revset 参考](https://github.com/jj-vcs/jj/blob/7c41cdeb16b6b321c64e789a966b6adf723816a5/docs/revsets.md)；本例由本手册组合整理。
