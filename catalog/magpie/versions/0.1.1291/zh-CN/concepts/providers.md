---
title: provider、preset 与密钥
uses:
  - command:providers
  - command:presets
  - command:provider
  - command:models
---

# provider、preset 与密钥

provider 是 magpie 对"模型来源"的统一抽象。agent 挑选的每个模型都写成 `provider/model`,网关据此决定请求发给谁、用什么协议、带哪把密钥。

## 三种 provider

1. **preset(厂商预设)**:[`magpie presets`](cli:command:presets) 列出 magpie 开箱认识的厂商(Anthropic、OpenAI、Gemini、DeepSeek、Kimi、智谱 GLM、MiniMax、Qwen、Groq、OpenRouter、Ollama 等,含不少中国区端点)。添加只需一把 key:`magpie provider add deepseek sk-…`。
2. **自定义 vendor**:任意 OpenAI/Anthropic 兼容的服务,`magpie provider add <name> url=… key=…` 加上若干 k=v;详细键表见 [`magpie provider add`](cli:command:provider/add) 页。
3. **订阅计划**:Claude、ChatGPT、Copilot、Gemini 等订阅作为 provider 服务其他 agent,见 [订阅账户](accounts.md)。

## 模型目录

`magpie sync` 刷新模型目录;厂商模型列表用 [`magpie provider models`](cli:command:provider/models) 拉取与挑选(`+id`/`-id`/`all`/`none`);[`magpie models`](cli:command:models) 展示某个 agent 能选的全部模型并解释其余模型为何不可选。

## 密钥与安全

- 密钥存在本机(钥匙串/配置),备份默认封存,见 [`magpie backup`](cli:command:backup);
- [`magpie provider key`](cli:command:provider/key) 换 key;[`magpie provider test`](cli:command:provider/test) 验证可用性;
- Vertex AI 例外:不用 API key,而是你的 Google 凭据。

## 故障转移与限流

- [`magpie provider fallback`](cli:command:provider/fallback):配额耗尽或宕机时的备用模型序列;
- [`magpie provider rpm`](cli:command:provider/rpm)、[`magpie provider queue`](cli:command:provider/queue):每分钟请求上限与排队;
- [`magpie provider quota-rest`](cli:command:provider/quota-rest)、[`magpie provider rest-cap`](cli:command:provider/rest-cap):key 被限流后的休息策略;
- 订阅账户专属的份额/并发控制:`account-cap`、`account-concurrency`(见 [`magpie provider`](cli:command:provider) 子命令表)。

## 来源

- provider 抽象与账户的关系:docs/subsystems/providers-accounts.md(固定提交)
- 全部子命令行为:internal/cli/providers_cli.go(固定提交)
