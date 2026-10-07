---
title: gh repo deploy-key list
command:
  - repo
  - deploy-key
  - list
---

## 简介

列出 GitHub 仓库中的部署密钥。别名 `ls`。

交互式终端下以表格输出 ID、TITLE、TYPE、KEY 与 CREATED AT 列；TYPE 按密钥只读与否显示 read-only 或 read-write，KEY 列在窄终端下从中间截断。

## 选项

### `--json`

格式：`--json <strings>`。按指定字段输出 JSON。可选字段：`id`、`key`、`title`、`createdAt`、`readOnly`。

### `--jq`

短旗标 `-q`。格式：`--jq <expression>`。用 jq 表达式过滤 JSON 输出。

### `--template`

短旗标 `-t`。格式：`--template <string>`。用 Go 模板格式化 JSON 输出，语法参见 `gh help formatting`。

## 使用提醒

- 本命令不接受位置参数；继承 [gh repo deploy-key](cli:command:repo/deploy-key) 的 `--repo`。
- 仓库没有部署密钥时报告无结果错误。
- `--template` 必须与 `--json` 同用；组合用法见 [JSON 输出与格式化](../../../../reference/formatting.md)。

## 示例

```sh
# 列出当前仓库的部署密钥
gh repo deploy-key list

# 以 JSON 输出 id 与 title
gh repo deploy-key list --json id,title
```

以上示例为说明性内容，未实际运行。

## 源码补充

- 表格列、类型显示与 KEY 截断逻辑见 [pkg/cmd/repo/deploy-key/list/list.go](https://github.com/cli/cli/blob/fc4b137cdef0a6bd28fd461b7cf9c84a5812a8cd/pkg/cmd/repo/deploy-key/list/list.go)。
