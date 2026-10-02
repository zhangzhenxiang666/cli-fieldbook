---
title: herdr agent
command:
  - agent
---

## 简介

控制和检查已识别的 Agent 窗格。

## 选项

### `--help`

打印该命令的帮助。

## 使用提醒

#### 行为与限制

TARGET 可使用命令接受的 Agent/窗格标识或 Agent 名称；不要把 workspace 的显示名当作 Agent ID。

Agent 检测、内置集成、Agent 可执行程序的安装是三件不同的事。

源码：[S01](https://github.com/herdrdev/herdr/blob/7b116c05bfda646af39d2524c54e70c751f57ee8/src/cli/spec.rs#L6-L966) [S05](https://github.com/herdrdev/herdr/blob/7b116c05bfda646af39d2524c54e70c751f57ee8/src/cli/agent.rs)
