---
title: gh alias import
command:
  - alias
  - import
---

从 YAML 文件或标准输入批量导入别名。

## 简介

别名在 YAML 中定义为一个映射：键是别名，值是对应的展开式。示例文件如下：

```yaml
bugs: issue list --label=bug
igrep: '!gh issue list --label="$1" | grep "$2"'
features: |-
    issue list
    --label=enhancement
```

用 `-` 作为文件名参数可从标准输入读取 YAML 格式的别名。

[`gh alias list`](cli:command:alias/list) 的输出本身是 YAML，可以保存为文件再导入，用于把别名从一台机器迁移到另一台机器。

## 参数

### `FILENAME|-`

可选，写作 `[<filename> | -]`。存放别名的 YAML 文件名；传 `-` 表示从标准输入读取。省略文件名且标准输入是终端（无输入可读）时报错。

## 选项

### `--clobber`

格式：`--clobber`。覆盖同名的既有别名。

## 使用提醒

- 名称与既有 gh 命令或扩展冲突、同名但未加 `--clobber`、或展开式不对应任何 gh 命令、扩展或别名的条目会被跳过并逐条提示，其余条目照常导入。
- 每个成功导入的别名输出 `Added alias <名称>`；覆盖既有别名时输出 `Changed alias <名称>`。

## 示例

```sh
# 从文件导入别名
gh alias import aliases.yml

# 从标准输入导入别名
gh alias import -
```

以上示例为说明性内容，未实际运行。

## 源码补充

- 名称与展开式校验、跳过与覆盖逻辑见 [pkg/cmd/alias/imports/import.go](https://github.com/cli/cli/blob/fc4b137cdef0a6bd28fd461b7cf9c84a5812a8cd/pkg/cmd/alias/imports/import.go)。
