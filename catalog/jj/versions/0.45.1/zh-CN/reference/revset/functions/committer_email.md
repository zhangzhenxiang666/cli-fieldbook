---
title: committer_email(pattern)
identifiers:
  - committer_email
  - committer_email()
---

**只匹配提交者邮箱。**

**Signature / 签名**

```text
committer_email(pattern)
```

**Arguments / 参数：** pattern：必填字符串模式。

**Returns / 返回：** committer.email 匹配的提交。

**Examples / 示例**

```sh
jj log -r 'committer_email(glob:"*@example.com")'
```

**Notes / 注意：** 适合调查由特定账号或自动化系统生成的提交对象，不保证它们的作者也是该账号。

**Source / 来源：** [Rust 定义](https://github.com/jj-vcs/jj/blob/7c41cdeb16b6b321c64e789a966b6adf723816a5/lib/src/revset.rs#L1111) · [官方函数参考](https://github.com/jj-vcs/jj/blob/7c41cdeb16b6b321c64e789a966b6adf723816a5/docs/revsets.md#functions)
