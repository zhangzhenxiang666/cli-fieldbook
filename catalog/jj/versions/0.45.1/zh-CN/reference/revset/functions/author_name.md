---
title: author_name(pattern)
identifiers:
  - author_name
  - author_name()
---

**只匹配作者姓名。**

**Signature / 签名**

```text
author_name(pattern)
```

**Arguments / 参数：** pattern：必填字符串模式。

**Returns / 返回：** author.name 匹配的提交。

**Examples / 示例**

```sh
jj log -r 'author_name(exact:"Alice Example")'
```

**Notes / 注意：** 默认 glob，不默认做子串匹配；同名作者不是可靠的身份认证。

**Source / 来源：** [Rust 定义](https://github.com/jj-vcs/jj/blob/7c41cdeb16b6b321c64e789a966b6adf723816a5/lib/src/revset.rs#L1064) · [官方函数参考](https://github.com/jj-vcs/jj/blob/7c41cdeb16b6b321c64e789a966b6adf723816a5/docs/revsets.md#functions)
