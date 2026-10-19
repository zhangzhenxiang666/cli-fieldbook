---
title: magpie provider auto-include
command:
  - provider
  - auto-include
---

按模型 id 规则自动暴露厂商新列出的模型。

## 简介

规则作用于模型 id:支持含 `*` 的 glob(如 `'gpt-*'`、`'*claude*'`)与 `re:` 前缀的正则(如 `re:^glm-`)。配置后,厂商列表中匹配的现存模型立即暴露,之后每次抓取新出现的模型若匹配也自动收下;`none` 清空规则。不带参数时显示当前规则。

## 参数

### `id`

`<id>`。目标 provider 的 id。

### `rules`

`[rule…|none]`。一条或多条 glob/正则规则;`none` 清空。

## 使用提醒

- 规则只做"加法":已暴露的模型不会被规则移除,移除用 [`provider models`](cli:command:provider/models) 的 `-id`。

## 示例

```sh
magpie provider auto-include openai 'gpt-*'
magpie provider auto-include my-relay 're:^claude' '*flash*'
magpie provider auto-include my-relay none
```

以上示例为说明性内容,未实际运行。

## 源码补充

- 处理逻辑见 [providers_cli.go](https://github.com/yetone/magpie/blob/33dbdcc529622cf0dd053c99eb34f51c06fbba77/internal/cli/providers_cli.go) 中 `autoIncludeCmd()`。
