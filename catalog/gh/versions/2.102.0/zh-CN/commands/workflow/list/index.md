---
title: gh workflow list
command:
  - workflow
  - list
---

列出工作流。

## 简介

`gh workflow list` 列出仓库的工作流文件，默认隐藏已停用的工作流，`--all` 一并列出。默认获取 50 个。终端中以表格展示名称、状态与 ID。

别名 `gh workflow ls`。

## 参数

本命令不接受位置参数。

## 选项

### `--limit`

短旗标 `-L`。格式：`--limit <int>`。要获取的工作流数量上限，默认 50；小于 1 时报参数错误。

### `--all`

短旗标 `-a`。格式：`--all`。包含已停用的工作流。

### `--json`

格式：`--json <strings>`。逗号分隔的导出字段，可用字段：`id`、`name`、`path`、`state`。配合 `--jq`、`--template` 加工输出，见 [JSON 输出与格式化](../../../reference/formatting.md)。

### `--jq`

短旗标 `-q`。格式：`--jq <expression>`。按 jq 表达式筛选或重组 `--json` 的输出。

### `--template`

短旗标 `-t`。格式：`--template <string>`。按 Go 模板渲染 `--json` 的输出。

## 使用提醒

- `state` 字段的取值为 `active`、`disabled_manually`、`disabled_inactivity`（源自源码工作流状态定义）。
- `--jq` 与 `--template` 都依赖 `--json` 同时给出。

## 示例

```sh
# 列出工作流（默认 50 个）
gh workflow list

# 包含已停用的工作流
gh workflow list --all

# 以 JSON 导出 ID、名称与状态
gh workflow list --json id,name,state
```

以上示例为说明性内容，未实际运行。

## 源码补充

- 命令定义与过滤逻辑见 [pkg/cmd/workflow/list/list.go](https://github.com/cli/cli/blob/fc4b137cdef0a6bd28fd461b7cf9c84a5812a8cd/pkg/cmd/workflow/list/list.go)。
- 工作流状态常量定义见 [pkg/cmd/workflow/shared/shared.go](https://github.com/cli/cli/blob/fc4b137cdef0a6bd28fd461b7cf9c84a5812a8cd/pkg/cmd/workflow/shared/shared.go)。
