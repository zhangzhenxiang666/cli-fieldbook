---
title: magpie accounts switch
command:
  - accounts
  - switch
---

把某家订阅的 agent 换到它的另一个账户。

## 简介

`<email>` 也可以是用 [`magpie accounts alias`](cli:command:accounts/alias) 起的名字。切换后:

- gemini、antigravity、copilot 与插件订阅:magpie 立即改用该账户;
- 其他家:agent 登录态随之更换,已开着的会话保留原账户直到重启;
- codex:若 Codex 的后台服务或 Codex 应用仍登着旧账户,会提示重启它们(后台服务重启会打断运行中的 Codex 会话)。

## 参数

### `agent`

`<claude|codex|gemini|antigravity|zed|factory|mimo|<plugin>>`。别名(`cc`、`ag`、`droid` 等)可用;copilot 写 `copilot`。

### `email`

`<email>`。目标账户。copilot 用 `<login>[@<name>.ghe.com]` 形式;同一登录在多个 host 上时配合 `--host` 消歧。

## 选项

### `--host`

`--host <name>.ghe.com`。仅 copilot 可用:指明登录所在的 GHE 主机;用于同一登录出现在多个主机时。

## 示例

```sh
magpie accounts switch claude me@example.com
magpie accounts switch copilot octocat@corp.ghe.com --host corp.ghe.com
```

以上示例为说明性内容,未实际运行。

## 使用提醒

- 不再需要某账户时用 [`magpie accounts forget`](cli:command:accounts/forget) 移出记录。

## 源码补充

- 切换与 Codex 后台服务提醒见 [accounts_cli.go](https://github.com/yetone/magpie/blob/33dbdcc529622cf0dd053c99eb34f51c06fbba77/internal/cli/accounts_cli.go)。
