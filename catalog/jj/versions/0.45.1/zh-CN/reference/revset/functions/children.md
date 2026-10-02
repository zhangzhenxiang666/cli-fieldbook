---
title: children(x, [depth])
identifiers:
  - children
  - children()
---

**取恰好指定代数的子提交。**

**Signature / 签名**

```text
children(x, [depth])
```

**Arguments / 参数：** x：来源集合；depth：可选非负整数，默认 1。

**Returns / 返回：** 距离来源恰好 depth 条子边所能到达的集合。

**Examples / 示例**

```sh
jj log -r 'children(@-, 1)'
```

**Notes / 注意：** depth=0 返回 x；children(x, 3) 等价于 x+++。不是“向后查看任意三代”，也不保证只有一个子提交。

**Source / 来源：** [Rust 定义](https://github.com/jj-vcs/jj/blob/7c41cdeb16b6b321c64e789a966b6adf723816a5/lib/src/revset.rs#L837) · [官方函数参考](https://github.com/jj-vcs/jj/blob/7c41cdeb16b6b321c64e789a966b6adf723816a5/docs/revsets.md#functions)
