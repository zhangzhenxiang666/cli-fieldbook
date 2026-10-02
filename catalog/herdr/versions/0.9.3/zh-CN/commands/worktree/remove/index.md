---
title: herdr worktree remove
command:
  - worktree
  - remove
---

## 简介

删除工作区对应的 Git worktree checkout。

## 选项

### `--workspace`

要删除其 checkout 的 Herdr 工作区 ID，必需。

### `--force`

请求强制删除；可能丢失未提交文件，务必先检查与备份。

### `--trust-repository`

仅对本次命令解析到的仓库显式授予信任；不是全局修改 Git 的 safe.directory。

### `--help`

打印该命令的帮助。

## 使用提醒

#### 运行时补充（未完整列入统一帮助）

- `--json`：兼容参数；默认已输出 JSON。

#### 行为与限制

调用 Git 的 worktree 删除语义，不自动等同于删除该分支；与 workspace close 的风险不同。

源码：[S01](https://github.com/herdrdev/herdr/blob/7b116c05bfda646af39d2524c54e70c751f57ee8/src/cli/spec.rs#L6-L966) [S07](https://github.com/herdrdev/herdr/blob/7b116c05bfda646af39d2524c54e70c751f57ee8/src/cli/worktree.rs)
