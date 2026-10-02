---
title: diff_contains(text, [files])
identifiers:
  - diff_contains
  - diff_contains()
---

**diff_lines() 的弃用兼容名称。**

> **状态：弃用兼容名；新代码使用 `diff_lines()`。**

**Signature / 签名**

```text
diff_contains(text, [files])
```

**Arguments / 参数：** text、files：与 diff_lines(text, \[files]) 相同。

**Returns / 返回：** 与 diff_lines() 相同。

**Examples / 示例**

```sh
jj log -r 'diff_lines(substring:"TODO", root:"src")'  # 使用新名称
```

**Notes / 注意：** v0.45.1 源码仍注册它，并发出弃用警告；新用法改为 diff_lines()。源码的移除 TODO 不是已移除的证据。

**Source / 来源：** [Rust 定义](https://github.com/jj-vcs/jj/blob/7c41cdeb16b6b321c64e789a966b6adf723816a5/lib/src/revset.rs#L1180) · [官方函数参考](https://github.com/jj-vcs/jj/blob/7c41cdeb16b6b321c64e789a966b6adf723816a5/docs/revsets.md#functions)
