---
title: gh issue unpin
command:
  - issue
  - unpin
---

## 简介

取消议题在仓库中的置顶，可用议题编号或 URL 指定。议题未置顶时不做更改并提示。

## 参数

### `NUMBER|URL`

必需。议题选择器，两种形式任选其一：议题编号（如 `123`，可带 `#` 前缀）或议题 URL（如 `https://github.com/OWNER/REPO/issues/123`）。URL 自带仓库信息时以该仓库为准。

## 使用提醒

- 议题未置顶时输出提示，不做更改并正常结束。

## 示例

```sh
# 取消议题在当前仓库的置顶
gh issue unpin 23

# 按 URL 取消置顶
gh issue unpin https://github.com/owner/repo/issues/23

# 取消指定仓库中议题的置顶
gh issue unpin 23 --repo owner/repo
```

以上示例为说明性内容，未实际运行。

## 源码补充

- 命令定义见 [pkg/cmd/issue/unpin/unpin.go](https://github.com/cli/cli/blob/fc4b137cdef0a6bd28fd461b7cf9c84a5812a8cd/pkg/cmd/issue/unpin/unpin.go)。
