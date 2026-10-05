---
title: gh
command: []
---

gh 是 GitHub 官方命令行工具，用于从终端操作 GitHub：管理仓库、拉取请求、议题、release、GitHub Actions，以及直接调用 GitHub API。本页帮助内容自固定提交源码重建，未采集二进制原始帮助。

## 简介

gh 采用 `gh <命令> <子命令>` 的两级结构，顶层按用途分组：核心命令（`auth`、`pr`、`issue`、`repo`、`release`、`gist` 等）、GitHub Actions 命令（`run`、`workflow`、`cache`）与附加命令（`api`、`search`、`alias`、`config`、`extension` 等）。绝大多数命令在执行前要求已完成认证；未认证时会提示先运行 [`gh auth login`](cli:command:auth/login)。

首次使用建议从认证与仓库上下文入手：认证后用 [`gh repo set-default`](cli:command:repo/set-default) 固定默认仓库，日常命令即可省略仓库参数。

## 参数

无位置参数；直接运行 `gh` 显示帮助。

## 选项

### `--help`

显示当前命令的帮助。所有子命令继承本旗标。

### `--version`

显示 gh 版本并退出。

## 环境变量

gh 的认证、主机与输出行为由一组环境变量控制，如 `GH_TOKEN`、`GH_HOST`、`GH_REPO`、`GH_EDITOR`、`NO_COLOR` 等，完整清单见[环境变量](../reference/environment.md)。

## 使用提醒

- 未认证时大部分命令会直接失败并以退出代码 `4` 结束，参见[退出代码](../reference/exit-codes.md)。
- `gh help <主题>` 可查看内置帮助主题（`environment`、`formatting`、`exit-codes` 等）；`gh help reference` 输出全部命令的完整参考。
- 默认配置别名 `gh co` 等价于 `gh pr checkout`；别名体系见 [`gh alias`](cli:command:alias)。
- 支持 `--json` 的命令可配合 `--jq`、`--template` 加工输出，参见 [JSON 输出与格式化](../reference/formatting.md)。

## 示例

```sh
# 在浏览器中打开当前仓库的议题列表
gh issue create
# 克隆 cli/cli 仓库
gh repo clone cli/cli
# 检出 321 号拉取请求
gh pr checkout 321
```

以上示例为说明性内容，未实际运行。

## 源码补充

- 根命令定义与顶层分组见 [pkg/cmd/root/root.go](https://github.com/cli/cli/blob/fc4b137cdef0a6bd28fd461b7cf9c84a5812a8cd/pkg/cmd/root/root.go)。
- 帮助主题内容见 [pkg/cmd/root/help_topic.go](https://github.com/cli/cli/blob/fc4b137cdef0a6bd28fd461b7cf9c84a5812a8cd/pkg/cmd/root/help_topic.go)。
