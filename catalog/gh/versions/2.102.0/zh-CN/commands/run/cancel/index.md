---
title: gh run cancel
command:
  - run
  - cancel
---

取消一次工作流运行。

## 简介

`gh run cancel` 提交取消一次工作流运行的请求；`--force` 改为提交强制取消。省略运行 ID 时，交互终端下会从当前进行中的运行里选择，非交互环境必须给出 ID。运行 ID 必须是数字。

## 参数

### `RUN-ID`

格式：`[<run-id>]`。可选。要取消的运行 ID；省略时在交互终端下从进行中的运行中选择。

## 选项

### `--force`

格式：`--force`。强制取消工作流运行。

## 使用提醒

- 对已完成的运行发起取消会被服务器拒绝（HTTP 409，提示 Cannot cancel a workflow run that is completed）。
- 成功时输出已提交取消请求的提示，取消是否生效以 GitHub Actions 的实际状态为准。

## 示例

```sh
# 取消指定运行
gh run cancel 12345

# 强制取消指定运行
gh run cancel 12345 --force

# 交互选择进行中的运行并取消
gh run cancel
```

以上示例为说明性内容，未实际运行。

## 源码补充

- 命令定义、取消与强制取消的端点选择见 [pkg/cmd/run/cancel/cancel.go](https://github.com/cli/cli/blob/fc4b137cdef0a6bd28fd461b7cf9c84a5812a8cd/pkg/cmd/run/cancel/cancel.go)。
