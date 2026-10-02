---
title: String patterns / 字符串模式与逻辑组合
---

v0.45.1 默认把 `"text"` 解释成 **glob 模式**，不是默认子串搜索。四种模式都支持追加 `-i` 忽略大小写，共八种拼写：

| 精确写法               | 忽略大小写写法              | 含义 / 例子                  |
| ------------------ | -------------------- | ------------------------ |
| `exact:"text"`     | `exact-i:"text"`     | 整个字符串相等                  |
| `glob:"pattern"`   | `glob-i:"pattern"`   | shell 风格通配匹配，如 `"fix:*"` |
| `regex:"pattern"`  | `regex-i:"pattern"`  | 正则子串匹配；需要整串时自行用 `^`、`$`  |
| `substring:"text"` | `substring-i:"text"` | 原样子串匹配，不把特殊字符当正则         |

glob 常用 `*` 匹配任意串、`?` 匹配单字符、`[abc]` 匹配字符组、`{foo,bar}` 匹配备选。这里匹配的是**字符串**，不是 shell 展开，也不要直接套用 fileset 中 `*`/`**` 的路径分隔规则。

```sh
# 含有 fix 的说明
jj log -r 'description(substring:"fix")'

# 以 fix: 开头的标题
jj log -r 'subject(glob:"fix:*")'

# 标题恰好等于 fix parser
jj log -r 'subject(exact:"fix parser")'

# 完整说明通常有末尾换行；这里显式匹配换行
jj log -r 'description(exact:"fix parser\n")'
```

### 字符串条件也可做逻辑组合

```sh
jj log -r 'bookmarks(glob:"feature/*" ~ glob:"feature/wip-*")'
jj log -r 'author_email(exact:"a@example.com" | exact:"b@example.com")'
```

这里函数括号里面的 `|` / `~` 合并的是“名字是否匹配”的条件；函数外面合并的才是提交集合。

一个提交可能有多个书签，所以：

```text
bookmarks(~glob:"ci/*")
```

表示“至少有一个不叫 ci/\* 的书签指向它”，**不等于** `bookmarks() ~ bookmarks(glob:"ci/*")`。后者会排除任何带 ci/\* 书签的目标，即使它同时还有另一个普通书签。

### 不要串用三种冒号

`glob:"fix*"` 是字符串模式；`root:"src"` 是 fileset 模式；`after:"yesterday"` 是日期模式。冒号本身不是通用的 revset 范围运算符。

**Source / 来源：** [`docs/revsets.md`](https://github.com/jj-vcs/jj/blob/7c41cdeb16b6b321c64e789a966b6adf723816a5/docs/revsets.md#string-patterns) · [`lib/src/revset.rs`](https://github.com/jj-vcs/jj/blob/7c41cdeb16b6b321c64e789a966b6adf723816a5/lib/src/revset.rs#L1209-L1245) · [`docs/filesets.md`](https://github.com/jj-vcs/jj/blob/7c41cdeb16b6b321c64e789a966b6adf723816a5/docs/filesets.md#file-patterns)
