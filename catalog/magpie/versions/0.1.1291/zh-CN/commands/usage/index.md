---
title: magpie usage
command:
  - usage
---

查看用量与费用:按 agent、模型、订阅账户、网关密钥与会话汇总,或以 CSV 导出每个请求。

## 简介

汇总经过 magpie 网关的调用:总 token(输入、输出、缓存读写、reasoning)、调用数、错误与重试、按用量价格的估价费用(未计价的调用单独注明);下面依次是 agents、models、上游 provider 密钥、订阅账户、网关密钥与开销最高的会话(至多前 10 个)各分组表。agent 未经 magpie 自己发出的调用从其会话文件读出,单列一节。

不带窗口参数时默认显示最近 30 天。

## 参数

### `window`

时间窗口:`today`(别名 `day`)、`7d`(别名 `week`)、`30d`(别名 `month`)或 `all`。预设窗口按本地时间的自然边界(午夜、周、月)起算。

## 选项

### `--csv`

不打印汇总,而是把窗口内每个请求输出为一行 CSV(请求的模型、实际发送与服务的模型、token、费用、时间、状态、账户),便于与厂商账单对照。

### `--account`

`--account <name>`。只能与 `--csv` 同用:只输出由该订阅账户应答的请求。

### `--last`

`--last <dur>`。以现在为终点的滚动窗口,时长如 `24h`、`90m`、`1.5h`;不与预设窗口或 `--days` 同用。

### `--days`

`--days <n>`。以现在为终点的滚动窗口,天数为 `1`、`7`、`1.5` 皆可;不与预设窗口或 `--last` 同用。

## 使用提醒

- 费用按设置的货币显示;选人民币时按内部汇率缓存(12 小时)折算。
- 窗口内没有任何调用时,提示先让一个 agent 经过 magpie 路由,并显示统计文件路径。
- 每个请求只按其结局计一次错误;重试后成功的请求不计为错误。

## 示例

```sh
magpie usage today
magpie usage --csv --account me@example.com 7d
magpie usage --last 24h
```

以上示例为说明性内容,未实际运行。

## 源码补充

- 窗口解析、CSV 与汇总输出见 [usage_cli.go](https://github.com/yetone/magpie/blob/33dbdcc529622cf0dd053c99eb34f51c06fbba77/internal/cli/usage_cli.go)。
