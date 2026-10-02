---
title: visible_heads()
identifiers:
  - visible_heads
  - visible_heads()
---

**返回当前视图的可见顶端提交。**

**Signature / 签名**

```text
visible_heads()
```

**Arguments / 参数：** 无参数。

**Returns / 返回：** 可见历史的 heads。

**Examples / 示例**

```sh
jj log -r 'visible_heads()'
```

**Notes / 注意：** 没有引入隐藏提交时等价于 heads(all())；引入隐藏历史后两者不一定相等。别把它理解成所有书签目标。

**Source / 来源：** [Rust 定义](https://github.com/jj-vcs/jj/blob/7c41cdeb16b6b321c64e789a966b6adf723816a5/lib/src/revset.rs#L923) · [官方函数参考](https://github.com/jj-vcs/jj/blob/7c41cdeb16b6b321c64e789a966b6adf723816a5/docs/revsets.md#functions)
