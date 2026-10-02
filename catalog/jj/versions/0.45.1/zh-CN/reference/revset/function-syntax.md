---
title: Functions / 函数签名、默认值与参数类型
---

后文每个条目保留 `Signature / Arguments / Returns / Examples / Notes / Source` 字段，中文说明不改参数名和语法。

签名中的 `[arg]` 表示**可选实参**，输入时不要带方括号。`revsets...` 表示可变数量实参。绝大多数函数是位置参数，不能照着 Rust/Python 的习惯给任何参数加名字。

```text
ancestors(@, 3)          正确
ancestors(@, depth=3)    不支持这种命名实参
exactly(@, 1)            正确
exactly(@, count=1)      不支持这种命名实参
```

远端引用家族明确支持第二个参数的 `remote=`：

```text
remote_bookmarks()
remote_bookmarks("main")
remote_bookmarks("main", "origin")
remote_bookmarks("main", remote="origin")
remote_bookmarks(remote="origin")
```

`remote_tags()` 及四个 tracked/untracked 函数同理。不支持随意造出 `name=` 参数。

### 参数不是同一种语言

```text
ancestors(mine() & mutable(), 3)       第一参数是提交集合
bookmarks(glob:"feature/*")           第一参数是字符串匹配条件
files(root:"src" ~ root:"src/tmp")     第一参数是路径集合
author_date(after:"2026-09-01")        第一参数是日期边界
at_operation(@-, @)                  第一参数是 operation，第二个是 commit revset
```

`files(all())` 的 `all()` 属于 fileset，表示所有路径；最外层的 `all()` 属于 revset，表示搜索域里的全部提交。不要用“函数同名”推断二者类型相同。

### 默认值速记

| 家族                                        | 省略可选参数的行为         | 0 的行为  |
| ----------------------------------------- | ----------------- | ------ |
| parents / children / first_parent         | depth=1           | 返回来源 x |
| ancestors / descendants / first_ancestors | 不限深度              | 返回空集合  |
| latest                                    | count=1           | 返回空集合  |
| bookmarks / tags                          | 匹配全部本地对应引用        | 不适用    |
| remote\_\* / tracked\_\* / untracked\_\*  | 全部默认远端范围，排除特殊 git | 不适用    |
| diff_lines / added / removed              | 搜索全部修改文件          | 不适用    |

**Source / 来源：** [`docs/revsets.md`](https://github.com/jj-vcs/jj/blob/7c41cdeb16b6b321c64e789a966b6adf723816a5/docs/revsets.md#functions) · [`lib/src/revset.rs`](https://github.com/jj-vcs/jj/blob/7c41cdeb16b6b321c64e789a966b6adf723816a5/lib/src/revset.rs#L776-L1164) · [`lib/src/dsl_util.rs`](https://github.com/jj-vcs/jj/blob/7c41cdeb16b6b321c64e789a966b6adf723816a5/lib/src/dsl_util.rs#L139-L198)
