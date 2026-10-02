---
title: Version notes / 旧教程迁移与上一版勘误
---

| 旧写法或常见误解                       | v0.45.1 的状态 / 应如何写                                            |
| ------------------------------ | ------------------------------------------------------------- |
| `all:表达式`                      | 已移除；0.38.0 起不再支持。直接传合法集合表达式，是否允许多目标由该命令参数决定                   |
| `all()`                        | 仍是合法的全部集合函数，与上一行无关                                            |
| `diff_contains(text, files)`   | 仍注册，但会发弃用警告；改用 `diff_lines(text, files)`                      |
| `git_head()`                   | 0.43.0 已移除，不应写进本版函数清单                                         |
| `git_refs()`                   | 0.43.0 已移除；按意图使用 bookmarks/tags/remote\_\* 等，不存在对所有场景都等价的机械替换 |
| `refs/heads/main` 的 Git 风格符号解析 | 0.43.0 已移除这一特殊解析；用本地 `main` 或显式 `bookmarks(exact:"main")` 等   |
| `x^`                           | 不是当前父提交语法；改用 `x-`                                             |
| `x:y`、`:x`、`x:`                | 不是有效 DAG 范围；按含义改成 `x::y`、`::x`、`x::`                          |
| `x + y` / `x - y`              | 不是并集/差集；用 `x \| y` / `x ~ y`                                  |
| `HEAD~3`                       | 不要套 Git 祖先语法；如想当前工作提交往前三代，用 `@---` 或 `parents(@, 3)`          |
| `A...B`                        | 不要当成 jj 的内置对称差；用 `(A..B) \| (B..A)`                           |
| `description("fix")`           | 默认 glob，并非“包含 fix”；明确用 `description(substring:"fix")`         |
| 以 `mutable()` 判断“未推送”          | 不可靠；它是不可变策略的补集，不是远端状态                                         |
| 以 `signed()` 判断“可信签名”          | 不可靠；它仅判断签名存在                                                  |

共置 Git 工作区里，某些旧 `git_head()` 用途可以通过 `first_parent(@)` 表达，但不要把它当成适用于所有仓库状态的一对一替换。`HEAD` 也不是本参考承诺始终存在的内置别名；官方别名示例中的 HEAD 是用户自己配置的。

### 此次纠正上一份手册的内容

原 Revset 速查曾建议部分多修订操作可使用 `all:`。该建议不适用于固定的 v0.45.1，已从更新版 Markdown 和 HTML 中删除；TXT 也已追加相应版本警告。

函数注册表里的 `diff_contains` 仍映射到 `diff_lines`，尽管注释有 “Remove in jj 0.44+” 的 TODO。清单按**实际注册代码**而不是 TODO 的计划日期判断。

不是看到解析器里有一个 token 就说明语法可用：`^`、单冒号旧范围、二元 `+`/`-` 等在源码中可能只是为了给出更友好的迁移错误。

**Source / 来源：** [`CHANGELOG.md`](https://github.com/jj-vcs/jj/blob/7c41cdeb16b6b321c64e789a966b6adf723816a5/CHANGELOG.md) · [`lib/src/revset.rs`](https://github.com/jj-vcs/jj/blob/7c41cdeb16b6b321c64e789a966b6adf723816a5/lib/src/revset.rs#L1088-L1129) · [`lib/src/revset.pest`](https://github.com/jj-vcs/jj/blob/7c41cdeb16b6b321c64e789a966b6adf723816a5/lib/src/revset.pest) · [`lib/src/revset_parser.rs`](https://github.com/jj-vcs/jj/blob/7c41cdeb16b6b321c64e789a966b6adf723816a5/lib/src/revset_parser.rs)
