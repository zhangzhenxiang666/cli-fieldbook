---
title: gh ssh-key
command:
  - ssh-key
---

管理 GitHub 账号上注册的 SSH 密钥。

## 简介

`gh ssh-key` 用于管理注册在你 GitHub 账号上的 SSH 公钥：添加新的公钥（认证密钥或签名密钥）、删除既有密钥、列出账号中的密钥。密钥与当前认证的默认主机关联。

## 子命令导览

- [gh ssh-key add](cli:command:ssh-key/add)：向账号添加一个 SSH 公钥，可选认证或签名类型。
- [gh ssh-key delete](cli:command:ssh-key/delete)：从账号删除一个 SSH 密钥。
- [gh ssh-key list](cli:command:ssh-key/list)：列出账号中的 SSH 密钥，别名 `ls`。

## 使用提醒

- 认证密钥（authentication）与签名密钥（signing）在 GitHub 上分属不同接口，添加时用 `--type` 区分。
- 签名密钥用于提交与标签的 SSH 签名，认证密钥用于 Git over SSH 的身份认证。

## 示例

```sh
# 列出账号中的 SSH 密钥
gh ssh-key list

# 把公钥添加为认证密钥
gh ssh-key add ~/.ssh/id_ed25519.pub
```

以上示例为说明性内容，未实际运行。

## 源码补充

- 分组定义见 [pkg/cmd/ssh-key/ssh_key.go](https://github.com/cli/cli/blob/fc4b137cdef0a6bd28fd461b7cf9c84a5812a8cd/pkg/cmd/ssh-key/ssh_key.go)。
