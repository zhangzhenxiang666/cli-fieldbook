---
title: jj squash
command:
  - squash
---

## 简介

把来源修订的修改移动到目标修订。

## 参数

### `FILESETS`

只移动匹配文件的修改；省略则移动全部修改。

## 选项

### `--revision`

把该修订压入它的单个父修订；默认 @；与实验性 -o/-A/-B 不兼容。

### `--from`

来源集合；可重复。省略且使用显式目标时默认 @。

### `--into`

已有目标修订；默认 @；别名 --to。

### `--onto`

【实验性】目标父修订，可重复以形成多父提交；可见长别名 --destination。 此模式创建新提交，不是修改一个既有目标。 可见短别名 -d；源码未标记弃用。

### `--insert-after`

【实验性】插到这些修订之后，并重接其孩子；可重复；别名 --after。 此模式创建新提交，不是修改一个既有目标。

### `--insert-before`

【实验性】插到这些修订之前，并重接它们；可重复；别名 --before。 此模式创建新提交，不是修改一个既有目标。

### `--message`

设置合并后的描述，不打开描述编辑器。

### `--use-destination-message`

保留目标描述，丢弃来源描述。

### `--editor`

即使提供 --message 也打开描述编辑器。

### `--interactive`

交互选择补丁片段。

### `--tool`

指定 diff editor；隐含交互。

### `--keep-emptied`

来源被移空后也不 abandon。

### `--help`

显示帮助。

## 使用提醒

全局参数见 [Global Options](../../concepts/global-options.md)。

**注意：** 裸命令把 @ 的修改压入 @-；@ 是 merge 时需明确指定目标。来源变空通常会 abandon；如果工作 change 被 abandon，jj 会创建新的空工作 change。 -r 与 --from、--into 和位置选项互斥；--into 与 -o/-A/-B 互斥；-o 与 -A/-B 互斥；-A 和 -B 可组合。--use-destination-message 与 --message 互斥。

源码：[cli/src/commands/squash.rs](https://github.com/jj-vcs/jj/blob/7c41cdeb16b6b321c64e789a966b6adf723816a5/cli/src/commands/squash.rs)。
