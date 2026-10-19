---
title: magpie sessions
command:
  - sessions
---

查看最近的 Claude Code、Codex、OpenCode 与 Pi 会话及各自的花费;带 `--days` 时按天汇总。

## 简介

不带 `--days` 时列出最近的会话(默认 20 条):每个会话的 agent、模型与费用。带 `--days` 时按天显示每个会话花了多少,并列出最常见的模型与工作目录,与应用的 Sessions 视图一致。

## 选项

### `--days`

`--days N|today|all`(`-d`)。切换为按天汇总视图:`today`(或 `1d`)只看今天,`all`(或 `0`)看全部,数字为天数;只给 `--days` 不给值时默认 7 天。

### `--model`

`--model <m>`(`-m`)。只看用到该模型的会话;名称按精确、忽略大小写、部分匹配的顺序解析,歧义时报错并列出候选。

### `--folder`

`--folder <f>`(`-f`)。只看该工作目录(会话所在文件夹)下的会话;支持 `~` 与相对路径,解析规则同 `--model`。

### `--json`

以 JSON 输出,供脚本使用。

## 使用提醒

- 源码的用法串还接受 `--limit N`(列表条数,默认 20)与 `stats` 作为 `--days` 的同义词;主帮助未列出,本页不展开。
- 源码中另有 `sessions relocate-claude` 迁移 Claude 会话项目目录的内部入口(`--from`/`--to`/`--confirm`),主帮助未列出,本版不单独文档化。

## 示例

```sh
magpie sessions
magpie sessions --days today
magpie sessions --model deepseek/deepseek-chat --json
```

以上示例为说明性内容,未实际运行。

## 源码补充

- 参数解析、名称解析与列表输出见 [sessions_cli.go](https://github.com/yetone/magpie/blob/33dbdcc529622cf0dd053c99eb34f51c06fbba77/internal/cli/sessions_cli.go)。
