---
title: bookmarks([pattern])
identifiers:
  - bookmarks
  - bookmarks()
---

**选择本地书签指向的提交。**

**Signature / 签名**

```text
bookmarks([pattern])
```

**Arguments / 参数：** pattern：可选字符串模式，默认匹配全部本地书签名。

**Returns / 返回：** 匹配书签的目标集合；冲突书签包含其所有可能目标。

**Examples / 示例**

```sh
jj log -r 'bookmarks(glob:"feature/*")'
```

**Notes / 注意：** 返回提交，不返回书签名字。多个书签指向同一提交会去重。不会自动包含其祖先；需要 ::bookmarks() 时应显式加祖先运算符。

**Source / 来源：** [Rust 定义](https://github.com/jj-vcs/jj/blob/7c41cdeb16b6b321c64e789a966b6adf723816a5/lib/src/revset.rs#L949) · [官方函数参考](https://github.com/jj-vcs/jj/blob/7c41cdeb16b6b321c64e789a966b6adf723816a5/docs/revsets.md#functions)
