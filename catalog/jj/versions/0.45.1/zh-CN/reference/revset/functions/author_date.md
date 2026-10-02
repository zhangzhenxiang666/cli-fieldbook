---
title: author_date(pattern)
identifiers:
  - author_date
  - author_date()
---

**按作者时间筛选。**

**Signature / 签名**

```text
author_date(pattern)
```

**Arguments / 参数：** pattern：必填日期模式，仅 after: 或 before:。

**Returns / 返回：** 作者时间满足日期边界的提交。

**Examples / 示例**

```sh
jj log -r 'author_date(after:"2026-09-01T00:00:00+08:00")'
```

**Notes / 注意：** after 为大于等于，before 为严格小于；要限定时间区间，用两个 author_date() 的交集。作者时间不等于重写时间。

**Source / 来源：** [Rust 定义](https://github.com/jj-vcs/jj/blob/7c41cdeb16b6b321c64e789a966b6adf723816a5/lib/src/revset.rs#L1076) · [官方函数参考](https://github.com/jj-vcs/jj/blob/7c41cdeb16b6b321c64e789a966b6adf723816a5/docs/revsets.md#functions)
