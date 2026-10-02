---
title: uv auth login
command:
  - auth
  - login
---

## 简介

登录到服务，保存其认证凭据。

`<SERVICE>` 为服务的域名或 URL。未指定 `--keyring-provider` 时凭据由明文后端保存到 uv 凭据目录（见 [uv auth dir](cli:command:auth/dir)）；传入 `--keyring-provider native` 时改由 uv 内置集成存入系统 keyring。

## 参数

### `service`

格式：`<SERVICE>`。要登录服务的域名或 URL。

## 选项

### `--help`

短旗标 `-h`。显示简明帮助；传入 `--help` 时显示长帮助。

### `--username`

短旗标 `-u`。格式：`--username <USERNAME>`。该服务使用的用户名。与 `--token` 互斥。

### `--password`

格式：`--password <PASSWORD>`。该服务使用的密码；传 `-` 时从 stdin 读取。与 `--token` 互斥。

### `--token`

短旗标 `-t`。格式：`--token <TOKEN>`。该服务使用的令牌；使用令牌时用户名会设为 `__token__`。传 `-` 时从 stdin 读取。与 `--username`、`--password` 互斥。

### `--keyring-provider`

格式：`--keyring-provider <KEYRING_PROVIDER>`。凭据存储所用的 keyring 后端；本命令仅支持 `native`（通过 uv 内置集成使用系统 keyring）。对应环境变量 `UV_KEYRING_PROVIDER`。

## 环境变量

- `UV_KEYRING_PROVIDER`：`--keyring-provider` 的环境变量映射。
- `UV_CREDENTIALS_DIR`：明文后端使用的凭据目录（见 [uv auth dir](cli:command:auth/dir)）。

## 使用提醒

- 令牌方式与用户名/密码方式二选一：`--token` 与 `--username`、`--password` 互斥。
- 敏感值建议传 `-` 从 stdin 读取，避免进入 shell 历史或进程参数列表。
- 已保存的凭据可用 [uv auth token](cli:command:auth/token) 查看、用 [uv auth logout](cli:command:auth/logout) 删除。

## 示例

以用户名密码登录（密码经 stdin 传入）：

```console
$ uv auth login https://private.example.com/simple -u ci --password -
```

以令牌登录私有索引：

```console
$ uv auth login https://private.example.com/simple --token -
```

以上示例为说明性内容，未实际运行。

## 源码补充

命令与选项定义于 `AuthCommand::Login`/`AuthLoginArgs`（[crates/uv-cli/src/lib.rs](https://github.com/astral-sh/uv/blob/70fe1196a546e49148a73b1c592b2f74c33af80e/crates/uv-cli/src/lib.rs)）。
