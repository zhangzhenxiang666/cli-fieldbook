---
title: magpie model output
command:
  - model
  - output
---

查看或设置一个模型单条回复的最大长度。别名 `model max-output`。

## 简介

不带数值时显示该模型实际的最大输出与你设置的值;给数值则覆盖(如 `128000` 或 `128k`);`--reset` 移除你设置的值。`'<provider>/*'` 形式对该 provider 的全部模型生效。

## 参数

### `model`

`<provider/model>`。目标模型;`<provider>/*` 为该 provider 的所有模型。

### `n`

`[<n>]`。最大输出长度,支持 `128000` 与 `128k` 两种写法。省略时为查看。

## 选项

### `--reset`

移除你为该模型设置的上限,回到查找顺序的下一层(`<provider id>/*`、provider 自身列表或 models.dev)。源码同时接受 `-r` 等同义写法。

## 示例

```sh
magpie model output relay-a/gpt-6 128k
```

以上示例为说明性内容,未实际运行。

## 源码补充

- 实现见 [model_cli.go](https://github.com/yetone/magpie/blob/33dbdcc529622cf0dd053c99eb34f51c06fbba77/internal/cli/model_cli.go) 中的 `modelOutput`。
