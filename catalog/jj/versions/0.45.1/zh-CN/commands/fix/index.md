---
title: jj fix
command:
  - fix
---

## 简介

用已配置的文件转换器修复选定修订及其后代。

## 参数

### `FILESETS`

只处理这些路径。

## 选项

### `--source`

起始修订及其后代；默认 revsets.fix，内置为 reachable(@, mutable())。

### `--include-unchanged-files`

也处理未修改文件；不限制路径时可处理整个仓库。

### `--all-lines`

处理整文件所有行，而非仅修改行；格式化器不支持行范围时无区别。

### `--help`

显示帮助。

## 使用提醒

全局参数见 [Global Options](../../concepts/global-options.md)。

**注意：** 先配置 fix.tools。转换器从标准输入读取内容并输出替代内容，应有确定性；相同路径/内容会去重执行。不是任意仓库级命令的通用运行器，那是 jj run。

源码：[cli/src/commands/fix.rs](https://github.com/jj-vcs/jj/blob/7c41cdeb16b6b321c64e789a966b6adf723816a5/cli/src/commands/fix.rs)。
