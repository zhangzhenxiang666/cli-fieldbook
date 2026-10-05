---
title: gh 总览与认证
uses:
  - command:auth/git-credential
  - command:auth/login
  - command:auth/logout
  - command:auth/refresh
  - command:auth/setup-git
  - command:auth/status
  - command:auth/switch
  - command:auth/token
---

gh 是 GitHub 官方命令行工具，把 GitHub 平台侧的操作（拉取请求、议题、release、GitHub Actions 等）带到终端。本文说明 gh 的定位、安装后首次使用的认证模型、令牌的取用顺序，以及 gh 如何充当 git 的凭据助手。命令如何选定目标仓库见[仓库上下文与默认仓库](repo-context.md)；环境变量与退出代码的完整语义见[环境变量](../reference/environment.md)与[退出代码](../reference/exit-codes.md)。

## gh 是什么

gh 采用 `gh <命令> <子命令>` 的两级命令树，顶层按用途分组：核心命令（`auth`、`pr`、`issue`、`repo`、`release`、`gist` 等）、GitHub Actions 命令（`run`、`workflow`、`cache`）与附加命令（`api`、`search`、`alias`、`config`、`extension` 等）。完整命令树从[根命令](cli:command:)进入。

gh 与 git 分工：git 管理本地的提交、分支与远端，gh 补足平台侧的评审、发布与编排动作，两者可以衔接——例如用 [gh pr checkout](cli:command:pr/checkout) 把一个拉取请求检出到本地分支后，继续用 git 修改并推送。

## 首次使用的认证模型

大多数命令在执行前要求已完成认证；未认证时 gh 会提示先运行 [gh auth login](cli:command:auth/login)。该命令针对一个 GitHub 主机认证并把凭据存入本机：

- 主机：默认 `github.com`，用 `--hostname` 可指定 GitHub Enterprise Server 等其他主机。
- 方式：默认走基于浏览器的 OAuth 流程——gh 给出一次性代码，浏览器完成授权后令牌写入本机；不便于开浏览器时改用 `--with-token` 从标准输入读入一个 classic 个人访问令牌，要求至少具备 `repo`、`read:org` 与 `gist` scope（细粒度令牌建议改用 `GH_TOKEN` 环境变量，见下文）。
- 存储：优先存入系统凭据管理器，找不到可用的凭据管理器时回退为配置目录下的纯文本文件（存储位置可用 [gh auth status](cli:command:auth/status) 查看；配置目录由 `GH_CONFIG_DIR` 等决定，见[环境变量](../reference/environment.md)）。`--insecure-storage` 与 `--secure-storage` 可显式选择。
- git 协议：`--git-protocol` 选定该主机 git 操作使用 `https` 还是 `ssh`（选 `ssh` 时会检测并提示上传 SSH 公钥）。该设置对此主机上的所有账号生效。

## 多主机与多账号

gh 按主机记录登录状态；同一主机可以登录多个账号，其中一个是活动账号——以该主机为目标时实际使用的账号。

- [gh auth status](cli:command:auth/status) 逐主机列出账号与发现的问题，并标出各主机的活动账号；`--show-token` 显示明文令牌，`--json hosts` 输出结构化结果。
- [gh auth switch](cli:command:auth/switch) 更改某主机的活动账号：主机上只有两个账号时自动切换到另一个，更多时用 `--user` 或交互选择。切换只改变活动账号，不影响已存储的其它账号凭据。
- [gh auth logout](cli:command:auth/logout) 移除本机存储的认证配置——它不撤销令牌本身；要撤销 GitHub CLI 生成的所有令牌，需在 GitHub 网页上对 "GitHub CLI" 应用执行 Revoke Access。登出活动账号后，若该主机还有其它账号，gh 会自动切换活动账号。
- [gh auth refresh](cli:command:auth/refresh) 重新走一遍浏览器流程，扩展或修复活动账号凭据的 scope：`--scopes` 追加，`--remove-scopes` 幂等地移除（最小集合 `repo`、`read:org`、`gist` 无法移除），`--reset-scopes` 重置为默认最小集合。要刷新非活动账号，需先用 `gh auth switch` 切换过去。

令牌来自环境变量时，`refresh`、`switch` 与 `logout` 都会拒绝操作并提示先清除环境变量中的值——这三个命令管理的是存储凭据，而环境变量不在它们的管理范围内。

## 令牌的取用顺序

gh 为目标主机取用令牌的顺序是：先环境变量，再本地配置文件，最后系统凭据管理器；[gh auth token](cli:command:auth/token) 按同一顺序输出明文令牌，找不到时报错。也就是说，环境变量令牌优先于已存储的凭据：

- `GH_TOKEN`、`GITHUB_TOKEN`（按此优先级）：用于 `github.com` 及其 `ghe.com` 子域名；
- `GH_ENTERPRISE_TOKEN`、`GITHUB_ENTERPRISE_TOKEN`（按此优先级）：用于 GitHub Enterprise Server 主机。

环境变量令牌不会写入配置，适合自动化等"无头"场景：只要设置了变量，需要认证的命令不再提示登录。在 GitHub Actions 中，惯例是在工作流步骤的 `env` 里设置 `GH_TOKEN: ${{ github.token }}`。完整清单见[环境变量](../reference/environment.md)。

## 把 gh 用作 git 凭据助手

[gh auth setup-git](cli:command:auth/setup-git) 把 git 的 credential helper 配置为 gh，使 git 的 https 操作复用 gh 已存储的凭据；默认为所有已认证主机设置，`--hostname` 只配置单个主机。实际应答由隐藏命令 [gh auth git-credential](cli:command:auth/git-credential) 完成：它实现 git credential 协议，`get` 返回查询到的凭据，`store` 与 `erase` 是空操作（令牌由 gh 自己管理）。凭据解析与其他命令一致——环境变量令牌优先，此时返回的用户名固定为 `x-access-token`。

## 未认证时的统一行为

多数命令在执行前经过根命令的统一检查：只要存在环境变量令牌，或至少认证过一个主机，检查即通过；否则命令失败并提示先运行 `gh auth login`，以退出码 `4` 结束（见[退出代码](../reference/exit-codes.md)）。帮助、补全、版本与 `auth` 族等少数命令不要求先认证。

## 示例

```sh
# 交互式登录（浏览器流程）
gh auth login

# 查看各主机账号与令牌状态
gh auth status

# 为活动账号追加 workflow scope
gh auth refresh --scopes workflow

# 把 gh 配置为 git 的凭据助手
gh auth setup-git

# 输出当前令牌供其他程序使用
gh auth token
```

以上示例为说明性内容，未实际运行。
