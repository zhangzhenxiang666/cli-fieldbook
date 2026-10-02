---
title: herdr pane current
command:
  - pane
  - current
---

## 简介

解析当前窗格。

## 选项

### `--pane`

显式指定作为操作起点的 pane ID。

### `--current`

使用调用进程环境中的 HERDR_PANE_ID；不是“鼠标正指着的窗格”。

### `--help`

打印该命令的帮助。

## 使用提醒

#### 行为与限制

省略显式选择时会使用可用的调用上下文/焦点回退；自动化优先 --pane，避免随用户焦点变化。

源码：[S01](https://github.com/herdrdev/herdr/blob/7b116c05bfda646af39d2524c54e70c751f57ee8/src/cli/spec.rs#L6-L966) [S04](https://github.com/herdrdev/herdr/blob/7b116c05bfda646af39d2524c54e70c751f57ee8/src/cli/pane.rs)
