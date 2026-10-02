---
title: uv auth token
command:
  - auth
  - token
---

## 简介

显示为服务保存的认证令牌。

查找该服务（可选指定用户名）已保存的令牌并输出，便于在脚本中复用 uv 保存的凭据。凭据读取自明文后端的凭据目录，或按 `--keyring-provider` 指定的后端读取。

## 参数

### `service`

格式：`<SERVICE>`。要查询服务的域名或 URL。

## 选项

### `--help`

短旗标 `-h`。显示简明帮助；传入 `--help` 时显示长帮助。

### `--username`

短旗标 `-u`。格式：`--username <USERNAME>`。要查询的用户名；同一服务保存了多个用户的凭据时用于区分。

### `--keyring-provider`

格式：`--keyring-provider <KEYRING_PROVIDER>`。读取凭据所用的 keyring 后端。对应环境变量 `UV_KEYRING_PROVIDER`。

## 环境变量

- `UV_KEYRING_PROVIDER`：`--keyring-provider` 的环境变量映射。

## 使用提醒

- 输出即令牌本体，属敏感信息；在共享环境中小心使用。
- 保存与删除凭据分别用 [uv auth login](cli:command:auth/login) 与 [uv auth logout](cli:command:auth/logout)。

## 示例

读取为一个私有索引保存的令牌：

```console
$ uv auth token https://private.example.com/simple
```

以上示例为说明性内容，未实际运行。

## 源码补充

命令与选项定义于 `AuthCommand::Token`/`AuthTokenArgs`（[crates/uv-cli/src/lib.rs](https://github.com/astral-sh/uv/blob/70fe1196a546e49148a73b1c592b2f74c33af80e/crates/uv-cli/src/lib.rs)）。
