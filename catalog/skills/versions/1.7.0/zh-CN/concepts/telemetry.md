---
title: 遥测与环境变量
---

## 遥测

CLI 向 `https://add-skill.vercel.sh/t` 发送遥测数据（install/remove/update/find/experimental_sync 事件），并携带 CLI 版本、检测到的 Agent 名与 CI 标志。这些数据并非完全匿名：GitHub 仓库与技能标识仅在 GitHub 确认仓库公开时发送，其他远程来源可能包含来源与技能标识，非交互 `skills find` 的查询词也会原样上报。安装时还会向 `https://add-skill.vercel.sh/audit` 查询技能安全审计评分（3 秒超时，失败不阻塞安装）。

设置 `DISABLE_TELEMETRY=1` 或 `DO_NOT_TRACK=1` 可完全关闭遥测与审计查询。注意：CI 环境变量（`CI`、`GITHUB_ACTIONS` 等）**不禁用**遥测，只在事件上附加 `ci=1` 标志。

## 环境变量

| 变量 | 作用 |
| --- | --- |
| `INSTALL_INTERNAL_SKILLS` | 设为 `1` 或 `true` 时显示并允许安装 `internal: true` 的内部技能 |
| `DISABLE_TELEMETRY` | 关闭遥测 |
| `DO_NOT_TRACK` | 关闭遥测的另一种写法 |
| `GITHUB_TOKEN` | GitHub API 访问令牌（私有仓库下载、更新检查） |
| `GH_TOKEN` | `GITHUB_TOKEN` 未设置时的回退令牌 |
| `SKILLS_API_URL` | 覆盖 `skills find` 的搜索 API 地址（默认 `https://skills.sh`） |

另有影响目录解析的变量：`CLAUDE_CONFIG_DIR`（Claude Code 配置根）、`CODEX_HOME`（Codex）、`XDG_STATE_HOME`（用户级锁文件位置）。README 环境变量表未列出 `SKILLS_API_URL` 与目录类变量，以上为源码核对结果。

源码：[S01](https://github.com/vercel-labs/skills/blob/7407f3893ad4dceab546ac002c3ef806e4000c73/src/telemetry.ts#L73-L88) [S02](https://github.com/vercel-labs/skills/blob/7407f3893ad4dceab546ac002c3ef806e4000c73/src/find.ts#L17) [S03](https://github.com/vercel-labs/skills/blob/7407f3893ad4dceab546ac002c3ef806e4000c73/src/agents.ts#L7-L17) [S04](https://github.com/vercel-labs/skills/blob/7407f3893ad4dceab546ac002c3ef806e4000c73/README.md#L535-L548)
