---
title: magpie model wire
command:
  - model
  - wire
---

查看或设置向厂商请求模型时使用的线路名。别名 `model upstream`。

## 简介

三种形态:不带名字时显示厂商被请求的名称与你设置的值;给名字则请求时改用该名(用于按别的名字提供模型的中转);`--reset` 恢复 magpie 已知的原始名称 —— 若 provider 已被删除,恢复时会以其自身 id 单独保留,并在本无自有名称可移除时说明。

`'<provider>/*' <name>` 形式对该 provider 的全部模型生效;名字中的 `*` 代表模型本身,如 `vendor-c/*` 会把 `model-3` 请求为 `vendor-c/model-3`。

## 参数

### `model`

`<provider/model>`。目标模型;`'<provider>/*'` 为该 provider 的所有模型(shell 中注意给 `*` 加引号)。

### `name`

`[<name>]`。请求时使用的线路名。省略时为查看。

## 选项

### `--reset`

恢复按 magpie 已知的名称请求。源码同时接受 `-r` 等同义写法。

## 示例

```sh
magpie model wire relay-a/gpt-5.5 gpt-5.5-turbo
```

以上示例为说明性内容,未实际运行。

## 源码补充

- 实现见 [model_cli.go](https://github.com/yetone/magpie/blob/33dbdcc529622cf0dd053c99eb34f51c06fbba77/internal/cli/model_cli.go) 中的 `modelWire`。
