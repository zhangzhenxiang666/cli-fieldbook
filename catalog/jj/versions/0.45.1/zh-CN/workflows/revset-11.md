---
title: R11 · 只查看当前可变历史里的文件冲突
uses:
  - "command:"
  - command:bookmark
  - command:log
  - reference:revset/functions/conflicts
---

**场景：** 排除不相关的不可变历史。

```sh
jj log -r 'conflicts() & mutable()'
```

**注意：** 结果反映文件树冲突，不反映书签目标冲突；后者查看 jj bookmark list。可变范围内有冲突的后代也可能被选入。

**Source / 语法依据：** [官方 revset 参考](https://github.com/jj-vcs/jj/blob/7c41cdeb16b6b321c64e789a966b6adf723816a5/docs/revsets.md)；本例由本手册组合整理。
