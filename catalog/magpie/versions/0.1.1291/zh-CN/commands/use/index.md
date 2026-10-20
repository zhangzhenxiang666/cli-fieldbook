---
title: magpie use
command:
  - use
---

应用一个已保存的 profile,把各 agent 的设置恢复为快照时的值。

## 简介

按名称取出 [`save`](cli:command:save) 保存的 profile 并应用到各 agent,输出 `✓ applied <name> (<n> changed)` 与逐项变更报告。profile 不存在时报错 `no profile named "<name>"`。

## 参数

### `name`

要应用的 profile 名称,来自 [`profiles`](cli:command:profiles) 列表。

## 使用提醒

- 应用只改写 magpie 管理的 agent 设置字段;不影响 API key、订阅登录与 library 内容本身。
- 恢复到 agent 各自的出厂默认用 agent 形式的 `default`,例如 [`magpie codex`](cli:command:codex) `default`。

## 示例

```sh
magpie use daily
```

以上示例为说明性内容,未实际运行。

## 源码补充

- 应用与变更报告见 [main.go](https://github.com/yetone/magpie/blob/33dbdcc529622cf0dd053c99eb34f51c06fbba77/internal/cli/main.go) 的 `profiles()` 中 `use` 分支。
