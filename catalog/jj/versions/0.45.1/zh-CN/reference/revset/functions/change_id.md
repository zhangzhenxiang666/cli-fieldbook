---
title: change_id(prefix)
identifiers:
  - change_id
  - change_id()
---

**按 change ID 前缀查找提交。**

**Signature / 签名**

```text
change_id(prefix)
```

**Arguments / 参数：** prefix：合法 change ID 的完整值或前缀，不是 glob 模式。

**Returns / 返回：** 匹配该 change 的提交；分歧状态可返回多个版本。

**Examples / 示例**

```sh
jj log -r 'change_id(CHANGE_ID)'  # 将 CHANGE_ID 换成实际 change ID
```

**Notes / 注意：** 前缀对应多个不同 change 时报歧义错误；合法但无匹配的前缀返回空集合。裸 change ID 符号与此函数不同：裸符号不能直接解析为多个分歧版本。

**Source / 来源：** [Rust 定义](https://github.com/jj-vcs/jj/blob/7c41cdeb16b6b321c64e789a966b6adf723816a5/lib/src/revset.rs#L931) · [官方函数参考](https://github.com/jj-vcs/jj/blob/7c41cdeb16b6b321c64e789a966b6adf723816a5/docs/revsets.md#functions)
