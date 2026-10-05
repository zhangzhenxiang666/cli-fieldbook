---
title: gh pr update-branch
command:
  - pr
  - update-branch
---

用基分支的最新变更更新拉取请求分支。

## 简介

默认以合并提交方式更新（把基分支合入拉取请求的分支）；要以变基到基分支之上的方式 reconcile 变更，给出 `--rebase`。

不带参数时选择当前分支所属的拉取请求。拉取请求分支与基分支存在冲突时无法更新并报错；分支已不落后于基分支时提示已是最新。

## 参数

### `NUMBER|URL|BRANCH`

可选，命令形态为 `[<number> | <url> | <branch>]`。定位目标拉取请求，三种形式：

- 数字：拉取请求编号，如 `123`；
- URL：拉取请求地址，如 `https://github.com/OWNER/REPO/pull/123`；
- 分支名：头部分支名，如 `patch-1`，跨仓库时可用 `OWNER:patch-1`。

省略时默认选择当前分支所属的拉取请求。

## 选项

### `--rebase`

格式：`--rebase`。通过变基到最新基分支来更新拉取请求分支。

## 使用提醒

- 使用 `-R` 指定仓库时必须显式给出参数，否则报错。
- 存在合并冲突时命令报错退出，不会尝试更新。

## 示例

```sh
$ gh pr update-branch 23
$ gh pr update-branch 23 --rebase
$ gh pr update-branch 23 --repo owner/repo
```

以上示例为说明性内容，未实际运行。

## 源码补充

- 命令定义、合并/变基两种更新方式与冲突检查见 [pkg/cmd/pr/update-branch/update_branch.go](https://github.com/cli/cli/blob/fc4b137cdef0a6bd28fd461b7cf9c84a5812a8cd/pkg/cmd/pr/update-branch/update_branch.go)。
