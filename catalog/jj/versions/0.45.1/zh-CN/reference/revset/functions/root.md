---
title: root()
identifiers:
  - root
  - root()
---

**选择所有提交共同的虚拟根。**

**Signature / 签名**

```text
root()
```

**Arguments / 参数：** 无参数。

**Returns / 返回：** 恰好一个虚拟根提交。

**Examples / 示例**

```sh
jj log -r 'root()'
```

**Notes / 注意：** 不是某个项目第一条真实提交；root() 不应被重写。..x 会排除它，::x 会包括它。

**Source / 来源：** [Rust 定义](https://github.com/jj-vcs/jj/blob/7c41cdeb16b6b321c64e789a966b6adf723816a5/lib/src/revset.rs#L927) · [官方函数参考](https://github.com/jj-vcs/jj/blob/7c41cdeb16b6b321c64e789a966b6adf723816a5/docs/revsets.md#functions)
