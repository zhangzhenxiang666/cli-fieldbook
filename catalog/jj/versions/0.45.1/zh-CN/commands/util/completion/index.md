---
title: jj util completion
command:
  - util
  - completion
---

## 简介

向标准输出生成 shell 补全脚本。

## 参数

### `SHELL`

bash、elvish、fish、nushell、power-shell、zsh。

## 选项

### `--help`

显示帮助。

## 使用提醒

全局参数见 [Global Options](../../../concepts/global-options.md)。

**注意：** 输出的是脚本，不会自动修改 shell 配置。PowerShell 的枚举拼写是 power-shell。

源码：[cli/src/commands/util/completion.rs](https://github.com/jj-vcs/jj/blob/7c41cdeb16b6b321c64e789a966b6adf723816a5/cli/src/commands/util/completion.rs)。
