---
title: magpie model efforts
command:
  - model
  - efforts
---

查看或收窄一个模型向 agent 提供的 reasoning 档位。别名 `model effort`、`model levels`。

## 简介

不带档位时显示该模型提供的 reasoning 档位(以及它实际拥有的全部档位);给逗号分隔的档位列表则只提供这些;`off` 完全不发送 reasoning 字段;`--reset` 恢复提供其全部档位。

## 参数

### `model`

`<provider/model>`。目标模型。

### `levels`

`[<l>,<l>|off]`。逗号分隔的档位列表(如 `low,medium,high`),或 `off`。省略时为查看。

## 选项

### `--reset`

恢复提供模型拥有的全部档位。源码同时接受 `-r`、`--default`、`default`、`reset` 等同义写法。

## 使用提醒

- 收窄只影响 agent 看到的档位:挑选与路由仍按 `provider/model` 进行。
- 路由组的 `levels=` 与 `effort=auto` 有自己的档位语义,见 [`group set`](cli:command:group/set)。

## 示例

```sh
magpie model efforts openai/gpt-6 low,medium,high
magpie model efforts deepseek/deepseek-chat off
```

以上示例为说明性内容,未实际运行。

## 源码补充

- 实现见 [model_cli.go](https://github.com/yetone/magpie/blob/33dbdcc529622cf0dd053c99eb34f51c06fbba77/internal/cli/model_cli.go) 中的 `modelEfforts`。
