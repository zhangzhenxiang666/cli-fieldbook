---
title: mine()
identifiers:
  - mine
  - mine()
---

**选择作者邮箱等于当前配置邮箱的提交。**

**Signature / 签名**

```text
mine()
```

**Arguments / 参数：** 无参数。

**Returns / 返回：** 等价于 author_email(exact-i:<当前 user.email>)。

**Examples / 示例**

```sh
jj log -r 'mine() & mutable()'
```

**Notes / 注意：** 不是“所有经我 rebase/提交过的内容”，不按 committer 身份判断；实际结果取决于当前 user.email 配置。

**Source / 来源：** [Rust 定义](https://github.com/jj-vcs/jj/blob/7c41cdeb16b6b321c64e789a966b6adf723816a5/lib/src/revset.rs#L1088) · [官方函数参考](https://github.com/jj-vcs/jj/blob/7c41cdeb16b6b321c64e789a966b6adf723816a5/docs/revsets.md#functions)
