---
title: 搜索发现并预览技能
uses:
  - command:find
  - command:use
  - command:add
---

不确定要装什么技能时，先在 skills.sh 目录中检索，预览技能内容，再决定是否安装。

## 前提

- 网络可达 skills.sh（搜索请求发往其 `/api/search`，可用 `SKILLS_API_URL` 覆盖）。
- 交互式搜索需要 TTY；非 TTY 或 Agent 环境中 `find` 直接打印结果列表。

## 步骤

### 1. 按关键词搜索

```sh
npx skills find typescript
npx skills find react --owner vercel
```

`--owner` 把范围限制到指定 GitHub owner 的仓库。交互模式下选中条目后会显示技能在 skills.sh 的详情页链接。

### 2. 不安装先试用

```sh
npx skills use vercel-labs/agent-skills@vercel-optimize | claude
```

`use` 生成使用该技能的提示词：可经管道交给任意 Agent，或用 `--agent claude-code` 由本命令直接启动受支持的 Agent。不写入技能目录，也不产生锁文件记录。

### 3. 确认合适后安装

```sh
npx skills add vercel-labs/agent-skills --skill vercel-optimize
```

按名安装指定技能；确认技能与场景的匹配后可去掉 `--skill` 安装包内其他技能。

## 完成条件

`skills ls` 中出现该技能即完成安装；`use` 路径则无持久化结果，提示词即产物。

## 示例说明

以上流程未实测；`find` 的结果结构、`use` 的提示词形状均依据 v1.7.0 源码与 README 描述。
