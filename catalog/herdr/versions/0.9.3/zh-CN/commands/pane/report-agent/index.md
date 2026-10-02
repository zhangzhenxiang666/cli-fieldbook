---
title: herdr pane report-agent
command:
  - pane
  - report-agent
---

## 简介

由 hook/集成上报 Agent 生命周期状态。

## 参数

### `PANE_ID`

状态归属的窗格。

### `-- RESUME_ARG`

恢复此 agent 会话的 argv；必须以普通命令名开头，不是任意 shell 脚本字符串。

## 选项

### `--source`

必需，生命周期报告来源。

### `--agent`

必需，Agent 规范标签。

### `--state`

必需，仅 idle、working、blocked、unknown。这里不接受 done。

### `--message`

补充状态说明。

### `--seq`

来源提供的顺序编号，用于报告更新顺序；这是计数值，不是时间戳。

### `--agent-session-id`

Agent 自己的会话标识，区别于 Herdr session。

### `--agent-session-path`

Agent 会话存储路径。

### `--help`

打印该命令的帮助。

## 使用提醒

#### 行为与限制

高级集成接口，会影响生命周期权威来源；普通使用者不应把它当成给任意任务手工造完成状态的命令。

与 wait 可匹配的状态集合不同。成功通常不打印正文。

源码：[S01](https://github.com/herdrdev/herdr/blob/7b116c05bfda646af39d2524c54e70c751f57ee8/src/cli/spec.rs#L6-L966) [S04](https://github.com/herdrdev/herdr/blob/7b116c05bfda646af39d2524c54e70c751f57ee8/src/cli/pane.rs)
