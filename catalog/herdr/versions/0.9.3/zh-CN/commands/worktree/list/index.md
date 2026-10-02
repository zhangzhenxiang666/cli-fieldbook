---
title: herdr worktree list
command:
  - worktree
  - list
---

## 简介

列出仓库关联的 worktree 工作区。

## 选项

### `--workspace`

从指定 Herdr workspace 解析 Git 仓库。

### `--cwd`

从指定目录解析 Git 仓库；与 --workspace 二选一。

### `--trust-repository`

仅对本次命令解析到的仓库显式授予信任；不是全局修改 Git 的 safe.directory。

### `--help`

打印该命令的帮助。

## 使用提醒

#### 运行时补充（未完整列入统一帮助）

- `--json`：兼容参数：解析器接受，但默认已经是 JSON，不改变输出。

源码：[S01](https://github.com/herdrdev/herdr/blob/7b116c05bfda646af39d2524c54e70c751f57ee8/src/cli/spec.rs#L6-L966) [S07](https://github.com/herdrdev/herdr/blob/7b116c05bfda646af39d2524c54e70c751f57ee8/src/cli/worktree.rs)
