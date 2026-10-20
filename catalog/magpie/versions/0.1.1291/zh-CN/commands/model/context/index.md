---
title: magpie model context
command:
  - model
  - context
---

查看或设置一个模型接受的最大请求长度。别名 `model ctx`。

## 简介

不带数值时显示该模型的实际上下文长度与你设置的值;给数值则覆盖(如 `200000` 或 `1m`);`--reset` 移除你设置的值。`'<provider>/*'` 形式对该 provider 的全部模型生效。

## 参数

### `model`

`<provider/model>`。目标模型;`<provider>/*` 为该 provider 的所有模型。

### `n`

`[<n>]`。上下文长度,支持 `200000` 与 `1m` 两种写法。省略时为查看。

## 选项

### `--reset`

移除你为该模型设置的长度,回到查找顺序的下一层(`<provider id>/*`、provider 自身列表或 models.dev)。源码同时接受 `-r` 等同义写法。

## 示例

```sh
magpie model context relay-a/claude-opus-5-5 1m
```

以上示例为说明性内容,未实际运行。

## 源码补充

- 实现见 [model_cli.go](https://github.com/yetone/magpie/blob/33dbdcc529622cf0dd053c99eb34f51c06fbba77/internal/cli/model_cli.go) 中的 `modelContext`。
