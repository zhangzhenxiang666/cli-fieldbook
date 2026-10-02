---
title: herdr pane report-metadata
command:
  - pane
  - report-metadata
---

## 简介

上报仅用于展示的窗格元数据。

## 参数

### `PANE_ID`

目标窗格。

## 选项

### `--source`

必需，非空报告来源。

### `--agent`

将展示元数据关联到某 Agent 标签。

### `--applies-to-source`

限定这份展示覆盖适用于哪个状态来源。

### `--title`

展示标题。

### `--clear-title`

清除展示标题；与 --title 互斥。

### `--display-agent`

Agent 的展示文本，不改变真实种类。

### `--clear-display-agent`

清除展示 Agent 文本；与 --display-agent 互斥。

### `--state-label`

覆盖某个状态的展示文字；运行时可重复设置多个状态。

### `--clear-state-labels`

清除状态展示文字覆盖。

### `--token`

设置自定义展示 token；可重复。

### `--clear-token`

清除指定 token；可重复。

### `--seq`

来源提供的顺序编号，用于报告更新顺序；这是计数值，不是时间戳。

### `--ttl-ms`

展示元数据的有效期，单位毫秒；省略时采用服务端默认策略。

### `--help`

打印该命令的帮助。

## 使用提醒

#### 行为与限制

实际解析器要求至少设置或清除一个展示字段；这类更新不改变 idle/working/blocked 的语义状态。

\--state-label 在运行时支持重复，但 spec 没有为它配置 Append。成功通常无正文。

源码：[S01](https://github.com/herdrdev/herdr/blob/7b116c05bfda646af39d2524c54e70c751f57ee8/src/cli/spec.rs#L6-L966) [S04](https://github.com/herdrdev/herdr/blob/7b116c05bfda646af39d2524c54e70c751f57ee8/src/cli/pane.rs)
