---
title: herdr agent wait
command:
  - agent
  - wait
---

## 简介

等待 Agent 状态匹配。

## 参数

### `TARGET`

目标 Agent。

## 选项

### `--until`

匹配状态：idle、working、blocked、done、unknown；可重复，多个状态按“或”匹配。

### `--timeout`

超时毫秒数；等待命令省略时可无限等待。

### `--help`

打印该命令的帮助。

## 使用提醒

#### 行为与限制

默认匹配 idle、done、blocked；多个 --until 是“或”。没有 --timeout 时无限等待。

当前状态已经匹配时可立即返回；不是“等待下一轮完成”。unknown 必须显式指定才会匹配。

源码：[S01](https://github.com/herdrdev/herdr/blob/7b116c05bfda646af39d2524c54e70c751f57ee8/src/cli/spec.rs#L6-L966) [S05](https://github.com/herdrdev/herdr/blob/7b116c05bfda646af39d2524c54e70c751f57ee8/src/cli/agent.rs)
