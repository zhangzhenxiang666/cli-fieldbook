---
title: gh alias list
command:
  - alias
  - list
---

以 YAML 映射列出 gh 当前配置的全部别名。

## 简介

每个别名输出为一行 `别名: 展开式`，整体构成一个 YAML 映射，因此可以直接保存为文件，供 [`gh alias import`](cli:command:alias/import) 导入。全新安装的默认配置自带别名 `co`（展开为 `pr checkout`）。

没有配置任何别名时报错（`no aliases configured`）。

## 参数

本命令不接受位置参数。

## 使用提醒

- 等价写法：`gh alias ls`。
- 配合导入命令可在机器之间迁移别名：先 `gh alias list > aliases.yml`，再在目标机器上 `gh alias import aliases.yml`。

## 示例

```sh
# 列出全部别名
gh alias list

# 导出到文件，供另一台机器导入
gh alias list > aliases.yml
```

以上示例为说明性内容，未实际运行。

## 源码补充

- 别名映射经 YAML 编码器写出，见 [pkg/cmd/alias/list/list.go](https://github.com/cli/cli/blob/fc4b137cdef0a6bd28fd461b7cf9c84a5812a8cd/pkg/cmd/alias/list/list.go)。
