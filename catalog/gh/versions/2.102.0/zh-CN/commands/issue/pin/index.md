---
title: gh issue pin
command:
  - issue
  - pin
---

## 简介

把议题置顶到仓库，可用议题编号或 URL 指定。议题已置顶时不做更改并提示。

## 参数

### `NUMBER|URL`

必需。议题选择器，两种形式任选其一：议题编号（如 `123`，可带 `#` 前缀）或议题 URL（如 `https://github.com/OWNER/REPO/issues/123`）。URL 自带仓库信息时以该仓库为准。

## 使用提醒

- 议题已置顶时输出提示，不做更改并正常结束。
- 置顶状态可通过支持 `--json` 的命令查看，字段为 `isPinned`。

## 示例

```sh
# 把议题置顶到当前仓库
gh issue pin 23

# 按 URL 置顶议题
gh issue pin https://github.com/owner/repo/issues/23

# 置顶到指定仓库的议题
gh issue pin 23 --repo owner/repo
```

以上示例为说明性内容，未实际运行。

## 源码补充

- 命令定义见 [pkg/cmd/issue/pin/pin.go](https://github.com/cli/cli/blob/fc4b137cdef0a6bd28fd461b7cf9c84a5812a8cd/pkg/cmd/issue/pin/pin.go)。
