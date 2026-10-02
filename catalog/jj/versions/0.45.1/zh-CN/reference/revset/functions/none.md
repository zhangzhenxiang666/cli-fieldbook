---
title: none()
identifiers:
  - none
  - none()
---

**返回空集合。**

**Signature / 签名**

```text
none()
```

**Arguments / 参数：** 无参数。

**Returns / 返回：** 零个提交。

**Examples / 示例**

```sh
jj log -r 'none()'
```

**Notes / 注意：** 适合作为别名或回退分支。它不是 root()；root() 有一个虚拟提交。

**Source / 来源：** [Rust 定义](https://github.com/jj-vcs/jj/blob/7c41cdeb16b6b321c64e789a966b6adf723816a5/lib/src/revset.rs#L901) · [官方函数参考](https://github.com/jj-vcs/jj/blob/7c41cdeb16b6b321c64e789a966b6adf723816a5/docs/revsets.md#functions)
