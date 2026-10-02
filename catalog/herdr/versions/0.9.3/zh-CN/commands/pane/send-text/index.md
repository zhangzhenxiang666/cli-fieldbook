---
title: herdr pane send-text
command:
  - pane
  - send-text
---

## 简介

向窗格发送字面文本，不附加 Enter。

## 参数

### `PANE_ID`

目标窗格。

### `TEXT`

要输入的原始文本；推荐整体引用。

## 选项

### `--help`

打印该命令的帮助。

## 使用提醒

#### 行为与限制

仅发送输入，不意味着命令已执行。要一次提交文本与 Enter 可用 pane run。

成功时通常没有标准输出。

源码：[S01](https://github.com/herdrdev/herdr/blob/7b116c05bfda646af39d2524c54e70c751f57ee8/src/cli/spec.rs#L6-L966) [S04](https://github.com/herdrdev/herdr/blob/7b116c05bfda646af39d2524c54e70c751f57ee8/src/cli/pane.rs)
