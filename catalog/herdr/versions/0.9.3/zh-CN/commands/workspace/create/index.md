---
title: herdr workspace create
command:
  - workspace
  - create
---

## 简介

创建工作区及其初始 tab / pane。

## 选项

### `--cwd`

新进程的工作目录；传入目标机器可访问的路径。

### `--label`

设置显示名称；含空格时整体加引号。

### `--env`

设置启动进程的环境变量；可重复。相同键后值覆盖前值，键不得为空。

### `--focus`

创建后切换焦点到新对象。

### `--no-focus`

创建后不改变当前焦点；不要与 --focus 同时传入。

### `--help`

打印该命令的帮助。

## 使用提醒

#### 行为与限制

默认不抢焦点。

成功 JSON 中可读取 .result.workspace.workspace_id、.result.tab.tab_id、.result.root_pane.pane_id；不要通过名称猜 ID。

源码：[S01](https://github.com/herdrdev/herdr/blob/7b116c05bfda646af39d2524c54e70c751f57ee8/src/cli/spec.rs#L6-L966) [S06](https://github.com/herdrdev/herdr/blob/7b116c05bfda646af39d2524c54e70c751f57ee8/src/cli/workspace.rs)
