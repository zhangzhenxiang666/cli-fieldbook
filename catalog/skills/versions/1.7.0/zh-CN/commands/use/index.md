---
title: skills use
command:
  - use
---

## 简介

不安装技能，直接生成使用该技能的提示词（prompt）。可将输出通过管道交给 Agent，或用 `-a` 直接启动所选 Agent。

## 参数

### `package@skill`

技能来源与技能名，用 `@` 分隔，例如 `vercel-labs/agent-skills@vercel-optimize`。

## 选项

### `--skill`

指定要使用的技能，占位符 `<skill>`，替代 `@skill` 语法。只能提供一个值，重复提供报错。短形式 `-s`。

### `--agent`

启动一个受支持的 Agent 并以交互方式使用该技能，占位符 `<agent>`。短形式 `-a`。

### `--full-depth`

即使仓库根存在 SKILL.md，也搜索全部子目录。

## 使用提醒

#### 校验

本命令对选项做严格校验：未知选项、缺值的 `--skill`/`--agent`、重复的 `--skill` 以及不受支持的 Agent 名都会作为错误报告。

## 示例

```sh
npx skills use vercel-labs/agent-skills@vercel-optimize | claude
npx skills use vercel-labs/agent-skills --skill vercel-optimize --agent claude-code
```

源码：[S01](https://github.com/vercel-labs/skills/blob/7407f3893ad4dceab546ac002c3ef806e4000c73/src/use.ts) [S02](https://github.com/vercel-labs/skills/blob/7407f3893ad4dceab546ac002c3ef806e4000c73/src/source-parser.ts#L286-L330)
