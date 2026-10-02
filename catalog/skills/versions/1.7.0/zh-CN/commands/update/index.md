---
title: skills update
command:
  - update
---

## 简介

把已安装的技能更新到最新版本。别名 `upgrade`、`check`——`check` 并非独立的"仅检查"命令，而是本命令的别名。

可按名称更新指定技能；不带技能名时按作用域更新。

## 参数

### `skills`

要更新的技能名，可多个；省略时更新所选作用域内的全部技能。

## 选项

### `--global`

只更新全局技能。短形式 `-g`。

### `--project`

只更新项目技能。短形式 `-p`。

### `--yes`

跳过作用域选择提示。短形式 `-y`。

## 使用提醒

#### 作用域判定

指定了技能名时：`-g` 取全局、`-p` 取项目、都未指定取两者。未指定技能名时：`-g` 与 `-p` 同给取两者，单独给出取对应作用域；都未给且带 `-y`（或非 TTY）时自动检测——当前目录存在项目技能（`skills-lock.json` 存在，或 `.agents/skills/` 下有含 SKILL.md 的子目录）则取项目，否则取全局；交互终端上则弹出三选一（项目/全局/两者）。

#### 锁文件与哈希

全局锁记录的文件夹哈希来自 GitHub Trees API；更新前后哈希一致时技能内容未变。来源被删除的技能会进入删除确认流程。

## 示例

```sh
skills update
skills update my-skill
skills update -g
```

源码：[S01](https://github.com/vercel-labs/skills/blob/7407f3893ad4dceab546ac002c3ef806e4000c73/src/update.ts#L65-L173) [S02](https://github.com/vercel-labs/skills/blob/7407f3893ad4dceab546ac002c3ef806e4000c73/src/update.ts#L987-L1015) [S03](https://github.com/vercel-labs/skills/blob/7407f3893ad4dceab546ac002c3ef806e4000c73/src/skill-lock.ts#L150-L172)
