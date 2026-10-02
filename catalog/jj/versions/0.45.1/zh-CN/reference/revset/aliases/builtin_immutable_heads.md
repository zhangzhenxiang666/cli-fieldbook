---
title: builtin_immutable_heads()
identifiers:
  - builtin_immutable_heads()
---

**上游提供的不可变边界默认集合。**

**Default / 默认定义**

```text
trunk() | tags() | untracked_remote_bookmarks() | untracked_remote_tags()
```

**Notes / 注意：** 推荐保留该基准；需要扩展保护范围时覆盖 immutable_heads()，并可引用此基准。未跟踪远端引用默认纳入保护边界。

**Source / 来源：** [固定版本默认配置](https://github.com/jj-vcs/jj/blob/7c41cdeb16b6b321c64e789a966b6adf723816a5/cli/src/config/revsets.toml)
