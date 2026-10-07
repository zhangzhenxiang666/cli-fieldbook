---
title: gh issue transfer
command:
  - issue
  - transfer
---

## 简介

把议题转移到另一个仓库，成功后向标准输出打印议题在新仓库的 URL。拉取请求不能转移，遇到时报错。

## 参数

### `NUMBER|URL`

必需。议题选择器，两种形式任选其一：议题编号（如 `123`，可带 `#` 前缀）或议题 URL（如 `https://github.com/OWNER/REPO/issues/123`）。URL 自带仓库信息时以该仓库为准。

### `DESTINATION-REPO`

必需。目标仓库，`OWNER/REPO` 形式；未显式包含主机时默认使用议题所在仓库的主机。

## 使用提醒

- 议题所在仓库与目标仓库是两个独立的选择：前者由议题 URL、当前仓库或 `--repo` 决定，后者由参数 `DESTINATION-REPO` 决定。
- 输出的新 URL 可直接用于 `gh issue view` 等后续命令。

## 示例

```sh
# 把 123 号议题转移到 owner/repo 仓库
gh issue transfer 123 owner/repo
```

以上示例为说明性内容，未实际运行。

## 源码补充

- 命令定义与目标仓库解析见 [pkg/cmd/issue/transfer/transfer.go](https://github.com/cli/cli/blob/fc4b137cdef0a6bd28fd461b7cf9c84a5812a8cd/pkg/cmd/issue/transfer/transfer.go)。
