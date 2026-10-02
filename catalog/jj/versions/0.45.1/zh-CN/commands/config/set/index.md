---
title: jj config set
command:
  - config
  - set
---

## 简介

把配置键写成指定值。

## 参数

### `NAME`

配置键，使用 TOML 点分语法。

### `VALUE`

TOML 表达式；普通字符串可省略 TOML 引号，但 shell 引号仍需正确处理。

## 选项

### `--user`

用户级配置。

### `--repo`

仓库级配置。

### `--workspace`

工作区级配置。

### `--file`

指定受 jj 识别的配置文件作为写入/编辑目标；不是任意路径。可先用全局 --config-file 加载文件。set/edit 可创建尚不存在的合法目标及其父目录。

### `--help`

显示帮助。

## 使用提醒

全局参数见 [Global Options](../../../concepts/global-options.md)。

**注意：** 目标四选一。复杂数组、含引号文本建议用 config edit。

源码：[cli/src/commands/config/set.rs](https://github.com/jj-vcs/jj/blob/7c41cdeb16b6b321c64e789a966b6adf723816a5/cli/src/commands/config/set.rs)。
