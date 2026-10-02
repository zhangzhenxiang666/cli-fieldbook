---
title: herdr agent attach
command:
  - agent
  - attach
---

## 简介

直接附着到 Agent 的终端。

## 参数

### `TARGET`

目标 Agent。

## 选项

### `--takeover`

显式接管已有终端写入控制权。

### `--help`

打印该命令的帮助。

## 使用提醒

#### 行为与限制

交互式 attach，不是一次性 JSON 查询。Ctrl+B 然后 q 退出附着；Ctrl+B 连按两次发送字面 Ctrl+B。

\--machine 路由不支持此交互 attach 命令。

源码：[S01](https://github.com/herdrdev/herdr/blob/7b116c05bfda646af39d2524c54e70c751f57ee8/src/cli/spec.rs#L6-L966) [S05](https://github.com/herdrdev/herdr/blob/7b116c05bfda646af39d2524c54e70c751f57ee8/src/cli/agent.rs)
