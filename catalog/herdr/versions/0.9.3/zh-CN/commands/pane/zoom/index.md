---
title: herdr pane zoom
command:
  - pane
  - zoom
---

## 简介

切换或设置窗格放大状态。

## 参数

### `PANE_ID`

可选窗格 ID；也可用 --pane 或 --current 选择。

## 选项

### `--pane`

显式指定作为操作起点的 pane ID。

### `--current`

使用调用进程环境中的 HERDR_PANE_ID；不是“鼠标正指着的窗格”。

### `--toggle`

反转放大状态；未传模式时的默认行为。

### `--on`

设为放大。

### `--off`

取消放大。

### `--help`

打印该命令的帮助。

## 使用提醒

#### 行为与限制

\--toggle、--on、--off 互斥；不要混合目标选择方式。

源码：[S01](https://github.com/herdrdev/herdr/blob/7b116c05bfda646af39d2524c54e70c751f57ee8/src/cli/spec.rs#L6-L966) [S04](https://github.com/herdrdev/herdr/blob/7b116c05bfda646af39d2524c54e70c751f57ee8/src/cli/pane.rs)
