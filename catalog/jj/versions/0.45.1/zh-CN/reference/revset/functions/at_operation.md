---
title: at_operation(op, x)
identifiers:
  - at_operation
  - at_operation()
---

**在指定操作记录的仓库视图中计算 revset。**

**Signature / 签名**

```text
at_operation(op, x)
```

**Arguments / 参数：** op：必填操作 ID 或操作选择表达式（如 @-）；x：在该操作视图中计算的 revset。

**Returns / 返回：** 旧操作视图下 x 的结果，并把该操作可见的历史引入本表达式搜索域。

**Examples / 示例**

```sh
jj --ignore-working-copy log -r 'at_operation(@-, @)'
```

**Notes / 注意：** 第一个参数中的 @- 是上一个 operation，不是工作提交的父；第二个参数中的 @ 才是该视图的工作副本提交。只查询，不等于 op restore。普通命令的自动快照可能新增操作；核对时可用 --ignore-working-copy 或固定 operation ID。

**Source / 来源：** [Rust 定义](https://github.com/jj-vcs/jj/blob/7c41cdeb16b6b321c64e789a966b6adf723816a5/lib/src/revset.rs#L1194) · [官方函数参考](https://github.com/jj-vcs/jj/blob/7c41cdeb16b6b321c64e789a966b6adf723816a5/docs/revsets.md#functions)
