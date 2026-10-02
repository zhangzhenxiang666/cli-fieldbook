---
title: R08 · 查看某个 Rust 模块的变更历史
uses:
  - "command:"
  - command:log
  - reference:revset/functions/files
---

**场景：** 把路径锚定到工作区根，不受当前所在子目录影响。

```sh
jj log -r '::@ & files(root-file:"src/http.rs")'
```

**注意：** src/http.rs 是示例路径。只查询该路径上的变更，不能据此断言已跨所有重命名自动追溯旧名字。

**Source / 语法依据：** [官方 revset 参考](https://github.com/jj-vcs/jj/blob/7c41cdeb16b6b321c64e789a966b6adf723816a5/docs/revsets.md)；本例由本手册组合整理。
