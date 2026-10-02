---
title: herdr session delete
command:
  - session
  - delete
---

## 简介

删除已经停止的会话。

## 参数

### `NAME`

已停止会话的名称；默认会话显式填写 default。

## 选项

### `--json`

输出 JSON，而不是默认的人类可读格式。具体结构以本命令为准，不假定都有 result 外层。

### `--help`

打印该命令的帮助。

## 使用提醒

#### 行为与限制

会删除保存的会话状态；正在运行的会话不能直接作为 stopped 会话删除。

源码：[S01](https://github.com/herdrdev/herdr/blob/7b116c05bfda646af39d2524c54e70c751f57ee8/src/cli/spec.rs#L6-L966) [S03](https://github.com/herdrdev/herdr/blob/7b116c05bfda646af39d2524c54e70c751f57ee8/src/cli.rs)
