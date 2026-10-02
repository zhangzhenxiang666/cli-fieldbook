---
title: uv auth helper get
command:
  - auth
  - helper
  - get
---

## 简介

为 URI 获取凭据，是 [uv auth helper](cli:command:auth/helper) 的子命令。

按 Bazel 凭据助手协议工作：从 stdin 读取包含 URI 的 JSON 请求，向 stdout 写出凭据响应。该子命令通常由外部工具按协议调用，而非人工执行；它在帮助中隐藏。

## 选项

### `--help`

短旗标 `-h`。显示简明帮助；传入 `--help` 时显示长帮助。

## 使用提醒

- 需在 `uv auth helper --protocol bazel` 之下调用；`--protocol` 为必选项，目前仅支持 `bazel`。
- 凭据来自 uv 已保存的认证信息；先以 [uv auth login](cli:command:auth/login) 保存凭据。

## 示例

按 Bazel 协议获取凭据（通常由外部工具调用）：

```console
$ uv auth helper --protocol bazel get
```

以上示例为说明性内容，未实际运行。

## 源码补充

子命令定义于 `AuthHelperCommand::Get`（[crates/uv-cli/src/lib.rs](https://github.com/astral-sh/uv/blob/70fe1196a546e49148a73b1c592b2f74c33af80e/crates/uv-cli/src/lib.rs)）。
