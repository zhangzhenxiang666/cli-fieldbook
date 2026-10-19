---
title: magpie groups
command:
  - groups
---

列出路由组:你建的组在前,随后是 magpie 自动发现的组。

## 简介

routing group(路由组)把多个模型打包成一个整体,agent 以 `group/<id>` 的形式挑选它;请求进来后由组的 routing 策略决定实际发给哪个模型。本命令列出当前所有组,每组一行:

- 名称与 `group/<id>`;magpie 自动发现的组带 `found` 标记。
- routing 策略与 stays 亲和设置,组内规则数量。
- 成员列表:无法服务的成员会注明原因(如 provider 未暴露该模型);routing 为 order 的组用 `→` 连接成员表示顺序。
- 正在由哪些 agent 使用(绿色 `←` 标出)。

尚无任何组时给出 [`group add`](cli:command:group/add) 的建议命令。若已用 [`group auto off`](cli:command:group/auto) 关闭自动发现,末尾会提示。已移除的组单独列出,可用 [`group restore`](cli:command:group/restore) 找回。

## 使用提醒

- 一个组的详情(成员、规则、classifier 等)用 [`group <id>`](cli:command:group) 查看。
- 自动发现的组(模型被两个及以上 provider 提供时,magpie 自动建为 `auto-<model>`,不落盘存储)用 [`group rm`](cli:command:group/rm) 移除时只是隐藏;真正删除的是你自建的组。

## 源码补充

- 组列表的呈现与 `groupUsage` 见 [groups_cli.go](https://github.com/yetone/magpie/blob/33dbdcc529622cf0dd053c99eb34f51c06fbba77/internal/cli/groups_cli.go)。
- 路由与回退的网关侧机制见 [gateway-routing.md](https://github.com/yetone/magpie/blob/33dbdcc529622cf0dd053c99eb34f51c06fbba77/docs/subsystems/gateway-routing.md)。
