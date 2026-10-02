---
title: R14 · 看当前历史相对 origin 已知书签的差集
uses:
  - "command:"
  - command:git
  - command:git/fetch
  - command:log
  - reference:revset/functions/bookmarks
  - reference:revset/functions/remote_bookmarks
---

**场景：** 先更新 origin 的本地记录，再比较祖先闭包。

```sh
jj git fetch --remote origin
jj log -r 'remote_bookmarks(remote="origin")..@'
```

**注意：** fetch 会联网并更新仓库视图；本例不是纯只读查询。差集只依据 origin 书签，不代表远端所有对象或标签完全没有这些提交。

**Source / 语法依据：** [官方 revset 参考](https://github.com/jj-vcs/jj/blob/7c41cdeb16b6b321c64e789a966b6adf723816a5/docs/revsets.md)；本例由本手册组合整理。
