---
title: gh workflow view
command:
  - workflow
  - view
---

查看一个工作流的摘要。

## 简介

`gh workflow view` 默认展示工作流摘要：名称、文件名、ID、运行总数与近期运行表（最多 5 条），末尾提示进一步查看的命令；`--yaml` 改为查看工作流的 yaml 文件内容，`--web` 改为在浏览器中打开。省略选择器时，交互终端下会从启用的工作流中选择，非交互环境必须给出选择器。

只有处于启用状态的工作流会被匹配。

## 参数

### `WORKFLOW-ID|WORKFLOW-NAME|FILENAME`

格式：`[<workflow-id> | <workflow-name> | <filename>]`。可选。要查看的工作流，可用工作流 ID、名称或文件名（如 `ci.yml`）定位；省略时在交互终端下交互选择。

## 选项

### `--web`

短旗标 `-w`。格式：`--web`。在浏览器中打开工作流。

### `--yaml`

短旗标 `-y`。格式：`--yaml`。查看工作流的 yaml 文件。

### `--ref`

短旗标 `-r`。格式：`--ref <string>`。要查看的工作流文件版本所在的分支或标签名。仅在查看 yaml 文件时有意义，必须与 `--yaml` 同用。

## 使用提醒

- 给 `--ref` 而未给 `--yaml` 会报参数错误。
- `--web` 与 `--yaml` 同用时打开该 ref 上工作流文件的页面；未指定 `--ref` 时取仓库默认分支。
- 查看 yaml 时若文件在给定 ref 上不存在，会提示换用其他 ref 或分支/标签重试。
- 名称匹配不区分大小写。

## 示例

```sh
# 交互选择要查看的工作流
gh workflow view

# 查看指定工作流
gh workflow view 0451

# 按文件名查看工作流的 yaml 文件
gh workflow view ci.yml --yaml
```

以上示例为说明性内容，未实际运行。

## 源码补充

- 命令定义、`--ref` 校验与摘要/文件两种视图见 [pkg/cmd/workflow/view/view.go](https://github.com/cli/cli/blob/fc4b137cdef0a6bd28fd461b7cf9c84a5812a8cd/pkg/cmd/workflow/view/view.go)。
- 选择器解析见 [pkg/cmd/workflow/shared/shared.go](https://github.com/cli/cli/blob/fc4b137cdef0a6bd28fd461b7cf9c84a5812a8cd/pkg/cmd/workflow/shared/shared.go) 的 `FindWorkflow`：纯数字 ID 与 `.yml`/`.yaml` 文件名按 ID 端点处理，其余按名称匹配。
