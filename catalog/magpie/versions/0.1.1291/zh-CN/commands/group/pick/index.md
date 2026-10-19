---
title: magpie group pick
command:
  - group
  - pick
---

手动路由一个组:每个请求都发给它的某一个成员(等价于在 Routing 视图组卡片上点选)。

## 简介

`magpie group pick <id> <model>` 把组固定为 manual 路由:所有请求都发给 `<model>`,其余成员与规则等待,直到改选其他模型或换回别的 routing;不会向其他成员故障转移。实现上等价于 [`group set`](cli:command:group/set) 的 `pick=<model>`。

## 参数

### `id`

组 id。

### `model`

选定的成员。可写完整 `provider/model`(含档位写法),裸模型 id 在组内无歧义时可用。

## 示例

```sh
magpie group pick opus-anywhere copilot/claude-opus-5.5
```

以上示例为说明性内容,未实际运行。

## 使用提醒

- 恢复自动路由:用 [`group set`](cli:command:group/set) 改回 `routing=smart` 等策略,或再选另一个模型。

## 源码补充

- pick 的分发(转 `setGroup` 的 `pick=`)见 [groups_cli.go](https://github.com/yetone/magpie/blob/33dbdcc529622cf0dd053c99eb34f51c06fbba77/internal/cli/groups_cli.go)。
