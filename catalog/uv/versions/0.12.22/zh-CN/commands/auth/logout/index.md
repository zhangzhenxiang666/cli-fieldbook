---
title: uv auth logout
command:
  - auth
  - logout
---

## 简介

退出服务的登录，删除为该服务保存的凭据。

删除明文后端保存在 uv 凭据目录（见 [uv auth dir](cli:command:auth/dir)）中的凭据；凭据存于系统 keyring 时需配合 `--keyring-provider native`。

## 参数

### `service`

格式：`<SERVICE>`。要退出服务的域名或 URL。

## 选项

### `--help`

短旗标 `-h`。显示简明帮助；传入 `--help` 时显示长帮助。

### `--username`

短旗标 `-u`。格式：`--username <USERNAME>`。要退出登录的用户名；同一服务保存了多个用户的凭据时用于区分。

### `--keyring-provider`

格式：`--keyring-provider <KEYRING_PROVIDER>`。凭据存储所用的 keyring 后端；本命令仅支持 `native`（通过 uv 内置集成使用系统 keyring）。对应环境变量 `UV_KEYRING_PROVIDER`。

## 环境变量

- `UV_KEYRING_PROVIDER`：`--keyring-provider` 的环境变量映射。

## 使用提醒

- 删除的是 uv 保存的凭据，不影响服务端的会话或令牌本身。
- 重新登录用 [uv auth login](cli:command:auth/login)；查看现存凭据的令牌用 [uv auth token](cli:command:auth/token)。

## 示例

删除为一个私有索引保存的凭据：

```console
$ uv auth logout https://private.example.com/simple
```

以上示例为说明性内容，未实际运行。

## 源码补充

命令与选项定义于 `AuthCommand::Logout`/`AuthLogoutArgs`（[crates/uv-cli/src/lib.rs](https://github.com/astral-sh/uv/blob/70fe1196a546e49148a73b1c592b2f74c33af80e/crates/uv-cli/src/lib.rs)）。
