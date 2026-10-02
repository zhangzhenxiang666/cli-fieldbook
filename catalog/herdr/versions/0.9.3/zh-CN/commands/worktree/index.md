---
title: herdr worktree
command:
  - worktree
---

## 简介

管理基于 Git worktree 的工作区。

## 选项

### `--help`

打印该命令的帮助。

## 使用提醒

#### 行为与限制

这里是真正的 Git worktree，不是 jj workspace。所有子命令默认输出 JSON。

源码：[S01](https://github.com/herdrdev/herdr/blob/7b116c05bfda646af39d2524c54e70c751f57ee8/src/cli/spec.rs#L6-L966) [S07](https://github.com/herdrdev/herdr/blob/7b116c05bfda646af39d2524c54e70c751f57ee8/src/cli/worktree.rs)
