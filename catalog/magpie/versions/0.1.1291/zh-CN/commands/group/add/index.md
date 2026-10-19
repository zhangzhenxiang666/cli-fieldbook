---
title: magpie group add
command:
  - group
  - add
---

创建一个路由组;agent 以 `group/<id>` 挑选它,id 由名称生成;同名会替换那个组。

## 简介

`magpie group add <name> models=<m1>[,m2…] [routing=…] [stays=…]`:以名称建组并写入成员与策略。不带任何 `models=`(或模式)时拒绝创建。组 id 默认由名称生成(小写字母、数字、点与连字符);若某个未隐藏的组已用同名(且本次未带 `id=`),则替换那个组并沿用其 id,否则报 id 已占用。

支持的 k=v 键(`magpie group set` 亦同):

- `models=<m1>[,m2…]`:成员列表,整体替换。写法见下。
- `models+=…` / `models-=`:在已有列表上追加 / 移除;`models-=` 也可以移除模式(pattern)本身。
- `routing=smart|order|rotate|usage|pace|weight|manual`:路由策略,默认 smart。
- `stays=auto|session|turn|off|strict`:会话亲和,默认 auto。
- `context=<n>|smallest|largest`:告知 agent 组接受多长的请求;`smallest` 取最小成员的值,留空取最大成员的值。
- `levels=none,low,medium,high,xhigh,max`:提供给 agent 的 reasoning 档位;留空恢复为所有成员共有的档位,缺失档位的模型就近降档。
- `family=<tag>`:家族标签, [`visible`](cli:command:visible) 据此按家族而非逐组展示。
- `id=<id>`:显式指定组 id(替换同名组的行为随之关闭;id 被占用则报错)。
- `effort=auto` / `effort=agent`:每轮由 classifier 判定难度选档,或沿用 agent 自己的要求(默认);`effort=auto` 需配合 `classifier=`。
- `classifier=<provider/model>|group/<id>`:判定 intent 或难度的模型。
- `pick=<model>`:固定发给某一成员(此时 routing 为 manual)。
- `fast=<m1>[,m2…]`:以厂商 fast 模式发送的成员(如 ChatGPT 账户的优先处理、Cursor 的 `-fast` 模型);留空为无。
- `weight=<m1>=<n>[,m2=<n>…]`:routing=weight 下各成员的份额,1 到 1000,未写明的成员默认 1;留空全部回到 1。
- `listed=no`:组成员从 agent 可见的模型列表中退出,只经由本组提供;`listed=yes` 恢复。

成员(models=)的写法:

- `provider/model` 为完整 id;裸模型 id 在只有一个 provider 提供它时可用。可用模型见 [`models`](cli:command:models)。
- `group/<id>` 把另一个组作为成员嵌入,按其自身的 routing 与规则运转;不能嵌入直接或间接包含自身的组,嵌套至多 8 层。
- `provider/model:<effort>` 固定该成员的 reasoning 档位(none、minimal、low、medium、high、xhigh、max),无视 agent 的要求;同一模型的两个档位算两个成员。
- `provider/model:fast`(可与档位连用,如 `provider/model:high:fast`)以厂商 fast 模式发送;无 fast 模式的模型会拒绝。
- 模式:glob(如 `openrouter/*:free`,`*` 可跨 `/` 匹配任意字符)或 `re:<regexp>`(整串匹配,如 `re:openrouter/.*:(free|beta)`),需要加引号。组保存的是模式本身:厂商新增匹配模型自动加入,除名自动退出;`magpie group <id>` 会显示每个模式当前命中的数量。模式不匹配组。

## 参数

### `name`

组名。留空时以生成的 id 为名;同名(未隐藏)的组被替换,除非同时给了 `id=`。

### `pairs`

`models=<m1>[,m2…] [routing=…] [stays=…]` 等一组 k=v 设置,键清单与取值见上文简介。

## 使用提醒

- 替换同名组时沿用原 id,agent 无需重新设置;用 `id=` 改 id 后,已设置到旧 id 的 agent 需要重新设置。
- 规则(`group rule add`)只对组内成员生效;`group set` 移除成员时,发给它的规则一并删除。

## 示例

```sh
magpie group add "Opus anywhere" models=claude/claude-opus-5-5,copilot/claude-opus-5.5 routing=order
magpie group add Everything models=group/opus-anywhere,deepseek/deepseek-v4-flash routing=order
magpie group add my-free-pool models='openrouter/*:free,opencode-zen/*-free' routing=order
magpie group add Fast models=codex/gpt-5.6-luna:low,deepseek/deepseek-v4-flash,glm/glm-5.3-flash:high
```

以上示例为说明性内容,未实际运行。

## 源码补充

- `groupUsage`、`addGroup` 与 k=v 解析(`applyGroupPairs`)见 [groups_cli.go](https://github.com/yetone/magpie/blob/33dbdcc529622cf0dd053c99eb34f51c06fbba77/internal/cli/groups_cli.go)。
