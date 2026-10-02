---
title: skills remove
command:
  - remove
---

## 简介

从 Agent 的技能目录移除已安装的技能。别名 `rm`、`r`；`skills remove --help` 显示本命令的专属帮助，而不是主帮助。

不带技能名运行时进入交互选择菜单。

## 参数

### `skills`

要移除的技能名，可多个（空格分隔）；`-s, --skill` 选项也可指定，两者等价地并入同一列表。

## 选项

### `--global`

从用户全局目录（`~/`）移除，而不是项目目录。短形式 `-g`。

### `--agent`

从指定 Agent 移除，占位符 `<agents>`；省略时清理所有 Agent 的链接。短形式 `-a`。

### `--skill`

指定要移除的技能，占位符 `<skills>`，`'*'` 表示全部技能。短形式 `-s`。

### `--yes`

跳过确认提示。短形式 `-y`。

### `--all`

移除全部已安装技能，隐含 `-y`。不能与按名移除同时使用。

## 使用提醒

#### 作用范围

移除同时作用于安装目录中的链接或副本与锁文件记录；先用 `skills list` 确认目标，避免在全局作用域误删其他项目共用的技能。

## 示例

```sh
skills remove web-design
skills rm --global frontend-design
skills remove --skill '*' -a cursor
skills remove --all
```

源码：[S01](https://github.com/vercel-labs/skills/blob/7407f3893ad4dceab546ac002c3ef806e4000c73/src/remove.ts) [S02](https://github.com/vercel-labs/skills/blob/7407f3893ad4dceab546ac002c3ef806e4000c73/src/skill-lock.ts#L195-L208)
