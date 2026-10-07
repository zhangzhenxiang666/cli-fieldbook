---
title: gh gpg-key list
command:
  - gpg-key
  - list
---

列出 GitHub 账号中的 GPG 密钥。

## 简介

以表格列出当前认证主机账号中的全部 GPG 密钥，列为 EMAIL、KEY ID、PUBLIC KEY、ADDED、EXPIRES；公钥过长时中间截断显示。账号中没有 GPG 密钥时命令以"无结果"错误结束。

列出密钥需要令牌具有 `read:gpg_key` scope，缺少时命令会提示运行 `gh auth refresh -s read:gpg_key`。本命令不接受位置参数，也没有本地选项。

## 使用提醒

- 本命令无本地旗标；输出始终为表格，不支持 `--json`。
- EXPIRES 列在密钥未设置过期时间时显示 Never。

## 示例

```sh
# 列出账号中的 GPG 密钥
gh gpg-key list
```

以上示例为说明性内容，未实际运行。

## 源码补充

- 命令定义与表格输出见 [pkg/cmd/gpg-key/list/list.go](https://github.com/cli/cli/blob/fc4b137cdef0a6bd28fd461b7cf9c84a5812a8cd/pkg/cmd/gpg-key/list/list.go)。
