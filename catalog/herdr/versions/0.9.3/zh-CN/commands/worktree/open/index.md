---
title: herdr worktree open
command:
  - worktree
  - open
---

## 简介

打开已经存在的 Git worktree。

## 选项

### `--workspace`

从指定 Herdr workspace 解析 Git 仓库。

### `--cwd`

从指定目录解析 Git 仓库；与 --workspace 二选一。

### `--path`

选择现有 worktree 路径；与 --branch 二选一。

### `--branch`

选择现有 worktree 的分支；与 --path 二选一。

### `--label`

设置显示名称；含空格时整体加引号。

### `--focus`

创建后切换焦点到新对象。

### `--no-focus`

创建后不改变当前焦点；不要与 --focus 同时传入。

### `--trust-repository`

仅对本次命令解析到的仓库显式授予信任；不是全局修改 Git 的 safe.directory。

### `--help`

打印该命令的帮助。

## 使用提醒

#### 运行时补充（未完整列入统一帮助）

- `--json`：兼容参数；默认已输出 JSON。

#### 行为与限制

实际解析器要求 --path 或 --branch；不是 create 的另一种拼写。

源码：[S01](https://github.com/herdrdev/herdr/blob/7b116c05bfda646af39d2524c54e70c751f57ee8/src/cli/spec.rs#L6-L966) [S07](https://github.com/herdrdev/herdr/blob/7b116c05bfda646af39d2524c54e70c751f57ee8/src/cli/worktree.rs)
