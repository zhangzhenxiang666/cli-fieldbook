---
title: magpie group
command:
  - group
---

显示一个路由组及其模型(与 `magpie group show <id>` 相同)。

## 简介

按 id 显示一个组的完整详情:routing 策略、stays 亲和、成员(编号列出,`provider/model:<effort>`、`:fast` 等以保存时的写法显示)、模式匹配(pattern)命中的模型数、规则列表、levels、effort 与 classifier 设置,以及正在使用它的 agent。

- magpie 自动发现的组标注 "found by magpie —— 修改后归你所有";已移除的组标注 `removed` 并提示用 [`group restore`](cli:command:group/restore) 找回。
- 无法服务的成员(如 provider 未暴露该模型、provider 关闭)以暗色显示并注明原因,路由时跳过。
- routing 为 manual 时显示选定的模型(● 标记),其余成员与规则等待中。

组的创建与修改见 [`group add`](cli:command:group/add) 与 [`group set`](cli:command:group/set)。

## 参数

### `id`

组 id(省略 `group/` 前缀)。组 id 在创建时由名称生成(小写字母、数字、点与连字符),也可用 `id=` 显式指定或改名。

## 使用提醒

- `magpie group help` 打印本族命令的完整用法(`groupUsage`)。
- 给 agent 设置组:`magpie <agent> group/<id>`,例如 `magpie claude group/opus-anywhere`。

## 示例

```sh
magpie group opus-anywhere
```

以上示例为说明性内容,未实际运行。

## 源码补充

- 显示逻辑与命令分发见 [groups_cli.go](https://github.com/yetone/magpie/blob/33dbdcc529622cf0dd053c99eb34f51c06fbba77/internal/cli/groups_cli.go)。
