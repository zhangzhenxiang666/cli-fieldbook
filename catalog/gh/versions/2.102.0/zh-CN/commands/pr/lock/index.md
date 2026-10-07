---
title: gh pr lock
command:
  - pr
  - lock
---

锁定拉取请求的对话。

## 简介

锁定后，有权限范围之外的用户无法再向该拉取请求添加评论。本命令与 `gh issue lock` 共用同一实现：构造时传入父命令名，错误提示与输出都会带上"Pull request"字样；参数只接受编号或 URL 两种形式，不支持分支名。

交互模式下未给出 `--reason` 时，会提示选择锁定原因（含"无原因"）。对已锁定的拉取请求：交互模式下询问是否先解锁再以新原因重新锁定；非交互模式下直接报错。

## 参数

### `NUMBER|URL`

必填，命令形态为 `{<number> | <url>}`。定位目标拉取请求，两种形式：

- 数字：拉取请求编号，如 `123`；
- URL：拉取请求地址，如 `https://github.com/OWNER/REPO/pull/123`。

不支持分支名形式。

## 选项

### `--reason`

短旗标 `-r`。格式：`--reason <string>`。锁定对话的可选原因。取值 `off_topic`、`resolved`、`spam`、`too_heated`。

## 使用提醒

- 参数必填：省略时 cobra 报出需要恰好一个参数的错误。
- 传入的编号实际对应议题（而非拉取请求）时，命令报错并提示改用 `gh issue lock`。
- 锁定成功后输出形如 `Locked as RESOLVED: Pull request OWNER/REPO#123（标题）` 的信息；未给原因时没有 `as …` 部分。
- 该枚举取值与用法说明来自源码旗标注册信息。

## 示例

```sh
# 锁定指定拉取请求（交互模式下会提示选择原因）
$ gh pr lock 23

# 以垃圾信息原因锁定
$ gh pr lock 23 --reason spam

# 以 URL 定位并注明原因
$ gh pr lock https://github.com/OWNER/REPO/pull/23 --reason off_topic
```

以上示例为说明性内容，未实际运行。

## 源码补充

- 命令定义、原因枚举、重新锁定流程与输出格式见 [pkg/cmd/issue/lock/lock.go](https://github.com/cli/cli/blob/fc4b137cdef0a6bd28fd461b7cf9c84a5812a8cd/pkg/cmd/issue/lock/lock.go)；该构造器带 `parentName` 参数，`gh pr lock` 与 `gh issue lock` 共用。
