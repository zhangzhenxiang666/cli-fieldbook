---
title: gh auth git-credential
command:
  - auth
  - git-credential
---

此命令在 `gh --help` 中隐藏。它是 git credential helper 协议的内部入口：git 在 https 操作中经它向 gh 询问已存储的认证凭据，一般不手动运行。

## 简介

git 允许把凭据的查询与存储委托给外部 credential helper。本命令实现该协议：git 调用 `gh auth git-credential <操作>`，gh 从标准输入读取 `key=value` 形式的查询描述，处理后向标准输出返回结果。

支持的操作（即唯一的位置参数）：

- `get`：按输入描述查询凭据，仅支持 `protocol=https`；命中时输出 `protocol`、`host`、`username`、`password` 四行。输入中的 `url` 行会被拆解为 protocol/host/path/username/password 各字段。
- `store`：空操作——令牌已由 gh 缓存，无需再存。
- `erase`：空操作——避免 git 因此触发登出。

其它操作名会报错；无匹配凭据时以非零退出码结束且不输出结果，供 git 继续尝试其它途径。

## 参数

本命令接受一个位置参数：git credential 协议的操作名（`get`、`store` 或 `erase`）。

## 环境变量

- 凭据解析与其它命令一致，环境变量令牌（`GH_TOKEN` 等）优先；此时返回的用户名固定为 `x-access-token`。见[环境变量](../../../reference/environment.md)。

## 使用提醒

- 把 gh 配置为 git 凭据助手用 [`gh auth setup-git`](cli:command:auth/setup-git)，其写入的 git 配置即指向本入口。
- 查询 `gist.` 开头的主机（如 `gist.github.com`）无匹配凭据时，会退回去掉 `gist.` 前缀的主机再查一次。
- 本命令面向 git 自动调用，日常认证问题应改用 [`gh auth login`](cli:command:auth/login) 与 [`gh auth status`](cli:command:auth/status)。

## 示例

```sh
# 手动测试 helper：按 git credential 协议从标准输入传入查询描述
printf 'protocol=https\nhost=github.com\n\n' | gh auth git-credential get
```

以上示例为说明性内容，未实际运行。

## 源码补充

- 协议实现与 `get`/`store`/`erase` 行为见 [pkg/cmd/auth/gitcredential/helper.go](https://github.com/cli/cli/blob/fc4b137cdef0a6bd28fd461b7cf9c84a5812a8cd/pkg/cmd/auth/gitcredential/helper.go)。
