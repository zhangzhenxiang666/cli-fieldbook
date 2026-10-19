---
title: magpie library skill use-library
command:
  - library
  - skill
  - use-library
---

library skill use-library —— 同名技能冲突时,改用库的技能。

## 简介

当某个 agent 自己的技能与库里的技能同名、挡住了库技能时:把 agent 自己的技能放到一边,给 agent 链接库的技能。与之相对的选择是 [`library skill keep-own`](cli:command:library/skill/keep-own)。

同步结果里出现此类冲突(`Problem` 且为自有技能)时,输出会直接提示这两个命令。

## 参数

### `name`

`<name>`。技能名称。

### `agent`

`<agent>`。发生冲突的 agent。

## 使用提醒

- agent 自己的技能只是被放到一边,不删除;需要恢复时用 [`library skill keep-own`](cli:command:library/skill/keep-own)。
- 放到一边的内容保存在备份目录,路径随结果打印。

## 示例

```sh
magpie library skill use-library magpie-quota claude
```

以上示例为说明性内容,未实际运行。

## 源码补充

- 命令入口见 [library_cli.go](https://github.com/yetone/magpie/blob/33dbdcc529622cf0dd053c99eb34f51c06fbba77/internal/cli/library_cli.go)。
- 冲突检测与提示输出(`printLibraryResult`)见同一文件。
