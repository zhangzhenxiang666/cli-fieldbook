---
title: gh auth token
command:
  - auth
  - token
---

打印 gh 在指定主机与账号上使用的认证令牌。

## 简介

输出给定 GitHub 主机上某账号的认证令牌。未指定 `--hostname` 时使用默认主机；未指定 `--user` 时使用该主机的活动账号。

默认查找顺序与 gh 实际取用令牌的顺序一致：先环境变量，再本地配置文件，最后系统凭据管理器；找不到令牌时报错。

## 参数

本命令不接受位置参数。

## 选项

### `--hostname`

短旗标 `-h`。格式：`--hostname <string>`。指定已认证的 GitHub 主机名。

### `--user`

短旗标 `-u`。格式：`--user <string>`。指定要输出令牌的账号。

### `--secure-storage`

格式：`--secure-storage`。只在系统凭据管理器中查找认证令牌。此旗标在帮助中隐藏。

## 环境变量

- 已设置 `GH_TOKEN` 等环境变量时，默认查找会直接返回环境变量中的令牌；`--secure-storage` 则只查凭据管理器。见[环境变量](../../../reference/environment.md)。

## 使用提醒

- 令牌以明文输出，注意终端历史与日志；脚本场景通常直接使用 `GH_TOKEN` 环境变量更稳妥。
- 登录与令牌存储状态用 [`gh auth status`](cli:command:auth/status) 查看。

## 示例

```sh
# 输出默认主机上活动账号的令牌
gh auth token

# 输出指定账号的令牌
gh auth token --user monalisa

# 把令牌放入环境变量供其它程序使用
export GH_TOKEN="$(gh auth token)"
```

以上示例为说明性内容，未实际运行。

## 源码补充

- 命令定义与令牌查找顺序见 [pkg/cmd/auth/token/token.go](https://github.com/cli/cli/blob/fc4b137cdef0a6bd28fd461b7cf9c84a5812a8cd/pkg/cmd/auth/token/token.go)。
