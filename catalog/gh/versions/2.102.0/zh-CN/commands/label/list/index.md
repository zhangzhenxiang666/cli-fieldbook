---
title: gh label list
command:
  - label
  - list
---

列出仓库中的标签，别名 `gh label ls`。

## 简介

`gh label list` 以表格显示目标仓库的标签，列为名称、描述与颜色（`#` 加十六进制色值）。使用 `--search` 时结果按查询的最佳匹配排序，该行为无法用 `--order` 或 `--sort` 改变，与二者同时给出会直接报错。

不搜索时，可按创建时间或名称排序，并以升序或降序返回；也可用 `--web` 改为在浏览器中打开标签页面。

## 选项

### `--web`

短旗标 `-w`。格式：`--web`。在浏览器中打开仓库的标签页面，而不在终端列出。与 `--json` 互斥。

### `--limit`

短旗标 `-L`。格式：`--limit <int>`。最多获取的标签条数，默认 `30`；小于 `1` 时报错。

### `--search`

短旗标 `-S`。格式：`--search <string>`。按关键词搜索标签的名称与描述，结果按最佳匹配排序；与 `--order`、`--sort` 互斥。

### `--order`

格式：`--order <string>`。返回标签的顺序，取值 `asc`（升序）或 `desc`（降序），默认 `asc`。

### `--sort`

格式：`--sort <string>`。获取标签的排序字段，取值 `created`（创建时间）或 `name`（名称），默认 `created`。

### `--json`

格式：`--json <strings>`。把结果导出为 JSON，值为逗号分隔的字段列表。支持字段：`color`、`createdAt`、`description`、`id`、`isDefault`、`name`、`updatedAt`、`url`。导出结果可用 `--jq` 或 `--template` 进一步加工，见 [JSON 输出与格式化](../../../reference/formatting.md)。

### `--jq`

短旗标 `-q`。格式：`--jq <expression>`。按 jq 表达式筛选或重组 `--json` 导出的结果，需与 `--json` 同用。

### `--template`

短旗标 `-t`。格式：`--template <string>`。按 Go 模板渲染 `--json` 导出的结果，需与 `--json` 同用。

## 环境变量

- `GH_COLOR_LABELS`：在支持真彩的终端以 RGB 十六进制色码显示标签，见[环境变量](../../../reference/environment.md)。

## 使用提醒

- 结果为空时命令以失败结束：无搜索词时提示仓库中没有标签，有搜索词时提示没有匹配的标签。
- 仓库标签总数超过 `--limit` 时，表格上方会显示已列出条数与总数。

## 示例

```sh
# 按名称排序标签
gh label list --sort name

# 查找名称或描述中含 "bug" 的标签
gh label list --search bug
```

以上示例为说明性内容，未实际运行。

## 源码补充

- 命令定义、排序参数与 GraphQL 查询见 [pkg/cmd/label/list.go](https://github.com/cli/cli/blob/fc4b137cdef0a6bd28fd461b7cf9c84a5812a8cd/pkg/cmd/label/list.go) 与 [pkg/cmd/label/http.go](https://github.com/cli/cli/blob/fc4b137cdef0a6bd28fd461b7cf9c84a5812a8cd/pkg/cmd/label/http.go)。
