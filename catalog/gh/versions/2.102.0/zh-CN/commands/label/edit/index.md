---
title: gh label edit
command:
  - label
  - edit
---

修改仓库中一个标签的名称、描述或颜色。

## 简介

`gh label edit` 更新目标仓库中的指定标签：`--name` 重命名，`--description` 改描述，`--color` 改颜色。颜色须为 6 位十六进制色值，开头的 `#` 会自动去掉。

`--color`、`--description`、`--name` 至少给出一个，否则命令报错；重命名后的新名称与仓库中现有标签重名时更新失败。

## 参数

### `NAME`

格式：`<name>`。要修改的标签名称；省略时命令报错。

## 选项

### `--description`

短旗标 `-d`。格式：`--description <string>`。标签的新描述。

### `--color`

短旗标 `-c`。格式：`--color <string>`。标签的新颜色，6 位十六进制色值。

### `--name`

短旗标 `-n`。格式：`--name <string>`。标签的新名称。

## 使用提醒

- 三个修改选项至少给一个；只传标签名而不加任何选项会报错。

## 示例

```sh
# 修改 bug 标签的颜色
gh label edit bug --color FF0000

# 重命名 bug 标签并修改描述
gh label edit bug --name big-bug --description "Bigger than normal bug"
```

以上示例为说明性内容，未实际运行。

## 源码补充

- 命令定义与更新请求见 [pkg/cmd/label/edit.go](https://github.com/cli/cli/blob/fc4b137cdef0a6bd28fd461b7cf9c84a5812a8cd/pkg/cmd/label/edit.go)。
