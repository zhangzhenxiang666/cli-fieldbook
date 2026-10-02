---
title: herdr pane send-keys
command:
  - pane
  - send-keys
---

## 简介

向窗格发送按键序列。

## 参数

### `PANE_ID`

目标窗格。

### `KEY`

一个或多个键名，如 enter、esc、ctrl+c。

## 选项

### `--help`

打印该命令的帮助。

## 使用提醒

#### 行为与限制

解析器先校验键名，再发送输入；esc 为规范名称，escape 是兼容写法。成功时通常无正文。

源码：[S01](https://github.com/herdrdev/herdr/blob/7b116c05bfda646af39d2524c54e70c751f57ee8/src/cli/spec.rs#L6-L966) [S04](https://github.com/herdrdev/herdr/blob/7b116c05bfda646af39d2524c54e70c751f57ee8/src/cli/pane.rs)
