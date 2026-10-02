---
title: Log markers / 日志图形、引用后缀与状态标签
---

本节说明 **v0.45.1 默认模板**。用户可以覆盖 `templates.log_node`、日志模板或选择 ASCII 图形；显示效果不是永久不变的语法规则。

### 提交图节点

| 默认 Unicode | ASCII 模式 | 含义                    |
| ---------- | -------- | --------------------- |
| `@`        | `@`      | 当前工作副本提交              |
| `◆`        | `+`      | 不可变提交                 |
| `×`        | `x`      | 带文件冲突的提交（且未先匹配前两类）    |
| `○`        | `o`      | 其他普通提交；它也可能是 merge    |
| `~`        | `~`      | 图中省略了中间历史的占位节点，不是一个提交 |

默认判断顺序是 **当前工作副本 → 不可变 → 文件冲突 → 普通**。因此一个有冲突的当前工作副本仍可能显示 `@`，不可变的冲突提交仍可能显示 `◆`。判断冲突应结合 `(conflict)`、`jj status` 或 `conflicts()`。

`│`、`├`、`╮`、`╯` 等连接线表达父子关系，不是 revset 运算符。图中 `~` 表示省略；表达式里的 `~x` 才是补集。

`jj op log` 中的 `@` 指**当前 operation**，不是当前 commit。两种日志属于不同的 DAG。

### 引用名后缀

| 示例               | 含义                   | 不是                           |
| ---------------- | -------------------- | ---------------------------- |
| `feature*`       | 本地引用与至少一个被跟踪远端的目标不一致 | shell 通配符、文件脏状态、可直接粘贴的额外名字部分 |
| `feature??`      | 该引用的目标存在冲突           | 同一 change 的 divergent 标记     |
| `feature@origin` | origin 的远端跟踪引用       | 自动 fetch 后的实时服务器状态           |
| `review@`        | 名为 review 的工作区所处提交   | 远端名为空的 bookmark              |

`??` 优先于 `*` 显示；不要把二者再一起附加到书签名。显示在日志里的 `feature*` 通常应以 `feature` 查询，而不是把星号也抄进去。

### 提交状态文字

| 标记                     | 含义                | 常用对应查询              |
| ---------------------- | ----------------- | ------------------- |
| `(empty)`              | 没有文件变更            | `empty()`           |
| `(no description set)` | 没有提交说明            | `description("")`   |
| `(conflict)`           | 文件树中有冲突           | `conflicts()`       |
| `(divergent)`          | 同一 change 有多个可见版本 | `divergent()`       |
| `(hidden)`             | 此提交不属于当前可见历史      | 显式引入历史后用 `hidden()` |
| change ID 后的 `/0`、`/1` | 版本偏移，用于区分隐藏或分歧版本  | `CHANGE_ID/0`       |

`hidden` 与 `divergent` 的标签显示也有优先关系：隐藏版本不会仅因存在旧版本就造成可见 change 分歧。

### bookmark / tag list 与签名标记

引用列表中的 `(conflicted)` 和缩进的 `-` / `+` 行，表示冲突引用的移除侧/新增侧目标；不是 diff 中删除/新增的文件行，也不是 `x-` / `x+` revset 运算。

列表里的 `(deleted)` 表示本地目标已删除；`(not created yet)` 是相应跟踪远端目标尚不存在。若显示 `ahead by ...` / `behind by ...`，应按该条远端引用相对于本地跟踪目标的方向读，不能把所有列表都当成本地相对远端。

开启签名显示时，默认短签名为 `[✓︎]`（good）、`[?]`（unknown）、`[x]`（其他状态）。这是验证状态展示；`signed()` 只筛选签名存在，不能替代验证和信任策略。

**Source / 来源：** [`cli/src/config/templates.toml`](https://github.com/jj-vcs/jj/blob/7c41cdeb16b6b321c64e789a966b6adf723816a5/cli/src/config/templates.toml#L454-L595) · [`cli/src/commit_templater.rs`](https://github.com/jj-vcs/jj/blob/7c41cdeb16b6b321c64e789a966b6adf723816a5/cli/src/commit_templater.rs#L1515-L1678) · [`cli/src/config/templates.toml`](https://github.com/jj-vcs/jj/blob/7c41cdeb16b6b321c64e789a966b6adf723816a5/cli/src/config/templates.toml#L361-L412)
