---
title: Hidden revisions / 可见、隐藏与搜索域
---

通常只搜索当前视图的**可见提交**及其祖先。被重写或 abandon 的旧版本可能仍存在于仓库对象中，但不自动参与普通查询。

显式引用隐藏 commit ID、`change_id/offset`、相关远端符号，或者使用 `at_operation()`，可把对应历史带入搜索范围。隐藏提交的祖先也会参与 `all()`、`~x`、`x..` 等运算。因此这些集合不是脱离表达式上下文的固定全集。

```text
all()        当前表达式的搜索域
visible()    ::visible_heads()，当前视图的可见提交
hidden()     ~visible()，搜索域中不属于当前可见历史的提交
```

`hidden()` 单独查询通常为空，**不等于“列出所有曾经出现过的提交”**。`all()` 也不能用来保证遍历所有旧版本或垃圾回收后已不存在的对象。

下面两组表达式展示“显式引入”和“限定结果”的区别。将 `COMMIT_ID` 换成真实的隐藏提交 ID：

```sh
# 明确查询某个旧对象
jj log -r 'commit_id(COMMIT_ID)'

# 只留下该对象的祖先中目前隐藏的部分
jj log -r 'hidden() & ::commit_id(COMMIT_ID)'

# 在上一个 operation 的视图中看全部当时可见历史
jj --ignore-working-copy log -r 'at_operation(@-, all())'

# 从该操作历史中挑出现在隐藏的提交
jj --ignore-working-copy log -r 'hidden() & at_operation(@-, all())'
```

`at_operation(op, x)` 对搜索域的扩展不局限于 x 的最终结果；它会带入该 operation 当时可见的历史。最终要哪些元素，仍要用交集、差集等明确限制。

**Source / 来源：** [`docs/revsets.md`](https://github.com/jj-vcs/jj/blob/7c41cdeb16b6b321c64e789a966b6adf723816a5/docs/revsets.md#hidden-revisions) · [`docs/glossary.md`](https://github.com/jj-vcs/jj/blob/7c41cdeb16b6b321c64e789a966b6adf723816a5/docs/glossary.md#visible-commits) · [`lib/src/revset.rs`](https://github.com/jj-vcs/jj/blob/7c41cdeb16b6b321c64e789a966b6adf723816a5/lib/src/revset.rs)
