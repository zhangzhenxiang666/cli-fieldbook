---
title: gh ssh-key list
command:
  - ssh-key
  - list
---

列出 GitHub 账号中的 SSH 密钥。

## 简介

以表格列出当前认证主机账号中的全部 SSH 密钥，同时包含认证密钥与签名密钥（源码合并两个接口的结果），列为 TITLE、ID、KEY、TYPE、ADDED；公钥过长时中间截断显示。账号中没有 SSH 密钥时命令以"无结果"错误结束。

认证与签名两个密钥接口中任一获取失败时，命令在标准错误输出警告并继续；两个都失败才以错误结束。本命令不接受位置参数，也没有本地选项。

## 使用提醒

- 本命令无本地旗标；输出始终为表格，不支持 `--json`。
- TYPE 列区分 `authentication`（认证）与 `signing`（签名）密钥。
- 删除列出的密钥见 [`gh ssh-key delete`](cli:command:ssh-key/delete)。

## 示例

```sh
# 列出账号中的 SSH 密钥
gh ssh-key list
```

以上示例为说明性内容，未实际运行。

## 源码补充

- 命令定义、双接口合并与表格输出见 [pkg/cmd/ssh-key/list/list.go](https://github.com/cli/cli/blob/fc4b137cdef0a6bd28fd461b7cf9c84a5812a8cd/pkg/cmd/ssh-key/list/list.go)。
