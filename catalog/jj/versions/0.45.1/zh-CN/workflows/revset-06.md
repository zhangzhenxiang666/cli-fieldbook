---
title: R06 · 限定一个明确的作者时间区间
uses:
  - "command:"
  - command:log
  - reference:revset/functions/author_date
---

**场景：** 查询 +08:00 时区 2026 年 9 月的作者时间。

```sh
jj log -r 'author_date(after:"2026-09-01T00:00:00+08:00") & author_date(before:"2026-10-01T00:00:00+08:00")'
```

**注意：** after 包含下界，before 排除上界。复现报告时优先使用这种绝对边界，不用随执行时间变化的 yesterday。

**Source / 语法依据：** [官方 revset 参考](https://github.com/jj-vcs/jj/blob/7c41cdeb16b6b321c64e789a966b6adf723816a5/docs/revsets.md)；本例由本手册组合整理。
