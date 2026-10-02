---
title: ancestors(x, [depth])
identifiers:
  - ancestors
  - ancestors()
---

**取自身及祖先，可限定包含多少代。**

**Signature / 签名**

```text
ancestors(x, [depth])
```

**Arguments / 参数：** x：来源集合；depth：可选非负整数；省略时沿所有父边不限深度。

**Returns / 返回：** 遍历代数落在 0 <= generation < depth 内的提交；省略 depth 时返回 ::x。

**Examples / 示例**

```sh
jj log -r 'ancestors(@, 5)'
```

**Notes / 注意：** 与 parents 的计数方式不同：ancestors(x, 0) 为空；depth=1 只有 x；depth=2 包含 x 和直接父。合并历史每代可有多个提交。

**Source / 来源：** [Rust 定义](https://github.com/jj-vcs/jj/blob/7c41cdeb16b6b321c64e789a966b6adf723816a5/lib/src/revset.rs#L847) · [官方函数参考](https://github.com/jj-vcs/jj/blob/7c41cdeb16b6b321c64e789a966b6adf723816a5/docs/revsets.md#functions)
