---
title: magpie presets
command:
  - presets
---

列出 magpie 开箱即知的厂商,一个 key 即可添加。

## 简介

按类别分组列出全部预置厂商:partners(sponsors)、vendors、relays、local、another computer's magpie。每行给出厂商名与对应的 [`provider add`](cli:command:provider/add) 添加命令(形如 `magpie provider add deepseek <key>`),已添加的会标注。

本地已存在的 provider 不再重复提示添加。

## 使用提醒

- 同一厂商常有两个 preset:国际端点与 China 端点(如 `moonshot` 与 `moonshot-cn`),按你的网络选择。
- 订阅计划(Claude、ChatGPT、Copilot、Gemini 等)不在此列:它们通过 [`accounts add`](cli:command:accounts/add) 登录。
- 添加自定义中转见 [`provider add`](cli:command:provider/add) 的 `k=v` 形态。

## 示例

```sh
magpie presets
magpie provider add deepseek sk-…
```

以上示例为说明性内容,未实际运行。

## 源码补充

- 分组与渲染见 [providers_cli.go](https://github.com/yetone/magpie/blob/33dbdcc529622cf0dd053c99eb34f51c06fbba77/internal/cli/providers_cli.go) 中 `presets()`。
