---
title: working_copies()
identifiers:
  - working_copies
  - working_copies()
---

**选择仓库所有工作区的工作副本提交。**

**Signature / 签名**

```text
working_copies()
```

**Arguments / 参数：** 无参数。

**Returns / 返回：** 当前仓库各 workspace 记录的工作副本目标集合。

**Examples / 示例**

```sh
jj log -r 'working_copies()'
```

**Notes / 注意：** 与只选当前工作区的 @ 不同。读取其他工作区记录不会替它们扫描和快照未保存到仓库视图的磁盘改动。

**Source / 来源：** [Rust 定义](https://github.com/jj-vcs/jj/blob/7c41cdeb16b6b321c64e789a966b6adf723816a5/lib/src/revset.rs#L909) · [官方函数参考](https://github.com/jj-vcs/jj/blob/7c41cdeb16b6b321c64e789a966b6adf723816a5/docs/revsets.md#functions)
