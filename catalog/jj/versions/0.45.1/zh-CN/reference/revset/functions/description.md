---
title: description(pattern)
identifiers:
  - description
  - description()
---

**按完整提交说明筛选。**

**Signature / 签名**

```text
description(pattern)
```

**Arguments / 参数：** pattern：必填字符串模式，默认按 glob 解释。

**Returns / 返回：** 完整 description 匹配模式的提交。

**Examples / 示例**

```sh
jj log -r 'description(substring:"validation")'
```

**Notes / 注意：** 非空说明通常以换行结尾；description(exact:"fix") 不等于只匹配标题 fix。查包含词使用 substring:"fix"；没有说明用 description("")。

**Source / 来源：** [Rust 定义](https://github.com/jj-vcs/jj/blob/7c41cdeb16b6b321c64e789a966b6adf723816a5/lib/src/revset.rs#L1044) · [官方函数参考](https://github.com/jj-vcs/jj/blob/7c41cdeb16b6b321c64e789a966b6adf723816a5/docs/revsets.md#functions)
