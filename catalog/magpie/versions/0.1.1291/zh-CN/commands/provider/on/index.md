---
title: magpie provider on
command:
  - provider
  - on
---

重新启用一个被 [`provider off`](cli:command:provider/off) 关闭的 provider。

## 简介

恢复后其模型重新对 agent 可见,请求恢复发往它。

## 参数

### `id`

`<id>`。目标 provider 的 id。

## 示例

```sh
magpie provider on deepseek
```

以上示例为说明性内容,未实际运行。

## 源码补充

- 处理逻辑见 [providers_cli.go](https://github.com/yetone/magpie/blob/33dbdcc529622cf0dd053c99eb34f51c06fbba77/internal/cli/providers_cli.go) 中 `providerCmd()` 的 `on` 分支。
