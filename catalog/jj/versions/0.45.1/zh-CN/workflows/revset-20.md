---
title: R20 · 给脚本的单目标加数量断言
uses:
  - "command:"
  - command:log
  - reference:revset/functions/bookmarks
  - reference:revset/functions/exactly
  - reference:revset/functions/latest
---

**场景：** 不让一个本应单目标的查询悄悄变成多个目标或空。

```sh
jj log -r 'exactly(bookmarks(exact:"feature"), 1)'
```

**注意：** 示例要求本地 feature 书签存在且只有一个目标；否则故意报错。这比 latest(..., 1) 安全，因为后者会掩盖多目标事实。

**Source / 语法依据：** [官方 revset 参考](https://github.com/jj-vcs/jj/blob/7c41cdeb16b6b321c64e789a966b6adf723816a5/docs/revsets.md)；本例由本手册组合整理。
