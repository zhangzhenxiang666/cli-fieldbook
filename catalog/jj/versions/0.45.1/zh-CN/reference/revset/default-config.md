---
title: Built-in Aliases / 默认定义与命令选择范围
---

八个默认别名逐条列在本章后面的“别名”条目。它们来自固定版本的 `cli/src/config/revsets.toml`，可以被用户级、仓库级配置覆盖；下面不是在假定你的实际配置一定仍为默认值。

默认配置还包含 **11 个 `[revsets]` 键**。这些键是“命令未显式给出选择时从哪取值”，不是新增 revset 函数：

| 配置键                             | v0.45.1 默认表达式                    |
| ------------------------------- | -------------------------------- |
| `revsets.arrange`               | `reachable(@, mutable())`        |
| `revsets.converge`              | `mutable() & divergent()`        |
| `revsets.fix`                   | `reachable(@, mutable())`        |
| `revsets.run`                   | `reachable(@, mutable())`        |
| `revsets.simplify-parents`      | `reachable(@, mutable())`        |
| `revsets.log`                   | `builtin_log()`                  |
| `revsets.log-graph-prioritize`  | `present(@)`                     |
| `revsets.op-diff-changes-in`    | `mutable() \| immutable_heads()` |
| `revsets.sign`                  | `reachable(@, mutable())`        |
| `revsets.bookmark-advance-to`   | `@`                              |
| `revsets.bookmark-advance-from` | `heads(::to & bookmarks())`      |

最后一项的 `to` 是 bookmark advance 求值时提供的上下文符号，**不是任何命令里都存在的全局 revset 符号**。`log-graph-prioritize` 用来影响图的优先展示分支，不是另一份全部筛选条件。

检查自己的有效配置：

```sh
jj config list revsets
jj config list revset-aliases
jj log -r 'trunk()'
jj log -r 'immutable_heads()'
```

没有加 `-r` 的命令受自身默认表达式和配置影响；复制教程前要区分“这个函数的含义”和“这个命令默认把什么传给函数”。

**Source / 来源：** [`cli/src/config/revsets.toml`](https://github.com/jj-vcs/jj/blob/7c41cdeb16b6b321c64e789a966b6adf723816a5/cli/src/config/revsets.toml) · [`docs/revsets.md`](https://github.com/jj-vcs/jj/blob/7c41cdeb16b6b321c64e789a966b6adf723816a5/docs/revsets.md#built-in-aliases)
