---
title: herdr channel set
command:
  - channel
  - set
---

## 简介

选择更新通道。

## 参数

### `CHANNEL`

stable 或 preview。

## 选项

### `--help`

打印该命令的帮助。

## 使用提醒

#### 行为与限制

并非只改变一个显示值：保存通道后，直接安装版本会进入自更新流程；包管理器构建会给出相应指引。

配置 TOML 无法安全解析时不会静默覆盖。

源码：[S01](https://github.com/herdrdev/herdr/blob/7b116c05bfda646af39d2524c54e70c751f57ee8/src/cli/spec.rs#L6-L966) [S03](https://github.com/herdrdev/herdr/blob/7b116c05bfda646af39d2524c54e70c751f57ee8/src/cli.rs)
