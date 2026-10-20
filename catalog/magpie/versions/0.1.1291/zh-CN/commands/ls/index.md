---
title: magpie ls
command:
  - ls
---

列出这台机器上已检测到的 agent 及其当前设置(别名 `magpie list`)。

## 简介

按应用中显示的顺序列出已检测到的 agent:名称、各字段的当前值(model 直接显示,其余字段以"标签 值"形式并排)与配置文件路径。在应用中被隐藏的 agent 排在列表末尾,以暗色显示并标注 `hidden`。

未检测到的 agent 不在本列表中;要查看 magpie 支持的全部 agent(含未检测到的),用 [`agents`](cli:command:agents)。

每行还可能附加:

- `CLI not found`:agent 的配置目录还在,但其可执行文件已不在(例如卸载后残留);
- 走 magpie 做账号故障转移时的相关提示;
- 通过导入方式接入的 agent 显示 `magpie added` 或接入提示。

## 使用提醒

- 本机没有任何受支持的 agent 时报错 `no supported agents found on this machine`。
- 查看或修改单个 agent 的设置用 agent 形式,例如 [`magpie claude`](cli:command:claude);全部受支持 agent 见 [`agents`](cli:command:agents)。

## 源码补充

- 排序与列表渲染见 [main.go](https://github.com/yetone/magpie/blob/33dbdcc529622cf0dd053c99eb34f51c06fbba77/internal/cli/main.go) 的 `run()` 中 `ls` 分支与 `list()`,辅助函数见 [builtin_cli.go](https://github.com/yetone/magpie/blob/33dbdcc529622cf0dd053c99eb34f51c06fbba77/internal/cli/builtin_cli.go)。
