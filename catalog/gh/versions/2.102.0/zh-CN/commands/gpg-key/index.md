---
title: gh gpg-key
command:
  - gpg-key
---

管理 GitHub 账号上注册的 GPG 密钥。

## 简介

`gh gpg-key` 用于管理注册在你 GitHub 账号上的 GPG 密钥：添加新的 ASCII-armored 公钥、删除既有密钥、列出账号中的密钥。密钥与当前认证的默认主机关联，上传与列出分别需要 `write:gpg_key` 和 `read:gpg_key` OAuth scope，缺少时命令会提示用 `gh auth refresh` 补充授权。

## 子命令导览

- [gh gpg-key add](cli:command:gpg-key/add)：向账号添加 GPG 公钥。
- [gh gpg-key delete](cli:command:gpg-key/delete)：从账号删除一个 GPG 密钥。
- [gh gpg-key list](cli:command:gpg-key/list)：列出账号中的 GPG 密钥，别名 `ls`。

## 使用提醒

- 上传的公钥须为 ASCII-armored 格式；可用 `gpg --armor --export <ID>` 导出。
- 相关 scope 不足时，按命令提示运行 `gh auth refresh -s write:gpg_key`（或 `read:gpg_key`）。

## 示例

```sh
# 列出账号中的 GPG 密钥
gh gpg-key list

# 把 ASCII-armored 公钥添加到账号
gpg --armor --export <ID> | gh gpg-key add -
```

以上示例为说明性内容，未实际运行。

## 源码补充

- 分组定义见 [pkg/cmd/gpg-key/gpg_key.go](https://github.com/cli/cli/blob/fc4b137cdef0a6bd28fd461b7cf9c84a5812a8cd/pkg/cmd/gpg-key/gpg_key.go)。
