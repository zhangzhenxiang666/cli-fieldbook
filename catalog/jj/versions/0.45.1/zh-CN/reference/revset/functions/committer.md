---
title: committer(pattern)
identifiers:
  - committer
  - committer()
---

**按提交者姓名或邮箱筛选。**

**Signature / 签名**

```text
committer(pattern)
```

**Arguments / 参数：** pattern：必填字符串模式，默认 glob。

**Returns / 返回：** committer_name(pattern) | committer_email(pattern)。

**Examples / 示例**

```sh
jj log -r 'committer(substring-i:"alice")'
```

**Notes / 注意：** committer 记录生成当前提交对象的提交者，与最初 author 可能不同；重写会形成新的提交对象。

**Source / 来源：** [Rust 定义](https://github.com/jj-vcs/jj/blob/7c41cdeb16b6b321c64e789a966b6adf723816a5/lib/src/revset.rs#L1097) · [官方函数参考](https://github.com/jj-vcs/jj/blob/7c41cdeb16b6b321c64e789a966b6adf723816a5/docs/revsets.md#functions)
