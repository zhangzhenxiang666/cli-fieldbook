---
title: skills experimental_sync
command:
  - experimental_sync
---

## 简介

把 `node_modules` 中已安装 npm 包自带的技能同步到 Agent 技能目录。实验性命令。

## 选项

### `--agent`

指定目标 Agent，占位符 `<agents>`，`'*'` 表示全部。短形式 `-a`。

### `--yes`

跳过确认提示。短形式 `-y`。

### `--force`

强制同步。帮助文本未列出该选项，来源为参数解析实现。

## 使用提醒

#### 适用场景

适用于通过 npm 依赖分发的技能包：包内声明的技能在 `npm install` 后由本命令链接或复制到 Agent 目录。远程来源（GitHub 等）的项目技能恢复请使用 `experimental_install`。

## 示例

```sh
skills experimental_sync
skills experimental_sync -y
```

源码：[S01](https://github.com/vercel-labs/skills/blob/7407f3893ad4dceab546ac002c3ef806e4000c73/src/sync.ts) [S02](https://github.com/vercel-labs/skills/blob/7407f3893ad4dceab546ac002c3ef806e4000c73/src/constants.ts#L1-L7)
