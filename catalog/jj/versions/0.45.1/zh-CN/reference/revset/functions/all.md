---
title: all()
identifiers:
  - all
  - all()
---

**返回当前搜索域内的所有提交。**

**Signature / 签名**

```text
all()
```

**Arguments / 参数：** 无参数。

**Returns / 返回：** 当前可见提交，以及在表达式中显式引入的隐藏提交及其祖先等扩展范围。

**Examples / 示例**

```sh
jj log -r 'all()'
```

**Notes / 注意：** 不是对象库中所有历史 commit 的枚举。等价于 ::；与已移除的 all: 修饰符无关。at_operation() 还会扩展搜索域。

**Source / 来源：** [Rust 定义](https://github.com/jj-vcs/jj/blob/7c41cdeb16b6b321c64e789a966b6adf723816a5/lib/src/revset.rs#L905) · [官方函数参考](https://github.com/jj-vcs/jj/blob/7c41cdeb16b6b321c64e789a966b6adf723816a5/docs/revsets.md#functions)
