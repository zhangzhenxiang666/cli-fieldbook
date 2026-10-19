---
title: magpie provider key
command:
  - provider
  - key
---

更换一个 provider 的 API key。

## 简介

把指定 provider 的 key 换为给定值,保存后显示打码确认。Google Vertex 除外:它用你的 Google 凭据而非 API key,需用 [`provider set`](cli:command:provider/set) 的 `credentials=<file>`、`impersonate=<service account>` 修改。

## 参数

### `id`

`<id>`。目标 provider 的 id。

### `key`

`<key>`。新的 API key。

## 示例

```sh
magpie provider key deepseek sk-new…
```

以上示例为说明性内容,未实际运行。

## 源码补充

- 处理逻辑见 [providers_cli.go](https://github.com/yetone/magpie/blob/33dbdcc529622cf0dd053c99eb34f51c06fbba77/internal/cli/providers_cli.go) 中 `providerCmd()` 的 `key` 分支。
