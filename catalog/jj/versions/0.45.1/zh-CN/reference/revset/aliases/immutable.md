---
title: immutable()
identifiers:
  - immutable()
---

**查询按默认规则应视为不可变的集合。**

**Default / 默认定义**

```text
::(immutable_heads() | root())
```

**Notes / 注意：** 不要覆盖它来改变写保护；只改查询别名不会改变 jj 内部真正的不可变检查。要改保护策略，用 immutable_heads()。root() 不能作为普通提交重写。

**Source / 来源：** [固定版本默认配置](https://github.com/jj-vcs/jj/blob/7c41cdeb16b6b321c64e789a966b6adf723816a5/cli/src/config/revsets.toml)
