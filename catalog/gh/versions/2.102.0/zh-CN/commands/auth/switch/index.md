---
title: gh auth switch
command:
  - auth
  - switch
---

切换某 GitHub 主机上的活动账号。

## 简介

本命令更改后续针对指定 GitHub 主机运行命令时使用的认证配置。

若指定主机上只有两个账号，会自动切换到非活动账号；账号更多时，需通过 `--user` 或交互式提示消歧。已认证账号清单可用 [`gh auth status`](cli:command:auth/status) 查看。

## 参数

本命令不接受位置参数。

## 选项

### `--hostname`

短旗标 `-h`。格式：`--hostname <string>`。指定要为其切换账号的 GitHub 主机名。

### `--user`

短旗标 `-u`。格式：`--user <string>`。指定要切换到的账号。

## 环境变量

- 当认证令牌来自 `GH_TOKEN` 等环境变量时，本命令拒绝切换并提示先清除环境变量中的值；见[环境变量](../../../reference/environment.md)。

## 使用提醒

- 指定的主机或账号未登录过时会直接报错。
- 无法唯一确定目标账号且非交互时，报错并要求显式给出 `--hostname` 与 `--user`。
- 切换只改变活动账号，不影响已存储的其它账号凭据。

## 示例

```sh
# 通过提示选择要切换到的主机与账号
gh auth switch

# 把指定主机上的活动账号切换为指定用户
gh auth switch --hostname enterprise.internal --user monalisa
```

以上示例为说明性内容，未实际运行。

## 源码补充

- 命令定义、候选判定与双账号自动切换见 [pkg/cmd/auth/switch/switch.go](https://github.com/cli/cli/blob/fc4b137cdef0a6bd28fd461b7cf9c84a5812a8cd/pkg/cmd/auth/switch/switch.go)。
