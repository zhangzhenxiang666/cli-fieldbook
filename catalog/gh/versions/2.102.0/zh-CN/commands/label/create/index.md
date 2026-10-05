---
title: gh label create
command:
  - label
  - create
---

在仓库中创建新标签。

## 简介

`gh label create` 以指定名称在目标仓库创建标签；描述与颜色可选，未指定颜色时从一组预置颜色中随机选择。颜色须为 6 位十六进制色值，开头的 `#` 会自动去掉。

同名标签已存在时创建失败，并提示改用 `--force` 更新其颜色与描述。

## 参数

### `NAME`

格式：`<name>`。新标签的名称；省略时命令报错。

## 选项

### `--description`

短旗标 `-d`。格式：`--description <string>`。标签的描述。

### `--color`

短旗标 `-c`。格式：`--color <string>`。标签的颜色，6 位十六进制色值；未指定时随机选择。

### `--force`

短旗标 `-f`。格式：`--force`。同名标签已存在时，不报错而是更新该标签的颜色与描述。

## 使用提醒

- 创建与更新成功时，终端会显示相应提示；非终端输出（如重定向）下不打印提示。

## 示例

```sh
# 创建 bug 标签
gh label create bug --description "Something isn't working" --color E99695
```

以上示例为说明性内容，未实际运行。

## 源码补充

- 命令定义、随机颜色与 `--force` 更新路径见 [pkg/cmd/label/create.go](https://github.com/cli/cli/blob/fc4b137cdef0a6bd28fd461b7cf9c84a5812a8cd/pkg/cmd/label/create.go)。
