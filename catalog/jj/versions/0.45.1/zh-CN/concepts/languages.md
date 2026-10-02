---
title: Revset、Fileset 和 Template 速查
---

### Revset：选择提交

完整参考已并入本文末尾：[Revset 阅读说明](../reference/revset/intro.md) · [函数签名](../reference/revset/function-syntax.md) · [日志标记](../reference/revset/log-markers.md) · [版本勘误](../reference/revset/migration.md)。

| 表达式              | 含义                           |
| ---------------- | ---------------------------- |
| `@`              | 当前工作副本提交                     |
| `@-` / `@--`     | 父 / 父的父；merge 时可能得到多个提交      |
| `@+`             | 当前提交的孩子                      |
| `::A`            | A 及其全部祖先                     |
| `A::`            | A 及其全部后代，在表达式可见范围内           |
| `A::B`           | 同时是 A 的后代和 B 的祖先；包含可满足条件的端点  |
| `A..B`           | B 的祖先中排除 A 的祖先，不等价于任意意义的“路径” |
| `A \| B`         | 并集                           |
| `A & B`          | 交集                           |
| `A ~ B`          | 差集                           |
| `mutable()`      | 可变集合，具体由配置定义                 |
| `trunk()`        | 主线 revset alias；先确认本仓库如何解析   |
| `feature@origin` | 远端跟踪引用                       |
| `review@`        | 名为 review 的工作区的工作副本          |

不是每个接受 revset 的参数都允许多个结果：例如 edit 要求单个目标，rebase 的集合选项可选择多个。
v0.45.1 已移除 `all:` 修饰符。是否允许多个结果由命令参数决定；需要单目标断言时可使用 `exactly(x, 1)`。
表达式请使用 shell 引号，例如 `jj log -r 'trunk()..@'`。

### Fileset：选择路径

`src/` 用于路径/目录范围，`glob:**/*.rs` 是显式 glob，`all()` 表示所有路径。
例如 `jj diff 'glob:**/*.rs'` 将 glob 交给 jj，而不是让 shell 预先展开。
模式的根目录语义、字符串模式和文件集合表达式并不完全相同：
bookmark 名称过滤的 glob 不是路径 fileset，clone/fetch 的 Git 分支模式也不是完整 fileset。

### Template：输出你需要的字段

```sh
jj log --no-graph -r @ -T 'change_id ++ "\n"'
jj log --no-graph -r @ -T 'commit_id ++ "\n"'
jj log -r 'trunk()..@' -T 'change_id.short() ++ " " ++ description.first_line() ++ "\n"'
```

模板的输入对象类型取决于命令：log/show 常见为 Commit，bookmark list 为引用对象，
file annotate 为注释行，operation log 为 Operation；同名 `-T` 不保证接受同一组字段。
用于脚本时应指定模板，不要解析彩色图形日志。文件名可能含空白，也不要盲目把 name-only 接到裸 xargs。

官方语言文档：[revsets](https://github.com/jj-vcs/jj/blob/7c41cdeb16b6b321c64e789a966b6adf723816a5/docs/revsets.md) ·
[filesets](https://github.com/jj-vcs/jj/blob/7c41cdeb16b6b321c64e789a966b6adf723816a5/docs/filesets.md) · [templates](https://github.com/jj-vcs/jj/blob/7c41cdeb16b6b321c64e789a966b6adf723816a5/docs/templates.md) ·
[working copy](https://github.com/jj-vcs/jj/blob/7c41cdeb16b6b321c64e789a966b6adf723816a5/docs/working-copy.md)。
