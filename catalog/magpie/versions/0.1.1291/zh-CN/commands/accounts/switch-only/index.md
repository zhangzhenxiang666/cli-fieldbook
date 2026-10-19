---
title: magpie accounts switch-only
command:
  - accounts
  - switch-only
---

Codex 专用模式:只切换 Codex 自己的登录,请求直连 OpenAI、不经过 magpie 网关。

## 简介

- `on`:magpie 只负责把 Codex 换到还有额量的账户登录;Codex 的请求直接发给 OpenAI,不经过本地网关(也就不参与协议转译、故障转移);
- `off`(默认):Codex 的多个账户都开着时,请求经过 magpie,在账户间故障转移;
- 不带参数:显示当前状态。

切换立即写入 Codex 的 config.toml,不需等下次启动;已经打开的 Codex 应用或会话停留在原账户上,直到再次打开。

## 参数

### `state`

`[on|off]`。省略时只显示状态。本命令只接受 `codex`,其他 agent 会报用法错误。

## 使用提醒

- 直连意味着放弃跨厂商转译:想让 Codex 用其他厂商的模型时保持 `off`。

## 源码补充

- 实现与即时生效逻辑见 [accounts_cli.go](https://github.com/yetone/magpie/blob/33dbdcc529622cf0dd053c99eb34f51c06fbba77/internal/cli/accounts_cli.go)。
