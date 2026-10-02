---
title: jj debug template
command:
  - debug
  - template
---

## 简介

解析模板并打印语法树。

## 参数

### `TEMPLATE`

模板表达式；此命令是解析诊断，不是对提交执行模板渲染。

## 选项

### `--help`

显示帮助。

## 使用提醒

全局参数见 [Global Options](../../../concepts/global-options.md)。

**注意：** 开发者诊断接口，输出不保证稳定，不建议作为生产脚本协议。

源码：[cli/src/commands/debug/template.rs](https://github.com/jj-vcs/jj/blob/7c41cdeb16b6b321c64e789a966b6adf723816a5/cli/src/commands/debug/template.rs)。
