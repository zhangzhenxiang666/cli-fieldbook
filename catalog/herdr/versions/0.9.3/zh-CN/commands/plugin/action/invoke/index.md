---
title: herdr plugin action invoke
command:
  - plugin
  - action
  - invoke
---

## 简介

调用一个插件动作。

## 参数

### `ACTION_ID`

动作标识；可用 `<plugin-id>`.`<local-action>` 形式。

## 选项

### `--plugin`

显式指定插件，避免本地动作名歧义。

### `--help`

打印该命令的帮助。

## 使用提醒

#### 行为与限制

本地动作名不能自行随意添加点号层级。调用动作可能运行外部命令，以插件定义为准。

源码：[S01](https://github.com/herdrdev/herdr/blob/7b116c05bfda646af39d2524c54e70c751f57ee8/src/cli/spec.rs#L6-L966) [S09](https://github.com/herdrdev/herdr/blob/7b116c05bfda646af39d2524c54e70c751f57ee8/src/cli/plugin.rs)
