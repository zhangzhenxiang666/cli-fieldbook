---
title: herdr pane rename
command:
  - pane
  - rename
---

## 简介

设置或清除窗格显示名。

## 参数

### `PANE_ID`

目标窗格 ID。

### `LABEL`

名称；实际调用需提供名称或 --clear。

## 选项

### `--clear`

清除自定义 pane 标签；不要与名称同时传入。

### `--help`

打印该命令的帮助。

## 使用提醒

#### 行为与限制

与 agent rename、terminal title set 管理的是不同层级。

源码：[S01](https://github.com/herdrdev/herdr/blob/7b116c05bfda646af39d2524c54e70c751f57ee8/src/cli/spec.rs#L6-L966) [S04](https://github.com/herdrdev/herdr/blob/7b116c05bfda646af39d2524c54e70c751f57ee8/src/cli/pane.rs)
