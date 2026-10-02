---
title: commit_id(prefix)
identifiers:
  - commit_id
  - commit_id()
---

**按 commit ID 前缀精确定位提交对象。**

**Signature / 签名**

```text
commit_id(prefix)
```

**Arguments / 参数：** prefix：合法十六进制 commit ID 的完整值或前缀，不是 glob 模式。

**Returns / 返回：** 唯一匹配的提交，或者空集合。

**Examples / 示例**

```sh
jj log -r 'commit_id(COMMIT_ID)'  # 将 COMMIT_ID 换成实际 commit ID
```

**Notes / 注意：** 歧义前缀报错；合法但无匹配的前缀不报“未知符号”。可避免同名标签/书签抢先解析，并可显式引入隐藏提交。

**Source / 来源：** [Rust 定义](https://github.com/jj-vcs/jj/blob/7c41cdeb16b6b321c64e789a966b6adf723816a5/lib/src/revset.rs#L940) · [官方函数参考](https://github.com/jj-vcs/jj/blob/7c41cdeb16b6b321c64e789a966b6adf723816a5/docs/revsets.md#functions)
