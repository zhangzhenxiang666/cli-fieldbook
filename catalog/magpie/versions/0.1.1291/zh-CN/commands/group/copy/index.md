---
title: magpie group copy
command:
  - group
  - copy
---

复制一个组:连同成员、routing 与规则,新组排在它后面。

## 简介

`magpie group copy <id> [name]` 完整复制一个组(models、routing、rules 等全部带上),生成一个新组;省略名称时用 `<原组名> copy`。别名:`magpie group duplicate`、`magpie group dup`、`magpie group clone`。

## 参数

### `id`

被复制的组 id。已移除(hidden)的组不能复制,需先 [`group restore`](cli:command:group/restore)。

### `name`

新组名,省略时为 `<原组名> copy`;新组的 id 由名称生成。

## 示例

```sh
magpie group copy opus-anywhere "Opus 实验"
```

以上示例为说明性内容,未实际运行。

## 源码补充

- copy 的分发与 `provider.CopyGroup` 调用见 [groups_cli.go](https://github.com/yetone/magpie/blob/33dbdcc529622cf0dd053c99eb34f51c06fbba77/internal/cli/groups_cli.go)。
