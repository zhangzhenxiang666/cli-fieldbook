---
title: gh auth logout
command:
  - auth
  - logout
---

移除某个 GitHub 账号在本地存储的认证配置。

## 简介

本命令只移除 gh 本地存储的认证配置，不会撤销认证令牌。若要撤销 GitHub CLI 生成的所有认证令牌：

1. 访问 <https://github.com/settings/applications>
2. 选择 "GitHub CLI" 应用
3. 选择 "Revoke Access"
4. 选择 "I understand, revoke access"

注意：该操作会撤销你在所有设备上由 GitHub CLI 生成的全部认证令牌。关于撤销 OAuth 应用令牌的更多说明，见 [GitHub 文档](https://docs.github.com/en/apps/oauth-apps/using-oauth-apps/reviewing-your-authorized-oauth-apps)。

## 参数

本命令不接受位置参数。

## 选项

### `--hostname`

短旗标 `-h`。格式：`--hostname <string>`。指定要登出的 GitHub 主机名。

### `--user`

短旗标 `-u`。格式：`--user <string>`。指定要登出的账号。

## 环境变量

- 当认证令牌来自 `GH_TOKEN` 等环境变量时，本命令不会改动本地凭据，而是提示先清除环境变量中的值；见[环境变量](../../../reference/environment.md)。

## 使用提醒

- 未给定 `--hostname`/`--user` 且存在多个候选账号时，交互式选择要登出的账号；非交互且无法唯一确定时报错，要求显式给出 `--hostname` 与 `--user`。
- 指定的主机或账号未登录过时会直接报错。
- 登出某主机的活动账号后，若该主机还有其它账号，gh 会自动切换活动账号并在输出中提示。

## 示例

```sh
# 通过提示选择要登出的主机与账号
gh auth logout

# 登出指定主机上的指定账号
gh auth logout --hostname enterprise.internal --user monalisa
```

以上示例为说明性内容，未实际运行。

## 源码补充

- 命令定义、候选账号判定与活动账号自动切换见 [pkg/cmd/auth/logout/logout.go](https://github.com/cli/cli/blob/fc4b137cdef0a6bd28fd461b7cf9c84a5812a8cd/pkg/cmd/auth/logout/logout.go)。
