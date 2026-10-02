---
title: herdr agent prompt
command:
  - agent
  - prompt
---

## 简介

向 Agent 提交提示词。

## 参数

### `TARGET`

目标 Agent。

### `TEXT`

完整提示词，含空格或换行时整体引用。

## 选项

### `--wait`

提交后等待首次观察到满足条件的状态。

### `--until`

匹配状态：idle、working、blocked、done、unknown；可重复，多个状态按“或”匹配。

### `--timeout`

超时毫秒数；等待命令省略时可无限等待。

### `--help`

打印该命令的帮助。

## 使用提醒

#### 行为与限制

\--until 与 --timeout 都要求 --wait。默认匹配 idle、done、blocked。

目标已经 blocked 时，提交在发送任何输入之前被 agent_blocked 拒绝。

接受提交时若不处于 working，--wait 要求在 5000ms 内观察到 working 或 blocked，否则返回 agent_prompt_stalled；调用方超时更早到达则返回 timeout。

不追踪请求与 Agent turn 的因果关系。目标原本已 working 时，正在进行的旧 turn 结束也可能满足等待。

超时或 stalled 不是“提示词肯定没发出”的证明；先 get/read 再决定是否重试，避免重复提交。

源码：[S01](https://github.com/herdrdev/herdr/blob/7b116c05bfda646af39d2524c54e70c751f57ee8/src/cli/spec.rs#L6-L966) [S05](https://github.com/herdrdev/herdr/blob/7b116c05bfda646af39d2524c54e70c751f57ee8/src/cli/agent.rs)
