---
title: forks()
identifiers:
  - forks
  - forks()
---

**选择有多个子提交的分叉点。**

**Signature / 签名**

```text
forks()
```

**Arguments / 参数：** 无参数。

**Returns / 返回：** 子提交数量大于 1 的提交。

**Examples / 示例**

```sh
jj log -r 'forks() & mutable()'
```

**Notes / 注意：** 这是结构过滤器，不等于 fork_point(x)，也不等于托管平台上的 fork 仓库。

**Source / 来源：** [Rust 定义](https://github.com/jj-vcs/jj/blob/7c41cdeb16b6b321c64e789a966b6adf723816a5/lib/src/revset.rs#L1040) · [官方函数参考](https://github.com/jj-vcs/jj/blob/7c41cdeb16b6b321c64e789a966b6adf723816a5/docs/revsets.md#functions)
