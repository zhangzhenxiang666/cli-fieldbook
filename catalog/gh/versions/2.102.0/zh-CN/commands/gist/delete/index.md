---
title: gh gist delete
command:
  - gist
  - delete
---

删除一个 gist。

## 简介

`gh gist delete` 删除指定 gist。交互式使用时可不带参数，从账号最近的 gist 中选择并经确认后删除；非交互（脚本、管道）场景必须给出 gist ID 或 URL，并加 `--yes` 跳过确认，否则报错。

删除前默认弹出确认提示，取消则命令以取消结束。要删除的 gist 不存在或不属于当前账号时，删除失败并相应报错。

## 参数

### `ID|URL`

格式：`{<id> | <url>}`。要删除的 gist，接受 gist ID 或 URL 两种形式；省略时交互模式下从最近的 gist 中选择，非交互模式下报错。

## 选项

### `--yes`

格式：`--yes`。删除前不再弹出确认提示；非交互模式下必须给出。

## 使用提醒

- 删除不可撤销；非交互场景同时需要 gist 参数与 `--yes`。

## 示例

```sh
# 交互式删除 gist
gh gist delete

# 非交互式删除 gist
gh gist delete 1234
```

以上示例为说明性内容，未实际运行。

## 源码补充

- 命令定义、确认流程与删除请求见 [pkg/cmd/gist/delete/delete.go](https://github.com/cli/cli/blob/fc4b137cdef0a6bd28fd461b7cf9c84a5812a8cd/pkg/cmd/gist/delete/delete.go)。
