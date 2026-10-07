---
title: gh release list
command:
  - release
  - list
---

以表格列出仓库中的 release。别名 `ls`。

## 简介

默认输出四列表格：Title、Type、Tag name、Published。标题为空时回退显示 tag 名；Type 列依次按 Latest、Draft、Pre-release 显示徽标（三者互斥，Latest 优先）；未发布的草稿在 Published 列回退显示创建时间。仓库中没有满足条件的 release 时命令报错 "no releases found"。

默认最多获取 30 条、按创建时间降序排列，可用 `--limit` 与 `--order` 调整，用 `--exclude-drafts`、`--exclude-pre-releases` 过滤。结果可经 `--json` 导出为 JSON 并用 `--jq`、`--template` 加工，语法见 [JSON 输出与格式化](../../../reference/formatting.md)。

## 选项

### `--limit`

短旗标 `-L`。格式：`--limit <int>`。最多获取的条目数，默认 `30`。取值小于 1 时报错。

### `--exclude-drafts`

格式：`--exclude-drafts`。排除草稿 release。

### `--exclude-pre-releases`

格式：`--exclude-pre-releases`。排除 prerelease。

### `--order`

短旗标 `-O`。格式：`--order <string>`。返回 release 的排序方向，取值 `asc` 或 `desc`，默认 `desc`。

### `--json`

格式：`--json <strings>`。把结果导出为 JSON，参数为逗号分隔的字段列表。本命令支持的字段：`name`、`tagName`、`isDraft`、`isLatest`、`isPrerelease`、`isImmutable`、`createdAt`、`publishedAt`。

### `--jq`

短旗标 `-q`。格式：`--jq <expression>`。按 jq 表达式过滤或重组 JSON 输出，须与 `--json` 同用。

### `--template`

短旗标 `-t`。格式：`--template <string>`。用 Go 模板渲染 JSON 输出，须与 `--json` 同用。

## 使用提醒

- 本命令不接受位置参数，目标仓库用继承选项 `-R`/`--repo` 切换。
- `--jq`、`--template` 不能脱离 `--json` 单独使用。
- 表格输出经分页器展示；无结果时以错误退出而非输出空表。

## 示例

```sh
# 列出当前仓库的 release（默认 30 条、降序）
gh release list

# 只看正式发布版本，最多 10 条、按时间升序
gh release list --limit 10 --order asc --exclude-drafts --exclude-pre-releases

# 以 JSON 输出 tag 名与发布时间
gh release list --json tagName,publishedAt
```

以上示例为说明性内容，未实际运行。

## 源码补充

- 命令定义、表格列与徽标逻辑见 [pkg/cmd/release/list/list.go](https://github.com/cli/cli/blob/fc4b137cdef0a6bd28fd461b7cf9c84a5812a8cd/pkg/cmd/release/list/list.go)，API 请求见同目录 [http.go](https://github.com/cli/cli/blob/fc4b137cdef0a6bd28fd461b7cf9c84a5812a8cd/pkg/cmd/release/list/http.go)。
- `isImmutable` 字段依赖对仓库所在主机的特性检测（GHES 旧版本可能不支持不可变 release），检测逻辑位于 internal/featuredetection。
- `--json`/`--jq`/`--template` 由 `AddJSONFlags` 统一注册，见 [pkg/cmdutil/json_flags.go](https://github.com/cli/cli/blob/fc4b137cdef0a6bd28fd461b7cf9c84a5812a8cd/pkg/cmdutil/json_flags.go)。
