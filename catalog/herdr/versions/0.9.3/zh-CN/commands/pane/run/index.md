---
title: herdr pane run
command:
  - pane
  - run
---

## 简介

一次提交命令文本与 Enter。

## 参数

### `PANE_ID`

目标窗格。

### `COMMAND`

交给窗格内 shell 的命令文本；多个词会按空格连接，建议完整引用。

## 选项

### `--help`

打印该命令的帮助。

## 使用提醒

#### 行为与限制

API 成功只表示输入已提交，不是子进程成功退出，也不返回进程退出码。成功通常无标准输出。

只在明确处于 shell 提示符时使用；若窗格正运行 Agent/TUI，这些字节会发给那个程序。

源码：[S01](https://github.com/herdrdev/herdr/blob/7b116c05bfda646af39d2524c54e70c751f57ee8/src/cli/spec.rs#L6-L966) [S04](https://github.com/herdrdev/herdr/blob/7b116c05bfda646af39d2524c54e70c751f57ee8/src/cli/pane.rs)
