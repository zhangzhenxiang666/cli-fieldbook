---
title: herdr pane close
command:
  - pane
  - close
---

## 简介

关闭窗格及其终端。

## 参数

### `pane_id`

目标窗格 ID。

## 选项

### `--help`

打印该命令的帮助。

## 使用提醒

#### 行为与限制

会影响正在运行的前台任务；不要误关闭承载当前自动化控制程序的窗格。

源码：[S01](https://github.com/herdrdev/herdr/blob/7b116c05bfda646af39d2524c54e70c751f57ee8/src/cli/spec.rs#L6-L966) [S04](https://github.com/herdrdev/herdr/blob/7b116c05bfda646af39d2524c54e70c751f57ee8/src/cli/pane.rs)
