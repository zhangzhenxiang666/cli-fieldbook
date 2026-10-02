---
title: herdr pane focus
command:
  - pane
  - focus
---

## 简介

将焦点切到起点窗格某方向的相邻窗格。

## 选项

### `--direction`

方向：left、right、up、down。

### `--pane`

显式指定作为操作起点的 pane ID。

### `--current`

使用调用进程环境中的 HERDR_PANE_ID；不是“鼠标正指着的窗格”。

### `--help`

打印该命令的帮助。

## 使用提醒

#### 行为与限制

\--pane 是方向导航的起点，不是“直接 focus 到这个 ID”的另一种写法。

源码：[S01](https://github.com/herdrdev/herdr/blob/7b116c05bfda646af39d2524c54e70c751f57ee8/src/cli/spec.rs#L6-L966) [S04](https://github.com/herdrdev/herdr/blob/7b116c05bfda646af39d2524c54e70c751f57ee8/src/cli/pane.rs)
