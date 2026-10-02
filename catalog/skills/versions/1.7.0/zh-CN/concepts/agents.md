---
title: 支持的 Agent
---

`skills` 通过 `-a, --agent` 标识选择目标 Agent。v1.7.0 源码的 Agent 注册表共登记 79 个 AgentType（`src/types.ts`），README 只列出常用部分且为滚动文档；完整清单以固定提交源码为准。

## 常用 Agent 与目录

| Agent | `--agent` 取值 | 项目目录 | 全局目录 |
| --- | --- | --- | --- |
| Claude Code | `claude-code` | `.claude/skills/` | `~/.claude/skills/` |
| Codex | `codex` | `.agents/skills/` | `~/.codex/skills/` |
| Cursor | `cursor` | `.cursor/skills/` | `~/.cursor/skills/` |
| Gemini CLI | `gemini-cli` | `.gemini/skills/` | `~/.gemini/skills/` |
| GitHub Copilot | `github-copilot` | `.github/copilot/skills/` | `~/.copilot/skills/` |
| 通用（Amp、Replit 等） | `universal` 等 | `.agents/skills/` | 因 Agent 而异 |

多数 Agent 直接读取 `.agents/skills/` 这类通用目录，安装一份即对多个通用 Agent 生效；Claude Code 等 Agent 使用专属目录。

## 目录覆盖与环境

部分 Agent 的目录可被环境变量覆盖：Claude Code 受 `CLAUDE_CONFIG_DIR` 影响，Codex 受 `CODEX_HOME` 影响。目录解析实现在 `src/agents.ts`。

## Agent 检测

安装时未显式指定 Agent 会自动检测已安装的 Agent 并交互选择；在 Agent 环境中运行时自动选择检测到的 Agent 与通用 Agent。检测逻辑对 Cursor 要求强信号（`CURSOR_AGENT` 或 `CURSOR_EXTENSION_HOST_ROLE=agent-exec`），`CURSOR_TRACE_ID` 不算。

源码：[S01](https://github.com/vercel-labs/skills/blob/7407f3893ad4dceab546ac002c3ef806e4000c73/src/agents.ts#L80-L98) [S02](https://github.com/vercel-labs/skills/blob/7407f3893ad4dceab546ac002c3ef806e4000c73/src/agents.ts#L825-L910) [S03](https://github.com/vercel-labs/skills/blob/7407f3893ad4dceab546ac002c3ef806e4000c73/src/types.ts#L1-L80) [S04](https://github.com/vercel-labs/skills/blob/7407f3893ad4dceab546ac002c3ef806e4000c73/src/detect-agent.ts#L7-L35)
