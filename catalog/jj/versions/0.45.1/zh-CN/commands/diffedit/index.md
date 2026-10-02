---
title: jj diffedit
command:
  - diffedit
---

## 简介

在差异编辑器中修改某个修订的内容。

## 参数

### `FILESETS`

可编辑路径；未匹配路径不变。

## 选项

### `--revision`

待修改修订；不指定 --from/--to 时默认 @。

### `--from`

左侧比较基线；只给 --to 时默认 @。

### `--to`

右侧待修改修订；只给 --from 时默认 @。

### `--tool`

指定差异编辑器。

### `--restore-descendants`

保持后代最终内容，而不是在新父提交上重放后代差异。

### `--help`

显示帮助。

## 使用提醒

全局参数见 [Global Options](../../concepts/global-options.md)。

**注意：** 编辑右侧内容。默认后代会随重写而变基，可能冲突。-r 与 --from/--to 是两种选择方式，不要混用。

源码：[cli/src/commands/diffedit.rs](https://github.com/jj-vcs/jj/blob/7c41cdeb16b6b321c64e789a966b6adf723816a5/cli/src/commands/diffedit.rs)。
