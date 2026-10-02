---
title: empty()
identifiers:
  - empty
  - empty()
---

**选择没有文件改动的提交。**

**Signature / 签名**

```text
empty()
```

**Arguments / 参数：** 无参数。

**Returns / 返回：** 相对父提交合并基准没有文件变化的提交。

**Examples / 示例**

```sh
jj log -r 'empty() & mutable()'
```

**Notes / 注意：** 包括虚拟 root()，以及没有用户修改的自动合并提交。不是“没有提交说明”，后者是 description("")；也不等于没有子提交。

**Source / 来源：** [Rust 定义](https://github.com/jj-vcs/jj/blob/7c41cdeb16b6b321c64e789a966b6adf723816a5/lib/src/revset.rs#L1124) · [官方函数参考](https://github.com/jj-vcs/jj/blob/7c41cdeb16b6b321c64e789a966b6adf723816a5/docs/revsets.md#functions)
