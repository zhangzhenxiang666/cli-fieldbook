---
title: skills experimental_install
command:
  - experimental_install
---

## 简介

从项目根的 `skills-lock.json` 恢复安装全部项目技能。实验性命令。

按来源分组，逐组调用 `add` 的内部流程，并始终跳过确认；node_modules 来源的技能改走 `experimental_sync` 的同步流程。锁文件为空或不存在时提示并无操作。

## 使用提醒

#### 安装目标

只安装到 `.agents/skills/`（通用 Agent 目录），不安装到各 Agent 专属目录。锁文件中缺少 `sourceUrl` 的通用 Git 来源无法恢复，会逐项报错跳过而不中断其余技能。

#### 与 experimental_sync 的分工

`experimental_install` 恢复远程来源（GitHub 等）的项目技能；`node_modules` 内自带的技能由 `experimental_sync` 同步。详见[技能锁文件](../../concepts/skills-lock.md)。

源码：[S01](https://github.com/vercel-labs/skills/blob/7407f3893ad4dceab546ac002c3ef806e4000c73/src/install.ts#L18-L98) [S02](https://github.com/vercel-labs/skills/blob/7407f3893ad4dceab546ac002c3ef806e4000c73/src/local-lock.ts#L34-L69)
