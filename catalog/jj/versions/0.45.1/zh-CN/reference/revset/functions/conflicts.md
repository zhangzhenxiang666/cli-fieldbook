---
title: conflicts()
identifiers:
  - conflicts
  - conflicts()
---

**选择文件树中带有冲突的提交。**

**Signature / 签名**

```text
conflicts()
```

**Arguments / 参数：** 无参数。

**Returns / 返回：** 存在文件冲突的提交。

**Examples / 示例**

```sh
jj log -r 'conflicts() & mutable()'
```

**Notes / 注意：** 不是书签目标冲突，也不是同一 change 的分歧版本；后者用 divergent()。

**Source / 来源：** [Rust 定义](https://github.com/jj-vcs/jj/blob/7c41cdeb16b6b321c64e789a966b6adf723816a5/lib/src/revset.rs#L1181) · [官方函数参考](https://github.com/jj-vcs/jj/blob/7c41cdeb16b6b321c64e789a966b6adf723816a5/docs/revsets.md#functions)
