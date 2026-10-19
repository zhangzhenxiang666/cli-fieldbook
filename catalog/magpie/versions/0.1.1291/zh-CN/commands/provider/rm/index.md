---
title: magpie provider rm
command:
  - provider
  - rm
---

删除一个 provider。别名 `remove`、`delete`。

## 简介

删除指定 provider;正在使用其模型的 agent 会被重新落座(输出提示各自迁移到什么模型)。订阅账户类 provider 删除后,可用其 id 再执行 [`provider add`](cli:command:provider/add) 带着原挑选恢复。

## 参数

### `id`

`<id>`。目标 provider 的 id。

## 使用提醒

- 只想临时停用而不删除,用 [`provider off`](cli:command:provider/off)。

## 示例

```sh
magpie provider rm my-relay
```

以上示例为说明性内容,未实际运行。

## 源码补充

- 删除与 agent 重落座见 [providers_cli.go](https://github.com/yetone/magpie/blob/33dbdcc529622cf0dd053c99eb34f51c06fbba77/internal/cli/providers_cli.go) 中 `providerCmd()` 的 `rm` 分支。
