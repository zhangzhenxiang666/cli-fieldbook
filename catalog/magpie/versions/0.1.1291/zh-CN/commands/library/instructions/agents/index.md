---
title: magpie library instructions agents
command:
  - library
  - instructions
  - agents
---

library instructions agents —— 设置接收共享指示的 agent。

## 简介

把接收共享指示的 agent 集合设为给定列表。每个 agent 会被校验其指示文件是否对库开放,不能接收的会被拒绝并报错;名称会转换为 agent 的规范 id。

## 参数

### `agents`

`<a,b…|none>`。逗号分隔的 agent 列表;`none` 表示没有任何 agent 接收指示(空白项被忽略)。

## 使用提醒

- 校验失败时整条命令报错,不做部分修改。
- 改动后由 [`library sync`](cli:command:library/sync) 或本次变更立即写入各 agent。

## 示例

```sh
magpie library instructions agents claude,codex
magpie library instructions agents none
```

以上示例为说明性内容,未实际运行。

## 源码补充

- 列表解析与 `Takes` 校验见 [library_cli.go](https://github.com/yetone/magpie/blob/33dbdcc529622cf0dd053c99eb34f51c06fbba77/internal/cli/library_cli.go)。
