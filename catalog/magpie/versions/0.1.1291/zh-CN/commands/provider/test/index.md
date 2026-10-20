---
title: magpie provider test
command:
  - provider
  - test
---

向 provider 的每个端点(或每个指定模型)发一个小请求,验证连通性。

## 简介

不带模型时,对每个协议端点各发一个小请求(30 秒超时);带模型 id 时对每个模型各发一个(90 秒超时)。每个结果一行:成功显示协议、耗时与模型;失败显示状态码与错误。任一失败时进程以非零码退出。

`--as codex|claude-code`(可放在 `test` 之后的任意位置,支持 `--as x` 与 `--as=x` 两种写法)按该 agent 的方式发请求,用于只服务特定 agent 的中转。

## 参数

### `id`

`<id>`。目标 provider 的 id。

## 使用提醒

- 需要指定模型时:`magpie provider test <id> <model>…`。
- `--as` 之外的选项不会被解析。

## 示例

```sh
magpie provider test deepseek
magpie provider test my-relay --as codex
```

以上示例为说明性内容,未实际运行。

## 源码补充

- 端点/模型测试与 `--as` 解析见 [providers_cli.go](https://github.com/yetone/magpie/blob/33dbdcc529622cf0dd053c99eb34f51c06fbba77/internal/cli/providers_cli.go) 中 `providerCmd()` 的 `test` 分支。
