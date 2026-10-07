---
title: gh pr view
command:
  - pr
  - view
---

查看一个拉取请求的详细信息。

## 简介

显示拉取请求的标题、正文及其他信息（作者、标签、指派人、评审人、里程碑、增删行数、自动合并状态等）。不带参数时显示当前分支所属的拉取请求。

用 `--web` 改为在网页浏览器中打开拉取请求。

## 参数

### `NUMBER|URL|BRANCH`

可选，命令形态为 `[<number> | <url> | <branch>]`。定位目标拉取请求，三种形式：

- 数字：拉取请求编号，如 `123`；
- URL：拉取请求地址，如 `https://github.com/OWNER/REPO/pull/123`；
- 分支名：头部分支名，如 `patch-1`，跨仓库时可用 `OWNER:patch-1`。

省略时默认选择当前分支所属的拉取请求。

## 选项

### `--web`

短旗标 `-w`。格式：`--web`。在浏览器中打开拉取请求。

### `--comments`

短旗标 `-c`。格式：`--comments`。查看拉取请求评论。

### `--json`

格式：`--json <strings>`。以 JSON 输出指定字段。取值 `assignees`、`author`、`body`、`closed`、`comments`、`createdAt`、`closedAt`、`id`、`labels`、`milestone`、`number`、`projectCards`、`projectItems`、`reactionGroups`、`state`、`title`、`updatedAt`、`url`、`additions`、`autoMergeRequest`、`baseRefName`、`baseRefOid`、`changedFiles`、`closingIssuesReferences`、`commits`、`deletions`、`files`、`fullDatabaseId`、`headRefName`、`headRefOid`、`headRepository`、`headRepositoryOwner`、`isCrossRepository`、`isDraft`、`latestReviews`、`maintainerCanModify`、`mergeable`、`mergeCommit`、`mergedAt`、`mergedBy`、`mergeStateStatus`、`potentialMergeCommit`、`reviewDecision`、`reviewRequests`、`reviews`、`statusCheckRollup`。

### `--jq`

短旗标 `-q`。格式：`--jq <expression>`。用 jq `expression` 过滤 JSON 输出，仅在给出 `--json` 时可用。

### `--template`

短旗标 `-t`。格式：`--template <string>`。用 Go 模板格式化 JSON 输出，参见 `gh help formatting`（详见[格式化](../../../reference/formatting.md)）；仅在给出 `--json` 时可用。

## 环境变量

- `GH_MDWIDTH`：正文 Markdown 渲染换行的默认最大宽度，详见[环境变量](../../../reference/environment.md)。

## 使用提醒

- `--comments` 与 `--json` 互斥，同时给出会报错。
- `--json` 与 `--web` 互斥；`--json` 字段必须在取值范围内，未知字段会报错并列出可用字段。
- 使用 `-R` 指定仓库时必须显式给出参数，否则报错。
- 输出重定向到非终端时，以 `title:`、`state:`、`author:` 等键值形式输出原始字段而非渲染后的预览。

## 示例

```sh
# 查看当前分支的拉取请求
$ gh pr view

# 在浏览器中打开
$ gh pr view --web

# 查看指定拉取请求及其评论
$ gh pr view 123 --comments

# 以 JSON 输出并过滤字段
$ gh pr view 123 --json number,title,url
```

以上示例为说明性内容，未实际运行。

## 源码补充

- 命令定义、终端预览与非终端原始输出的渲染见 [pkg/cmd/pr/view/view.go](https://github.com/cli/cli/blob/fc4b137cdef0a6bd28fd461b7cf9c84a5812a8cd/pkg/cmd/pr/view/view.go)。
- 拉取请求三种选择器形式的解析见 [pkg/cmd/pr/shared/finder.go](https://github.com/cli/cli/blob/fc4b137cdef0a6bd28fd461b7cf9c84a5812a8cd/pkg/cmd/pr/shared/finder.go)。
