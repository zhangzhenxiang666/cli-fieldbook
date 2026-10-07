---
title: 退出代码
---

gh 遵循常见的退出代码约定。本页整理自固定提交的帮助主题 `gh help exit-codes`（[pkg/cmd/root/help_topic.go](https://github.com/cli/cli/blob/fc4b137cdef0a6bd28fd461b7cf9c84a5812a8cd/pkg/cmd/root/help_topic.go)）。

## 代码含义

| 退出代码 | 含义 |
| --- | --- |
| `0` | 命令成功完成 |
| `1` | 命令因任何原因失败 |
| `2` | 命令运行中被取消 |
| `4` | 命令需要认证 |

## 使用提醒

- 个别命令可能定义更多退出代码；在脚本中依赖退出码控制流程时，应先查阅该命令的说明。
- 未认证场景由根命令的统一检查触发（[pkg/cmd/root/root.go](https://github.com/cli/cli/blob/fc4b137cdef0a6bd28fd461b7cf9c84a5812a8cd/pkg/cmd/root/root.go)），与 `4` 对应的错误信息会提示先运行 `gh auth login`。
