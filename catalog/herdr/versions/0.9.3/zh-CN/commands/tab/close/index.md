---
title: herdr tab close
command:
  - tab
  - close
---

## 简介

关闭标签页及其窗格。

## 参数

### `tab_id`

标签页 ID，不是可见序号 1、2、3。

## 选项

### `--help`

打印该命令的帮助。

## 使用提醒

#### 行为与限制

关闭操作会影响其中正在运行的终端任务。

源码：[S01](https://github.com/herdrdev/herdr/blob/7b116c05bfda646af39d2524c54e70c751f57ee8/src/cli/spec.rs#L6-L966) [S08](https://github.com/herdrdev/herdr/blob/7b116c05bfda646af39d2524c54e70c751f57ee8/src/cli/tab.rs)
