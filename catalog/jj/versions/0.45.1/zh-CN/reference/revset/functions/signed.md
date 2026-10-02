---
title: signed()
identifiers:
  - signed
  - signed()
---

**选择带有密码学签名的提交。**

**Signature / 签名**

```text
signed()
```

**Arguments / 参数：** 无参数。

**Returns / 返回：** 具有签名数据的提交。

**Examples / 示例**

```sh
jj log -r 'signed() & ::@'
```

**Notes / 注意：** 不等于签名已验证、密钥可信或作者身份真实。签名状态需查看签名验证结果。

**Source / 来源：** [Rust 定义](https://github.com/jj-vcs/jj/blob/7c41cdeb16b6b321c64e789a966b6adf723816a5/lib/src/revset.rs#L1083) · [官方函数参考](https://github.com/jj-vcs/jj/blob/7c41cdeb16b6b321c64e789a966b6adf723816a5/docs/revsets.md#functions)
