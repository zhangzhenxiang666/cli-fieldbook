---
title: Examples / 20 个可组合的查询场景
---

以下场景大部分只演示查询，避免把复杂集合直接交给 destructive 命令。第 14 个包含 `git fetch`，会联网并更新仓库状态，已单独标注。

示例中的 main、feature、origin、src 等名称不保证你的仓库存在；函数筛选到空集合可能是正常结果，不一定是命令失败。引用名、路径、邮箱和固定 ID 都应按仓库实际情况替换。

对即将用于修改操作的表达式，建议先记录并预览：

```sh
REVS='mine() & mutable()'
jj log -r "$REVS"
```

之后再按原工作流手册选择 `rebase`、`squash`、`abandon` 等具体操作。**revset 选中几个提交，不等于操作最终只会创建或重写几个提交对象**；后代重写、书签更新和不可变限制仍由命令决定。两次命令间 `@`、远端引用或仓库视图变化时，动态表达式的结果也可能变化。

**Source / 来源：** [`docs/revsets.md`](https://github.com/jj-vcs/jj/blob/7c41cdeb16b6b321c64e789a966b6adf723816a5/docs/revsets.md) · [`docs/glossary.md`](https://github.com/jj-vcs/jj/blob/7c41cdeb16b6b321c64e789a966b6adf723816a5/docs/glossary.md#rewrite)
