---
title: gh repo autolink list
command:
  - repo
  - autolink
  - list
---

## 简介

列出 GitHub 仓库配置的全部自动链接。别名 `ls`。

自动链接信息仅仓库管理员可见。交互式终端下以表格输出 ID、KEY PREFIX、URL TEMPLATE 与 ALPHANUMERIC 列。

## 选项

### `--web`

短旗标 `-w`。格式：`--web`。在网页浏览器中列出自动链接。

### `--json`

格式：`--json <strings>`。按指定字段输出 JSON。可选字段：`id`、`isAlphanumeric`、`keyPrefix`、`urlTemplate`。

### `--jq`

短旗标 `-q`。格式：`--jq <expression>`。用 jq 表达式过滤 JSON 输出。

### `--template`

短旗标 `-t`。格式：`--template <string>`。用 Go 模板格式化 JSON 输出，语法参见 `gh help formatting`。

## 使用提醒

- `--web` 在浏览器打开该仓库设置中的自动链接页（settings/key_links）。
- 仓库没有自动链接时报告无结果错误。
- 本命令不接受位置参数；继承 [gh repo autolink](cli:command:repo/autolink) 的 `--repo`。
- `--template` 必须与 `--json` 同用；组合用法见 [JSON 输出与格式化](../../../../reference/formatting.md)。

## 示例

```sh
# 列出当前仓库的自动链接
gh repo autolink list

# 以 JSON 输出 id 与 keyPrefix
gh repo autolink list --json id,keyPrefix

# 在浏览器中打开自动链接设置页
gh repo autolink list --web
```

以上示例为说明性内容，未实际运行。

## 源码补充

- 表格列与 `--web` 打开的地址见 [pkg/cmd/repo/autolink/list/list.go](https://github.com/cli/cli/blob/fc4b137cdef0a6bd28fd461b7cf9c84a5812a8cd/pkg/cmd/repo/autolink/list/list.go)。
