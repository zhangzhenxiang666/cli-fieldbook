---
title: gh run delete
command:
  - run
  - delete
---

删除一次工作流运行。

## 简介

`gh run delete` 提交删除一次工作流运行的请求。省略运行 ID 时，交互终端下会从近期运行（最多列出 10 条）中选择，非交互环境必须给出 ID。

## 参数

### `RUN-ID`

格式：`[<run-id>]`。可选。要删除的运行 ID；省略时在交互终端下从近期运行中选择。

## 使用提醒

- 服务器以冲突拒绝时（HTTP 409）提示无法删除已完成的运行。
- 除从当前仓库推断目标仓库外，本子命令没有额外选项；仓库选择见 [gh run](cli:command:run) 组页的 `--repo`。

## 示例

```sh
# 交互选择要删除的运行
gh run delete

# 删除指定运行
gh run delete 12345
```

以上示例为说明性内容，未实际运行。

## 源码补充

- 命令定义与删除请求见 [pkg/cmd/run/delete/delete.go](https://github.com/cli/cli/blob/fc4b137cdef0a6bd28fd461b7cf9c84a5812a8cd/pkg/cmd/run/delete/delete.go)。
