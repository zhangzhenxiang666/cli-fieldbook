---
title: gh pr
command:
  - pr
---

处理 GitHub 拉取请求的命令族，覆盖创建、查看、评审、合并、回退与锁定等完整生命周期。

## 简介

`gh pr` 自身不直接执行操作，具体功能由子命令提供。多数子命令接受一个拉取请求"选择器"作为位置参数，三种形式（来自命令族帮助注记 `help:arguments`）：

- 数字，如 `123`；
- URL，如 `https://github.com/OWNER/REPO/pull/123`；
- 头部分支名，如 `patch-1` 或 `OWNER:patch-1`。

不提供选择器的子命令默认作用于当前分支所属的拉取请求。各子命令对参数的要求不同：[gh pr list](cli:command:pr/list)、[gh pr status](cli:command:pr/status) 等不接受位置参数；[gh pr view](cli:command:pr/view)、[gh pr edit](cli:command:pr/edit) 等接受可选参数；[gh pr close](cli:command:pr/close)、[gh pr reopen](cli:command:pr/reopen)、[gh pr revert](cli:command:pr/revert)、[gh pr lock](cli:command:pr/lock)、[gh pr unlock](cli:command:pr/unlock) 必须给出参数。

## 子命令导览

- [gh pr list](cli:command:pr/list)：列出仓库中的拉取请求，可按状态、分支、标签、作者、搜索语法等过滤。
- [gh pr create](cli:command:pr/create)：创建拉取请求，可从提交信息自动填充标题与正文。
- [gh pr status](cli:command:pr/status)：显示相关拉取请求的状态总览（当前分支、自己创建、等待自己评审）。
- [gh pr view](cli:command:pr/view)：查看一个拉取请求的标题、正文等信息。
- [gh pr diff](cli:command:pr/diff)：查看拉取请求的变更差异。
- [gh pr checkout](cli:command:pr/checkout)：在本地 git 中检出拉取请求。
- [gh pr checks](cli:command:pr/checks)：显示单个拉取请求的 CI 检查状态。
- [gh pr review](cli:command:pr/review)：为拉取请求添加评审（通过、请求修改或评论）。
- [gh pr merge](cli:command:pr/merge)：合并拉取请求，支持 merge、rebase、squash 与自动合并。
- [gh pr update-branch](cli:command:pr/update-branch)：用基分支的最新变更更新拉取请求分支。
- [gh pr ready](cli:command:pr/ready)：把拉取请求标记为可评审，或用 `--undo` 转回草稿。
- [gh pr comment](cli:command:pr/comment)：向拉取请求添加评论。
- [gh pr close](cli:command:pr/close)：关闭拉取请求。
- [gh pr reopen](cli:command:pr/reopen)：重新打开已关闭的拉取请求。
- [gh pr revert](cli:command:pr/revert)：回退一个已合并的拉取请求（新建回退拉取请求）。
- [gh pr edit](cli:command:pr/edit)：编辑拉取请求的标题、正文、标签、评审人、里程碑等。
- [gh pr lock](cli:command:pr/lock)：锁定拉取请求的对话。
- [gh pr unlock](cli:command:pr/unlock)：解锁拉取请求的对话。

## 选项

### `--repo`

短旗标 `-R`。格式：`--repo <[HOST/]OWNER/REPO>`。以 `[HOST/]OWNER/REPO` 格式选择另一个仓库。该旗标注册在 `gh pr` 命令族级别，是族级持久旗标，对全部子命令生效；未给出该旗标时，`GH_REPO` 环境变量起同样的覆盖作用。

## 使用提醒

- `-R, --repo` 覆盖仓库后，"当前分支的拉取请求"这一默认定位不再可用，多数接受可选参数的子命令会要求显式给出选择器，详见各子命令页。
- 仓库覆盖（`--repo` 与 `GH_REPO`）的变量说明见[环境变量](../../reference/environment.md)。
- [gh pr lock](cli:command:pr/lock) 与 [gh pr unlock](cli:command:pr/unlock) 和议题侧的 `gh issue lock`/`gh issue unlock` 共用同一实现，参数只接受编号或 URL，不接受分支名。

## 示例

```sh
$ gh pr checkout 353
$ gh pr create --fill
$ gh pr view --web
```

以上示例为说明性内容，未实际运行。

## 源码补充

- 命令族定义、子命令分组（General commands 与 Targeted commands）及拉取请求三种参数形式的帮助注记见 [pkg/cmd/pr/pr.go](https://github.com/cli/cli/blob/fc4b137cdef0a6bd28fd461b7cf9c84a5812a8cd/pkg/cmd/pr/pr.go)。
- `-R, --repo` 族级旗标由 `EnableRepoOverride` 注册，见 [pkg/cmdutil/repo_override.go](https://github.com/cli/cli/blob/fc4b137cdef0a6bd28fd461b7cf9c84a5812a8cd/pkg/cmdutil/repo_override.go)。
- lock/unlock 的共用构造器（带父命令名参数）见 [pkg/cmd/issue/lock/lock.go](https://github.com/cli/cli/blob/fc4b137cdef0a6bd28fd461b7cf9c84a5812a8cd/pkg/cmd/issue/lock/lock.go)。
