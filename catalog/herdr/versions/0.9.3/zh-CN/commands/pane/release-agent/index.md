---
title: herdr pane release-agent
command:
  - pane
  - release-agent
---

## 简介

释放某个来源的 Agent 生命周期权威。

## 参数

### `PANE_ID`

目标窗格。

## 选项

### `--source`

必需，要释放的报告来源。

### `--agent`

必需，Agent 规范标签。

### `--seq`

来源提供的顺序编号，用于报告更新顺序；这是计数值，不是时间戳。

### `--help`

打印该命令的帮助。

## 使用提醒

#### 行为与限制

release 是释放状态报告权威，不是 kill、停止 Agent、关闭 pane 或删除会话。成功通常无正文。

源码：[S01](https://github.com/herdrdev/herdr/blob/7b116c05bfda646af39d2524c54e70c751f57ee8/src/cli/spec.rs#L6-L966) [S04](https://github.com/herdrdev/herdr/blob/7b116c05bfda646af39d2524c54e70c751f57ee8/src/cli/pane.rs)
