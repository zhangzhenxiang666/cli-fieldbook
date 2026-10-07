---
title: gh workflow enable
command:
  - workflow
  - enable
---

启用一个工作流。

## 简介

`gh workflow enable` 启用工作流，使其可以运行并出现在工作流列表中。只有处于停用状态（手动停用或因不活跃停用）的工作流会被匹配；仓库没有可启用的工作流时报错。省略选择器时，交互终端下会从停用的工作流中选择，非交互环境必须给出工作流 ID 或名称。

## 参数

### `WORKFLOW-ID|WORKFLOW-NAME`

格式：`[<workflow-id> | <workflow-name>]`。可选。要启用的工作流，可用工作流 ID 或名称定位；省略时在交互终端下从停用的工作流中选择。

## 使用提醒

- 名称匹配不区分大小写。
- 启用后可用 [`gh workflow list`](cli:command:workflow/list) 确认状态。
- 除从当前仓库推断目标仓库外，本子命令没有额外选项；仓库选择见 [gh workflow](cli:command:workflow) 组页的 `--repo`。

## 示例

```sh
# 按 ID 启用工作流
gh workflow enable 0451

# 按名称启用工作流
gh workflow enable "Build and Test"

# 交互选择要启用的工作流
gh workflow enable
```

以上示例为说明性内容，未实际运行。

## 源码补充

- 命令定义与启用请求见 [pkg/cmd/workflow/enable/enable.go](https://github.com/cli/cli/blob/fc4b137cdef0a6bd28fd461b7cf9c84a5812a8cd/pkg/cmd/workflow/enable/enable.go)。
- 选择器解析（纯数字或 `.yml`/`.yaml` 结尾按 ID 端点处理，其余按名称匹配）见 [pkg/cmd/workflow/shared/shared.go](https://github.com/cli/cli/blob/fc4b137cdef0a6bd28fd461b7cf9c84a5812a8cd/pkg/cmd/workflow/shared/shared.go) 的 `FindWorkflow`。
