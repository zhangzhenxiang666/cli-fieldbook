---
title: jj debug tree
command:
  - debug
  - tree
---

## 简介

递归列出 tree 的内部条目。

## 参数

### `FILESETS`

路径筛选。

## 选项

### `--revision`

从该修订取树；默认 @；与 --id 互斥。

### `--id`

直接指定完整十六进制 tree ID。

### `--dir`

指定该 tree 对应的目录；必须同时指定 --id；默认根目录。

### `--help`

显示帮助。

## 使用提醒

全局参数见 [Global Options](../../../concepts/global-options.md)。

**注意：** 开发者诊断接口，输出不保证稳定，不建议作为生产脚本协议。

源码：[cli/src/commands/debug/tree.rs](https://github.com/jj-vcs/jj/blob/7c41cdeb16b6b321c64e789a966b6adf723816a5/cli/src/commands/debug/tree.rs)。
