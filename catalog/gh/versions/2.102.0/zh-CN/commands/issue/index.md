---
title: gh issue
command:
  - issue
---

## 简介

`gh issue` 命令组用于管理 GitHub 仓库中的议题：列出、创建、查看、评论、关闭与重新打开、编辑、锁定与解锁、置顶与取消置顶、转移以及删除。`gh issue` 自身不执行具体操作，需要与子命令组合使用。

多数子命令用编号或 URL 指定议题，两种形式任选其一：编号如 `123`（可带 `#` 前缀），URL 如 `https://github.com/OWNER/REPO/issues/123`。URL 自带仓库信息时以该仓库为准；否则目标仓库从当前目录的 Git 远程推断，也可用 `--repo` 旗标或 `GH_REPO` 环境变量指定。

## 子命令导览

帮助中把子命令分为两组。常规命令：

- [gh issue list](cli:command:issue/list)（别名 `gh issue ls`）：列出仓库中的议题，默认只列出开启状态，支持按状态、指派人、标签、里程碑等过滤。
- [gh issue create](cli:command:issue/create)（别名 `gh issue new`）：创建新议题，支持模板、附件与元数据。
- [gh issue status](cli:command:issue/status)：显示与当前用户相关的议题，按指派、提及、创建分组。

定向命令：

- [gh issue view](cli:command:issue/view)：查看单个议题的标题、正文、评论等信息。
- [gh issue comment](cli:command:issue/comment)：在议题下添加评论，也可编辑或删除自己的最后一条评论。
- [gh issue close](cli:command:issue/close)：关闭议题，可附评论并指定关闭原因。
- [gh issue reopen](cli:command:issue/reopen)：重新打开议题，可附评论。
- [gh issue edit](cli:command:issue/edit)：编辑同一仓库中的一个或多个议题。
- [gh issue develop](cli:command:issue/develop)：管理议题的关联分支。
- [gh issue lock](cli:command:issue/lock)：锁定议题对话。
- [gh issue unlock](cli:command:issue/unlock)：解锁议题对话。
- [gh issue pin](cli:command:issue/pin)：把议题置顶到仓库。
- [gh issue unpin](cli:command:issue/unpin)：取消议题的置顶。
- [gh issue transfer](cli:command:issue/transfer)：把议题转移到另一个仓库。
- [gh issue delete](cli:command:issue/delete)：删除议题，删除后不可恢复。

## 选项

### `--repo`

短旗标 `-R`。格式：`--repo <[HOST/]OWNER/REPO>`。以 `[HOST/]OWNER/REPO` 格式选择其他仓库。该旗标注册在 `gh issue` 上并对全部子命令生效；议题 URL 参数自带的仓库信息优先于它。

## 环境变量

- `GH_REPO`：以 `[HOST/]OWNER/REPO` 形式为命令指定仓库，可被 `--repo` 覆盖；`GH_HOST` 为主机推断兜底。完整清单见[环境变量](../../reference/environment.md)。

## 使用提醒

- 支持 `--json` 的子命令（list、status、view）可配合 `--jq`、`--template` 加工输出，参见 [JSON 输出与格式化](../../reference/formatting.md)。
- 编号按 issueOrPullRequest 解析：view、comment、close、reopen、edit 等命令遇到拉取请求编号时把目标当作拉取请求处理（如 close 会关闭该拉取请求）；delete 与 transfer 明确拒绝拉取请求；lock 与 unlock 会报错并提示改用对应的 `gh pr` 命令。
- 命令失败时的退出代码含义参见[退出代码](../../reference/exit-codes.md)。

## 示例

```sh
# 列出当前仓库的议题
gh issue list

# 创建议题并添加 bug 标签
gh issue create --label bug

# 在浏览器中查看 123 号议题
gh issue view 123 --web
```

以上示例为说明性内容，未实际运行。

## 源码补充

- 命令组定义、子命令分组与议题参数格式说明见 [pkg/cmd/issue/issue.go](https://github.com/cli/cli/blob/fc4b137cdef0a6bd28fd461b7cf9c84a5812a8cd/pkg/cmd/issue/issue.go)。
- 编号与 URL 参数的解析见 [pkg/cmd/issue/shared/lookup.go](https://github.com/cli/cli/blob/fc4b137cdef0a6bd28fd461b7cf9c84a5812a8cd/pkg/cmd/issue/shared/lookup.go)。
