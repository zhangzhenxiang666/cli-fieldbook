---
title: herdr machine
command:
  - machine
---

## 简介

管理保存的 SSH machine 配置。

## 选项

### `--help`

打印该命令的帮助。

## 使用提醒

#### 行为与限制

配置 ID、显示 label 与 SSH_TARGET 不是同一个字段。

源码：[S11](https://github.com/herdrdev/herdr/blob/7b116c05bfda646af39d2524c54e70c751f57ee8/src/cli/spec/machine.rs) [S10](https://github.com/herdrdev/herdr/blob/7b116c05bfda646af39d2524c54e70c751f57ee8/src/cli/target.rs#L174-L301)
