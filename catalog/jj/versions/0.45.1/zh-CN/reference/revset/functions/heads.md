---
title: heads(x)
identifiers:
  - heads
  - heads()
---

**保留集合内没有其他所选后代的提交。**

**Signature / 签名**

```text
heads(x)
```

**Arguments / 参数：** x：待筛选的 revset。

**Returns / 返回：** x 中不属于 x 内其他提交的严格祖先的元素。

**Examples / 示例**

```sh
jj log -r 'heads(mine() & mutable())'
```

**Notes / 注意：** 考察完整祖先关系，哪怕中间提交不在 x 中。不是仅检查直接子是否在 x；也不是按时间取最新。

**Source / 来源：** [Rust 定义](https://github.com/jj-vcs/jj/blob/7c41cdeb16b6b321c64e789a966b6adf723816a5/lib/src/revset.rs#L913) · [官方函数参考](https://github.com/jj-vcs/jj/blob/7c41cdeb16b6b321c64e789a966b6adf723816a5/docs/revsets.md#functions)
