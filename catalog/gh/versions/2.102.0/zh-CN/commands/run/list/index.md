---
title: gh run list
command:
  - run
  - list
---

列出近期的工作流运行。

## 简介

`gh run list` 列出目标仓库近期的工作流运行，默认 20 条，可按工作流、分支、触发用户、事件、创建日期、提交 SHA 与状态过滤。注意两点来源行为：给 `-w` 传工作流名称时不会抓取已停用的工作流，需要连同已停用工作流一起列出时须再加 `-a`；由组织与企业规则集（ruleset）工作流创建的运行因 GitHub API 限制不显示工作流名称。

要查看与某个拉取请求关联的检查运行，应使用 [`gh pr checks`](cli:command:pr/checks)。

别名 `gh run ls`。

## 参数

本命令不接受位置参数。

## 选项

### `--limit`

短旗标 `-L`。格式：`--limit <int>`。要获取的运行数量上限，默认 20；小于 1 时报参数错误。

### `--workflow`

短旗标 `-w`。格式：`--workflow <string>`。按工作流过滤运行。传工作流名称时不会匹配已停用的工作流，需同时给出 `--all`。

### `--branch`

短旗标 `-b`。格式：`--branch <string>`。按分支过滤运行。

### `--user`

短旗标 `-u`。格式：`--user <string>`。按触发运行的用户过滤。

### `--event`

短旗标 `-e`。格式：`--event <event>`。按触发运行的 `event`（事件类型）过滤。

### `--created`

格式：`--created <date>`。按运行创建的 `date`（日期）过滤。

### `--commit`

短旗标 `-c`。格式：`--commit <SHA>`。按提交的 `SHA` 过滤运行。

### `--all`

短旗标 `-a`。格式：`--all`。包含已停用的工作流。

### `--status`

短旗标 `-s`。格式：`--status <string>`。按状态过滤运行。允许的取值（源自枚举注册）：`queued`、`completed`、`in_progress`、`requested`、`waiting`、`pending`、`action_required`、`cancelled`、`failure`、`neutral`、`skipped`、`stale`、`startup_failure`、`success`、`timed_out`。

### `--json`

格式：`--json <strings>`。逗号分隔的导出字段，可用字段：`name`、`displayTitle`、`headBranch`、`headSha`、`createdAt`、`updatedAt`、`startedAt`、`attempt`、`status`、`conclusion`、`event`、`number`、`databaseId`、`workflowDatabaseId`、`workflowName`、`url`。配合 `--jq`、`--template` 加工输出，见 [JSON 输出与格式化](../../../reference/formatting.md)。

### `--jq`

短旗标 `-q`。格式：`--jq <expression>`。按 jq 表达式筛选或重组 `--json` 的输出。

### `--template`

短旗标 `-t`。格式：`--template <string>`。按 Go 模板渲染 `--json` 的输出。

## 使用提醒

- 终端中以表格展示结果（状态、标题、工作流、分支、事件、ID、耗时、时间）；输出被管道重定向时状态列拆分为 `status` 与 `conclusion` 两列。
- `--jq` 与 `--template` 都依赖 `--json` 同时给出，见 [JSON 输出与格式化](../../../reference/formatting.md)。

## 示例

```sh
# 列出近期运行（默认 20 条）
gh run list

# 只看 main 分支上由 push 事件触发的运行
gh run list --branch main --event push

# 按状态过滤进行中的运行
gh run list --status in_progress

# 连同已停用工作流一起按工作流过滤
gh run list --workflow CI --all

# 以 JSON 导出指定字段
gh run list --json status,conclusion,workflowName,createdAt
```

以上示例为说明性内容，未实际运行。

## 源码补充

- 命令定义、过滤器与表格输出见 [pkg/cmd/run/list/list.go](https://github.com/cli/cli/blob/fc4b137cdef0a6bd28fd461b7cf9c84a5812a8cd/pkg/cmd/run/list/list.go)。
- `--status` 的允许取值定义于 [pkg/cmd/run/shared/shared.go](https://github.com/cli/cli/blob/fc4b137cdef0a6bd28fd461b7cf9c84a5812a8cd/pkg/cmd/run/shared/shared.go) 的 `AllStatuses`。
