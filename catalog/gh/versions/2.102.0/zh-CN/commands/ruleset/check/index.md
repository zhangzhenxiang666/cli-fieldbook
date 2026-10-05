---
title: gh ruleset check
command:
  - ruleset
  - check
---

查看将作用于给定分支的规则。

## 简介

查看作用于给定分支的 GitHub 规则。所给分支名不必真实存在——命令展示的是"若存在同名分支会适用哪些规则"；无论规则配置在哪一层，全部相关规则都会返回。

未提供分支名时使用当前分支；`--default` 可改为查看仓库默认分支的规则。

## 参数

### `BRANCH`

格式：`[<branch>]`。分支名，可选；省略时取当前分支。与 `--default` 互斥。

## 选项

### `--default`

格式：`--default`。查看仓库默认分支上的规则；与位置参数给出的分支名互斥。

### `--web`

短旗标 `-w`。格式：`--web`。在浏览器中打开该分支的规则页面，而非在终端输出。

## 环境变量

- `GH_REPO`：为命令指定 `[HOST/]OWNER/REPO` 形式的目标仓库，作用同分组级 `--repo` 旗标，见[环境变量](../../../reference/environment.md)。

## 使用提醒

- `--default` 与分支名二选一，同时给出会报错。
- 省略分支名且无法确定当前分支（如不在 Git 仓库内）时报错。
- 规则集本身的列表与详情见 [`gh ruleset list`](cli:command:ruleset/list) 与 [`gh ruleset view`](cli:command:ruleset/view)。

## 示例

```sh
# 查看作用于当前分支的全部规则
gh ruleset check

# 查看其他仓库中名为 my-branch 的分支会适用的规则
gh ruleset check my-branch --repo owner/repo

# 查看其他仓库默认分支会适用的规则
gh ruleset check --default --repo owner/repo
```

以上示例为说明性内容，未实际运行。

## 源码补充

- 命令定义、分支解析与规则输出见 [pkg/cmd/ruleset/check/check.go](https://github.com/cli/cli/blob/fc4b137cdef0a6bd28fd461b7cf9c84a5812a8cd/pkg/cmd/ruleset/check/check.go)。
