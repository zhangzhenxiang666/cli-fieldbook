---
title: fork_point(x)
identifiers:
  - fork_point
  - fork_point()
---

**查找全部候选的最近公共祖先。**

**Signature / 签名**

```text
fork_point(x)
```

**Arguments / 参数：** x：候选提交集合。

**Returns / 返回：** 共同祖先中不再有其他共同祖先作为后代的那些提交。

**Examples / 示例**

```sh
jj log -r 'fork_point(@ | trunk())'
```

**Notes / 注意：** 复杂合并历史可能得到多个“最近”公共祖先。单个候选返回自身，空集返回空；不是按日期找分叉点。

**Source / 来源：** [Rust 定义](https://github.com/jj-vcs/jj/blob/7c41cdeb16b6b321c64e789a966b6adf723816a5/lib/src/revset.rs#L1013) · [官方函数参考](https://github.com/jj-vcs/jj/blob/7c41cdeb16b6b321c64e789a966b6adf723816a5/docs/revsets.md#functions)
