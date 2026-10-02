---
title: herdr pane input
command:
  - pane
  - input
---

## 简介

设置窗格输入路由。

## 参数

### `PANE_ID`

目标窗格；或用 --pane / --current 明确选择。

## 选项

### `--pane`

显式指定作为操作起点的 pane ID。

### `--current`

使用调用进程环境中的 HERDR_PANE_ID；不是“鼠标正指着的窗格”。

### `--right-click`

必需。herdr 交给 Herdr 菜单；pane 交给窗格内程序的鼠标输入路径。

### `--help`

打印该命令的帮助。

## 使用提醒

#### 行为与限制

实际解析器要求存在目标选择方式；--current 依赖 HERDR_PANE_ID。

pane 右键路由还受窗格内程序是否启用鼠标协议影响。

源码：[S01](https://github.com/herdrdev/herdr/blob/7b116c05bfda646af39d2524c54e70c751f57ee8/src/cli/spec.rs#L6-L966) [S04](https://github.com/herdrdev/herdr/blob/7b116c05bfda646af39d2524c54e70c751f57ee8/src/cli/pane.rs)
