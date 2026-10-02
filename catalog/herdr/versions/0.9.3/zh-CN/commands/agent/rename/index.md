---
title: herdr agent rename
command:
  - agent
  - rename
---

## 简介

给已识别的 Agent 命名或清除名称。

## 参数

### `TARGET`

已识别 Agent 的目标。

### `NAME`

新名称；与 --clear 二选一。

## 选项

### `--clear`

清除自定义 Agent 名称。

### `--help`

打印该命令的帮助。

## 使用提醒

#### 行为与限制

不能通过 rename 把一个普通 shell 声明成 Agent；重命名也不改变 Agent 种类。

源码：[S01](https://github.com/herdrdev/herdr/blob/7b116c05bfda646af39d2524c54e70c751f57ee8/src/cli/spec.rs#L6-L966) [S05](https://github.com/herdrdev/herdr/blob/7b116c05bfda646af39d2524c54e70c751f57ee8/src/cli/agent.rs)
