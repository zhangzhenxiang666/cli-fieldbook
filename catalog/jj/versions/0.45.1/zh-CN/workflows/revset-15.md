---
title: R15 · 总览本地引用与工作区边界
uses:
  - "command:"
  - command:log
  - reference:revset/functions/bookmarks
  - reference:revset/functions/tags
  - reference:revset/functions/working_copies
---

**场景：** 集中查看书签、标签和所有工作副本。

```sh
jj log -r 'bookmarks() | tags() | working_copies()'
```

**注意：** 这里仅选引用目标而不是它们全部祖先；日志可能用 \~ 表示被省略的中间历史。需要祖先闭包时写 ::(bookmarks() | tags() | working_copies())。

**Source / 语法依据：** [官方 revset 参考](https://github.com/jj-vcs/jj/blob/7c41cdeb16b6b321c64e789a966b6adf723816a5/docs/revsets.md)；本例由本手册组合整理。
