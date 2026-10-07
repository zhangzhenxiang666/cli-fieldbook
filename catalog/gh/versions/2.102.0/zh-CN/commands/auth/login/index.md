---
title: gh auth login
command:
  - auth
  - login
---

向某个 GitHub 主机认证并存储凭据。完成认证后，gh 与 git 都可以使用该凭据。

## 简介

默认主机为 `github.com`，可用 `--hostname` 覆盖。默认认证方式为基于浏览器的 OAuth 流程；完成后认证令牌会安全地存入系统凭据管理器，若找不到可用的凭据管理器，则回退为写入纯文本文件（存储位置可用 [`gh auth status`](cli:command:auth/status) 查看）。

也可改用 `--with-token` 从标准输入读入 classic 个人访问令牌，令牌所需的最小 scope 为 `repo`、`read:org` 与 `gist`。向 `--with-token` 传入细粒度个人访问令牌时要谨慎：令牌固有的资源范围在与其它资源交互时可能造成困惑，细粒度令牌建议改用 `GH_TOKEN` 环境变量。

此外，gh 会优先使用环境变量中的令牌，适合自动化等"无头"场景，详见[环境变量](../../../reference/environment.md)。在 GitHub Actions 中使用 gh 时，可在 `env` 中设置 `GH_TOKEN: ${{ github.token }}`。

git 操作使用的协议可用 `--git-protocol` 指定，或在交互提示中选择；登录针对主机上的单个账号，但协议设置对该主机上的所有账号生效。选择 `ssh` 协议时会检测既有 SSH 公钥并提示上传，找不到时提示创建并上传新密钥，可用 `--skip-ssh-key` 跳过。

OAuth scope 的说明见 [OAuth app scope 文档](https://docs.github.com/en/developers/apps/building-oauth-apps/scopes-for-oauth-apps/)。

## 参数

本命令不接受位置参数。

## 选项

### `--hostname`

短旗标 `-h`。格式：`--hostname <string>`。指定要认证的 GitHub 主机名，默认 `github.com`。

### `--scopes`

短旗标 `-s`。格式：`--scopes <strings>`。为令牌追加额外的 OAuth scope，可重复给出。与 `--with-token` 互斥。

### `--with-token`

格式：`--with-token`。从标准输入读入认证令牌，而非走浏览器流程。与 `--web`、`--scopes` 互斥。

### `--web`

短旗标 `-w`。格式：`--web`。强制走浏览器 OAuth 流程（交互模式下若未指定令牌方式，默认即走该流程）。

### `--clipboard`

短旗标 `-c`。格式：`--clipboard`。把浏览器流程中的一次性 OAuth 代码复制到剪贴板。

### `--git-protocol`

短旗标 `-p`。格式：`--git-protocol <string>`。设置该主机 git 操作使用的协议，取值 `ssh` 或 `https`。

### `--secure-storage`

格式：`--secure-storage`。强制把令牌保存到系统凭据管理器；保存失败时报错而非回退到纯文本文件。

### `--insecure-storage`

格式：`--insecure-storage`。把令牌保存为纯文本文件而非系统凭据管理器。

### `--skip-ssh-key`

格式：`--skip-ssh-key`。跳过选择 `ssh` 协议时的 SSH 公钥检测与上传提示。

## 环境变量

- `GH_TOKEN`/`GITHUB_TOKEN`：已设置时 gh 直接使用环境变量令牌，通常无需再登录；见[环境变量](../../../reference/environment.md)。

## 使用提醒

- `--web` 与 `--with-token` 二选一，同时给出会报错；`--scopes` 也不能与 `--with-token` 同用。
- 企业服务器（GHES）主机用 `--hostname` 指定；对应令牌环境变量为 `GH_ENTERPRISE_TOKEN`。
- 登录状态与令牌存储位置用 [`gh auth status`](cli:command:auth/status) 检查；切换账号用 [`gh auth switch`](cli:command:auth/switch)。
- 把 git 凭据助手配置为 gh 用 [`gh auth setup-git`](cli:command:auth/setup-git)。

## 示例

```sh
# 开始交互式登录
gh auth login

# 打开浏览器认证，并把一次性代码复制到剪贴板
gh auth login --web --clipboard

# 从文件读入令牌完成认证
gh auth login --with-token < mytoken.txt

# 认证指定主机
gh auth login --hostname enterprise.internal
```

以上示例为说明性内容，未实际运行。

## 源码补充

- 命令定义、交互流程与互斥检查见 [pkg/cmd/auth/login/login.go](https://github.com/cli/cli/blob/fc4b137cdef0a6bd28fd461b7cf9c84a5812a8cd/pkg/cmd/auth/login/login.go)。
