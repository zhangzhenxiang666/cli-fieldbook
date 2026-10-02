---
title: merges()
identifiers:
  - merges
  - merges()
---

**选择有多个父提交的合并提交。**

**Signature / 签名**

```text
merges()
```

**Arguments / 参数：** 无参数。

**Returns / 返回：** 父提交数量大于 1 的提交。

**Examples / 示例**

```sh
jj log -r 'merges() & ::@'
```

**Notes / 注意：** 合并提交可以 empty()，也可以 conflicts()；结构与内容状态是不同维度。

**Source / 来源：** [Rust 定义](https://github.com/jj-vcs/jj/blob/7c41cdeb16b6b321c64e789a966b6adf723816a5/lib/src/revset.rs#L1034) · [官方函数参考](https://github.com/jj-vcs/jj/blob/7c41cdeb16b6b321c64e789a966b6adf723816a5/docs/revsets.md#functions)
