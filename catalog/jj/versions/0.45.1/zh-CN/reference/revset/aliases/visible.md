---
title: visible()
identifiers:
  - visible()
---

**当前视图的可见历史。**

**Default / 默认定义**

```text
::visible_heads()
```

**Notes / 注意：** 不显式引入隐藏历史时与 all() 相同；引入后 all() 可能更大，因此 visible() 可用于明确限制当前可见提交。

**Source / 来源：** [固定版本默认配置](https://github.com/jj-vcs/jj/blob/7c41cdeb16b6b321c64e789a966b6adf723816a5/cli/src/config/revsets.toml)
