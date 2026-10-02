---
title: exactly(x, count)
identifiers:
  - exactly
  - exactly()
---

**断言 revset 的结果数量。**

**Signature / 签名**

```text
exactly(x, count)
```

**Arguments / 参数：** x：要验证的集合；count：必填非负整数。

**Returns / 返回：** 数量恰好为 count 时原样返回 x，否则报错。

**Examples / 示例**

```sh
jj log -r 'exactly(bookmarks(exact:"feature"), 1)'
```

**Notes / 注意：** 不是截断，也不是随机挑选。exactly(x, 1) 可保护脚本中的单目标操作；count=0 可断言没有结果。不能写 count=1 这个命名实参。

**Source / 来源：** [Rust 定义](https://github.com/jj-vcs/jj/blob/7c41cdeb16b6b321c64e789a966b6adf723816a5/lib/src/revset.rs#L1028) · [官方函数参考](https://github.com/jj-vcs/jj/blob/7c41cdeb16b6b321c64e789a966b6adf723816a5/docs/revsets.md#functions)
