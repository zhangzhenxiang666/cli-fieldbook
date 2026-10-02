---
title: parents(x, [depth])
identifiers:
  - parents
  - parents()
---

**取恰好指定代数的父提交。**

**Signature / 签名**

```text
parents(x, [depth])
```

**Arguments / 参数：** x：任意 revset；depth：可选非负整数，默认 1。

**Returns / 返回：** 距离来源恰好 depth 条父边所能到达的提交集合。

**Examples / 示例**

```sh
jj log -r 'parents(@, 2)'
```

**Notes / 注意：** depth=0 返回 x；parents(x, 3) 等价于 x---。合并提交有多个父，结果不保证只有一个；不同长度路径可能到达同一提交。

**Source / 来源：** [Rust 定义](https://github.com/jj-vcs/jj/blob/7c41cdeb16b6b321c64e789a966b6adf723816a5/lib/src/revset.rs#L827) · [官方函数参考](https://github.com/jj-vcs/jj/blob/7c41cdeb16b6b321c64e789a966b6adf723816a5/docs/revsets.md#functions)
