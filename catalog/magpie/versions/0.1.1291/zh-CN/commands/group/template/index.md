---
title: magpie group template
command:
  - group
  - template
---

按常见需求一步生成一个组,成员取自你已有的模型。

## 简介

`magpie group template [kind] [name]`:不给 kind 时列出全部模板、各自会取的模型(以 `→` 连接)与 classifier,无法生成的模板会注明原因。三种模板:

- `smart`:难的任务发给最强的模型,简单的发给便宜的模型,由 classifier 区分。
- `thrifty`:便宜模型优先;高 reasoning 要求或便宜模型失败时用最强的。
- `steady`:至多三个 provider,各取其最强模型,一个排在另一个后面。

给 kind 时生成对应组;名称或 id 已被占用时自动编号(如 `-2`),绝不替换既有组。别名:`magpie group templates`、`magpie group tpl`。

## 参数

### `kind`

模板类型:`smart`、`thrifty` 或 `steady`;省略时列出模板说明。

### `name`

新组名,省略时用模板名。

## 示例

```sh
magpie group template smart
magpie group template thrifty 省钱组
```

以上示例为说明性内容,未实际运行。

## 源码补充

- `templateCmd` 与模板列表见 [groups_cli.go](https://github.com/yetone/magpie/blob/33dbdcc529622cf0dd053c99eb34f51c06fbba77/internal/cli/groups_cli.go)。
