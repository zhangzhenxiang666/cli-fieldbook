---
title: herdr pane wait-output
command:
  - pane
  - wait-output
---

## 简介

等待窗格快照中出现匹配输出。

## 参数

### `PANE_ID`

目标窗格。

## 选项

### `--match`

按字面子串匹配，与 --regex 二选一，必须提供一种。

### `--regex`

按 Rust 正则表达式匹配，与 --match 互斥；按行匹配而不是跨行全文匹配。

### `--source`

visible、recent、recent-unwrapped；默认 recent。

### `--lines`

限制搜索快照的渲染行数；recent 默认近期 80 行。

### `--timeout`

超时毫秒数；等待命令省略时可无限等待。

### `--raw`

匹配时保留 ANSI 转义序列；可能影响锚点及子串判断。

### `--help`

打印该命令的帮助。

## 使用提醒

#### 行为与限制

先立即搜索已存在的输出，再轮询。旧日志满足条件也会立即返回，不是“只看本次命令之后的新日志”。

recent / recent-unwrapped 在匹配时会合并软换行；行数截取在合并前执行。

没有 --timeout 则无限等待。帮助允许值不包括 detection，不建议依赖共享解析器的额外放行行为。

源码：[S01](https://github.com/herdrdev/herdr/blob/7b116c05bfda646af39d2524c54e70c751f57ee8/src/cli/spec.rs#L6-L966) [S04](https://github.com/herdrdev/herdr/blob/7b116c05bfda646af39d2524c54e70c751f57ee8/src/cli/pane.rs)
