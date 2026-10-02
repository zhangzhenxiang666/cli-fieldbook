---
title: herdr plugin uninstall
command:
  - plugin
  - uninstall
---

## 简介

卸载插件。

## 参数

### `PLUGIN`

已安装插件 ID 或安装来源简写。

## 选项

### `--help`

打印该命令的帮助。

## 使用提醒

#### 行为与限制

与 unlink 本地开发目录不同；先检查 plugin list 确认对象。

源码：[S01](https://github.com/herdrdev/herdr/blob/7b116c05bfda646af39d2524c54e70c751f57ee8/src/cli/spec.rs#L6-L966) [S09](https://github.com/herdrdev/herdr/blob/7b116c05bfda646af39d2524c54e70c751f57ee8/src/cli/plugin.rs)
