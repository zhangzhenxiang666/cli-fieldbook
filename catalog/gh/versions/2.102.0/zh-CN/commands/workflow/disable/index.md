---
title: gh workflow disable
command:
  - workflow
  - disable
---

停用一个工作流。

## 简介

`gh workflow disable` 停用工作流，使其不再运行、也不出现在工作流列表中。只有处于启用状态的工作流会被匹配；仓库没有可停用的工作流时报错。省略选择器时，交互终端下会从启用的工作流中选择，非交互环境必须给出工作流 ID 或名称。

## 参数

### `WORKFLOW-ID|WORKFLOW-NAME`

格式：`[<workflow-id> | <workflow-name>]`。可选。要停用的工作流，可用工作流 ID 或名称定位；省略时在交互终端下从启用的工作流中选择。

## 使用提醒

- 名称匹配不区分大小写。
- 停用后可用 [`gh workflow list --all`](cli:command:workflow/list) 确认状态。
- 除从当前仓库推断目标仓库外，本子命令没有额外选项；仓库选择见 [gh workflow](cli:command:workflow) 组页的 `--repo`。

## 示例

```sh
# 按 ID 停用工作流
gh workflow disable 0451

# 按名称停用工作流
gh workflow disable "Build and Test"

# 交互选择要停用的工作流
gh workflow disable
```

以上示例为说明性内容，未实际运行。

## 源码补充

- 命令定义与停用请求见 [pkg/cmd/workflow/disable/disable.go](https://github.com/cli/cli/blob/fc4b137cdef0a6bd28fd461b7cf9c84a5812a8cd/pkg/cmd/workflow/disable/disable.go)。
- 选择器解析（纯数字或 `.yml`/`.yaml` 结尾按 ID 端点处理，其余按名称匹配）见 [pkg/cmd/workflow/shared/shared.go](https://github.com/cli/cli/blob/fc4b137cdef0a6bd28fd461b7cf9c84a5812a8cd/pkg/cmd/workflow/shared/shared.go) 的 `FindWorkflow`。
