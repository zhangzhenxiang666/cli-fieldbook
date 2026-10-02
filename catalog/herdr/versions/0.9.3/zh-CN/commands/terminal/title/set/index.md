---
title: herdr terminal title set
command:
  - terminal
  - title
  - set
---

## 简介

设置外层终端窗口标题。

## 参数

### `TITLE`

标题文本。

## 选项

### `--help`

打印该命令的帮助。

## 使用提醒

#### 行为与限制

与 pane rename、tab rename 和 Agent 名称不是同一个字段。

源码：[S01](https://github.com/herdrdev/herdr/blob/7b116c05bfda646af39d2524c54e70c751f57ee8/src/cli/spec.rs#L6-L966) [S03](https://github.com/herdrdev/herdr/blob/7b116c05bfda646af39d2524c54e70c751f57ee8/src/cli.rs)
