---
title: herdr terminal session control
command:
  - terminal
  - session
  - control
---

## 简介

通过 NDJSON 持有终端写入控制流。

## 参数

### `TARGET`

受支持的 pane / terminal / agent 目标。

## 选项

### `--takeover`

接管已有控制流。

### `--cols`

终端列数，1..65535；默认 120。

### `--rows`

终端行数，1..65535；默认 40。

### `--help`

打印该命令的帮助。

## 使用提醒

#### 行为与限制

标准输出持续发送终端帧/关闭事件；标准输入读取协议规定的 input/resize/mouse 等消息。

一个终端仅一个写入控制者。不要把任意文本直接写入 stdin 当成键盘字节；先查 api schema。

源码：[S01](https://github.com/herdrdev/herdr/blob/7b116c05bfda646af39d2524c54e70c751f57ee8/src/cli/spec.rs#L6-L966) [S03](https://github.com/herdrdev/herdr/blob/7b116c05bfda646af39d2524c54e70c751f57ee8/src/cli.rs)
