---
title: 来源、覆盖与校对记录
---

# magpie 0.1.1291 来源、覆盖与校对记录

本文记录本版中文文档的固定来源、收录口径与校对限制,供核对与后续版本迁移使用。

## 固定基准

| 项 | 值 |
|---|---|
| 上游仓库 | https://github.com/yetone/magpie |
| 上游版本 | 0.1.1291 |
| 固定 ref | v0.1.1291 |
| 固定 commit | `33dbdcc529622cf0dd053c99eb34f51c06fbba77` |
| 适配器 | magpie-source-v1 |
| 证据文件 | 50 个(源码 41、官方文档 8、许可 1),SHA-256 见 `upstream/source.lock.json` |

## 收录口径

- 命令树自固定提交的 `internal/cli/main.go` `run()` switch、各 `internal/cli/*_cli.go` 子命令处理器与 usage 常量静态枚举,合计 **204 个节点**:根命令 1、顶层 60(命令 47 + agent 节点 13)、子命令 143,最大深度 3,本版全部收录。
- `<agent>` 占位形式按 usage 尾部静态清单固化为 13 个具体节点:`claude`(别名 `cc`)、`codex`、`gemini`、`opencode`(别名 `oc`)、`mimocode`、`deveco`、`pi`、`goose`、`cursor`、`zed`、`copilot`、`crush`、`aside`。
- 隐藏节点 5 个(`app`、`claude-mcp-helper`、`help`、`version`、`plugin move-back`):存在于源码分发但未列入 usage 主体。
- `internal/agent/agents.go` 的 builtins 注册表(约 70 个 agent)超出静态清单的部分不单独建页,见 [`agents`](cli:command:agents) 页与概念文章。

## 方法与验证限制

- 上游帮助为手写散文式 usage 常量,未做机器采集;synopsis 照抄固定提交 usage 常量原文,并与本地安装 0.1.1291 的实际 `--help` 输出核对一致(已采集帮助)。
- 行为描述依据固定提交源码逐条核对(已核对源码);官方文档(README、docs/reference.md、docs/subsystems/*)作为交叉依据。
- 页内示例均为说明性内容,未实际运行(未实测示例);涉及密钥、订阅与网络请求的操作尤其不应照抄尝试。
- `gateway-key limit` 的 `list|off|reset|remove|add` 子形式与 `provider set` 的 k=v 键作为同一节点内的参数形式说明,未拆分为独立节点。
