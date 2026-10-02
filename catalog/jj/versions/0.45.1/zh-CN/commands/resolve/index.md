---
title: jj resolve
command:
  - resolve
---

## 简介

使用外部三方合并工具处理冲突文件。

## 参数

### `FILESETS`

只处理匹配路径；省略表示所有可处理冲突。

## 选项

### `--revision`

要处理的修订；默认 @。

### `--list`

只列出冲突，不启动工具。

### `--tool`

选择三方合并工具；内置 :ours / :theirs 分别采用冲突第 1 / 第 2 侧。

### `--help`

显示帮助。

## 使用提醒

全局参数见 [Global Options](../../concepts/global-options.md)。

**注意：** 只支持能表示为三方合并的冲突；也可以直接编辑文件中的冲突标记后运行 jj status，让 jj 快照结果。多父合并中的 ours/theirs 不能简单套用某个远端名。

源码：[cli/src/commands/resolve.rs](https://github.com/jj-vcs/jj/blob/7c41cdeb16b6b321c64e789a966b6adf723816a5/cli/src/commands/resolve.rs)。
