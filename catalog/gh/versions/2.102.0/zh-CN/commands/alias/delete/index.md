---
title: gh alias delete
command:
  - alias
  - delete
---

删除已定义的别名，可按名称删除单个，或用 `--all` 一次删除全部。

## 简介

不带 `--all` 时必须给出要删除的别名名称；带 `--all` 时不能再给别名参数。每删除一个别名都会在终端输出一行提示，格式形如 `Deleted alias bugs; was issue list --label=bugs`。

别名不存在时报错；用 `--all` 删除时若没有配置任何别名，同样报错。

## 参数

### `ALIAS|ALL`

必填，写作 `{<alias> | --all}`。要删除的别名名称；或改用 `--all` 旗标删除全部别名。二者互斥，必须给出其一。

## 选项

### `--all`

格式：`--all`。删除全部别名，不能与别名参数同用。

## 使用提醒

- 省略别名又未加 `--all` 会报错；两者同时给出也会报错。
- 批量删除后可用 [`gh alias list`](cli:command:alias/list) 确认剩余别名。

## 示例

```sh
# 删除别名 bugs
gh alias delete bugs

# 删除全部别名
gh alias delete --all
```

以上示例为说明性内容，未实际运行。

## 源码补充

- 参数与 `--all` 的互斥检查、逐条删除逻辑见 [pkg/cmd/alias/delete/delete.go](https://github.com/cli/cli/blob/fc4b137cdef0a6bd28fd461b7cf9c84a5812a8cd/pkg/cmd/alias/delete/delete.go)。
