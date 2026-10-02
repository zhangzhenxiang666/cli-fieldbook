---
title: herdr machine add
command:
  - machine
  - add
---

## 简介

准备远程 Herdr 并保存机器配置。

## 参数

### `SSH_TARGET`

SSH 配置别名或 SSH 目标，例如 build-host；不是 Herdr profile ID。

## 选项

### `--label`

本地保存的显示名；未指定时由主机与会话信息产生。

### `--remote-session`

绑定的远程命名会话。

### `--help`

打印该命令的帮助。

## 使用提醒

#### 行为与限制

交互流程可能发现并询问远程会话。安装、升级、重启或重置操作以提示为准；重置可能终止远程进程。

该配置保存后，使用 herdr --machine `<label-or-id>` ... 执行允许的 API 命令。

源码：[S11](https://github.com/herdrdev/herdr/blob/7b116c05bfda646af39d2524c54e70c751f57ee8/src/cli/spec/machine.rs) [S10](https://github.com/herdrdev/herdr/blob/7b116c05bfda646af39d2524c54e70c751f57ee8/src/cli/target.rs#L174-L301)
