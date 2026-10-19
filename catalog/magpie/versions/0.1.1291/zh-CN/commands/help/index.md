---
title: magpie help
command:
  - help
---

打印主帮助;与 `magpie --help`、`magpie -h` 相同。本入口存在于源码分发但未列入官方 usage 主体。

## 简介

`magpie help` 输出 usage 常量的全部内容:命令一览与支持的 agent 列表。查某个命令的详细用法,更常用的形式是把 `help` 或 `--help` 放在命令后面,如 `magpie group help`、`magpie model --help`——那会打印该命令自己的 usage 文本,而不是主帮助。

## 使用提醒

- `magpie help <topic>` 并不打印该主题的帮助:顶层 `help` 一律输出主帮助;主题帮助必须写成 `magpie <topic> help`。

## 源码补充

- 顶层分发见 [main.go](https://github.com/yetone/magpie/blob/33dbdcc529622cf0dd053c99eb34f51c06fbba77/internal/cli/main.go)(`case "-h", "--help", "help": fmt.Print(usage)`)。
- `magpie <命令> help` 的主题分发见 [help_cli.go](https://github.com/yetone/magpie/blob/33dbdcc529622cf0dd053c99eb34f51c06fbba77/internal/cli/help_cli.go)(`helpFor`)。
