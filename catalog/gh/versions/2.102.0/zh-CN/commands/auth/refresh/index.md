---
title: gh auth refresh
command:
  - auth
  - refresh
---

为活动账号扩展或修复已存储凭据的 scope。

## 简介

本命令通过重新走一遍浏览器 OAuth 认证流程，扩展或修复已存储凭据的 scope。

`--scopes` 接受逗号分隔的 scope 列表，为凭据追加 scope；未提供任何 scope 时，命令保留此前已添加的 scope。`--remove-scopes` 同样接受逗号分隔的列表，移除操作是幂等的；最小 scope 集合（`repo`、`read:org` 与 `gist`）无法被移除。`--reset-scopes` 把凭据的 scope 重置为认证流程的默认最小集合。

若 [`gh auth status`](cli:command:auth/status) 显示多个账号，要刷新非活动账号的凭据，需先用 [`gh auth switch`](cli:command:auth/switch) 切换到该账号，完成后再切回。OAuth scope 的说明见 [OAuth app scope 文档](https://docs.github.com/en/developers/apps/building-oauth-apps/scopes-for-oauth-apps/)。

## 参数

本命令不接受位置参数。

## 选项

### `--hostname`

短旗标 `-h`。格式：`--hostname <string>`。指定用于认证的 GitHub 主机。非交互模式下必填。

### `--scopes`

短旗标 `-s`。格式：`--scopes <strings>`。为 gh 的凭据追加额外的认证 scope。

### `--remove-scopes`

短旗标 `-r`。格式：`--remove-scopes <strings>`。从 gh 的凭据中移除认证 scope。

### `--reset-scopes`

格式：`--reset-scopes`。把认证 scope 重置为默认的最小 scope 集合。

### `--clipboard`

短旗标 `-c`。格式：`--clipboard`。把一次性 OAuth 设备码复制到剪贴板。未显式给出时遵循 gh 的 clipboard 配置。

### `--secure-storage`

格式：`--secure-storage`。把认证凭据保存到系统凭据管理器。此旗标在帮助中隐藏：安全存储自 2023-04-04 起已是默认行为，保留它仅为向后兼容，不再产生实际效果。

### `--insecure-storage`

格式：`--insecure-storage`。把认证凭据保存为纯文本而非系统凭据管理器。

## 环境变量

- 当认证令牌来自 `GH_TOKEN` 等环境变量时，本命令拒绝刷新并提示先清除环境变量中的值；见[环境变量](../../../reference/environment.md)。

## 使用提醒

- 非交互模式下必须提供 `--hostname`，否则报旗标错误。
- 浏览器中完成认证的账号须与当前活动账号一致，否则刷新会被拒绝并报错。
- 交互模式下若该主机的 git 协议为 `https`，会顺带提示配置 git 凭据助手。

## 示例

```sh
# 打开浏览器，追加 write:org 与 read:public_key scope
gh auth refresh --scopes write:org,read:public_key

# 打开浏览器，确保认证凭据具有正确的最小 scope
gh auth refresh

# 打开浏览器，幂等地移除 delete_repo scope
gh auth refresh --remove-scopes delete_repo

# 打开浏览器，以默认最小 scope 重新认证
gh auth refresh --reset-scopes

# 打开浏览器重新认证，并把一次性 OAuth 码复制到剪贴板
gh auth refresh --clipboard
```

以上示例为说明性内容，未实际运行。

## 源码补充

- 命令定义、scope 合并逻辑与隐藏的 `--secure-storage` 兼容处理见 [pkg/cmd/auth/refresh/refresh.go](https://github.com/cli/cli/blob/fc4b137cdef0a6bd28fd461b7cf9c84a5812a8cd/pkg/cmd/auth/refresh/refresh.go)。
