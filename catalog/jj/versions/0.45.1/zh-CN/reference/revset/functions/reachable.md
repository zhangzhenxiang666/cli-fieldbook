---
title: reachable(srcs, domain)
identifiers:
  - reachable
  - reachable()
---

**在限定集合内，沿父边和子边双向找连通提交。**

**Signature / 签名**

```text
reachable(srcs, domain)
```

**Arguments / 参数：** srcs：起点 revset；domain：允许途经的 revset；均必填。

**Returns / 返回：** 从 srcs 出发且整条路径都在 domain 内的所有提交。

**Examples / 示例**

```sh
jj log -r 'reachable(@, mutable())'
```

**Notes / 注意：** 不在 domain 内的起点被忽略；路径不能穿过域外提交再回来。会包含相关兄弟分支，不等于只取祖先或后代。

**Source / 来源：** [Rust 定义](https://github.com/jj-vcs/jj/blob/7c41cdeb16b6b321c64e789a966b6adf723816a5/lib/src/revset.rs#L895) · [官方函数参考](https://github.com/jj-vcs/jj/blob/7c41cdeb16b6b321c64e789a966b6adf723816a5/docs/revsets.md#functions)
