---
title: magpie accounts forget
command:
  - accounts
  - forget
---

让 magpie 忘记某家的一个订阅账户。

## 简介

账户从记录中移除;迁移到插件上的 provider 若受影响,magpie 会重新安置并提示。`<email>` 同样接受 [`magpie accounts alias`](cli:command:accounts/alias) 起的名字;copilot 用 `<login>[@<name>.ghe.com]` 形式。

## 参数

### `agent`

`<claude|codex|gemini|antigravity|zed|factory|mimo|<plugin>>`。要忘记账户的订阅类别。

### `email`

`<email>`。要忘记的账户。

## 示例

```sh
magpie accounts forget claude me@example.com
```

以上示例为说明性内容,未实际运行。

## 使用提醒

- forget 只影响 magpie 的记录,不改变厂商侧的订阅本身;
- 想整体关闭"读取 agent 登录"用 [`magpie accounts discovery off`](cli:command:accounts/discovery),而不是逐个 forget。

## 源码补充

- 实现见 [accounts_cli.go](https://github.com/yetone/magpie/blob/33dbdcc529622cf0dd053c99eb34f51c06fbba77/internal/cli/accounts_cli.go)。
