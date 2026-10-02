---
title: merge_point(x)
identifiers:
  - merge_point
  - merge_point()
---

**查找全部候选的最早公共后代。**

**Signature / 签名**

```text
merge_point(x)
```

**Arguments / 参数：** x：候选提交集合。

**Returns / 返回：** 共同后代中不再有其他共同后代作为祖先的那些提交。

**Examples / 示例**

```sh
jj log -r 'merge_point(bookmarks("feature/a") | bookmarks("feature/b"))'
```

**Notes / 注意：** 单个候选返回自身；可能没有共同后代，也可能有多个最小公共后代。不是“找所有 merge commit”。

**Source / 来源：** [Rust 定义](https://github.com/jj-vcs/jj/blob/7c41cdeb16b6b321c64e789a966b6adf723816a5/lib/src/revset.rs#L1018) · [官方函数参考](https://github.com/jj-vcs/jj/blob/7c41cdeb16b6b321c64e789a966b6adf723816a5/docs/revsets.md#functions)
