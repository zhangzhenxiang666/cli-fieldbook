---
title: gh run view
command:
  - run
  - view
---

查看一次工作流运行的摘要。

## 简介

`gh run view` 展示一次运行的摘要：运行头部信息、job 列表（`--verbose` 展开步骤）、注解与产物，也可改为查看完整日志、失败步骤日志或在浏览器打开。省略运行 ID 且未给 `--job` 时，交互终端下会先选择运行（再可选单个 job）；非交互环境必须给出运行 ID 或 `--job`。同时给出运行 ID 与 `--job` 时忽略运行 ID（交互终端下打印警告）。

查看日志受平台限制：以 zip 包为主的获取方式可能无法把 job 与对应日志关联，此时 gh 会改为逐个 job 经 API 获取日志，该回退更慢且更耗资源；缺失的 job 日志超过 25 个时操作报错，可用 `--job` 缩小范围。个别日志行无法关联到具体步骤时，步骤名在输出中显示为 `UNKNOWN STEP`。日志仅在运行（或 job）完成后可查看。

## 参数

### `RUN-ID`

格式：`[<run-id>]`。可选。要查看的运行 ID；省略时在交互终端下从近期运行中选择。

## 选项

### `--verbose`

短旗标 `-v`。格式：`--verbose`。显示 job 的步骤。

### `--exit-status`

格式：`--exit-status`。运行失败时以非零退出码退出（`1`，见[退出代码](../../../reference/exit-codes.md)）。

### `--job`

短旗标 `-j`。格式：`--job <string>`。查看运行中指定 ID 的 job。

### `--log`

格式：`--log`。查看整个运行或指定 job 的完整日志。

### `--log-failed`

格式：`--log-failed`。查看整个运行或指定 job 中失败步骤的日志。

### `--web`

短旗标 `-w`。格式：`--web`。在浏览器中打开运行。

### `--attempt`

短旗标 `-a`。格式：`--attempt <int>`。查看运行的第几次尝试（重新运行的序号）。

### `--json`

格式：`--json <strings>`。逗号分隔的导出字段，可用字段：`name`、`displayTitle`、`headBranch`、`headSha`、`createdAt`、`updatedAt`、`startedAt`、`attempt`、`status`、`conclusion`、`event`、`number`、`databaseId`、`workflowDatabaseId`、`workflowName`、`url`、`jobs`。配合 `--jq`、`--template` 加工输出，见 [JSON 输出与格式化](../../../reference/formatting.md)。

### `--jq`

短旗标 `-q`。格式：`--jq <expression>`。按 jq 表达式筛选或重组 `--json` 的输出。

### `--template`

短旗标 `-t`。格式：`--template <string>`。按 Go 模板渲染 `--json` 的输出。

## 使用提醒

- `--web` 与 `--log` 互斥；`--log` 与 `--log-failed` 互斥，同时给出会报参数错误。
- 日志只在运行（或 job）完成后可用，进行中时会提示日志在完成后才可查看。
- 摘要视图中的注解（ANNOTATIONS）要求令牌具备 `checks:read` 权限；目前无法创建带该权限的细粒度 PAT，权限不足时该节会给出相应提示。
- 运行失败时，摘要末尾会提示用 `gh run view <run-id> --log-failed` 查看失败步骤日志。
- `--jq` 与 `--template` 都依赖 `--json` 同时给出。

## 示例

```sh
# 交互选择一次运行查看，还可再选单个 job
gh run view

# 查看指定运行
gh run view 12345

# 查看指定尝试次数的运行
gh run view 12345 --attempt 3

# 查看运行中的指定 job
gh run view --job 456789

# 查看指定 job 的完整日志
gh run view --log --job 456789

# 运行失败时以非零码退出
gh run view 0451 --exit-status && echo "run pending or passed"
```

以上示例为说明性内容，未实际运行。

## 源码补充

- 命令定义、交互选择、互斥校验与日志获取（zip 主方式、逐 job 回退、缺失超过 25 个即报错、`UNKNOWN STEP`）见 [pkg/cmd/run/view/view.go](https://github.com/cli/cli/blob/fc4b137cdef0a6bd28fd461b7cf9c84a5812a8cd/pkg/cmd/run/view/view.go)。
- `--attempt` 类型为 `uint64`，默认 `0` 表示最新一次尝试；默认值为零，按归一化约定（仅记录非零默认值）未记入字段清单。上方示例中的 `--attempt 3` 来自源码示例。
