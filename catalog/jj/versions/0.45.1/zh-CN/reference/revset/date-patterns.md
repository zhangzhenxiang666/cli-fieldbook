---
title: Date patterns / 日期边界、时区与可复现查询
---

| 模式            | 边界             |
| ------------- | -------------- |
| `after:"时间"`  | 大于等于给定时刻，包含边界  |
| `before:"时间"` | 严格小于给定时刻，不包含边界 |

支持日期、日期时间、含时区时间和相对时间，如 `"2026-09-01"`、`"2026-09-01T09:00:00+08:00"`、`"2 days ago"`、`"yesterday 10:30"`。无时区值按日期解析上下文处理，通常是本机时区；相对时间也取决于执行时刻。

查询新加坡时间 2026 年 9 月的作者时间：

```sh
jj log -r 'author_date(after:"2026-09-01T00:00:00+08:00") & author_date(before:"2026-10-01T00:00:00+08:00")'
```

这是 `[9 月 1 日 00:00, 10 月 1 日 00:00)` 半开区间，不会在月末最后一毫秒上遗漏或重复。

查询最近两天生成或重写的提交对象：

```sh
jj log -r 'committer_date(after:"2 days ago")'
```

`author_date` 记录最初创作时间，`committer_date` 随提交对象重写而更新。`latest()` 使用后者；不要把最近 rebase 的提交误认为最近才开始编写的提交。

日期模式不是任意字符串 glob，也不要写 `author_date(after:"..." & before:"...")`。区间用两个日期函数的交集表达。

**Source / 来源：** [`docs/revsets.md`](https://github.com/jj-vcs/jj/blob/7c41cdeb16b6b321c64e789a966b6adf723816a5/docs/revsets.md#date-patterns) · [`lib/src/time_util.rs`](https://github.com/jj-vcs/jj/blob/7c41cdeb16b6b321c64e789a966b6adf723816a5/lib/src/time_util.rs#L26-L178) · [`docs/glossary.md`](https://github.com/jj-vcs/jj/blob/7c41cdeb16b6b321c64e789a966b6adf723816a5/docs/glossary.md#committer-date)
