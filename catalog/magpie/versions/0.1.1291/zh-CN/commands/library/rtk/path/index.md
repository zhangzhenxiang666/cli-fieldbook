---
title: magpie library rtk path
command:
  - library
  - rtk
  - path
---

library rtk path —— 把 RTK 放进 agent 得到的 PATH。

## 简介

RTK 不在 PATH 上时,agent 的钩子按名称调用它,完全不生效。本命令按情况处理:能链接进某个目录时把 RTK 链接进去,否则把其所在目录加入用户 PATH。

## 使用提醒

- 两种方式都不可行时(无可用目录),输出会建议在 shell 配置里手工把 RTK 所在目录加入 PATH。
- 处理后按 [`magpie library rtk`](cli:command:library/rtk) 的状态视图确认 PATH 警告是否消失。

## 示例

```sh
magpie library rtk path
```

以上示例为说明性内容,未实际运行。

## 源码补充

- 入口见 [library_cli.go](https://github.com/yetone/magpie/blob/33dbdcc529622cf0dd053c99eb34f51c06fbba77/internal/cli/library_cli.go)。
- PATH 判定与两种修复方式的分支见同一文件的 `rtkCmd`。
