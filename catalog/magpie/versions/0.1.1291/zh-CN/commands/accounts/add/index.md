---
title: magpie accounts add
command:
  - accounts
  - add
---

再登入一个订阅账户(Claude、ChatGPT、Gemini、Antigravity、Zed、Factory、MiMo、Copilot 或插件订阅)。

## 简介

同一家可以有多个订阅账户并存,各自记账、自动轮换。添加走各家的登录流程(Copilot 用 GitHub 设备码)。插件提供的订阅会转交插件的登录流程。

Claude 与 Antigravity 登录前会显示该家的风险提示并要求确认(`y`);服务器或容器上添加 Claude 而本机没有 Claude Code 时,会先提供下载(magpie 经 Claude Code 完成登录与应答)。

## 参数

### `agent`

`<claude|codex|gemini|antigravity|zed|factory|mimo|<plugin>>`。要登入的订阅类别;插件订阅按其 provider 的 id 或名称写。其他名字会报错并列出可用的类别。

## 选项

### `--host`

`--host <name>.ghe.com`。仅 `accounts add copilot` 使用:在 GitHub Enterprise 的 `<name>.ghe.com` 上登录,而不是 github.com。

## 示例

```sh
magpie accounts add claude
magpie accounts add copilot --host corp.ghe.com
```

以上示例为说明性内容,未实际运行。

## 使用提醒

- 登录凭据属高敏感数据;不想让 magpie 自动读取既有登录时,先 [`magpie accounts discovery off`](cli:command:accounts/discovery)。
- 从其他工具的凭据文件导入而非重新登录,用 [`magpie accounts import`](cli:command:accounts/import)。

## 源码补充

- 添加流程、风险确认与 Copilot 主机解析见 [accounts_cli.go](https://github.com/yetone/magpie/blob/33dbdcc529622cf0dd053c99eb34f51c06fbba77/internal/cli/accounts_cli.go)。
