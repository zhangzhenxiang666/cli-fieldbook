---
title: magpie gateway-key limit
command:
  - gateway-key
  - limit
---

查看或设置一个网关密钥自身的用量限额:token 数、美元费用或两者,按窗口计。

## 简介

一个密钥可以有一条或多条限额;有多条时,请求只有当每条都还有余量时才通过。不带修改参数(或 `list`)时,显示该密钥各限额的窗口、已用、剩余与状态,例如:

```text
Key     laptop (k1)
Window  this day, 2026-10-19 00:00 – 2026-10-20 00:00 (local time)
Tokens  120000 used of 1000000, 880000 left (input, output and cache writes)
Cost    $1.20 used of $20.00, $18.80 left (estimate at Usage prices)
State   open
```

## 参数

### `id`

密钥 ID,见 [`list`](cli:command:gateway-key/list)。

### `form`

限额操作形式,取值之一:

- 缺省或 `list`:只显示各限额的用量
- `off`:取消全部限额
- `reset [<n>]`:从 0 重新计数——全部限额,或第 n 条(编号从 1 起,与列表一致);N 天/N 小时周期的限额同时从现在开启新周期
- `remove <n>`:去掉第 n 条限额
- `[add] day|week|month|<N>d|<N>h`:设置(或用 `add` 再加一条)窗口为每天、每周、每月、每 N 天(如 `10d`)或每 N 小时(如 `5h`)的限额;不带 `add` 时,若已有几条限额则改其中同窗口的那条,只有一条时直接替换

## 选项

### `--tokens`

`--tokens N`。窗口内的 token 上限,如 `1000000` 或 `2m`。默认计输入、输出与缓存写入。

### `--cost`

`--cost USD`。窗口内的费用上限(美元),如 `5` 或 `2.50`,按用量统计的估价计。

### `--cache-reads`

缓存读取的 token 也计入 `--tokens` 的额度。

## 使用提醒

- 设置限额必须给 `--tokens`、`--cost` 至少其一,否则报错;取消限额用 `off`。
- 限额耗尽后该密钥的请求被拒绝,直到窗口恢复;列表与详情中显示 `spent` 与恢复时间。
- 窗口按本地时间的自然边界(日/周/月)或从设置时刻起的 N 天/N 小时周期计算。

## 示例

```sh
magpie gateway-key limit k1 day --tokens 2m --cost 10
magpie gateway-key limit k1 add 5h --tokens 500000
magpie gateway-key limit k1 reset 1
```

以上示例为说明性内容,未实际运行。

## 源码补充

- 子形式分发、窗口解析(parseKeyLimit)与用量展示见 [gateway_keys_cli.go](https://github.com/yetone/magpie/blob/33dbdcc529622cf0dd053c99eb34f51c06fbba77/internal/cli/gateway_keys_cli.go)。
