---
title: 网关与协议转译
uses:
  - command:serve
  - command:healthcheck
  - command:web
---

# 网关与协议转译

magpie 的核心是一个本地网关:agent 的请求全部发到这里,magpie 按当前挑选的模型路由到对应 provider,并在不同 API 协议之间转译。理解网关,大部分命令的行为就有了着落。

## 一个端口,四种协议

网关默认监听 `127.0.0.1:3425`,同时讲四种 API:

- OpenAI Chat Completions(`/v1`)
- OpenAI Responses
- Anthropic Messages
- Gemini

任何接受自定义 base URL 的 agent 都能接入,例如:

```sh
OPENAI_BASE_URL=http://127.0.0.1:3425/v1
ANTHROPIC_BASE_URL=http://127.0.0.1:3425
GOOGLE_GEMINI_BASE_URL=http://127.0.0.1:3425
```

API key 一栏填 `magpie` 即可(本地网关不校验)。

## 转译而不只是转发

请求从一种协议进来、以另一种协议出去是常态:Claude Code 说 Anthropic Messages,而它当前挑选的模型可能在 DeepSeek(OpenAI 风格);Codex 说 OpenAI Responses,而模型可能在 Anthropic。转译覆盖:

- 流式响应(SSE 事件逐段对应)
- 工具调用(tool call 的参数、结果回传)
- reasoning 内容(思考过程在协议间的表示差异)
- 图片等多模态输入

模型之间的差异(上下文长度、reasoning 档位、压缩方式)由 [`magpie model`](cli:command:model) 系列命令修饰,网关按修饰后的参数发送。

## 谁在跑网关

网关不是独立进程,而是随任一 magpie 形态运行:

- 桌面应用(窗口或菜单栏)打开时
- [`magpie tui`](cli:command:tui) 打开且无其他 magpie 运行时
- [`magpie serve`](cli:command:serve) 显式只跑网关(服务器、容器场景)
- [`magpie daemon`](cli:command:daemon) 把 serve 装成系统服务,开机自启、停止后自动拉起

[`magpie healthcheck`](cli:command:healthcheck) 退出码 0 表示网关应答,适合容器 HEALTHCHECK。

## 共享网关与密钥

其他电脑的客户端可以调用共享网关,凭 [`gateway-key`](cli:command:gateway-key) 管理的密钥认证;每个密钥可限模型、限 token/费用额度。跨机暴露时用 TLS(`--tls-cert`/`--tls-key`)或放在反向代理之后。

## 来源

- 转译范围与网关地址:README.zh-CN.md(固定提交)
- 路由决策(挑哪个模型/账户应答):见 [路由组](routing-groups.md) 与 docs/subsystems/gateway-routing.md(固定提交)
