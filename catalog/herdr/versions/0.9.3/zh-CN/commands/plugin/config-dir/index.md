---
title: herdr plugin config-dir
command:
  - plugin
  - config-dir
---

## 简介

输出插件用户配置目录。

## 参数

### `PLUGIN_ID`

插件 ID。

## 选项

### `--help`

打印该命令的帮助。

## 使用提醒

#### 行为与限制

并非严格只读：实现会确保相关用户目录已创建。输出目录路径文本。

源码：[S01](https://github.com/herdrdev/herdr/blob/7b116c05bfda646af39d2524c54e70c751f57ee8/src/cli/spec.rs#L6-L966) [S09](https://github.com/herdrdev/herdr/blob/7b116c05bfda646af39d2524c54e70c751f57ee8/src/cli/plugin.rs)
