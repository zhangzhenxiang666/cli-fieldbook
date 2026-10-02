---
title: jj diff
command:
  - diff
---

## 简介

比较两个修订的文件内容，或显示一个修订集合引入的净变化。

## 参数

### `FILESETS`

只显示匹配路径。

## 选项

### `--revisions`

显示这些修订合计引入的变化；默认 -r @。集合不能在同一链上留空洞。

### `--from`

左侧修订；只指定 --to 时这里默认 @。

### `--to`

右侧修订；只指定 --from 时这里默认 @。

### `--template`

每个文件差异的模板，类型 TreeDiffEntry。

### `--help`

显示帮助。

## 使用提醒

全局参数见 [Global Options](../../concepts/global-options.md)。

**Hidden / Compatibility Options（源码补充，不是普通 help 可见项）**

```text
  --revision <REVSETS>
          --revisions 的隐藏长别名；本命令的公开拼写是复数 --revisions。
```

**注意：** 比较 merge 提交时，-r 的基线是父提交自动合并后的内容。此命令另外支持 -w = --ignore-all-space、-b = --ignore-space-change。 -r 与 --from/--to 互斥；--template 与内置差异格式及 --tool 互斥。

源码：[cli/src/commands/diff.rs](https://github.com/jj-vcs/jj/blob/7c41cdeb16b6b321c64e789a966b6adf723816a5/cli/src/commands/diff.rs)。
