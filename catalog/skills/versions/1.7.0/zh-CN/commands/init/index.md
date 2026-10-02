---
title: skills init
command:
  - init
---

## 简介

创建新的技能骨架。带名称时在当前目录下创建 `<name>/SKILL.md`；不带名称时在当前目录创建 `SKILL.md`，技能名取当前目录名。

目标 SKILL.md 已存在时不覆盖，仅提示后退出。

## 参数

### `name`

技能名，可省略。

## 使用提醒

#### 模板内容

生成的模板包含 YAML frontmatter（`name` 与 `description` 两个必填字段）与 `When to use`、`Instructions` 章节骨架。完成后推送到 GitHub 仓库即可用 `npx skills add <owner>/<repo>` 安装，或托管文件后用 URL 安装。

## 示例

```sh
skills init my-skill
```

源码：[S01](https://github.com/vercel-labs/skills/blob/7407f3893ad4dceab546ac002c3ef806e4000c73/src/cli.ts#L236-L297)
