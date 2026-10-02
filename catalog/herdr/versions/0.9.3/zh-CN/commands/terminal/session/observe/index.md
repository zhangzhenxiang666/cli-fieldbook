---
title: herdr terminal session observe
command:
  - terminal
  - session
  - observe
---

## 简介

只读观察终端 NDJSON 流。

## 参数

### `TARGET`

受支持的 pane / terminal / agent 目标。

## 选项

### `--cols`

终端列数，1..65535；默认 120。

### `--rows`

终端行数，1..65535；默认 40。

### `--help`

打印该命令的帮助。

## 使用提醒

#### 行为与限制

输出 terminal.frame 等事件，帧内 ANSI 数据按协议编码；不要当作可直接 cat 的终端画面。

只读观察，不发送按键，也不抢占输入控制权。

源码：[S01](https://github.com/herdrdev/herdr/blob/7b116c05bfda646af39d2524c54e70c751f57ee8/src/cli/spec.rs#L6-L966) [S03](https://github.com/herdrdev/herdr/blob/7b116c05bfda646af39d2524c54e70c751f57ee8/src/cli.rs)
