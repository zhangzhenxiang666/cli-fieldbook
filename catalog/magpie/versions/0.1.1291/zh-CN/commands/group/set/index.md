---
title: magpie group set
command:
  - group
  - set
---

修改一个路由组的设置,k=v 键与 [`group add`](cli:command:group/add) 相同。

## 简介

对一个已存在的组逐项修改:成员列表(`models=` 整体替换、`models+=` 追加、`models-=` 移除)、routing、stays、context、levels、family、effort、classifier、fast、weight、listed 等,键与取值同 [`group add`](cli:command:group/add) 的说明。

几个专属于 set 的行为:

- `name=` 只改显示名,不改 id;命令会提示 agents 仍按 `group/<原id>` 请求。
- `id=` 重命名组 id:组保存到新 id 后,包含它的组随之指向新 id;已设置到旧 id 的 agent 需要重新设置(命令以 `!` 提醒)。新 id 必须是小写字母、数字、点与连字符。
- `models-=` 移除某个由模式(pattern)带入的成员时会拒绝:先改模式本身,或在 Routing 视图中关闭该模型。
- 被移除成员上的规则随成员一并删除(命令逐条提示)。
- 对 magpie 自动发现的组(set、pick 等写操作)会使它成为你自己的组。

## 参数

### `id`

要修改的组 id。

### `pairs`

k=v 形式的修改项,可同时给多个。键清单:`name, models, models+, models-, routing, pick, stays, context, levels, family, effort, classifier, fast, weight, listed, id`(含义见 [`group add`](cli:command:group/add))。

## 示例

```sh
magpie group set opus-anywhere stays=session models+=openrouter/anthropic/claude-opus-5.5
magpie group set auto-gpt-6-astra id=gpt-6-astra
magpie group set opus-anywhere effort=auto classifier=typesafe/jev-latest
magpie group set opus-anywhere routing=weight weight=claude/claude-opus-5-5=3
```

以上示例为说明性内容,未实际运行。

## 源码补充

- `setGroup`、`applyGroupPairs` 与改名逻辑见 [groups_cli.go](https://github.com/yetone/magpie/blob/33dbdcc529622cf0dd053c99eb34f51c06fbba77/internal/cli/groups_cli.go)。
