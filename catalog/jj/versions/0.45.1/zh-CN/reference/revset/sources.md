---
title: Sources / 固定版本源码、覆盖口径与验证限制
---

**函数清单口径：** `docs/revsets.md` 的 Functions 部分列出 54 个正式文档名称；`lib/src/revset.rs` 的 `BUILTIN_FUNCTION_MAP` 另外保留 `diff_contains`，因此记录 55 个注册名称。弃用别名不是一种新的功能。默认配置中的 8 个 revset 别名单独列出，没有混进 55 的计数。

**交叉校对：** 函数签名与可选参数对照 Rust 注册代码；运算符对照解析器/grammar；日期边界对照 time_util；别名对照固定版本 TOML；显示符号对照模板与 CommitRef formatter；已移除语法对照 CHANGELOG。覆盖清单保存在 `revsets-functions.json`、`revsets-aliases.json` 和 `revsets-validation.json`。

| 源码文件                                               | 主要用途                               |
| -------------------------------------------------- | ---------------------------------- |
| `docs/revsets.md`                                  | 官方语言参考、函数签名、符号、示例                  |
| `lib/src/revset.rs`                                | 55 个注册名称、默认值、参数解析和求值               |
| `lib/src/revset_parser.rs` / `lib/src/revset.pest` | 优先级、语法、兼容错误诊断                      |
| `lib/src/dsl_util.rs`                              | 位置实参与命名实参检查                        |
| `cli/src/config/revsets.toml`                      | 8 个默认别名、11 个 revsets 配置键           |
| `cli/src/revset_util.rs`                           | CLI revset 求值、真正的不可变策略             |
| `lib/src/time_util.rs`                             | 日期边界、时区解析及测试                       |
| `docs/filesets.md`                                 | files()/diff_lines() 的 fileset 实参  |
| `docs/glossary.md`                                 | change offset、可见性、author/committer |
| `cli/src/config/templates.toml`                    | 日志节点、状态、签名与引用列表显示                  |
| `cli/src/commit_templater.rs`                      | 引用后缀 \* / ?? 的具体格式化                |
| `CHANGELOG.md`                                     | all:、git_head()/git_refs() 等移除记录   |

**未做的验证：** 没有在本环境安装或编译 jj，没有在实际仓库执行这些命令，没有保存一个经校验的上游完整源码快照。源码通过在线固定 tag 查阅；不把网页阅读说成本地 AST 全量审计。JSON 覆盖检查比较的是由源码逐项抄录的名称清单，DAG 示例测试使用独立集合模型。

HTML 的搜索、分类、锚点、移动端布局及无外部资源加载检查，属于文档本身的验证，不是 jj 命令行为测试。具体结果查看附带验证记录。

本补篇为非官方中文整理。上游项目归 The Jujutsu Authors 所有，采用 Apache-2.0；此处保留源码链接和来源说明。中文解释与工作示例为本次重述整理，不把可配置默认值宣传成永久不变的规范。

**Source / 来源：** [`docs/revsets.md`](https://github.com/jj-vcs/jj/blob/7c41cdeb16b6b321c64e789a966b6adf723816a5/docs/revsets.md) · [`lib/src/revset.rs`](https://github.com/jj-vcs/jj/blob/7c41cdeb16b6b321c64e789a966b6adf723816a5/lib/src/revset.rs) · [`lib/src/revset_parser.rs`](https://github.com/jj-vcs/jj/blob/7c41cdeb16b6b321c64e789a966b6adf723816a5/lib/src/revset_parser.rs) · [`lib/src/revset.pest`](https://github.com/jj-vcs/jj/blob/7c41cdeb16b6b321c64e789a966b6adf723816a5/lib/src/revset.pest) · [`lib/src/dsl_util.rs`](https://github.com/jj-vcs/jj/blob/7c41cdeb16b6b321c64e789a966b6adf723816a5/lib/src/dsl_util.rs) · [`cli/src/config/revsets.toml`](https://github.com/jj-vcs/jj/blob/7c41cdeb16b6b321c64e789a966b6adf723816a5/cli/src/config/revsets.toml) · [`cli/src/revset_util.rs`](https://github.com/jj-vcs/jj/blob/7c41cdeb16b6b321c64e789a966b6adf723816a5/cli/src/revset_util.rs) · [`lib/src/time_util.rs`](https://github.com/jj-vcs/jj/blob/7c41cdeb16b6b321c64e789a966b6adf723816a5/lib/src/time_util.rs) · [`docs/filesets.md`](https://github.com/jj-vcs/jj/blob/7c41cdeb16b6b321c64e789a966b6adf723816a5/docs/filesets.md) · [`docs/glossary.md`](https://github.com/jj-vcs/jj/blob/7c41cdeb16b6b321c64e789a966b6adf723816a5/docs/glossary.md) · [`cli/src/config/templates.toml`](https://github.com/jj-vcs/jj/blob/7c41cdeb16b6b321c64e789a966b6adf723816a5/cli/src/config/templates.toml) · [`cli/src/commit_templater.rs`](https://github.com/jj-vcs/jj/blob/7c41cdeb16b6b321c64e789a966b6adf723816a5/cli/src/commit_templater.rs) · [`CHANGELOG.md`](https://github.com/jj-vcs/jj/blob/7c41cdeb16b6b321c64e789a966b6adf723816a5/CHANGELOG.md)
