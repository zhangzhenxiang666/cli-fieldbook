---
title: herdr terminal session
command:
  - terminal
  - session
---

## 简介

通过 NDJSON 控制或观察终端会话。

## 选项

### `--help`

打印该命令的帮助。

## 使用提醒

#### 行为与限制

面向程序的持续流协议，不是一次返回一个 JSON 的查询；请按行解码事件。

源码：[S01](https://github.com/herdrdev/herdr/blob/7b116c05bfda646af39d2524c54e70c751f57ee8/src/cli/spec.rs#L6-L966) [S03](https://github.com/herdrdev/herdr/blob/7b116c05bfda646af39d2524c54e70c751f57ee8/src/cli.rs)
