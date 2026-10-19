---
title: magpie library sync
command:
  - library
  - sync
---

library sync —— 把库的内容重新写进各个 agent。

## 简介

重新执行一次写入:共享指示、MCP 服务器、技能(链接或副本)按各 agent 的格式重新写入。装了一个新 agent、或手工改过 agent 的配置文件之后运行它,让库的内容重新生效。

输出说明:

- 全部 agent 已有这些内容时,报告"每个 agent 都已有它";否则列出写入成功的 agent。
- 技能副本若在写入后被编辑过,同步会先把改动收进库,再重新链接或复制。
- 逐项列出写入失败的问题;被替换前的内容保存在备份目录,路径随结果打印。

## 使用提醒

- 同步只收回 `Applied` 记录中 magpie 自己写入的部分;agent 文件里用户自己的内容不会被改动。
- 一个 WSL 发行版里的 agent 总是收到技能副本而非链接。

## 示例

```sh
magpie library sync
```

以上示例为说明性内容,未实际运行。

## 源码补充

- 命令入口与结果输出见 [library_cli.go](https://github.com/yetone/magpie/blob/33dbdcc529622cf0dd053c99eb34f51c06fbba77/internal/cli/library_cli.go)。
- 同步的写入顺序与技能副本收改逻辑见官方文档 [library.md](https://github.com/yetone/magpie/blob/33dbdcc529622cf0dd053c99eb34f51c06fbba77/docs/subsystems/library.md)。
