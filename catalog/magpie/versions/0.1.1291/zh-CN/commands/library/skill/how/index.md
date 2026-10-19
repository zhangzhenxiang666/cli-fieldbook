---
title: magpie library skill how
command:
  - library
  - skill
  - how
---

library skill how —— 技能以链接还是副本写给 agent。

## 简介

设置技能的交付方式:链接指向库里的技能(改库即改各 agent 的技能),副本是写入 agent 技能文件夹的带标记拷贝。三种形式:

- `link [agent]`:全部 agent 改为链接方式,或只改某个 agent。
- `copy [agent]`:全部 agent 改为副本方式,或只改某个 agent。
- `default <agent>`:该 agent 恢复跟随库的统一方式。

不带参数或只给 `default` 而不给 agent 时打印用法。

## 参数

### `mode`

`link|copy|default`。交付方式;`default` 表示恢复默认,必须再给一个 agent。

### `agent`

`[agent]`。只调整这个 agent;省略时(除 `default` 外)调整全部 agent。

## 使用提醒

- WSL 发行版里的 agent 总是收到副本,不受此设置影响。
- 副本一旦在 agent 侧被编辑,同步会先把改动收进库;链接方式则始终直接反映库的内容。

## 示例

```sh
magpie library skill how link
magpie library skill how copy codex
magpie library skill how default codex
```

以上示例为说明性内容,未实际运行。

## 源码补充

- 分发与 `SetSkillHow` 调用见 [library_cli.go](https://github.com/yetone/magpie/blob/33dbdcc529622cf0dd053c99eb34f51c06fbba77/internal/cli/library_cli.go)。
- 链接与带标记副本的机制见官方文档 [library.md](https://github.com/yetone/magpie/blob/33dbdcc529622cf0dd053c99eb34f51c06fbba77/docs/subsystems/library.md)。
