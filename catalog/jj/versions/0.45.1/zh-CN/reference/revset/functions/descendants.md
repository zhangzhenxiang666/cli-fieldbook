---
title: descendants(x, [depth])
identifiers:
  - descendants
  - descendants()
---

**取自身及后代，可限定包含多少代。**

**Signature / 签名**

```text
descendants(x, [depth])
```

**Arguments / 参数：** x：来源集合；depth：可选非负整数；省略时不限深度。

**Returns / 返回：** 遍历代数在 \[0, depth) 内的提交；省略 depth 时等价于 x::。

**Examples / 示例**

```sh
jj log -r 'descendants(trunk(), 2)'
```

**Notes / 注意：** depth=0 为空，depth=1 只有 x，depth=2 再包含直接子。搜索范围仍受可见性与显式隐藏提交扩展规则影响。

**Source / 来源：** [Rust 定义](https://github.com/jj-vcs/jj/blob/7c41cdeb16b6b321c64e789a966b6adf723816a5/lib/src/revset.rs#L858) · [官方函数参考](https://github.com/jj-vcs/jj/blob/7c41cdeb16b6b321c64e789a966b6adf723816a5/docs/revsets.md#functions)
