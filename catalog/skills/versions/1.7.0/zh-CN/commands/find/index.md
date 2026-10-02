---
title: skills find
command:
  - find
---

## 简介

在技能目录中搜索技能。别名 `search`、`f`、`s`。

带关键词时按关键词检索；不带参数时进入交互式搜索。检索请求发送到 skills.sh 的搜索 API（`/api/search`）；环境变量 `SKILLS_API_URL` 可覆盖默认地址 `https://skills.sh`。

## 参数

### `query`

搜索关键词，可省略；省略时进入交互搜索。

## 选项

### `--owner`

只在指定 GitHub owner 的仓库范围内搜索，占位符 `<owner>`。

## 使用提醒

#### 交互与非交互

在 TTY 上运行时进入交互选择界面，选中后显示技能详情与 skills.sh 页面链接；在非 TTY 或 Agent 环境中直接打印结果列表并退出，不进入交互。

## 示例

```sh
skills find
skills find typescript
skills find react --owner vercel
```

源码：[S01](https://github.com/vercel-labs/skills/blob/7407f3893ad4dceab546ac002c3ef806e4000c73/src/find.ts#L17-L95) [S02](https://github.com/vercel-labs/skills/blob/7407f3893ad4dceab546ac002c3ef806e4000c73/src/find.ts#L340-L416)
