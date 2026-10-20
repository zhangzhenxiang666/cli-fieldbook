---
title: magpie visible
command:
  - visible
---

控制每个 agent 被显示哪些模型:按 family、provider 或路由组窄化,或只显示已勾选的模型。

## 简介

不带参数时逐个 agent 显示当前的可见性设置与"显示 n、未显示 m"统计。对一个 agent:

- 给逗号分隔的名称列表,只显示这些:families(`magpie provider set <id> family=…` 或 [`group set`](cli:command:group/set) 设置的标签)、provider id、group id。
- `all` 恢复显示全部模型。
- 只给 agent 不给列表时,等价于 [`models <agent>`](cli:command:models) 的解释视图。

未窄化的 agent 显示全部模型。网关的模型列表与写入 agent 文件的列表同样窄化;被挡住的模型在该 agent 按名请求时仍会应答。

## 参数

### `agent`

`[<agent>`。目标 agent。名称不区分大小写,按小写 id 保存(WSL id 的大小写同样处理)。

### `spec`

`<family|provider|group>,… | all]`。逗号分隔的 family、provider id 或 group id 列表;或 `all` 恢复全部。名称会先去掉 `group/` 前缀再校验,未知名称报错并列出已有 families。

## 选项

### `--only-picked`

该 agent 只显示现在为它勾选的模型;之后新出现的模型(无论哪个 provider)保持关闭,直到在 Agents 页的列表里勾选。已显示的模型与已窄化的 providers、families、groups 保持不变。

### `--show-new`

恢复向该 agent 显示新出现的模型(默认行为)。同样不改动现有窄化与勾选。

## 使用提醒

- `magpie models <agent>` 显示该 agent 所见与其余不可见的原因。
- family 由 [`provider set <id> family=…`](cli:command:provider/set) 或 [`group set`](cli:command:group/set) 设置,是把一组 provider/模型当作一个标签整体显示的手段。

## 示例

```sh
magpie visible zcode relay,ocgo
magpie visible claude all
```

以上示例为说明性内容,未实际运行。

## 源码补充

- 设置保存与逐 agent 解释见 [visible_cli.go](https://github.com/yetone/magpie/blob/33dbdcc529622cf0dd053c99eb34f51c06fbba77/internal/cli/visible_cli.go)。
