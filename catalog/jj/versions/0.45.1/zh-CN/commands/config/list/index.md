---
title: jj config list
command:
  - config
  - list
---

## 简介

列出配置变量、值及可选来源信息。

## 参数

### `NAME`

可选的配置键或键前缀。

## 选项

### `--include-defaults`

把内置默认配置也列出。

### `--include-overridden`

保留已经被更高优先级配置覆盖的条目。

### `--user`

用户级配置。

### `--repo`

仓库级配置。

### `--workspace`

工作区级配置。

### `--template`

自定义格式。可用 name、value、overridden、source、path；默认 templates.config_list。

### `--help`

显示帮助。

## 使用提醒

全局参数见 [Global Options](../../../concepts/global-options.md)。

**注意：** 不指定层级时检查合并后的配置；需要定位来源可用 -T builtin_config_list_detailed。

源码：[cli/src/commands/config/list.rs](https://github.com/jj-vcs/jj/blob/7c41cdeb16b6b321c64e789a966b6adf723816a5/cli/src/commands/config/list.rs)。
