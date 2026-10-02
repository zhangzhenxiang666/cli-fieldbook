---
title: R03 · 查我的可变工作
uses:
  - "command:"
  - command:log
  - reference:revset/functions/mine
---

**场景：** 按 author 邮箱筛出自己的可变提交。

```sh
jj log -r 'mine() & mutable()'
```

**注意：** 先核对 user.email。这里只组合作者身份与不可变策略，不包含“是否已经 push”的判断。

**Source / 语法依据：** [官方 revset 参考](https://github.com/jj-vcs/jj/blob/7c41cdeb16b6b321c64e789a966b6adf723816a5/docs/revsets.md)；本例由本手册组合整理。
