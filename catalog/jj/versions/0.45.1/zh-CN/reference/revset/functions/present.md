---
title: present(x)
identifiers:
  - present
  - present()
---

**把缺失的提交符号转为空集合。**

**Signature / 签名**

```text
present(x)
```

**Arguments / 参数：** x：要解析的 revset。

**Returns / 返回：** 正常时返回 x；x 中出现无法找到的提交符号时整个表达式结果为空。

**Examples / 示例**

```sh
jj log -r 'present(main@origin) | present(master@origin)'
```

**Notes / 注意：** 不是通用 try/catch：语法错误、歧义等仍会失败。present(main | missing) 会整体为空，不是保留 main；分别容错应写 present(main) | present(missing)。

**Source / 来源：** [Rust 定义](https://github.com/jj-vcs/jj/blob/7c41cdeb16b6b321c64e789a966b6adf723816a5/lib/src/revset.rs#L1189) · [官方函数参考](https://github.com/jj-vcs/jj/blob/7c41cdeb16b6b321c64e789a966b6adf723816a5/docs/revsets.md#functions)
