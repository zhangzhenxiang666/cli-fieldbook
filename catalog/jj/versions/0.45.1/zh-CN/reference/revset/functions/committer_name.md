---
title: committer_name(pattern)
identifiers:
  - committer_name
  - committer_name()
---

**只匹配提交者姓名。**

**Signature / 签名**

```text
committer_name(pattern)
```

**Arguments / 参数：** pattern：必填字符串模式。

**Returns / 返回：** committer.name 匹配的提交。

**Examples / 示例**

```sh
jj log -r 'committer_name(exact:"Alice Example")'
```

**Notes / 注意：** 不要与 author_name() 混用；默认 glob。

**Source / 来源：** [Rust 定义](https://github.com/jj-vcs/jj/blob/7c41cdeb16b6b321c64e789a966b6adf723816a5/lib/src/revset.rs#L1105) · [官方函数参考](https://github.com/jj-vcs/jj/blob/7c41cdeb16b6b321c64e789a966b6adf723816a5/docs/revsets.md#functions)
