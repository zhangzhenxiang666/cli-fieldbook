---
title: 路由组
uses:
  - command:groups
  - command:group
---

# 路由组

路由组(routing group)把多个模型、甚至多个订阅账户捆成一个可选项:agent 挑它时写 `group/<id>`,实际应答的模型由组内策略决定。这是 magpie 做"配额用完自动切换"与"按任务难度分流"的核心机制。

## 组的构成

```sh
magpie group add <name> models=<m1>,<m2> [routing=…] [stays=…]
```

- `models` 支持 `provider/model`、嵌套的 `group/<id>`、模式通配与按 effort 的标注(如 `provider/model:low`);
- id 由名字生成;`group set <id> id=新id` 可改,改后引用旧 id 的 agent 需要重新设置;
- 组可以嵌套:一个组的 models 里放另一个组。

## routing 模式

| 模式 | 行为 |
|---|---|
| `smart` | 优先发给最快恢复额度的订阅账户 |
| `order` | 按列表顺序,前面的不可用才用后面的 |
| `rotate` | 轮流 |
| `usage` | 按用量均衡 |
| `pace` | 按节奏分配 |

`stays`(auto|session|turn|off)控制亲和:会话粘在应答过的账户上,以保住 provider 侧的 prompt cache。

## 规则与意图路由

- [`magpie group rule`](cli:command:group/rule):按请求长度、是否含图片、reasoning 要求或来源 agent 决定先试哪个模型;
- `classifier=<provider/model>` + `effort=auto`:一个小模型逐轮分类任务难度,难任务进强模型、快问题进便宜模型;
- `pick=<model>`:手动钉死(routing=manual)。

## 自动发现

magpie 会自己发现可组成的组(`group auto` 默认 on),发现的组与你建的组并列显示;删除发现的组只是隐藏,`group restore` 可找回。

## 来源

- 路由决策与亲和的实现:docs/subsystems/gateway-routing.md(固定提交)
- 全部子命令与 k=v 键:internal/cli/groups_cli.go(固定提交)
