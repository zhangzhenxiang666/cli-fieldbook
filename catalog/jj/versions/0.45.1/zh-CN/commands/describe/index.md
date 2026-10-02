---
title: jj describe
command:
  - describe
---

## 简介

修改 change 描述。

## 参数

### `REVSETS`

要编辑描述的修订；默认 @；支持 -r 形式。

## 选项

### `--message`

直接指定描述，可重复组成段落；多修订共用该描述。

### `--stdin`

从标准输入读取描述；多修订共用。

### `--editor`

在 --message/--stdin 提供初始文本后仍打开编辑器。

### `--help`

显示帮助。

## 使用提醒

全局参数见 [Global Options](../../concepts/global-options.md)。

**Hidden / Compatibility Options（源码补充，不是普通 help 可见项）**

```text
  -r <REVSETS>
          位置修订参数的隐藏便捷写法；可重复并与位置参数合并；不是 --revision 长选项。
```

**注意：** 可一次修改多个修订描述。-m 可重复，按段落连接；--stdin 与 --message 互斥。v0.45.1 没有 describe --author；作者等元数据请使用 metaedit。

源码：[cli/src/commands/describe.rs](https://github.com/jj-vcs/jj/blob/7c41cdeb16b6b321c64e789a966b6adf723816a5/cli/src/commands/describe.rs)。
