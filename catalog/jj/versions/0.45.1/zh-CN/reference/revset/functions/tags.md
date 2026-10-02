---
title: tags([pattern])
identifiers:
  - tags
  - tags()
---

**选择本地标签指向的提交。**

**Signature / 签名**

```text
tags([pattern])
```

**Arguments / 参数：** pattern：可选标签名字符串模式；省略表示全部标签。

**Returns / 返回：** 匹配标签的目标集合；冲突标签包含其所有可能目标。

**Examples / 示例**

```sh
jj log -r 'tags(glob:"v0.45*")'
```

**Notes / 注意：** 选择的是标签目标提交而非注解标签对象。与 bookmarks() 分开查询，能避开裸符号“标签优先”的名称冲突。

**Source / 来源：** [Rust 定义](https://github.com/jj-vcs/jj/blob/7c41cdeb16b6b321c64e789a966b6adf723816a5/lib/src/revset.rs#L979) · [官方函数参考](https://github.com/jj-vcs/jj/blob/7c41cdeb16b6b321c64e789a966b6adf723816a5/docs/revsets.md#functions)
