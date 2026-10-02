---
title: herdr agent start
command:
  - agent
  - start
---

## 简介

在现有交互 shell 窗格内启动支持的 Agent。

## 参数

### `NAME`

启动后给该 Agent 使用的名称。

### `AGENT_ARG`

\-- 后的参数直接传给 Agent，不由 Herdr 解释。

## 选项

### `--kind`

必需。规范 Agent 种类见“Agent 种类与别名”表，共 24 种。

### `--pane`

必需。现有且停在交互式 shell 提示符的 pane ID。

### `--timeout`

等待可交互就绪；默认 30000ms，上限 300000ms。

### `--help`

打印该命令的帮助。

## 使用提醒

#### 行为与限制

不会替你安装 Agent 二进制；相关程序需已可在目标环境启动。

成功表示在同一终端检测到预期 Agent 并已准备接受输入，不只是成功写入了一行 shell 命令。

不能把仍在运行前台任务的 pane 当作空闲 shell 直接覆盖启动。

源码：[S01](https://github.com/herdrdev/herdr/blob/7b116c05bfda646af39d2524c54e70c751f57ee8/src/cli/spec.rs#L6-L966) [S05](https://github.com/herdrdev/herdr/blob/7b116c05bfda646af39d2524c54e70c751f57ee8/src/cli/agent.rs)
