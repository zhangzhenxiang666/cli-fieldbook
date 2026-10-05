---
title: gh issue view
command:
  - issue
  - view
---

## 简介

显示单个议题的标题、正文与其他信息（状态、作者、标签、指派人、项目、里程碑、议题类型、父子与阻塞关系、子议题、评论等）。用 `--web` 改为在浏览器中打开，用 `--comments` 查看全部评论。

输出形式随环境变化：终端直连时渲染为人类可读预览，评论默认只显示摘要，`--comments` 展开全部；输出重定向到管道或文件时改为制表符分隔的键值行（`title:`、`state:` 等），便于用 head、grep 等工具处理。

## 参数

### `NUMBER|URL`

必需。议题选择器，两种形式任选其一：议题编号（如 `123`，可带 `#` 前缀）或议题 URL（如 `https://github.com/OWNER/REPO/issues/123`）。URL 自带仓库信息时以该仓库为准。

## 选项

### `--web`

短旗标 `-w`。格式：`--web`。在浏览器中打开议题。

### `--comments`

短旗标 `-c`。格式：`--comments`。查看议题评论。

### `--json`

格式：`--json <strings>`。以 JSON 输出指定的 `fields`。取值 `assignees`、`author`、`body`、`closed`、`comments`、`createdAt`、`closedAt`、`id`、`labels`、`milestone`、`number`、`projectCards`、`projectItems`、`reactionGroups`、`state`、`title`、`updatedAt`、`url`、`isPinned`、`stateReason`、`closedByPullRequestsReferences`、`issueType`、`parent`、`subIssues`、`subIssuesSummary`、`blockedBy`、`blocking`。

### `--jq`

短旗标 `-q`。格式：`--jq <expression>`。用 jq `expression` 过滤 JSON 输出。

### `--template`

短旗标 `-t`。格式：`--template <string>`。用 Go 模板格式化 JSON 输出（参见 `gh help formatting`）。

## 使用提醒

- `--comments` 与 `--json` 互斥；`--web` 也不能与 `--json` 同用。
- 编号按 issueOrPullRequest 解析，指向拉取请求时命令照常显示该拉取请求。
- `--jq`、`--template` 需要配合 `--json`，参见 [JSON 输出与格式化](../../../reference/formatting.md)。

## 示例

```sh
# 查看当前仓库 123 号议题
gh issue view 123

# 在浏览器中打开该议题
gh issue view 123 --web

# 查看议题及全部评论
gh issue view 123 --comments

# 以 JSON 输出编号、标题与状态
gh issue view 123 --json number,title,state
```

以上示例为说明性内容，未实际运行。

## 源码补充

- 命令定义与终端／原始两种预览输出见 [pkg/cmd/issue/view/view.go](https://github.com/cli/cli/blob/fc4b137cdef0a6bd28fd461b7cf9c84a5812a8cd/pkg/cmd/issue/view/view.go)。
- 议题与评论的请求实现见 [pkg/cmd/issue/view/http.go](https://github.com/cli/cli/blob/fc4b137cdef0a6bd28fd461b7cf9c84a5812a8cd/pkg/cmd/issue/view/http.go)。
