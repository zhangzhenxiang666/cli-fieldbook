---
title: gh release delete
command:
  - release
  - delete
---

删除一个 release。

## 简介

交互终端下删除前会请求确认，`--yes` 可跳过。默认只删除 release 本身，对应的 git tag 仍保留在仓库中，命令会输出提醒；`--cleanup-tag` 在删除 release 之外把远端 tag 一并删除，并顺带删除本地的同名 tag（用 `--repo` 覆盖仓库时不删本地 tag）。目标 release 按给出的 tag 查找，含按待定 tag 查找草稿 release。

## 参数

### `TAG`

格式：`<tag>`，必填。要删除的 release 的 tag 名。

## 选项

### `--yes`

短旗标 `-y`。格式：`--yes`。跳过确认提示。

### `--cleanup-tag`

格式：`--cleanup-tag`。在删除 release 之外一并删除其 tag。

## 使用提醒

- 非交互运行时不会出现确认提示，等价于直接删除。
- 只删 release 不删 tag 时，后续同 tag 重建 release 可能受既有 tag 影响；需要彻底清理时用 `--cleanup-tag`。
- 目标仓库用继承选项 `-R`/`--repo` 切换。

## 示例

```sh
# 删除指定 release（交互确认）
gh release delete v1.2.3

# 跳过确认并连同 tag 一起删除
gh release delete v1.2.3 --yes --cleanup-tag
```

以上示例为说明性内容，未实际运行。

## 源码补充

- 命令定义、确认流程、tag 清理与本地 tag 删除见 [pkg/cmd/release/delete/delete.go](https://github.com/cli/cli/blob/fc4b137cdef0a6bd28fd461b7cf9c84a5812a8cd/pkg/cmd/release/delete/delete.go)。
- release 查找逻辑见 [pkg/cmd/release/shared/fetch.go](https://github.com/cli/cli/blob/fc4b137cdef0a6bd28fd461b7cf9c84a5812a8cd/pkg/cmd/release/shared/fetch.go)。
