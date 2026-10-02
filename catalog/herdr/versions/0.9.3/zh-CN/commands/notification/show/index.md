---
title: herdr notification show
command:
  - notification
  - show
---

## 简介

显示一条通知。

## 参数

### `TITLE`

通知标题。

## 选项

### `--body`

正文。

### `--position`

Herdr 内部 toast 位置：top-left、top-right、bottom-left、bottom-right。

### `--sound`

声音类别：none、done、request；默认 none。

### `--help`

打印该命令的帮助。

## 使用提醒

#### 行为与限制

遵守 ui.toast 的投递配置；默认配置 delivery="off"，命令不会强制绕过关闭设置。

源码：[S01](https://github.com/herdrdev/herdr/blob/7b116c05bfda646af39d2524c54e70c751f57ee8/src/cli/spec.rs#L6-L966)
