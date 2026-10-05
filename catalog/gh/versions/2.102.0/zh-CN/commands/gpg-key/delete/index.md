---
title: gh gpg-key delete
command:
  - gpg-key
  - delete
---

从 GitHub 账号删除一个 GPG 密钥。

## 简介

按密钥的 key ID 从账号删除 GPG 密钥。交互模式下删除前会弹出确认提示；非交互（无法提示）场景必须给出 `--yes`，否则报错。密钥不存在或不属于当前用户时报错。

## 参数

### `KEY-ID`

格式：`<key-id>`。要删除的 GPG 密钥的 key ID，必填；可用 [`gh gpg-key list`](cli:command:gpg-key/list) 查看账号中密钥的 KEY ID。

## 选项

### `--confirm`

格式：`--confirm`。跳过确认提示。已弃用：源码将其标记为 deprecated 并建议改用 `--yes`。

### `--yes`

短旗标 `-y`。格式：`--yes`。跳过确认提示；非交互模式下必需。

## 使用提醒

- 非交互模式（如脚本）必须带 `--yes`，否则命令以旗标错误结束。
- 删除是即时生效的破坏性操作；key ID 以 `gh gpg-key list` 的 KEY ID 列为准。

## 示例

```sh
# 交互确认后删除密钥
gh gpg-key delete <key-id>

# 跳过确认直接删除
gh gpg-key delete <key-id> --yes
```

以上示例为说明性内容，未实际运行。

## 源码补充

- 命令定义、确认流程与 `--confirm` 的弃用标注见 [pkg/cmd/gpg-key/delete/delete.go](https://github.com/cli/cli/blob/fc4b137cdef0a6bd28fd461b7cf9c84a5812a8cd/pkg/cmd/gpg-key/delete/delete.go)。
