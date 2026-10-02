---
title: herdr workspace close
command:
  - workspace
  - close
---

## 简介

关闭工作区。

## 参数

### `workspace_id`

目标工作区 ID。

## 选项

### `--help`

打印该命令的帮助。

## 使用提醒

#### 运行时补充（未完整列入统一帮助）

- `--group`：实际解析器接受。关闭关联的 workspace 组；放在 workspace_id 之后。

#### 行为与限制

关闭 Herdr 工作区不等于删除 Git checkout。要删除 worktree 使用 worktree remove，并先检查未提交数据。

带关联工作区的主工作区可能要求 --group，避免误关闭整组。

源码：[S01](https://github.com/herdrdev/herdr/blob/7b116c05bfda646af39d2524c54e70c751f57ee8/src/cli/spec.rs#L6-L966) [S06](https://github.com/herdrdev/herdr/blob/7b116c05bfda646af39d2524c54e70c751f57ee8/src/cli/workspace.rs)
