---
title: gh workflow
command:
  - workflow
---

查看 GitHub Actions 工作流的详细信息。

## 简介

`gh workflow` 汇集操作 GitHub Actions 工作流的子命令：列出工作流、查看工作流摘要或 YAML 文件、启用与停用、通过创建 `workflow_dispatch` 事件手动触发。命令默认作用于当前 Git 仓库推断出的目标仓库，也可用 `--repo` 指定其他仓库；运行层面的查看、监视与重跑见 [gh run](cli:command:run)。

## 子命令导览

- [gh workflow list](cli:command:workflow/list)：列出工作流文件，默认隐藏已停用的工作流，别名 `gh workflow ls`。
- [gh workflow enable](cli:command:workflow/enable)：启用工作流，使其可运行并出现在列表中。
- [gh workflow disable](cli:command:workflow/disable)：停用工作流，使其不再运行且不出现在列表中。
- [gh workflow view](cli:command:workflow/view)：查看工作流的摘要或 yaml 文件。
- [gh workflow run](cli:command:workflow/run)：通过创建 `workflow_dispatch` 事件手动触发工作流。

## 选项

### `--repo`

短旗标 `-R`。格式：`--repo <[HOST/]OWNER/REPO>`。以 `[HOST/]OWNER/REPO` 格式选择另一个仓库。

本旗标注册在 `gh workflow` 命令组上，为持久旗标，对全部子命令生效。

## 环境变量

- `GH_REPO`：未给出 `--repo` 时，以 `[HOST/]OWNER/REPO` 格式指定目标仓库；见[环境变量](../../reference/environment.md)。

## 使用提醒

- 目标仓库默认从当前目录 Git 仓库的远端推断；在仓库外使用这些命令时需给出 `--repo` 或设置 `GH_REPO`。
- 多数子命令在交互终端下省略选择器会进入交互选择，非交互环境（如脚本中）则必须显式给出，详见各子命令页。

## 示例

```sh
# 列出当前仓库的工作流
gh workflow list

# 查看 ci.yml 工作流的摘要
gh workflow view ci.yml

# 在指定分支上手动触发工作流
gh workflow run ci.yml --ref my-branch
```

以上示例为说明性内容，未实际运行。

## 源码补充

- 命令组定义与子命令注册见 [pkg/cmd/workflow/workflow.go](https://github.com/cli/cli/blob/fc4b137cdef0a6bd28fd461b7cf9c84a5812a8cd/pkg/cmd/workflow/workflow.go)。
