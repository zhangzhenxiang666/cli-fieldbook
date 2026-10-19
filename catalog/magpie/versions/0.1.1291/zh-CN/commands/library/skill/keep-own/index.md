---
title: magpie library skill keep-own
command:
  - library
  - skill
  - keep-own
---

library skill keep-own —— 同名技能冲突时,保留 agent 自己的技能。

## 简介

与 [`library skill use-library`](cli:command:library/skill/use-library) 相对:保留该 agent 自己的同名技能,并把这个 agent 从库技能的接收列表里去掉。

## 参数

### `name`

`<name>`。技能名称。

### `agent`

`<agent>`。发生冲突的 agent。

## 使用提醒

- 该 agent 从此不再接收库里的这个技能;其他 agent 不受影响。
- 之后想改用库的技能,运行 [`library skill use-library`](cli:command:library/skill/use-library)。

## 示例

```sh
magpie library skill keep-own magpie-quota claude
```

以上示例为说明性内容,未实际运行。

## 源码补充

- 命令入口见 [library_cli.go](https://github.com/yetone/magpie/blob/33dbdcc529622cf0dd053c99eb34f51c06fbba77/internal/cli/library_cli.go)。
