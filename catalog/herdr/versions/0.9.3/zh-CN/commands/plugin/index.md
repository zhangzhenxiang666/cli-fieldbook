---
title: herdr plugin
command:
  - plugin
---

## 简介

安装、关联及运行工作流插件。

## 选项

### `--help`

打印该命令的帮助。

## 使用提醒

#### 行为与限制

插件可执行本机代码、访问本地资源。安装/启用前应确认来源、版本、配置与权限。

源码：[S01](https://github.com/herdrdev/herdr/blob/7b116c05bfda646af39d2524c54e70c751f57ee8/src/cli/spec.rs#L6-L966) [S09](https://github.com/herdrdev/herdr/blob/7b116c05bfda646af39d2524c54e70c751f57ee8/src/cli/plugin.rs)
