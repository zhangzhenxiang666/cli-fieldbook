---
title: gh pr checkout
command:
  - pr
  - checkout
---

在本地 git 中检出拉取请求，子命令别名 `gh pr co`；gh 的默认配置还预置了 `gh co` 这一别名（指向 `pr checkout`）。

## 简介

把拉取请求检出到本地分支。交互模式下不带参数时，会从最近 10 个拉取请求中交互选择；非交互模式下必须给出参数。

本地没有拉取请求头部分支对应的远端时（例如来自复刻的跨仓库拉取请求），命令会自动补齐必要的远端与抓取。检出已完成时命令正常返回；检出到 worktree 时会额外提示后续的 `cd` 路径。

## 参数

### `NUMBER|URL|BRANCH`

可选，命令形态为 `[<number> | <url> | <branch>]`。定位目标拉取请求，三种形式：

- 数字：拉取请求编号，如 `123`；
- URL：拉取请求地址，如 `https://github.com/OWNER/REPO/pull/123`；
- 分支名：头部分支名，如 `patch-1`，跨仓库时可用 `OWNER:patch-1`。

省略时进入交互选择（仅交互模式）。

## 选项

### `--recurse-submodules`

格式：`--recurse-submodules`。检出后更新所有子模块。

### `--force`

短旗标 `-f`。格式：`--force`。把已存在的本地分支重置为拉取请求的最新状态。

### `--detach`

格式：`--detach`。以分离 HEAD 检出拉取请求。

### `--branch`

短旗标 `-b`。格式：`--branch <string>`。使用的本地分支名（默认为头部分支名）。

### `--worktree`

格式：`--worktree <path>`。把拉取请求检出到指定 `path` 的 worktree 中。

## 使用提醒

- 非交互模式下必须给出参数，否则报错。
- `--worktree` 不能为空值。
- 别名拼写保持不变：子命令级为 `gh pr co`，gh 默认配置的预置别名为 `gh co`。

## 示例

```sh
# 交互式地从最近 10 个拉取请求中选择一个检出
$ gh pr checkout

# 检出指定的拉取请求
$ gh pr checkout 32
$ gh pr checkout https://github.com/OWNER/REPO/pull/32
$ gh pr checkout feature
$ gh pr checkout 32 --branch feature --worktree /path/to/wt-feature
```

以上示例为说明性内容，未实际运行。

## 源码补充

- 命令定义、远端补齐与 worktree 处理见 [pkg/cmd/pr/checkout/checkout.go](https://github.com/cli/cli/blob/fc4b137cdef0a6bd28fd461b7cf9c84a5812a8cd/pkg/cmd/pr/checkout/checkout.go)。
