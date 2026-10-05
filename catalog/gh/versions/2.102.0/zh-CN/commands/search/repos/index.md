---
title: gh search repos
command:
  - search
  - repos
---

在 GitHub 上搜索仓库。

## 简介

本命令支持三种构造查询的方式：GitHub 搜索语法（关键词与 `topic:`、`stars:` 等限定符）、限定符旗标，或两者组合；搜索语法见官方文档 [Searching for repositories](https://docs.github.com/search-github/searching-on-github/searching-for-repositories)。

查询中包含以连字符开头的限定符（如 `-topic:linux`）时的处理方式，见 [`gh search`](cli:command:search)。

## 参数

### `QUERY`

格式：`[<query>]`。可选的搜索关键词或 GitHub 搜索语法表达式，可由多个词项组成；省略时仍须至少给出一个旗标。

## 选项

### `--json`

格式：`--json <strings>`。把结果导出为 JSON，值为逗号分隔的字段列表。支持字段：`createdAt`、`defaultBranch`、`description`、`forksCount`、`fullName`、`hasDownloads`、`hasIssues`、`hasPages`、`hasProjects`、`hasWiki`、`homepage`、`id`、`isArchived`、`isDisabled`、`isFork`、`isPrivate`、`language`、`license`、`name`、`openIssuesCount`、`owner`、`pushedAt`、`size`、`stargazersCount`、`updatedAt`、`url`、`visibility`、`watchersCount`。导出结果可用 `--jq` 或 `--template` 进一步加工，见 [JSON 输出与格式化](../../../reference/formatting.md)。

### `--jq`

短旗标 `-q`。格式：`--jq <expression>`。按 jq 表达式筛选或重组 `--json` 导出的结果，需与 `--json` 同用。

### `--template`

短旗标 `-t`。格式：`--template <string>`。按 Go 模板渲染 `--json` 导出的结果，需与 `--json` 同用。

### `--web`

短旗标 `-w`。格式：`--web`。不在终端输出结果，而是在浏览器中打开本次搜索查询。

### `--limit`

短旗标 `-L`。格式：`--limit <int>`。最多获取的仓库数，默认 `30`；取值须在 1 到 1000 之间，超出范围报错。

### `--order`

格式：`--order <string>`。返回结果的排序方向，取值 `asc`、`desc`，默认 `desc`；仅在同时指定 `--sort` 时生效。

### `--sort`

格式：`--sort <string>`。对获取的仓库排序，取值 `forks`、`help-wanted-issues`、`stars`、`updated`，默认按最佳匹配（`best-match`）排序。

### `--archived`

格式：`--archived`。按是否已归档过滤，取值 `true`/`false`；默认不过滤（包含全部仓库）。

### `--created`

格式：`--created <date>`。按创建日期过滤，支持日期范围写法。

### `--followers`

格式：`--followers <number>`。按关注者数量过滤，支持范围写法。

### `--include-forks`

格式：`--include-forks <string>`。控制结果中是否包含复刻仓库，取值 `false`、`true`、`only`（仅返回复刻仓库）。

### `--forks`

格式：`--forks <number>`。按复刻数过滤，支持范围写法。

### `--good-first-issues`

格式：`--good-first-issues <number>`。按带有 'good first issue' 标签的议题数过滤，支持 `--good-first-issues=">=10"` 这类范围写法。

### `--help-wanted-issues`

格式：`--help-wanted-issues <number>`。按带有 'help wanted' 标签的议题数过滤，支持范围写法。

### `--match`

格式：`--match <strings>`。把关键词匹配限定到仓库的特定字段，取值 `name`、`description`、`readme`。

### `--visibility`

格式：`--visibility <strings>`。按可见性过滤，取值 `public`、`private`、`internal`。

### `--language`

格式：`--language <string>`。按编程语言过滤。

### `--license`

格式：`--license <strings>`。按许可证类型过滤，可给出多个。

### `--updated`

格式：`--updated <date>`。按最后更新日期过滤，支持日期范围写法。

### `--size`

格式：`--size <string>`。按仓库大小范围过滤，单位为 KB。

### `--stars`

格式：`--stars <number>`。按星标数过滤，支持范围写法。

### `--topic`

格式：`--topic <strings>`。按主题过滤，可给出多个。

### `--number-topics`

格式：`--number-topics <number>`。按主题数量过滤，支持范围写法。

### `--owner`

格式：`--owner <strings>`。按所有者过滤，可给出多个。

## 使用提醒

- 至少给出搜索关键词或一个旗标，否则命令报错。
- `--order` 只在同时指定 `--sort` 时生效；不排序时结果按最佳匹配排列。
- 数量类旗标支持 GitHub 搜索语法的范围写法（如 `>100`、`>=10`）。
- 搜索结果为空且未用 `--json` 导出时，命令以失败结束并提示没有匹配的仓库。

## 示例

```sh
# 搜索同时匹配关键词 "cli" 与 "shell" 的仓库
gh search repos cli shell

# 搜索匹配短语 "vim plugin" 的仓库
gh search repos "vim plugin"

# 用原始搜索限定符作为独立参数搜索
gh search repos topic:github 'stars:>5000'

# 搜索 microsoft 组织的公开仓库
gh search repos --owner=microsoft --visibility=public

# 搜索带一组主题的仓库
gh search repos --topic=unix,terminal

# 按编程语言与 good first issue 数量搜索仓库
gh search repos --language=go --good-first-issues=">=10"

# 搜索不带 "linux" 主题的仓库
gh search repos -- -topic:linux

# 搜索排除已归档仓库后的仓库
gh search repos --archived=false
```

以上示例为说明性内容，未实际运行。

## 源码补充

- 命令定义、排序旗标与限定符注册见 [pkg/cmd/search/repos/repos.go](https://github.com/cli/cli/blob/fc4b137cdef0a6bd28fd461b7cf9c84a5812a8cd/pkg/cmd/search/repos/repos.go)。
