---
title: jj config path
command:
  - config
  - path
---

## 简介

输出配置文件路径；文件未必存在。

## 选项

### `--user`

用户级配置。

### `--repo`

仓库级配置。

### `--workspace`

工作区级配置。

### `--help`

显示帮助。

## 使用提醒

全局参数见 [Global Options](../../../concepts/global-options.md)。

**注意：** 必须选一个层级。--repo/--workspace 在尚无配置目录时可能创建目录，所以不是绝对无副作用的查询。

源码：[cli/src/commands/config/path.rs](https://github.com/jj-vcs/jj/blob/7c41cdeb16b6b321c64e789a966b6adf723816a5/cli/src/commands/config/path.rs)。
