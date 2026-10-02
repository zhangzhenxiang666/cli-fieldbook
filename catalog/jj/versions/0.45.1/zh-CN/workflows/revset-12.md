---
title: R12 · 定位 change 分歧
uses:
  - "command:"
  - command:log
  - reference:revset/functions/change_id
  - reference:revset/functions/divergent
---

**场景：** 先查看所有分歧版本，再用 ID 或 offset 指定目标。

```sh
jj log -r 'divergent() & mutable()'
```

**注意：** 之后可用 change_id(实际ID) 查看某个分歧集合；用实际ID/0、实际ID/1 或完整 commit ID 精确定位。不要仅凭新旧顺序自动删除某一版本。

**Source / 语法依据：** [官方 revset 参考](https://github.com/jj-vcs/jj/blob/7c41cdeb16b6b321c64e789a966b6adf723816a5/docs/revsets.md)；本例由本手册组合整理。
