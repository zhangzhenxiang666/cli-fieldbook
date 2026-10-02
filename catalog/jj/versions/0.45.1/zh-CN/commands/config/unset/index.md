---
title: jj config unset
command:
  - config
  - unset
---

## 简介

从指定配置文件移除一个配置键。

## 参数

### `NAME`

要移除的配置键。

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

**注意：** 移除高优先级配置后，低优先级的同名设置可能重新生效。

源码：[cli/src/commands/config/unset.rs](https://github.com/jj-vcs/jj/blob/7c41cdeb16b6b321c64e789a966b6adf723816a5/cli/src/commands/config/unset.rs)。
