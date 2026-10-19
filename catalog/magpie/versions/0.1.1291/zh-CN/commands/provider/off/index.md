---
title: magpie provider off
command:
  - provider
  - off
---

关闭一个 provider:保留配置与 key,但任何 agent 与请求都不再使用它。

## 简介

关闭后 agent 看不到它的模型,请求也不再发往它;配置、key 与用量数据保留,随时 [`provider on`](cli:command:provider/on) 恢复。正在使用其模型的 agent 会被重新落座(输出会提示迁移到哪个模型)。

## 参数

### `id`

`<id>`。目标 provider 的 id。

## 示例

```sh
magpie provider off deepseek
```

以上示例为说明性内容,未实际运行。

## 源码补充

- 处理逻辑见 [providers_cli.go](https://github.com/yetone/magpie/blob/33dbdcc529622cf0dd053c99eb34f51c06fbba77/internal/cli/providers_cli.go) 中 `providerCmd()` 的 `off` 分支。
