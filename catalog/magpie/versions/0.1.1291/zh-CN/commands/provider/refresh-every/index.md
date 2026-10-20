---
title: magpie provider refresh-every
command:
  - provider
  - refresh-every
---

让网关按固定间隔自动重新拉取该厂商的模型列表。

## 简介

设置后,网关(`magpie serve` 或应用)在列表超过该时长后自动重新拉取。实际间隔下限 10 分钟;`off` 关闭自动拉取,只手动拉取(见 [`provider models`](cli:command:provider/models))。不带参数时显示当前设置。

## 参数

### `id`

`<id>`。目标 provider 的 id。

### `interval`

`[6h|1d|off]`。列表过期阈值;`off` 关闭。

## 示例

```sh
magpie provider refresh-every deepseek 6h
magpie provider refresh-every deepseek off
```

以上示例为说明性内容,未实际运行。

## 源码补充

- 处理逻辑见 [providers_cli.go](https://github.com/yetone/magpie/blob/33dbdcc529622cf0dd053c99eb34f51c06fbba77/internal/cli/providers_cli.go) 中 `refreshEveryCmd()`。
