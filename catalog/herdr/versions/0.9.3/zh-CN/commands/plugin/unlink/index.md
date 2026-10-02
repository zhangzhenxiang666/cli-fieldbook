---
title: herdr plugin unlink
command:
  - plugin
  - unlink
---

## 简介

取消本地插件目录关联。

## 参数

### `PLUGIN_ID`

关联的插件 ID。

## 选项

### `--help`

打印该命令的帮助。

## 使用提醒

#### 行为与限制

管理关联关系，不等于删除原始开发仓库。

源码：[S01](https://github.com/herdrdev/herdr/blob/7b116c05bfda646af39d2524c54e70c751f57ee8/src/cli/spec.rs#L6-L966) [S09](https://github.com/herdrdev/herdr/blob/7b116c05bfda646af39d2524c54e70c751f57ee8/src/cli/plugin.rs)
