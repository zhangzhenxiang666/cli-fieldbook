---
title: gh ruleset
command:
  - ruleset
---

查看仓库规则集（ruleset）信息。

## 简介

仓库规则集是定义一组作用于仓库的规则的方式。`gh ruleset` 提供查看这类信息的命令：列出仓库或组织的规则集、查看规则集详情、查看将作用于某个分支的规则。规则集可能配置在仓库、组织等不同层级，`--parents` 类旗标控制是否一并显示更上层配置的规则集。

`ruleset` 有别名 `rs`，例如 `gh rs list` 等价于 `gh ruleset list`。

## 子命令导览

- [gh ruleset list](cli:command:ruleset/list)：列出仓库或组织的规则集，别名 `ls`。
- [gh ruleset view](cli:command:ruleset/view)：查看一个规则集的详情，可交互选择。
- [gh ruleset check](cli:command:ruleset/check)：查看将作用于给定分支的规则。

## 选项

### `--repo`

短旗标 `-R`。格式：`--repo <[HOST/]OWNER/REPO>`。以 `[HOST/]OWNER/REPO` 格式选择其他仓库。该旗标注册在 `gh ruleset` 分组级并持久化，对 `list`、`view`、`check` 三个子命令都生效；未指定时从当前 Git 仓库推断目标仓库。

## 环境变量

- `GH_REPO`：与 `--repo` 作用相同，为命令指定 `[HOST/]OWNER/REPO` 形式的目标仓库；`--repo` 优先，见[环境变量](../../reference/environment.md)。

## 使用提醒

- `list` 与 `view` 中 `--repo` 与 `--org` 互斥，只能以其一确定查询范围。
- 本组命令只读，不提供规则集的创建或修改。

## 示例

```sh
# 列出规则集
gh ruleset list

# 在浏览器中查看指定仓库的规则集
gh ruleset view --repo OWNER/REPO --web

# 查看将作用于某分支的规则
gh ruleset check branch-name
```

以上示例为说明性内容，未实际运行。

## 源码补充

- 分组定义见 [pkg/cmd/ruleset/ruleset.go](https://github.com/cli/cli/blob/fc4b137cdef0a6bd28fd461b7cf9c84a5812a8cd/pkg/cmd/ruleset/ruleset.go)；分组级 `--repo` 持久旗标由 [pkg/cmdutil/repo_override.go](https://github.com/cli/cli/blob/fc4b137cdef0a6bd28fd461b7cf9c84a5812a8cd/pkg/cmdutil/repo_override.go) 的 `EnableRepoOverride` 添加。
