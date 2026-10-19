---
title: magpie model price
command:
  - model
  - price
---

查看或设置一个模型的价格,供用量与 session 统计计费。别名 `model cost`。

## 简介

价格按"USD / 每百万 token"给出,四段为输入、输出、缓存读、缓存写(如 `0.12,1.20,0.01,0.15`);`0` 表示免费服务,是一个价格而非未定价。可给第五段作为 1 小时缓存写的价格;未给时,Claude 模型按输入价的 2 倍、其他模型按第四段。

`--tier`(如 `--tier 272k`)为"输入含缓存 token 超过 272K 的整段请求"追加一档价格,可重复给出。`--reset` 移除你为该模型设的价格。

不带价格参数时显示该模型当前计费口径与你设置的值。

## 参数

### `model`

`<provider/model>`。目标模型。也接受 `<model>` 裸模型 id 形式,保存为 `*/<model>`:对"你未为其单独定价的任何 provider"生效,用于 provider 已消失的存量用量、或 models.dev 没有计价的模型。

### `prices`

`[<in>,<out>,<cache read>,<cache write>]`。逗号分隔的价格段。省略时为查看。

## 选项

### `--tier`

`--tier <n> <in>,<out>,<cr>,<cw>`。超长请求档位价格:`<n>` 为档位阈值(如 `272k`),其后跟该档的四段价格;可重复给出多个档位。

### `--reset`

移除你为该模型设置的价格。价格查找顺序中,`*/<model>` 与 `<provider id>/*` 层的值不受影响,命令会说明仍有哪层生效。源码同时接受 `-r` 等同义写法。

## 使用提醒

- 价格只影响 [`usage`](cli:command:usage) 与 [`sessions`](cli:command:sessions) 的统计口径,不改变 agent 可见的任何内容;保存时不重写 agent 自己文件里的模型列表。
- 价格属于"一个 provider 对一个模型":同一个模型换 provider 需要另设。

## 示例

```sh
magpie model price relay-a/gpt-5.5 0.12,0.60,0.01,0.15
magpie model price relay-a/claude-opus-5-5 0.12,0.60,0.01,0.15 --tier 272k 0.24,1.20,0.02,0.30
```

以上示例为说明性内容,未实际运行。

## 源码补充

- 实现与 `--tier` 解析见 [model_cli.go](https://github.com/yetone/magpie/blob/33dbdcc529622cf0dd053c99eb34f51c06fbba77/internal/cli/model_cli.go) 中的 `modelPrice`。
