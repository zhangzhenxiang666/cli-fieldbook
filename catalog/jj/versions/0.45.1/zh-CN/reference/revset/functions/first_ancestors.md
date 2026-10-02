---
title: first_ancestors(x, [depth])
identifiers:
  - first_ancestors
  - first_ancestors()
---

**包含自身，沿第一父链查看祖先。**

**Signature / 签名**

```text
first_ancestors(x, [depth])
```

**Arguments / 参数：** x：来源集合；depth：可选非负整数，省略时不限深度。

**Returns / 返回：** 自身和各层第一父；有限 depth 使用 \[0, depth) 的代数范围。

**Examples / 示例**

```sh
jj log -r 'first_ancestors(@, 10)'
```

**Notes / 注意：** depth=1 仅来源，depth=2 加直接第一父。适合看主线的第一父历史，不代表所有真正参与合并的提交都被显示。

**Source / 来源：** [Rust 定义](https://github.com/jj-vcs/jj/blob/7c41cdeb16b6b321c64e789a966b6adf723816a5/lib/src/revset.rs#L879) · [官方函数参考](https://github.com/jj-vcs/jj/blob/7c41cdeb16b6b321c64e789a966b6adf723816a5/docs/revsets.md#functions)
