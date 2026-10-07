---
title: gh repo autolink create
command:
  - repo
  - autolink
  - create
---

## 简介

为仓库创建新的自动链接。别名 `new`。

`keyPrefix` 指定键前缀：其后接特定字符时生成链接。`urlTemplate` 指定目标 URL 模板，必须包含 `<num>` 变量表示引用编号。默认创建字母数字（alphanumeric）自动链接，加 `--numeric` 则创建数字型。

`<num>` 的匹配范围随类型不同：字母数字型匹配 `A-Z`（大小写不敏感）、`0-9` 与 `-`；数字型只匹配 `0-9`。模板中多次出现 `<num>` 时只有第一处被替换。

## 参数

### `KEYPREFIX`

格式：`<keyPrefix>`。触发链接的键前缀，如 `TICKET-`。

### `URLTEMPLATE`

格式：`<urlTemplate>`。目标 URL 模板，须包含 `<num>` 变量。

## 选项

### `--numeric`

短旗标 `-n`。格式：`--numeric`。把自动链接标记为数字型。

## 使用提醒

- 两个位置参数缺一不可，缺失时报错退出。
- 继承 [gh repo autolink](cli:command:repo/autolink) 的 `--repo`。

## 示例

```sh
# 为键前缀 "TICKET-" 创建指向 example.com 的字母数字自动链接。
# "TICKET-123abc" 会生成 https://example.com/TICKET?query=123abc
gh repo autolink create TICKET- "https://example.com/TICKET?query=<num>"

# 为键前缀 "STORY-" 创建指向 example.com 的数字自动链接。
# "STORY-123" 会生成 https://example.com/STORY?id=123
gh repo autolink create STORY- "https://example.com/STORY?id=<num>" --numeric
```

以上示例为说明性内容，未实际运行。

## 源码补充

- 参数语义、`<num>` 匹配规则与示例见 [pkg/cmd/repo/autolink/create/create.go](https://github.com/cli/cli/blob/fc4b137cdef0a6bd28fd461b7cf9c84a5812a8cd/pkg/cmd/repo/autolink/create/create.go)。
