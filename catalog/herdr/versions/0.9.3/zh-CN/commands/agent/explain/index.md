---
title: herdr agent explain
command:
  - agent
  - explain
---

## 简介

解释 Agent 检测状态及证据。

## 参数

### `TARGET`

在线模式的 Agent/窗格目标；本地 --file 模式不使用该参数。

## 选项

### `--file`

读取本地 UTF-8 终端文本样本，离线解释检测结果。

### `--agent`

本地文件样本对应的 Agent 标签；与 --file 配套。

### `--json`

输出 JSON，而不是默认的人类可读格式。具体结构以本命令为准，不假定都有 result 外层。

### `--format`

text 或 json。

### `--verbose`

展开详细证据、匹配区域/规则及覆盖来源。

### `--help`

打印该命令的帮助。

## 使用提醒

#### 行为与限制

两种形式：在线 TARGET；或离线 --file PATH --agent LABEL。文件模式与 TARGET 互斥。

\--agent 不是在线模式的目标选择器。--json 输出解释对象自身，不保证含 result 外层。

源码：[S01](https://github.com/herdrdev/herdr/blob/7b116c05bfda646af39d2524c54e70c751f57ee8/src/cli/spec.rs#L6-L966) [S05](https://github.com/herdrdev/herdr/blob/7b116c05bfda646af39d2524c54e70c751f57ee8/src/cli/agent.rs)
