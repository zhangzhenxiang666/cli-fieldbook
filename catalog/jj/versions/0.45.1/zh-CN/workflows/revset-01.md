---
title: R01 · 查看当前所在的可变提交栈
uses:
  - "command:"
  - command:log
  - reference:revset/functions/reachable
---

**场景：** 包含当前工作相关的祖先、后代和域内兄弟分支。

```sh
jj log -r 'reachable(@, mutable())'
```

**注意：** 这是限定域内的双向连通集合；需要只看祖先时改为 ::@ & mutable()。修改命令采用这个集合前先确认没有不想动的兄弟分支。

**Source / 语法依据：** [官方 revset 参考](https://github.com/jj-vcs/jj/blob/7c41cdeb16b6b321c64e789a966b6adf723816a5/docs/revsets.md)；本例由本手册组合整理。
