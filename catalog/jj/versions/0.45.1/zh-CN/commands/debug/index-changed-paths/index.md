---
title: jj debug index-changed-paths
command:
  - debug
  - index-changed-paths
---

## 简介

构建 changed-path 索引。

## 选项

### `--limit`

最多索引多少个修订；默认 u32::MAX，即 4294967295。

### `--help`

显示帮助。

## 使用提醒

全局参数见 [Global Options](../../../concepts/global-options.md)。

**注意：** 开发者诊断接口，输出不保证稳定，不建议作为生产脚本协议。会写索引，需要支持的默认索引后端。

源码：[cli/src/commands/debug/index_changed_paths.rs](https://github.com/jj-vcs/jj/blob/7c41cdeb16b6b321c64e789a966b6adf723816a5/cli/src/commands/debug/index_changed_paths.rs)。
