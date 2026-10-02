---
title: 安装作用域与方式
---

技能安装有两个正交维度：作用域（项目级或全局）决定安装位置，方式（符号链接或复制）决定文件形态。

## 作用域

| 作用域 | 触发方式 | 位置 | 适用场景 |
| --- | --- | --- | --- |
| 项目级 | 默认 | `./<agent>/skills/` | 随项目提交，团队共享 |
| 全局 | `-g, --global` | `~/<agent>/skills/` | 跨项目可用 |

`<agent>` 是各 Agent 的技能目录名，Claude Code 为 `.claude/skills`，多数通用 Agent 为 `.agents/skills`，详见[支持的 Agent](agents.md)。

## 安装方式

| 方式 | 触发方式 | 说明 |
| --- | --- | --- |
| 符号链接（默认，推荐） | 默认 | 各 Agent 目录建立指向规范化副本的链接，单一事实来源，便于更新 |
| 复制 | `--copy` | 各 Agent 得到独立副本；符号链接不可用时也自动回退为复制 |

交互安装时可选择方式；非交互（`-y`、Agent 环境）按默认符号链接执行。

## 相关锁文件

项目级安装会写入项目根的 `skills-lock.json`；全部安装记录同时进入用户级 `.skill-lock.json`。两者结构与用途见[技能锁文件](skills-lock.md)。

源码：[S01](https://github.com/vercel-labs/skills/blob/7407f3893ad4dceab546ac002c3ef806e4000c73/src/installer.ts#L33-L49) [S02](https://github.com/vercel-labs/skills/blob/7407f3893ad4dceab546ac002c3ef806e4000c73/README.md#L128-L142)
