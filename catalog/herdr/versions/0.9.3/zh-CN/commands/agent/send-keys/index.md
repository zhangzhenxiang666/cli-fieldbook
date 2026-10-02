---
title: herdr agent send-keys
command:
  - agent
  - send-keys
---

## 简介

向 Agent 发送按键。

## 参数

### `TARGET`

目标 Agent。

### `KEY`

一个或多个键名，如 enter、esc、ctrl+c；esc 为规范写法，escape 也接受。

## 选项

### `--help`

打印该命令的帮助。

## 使用提醒

#### 行为与限制

按键是操作真实交互界面，不是发送新的自然语言 prompt。确认当前屏幕后再操作；不要自动批准未知确认框。

源码：[S01](https://github.com/herdrdev/herdr/blob/7b116c05bfda646af39d2524c54e70c751f57ee8/src/cli/spec.rs#L6-L966) [S05](https://github.com/herdrdev/herdr/blob/7b116c05bfda646af39d2524c54e70c751f57ee8/src/cli/agent.rs)
