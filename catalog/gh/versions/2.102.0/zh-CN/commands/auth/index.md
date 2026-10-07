---
title: gh auth
command:
  - auth
---

`gh auth` 管理 gh 与 git 对 GitHub 的认证：登录、登出、查看与刷新凭据、多账号切换，以及把 gh 配置为 git 的凭据助手。

## 简介

`auth` 组下的命令覆盖认证生命周期的各个环节：[`gh auth login`](cli:command:auth/login) 登录并存储凭据，[`gh auth status`](cli:command:auth/status) 检查各主机上的认证状态，[`gh auth refresh`](cli:command:auth/refresh) 调整令牌的 OAuth scope，[`gh auth switch`](cli:command:auth/switch) 在多账号间切换。

与其他多数命令不同，`auth` 组的命令不要求预先完成认证即可运行。已存储的凭据优先级低于环境变量令牌：设置 `GH_TOKEN`、`GITHUB_TOKEN`（或企业主机的 `GH_ENTERPRISE_TOKEN`、`GITHUB_ENTERPRISE_TOKEN`）后，gh 直接使用环境变量中的令牌，详见[环境变量](../../reference/environment.md)。

## 子命令导览

- [gh auth login](cli:command:auth/login)：登录某个 GitHub 账号。
- [gh auth logout](cli:command:auth/logout)：登出某个 GitHub 账号。
- [gh auth status](cli:command:auth/status)：显示每个已知 GitHub 主机上的活动账号与认证状态。
- [gh auth refresh](cli:command:auth/refresh)：刷新已存储的认证凭据。
- [gh auth git-credential](cli:command:auth/git-credential)：实现 git 凭据助手协议（隐藏的内部入口）。
- [gh auth setup-git](cli:command:auth/setup-git)：把 git 配置为使用 GitHub CLI。
- [gh auth token](cli:command:auth/token)：打印 gh 在指定主机与账号上使用的认证令牌。
- [gh auth switch](cli:command:auth/switch)：切换活动的 GitHub 账号。

## 参数

无位置参数；直接运行 `gh auth` 显示帮助。

## 环境变量

- `GH_TOKEN`/`GITHUB_TOKEN`：目标为 `github.com`（及其 `ghe.com` 子域名）时优先使用的令牌，设置后无需登录。
- `GH_ENTERPRISE_TOKEN`/`GITHUB_ENTERPRISE_TOKEN`：目标为 GitHub Enterprise Server 主机时优先使用的令牌。

完整清单见[环境变量](../../reference/environment.md)。

## 使用提醒

- 同一主机可登录多个账号：[`gh auth status`](cli:command:auth/status) 查看全部账号，[`gh auth switch`](cli:command:auth/switch) 切换活动账号。
- 当认证来自环境变量令牌时，`logout`、`refresh`、`switch` 会拒绝改动已存储的凭据，并提示先清除环境变量中的值。
- git 的 https 操作可经由 [`gh auth setup-git`](cli:command:auth/setup-git) 复用 gh 已存储的凭据。

## 示例

```sh
# 登录并在浏览器中完成认证
gh auth login --web

# 检查各主机的认证状态
gh auth status

# 让 git 使用 gh 作为凭据助手
gh auth setup-git
```

以上示例为说明性内容，未实际运行。

## 源码补充

- 命令组注册与免认证检查（`DisableAuthCheck`）见 [pkg/cmd/auth/auth.go](https://github.com/cli/cli/blob/fc4b137cdef0a6bd28fd461b7cf9c84a5812a8cd/pkg/cmd/auth/auth.go)。
