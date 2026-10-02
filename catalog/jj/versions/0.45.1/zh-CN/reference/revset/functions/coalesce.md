---
title: coalesce(revsets...)
identifiers:
  - coalesce
  - coalesce()
---

**选择第一个非空结果集合。**

**Signature / 签名**

```text
coalesce(revsets...)
```

**Arguments / 参数：** revsets...：零个或多个 revset 实参，按顺序考虑。

**Returns / 返回：** 首个非空集合；全空或没有实参时返回 none()。

**Examples / 示例**

```sh
jj log -r 'coalesce(present(main@origin), present(master@origin), root())'
```

**Notes / 注意：** 并不是未知符号错误的兜底器；各实参必须能被解析和解析引用。可能缺失的名字要各自放进 present()；也不把多个非空集合合并。

**Source / 来源：** [Rust 定义](https://github.com/jj-vcs/jj/blob/7c41cdeb16b6b321c64e789a966b6adf723816a5/lib/src/revset.rs#L1206) · [官方函数参考](https://github.com/jj-vcs/jj/blob/7c41cdeb16b6b321c64e789a966b6adf723816a5/docs/revsets.md#functions)
