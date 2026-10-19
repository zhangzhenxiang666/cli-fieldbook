---
title: magpie group show
command:
  - group
  - show
---

显示一个组的完整详情,与 [`magpie group <id>`](cli:command:group) 等价。

## 简介

按 id 列出组的 routing、stays、成员(编号,注明 fast、weight、by pattern 等属性)、模式命中数、规则、levels、effort、classifier 与使用它的 agent。`group set`、`group add` 等修改类命令完成后也会自动打印这份详情。

## 参数

### `id`

组 id。

## 使用提醒

- 已移除(hidden)的组不能 show:会提示先用 [`group restore`](cli:command:group/restore) 找回。

## 源码补充

- `showGroup` 见 [groups_cli.go](https://github.com/yetone/magpie/blob/33dbdcc529622cf0dd053c99eb34f51c06fbba77/internal/cli/groups_cli.go)。
