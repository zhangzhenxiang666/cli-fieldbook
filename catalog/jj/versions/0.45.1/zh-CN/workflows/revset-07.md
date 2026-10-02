---
title: R07 · 调查最近发生过重写的候选
uses:
  - "command:"
  - command:log
  - reference:revset/functions/committer_date
---

**场景：** 按 committer 时间看近期提交对象。

```sh
jj log -r 'committer_date(after:"2 days ago") & mutable()'
```

**注意：** 它筛选最近生成的对象，不独立证明每条都经历过重写；新提交也会匹配。与 author_date 对照更有意义。

**Source / 语法依据：** [官方 revset 参考](https://github.com/jj-vcs/jj/blob/7c41cdeb16b6b321c64e789a966b6adf723816a5/docs/revsets.md)；本例由本手册组合整理。
