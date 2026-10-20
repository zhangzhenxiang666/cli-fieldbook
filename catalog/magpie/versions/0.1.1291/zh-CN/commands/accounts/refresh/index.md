---
title: magpie accounts refresh
command:
  - accounts
  - refresh
---

立即续期已保存的 ChatGPT 登录。

## 简介

ChatGPT 类登录凭据有有效期。网关在运行期间每日自动续期;本命令立即对全部已存 ChatGPT 登录执行一次,不等下一次自动续期。

## 选项

### `--json`

以 JSON 输出续期结果,适合脚本处理。

## 使用提醒

- 其他家的登录由各自机制维持(Claude Code 在首次使用时自行续期),本命令只针对 ChatGPT 类。

## 源码补充

- 实现见 [accounts_cli.go](https://github.com/yetone/magpie/blob/33dbdcc529622cf0dd053c99eb34f51c06fbba77/internal/cli/accounts_cli.go)。
