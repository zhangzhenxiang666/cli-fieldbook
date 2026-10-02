---
title: herdr agent read
command:
  - agent
  - read
---

## 简介

读取 Agent 的终端输出。

## 参数

### `TARGET`

目标 Agent。

## 选项

### `--source`

快照来源：visible、recent、recent-unwrapped、detection；默认 recent。

### `--lines`

限制快照的末尾渲染行数；软换行合并后的逻辑行数可能更少。

### `--format`

输出格式：text 或 ansi；默认按普通文本读取。

### `--ansi`

请求 ANSI 格式；相当于选择 ansi 格式的便捷开关。

### `--help`

打印该命令的帮助。

## 使用提醒

#### 行为与限制

标准输出直接是文本或 ANSI 内容，不是通用 API JSON 外层。

本命令没有 pane read 的 --raw 开关。

源码：[S01](https://github.com/herdrdev/herdr/blob/7b116c05bfda646af39d2524c54e70c751f57ee8/src/cli/spec.rs#L6-L966) [S05](https://github.com/herdrdev/herdr/blob/7b116c05bfda646af39d2524c54e70c751f57ee8/src/cli/agent.rs)
