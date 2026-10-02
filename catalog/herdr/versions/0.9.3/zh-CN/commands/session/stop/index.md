---
title: herdr session stop
command:
  - session
  - stop
---

## 简介

停止命名会话。

## 参数

### `NAME`

会话名称。

## 选项

### `--json`

输出 JSON，而不是默认的人类可读格式。具体结构以本命令为准，不假定都有 result 外层。

### `--help`

打印该命令的帮助。

## 使用提醒

#### 行为与限制

会影响该会话托管的进程。只想离开 TUI 时应 detach，不要 stop。

源码：[S01](https://github.com/herdrdev/herdr/blob/7b116c05bfda646af39d2524c54e70c751f57ee8/src/cli/spec.rs#L6-L966) [S03](https://github.com/herdrdev/herdr/blob/7b116c05bfda646af39d2524c54e70c751f57ee8/src/cli.rs)
