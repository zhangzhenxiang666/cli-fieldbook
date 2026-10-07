---
title: gh label delete
command:
  - label
  - delete
---

删除仓库中的一个标签。

## 简介

`gh label delete` 从目标仓库删除指定名称的标签。默认在删除前弹出确认提示，取消则命令以取消结束；非交互（脚本、管道）场景必须加 `--yes` 跳过确认，否则报错。

## 参数

### `NAME`

格式：`<name>`。要删除的标签名称；省略时命令报错。

## 选项

### `--confirm`

格式：`--confirm`。已弃用：确认删除而不提示，效果同 `--yes`，请改用 `--yes`。

### `--yes`

格式：`--yes`。删除前不再弹出确认提示；非交互模式下必须给出。

## 使用提醒

- 删除不可撤销；正在使用该标签的议题与拉取请求会随之失去这个分类。

## 示例

```sh
# 交互式删除标签（带确认提示）
gh label delete bug

# 非交互式删除标签
gh label delete bug --yes
```

以上示例为说明性内容，未实际运行。

## 源码补充

- 命令定义、`--confirm` 的弃用标记与删除请求见 [pkg/cmd/label/delete.go](https://github.com/cli/cli/blob/fc4b137cdef0a6bd28fd461b7cf9c84a5812a8cd/pkg/cmd/label/delete.go)。
