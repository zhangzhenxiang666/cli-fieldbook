---
title: gh pr unlock
command:
  - pr
  - unlock
---

解锁拉取请求的对话。

## 简介

解除 [gh pr lock](cli:command:pr/lock) 的锁定，恢复评论。本命令与 `gh issue unlock` 共用同一实现：构造时传入父命令名，错误提示与输出都会带上"Pull request"字样；参数只接受编号或 URL 两种形式，不支持分支名。

对已解锁的拉取请求，仅输出"已解锁，无变化"的提示。

## 参数

### `NUMBER|URL`

必填，命令形态为 `{<number> | <url>}`。定位目标拉取请求，两种形式：

- 数字：拉取请求编号，如 `123`；
- URL：拉取请求地址，如 `https://github.com/OWNER/REPO/pull/123`。

不支持分支名形式。

## 使用提醒

- 参数必填：省略时 cobra 报出需要恰好一个参数的错误。
- 传入的编号实际对应议题（而非拉取请求）时，命令报错并提示改用 `gh issue unlock`。
- 本命令没有自有选项。

## 示例

```sh
# 解锁指定拉取请求
$ gh pr unlock 23

# 以 URL 定位
$ gh pr unlock https://github.com/OWNER/REPO/pull/23
```

以上示例为说明性内容，未实际运行。

## 源码补充

- 命令定义与解锁后的输出见 [pkg/cmd/issue/lock/lock.go](https://github.com/cli/cli/blob/fc4b137cdef0a6bd28fd461b7cf9c84a5812a8cd/pkg/cmd/issue/lock/lock.go)；该构造器带 `parentName` 参数，`gh pr unlock` 与 `gh issue unlock` 共用。
