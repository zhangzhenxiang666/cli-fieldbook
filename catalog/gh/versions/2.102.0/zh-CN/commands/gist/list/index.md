---
title: gh gist list
command:
  - gist
  - list
---

列出当前账号的 gist，别名 `gh gist ls`。

## 简介

`gh gist list` 列出当前认证用户账号下的 gist，默认以表格输出，列为 ID、描述、文件数、可见性与更新时间。

可用 `--filter` 传入正则表达式，按描述、文件名过滤，配合 `--include-content` 时还能按文件内容过滤。正则采用 POSIX 语法，支持的语法见 [regexp/syntax 文档](https://pkg.go.dev/regexp/syntax)。

启用 `--include-content` 后不再输出表格，改为类似 `gh search code` 的片段输出：gist ID 与文件名一行，下面缩进显示描述与内容中匹配的行。该模式更慢，也会消耗更多 API 配额；输出被重定向时不打印高亮与其他颜色。

## 选项

### `--limit`

短旗标 `-L`。格式：`--limit <int>`。最多获取的 gist 条数，默认 `10`；小于 `1` 时报错。

### `--public`

格式：`--public`。只显示公开 gist。

### `--secret`

格式：`--secret`。只显示机密 gist。

### `--filter`

格式：`--filter <expression>`。用正则表达式过滤 gist，匹配范围为描述与文件名，配合 `--include-content` 时还包括文件内容。

### `--include-content`

格式：`--include-content`。过滤时把文件内容也纳入匹配范围，并以片段形式输出匹配行；必须与 `--filter` 同用，单独给出会报错。

## 使用提醒

- `--public` 与 `--secret` 同时给出时以 `--secret` 为准；两者都不给时全部列出。
- 没有任何 gist 可列出时，命令以失败结束并提示未找到 gist。

## 示例

```sh
# 列出账号中全部机密 gist
gh gist list --secret

# 查找账号中任意位置提到 "octo" 的 gist
gh gist list --filter octo --include-content
```

以上示例为说明性内容，未实际运行。

## 源码补充

- 命令定义、过滤逻辑与表格/片段两种输出见 [pkg/cmd/gist/list/list.go](https://github.com/cli/cli/blob/fc4b137cdef0a6bd28fd461b7cf9c84a5812a8cd/pkg/cmd/gist/list/list.go)。
