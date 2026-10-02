---
title: 怎么读命令语法
---

`<ARG>` 表示必填值；`[ARG]` 表示可选项；`...` 表示多个值或可重复。
但有时源码在运行阶段才校验必填，例如 `bisect run` 的 COMMAND，须同时看该命令的注记。
互斥关系不能只凭 Usage 简写猜测。本手册会列出重点互斥关系；最终仍由该版本解析器判定。

`--flag <VALUE>` 的尖括号不是需要输入的字符。shell 命令中的 `CHANGE_A`、`BASE`、
`GOOD_REV` 等是示例占位符，要替换成实际修订。`--` 结束 jj 选项解析，
例如 `jj run -r @ -- cargo test` 把后面的命令参数交给 cargo。

同一个短选项在不同子命令中可能完全不同：
`rebase -b` 是 branch，`git push -b` 是 bookmark，`diff -b` 是 ignore-space-change。
不要从单个命令推导全局短选项。`-r` 也不是全局参数。
