---
title: magpie group auto
command:
  - group
  - auto
---

是否让 magpie 自动发现路由组(默认开)。

## 简介

magpie 会为每个被两个及以上 provider 提供的模型自动建组(`auto-<model>`,不落盘存储)。本命令查看或切换这一行为:

- 不带参数:显示当前状态(on 或 off)。
- `on`:恢复自动发现,自动组重新列出与服务。
- `off`:自动组不再列出、不再服务;你自建的组、以及你修改过的自动组(已成为你的组)保留;设置在自动组上的 agent 被移到该模型在单个 provider 上的版本。

别名:`magpie group found`。

## 参数

### `state`

`on` 或 `off`,省略时仅查询。

## 使用提醒

- 切换会触发 agent 设置的重新落座(Reseat):设置在受影响组上的 agent 会被自动调整,命令会列出被移动的项。

## 示例

```sh
magpie group auto
magpie group auto off
```

以上示例为说明性内容,未实际运行。

## 源码补充

- `autoGroupsCmd` 见 [groups_cli.go](https://github.com/yetone/magpie/blob/33dbdcc529622cf0dd053c99eb34f51c06fbba77/internal/cli/groups_cli.go)。
