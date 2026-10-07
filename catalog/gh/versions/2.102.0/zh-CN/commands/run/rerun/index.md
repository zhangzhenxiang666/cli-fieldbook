---
title: gh run rerun
command:
  - run
  - rerun
---

重新运行一次工作流运行。

## 简介

`gh run rerun` 可重跑整个运行（默认）、仅失败的 job（`--failed`）或指定 job（`--job`），后两者会连同依赖的 job 一起重新运行。省略运行 ID 且未给 `--job` 时，交互终端下会从近期失败的运行中选择；非交互环境必须给出 `<run-id>` 或 `--job`。`--debug` 以调试日志重新运行。

注意 `--job` 的历史行为：浏览器中打开某个 job 时，URL 形如 `https://github.com/<owner>/<repo>/actions/runs/<run-id>/jobs/<number>`，但其中的 `<number>` 不能用于 `--job`，会导致 API 返回 `404 NOT FOUND`。正确的 job ID 应通过以下命令获取，重跑 job 需要使用 `databaseId` 字段：

```sh
gh run view <run-id> --json jobs --jq '.jobs[] | {name, databaseId}'
```

## 参数

### `RUN-ID`

格式：`[<run-id>]`。可选。要重跑的运行 ID；省略时在交互终端下从近期失败的运行中选择。

## 选项

### `--failed`

格式：`--failed`。仅重跑失败的 job，包括其依赖。

### `--job`

短旗标 `-j`。格式：`--job <string>`。重跑运行中指定 ID 的 job，包括其依赖。

### `--debug`

短旗标 `-d`。格式：`--debug`。以调试日志重新运行。

## 使用提醒

- `--job` 接受的是 job 的 `databaseId`，不是浏览器 URL 中 `jobs/` 后的数字，见上文简介。
- 服务器拒绝重跑时（HTTP 403）报错提示该运行或 job 无法重跑。
- 同时给出运行 ID 与 `--job` 时忽略运行 ID（交互终端下打印警告）。

## 示例

```sh
# 交互选择一次失败的运行并重跑
gh run rerun

# 重跑整个运行
gh run rerun 12345

# 仅重跑失败的 job
gh run rerun 12345 --failed

# 重跑指定 job（databaseId 来自 gh run view --json jobs）
gh run rerun --job 456789

# 以调试日志重跑
gh run rerun 12345 --debug
```

以上示例为说明性内容，未实际运行。

## 源码补充

- 命令定义、`--job` 的 `databaseId` 说明与重跑请求见 [pkg/cmd/run/rerun/rerun.go](https://github.com/cli/cli/blob/fc4b137cdef0a6bd28fd461b7cf9c84a5812a8cd/pkg/cmd/run/rerun/rerun.go)。
