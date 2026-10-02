---
title: herdr pane split
command:
  - pane
  - split
---

## 简介

分割窗格并创建新终端。

## 参数

### `PANE_ID`

起点窗格；可用 --pane 或 --current 替代。

## 选项

### `--pane`

显式指定作为操作起点的 pane ID。

### `--current`

使用调用进程环境中的 HERDR_PANE_ID；不是“鼠标正指着的窗格”。

### `--direction`

分割方向：right 在右侧创建，down 在下侧创建。

### `--ratio`

分割比例，由运行时布局校验；不是列数。

### `--cwd`

新进程的工作目录；传入目标机器可访问的路径。

### `--env`

设置启动进程的环境变量；可重复。相同键后值覆盖前值，键不得为空。

### `--right-click`

新窗格右键路由：herdr 或 pane；默认 herdr。

### `--focus`

创建后切换焦点到新对象。

### `--no-focus`

创建后不改变当前焦点；不要与 --focus 同时传入。

### `--help`

打印该命令的帮助。

## 使用提醒

#### 行为与限制

实际调用必须传 --direction right 或 --direction down；统一帮助定义没有标记成 required。

默认不改变焦点。自动化建议显式 --pane ID --direction right --no-focus。

源码：[S01](https://github.com/herdrdev/herdr/blob/7b116c05bfda646af39d2524c54e70c751f57ee8/src/cli/spec.rs#L6-L966) [S04](https://github.com/herdrdev/herdr/blob/7b116c05bfda646af39d2524c54e70c751f57ee8/src/cli/pane.rs)
