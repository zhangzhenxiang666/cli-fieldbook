---
title: gh issue delete
command:
  - issue
  - delete
---

## 简介

删除议题，删除后不可恢复。交互式运行时会先显示警告并要求输入议题编号确认；`--yes` 跳过确认，非交互运行不提示直接删除。拉取请求不能删除，遇到时报错。

## 参数

### `NUMBER|URL`

必需。议题选择器，两种形式任选其一：议题编号（如 `123`，可带 `#` 前缀）或议题 URL（如 `https://github.com/OWNER/REPO/issues/123`）。URL 自带仓库信息时以该仓库为准。

## 选项

### `--confirm`

格式：`--confirm`。删除前不再提示确认。已弃用，改用 `--yes`。

### `--yes`

格式：`--yes`。删除前不再提示确认。

## 使用提醒

- 交互式确认要求输入议题编号（如 `123`）。
- 删除成功后向标准错误输出确认信息。

## 示例

```sh
# 删除 123 号议题（交互确认）
gh issue delete 123

# 跳过确认直接删除
gh issue delete 123 --yes
```

以上示例为说明性内容，未实际运行。

## 源码补充

- 命令定义与删除确认见 [pkg/cmd/issue/delete/delete.go](https://github.com/cli/cli/blob/fc4b137cdef0a6bd28fd461b7cf9c84a5812a8cd/pkg/cmd/issue/delete/delete.go)。
