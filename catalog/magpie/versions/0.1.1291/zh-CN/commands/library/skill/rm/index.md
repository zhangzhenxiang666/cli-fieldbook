---
title: magpie library skill rm
command:
  - library
  - skill
  - rm
---

library skill rm —— 从库移除技能。

## 简介

单个形式移除指定技能:从库里删除,并从各 agent 收回;magpie 保存的文件夹进入备份,用户自己的文件夹只解除链接。

`--all` 形式移除全部技能:在终端上先询问 `[y/N]`;非终端环境(无法询问)必须带 `--yes` 才执行。

## 参数

### `name`

`<name>`。要移除的技能名称(`--all` 形式下省略)。

## 选项

### `--all`

移除库里的全部技能,而不是一个。每个技能按单个移除的方式处理;库里没有技能时报告"the library has no skills"并正常结束。

### `--yes`

`--yes`(`-y`)。跳过 `--all` 的询问直接执行;非终端环境下只有带它才会执行。

## 使用提醒

- `--all` 的询问会列出全部技能名;回答不是 `y` 或 `yes` 时报"nothing removed",不做任何改动。
- 移除结果逐项统计;没能移除的名称与原因逐条列出。
- 改动前的 agent 文件与被替换的内容保存在备份目录。

## 示例

```sh
magpie library skill rm magpie-quota
magpie library skill rm --all --yes
```

以上示例为说明性内容,未实际运行。

## 源码补充

- 单个移除与 `removeEverySkill` 的询问逻辑见 [library_cli.go](https://github.com/yetone/magpie/blob/33dbdcc529622cf0dd053c99eb34f51c06fbba77/internal/cli/library_cli.go)。
