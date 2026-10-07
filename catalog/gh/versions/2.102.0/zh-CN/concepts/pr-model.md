---
title: PR 工作模型
uses:
  - command:pr/checkout
  - command:pr/checks
  - command:pr/create
  - command:pr/lock
  - command:pr/merge
  - command:pr/ready
  - command:pr/review
  - command:pr/status
  - command:pr/unlock
  - command:pr/update-branch
---

[gh pr](cli:command:pr) 命令族覆盖拉取请求的完整生命周期：创建、查看、评审、合并与锁定。本文说明贯穿这些命令的工作模型：如何定位一个拉取请求、创建时的分支与复刻流程、草稿与评审的状态流转、合并的三种模式，以及检出到本地与更新分支的机制。目标仓库如何确定见[仓库上下文与默认仓库](repo-context.md)；议题侧的对应机制见[议题与日常管理](issue-management.md)。

## 选择器：编号、URL 与分支

多数 `gh pr` 子命令接受一个拉取请求选择器，三种形式：

- 编号，如 `123`；
- URL，如 `https://github.com/OWNER/REPO/pull/123`；
- 头部分支名，如 `patch-1`；头部分支属于其他仓库（典型是复刻）时用 `OWNER:patch-1`。

省略选择器时，多数命令作用于当前分支所属的拉取请求；[gh pr list](cli:command:pr/list) 与 [gh pr status](cli:command:pr/status) 等不接受选择器；[gh pr close](cli:command:pr/close)、[gh pr reopen](cli:command:pr/reopen)、[gh pr lock](cli:command:pr/lock)、[gh pr unlock](cli:command:pr/unlock) 等必须显式给出，且 lock/unlock 只接受编号与 URL 两种形式、不支持分支名。用 `-R` 指定仓库时，依赖"当前分支"的命令（如 [gh pr checks](cli:command:pr/checks)、[gh pr review](cli:command:pr/review)、[gh pr ready](cli:command:pr/ready)、[gh pr update-branch](cli:command:pr/update-branch)、[gh pr merge](cli:command:pr/merge)）要求显式给出选择器。

[gh pr status](cli:command:pr/status) 把与当前用户相关的拉取请求分三部分汇总：当前分支对应的、自己创建的、等待自己评审的。

## 创建：头部分支、基分支与复刻

[gh pr create](cli:command:pr/create) 默认以当前分支为头部分支。基分支未用 `--base` 指定时，先看当前分支的 `gh-merge-base` git 配置（`git config branch.{当前分支}.gh-merge-base`），仍未配置时使用仓库默认分支。

当前分支未完全推送到远端时，交互模式会提示选择推送位置，并提供复刻基仓库的选项；以这种方式创建的复刻只包含上游仓库的默认分支。显式给出 `--head` 可跳过全部复刻与推送行为；`--head` 支持 `<user>:<branch>` 语法选择属于 `<user>` 的头仓库（暂不支持以组织作为 `<user>`）。

标题与正文来自 `--title`/`--body`（或 `--body-file`），或用 `--fill`、`--fill-first`、`--fill-verbose` 从提交信息自动填充；非交互且未用 `--web` 时，必须给出标题与正文，或给出三个填充旗标之一。在正文中写 `Fixes #123`、`Closes #123` 之类的引用，对应议题会在拉取请求合并后自动关闭。`--draft` 直接把新拉取请求标记为草稿；`--no-maintainer-edit` 关闭基仓库维护者向头部分支推送提交的默认许可。

## 模板

拉取请求模板是仓库中预置的正文模板。[gh pr create](cli:command:pr/create) 的 `--template` 接受模板文件路径作为正文起始文本；它与 `--body`/`--body-file` 互斥——正文要么来自模板加编辑，要么来自显式给定的内容。

## 草稿与可评审

草稿（draft）与可评审是打开状态下的一对形态。`gh pr create --draft` 创建草稿；[gh pr ready](cli:command:pr/ready) 把打开状态的草稿标记为可评审，`--undo` 反向转回草稿（取决于所用套餐是否支持）。已关闭的拉取请求无法转换（报错），已处于目标状态的仅输出提示。

## 检查与评审

[gh pr checks](cli:command:pr/checks) 列出单个拉取请求的 CI 检查项及状态，`--watch` 持续监视到完成（`--fail-fast` 首败即退，`--interval` 调整刷新间隔）。`--json` 输出中的 `bucket` 字段把 `state` 归类为 `pass`、`fail`、`pending`、`skipping` 或 `cancel`。退出代码另有约定：有检查失败为 `1`，仅存在待定检查为 `8`，见[退出代码](../reference/exit-codes.md)。

[gh pr review](cli:command:pr/review) 以三种类型之一提交评审：`--approve` 通过、`--request-changes` 请求修改、`--comment` 评论。非交互模式必须恰好给出三者之一；请求修改与评论要求正文非空（`--body` 或 `--body-file`）。交互模式下不带类型旗标会进入交互流程。

## 合并

[gh pr merge](cli:command:pr/merge) 支持三种合并模式，`--merge`（生成合并提交）、`--rebase`（变基并入）与 `--squash`（压缩为单个提交）：至多给出一个，交互模式未指定时会提示选择，非交互模式必须指定其一。`--subject`、`--body`/`--body-file` 与 `--author-email` 定制合并提交本身。

自动与管理员维度：`--auto` 在必要要求满足后自动合并，`--disable-auto` 为该拉取请求关闭自动合并，`--admin` 用管理员权限绕过未满足的要求；三者互斥。`--match-head-commit <SHA>` 要求头提交匹配才允许合并。

目标分支要求合并队列时无需指定模式：必需检查尚未通过时启用自动合并，已通过时拉取请求被加入合并队列；要绕过队列直接合并，给出 `--admin`；已在队列中的拉取请求只输出提示。注意 `--delete-branch`（合并后删除本地与远端分支）不能用于启用合并队列的分支，且使用 `-R` 指定仓库时必须显式给出选择器、也不会删除本地分支。

## 检出到本地与更新分支

[gh pr checkout](cli:command:pr/checkout) 把拉取请求检出到本地分支；来自复刻的跨仓库拉取请求在本地没有对应远端时，命令会自动补齐远端并抓取。`--branch` 自定义本地分支名（默认用头部分支名），`--worktree` 检出到指定路径的 worktree，`--detach` 以分离 HEAD 检出，`--force` 把已存在的本地分支重置为最新状态。交互模式下不带参数会从最近 10 个拉取请求中选择。gh 的默认配置预置了别名 `gh co` 指向本命令。

[gh pr update-branch](cli:command:pr/update-branch) 用基分支的最新变更更新拉取请求分支：默认以合并提交方式把基分支合入，`--rebase` 改为变基到基分支之上。存在合并冲突时命令报错退出，不会尝试更新；分支已不落后于基分支时仅提示。

## 锁定对话

[gh pr lock](cli:command:pr/lock) 与 [gh pr unlock](cli:command:pr/unlock) 控制拉取请求的对话：锁定后，权限范围之外的用户无法再添加评论。`--reason` 可注明原因，取值固定为 `off_topic`、`resolved`、`spam`、`too_heated`。对已锁定的拉取请求，交互模式会询问是否解锁后按新原因重新锁定，非交互模式直接报错。这对命令与 `gh issue lock`/`gh issue unlock` 共用同一实现，详见[议题与日常管理](issue-management.md)。

## 示例

```sh
# 从当前分支创建拉取请求，标题与正文取自提交信息
gh pr create --fill

# 创建草稿并请求团队评审
gh pr create --draft --reviewer myorg/team-name

# 监视检查直到完成，再以 squash 方式合并并删除分支
gh pr checks --watch
gh pr merge --squash --delete-branch

# 检出他人的拉取请求到独立 worktree
gh pr checkout 123 --worktree /tmp/wt-123

# 把基分支的最新变更变基进拉取请求分支
gh pr update-branch --rebase
```

以上示例为说明性内容，未实际运行。
