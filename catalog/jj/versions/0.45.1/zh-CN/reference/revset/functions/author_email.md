---
title: author_email(pattern)
identifiers:
  - author_email
  - author_email()
---

**只匹配作者邮箱。**

**Signature / 签名**

```text
author_email(pattern)
```

**Arguments / 参数：** pattern：必填字符串模式。

**Returns / 返回：** author.email 匹配的提交。

**Examples / 示例**

```sh
jj log -r 'author_email(glob:"*@example.com")'
```

**Notes / 注意：** 可用 exact-i 做忽略大小写的完全匹配；元数据邮箱本身不证明签名可信。

**Source / 来源：** [Rust 定义](https://github.com/jj-vcs/jj/blob/7c41cdeb16b6b321c64e789a966b6adf723816a5/lib/src/revset.rs#L1070) · [官方函数参考](https://github.com/jj-vcs/jj/blob/7c41cdeb16b6b321c64e789a966b6adf723816a5/docs/revsets.md#functions)
