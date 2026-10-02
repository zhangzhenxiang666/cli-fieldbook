---
title: herdr plugin link
command:
  - plugin
  - link
---

## 简介

关联本地插件目录。

## 参数

### `PATH`

插件目录；远程 --machine 场景必须为远程绝对路径。

## 选项

### `--disabled`

关联但保持禁用，适合先检查新插件。

### `--enabled`

关联并启用；默认启用。

### `--help`

打印该命令的帮助。

## 使用提醒

#### 行为与限制

不要同时传 --enabled 与 --disabled。不是上传本地目录到远程机器。

源码：[S01](https://github.com/herdrdev/herdr/blob/7b116c05bfda646af39d2524c54e70c751f57ee8/src/cli/spec.rs#L6-L966) [S09](https://github.com/herdrdev/herdr/blob/7b116c05bfda646af39d2524c54e70c751f57ee8/src/cli/plugin.rs)
