---
title: magpie group rm
command:
  - group
  - rm
---

移除路由组;magpie 自动发现的组只是隐藏。

## 简介

`magpie group rm <id>…`:移除一个或多个组。可一次给多个 id:任一 id 无效或已被移除则整批失败,全部有效才全部删除。

两种组的区别:

- 你自建的组:真正删除。
- magpie 自动发现的组(模型被两个及以上 provider 提供时自动生成的 `auto-<model>` 组):只在 providers.json 里写入 `{"id":…,"hidden":true}` 记录把它藏起来,随时可用 [`group restore`](cli:command:group/restore) 找回;直接删掉文件里那条记录同样能恢复。

## 参数

### `id`

组 id,可给多个。

## 使用提醒

- 已被移除的组再删会报错并提示 restore;自动组的模型只剩一个 provider 提供时,只剩隐藏记录,restore 之后也要等模型再次被两个 provider 提供才会出现。
- 正在使用某个组的 agent 不会随删除而改设置,需要另行处理。

## 示例

```sh
magpie group rm fast
magpie group rm opus-anywhere fast
```

以上示例为说明性内容,未实际运行。

## 源码补充

- `removeGroups`(全有或全无)与 `groupUsage` 尾注见 [groups_cli.go](https://github.com/yetone/magpie/blob/33dbdcc529622cf0dd053c99eb34f51c06fbba77/internal/cli/groups_cli.go)。
