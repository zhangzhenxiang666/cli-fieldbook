---
title: skills list
command:
  - list
---

## 简介

列出已安装的技能。别名 `ls`。

默认列出项目级技能；`-g` 列出全局技能，`-a` 按 Agent 过滤，`--json` 输出机器可读结果。

## 选项

### `--global`

列出用户全局技能（默认为项目技能）。短形式 `-g`。

### `--agent`

只列出指定 Agent 的技能，占位符 `<agents>`。短形式 `-a`。

### `--json`

以 JSON 输出（机器可读、无 ANSI 颜色码）。

## 示例

```sh
skills list
skills ls -g
skills ls -a claude-code
skills ls --json
```

源码：[S01](https://github.com/vercel-labs/skills/blob/7407f3893ad4dceab546ac002c3ef806e4000c73/src/list.ts)
