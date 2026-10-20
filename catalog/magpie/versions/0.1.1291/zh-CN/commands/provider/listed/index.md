---
title: magpie provider listed
command:
  - provider
  - listed
---

控制该 provider 的模型是否出现在 agent 可见的模型列表里。

## 简介

`no`:模型从 agent 看到的列表移除,只通过路由组(`group/<id>`)提供服务;`yes`:恢复列出。

## 参数

### `id`

`<id>`。目标 provider 的 id。

### `choice`

`yes|no`。是否列出。

## 使用提醒

- 适合把大量中转模型"藏"进路由组、只让 agent 看到组名的场景;配合 [`group`](cli:command:group) 与 [`visible`](cli:command:visible) 使用。

## 示例

```sh
magpie provider listed my-relay no
magpie provider listed my-relay yes
```

以上示例为说明性内容,未实际运行。

## 源码补充

- 处理逻辑见 [providers_cli.go](https://github.com/yetone/magpie/blob/33dbdcc529622cf0dd053c99eb34f51c06fbba77/internal/cli/providers_cli.go) 中 `providerCmd()` 的 `listed` 分支。
