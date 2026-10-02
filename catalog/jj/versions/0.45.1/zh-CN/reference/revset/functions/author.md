---
title: author(pattern)
identifiers:
  - author
  - author()
---

**按原作者的姓名或邮箱筛选。**

**Signature / 签名**

```text
author(pattern)
```

**Arguments / 参数：** pattern：必填字符串模式，默认 glob。

**Returns / 返回：** author_name(pattern) | author_email(pattern)。

**Examples / 示例**

```sh
jj log -r 'author(substring-i:"alice")'
```

**Notes / 注意：** 姓名与邮箱分别匹配，不把它们先拼成 Name `<email>`。多个重写者不改变“按 author 过滤”的含义。

**Source / 来源：** [Rust 定义](https://github.com/jj-vcs/jj/blob/7c41cdeb16b6b321c64e789a966b6adf723816a5/lib/src/revset.rs#L1056) · [官方函数参考](https://github.com/jj-vcs/jj/blob/7c41cdeb16b6b321c64e789a966b6adf723816a5/docs/revsets.md#functions)
