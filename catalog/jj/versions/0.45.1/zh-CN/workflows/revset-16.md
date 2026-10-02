---
title: R16 · 找当前工作与主线的共同基点
uses:
  - "command:"
  - command:log
  - reference:revset/functions/fork_point
---

**场景：** 找最近公共祖先，而不是凭时间猜分叉点。

```sh
jj log -r 'fork_point(@ | trunk())'
```

**注意：** 复杂交叉合并历史可能有多个最近公共祖先；要交给单目标命令时先检查，不能直接假定唯一。

**Source / 语法依据：** [官方 revset 参考](https://github.com/jj-vcs/jj/blob/7c41cdeb16b6b321c64e789a966b6adf723816a5/docs/revsets.md)；本例由本手册组合整理。
