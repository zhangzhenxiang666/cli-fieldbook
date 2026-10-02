---
title: R09 · 找出 TODO 是什么时候加进来的
uses:
  - "command:"
  - command:log
  - reference:revset/functions/diff_lines
  - reference:revset/functions/diff_lines_added
---

**场景：** 只搜索 src 下 diff 的新增侧。

```sh
jj log -r '::@ & diff_lines_added(substring:"TODO", root:"src")'
```

**注意：** 已有文件中的未变动 TODO 不会匹配。需要同时看添加与删除，改用 diff_lines()。

**Source / 语法依据：** [官方 revset 参考](https://github.com/jj-vcs/jj/blob/7c41cdeb16b6b321c64e789a966b6adf723816a5/docs/revsets.md)；本例由本手册组合整理。
