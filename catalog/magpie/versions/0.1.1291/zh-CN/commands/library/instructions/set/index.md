---
title: magpie library instructions set
command:
  - library
  - instructions
  - set
---

library instructions set —— 用一个文件的文本替换共享指示。

## 简介

读取指定文件的全文,替换库的共享指示,并写入各个接收它的 agent。文件参数为 `-` 时改读标准输入,便于管道传入。

## 参数

### `file`

`<file|->`。指示文本的来源文件;`-` 表示从标准输入读取。

## 使用提醒

- 替换是整段替换:之前的共享指示不再保留(改动前的 agent 文件有备份)。
- 指示文本写入 agent 指示文件时位于 magpie 的标记行之间;文件里用户自己的部分不受影响。

## 示例

```sh
magpie library instructions set ~/agents-shared.md
cat notes.md | magpie library instructions set -
```

以上示例为说明性内容,未实际运行。

## 源码补充

- 读取与保存逻辑见 [library_cli.go](https://github.com/yetone/magpie/blob/33dbdcc529622cf0dd053c99eb34f51c06fbba77/internal/cli/library_cli.go)。
