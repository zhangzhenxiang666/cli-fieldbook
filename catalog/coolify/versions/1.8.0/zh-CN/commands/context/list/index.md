---
title: coolify context list
command:
  - context
  - list
---
## 简介

列出全部已配置的上下文。

## 选项

### `--help`

打印该命令的帮助。

## 使用提醒

#### 行为与限制

v1.8.0 起结构化输出（`--format json`/`pretty`）移除了 `token` 字段，令牌不再出现在列表输出中。

源码：[S30](https://github.com/coollabsio/coolify-cli/blob/ff0ea90fc40e2d5f10e993f79759f705e5e6af10/cmd/context/list.go)
