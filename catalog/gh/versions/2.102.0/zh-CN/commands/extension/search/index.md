---
title: gh extension search
command:
  - extension
  - search
---

搜索 gh 可安装的扩展。

## 简介

搜索 GitHub CLI 扩展。不带参数时，本命令按星数排序输出可安装的前 30 个扩展；需要更多结果可用 `--limit` 指定更大的数量。

连接到终端时输出三列：第一列在扩展已本地安装时显示 ✓；第二列为扩展仓库的 `OWNER/REPO` 全名；第三列为扩展的描述。未连接终端时，✓ 渲染为单词 `installed`，各列的顺序与内容不变。

本命令的行为类似 `gh search repos`，但不支持那么多搜索限定符。要更细粒度地搜索扩展，可以运行 `gh search repos --topic "gh-extension"` 并按需追加限定符；仓库搜索的更多说明见 `gh help search repos`。只列出本地已安装的扩展，见 [`gh extension list`](cli:command:extension/list)。

## 参数

### `QUERY`

格式：`[<query>]`。搜索关键词，可省略；省略时按简介所述列出可安装的扩展。

## 选项

### `--web`

短旗标 `-w`。格式：`--web`。在网页浏览器中打开该搜索查询。

### `--json`

格式：`--json <strings>`。按指定字段输出 JSON，字段为逗号分隔的列表。支持的字段：`createdAt`、`defaultBranch`、`description`、`forksCount`、`fullName`、`hasDownloads`、`hasIssues`、`hasPages`、`hasProjects`、`hasWiki`、`homepage`、`id`、`isArchived`、`isDisabled`、`isFork`、`isPrivate`、`language`、`license`、`name`、`openIssuesCount`、`owner`、`pushedAt`、`size`、`stargazersCount`、`updatedAt`、`url`、`visibility`、`watchersCount`。与 `--jq`、`--template` 的配合方式见 [JSON 输出与格式化](../../../reference/formatting.md)。

### `--jq`

短旗标 `-q`。格式：`--jq <expression>`。用 jq 表达式过滤 JSON 输出。

### `--template`

短旗标 `-t`。格式：`--template <string>`。用 Go 模板格式化 JSON 输出；参见 `gh help formatting`。

### `--limit`

短旗标 `-L`。格式：`--limit <int>`。获取扩展的最大数量。默认 `30`。

### `--order`

格式：`--order <string>`。返回仓库的顺序，仅在指定了 `--sort` 旗标时才生效。取值 `asc`、`desc`；默认 `desc`。

### `--sort`

格式：`--sort <string>`。对获取的仓库排序。取值 `forks`、`help-wanted-issues`、`stars`、`updated`；默认 `best-match`。

### `--license`

格式：`--license <strings>`。按许可证类型过滤，可给出多个值。

### `--owner`

格式：`--owner <strings>`。按所有者过滤，可给出多个值。

## 使用提醒

- `--web` 与 `--json` 不能同用；`--jq`、`--template` 必须与 `--json` 同给，只给格式旗标而不给字段列表会报错，见 [JSON 输出与格式化](../../../reference/formatting.md)。
- 搜索固定限定 topic `gh-extension`，结果只保留名称以 `gh-` 开头的仓库。
- 终端连接且无结果时，本命令报错 `no extensions found`。

## 示例

```sh
# 按星数降序列出前 30 个扩展
gh ext search

# 列出更多扩展
gh ext search --limit 300

# 列出匹配 “branch” 一词的扩展
gh ext search branch

# 列出组织 “github” 拥有的扩展
gh ext search --owner github

# 列出扩展，按最近更新时间升序排序
gh ext search --sort updated --order asc

# 按许可证过滤扩展
gh ext search --license MIT

# 在浏览器中打开搜索结果
gh ext search -w
```

以上示例为说明性内容，未实际运行。

## 源码补充

- 本命令是 [pkg/cmd/extension/command.go](https://github.com/cli/cli/blob/fc4b137cdef0a6bd28fd461b7cf9c84a5812a8cd/pkg/cmd/extension/command.go) 中 `NewCmdExtension` 内的闭包：查询固定附带 topic `gh-extension` 限定符，渲染时跳过名称不以 `gh-` 开头的结果。
- `--json`、`--jq`、`--template` 由 `AddJSONFlags` 统一注册，字段即 `search.RepositoryFields`，见 [pkg/cmdutil/json_flags.go](https://github.com/cli/cli/blob/fc4b137cdef0a6bd28fd461b7cf9c84a5812a8cd/pkg/cmdutil/json_flags.go)。
