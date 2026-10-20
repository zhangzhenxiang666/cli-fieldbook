---
title: magpie library skill agents
command:
  - library
  - skill
  - agents
---

library skill agents —— 设置接收某个技能的 agent。

## 简介

把接收指定技能的 agent 集合设为给定列表,随即按各 agent 的方式(链接或副本)写入。每个 agent 会被校验能否接收技能,不能的报错。

## 参数

### `name`

`<name>`。技能名称,须是库里已有的。

### `agents`

`<a,b…|none>`。逗号分隔的 agent 列表;`none` 表示没有任何 agent 接收它(空白项被忽略)。

## 使用提醒

- 校验失败时整条命令报错,不做部分修改。
- 保存在共享目录 `~/.agents/skills` 的技能由读该目录的 agent 自行读取,不在逐 agent 的写入范围内。

## 示例

```sh
magpie library skill agents magpie-quota claude,codex
magpie library skill agents magpie-quota none
```

以上示例为说明性内容,未实际运行。

## 源码补充

- 列表解析与校验见 [library_cli.go](https://github.com/yetone/magpie/blob/33dbdcc529622cf0dd053c99eb34f51c06fbba77/internal/cli/library_cli.go)。
