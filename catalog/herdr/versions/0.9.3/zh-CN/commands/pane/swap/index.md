---
title: herdr pane swap
command:
  - pane
  - swap
---

## 简介

交换两个窗格的位置。

## 选项

### `--direction`

方向：left、right、up、down。

### `--pane`

显式指定作为操作起点的 pane ID。

### `--current`

使用调用进程环境中的 HERDR_PANE_ID；不是“鼠标正指着的窗格”。

### `--source-pane`

显式交换的源窗格 ID。

### `--target-pane`

显式交换的目标窗格 ID。

### `--help`

打印该命令的帮助。

## 使用提醒

#### 行为与限制

形式一：--direction left/right/up/down，加起点 --pane/--current。

形式二：--source-pane ID --target-pane ID。两种形式不要混用。

源码：[S01](https://github.com/herdrdev/herdr/blob/7b116c05bfda646af39d2524c54e70c751f57ee8/src/cli/spec.rs#L6-L966) [S04](https://github.com/herdrdev/herdr/blob/7b116c05bfda646af39d2524c54e70c751f57ee8/src/cli/pane.rs)
