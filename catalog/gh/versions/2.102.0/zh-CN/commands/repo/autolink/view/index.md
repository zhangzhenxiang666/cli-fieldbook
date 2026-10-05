---
title: gh repo autolink view
command:
  - repo
  - autolink
  - view
---

## 简介

查看仓库的某个自动链接，输出其 ID、键前缀、URL 模板与是否字母数字型。

## 参数

### `ID`

格式：`<id>`。自动链接 ID，可从 [gh repo autolink list](cli:command:repo/autolink/list) 的输出获得。

## 选项

### `--json`

格式：`--json <strings>`。按指定字段输出 JSON。可选字段：`id`、`isAlphanumeric`、`keyPrefix`、`urlTemplate`。

### `--jq`

短旗标 `-q`。格式：`--jq <expression>`。用 jq 表达式过滤 JSON 输出。

### `--template`

短旗标 `-t`。格式：`--template <string>`。用 Go 模板格式化 JSON 输出，语法参见 `gh help formatting`。

## 使用提醒

- `--template` 必须与 `--json` 同用；组合用法见 [JSON 输出与格式化](../../../../reference/formatting.md)。
- 继承 [gh repo autolink](cli:command:repo/autolink) 的 `--repo`。

## 示例

```sh
# 查看当前仓库 ID 为 1 的自动链接
gh repo autolink view 1

# 以 JSON 输出全部字段
gh repo autolink view 1 --json id,isAlphanumeric,keyPrefix,urlTemplate
```

以上示例为说明性内容，未实际运行。

## 源码补充

- 查询与字段渲染见 [pkg/cmd/repo/autolink/view/view.go](https://github.com/cli/cli/blob/fc4b137cdef0a6bd28fd461b7cf9c84a5812a8cd/pkg/cmd/repo/autolink/view/view.go)。
