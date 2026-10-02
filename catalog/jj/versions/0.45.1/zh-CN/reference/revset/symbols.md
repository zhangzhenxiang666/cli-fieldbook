---
title: Symbols / 提交符号、工作区与 change offset
---

| 符号                  | 含义                            | 注意事项                     |
| ------------------- | ----------------------------- | ------------------------ |
| `@`                 | 当前 workspace 的工作副本提交          | 不是“当前 bookmark”          |
| `review@`           | 名为 review 的 workspace 的工作副本提交 | 名字只是示例，工作区必须存在           |
| `main`              | 名为 main 的标签或书签等符号             | 先匹配标签，再匹配书签，最后匹配 ID      |
| `main@origin`       | 本地记录的 origin 远端标签或书签目标        | 不是实时远端查询；标签优先            |
| `main@git`          | 特殊 Git 跟踪引用                   | `git` 不是必须存在于网络上的 remote |
| 完整 commit ID / 唯一前缀 | 指向特定提交对象                      | 前缀不唯一会报错                 |
| 完整 change ID / 唯一前缀 | 指向该 change 的可见提交              | 分歧导致多目标时，裸符号报错           |
| `xyz/0`、`xyz/1`     | 同一 change 的版本偏移               | 最新为 0；1 是之前的版本，不是父提交     |
| `"x-"`              | 名字本身为 x- 的符号                  | 不加表达式内引号时，`x-` 表示 x 的父   |

`xyz` 仅是 change ID 的示意，请替换成日志中的真实 ID。offset 会随着版本演进变化，**不是持久稳定的对象标识**；需要记录精确快照时保存完整 commit ID。

### Priority / 符号解析优先级

同名时按 **标签 → 书签 → commit/change ID** 解析。脚本中需要去歧义时使用函数：

```sh
jj log -r 'tags(exact:"release")'
jj log -r 'bookmarks(exact:"release")'
jj log -r 'commit_id(COMMIT_ID)'
jj log -r 'change_id(CHANGE_ID)'
```

最后两条中的大写词是待替换占位符，不是可直接使用的合法 ID。

“默认日志缩写多少位”不是 revset 语法保证。以当前仓库实际能唯一解析的前缀为准；已有 ID 前缀以后也可能因为新增对象而不再唯一。

### Quoting / 两层引号

```sh
# 外层单引号防 shell 把 |、&、* 等解释为管道或通配符
jj log -r 'mine() & (trunk()..@)'

# 外层交给 shell，内层保留给 revset 解析器
jj log -r '"x-"'

# 字符串模式与内容在 revset 内用双引号
jj log -r 'subject(substring:"fix parser")'
```

名字包含空格、运算符样字符时要特别注意。`x-y` 可能是一个书签名字；不要把它当作集合差集。`\` 换行写法因 shell 而异，本手册使用单行 POSIX shell 示例。

**Source / 来源：** [`docs/revsets.md`](https://github.com/jj-vcs/jj/blob/7c41cdeb16b6b321c64e789a966b6adf723816a5/docs/revsets.md#symbols) · [`docs/glossary.md`](https://github.com/jj-vcs/jj/blob/7c41cdeb16b6b321c64e789a966b6adf723816a5/docs/glossary.md#change-offset) · [`lib/src/revset.pest`](https://github.com/jj-vcs/jj/blob/7c41cdeb16b6b321c64e789a966b6adf723816a5/lib/src/revset.pest)
