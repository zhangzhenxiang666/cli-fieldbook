---
title: gh workflow run
command:
  - workflow
  - run
---

通过创建 `workflow_dispatch` 事件运行一个工作流。

## 简介

`gh workflow run` 为给定工作流创建 `workflow_dispatch` 事件，触发 GitHub Actions 运行该工作流文件；工作流文件必须声明 `on.workflow_dispatch` 触发器才能以这种方式运行。未指定 `--ref` 时在仓库默认分支的版本上运行。

工作流输入（inputs）可用几种方式指定：

- 交互式逐项填写；
- 经 `-f/--raw-field` 或 `-F/--field` 旗标在命令行给出；
- 经标准输入以 JSON 传入。

创建的工作流运行 URL 会在可用时输出。只有处于启用状态的工作流会被匹配；仓库没有启用的工作流时报错。

## 参数

### `WORKFLOW-ID|WORKFLOW-NAME`

格式：`[<workflow-id> | <workflow-name>]`。可选。要运行的工作流，可用工作流 ID 或名称定位；省略时在交互终端下先选择工作流，再交互收集输入。

## 选项

### `--ref`

短旗标 `-r`。格式：`--ref <string>`。要运行的工作流文件版本所在的分支或标签名。

### `--field`

短旗标 `-F`。格式：`--field <key=value>`。以 `key=value` 格式添加字符串参数，遵循 @ 语法（参见 `gh help api`，即 [`gh api`](cli:command:api)）。

### `--raw-field`

短旗标 `-f`。格式：`--raw-field <key=value>`。以 `key=value` 格式添加字符串参数。

### `--json`

格式：`--json`。经标准输入（STDIN）以 JSON 读入工作流输入。

## 使用提醒

- `@` 语法：`-F` 传入的值以 `@` 开头时，从对应文件读取内容作为该参数的值。
- `--json` 与 `-f`/`-F` 互斥；给了 `-f`/`-F` 或 `--json` 而未给工作流参数会报参数错误。
- 成功后输出创建的事件与运行 URL，并提示用 [`gh run view`](cli:command:run/view) 查看创建的运行、用 [`gh run list`](cli:command:run/list) 查看该工作流的运行。
- 名称匹配不区分大小写；源码对以 `.yml`/`.yaml` 结尾的选择器同样支持按文件名解析，源码示例即用 `triage.yml`。

## 示例

```sh
# 让 gh 提示选择要运行的工作流并交互收集输入
gh workflow run

# 在远端默认分支上运行工作流文件 triage.yml
gh workflow run triage.yml

# 在指定 ref 上运行工作流文件 triage.yml
gh workflow run triage.yml --ref my-branch

# 以命令行输入运行工作流文件 triage.yml
gh workflow run triage.yml -f name=scully -f greeting=hello

# 以标准输入 JSON 运行工作流文件 triage.yml
echo '{"name":"scully", "greeting":"hello"}' | gh workflow run triage.yml --json
```

以上示例为说明性内容，未实际运行。

## 源码补充

- 命令定义、输入解析与触发请求见 [pkg/cmd/workflow/run/run.go](https://github.com/cli/cli/blob/fc4b137cdef0a6bd28fd461b7cf9c84a5812a8cd/pkg/cmd/workflow/run/run.go)。
- 选择器解析见 [pkg/cmd/workflow/shared/shared.go](https://github.com/cli/cli/blob/fc4b137cdef0a6bd28fd461b7cf9c84a5812a8cd/pkg/cmd/workflow/shared/shared.go) 的 `FindWorkflow`。
