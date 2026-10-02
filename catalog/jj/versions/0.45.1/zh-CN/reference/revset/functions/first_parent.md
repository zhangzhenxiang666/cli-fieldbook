---
title: first_parent(x, [depth])
identifiers:
  - first_parent
  - first_parent()
---

**每一层只沿第一个父提交前进。**

**Signature / 签名**

```text
first_parent(x, [depth])
```

**Arguments / 参数：** x：来源集合；depth：可选非负整数，默认 1。

**Returns / 返回：** 沿第一父链前进恰好 depth 步后的集合。

**Examples / 示例**

```sh
jj log -r 'first_parent(@, 2)'
```

**Notes / 注意：** 在合并处忽略第二及后续父；depth=0 返回 x。输入有多个提交时仍可能有多个结果。第一父由提交父顺序决定，不是按提交时间挑选。

**Source / 来源：** [Rust 定义](https://github.com/jj-vcs/jj/blob/7c41cdeb16b6b321c64e789a966b6adf723816a5/lib/src/revset.rs#L869) · [官方函数参考](https://github.com/jj-vcs/jj/blob/7c41cdeb16b6b321c64e789a966b6adf723816a5/docs/revsets.md#functions)
