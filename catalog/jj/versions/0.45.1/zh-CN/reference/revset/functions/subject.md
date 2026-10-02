---
title: subject(pattern)
identifiers:
  - subject
  - subject()
---

**按说明的第一行筛选。**

**Signature / 签名**

```text
subject(pattern)
```

**Arguments / 参数：** pattern：必填字符串模式，默认 glob。

**Returns / 返回：** 说明第一行（不含换行符）匹配的提交。

**Examples / 示例**

```sh
jj log -r 'subject(glob:"fix:*")'
```

**Notes / 注意：** 适合 Conventional Commits 标题筛选；与 description() 对正文及末尾换行的行为不同。

**Source / 来源：** [Rust 定义](https://github.com/jj-vcs/jj/blob/7c41cdeb16b6b321c64e789a966b6adf723816a5/lib/src/revset.rs#L1050) · [官方函数参考](https://github.com/jj-vcs/jj/blob/7c41cdeb16b6b321c64e789a966b6adf723816a5/docs/revsets.md#functions)
