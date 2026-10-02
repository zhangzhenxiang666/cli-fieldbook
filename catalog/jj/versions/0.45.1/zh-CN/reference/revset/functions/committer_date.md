---
title: committer_date(pattern)
identifiers:
  - committer_date
  - committer_date()
---

**按提交者时间筛选。**

**Signature / 签名**

```text
committer_date(pattern)
```

**Arguments / 参数：** pattern：必填日期模式 after: 或 before:。

**Returns / 返回：** committer 时间满足边界的提交。

**Examples / 示例**

```sh
jj log -r 'committer_date(after:"2 days ago")'
```

**Notes / 注意：** 这是 latest() 使用的时间维度。相对时间按命令执行时刻和日期上下文解析；需复现时用含时区的绝对时间。

**Source / 来源：** [Rust 定义](https://github.com/jj-vcs/jj/blob/7c41cdeb16b6b321c64e789a966b6adf723816a5/lib/src/revset.rs#L1117) · [官方函数参考](https://github.com/jj-vcs/jj/blob/7c41cdeb16b6b321c64e789a966b6adf723816a5/docs/revsets.md#functions)
