---
title: magpie claude-code install
command:
  - claude-code
  - install
---

下载 Anthropic 官方构建的 Claude Code,供没有它的服务器或容器使用。

## 简介

`magpie claude-code install` 查询 Claude Code 最新版本,展示版本、平台、大小、下载地址与目标路径后询问确认(`--yes` 跳过询问)。下载的文件按 Anthropic 官方安装清单核对 SHA-256;完成后提示用 [`magpie accounts add claude`](cli:command:accounts/add) 添加 Claude 账号。

已下载同一版本时直接说明并退出;本机存在自装的 Claude Code 时会提示:自装的那个优先,下载的这份不会被用到。

## 选项

### `--yes`

跳过下载前的确认询问;别名 `-y`。

## 示例

```sh
magpie claude-code install --yes
```

以上示例为说明性内容,未实际运行。

## 使用提醒

- 下载的是 Anthropic 的软件,遵循 Anthropic 的条款;magpie 只为 Claude 订阅运行它。
- 删除下载的这份用 [`magpie claude-code remove`](cli:command:claude-code/remove)。

## 源码补充

- 版本查询、确认与校验流程见 [claude_code_cli.go](https://github.com/yetone/magpie/blob/33dbdcc529622cf0dd053c99eb34f51c06fbba77/internal/cli/claude_code_cli.go)。
