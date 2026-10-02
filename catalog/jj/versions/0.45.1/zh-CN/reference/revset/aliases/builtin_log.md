---
title: builtin_log()
identifiers:
  - builtin_log()
---

**默认日志筛选逻辑。**

**Default / 默认定义**

```text
present(@) | ancestors(immutable_heads().., 2) | trunk()
```

**Notes / 注意：** 它是 \[revsets].log 的默认值来源；ancestors(..., 2) 表示集合自身加一代祖先，不是只显示两个提交。jj log 显式传 -r 或路径时不能一概假定仍套此默认。

**Source / 来源：** [固定版本默认配置](https://github.com/jj-vcs/jj/blob/7c41cdeb16b6b321c64e789a966b6adf723816a5/cli/src/config/revsets.toml)
