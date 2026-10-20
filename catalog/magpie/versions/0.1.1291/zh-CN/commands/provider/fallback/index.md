---
title: magpie provider fallback
command:
  - provider
  - fallback
---

设定该 provider 配额耗尽、被限流或宕机时请求转往哪里。

## 简介

给指定 provider 配置兜底模型列表(按顺序尝试)。`none` 清空兜底。不带模型参数时显示当前兜底链路。每个模型必须是 magpie 已知的 `provider/model`(见 [`models`](cli:command:models))。

## 参数

### `id`

`<id>`。目标 provider 的 id。

### `models`

`<provider/model>…`。兜底模型,按序排列;`none` 清空。

## 使用提醒

- 兜底触发条件:配额耗尽、被限流、provider 宕机。
- 这是单 provider 级的兜底;跨多个模型的日常轮换用[路由组](cli:command:group)更合适。

## 示例

```sh
magpie provider fallback my-relay deepseek/deepseek-chat glm/glm-5.3-flash
magpie provider fallback my-relay none
```

以上示例为说明性内容,未实际运行。

## 源码补充

- 处理逻辑与 `none` 清空见 [providers_cli.go](https://github.com/yetone/magpie/blob/33dbdcc529622cf0dd053c99eb34f51c06fbba77/internal/cli/providers_cli.go) 中 `providerCmd()` 的 `fallback` 分支。
