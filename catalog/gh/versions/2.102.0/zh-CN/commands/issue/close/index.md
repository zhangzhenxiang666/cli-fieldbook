---
title: gh issue close
command:
  - issue
  - close
---

## 简介

关闭议题，可同时留下评论并指定关闭原因。给出 `--duplicate-of` 时默认以 duplicate 原因关闭；议题已处于关闭状态时不做更改并提示。编号对应拉取请求时改为关闭该拉取请求。

## 参数

### `NUMBER|URL`

必需。议题选择器，两种形式任选其一：议题编号（如 `123`，可带 `#` 前缀）或议题 URL（如 `https://github.com/OWNER/REPO/issues/123`）。URL 自带仓库信息时以该仓库为准。

## 选项

### `--comment`

短旗标 `-c`。格式：`--comment <string>`。留一条关闭评论。

### `--reason`

短旗标 `-r`。格式：`--reason <string>`。关闭原因。取值 `completed`、`not planned`、`duplicate`。

### `--duplicate-of`

格式：`--duplicate-of <string>`。按编号或 URL 标记为另一个议题的重复议题。

## 使用提醒

- 未指定 `--reason` 时不设置关闭原因；`--duplicate-of` 隐含 duplicate 原因，且只能与 `--reason duplicate` 搭配。
- `--duplicate-of` 指向的必须是议题（不能是拉取请求），也不能是当前议题本身。
- 关闭对象是拉取请求时不支持 `--duplicate-of`。

## 示例

```sh
# 关闭议题
gh issue close 123

# 关闭议题并留一条评论
gh issue close 123 --comment "Closing this issue"

# 关闭议题并标记为 456 号议题的重复议题
gh issue close 123 --duplicate-of 456

# 以 not planned 原因关闭议题
gh issue close 123 --reason "not planned"
```

以上示例为说明性内容，未实际运行。

## 源码补充

- 命令定义、关闭原因到 GraphQL stateReason 的映射见 [pkg/cmd/issue/close/close.go](https://github.com/cli/cli/blob/fc4b137cdef0a6bd28fd461b7cf9c84a5812a8cd/pkg/cmd/issue/close/close.go)。
