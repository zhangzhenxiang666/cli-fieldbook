---
title: 来源、覆盖与校对记录
---

## 固定基准

- 项目：[vercel-labs/skills](https://github.com/vercel-labs/skills)（npm 包 `skills`，`npx skills`）。
- 稳定版：[v1.7.0](https://github.com/vercel-labs/skills/releases/tag/v1.7.0)，固定到完整提交 `7407f3893ad4dceab546ac002c3ef806e4000c73`。
- 查证日期：2026-10-02。源码快照均取自该提交，23 个证据文件的字节级校验和见 `upstream/source.lock.json`。
- 官方文档：仓库 [README.md](https://github.com/vercel-labs/skills/blob/7407f3893ad4dceab546ac002c3ef806e4000c73/README.md)（随固定提交保存），目录站 [skills.sh](https://skills.sh)，规范 [agentskills.io](https://agentskills.io)。skills.sh 为滚动站点，仅作交叉核对。
- 原项目版权归 Vercel, Inc.，源码使用 MIT；中文说明与结构化组织为本次整理，非官方中文发布物。

## 覆盖范围

| 分类 | 节点数 | 说明 |
| --- | ---: | --- |
| 公开 | 10 | 根命令 + add/use/remove/list/find/update/experimental_install/init/experimental_sync |
| 别名 | 11 | add(a, i, install)、remove(rm, r)、list(ls)、find(search, f, s)、update(upgrade, check)，不单独计数 |

命令树来自 `src/cli.ts` 的分发 switch，每个命令的选项来自各自的解析函数；两者均与真实帮助输出交叉核对。

## 帮助采集说明

2026-10-02 在一次性环境（临时 HOME 与工作目录、`CI=1`、`DISABLE_TELEMETRY=1`）通过 `npx skills@1.7.0` 实际采集了根命令与 9 个子命令的 `--help`/`--version`/无参输出（argv、退出码、stdout/stderr 全程记录）。核对结论：

- 帮助文本与源码 `showHelp`/`showRemoveHelp` 一致；`--version` 输出 `1.7.0`。
- 无参数运行在 Agent 检测环境下无输出（banner 仅在非 Agent 环境显示），与 `src/cli.ts` 的 `isRunningInAgent()` 分支一致。
- `skills remove --help` 打印专属帮助，其余子命令打印主帮助。

该采集仅作编写核对；当前仓库协议的来源类别不含运行采集记录，故未保存为证据条目，页面帮助视图仍以源码重建为准。

## 方法与验证限制

命令、选项与别名逐项核对分发与解析实现（`parseAddOptions`/`parseUseOptions`/`parseRemoveOptions`/`parseUpdateOptions`/`parseSyncOptions` 及 list/find 的内联解析）；`--all` 展开、`--json` 前置条件、Agent 环境自动行为、internal 技能过滤、遥测开关、锁文件结构等行为结论均定位到具体源码行。README 仅用于交叉核对术语与推荐用法。

未实测事项：未运行任何安装、移除、更新、初始化类命令；工作流与命令页示例均未执行。Agent 注册表共 79 个 AgentType，常用目录以源码注册表为准核对，未逐一验证各 Agent 的实际加载行为。

差异记录：GitHub 上另有高关注度 fork `antfu/skills-cli`，其 README 描述的命令集（含独立 `check`、`generate-lock` 命令）与本版本不同，本手册一律未采用；本版本的 `check` 是 `update` 的分发别名。README 提及 CI 环境自动禁用遥测的说法与 v1.7.0 源码不符（CI 变量只附加 `ci=1` 标志），正文按源码表述。
