---
title: mutable()
identifiers:
  - mutable()
---

**查询可变提交集合。**

**Default / 默认定义**

```text
~immutable()
```

**Notes / 注意：** 在当前搜索域内取不可变集合的补集。mutable 不等于尚未 push，也不等于属于当前用户；mine() 与 remote_bookmarks() 是不同维度。不要覆盖此别名来尝试绕过写保护。

**Source / 来源：** [固定版本默认配置](https://github.com/jj-vcs/jj/blob/7c41cdeb16b6b321c64e789a966b6adf723816a5/cli/src/config/revsets.toml)
