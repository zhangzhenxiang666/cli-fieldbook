---
title: uv auth helper
command:
  - auth
  - helper
---

## 简介

作为外部工具的凭据助手。

实现 Bazel 凭据助手协议：通过 stdin/stdout 上的 JSON 与调用方通信，把 uv 保存的凭据提供给外部工具。该命令通常由外部工具按协议调用，而非人工执行；它在帮助中隐藏。具体操作经子命令 [uv auth helper get](cli:command:auth/helper/get) 指定。

## 选项

### `--help`

短旗标 `-h`。显示简明帮助；传入 `--help` 时显示长帮助。

### `--protocol`

格式：`--protocol <PROTOCOL>`。必选。使用的凭据助手协议，目前仅支持 `bazel`（Bazel 凭据助手协议）。

## 使用提醒

- 本命令在帮助中隐藏，属外部工具的集成入口；日常凭据管理用 [uv auth login](cli:command:auth/login)、[uv auth logout](cli:command:auth/logout) 与 [uv auth token](cli:command:auth/token)。
- 凭据来源为 uv 已保存的认证信息（明文后端的凭据目录或系统 keyring）。

## 示例

按 Bazel 协议获取凭据（通常由外部工具调用）：

```console
$ uv auth helper --protocol bazel get
```

以上示例为说明性内容，未实际运行。

## 源码补充

命令与协议枚举定义于 `AuthCommand::Helper`/`AuthHelperArgs`/`AuthHelperProtocol`（[crates/uv-cli/src/lib.rs](https://github.com/astral-sh/uv/blob/70fe1196a546e49148a73b1c592b2f74c33af80e/crates/uv-cli/src/lib.rs)）。
