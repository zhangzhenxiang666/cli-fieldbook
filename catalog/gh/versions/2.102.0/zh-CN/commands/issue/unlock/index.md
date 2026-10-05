---
title: gh issue unlock
command:
  - issue
  - unlock
---

## 简介

解锁议题对话。议题未锁定时不做更改并提示。

## 参数

### `NUMBER|URL`

必需。议题选择器，两种形式任选其一：议题编号（如 `123`，可带 `#` 前缀）或议题 URL（如 `https://github.com/OWNER/REPO/issues/123`）。URL 自带仓库信息时以该仓库为准。

## 使用提醒

- 编号对应拉取请求时报错，提示改用 `gh pr unlock`。

## 示例

```sh
# 解锁当前仓库 123 号议题
gh issue unlock 123
```

以上示例为说明性内容，未实际运行。

## 源码补充

- 锁定与解锁共用同一实现，构造器按父命令名生成对应命令：[pkg/cmd/issue/lock/lock.go](https://github.com/cli/cli/blob/fc4b137cdef0a6bd28fd461b7cf9c84a5812a8cd/pkg/cmd/issue/lock/lock.go)（`gh pr unlock` 也使用此文件）。
