---
title: magpie sync
command:
  - sync
---

刷新模型目录与各厂商的模型列表。

## 简介

拉取上游模型目录(models.dev 等来源)并保存到本地缓存,随后刷新正在运行的 magpie(应用或 [`serve`](cli:command:serve) 网关)的实时数据。成功后打印 `✓ catalog saved to <缓存路径>`。

整个刷新有 30 秒超时。

## 使用提醒

- 新添加 provider 后若模型列表为空,或厂商新发了模型,先运行本命令。
- 查看某个 agent 可挑选的模型用 [`models`](cli:command:models);重新拉取单个厂商的列表用 [`provider models`](cli:command:provider/models)。

## 示例

```sh
magpie sync
```

以上示例为说明性内容,未实际运行。

## 源码补充

- 30 秒超时、缓存路径输出与实时刷新见 [main.go](https://github.com/yetone/magpie/blob/33dbdcc529622cf0dd053c99eb34f51c06fbba77/internal/cli/main.go) 的 `sync` 分支,实时刷新实现见 [providers_cli.go](https://github.com/yetone/magpie/blob/33dbdcc529622cf0dd053c99eb34f51c06fbba77/internal/cli/providers_cli.go) 的 `refreshLive()`。
