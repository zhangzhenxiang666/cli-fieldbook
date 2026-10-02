---
title: jj config edit
command:
  - config
  - edit
---

## 简介

用编辑器打开配置文件；文件不存在时创建。

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

**注意：** 必须且只能选一个目标。v0.45 起 --user 使用首先加载的用户配置文件；指定 conf.d 中某个文件时请用 --file。

源码：[cli/src/commands/config/edit.rs](https://github.com/jj-vcs/jj/blob/7c41cdeb16b6b321c64e789a966b6adf723816a5/cli/src/commands/config/edit.rs)。
