---
title: uv auth
command:
  - auth
---

## 简介

管理 uv 访问各服务（如需认证的包索引）时使用的凭据。

子命令覆盖凭据的写入、删除与查询：登录与退出服务、显示已保存的认证令牌、显示凭据目录，并为外部工具提供凭据助手协议。凭据默认由明文后端保存到 uv 凭据目录（见 [uv auth dir](cli:command:auth/dir)）；使用 `--keyring-provider native` 时改存系统 keyring。

子命令：

- [uv auth login](cli:command:auth/login)：登录到服务，保存凭据
- [uv auth logout](cli:command:auth/logout)：退出服务的登录，删除凭据
- [uv auth token](cli:command:auth/token)：显示服务的认证令牌
- [uv auth dir](cli:command:auth/dir)：显示 uv 凭据目录的路径
- [uv auth helper](cli:command:auth/helper)（隐藏）：作为外部工具的凭据助手

## 选项

### `--help`

短旗标 `-h`。

显示 `uv auth` 的简明帮助。传入 `--help` 时显示长帮助。

## 环境变量

各子命令的 `--keyring-provider` 对应 `UV_KEYRING_PROVIDER`；凭据目录可用 `UV_CREDENTIALS_DIR` 覆盖（见 [uv auth dir](cli:command:auth/dir)）。

## 使用提醒

- 凭据按服务（域名或 URL）保存；登录时还可指定用户名以区分同一服务的多个账户。
- 令牌等敏感值建议经 stdin（传 `-`）提供，避免留在 shell 历史中。
- [uv auth helper](cli:command:auth/helper) 及其子命令在帮助中隐藏，供外部工具按协议调用。

## 示例

登录一个服务并查看为其保存的令牌：

```console
$ uv auth login https://private.example.com/simple
$ uv auth token https://private.example.com/simple
```

以上示例为说明性内容，未实际运行。

## 源码补充

子命令清单定义于 `AuthCommand` enum（[crates/uv-cli/src/lib.rs](https://github.com/astral-sh/uv/blob/70fe1196a546e49148a73b1c592b2f74c33af80e/crates/uv-cli/src/lib.rs)）。
