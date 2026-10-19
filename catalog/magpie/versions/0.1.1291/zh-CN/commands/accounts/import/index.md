---
title: magpie accounts import
command:
  - accounts
  - import
---

从其他工具的凭据导出文件导入订阅账户。

## 简介

支持的来源与类别:

- `codex`(或 `chatgpt`):Codex CLI 在另一台电脑的 auth.json,以及 codexbar、Cockpit Tools、CLIProxyAPI 等工具的导出;
- `claude`(或 `cc`):Claude 的凭据文件;
- `antigravity`(或 `ag`):Antigravity 的凭据文件。

导入前逐条列出影响并要求确认(`--yes` 跳过):

- 导入即接管:来源工具对该账户的登录会失效,之后要再用需重新登录(Claude 的文件副本在 Claude Code 首次使用该账户续期后同样失效);
- codex 导入的每个账户先与 ChatGPT 刷新登录,再入库;antigravity 同样先与 Google 刷新;
- 源文件只读,从不修改;magpie 已有的账户保持原样。

`factory`(droid)不再支持导入:改用 `magpie accounts add factory`。

## 参数

### `kind`

`<codex|claude|antigravity|factory>`。凭据来自哪家(`chatgpt`、`cc`、`ag`、`droid` 为同义词)。

### `file`

`<file>...`。一个或多个导出文件路径。单个文件超过 4 MiB 视为不是导出文件而拒绝;无法读取的文件会中止整个导入(不会把读不出的当成空文件)。

## 选项

### `--yes`

`-y, --yes`。跳过影响确认直接导入。确认内容涉及"来源工具将被登出",建议先不加此参数看一遍提示。

## 示例

```sh
magpie accounts import codex ~/old-machine/auth.json
```

以上示例为说明性内容,未实际运行。

## 使用提醒

- Claude 导入带有厂商风险提示(同 [`magpie accounts add claude`](cli:command:accounts/add) 的确认),确认后再导入。

## 源码补充

- 类别、大小上限与逐条影响提示见 [accounts_cli.go](https://github.com/yetone/magpie/blob/33dbdcc529622cf0dd053c99eb34f51c06fbba77/internal/cli/accounts_cli.go)。
