---
title: gh auth status
command:
  - auth
  - status
---

显示每个已知 GitHub 主机上的活动账号与认证状态。

## 简介

对每个主机，本命令逐一检测已知账号的认证状态，并在输出中包含发现的问题；每个主机小节都会标出该主机上的活动账号，即以该主机为目标时实际使用的账号。

若任一主机上的账号（或 `--hostname` 所指定主机上的账号）存在认证问题，命令以退出码 `1` 结束并输出到 stderr；使用 `--json` 时除非发生致命错误，命令始终以 `0` 退出。退出码约定见[退出代码](../../../reference/exit-codes.md)。

切换某主机的活动账号用 [`gh auth switch`](cli:command:auth/switch)。

## 参数

本命令不接受位置参数。

## 选项

### `--hostname`

短旗标 `-h`。格式：`--hostname <string>`。只检查指定主机名的认证状态。

### `--show-token`

短旗标 `-t`。格式：`--show-token`。显示认证令牌。

### `--active`

短旗标 `-a`。格式：`--active`。只显示活动账号。

### `--json`

格式：`--json <strings>`。以指定字段输出 JSON，取值 `hosts`。此模式下无论是否存在认证问题，命令都以退出码 `0` 结束。

### `--jq`

格式：`--jq <expression>`。按 jq 表达式过滤 JSON 输出。

### `--template`

格式：`--template <string>`。用 Go 模板格式化 JSON 输出，参见 [JSON 输出与格式化](../../../reference/formatting.md)。

## 环境变量

- 令牌来自 `GH_TOKEN` 等环境变量时同样纳入检测，此时用户名需经 API 查询获得；见[环境变量](../../../reference/environment.md)。

## 使用提醒

- 未登录任何主机时，提示运行 [`gh auth login`](cli:command:auth/login) 并以退出码 `1` 结束。
- 默认输出中令牌打码：保留 GitHub 令牌格式前缀，其余字符以 `*` 代替；`--show-token` 以明文显示，`--json` 模式未加 `--show-token` 时令牌字段为空。
- 令牌以 `ghp_` 或 `gho_` 开头时才检查 scope；缺失必需的最小 scope 会提示运行 `gh auth refresh -h <主机名>` 补齐。
- 令牌失效时按能否刷新分别提示 `gh auth refresh` 或 `gh auth login` 重新认证，并提示可用 [`gh auth logout`](cli:command:auth/logout) 忘记该账号；网络超时则单独标记为超时。

## 示例

```sh
# 显示所有主机上所有账号的认证状态
gh auth status

# 显示指定主机上活动账号的认证状态
gh auth status --active --hostname github.example.com

# 以明文显示令牌
gh auth status --show-token

# 以 JSON 格式输出认证状态
gh auth status --json hosts

# 在 JSON 输出中包含明文令牌
gh auth status --json hosts --show-token

# 把各主机条目合并为单一 JSON 数组
gh auth status --json hosts --jq '.hosts | add'
```

以上示例为说明性内容，未实际运行。

## 源码补充

- 命令定义、状态检测与令牌打码逻辑见 [pkg/cmd/auth/status/status.go](https://github.com/cli/cli/blob/fc4b137cdef0a6bd28fd461b7cf9c84a5812a8cd/pkg/cmd/auth/status/status.go)。
- `--json`/`--jq`/`--template` 的通用定义见 [pkg/cmdutil/json_flags.go](https://github.com/cli/cli/blob/fc4b137cdef0a6bd28fd461b7cf9c84a5812a8cd/pkg/cmdutil/json_flags.go)。
