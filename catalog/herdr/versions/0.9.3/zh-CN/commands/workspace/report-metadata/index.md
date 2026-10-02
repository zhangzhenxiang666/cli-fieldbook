---
title: herdr workspace report-metadata
command:
  - workspace
  - report-metadata
---

## 简介

上报仅用于展示的工作区元数据。

## 参数

### `WORKSPACE_ID`

目标工作区 ID。

## 选项

### `--source`

非空来源标识，必需；用于区分不同报告方。

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

必须至少设置或清除一个 token。不改变 Agent 的生命周期状态。成功时通常不打印正文。

源码：[S01](https://github.com/herdrdev/herdr/blob/7b116c05bfda646af39d2524c54e70c751f57ee8/src/cli/spec.rs#L6-L966) [S06](https://github.com/herdrdev/herdr/blob/7b116c05bfda646af39d2524c54e70c751f57ee8/src/cli/workspace.rs)
