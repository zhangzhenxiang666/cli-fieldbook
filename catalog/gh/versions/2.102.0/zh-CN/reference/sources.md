---
title: 来源、覆盖与校对记录
---

本页声明 gh 2.102.0 中文文档的固定来源、覆盖口径与验证边界。

## 固定基准

| 项 | 值 |
| --- | --- |
| 上游项目 | [cli/cli](https://github.com/cli/cli)（GitHub CLI） |
| 稳定版本 | 2.102.0（2026-09-30 发布） |
| 固定 tag | `v2.102.0` |
| 固定 commit | [`fc4b137cdef0a6bd28fd461b7cf9c84a5812a8cd`](https://github.com/cli/cli/tree/fc4b137cdef0a6bd28fd461b7cf9c84a5812a8cd) |
| 查证日期 | 2026-10-05 |
| 官方文档 | [docs.github.com GitHub CLI 章节](https://docs.github.com/zh-cn/github-cli)、[cli.github.com/manual](https://cli.github.com/manual)（两者均为滚动最新版，仅作交叉旁证，不作为固定证据） |

全部源码快照按原路径保存在本版本 `upstream/source-extracts/` 下（统一 `.txt` 后缀），每份带 SHA-256 校验，清单见 `upstream/source.lock.json`。

## 数量怎么计算

命令树按固定 commit 的 [pkg/cmd/root/root.go](https://github.com/cli/cli/blob/fc4b137cdef0a6bd28fd461b7cf9c84a5812a8cd/pkg/cmd/root/root.go) 与各命令族构造器静态枚举，全部静态节点共 **242** 个；本版收录 **176** 个：

| 口径 | 数量 |
| --- | --- |
| 收录节点（根命令 + 命令族 + 子命令） | 176 |
| 其中公开命令 | 172 |
| 其中隐藏命令 | 4（`version`、`auth git-credential`、`attestation inspect`、`repo credits`） |
| 位置参数条目 | 129 |
| 选项条目（含继承的 `-R/--repo`、`--help` 与 `--json/--jq/--template`） | 1023 |
| 固定源码快照文件 | 174 |

各族收录数：根命令 1、alias 5、api 1、attestation 5、auth 9、browse 1、cache 3、completion 1、config 5、extension 9、gist 8、gpg-key 4、issue 16、label 6、org 2、pr 19、release 11、repo 31、ruleset 4、run 8、search 6、secret 4、ssh-key 4、status 1、variable 5、version 1、workflow 6。

**未收录的 66 个节点**：codespace（15）、project（20）、discussion（6）、skills（7）、agent-task（4）、copilot（1）、preview（2）、licenses（1）等 preview 或平台强耦合族；`send-telemetry`（隐藏）、`credits`（根级独立隐藏命令）、accessibility 与 actions（帮助主题性质的隐藏命令）；以及 6 个隐藏帮助主题（`mintty`、`environment`、`telemetry`、`reference`、`formatting`、`exit-codes`）。其中 `environment`、`exit-codes`、`formatting` 的内容整理进[专题参考](exit-codes.md)；运行时配置别名（如默认别名 `gh co` = `gh pr checkout`）与已安装扩展不属于静态命令树，不计入分母。

## 方法与验证限制

- 命令事实（路径、别名、用法行、参数、选项、枚举、默认值）自固定 commit 的 Go 源码重建：cobra 命令定义给出 `Use`/`Short`/`Aliases`/`Args`/隐藏标记，pflag 注册语句（`cmd.Flags().XxxVarP` 等）与 `cmdutil` 辅助函数（[json_flags.go](https://github.com/cli/cli/blob/fc4b137cdef0a6bd28fd461b7cf9c84a5812a8cd/pkg/cmdutil/json_flags.go)、[repo_override.go](https://github.com/cli/cli/blob/fc4b137cdef0a6bd28fd461b7cf9c84a5812a8cd/pkg/cmdutil/repo_override.go)）给出旗标；**未采集目标二进制的原始帮助输出**。
- 选项显示形式为归一化约定：短旗标前置（`-R, --repo`），占位符优先取用法文本中的反引号命名（如 `--body-file <file>`），否则按值类型（`<int>`、`<strings>` 等）；仅在源码字面量给出非零默认值时记录默认值。
- `--json` 的字段清单按源码字段表静态求值（含 `append(...)` 组合链，如 `api.IssueFields = append(sharedIssuePRFields, issueOnlyFields...)`）；个别字段是否可用取决于 GitHub API 能力。
- 个别旗标用法文本在源码中为运行时拼接（如 `issue lock` 与 `pr lock` 的 `--reason`，其有效值来自仓库的锁定原因列表），页面如实标注，不枚举具体值。
- 同一构造器可被多个父命令复用（如 `issue` 与 `pr` 共用 [lock.go](https://github.com/cli/cli/blob/fc4b137cdef0a6bd28fd461b7cf9c84a5812a8cd/pkg/cmd/issue/lock/lock.go) 的 lock/unlock），两侧分别建页，行为差异（如错误提示中的父命令名）在页面注明。
- 别名按 cobra 语义记录为完整别名调用路径（如 `gh issue ls` 记在 `issue list` 名下）；`gh co` 这类默认配置别名在 `pr checkout` 页面说明，不作为独立节点。
- **全部示例为说明性内容，未实际运行**；示例中的输出形态依源码逻辑推断，可能因仓库状态、终端能力或 API 版本而不同。
- 官方在线文档为滚动版本（D04：不用滚动页面证明历史版本行为），仅用于交叉核对措辞与概念，不进入证据链。

## 分类证据边界

- **已采集帮助**：无。本版未采集二进制 `--help` 原始输出。
- **已核对源码**：全部 176 个节点的命令定义与旗标注册语句，逐条绑定 `source-extracts/` 快照（`source.lock.json` 的 evidence 清单含 SHA-256）。
- **已实测示例**：无。全部示例未运行。
