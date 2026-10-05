---
title: gh alias
command:
  - alias
---

管理 gh 命令的别名。`gh alias` 自身是分组命令，为 gh 命令创建快捷方式或把多条命令组合起来。

## 简介

别名（alias）可以为 gh 命令创建快捷方式，也可以组合多条命令。要了解如何定义别名，运行 `gh help alias set` 或参见 [`gh alias set`](cli:command:alias/set)。

别名保存在 gh 配置文件的 `aliases` 一节中；全新安装的默认配置自带别名 `co`（展开为 `pr checkout`）。

## 子命令导览

- [`gh alias delete`](cli:command:alias/delete)：删除已定义的别名，支持按名删除或用 `--all` 全部删除。
- [`gh alias import`](cli:command:alias/import)：从 YAML 文件或标准输入批量导入别名。
- [`gh alias list`](cli:command:alias/list)：以 YAML 映射列出当前配置的全部别名。
- [`gh alias set`](cli:command:alias/set)：为一个 gh 命令定义快捷方式。

## 使用提醒

- 展开式可以带 `$1` 之类的位置占位符，也可以 `!` 开头声明为 shell 表达式，详见 [`gh alias set`](cli:command:alias/set)。
- [`gh alias list`](cli:command:alias/list) 的输出本身是 YAML，可直接作为 [`gh alias import`](cli:command:alias/import) 的输入，用于在机器之间迁移别名。

## 示例

```sh
# 列出当前全部别名
gh alias list

# 定义一个查看议题列表的快捷方式
gh alias set bugs 'issue list --label=bugs'

# 删除该别名
gh alias delete bugs
```

以上示例为说明性内容，未实际运行。

## 源码补充

- 分组定义见 [pkg/cmd/alias/alias.go](https://github.com/cli/cli/blob/fc4b137cdef0a6bd28fd461b7cf9c84a5812a8cd/pkg/cmd/alias/alias.go)；默认别名 `co` 来自默认配置 [internal/config/config.go](https://github.com/cli/cli/blob/fc4b137cdef0a6bd28fd461b7cf9c84a5812a8cd/internal/config/config.go)。
