---
title: gh pr merge
command:
  - pr
  - merge
---

合并拉取请求。

## 简介

在 GitHub 上合并拉取请求。不带参数时选择当前分支所属的拉取请求。

目标分支要求合并队列时，无需指定合并策略：必需检查尚未通过时会启用自动合并；必需检查已通过时，拉取请求会被加入合并队列。要绕过合并队列直接合并，给出 `--admin`。已在合并队列中的拉取请求只输出提示，不再执行其他操作。

## 参数

### `NUMBER|URL|BRANCH`

可选，命令形态为 `[<number> | <url> | <branch>]`。定位目标拉取请求，三种形式：

- 数字：拉取请求编号，如 `123`；
- URL：拉取请求地址，如 `https://github.com/OWNER/REPO/pull/123`；
- 分支名：头部分支名，如 `patch-1`，跨仓库时可用 `OWNER:patch-1`。

省略时默认选择当前分支所属的拉取请求。

## 选项

### `--admin`

格式：`--admin`。使用管理员权限合并不满足要求的拉取请求。

### `--delete-branch`

短旗标 `-d`。格式：`--delete-branch`。合并后删除本地与远端分支。

### `--body`

短旗标 `-b`。格式：`--body <text>`。合并提交的正文 `text`。

### `--body-file`

短旗标 `-F`。格式：`--body-file <file>`。从 `file` 读取正文文本（用 `"-"` 从标准输入读取）。

### `--subject`

短旗标 `-t`。格式：`--subject <text>`。合并提交的主题 `text`。

### `--merge`

短旗标 `-m`。格式：`--merge`。把提交并入基分支。

### `--rebase`

短旗标 `-r`。格式：`--rebase`。把提交变基到基分支之上。

### `--squash`

短旗标 `-s`。格式：`--squash`。把提交压成一个提交后并入基分支。

### `--auto`

格式：`--auto`。仅在必要要求满足后自动合并。

### `--disable-auto`

格式：`--disable-auto`。为此拉取请求禁用自动合并。

### `--match-head-commit`

格式：`--match-head-commit <SHA>`。拉取请求头必须匹配的提交 `SHA`，匹配才允许合并。

### `--author-email`

短旗标 `-A`。格式：`--author-email <text>`。合并提交作者的电子邮件 `text`。

## 使用提醒

- `--merge`、`--rebase`、`--squash` 至多给出一个；交互模式下未指定合并策略时会提示选择，非交互模式下必须指定其一。
- `--auto`、`--disable-auto`、`--admin` 三者互斥。
- `--body` 与 `--body-file` 二选一，同时给出会报错。
- 分支启用合并队列时不能使用 `-d`/`--delete-branch`。
- 使用 `-R` 指定仓库时必须显式给出参数，否则报错；此时也不会删除本地分支。

## 示例

```sh
# 以 squash 方式合并当前分支的拉取请求并删除分支
$ gh pr merge --squash --delete-branch

# 满足要求后自动合并
$ gh pr merge --auto --merge

# 为指定拉取请求禁用自动合并
$ gh pr merge 123 --disable-auto

# 以管理员权限直接合并
$ gh pr merge 123 --admin --merge
```

以上示例为说明性内容，未实际运行。

## 源码补充

- 命令定义、策略旗标校验与合并队列处理见 [pkg/cmd/pr/merge/merge.go](https://github.com/cli/cli/blob/fc4b137cdef0a6bd28fd461b7cf9c84a5812a8cd/pkg/cmd/pr/merge/merge.go)。
