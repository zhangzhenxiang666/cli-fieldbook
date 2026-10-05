---
title: gh search issues
command:
  - search
  - issues
---

在 GitHub 上搜索议题。

## 简介

本命令支持三种构造查询的方式：GitHub 搜索语法（关键词与 `label:`、`author:` 等限定符）、限定符旗标，或两者组合；搜索语法见官方文档 [Searching issues and pull requests](https://docs.github.com/search-github/searching-on-github/searching-issues-and-pull-requests)。

在支持高级议题搜索的 GitHub 主机上，查询中可以使用高级搜索语法：`OR`、`AND` 等布尔运算符与用于嵌套的括号必须作为独立参数传递，不能放进带引号的多词字符串里；`--web` 不支持该语法。高级搜索的说明见官方文档 [building advanced filters for issues](https://docs.github.com/en/issues/tracking-your-work-with-issues/using-issues/filtering-and-searching-issues-and-pull-requests#building-advanced-filters-for-issues)。

`--search-type` 可选择用语义（`semantic`）或混合（`hybrid`，关键词 + 语义）排序代替默认的词法（`lexical`）检索。语义与混合检索只作用于议题、按相关度排序（不能使用 `--sort` 与 `--order`）、只返回一页结果，且在 GitHub Enterprise Server 上不可用。

查询中包含以连字符开头的限定符（如 `-label:bug`）时的处理方式，见 [`gh search`](cli:command:search)。

## 参数

### `QUERY`

格式：`[<query>]`。可选的搜索关键词或 GitHub 搜索语法表达式，可由多个词项组成；省略时仍须至少给出一个旗标。

## 选项

### `--json`

格式：`--json <strings>`。把结果导出为 JSON，值为逗号分隔的字段列表。支持字段：`assignees`、`author`、`authorAssociation`、`body`、`closedAt`、`commentsCount`、`createdAt`、`id`、`isLocked`、`isPullRequest`、`labels`、`number`、`repository`、`state`、`title`、`updatedAt`、`url`。导出结果可用 `--jq` 或 `--template` 进一步加工，见 [JSON 输出与格式化](../../../reference/formatting.md)。

### `--jq`

短旗标 `-q`。格式：`--jq <expression>`。按 jq 表达式筛选或重组 `--json` 导出的结果，需与 `--json` 同用。

### `--template`

短旗标 `-t`。格式：`--template <string>`。按 Go 模板渲染 `--json` 导出的结果，需与 `--json` 同用。

### `--web`

短旗标 `-w`。格式：`--web`。不在终端输出结果，而是在浏览器中打开本次搜索查询；不支持高级搜索语法与语义/混合检索。

### `--limit`

短旗标 `-L`。格式：`--limit <int>`。最多获取的结果条数，默认 `30`；取值须在 1 到 1000 之间，超出范围报错。

### `--order`

格式：`--order <string>`。返回结果的排序方向，取值 `asc`、`desc`，默认 `desc`；仅在同时指定 `--sort` 时生效。

### `--sort`

格式：`--sort <string>`。对获取的结果排序，取值 `comments`、`created`、`interactions`、`reactions`、`reactions-+1`、`reactions--1`、`reactions-heart`、`reactions-smile`、`reactions-tada`、`reactions-thinking_face`、`updated`，默认按最佳匹配（`best-match`）排序。

### `--search-type`

格式：`--search-type <string>`。议题检索的类型，取值 `lexical`、`semantic`、`hybrid`，默认 `lexical`。

### `--include-prs`

格式：`--include-prs`。把拉取请求也纳入结果。

### `--app`

格式：`--app <string>`。按 GitHub App 作者过滤；与 `--author` 互斥。

### `--archived`

格式：`--archived`。按仓库是否已归档过滤，取值 `true`/`false`；默认不过滤（包含全部仓库）。

### `--assignee`

格式：`--assignee <string>`。按指派人过滤，`@me` 表示自己。

### `--author`

格式：`--author <string>`。按作者过滤（按 GitHub App 作者过滤须改用 `--app`），`@me` 表示自己。

### `--closed`

格式：`--closed <date>`。按关闭日期过滤，支持日期范围写法。

### `--commenter`

格式：`--commenter <user>`。按发表过评论的用户过滤。

### `--comments`

格式：`--comments <number>`。按评论数过滤，支持 `--comments=">100"` 这类范围写法。

### `--created`

格式：`--created <date>`。按创建日期过滤，支持日期范围写法。

### `--match`

格式：`--match <strings>`。把关键词匹配限定到议题的特定字段，取值 `title`、`body`、`comments`。

### `--interactions`

格式：`--interactions <number>`。按表情反应与评论的总数过滤，支持范围写法。

### `--involves`

格式：`--involves <user>`。按某用户的参与情况过滤。

### `--visibility`

格式：`--visibility <strings>`。按仓库可见性过滤，取值 `public`、`private`、`internal`。

### `--label`

格式：`--label <strings>`。按标签过滤，可给出多个。

### `--language`

格式：`--language <string>`。按仓库的编程语言过滤。

### `--locked`

格式：`--locked`。按对话锁定状态过滤；给出 `--locked=false` 则匹配未锁定的对话。

### `--mentions`

格式：`--mentions <user>`。按正文中提及某用户过滤。

### `--milestone`

格式：`--milestone <title>`。按里程碑标题过滤。

### `--no-assignee`

格式：`--no-assignee`。筛选没有指派人的议题。

### `--no-label`

格式：`--no-label`。筛选没有标签的议题。

### `--no-milestone`

格式：`--no-milestone`。筛选没有里程碑的议题。

### `--no-project`

格式：`--no-project`。筛选未关联项目的议题。

### `--project`

格式：`--project <owner/number>`。按项目板过滤，值为 `owner/number`。

### `--reactions`

格式：`--reactions <number>`。按表情反应数过滤，支持 `--reactions=">100"` 这类范围写法。

### `--repo`

短旗标 `-R`。格式：`--repo <OWNER/REPO>`。按 `OWNER/REPO` 格式的仓库过滤，可多次给出。

### `--state`

格式：`--state <string>`。按议题状态过滤，取值 `open`、`closed`。

### `--team-mentions`

格式：`--team-mentions <string>`。按提及的团队过滤。

### `--updated`

格式：`--updated <date>`。按最后更新日期过滤，支持日期范围写法。

### `--owner`

格式：`--owner <strings>`。按仓库所有者过滤，可给出多个。

## 使用提醒

- `--author` 与 `--app` 只能二选一，同时给出会报错。
- `semantic`/`hybrid` 检索不能与 `--web`、`--include-prs`、`--sort`、`--order` 组合，同时给出会报错。
- 高级搜索语法的布尔运算符与括号必须作为独立参数传递，不能放进带引号的字符串；`--web` 不支持该语法。
- 至少给出搜索关键词或一个旗标，否则命令报错。
- 搜索结果为空且未用 `--json` 导出时，命令以失败结束并提示没有匹配结果。

## 示例

```sh
# 搜索同时匹配关键词 "readme" 与 "typo" 的议题
gh search issues readme typo

# 搜索匹配短语 "broken feature" 的议题
gh search issues "broken feature"

# 用原始搜索限定符作为独立参数搜索
gh search issues label:bug author:monalisa state:open

# 搜索 cli 组织的议题与拉取请求
gh search issues --include-prs --owner=cli

# 搜索指派给自己的开放议题
gh search issues --assignee=@me --state=open

# 搜索评论数众多的议题
gh search issues --comments=">100"

# 搜索不带 "bug" 标签的议题
gh search issues -- -label:bug

# 只搜索未归档仓库的议题（默认为全部仓库）
gh search issues --owner github --archived=false

# 用语义（自然语言）排序搜索议题
gh search issues "feature broken on web" --search-type semantic

# 用混合（关键词 + 语义）排序搜索议题
gh search issues "feature broken" --search-type hybrid
```

以上示例为说明性内容，未实际运行。

## 源码补充

- 命令定义、检索类型与互斥检查见 [pkg/cmd/search/issues/issues.go](https://github.com/cli/cli/blob/fc4b137cdef0a6bd28fd461b7cf9c84a5812a8cd/pkg/cmd/search/issues/issues.go)。
- 议题与拉取请求共用的搜索执行与表格输出见 [pkg/cmd/search/shared/shared.go](https://github.com/cli/cli/blob/fc4b137cdef0a6bd28fd461b7cf9c84a5812a8cd/pkg/cmd/search/shared/shared.go)。
