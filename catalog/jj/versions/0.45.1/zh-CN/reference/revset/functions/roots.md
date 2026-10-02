---
title: roots(x)
identifiers:
  - roots
  - roots()
---

**保留集合内没有其他所选祖先的提交。**

**Signature / 签名**

```text
roots(x)
```

**Arguments / 参数：** x：待筛选的 revset。

**Returns / 返回：** x 中不属于 x 内其他提交的严格后代的元素。

**Examples / 示例**

```sh
jj log -r 'roots(trunk()..@)'
```

**Notes / 注意：** 考察完整祖先关系；roots(x) 与 root() 完全不同，前者可能有多个结果或为空。

**Source / 来源：** [Rust 定义](https://github.com/jj-vcs/jj/blob/7c41cdeb16b6b321c64e789a966b6adf723816a5/lib/src/revset.rs#L918) · [官方函数参考](https://github.com/jj-vcs/jj/blob/7c41cdeb16b6b321c64e789a966b6adf723816a5/docs/revsets.md#functions)
