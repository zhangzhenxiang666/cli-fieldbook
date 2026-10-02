---
title: bisect(x)
identifiers:
  - bisect
  - bisect()
---

**从候选集合中挑选大致居中的二分点。**

**Signature / 签名**

```text
bisect(x)
```

**Arguments / 参数：** x：希望缩小定位范围的候选集合。

**Returns / 返回：** 使其后代约占输入集合一半的候选提交。

**Examples / 示例**

```sh
jj log -r 'bisect(trunk()..@)'
```

**Notes / 注意：** 这是选择函数，不会运行测试、移动工作区或记录 good/bad。官方说明其对非线性历史的处理仍有局限；实际自动定位参见 jj bisect run。

**Source / 来源：** [Rust 定义](https://github.com/jj-vcs/jj/blob/7c41cdeb16b6b321c64e789a966b6adf723816a5/lib/src/revset.rs#L1023) · [官方函数参考](https://github.com/jj-vcs/jj/blob/7c41cdeb16b6b321c64e789a966b6adf723816a5/docs/revsets.md#functions)
