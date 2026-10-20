---
title: magpie group rule
command:
  - group
  - rule
---

组的规则:按一轮请求的长度、图片、reasoning 要求、agent、时间或文件夹,决定先发给哪个模型。

## 简介

`magpie group rule`(别名 `magpie group rules`)管理组内规则,与 Routing 视图的 Rules 区等价。形式:

- `magpie group rule <group>`:显示该组的规则(无规则时给出建议命令)。
- `magpie group rule add <group> use=<model> [条件…]`:加一条规则。匹配的一轮请求把 `<model>`(须是组成员,或 `group/<id>` 嵌套组;可带档位如 `use=glm/glm-5.3-flash:high`)排到最前,组内其余成员仍在其后兜底。`at=<n>` 指定插入位置,省略追加到末尾。
- `magpie group rule add <group> pause=<model> [条件…]`:加一条"暂停":条件成立期间该成员完全退出组 —— 一个请求都不发,即使其他成员全部失败或会话正开着它。pause 只认 time、days、agents、folders、except-folders 条件。
- `magpie group rule rm <group> <n>`:删除第 n 条规则。
- `magpie group rule mv <group> <n> <to>`:把第 n 条移到第 to 位。
- `magpie group rule classifier <group> <model>`:指定判定 intent 的模型(须已有带 `intent=` 的规则),模型或 `group/<id>` 皆可。

规则自上而下匹配,你发送消息(新一轮)时第一条命中的规则生效;一个 turn 内 agent 的工具结果继续用该轮开始的模型。所有给出的条件必须同时成立:

- `tokens=<n>`:请求长度至少 n(写法 200000、200k、1m),取按大小估算与厂商对会话上一请求计数中的较大者。
- `images`:本轮或会话早前带图。
- `effort=on|low|medium|high|xhigh|max`:agent 要求了 reasoning(on 为任意档),或至少达到该档。
- `agents=a,b…`:来自这些 agent(claude、codex、opencode 等,以 magpie 的命名为准)。
- `intent="<描述>"`:消息属于这一类,由组的 classifier 在轮首判定一次;classifier 失败或说不出时没有任何 intent 命中,该调用计入 magpie 自身的用量。
- `compact`:agent 正在压缩会话(Claude Code 的 /compact 或自动压缩、Codex、OpenCode、Pi、Gemini CLI、Qwen Code、Kimi 的同类机制),可让更便宜更快的模型写摘要;压缩请求不是该轮的模型,之后照旧。
- `time=HH:MM-HH:MM`:本轮开始于此时段(本机时钟,`22:00-08:00` 可跨午夜)。
- `days=mon-fri` / `days=sat,sun`:仅这些天;与 time 连用时跨午夜窗口属于开始那天;单独用则全天成立。
- `folders=<folder>,…`:agent 工作于这些文件夹或其子文件夹(如 `~/work/acme`、`C:\work`);以 agent 在请求中告知的文件夹为准,未告知的请求不匹配任何 folder。带空格要加引号:`folders="~/My Project,~/oss"`。
- `except-folders=<folder>,…`:不在这些文件夹;未告知文件夹的请求视为"不在",因而条件成立。
- `use-effort=low|medium|high|xhigh|max`:规则命中时发给 `<model>` 的 reasoning 档,无视 agent 的要求;模型档位未知时按 agent 的原要求。
- `classifier=<model>`:随本条规则一并设定组 classifier。

## 参数

### `verb`

`add`(别名 `new`)、`rm`(别名 `remove`、`delete`)或 `mv`(别名 `move`);源码另支持 `classifier`(别名 `classify`)设定判定模型。

### `id`

组 id。组须未被移除;已移除时提示先 [`group restore`](cli:command:group/restore)。

### `rest`

随 verb 而定:add 为 `use=<model>`/`pause=<model>` 与条件键值;rm 为规则序号 `<n>`;mv 为 `<n> <to>`;classifier 为 `<model>`。

## 使用提醒

- 成员被 [`group set`](cli:command:group/set) 移出组时,发给它的规则一并删除。
- routing 为 manual(见 [`group pick`](cli:command:group/pick))时规则等待中。
- `magpie group rule help` 打印完整规则用法(`ruleUsage`)。

## 示例

```sh
magpie group rule add opus-anywhere use=openrouter/google/gemini-3-pro tokens=200k
magpie group rule add fast use=codex/gpt-5.6-sol:xhigh effort=high
magpie group rule add opus-anywhere use=deepseek/deepseek-v4-flash compact
magpie group rule add cheap pause=glm/glm-5.3 time=14:00-18:00 days=mon-fri
magpie group rule add opus-anywhere use=deepseek/deepseek-v4-flash intent="a quick question" classifier=groq/llama-3.1-8b-instant
magpie group rule add auto-claude-opus-5-5 pause=claude/claude-opus-5-5 except-folders=~/big-task
```

以上示例为说明性内容,未实际运行。

## 源码补充

- `ruleUsage` 与 `ruleCmd` 见 [groups_rules_cli.go](https://github.com/yetone/magpie/blob/33dbdcc529622cf0dd053c99eb34f51c06fbba77/internal/cli/groups_rules_cli.go);规则在组视图中的呈现见 [groups_cli.go](https://github.com/yetone/magpie/blob/33dbdcc529622cf0dd053c99eb34f51c06fbba77/internal/cli/groups_cli.go)。
