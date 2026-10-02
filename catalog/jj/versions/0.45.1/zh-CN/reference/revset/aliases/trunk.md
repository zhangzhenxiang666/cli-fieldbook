---
title: trunk()
identifiers:
  - trunk()
---

**主线目标；仓库初始化时通常会写入更具体的覆盖定义。**

**Default / 默认定义**

```text
latest(remote_bookmarks(exact:"main", exact:"origin") | remote_bookmarks(exact:"master", exact:"origin") | remote_bookmarks(exact:"trunk", exact:"origin") | remote_bookmarks(exact:"main", exact:"upstream") | remote_bookmarks(exact:"master", exact:"upstream") | remote_bookmarks(exact:"trunk", exact:"upstream") | root())
```

**Notes / 注意：** 这里只列全局兜底。它对 main/master/trunk 与 origin/upstream 的候选取 committer 时间最新者，不按名字先后决定优先级；无候选时回到 root()。自定义后应始终恰好返回一个提交。

**Source / 来源：** [固定版本默认配置](https://github.com/jj-vcs/jj/blob/7c41cdeb16b6b321c64e789a966b6adf723816a5/cli/src/config/revsets.toml)
