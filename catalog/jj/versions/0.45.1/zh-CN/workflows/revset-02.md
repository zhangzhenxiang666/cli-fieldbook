---
title: R02 · 查看当前主线之外的非空改动
uses:
  - "command:"
  - command:log
  - reference:revset/functions/empty
---

**场景：** 只看 @ 已包含而 trunk 尚未包含、且有文件修改的提交。

```sh
jj log -r '(trunk()..@) & ~empty()'
```

**注意：** 主线由 trunk() 的有效配置决定；@ 如果是非空工作提交也会被包括。不是所有仓库里的未发布提交。

**Source / 语法依据：** [官方 revset 参考](https://github.com/jj-vcs/jj/blob/7c41cdeb16b6b321c64e789a966b6adf723816a5/docs/revsets.md)；本例由本手册组合整理。
