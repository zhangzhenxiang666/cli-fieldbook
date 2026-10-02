---
title: connected(x)
identifiers:
  - connected
  - connected()
---

**填补所选提交之间的祖先—后代路径。**

**Signature / 签名**

```text
connected(x)
```

**Arguments / 参数：** x：任意 revset，必填。

**Returns / 返回：** x::x，即同时属于 x 后代和 x 祖先的提交。

**Examples / 示例**

```sh
jj log -r 'connected(trunk() | @)'
```

**Notes / 注意：** 名称容易误导：它不是整张无向图的连通分量，也不会仅因两个提交共享祖先就把公共祖先补进来。

**Source / 来源：** [Rust 定义](https://github.com/jj-vcs/jj/blob/7c41cdeb16b6b321c64e789a966b6adf723816a5/lib/src/revset.rs#L890) · [官方函数参考](https://github.com/jj-vcs/jj/blob/7c41cdeb16b6b321c64e789a966b6adf723816a5/docs/revsets.md#functions)
