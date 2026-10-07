---
title: gh issue lock
command:
  - issue
  - lock
---

## 简介

锁定议题对话。交互式运行且未指定原因时，会提示选择锁定原因（可不选原因）；非交互运行未指定原因时不带原因锁定。

## 参数

### `NUMBER|URL`

必需。议题选择器，两种形式任选其一：议题编号（如 `123`，可带 `#` 前缀）或议题 URL（如 `https://github.com/OWNER/REPO/issues/123`）。URL 自带仓库信息时以该仓库为准。

## 选项

### `--reason`

短旗标 `-r`。格式：`--reason <string>`。锁定对话的可选原因。取值 `off_topic`、`resolved`、`spam`、`too_heated`。

## 使用提醒

- 议题已锁定时：交互式运行会询问是否解锁后按新原因重新锁定，非交互运行直接报错。
- 编号对应拉取请求时报错，提示改用 `gh pr lock`。
- `--reason` 取值固定为上述四项并在本地校验，给出其他值会报参数错误；该枚举与用法说明来自源码旗标注册信息。

## 示例

```sh
# 锁定当前仓库 123 号议题（交互式运行会提示选择原因）
gh issue lock 123

# 指定锁定原因
gh issue lock 123 --reason <reason>
```

以上示例为说明性内容，未实际运行。

## 源码补充

- 锁定与解锁共用同一实现，构造器按父命令名生成对应命令：[pkg/cmd/issue/lock/lock.go](https://github.com/cli/cli/blob/fc4b137cdef0a6bd28fd461b7cf9c84a5812a8cd/pkg/cmd/issue/lock/lock.go)（`gh pr lock` 也使用此文件）。
