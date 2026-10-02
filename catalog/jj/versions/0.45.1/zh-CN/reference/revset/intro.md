---
title: Revsets / 阅读说明与类型边界
---

本补篇固定到 **jj v0.45.1**，查证日期 **2026-09-17**。保留官方参考的章节顺序、函数名、签名及语法拼写；解释改为中文，并加上源码校对、边界条件和实际场景。它是结构化中文参考，不是对 `jj help` 的逐字终端转录。

覆盖 **54 个官方文档函数 + 1 个仍注册的弃用兼容名 `diff_contains()` + 8 个默认 revset 别名**。函数与别名分开计数：`trunk()`、`mutable()` 不是 Rust 内置函数；`root()`、`ancestors()` 才是。本参考只覆盖上游默认实现，不包含自定义编译扩展或用户自定义别名。

| 所在位置                         | 输入的是什么           | 例子                                  |
| ---------------------------- | ---------------- | ----------------------------------- |
| `jj log -r '…'`              | revset：提交集合表达式   | `mine() & mutable()`                |
| `files(…)` 的实参               | fileset：路径集合表达式  | `root:"src" ~ root:"src/generated"` |
| `description(…)` 的实参         | 字符串模式            | `substring:"TODO"`                  |
| `author_date(…)` 的实参         | 日期模式             | `after:"2026-09-01"`                |
| `at_operation(op, x)` 的第一个实参 | operation 选择表达式  | `@-`                                |
| `jj log -T '…'`              | template：格式化输出语言 | 不属于 revset                          |
| `jj log` 图形中的 `◆`、`×`        | 输出标记             | 不能作为提交表达式输入                         |

Revset 是“返回一组提交”的语言，不是顺序执行脚本。集合中的元素是提交对象，同一目标重复出现会去重。表达式选中了哪些提交，与最终命令是否会重写其后代，是两个问题。

单提交命令仍要求恰好一个结果；集合参数按各命令自身声明处理。**v0.45.1 不支持 `all:` 修饰符**。需要验证唯一性时用 `exactly(x, 1)`，但不能用它绕开命令本身的限制。

所有查询示例都可以先用 `jj log -r '表达式'` 预览。普通 `jj log` 可能快照当前磁盘改动；`jj --ignore-working-copy log ...` 可避免这一步，但也因此看不到尚未快照的改动。

验证范围：根据固定 tag 的官方文档、Rust 注册表、解析器、默认配置与日志模板核对。未安装/编译该版本 jj，未把示例标成实际仓库运行通过。

**Source / 来源：** [`docs/revsets.md`](https://github.com/jj-vcs/jj/blob/7c41cdeb16b6b321c64e789a966b6adf723816a5/docs/revsets.md) · [`lib/src/revset.rs`](https://github.com/jj-vcs/jj/blob/7c41cdeb16b6b321c64e789a966b6adf723816a5/lib/src/revset.rs) · [`lib/src/revset_parser.rs`](https://github.com/jj-vcs/jj/blob/7c41cdeb16b6b321c64e789a966b6adf723816a5/lib/src/revset_parser.rs) · [`CHANGELOG.md`](https://github.com/jj-vcs/jj/blob/7c41cdeb16b6b321c64e789a966b6adf723816a5/CHANGELOG.md)
