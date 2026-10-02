---
title: herdr pane read
command:
  - pane
  - read
---

## 简介

读取窗格终端快照。

## 参数

### `PANE_ID`

目标窗格 ID。

## 选项

### `--source`

快照来源：visible、recent、recent-unwrapped、detection；默认 recent。

### `--lines`

限制快照的末尾渲染行数；软换行合并后的逻辑行数可能更少。

### `--format`

输出格式：text 或 ansi；默认按普通文本读取。

### `--ansi`

请求 ANSI 格式；相当于选择 ansi 格式的便捷开关。

### `--raw`

保留 ANSI 转义，选择原始 ANSI 读取路径；不是二进制日志导出。

### `--help`

打印该命令的帮助。

## 使用提醒

#### 行为与限制

输出直接是文本/ANSI，不应无条件接 jq。

默认 recent 从末尾近期输出取样；visible 与 detection 的视图不同。见概念章节的快照表。

源码：[S01](https://github.com/herdrdev/herdr/blob/7b116c05bfda646af39d2524c54e70c751f57ee8/src/cli/spec.rs#L6-L966) [S04](https://github.com/herdrdev/herdr/blob/7b116c05bfda646af39d2524c54e70c751f57ee8/src/cli/pane.rs)
