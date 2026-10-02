---
title: herdr machine status
command:
  - machine
  - status
---

## 简介

检查已保存机器的连接状态。

## 参数

### `LABEL_OR_ID`

只检查一个配置；省略时检查已保存的机器。

## 选项

### `--json`

输出 JSON，而不是默认的人类可读格式。具体结构以本命令为准，不假定都有 result 外层。

### `--help`

打印该命令的帮助。

## 使用提醒

#### 行为与限制

这是新发起的状态探测，不等同于某个 TUI 客户端正在显示的连接状态；不会弹出交互认证提示。

源码：[S11](https://github.com/herdrdev/herdr/blob/7b116c05bfda646af39d2524c54e70c751f57ee8/src/cli/spec/machine.rs) [S10](https://github.com/herdrdev/herdr/blob/7b116c05bfda646af39d2524c54e70c751f57ee8/src/cli/target.rs#L174-L301)
