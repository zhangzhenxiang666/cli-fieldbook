---
title: latest(x, [count])
identifiers:
  - latest
  - latest()
---

**按 committer 时间取最新的若干提交。**

**Signature / 签名**

```text
latest(x, [count])
```

**Arguments / 参数：** x：候选 revset；count：可选非负整数，默认 1。

**Returns / 返回：** 最多 count 个提交；候选不足时返回实际数量。

**Examples / 示例**

```sh
jj log -r 'latest(mine(), 5)'
```

**Notes / 注意：** 不是 author 时间，也不等于拓扑 heads；重写后 committer 时间可能改变。count=0 为空；不能用它代替 exactly() 验证唯一性。

**Source / 来源：** [Rust 定义](https://github.com/jj-vcs/jj/blob/7c41cdeb16b6b321c64e789a966b6adf723816a5/lib/src/revset.rs#L1003) · [官方函数参考](https://github.com/jj-vcs/jj/blob/7c41cdeb16b6b321c64e789a966b6adf723816a5/docs/revsets.md#functions)
