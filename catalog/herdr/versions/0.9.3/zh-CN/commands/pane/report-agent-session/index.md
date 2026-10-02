---
title: herdr pane report-agent-session
command:
  - pane
  - report-agent-session
---

## 简介

上报 Agent 会话标识及可选恢复参数。

## 参数

### `PANE_ID`

会话身份归属的窗格。

### `-- RESUME_ARG`

恢复此 agent 会话的 argv；必须以普通命令名开头，不是任意 shell 脚本字符串。

## 选项

### `--source`

必需，报告来源。

### `--agent`

必需，Agent 规范标签。

### `--seq`

来源提供的顺序编号，用于报告更新顺序；这是计数值，不是时间戳。

### `--agent-session-id`

Agent 自己的会话标识，区别于 Herdr session。

### `--agent-session-path`

Agent 会话存储路径。

### `--session-start-source`

描述 Agent 会话启动来源的标记；不是 pane read 的快照来源枚举。

### `--help`

打印该命令的帮助。

## 使用提醒

#### 行为与限制

只报告会话身份/恢复信息，不宣称拥有 Agent 生命周期状态权威。成功通常无正文。

源码：[S01](https://github.com/herdrdev/herdr/blob/7b116c05bfda646af39d2524c54e70c751f57ee8/src/cli/spec.rs#L6-L966) [S04](https://github.com/herdrdev/herdr/blob/7b116c05bfda646af39d2524c54e70c751f57ee8/src/cli/pane.rs)
