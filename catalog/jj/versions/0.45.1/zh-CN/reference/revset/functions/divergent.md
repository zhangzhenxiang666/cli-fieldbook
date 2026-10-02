---
title: divergent()
identifiers:
  - divergent
  - divergent()
---

**选择属于分歧 change 的可见提交。**

**Signature / 签名**

```text
divergent()
```

**Arguments / 参数：** 无参数。

**Returns / 返回：** 同一 change ID 有多个可见提交版本时的相关提交。

**Examples / 示例**

```sh
jj log -r 'divergent() & mutable()'
```

**Notes / 注意：** 与文件冲突独立。裸 change ID 可能无法唯一解析；用 change_id(prefix) 取集合，用具体 commit ID 或 change offset 定位版本。

**Source / 来源：** [Rust 定义](https://github.com/jj-vcs/jj/blob/7c41cdeb16b6b321c64e789a966b6adf723816a5/lib/src/revset.rs#L1185) · [官方函数参考](https://github.com/jj-vcs/jj/blob/7c41cdeb16b6b321c64e789a966b6adf723816a5/docs/revsets.md#functions)
