---
title: R19 · 从旧 operation 查看当前已经隐藏的提交
uses:
  - "command:"
  - reference:revset/functions/all
  - reference:revset/functions/at_operation
---

**场景：** 查看上一个操作的历史与当前可见历史的差别。

```sh
jj op log
jj --ignore-working-copy log -r 'hidden() & at_operation(@-, all())'
```

**注意：** 第一个参数 @- 是 operation 的父。并发操作历史可能分叉，@- 也可能无法唯一选择；需要稳定复查时用实际 operation ID 替换。

**Source / 语法依据：** [官方 revset 参考](https://github.com/jj-vcs/jj/blob/7c41cdeb16b6b321c64e789a966b6adf723816a5/docs/revsets.md)；本例由本手册组合整理。
