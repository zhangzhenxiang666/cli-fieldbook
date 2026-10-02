---
title: Aliases / 自定义符号、函数与模式别名
---

别名定义在 `[revset-aliases]` 中，可以是普通符号、带参数函数或 `名称:值` 的模式。

```toml
[revset-aliases]
# 符号别名：只定义在你的配置中，不是 jj 自带 HEAD
HEAD = '@-'

# 函数别名：当前所在的可变连通栈
'stack()' = 'reachable(@, mutable())'

# 同名自定义别名可按实参数量重载
'user()' = 'user("me@example.com")'
'user(x)' = 'author(x) | committer(x)'

# 模式别名
'grep:x' = 'description(regex:x)'

# 附加 doc 供补全等功能显示
'pending()' = { definition = '(trunk()..@) & ~empty()', doc = '当前主线之外、并且有文件改动的提交' }
```

以上邮箱是示例，按自己的账号替换。编辑已有配置时合并到已有 `[revset-aliases]` 表，不要在同一个 TOML 文档里重复声明该表。

```sh
jj config edit --user
jj config list revset-aliases

jj log -r 'stack()'
jj log -r 'user("alice@example.com")'
jj log -r 'grep:"(?i)fix|bug"'
jj log -r 'pending()'
```

别名函数虽可按参数数量重载，但**覆盖内置函数按名字生效**：不要指望自定义 `ancestors(x)` 后，内置 `ancestors(x, depth)` 还能与它共存。别名也不是运行 shell 命令的宏。

### Alias descriptions / 另一种附带说明的写法

```toml
[revset-aliases]
'stack()'.definition = 'reachable(@, mutable())'
'stack()'.doc = '当前工作提交所在的可变连通栈'
```

这是前面写法的替代方案，不要同时重复定义同一个键。

### 修改不可变边界的示例

假设你已有本地 `release/*` 书签，希望把它们及其祖先也保护起来：

```toml
[revset-aliases]
'immutable_heads()' = 'builtin_immutable_heads() | bookmarks(glob:"release/*")'
```

不要通过重定义 `immutable()` 或 `mutable()` 修改写保护；这两个别名主要用于查询。也不要为了消掉错误直接移除所有保护，先检查自己覆盖了哪些来源。

**Source / 来源：** [`docs/revsets.md`](https://github.com/jj-vcs/jj/blob/7c41cdeb16b6b321c64e789a966b6adf723816a5/docs/revsets.md#aliases) · [`cli/src/config/revsets.toml`](https://github.com/jj-vcs/jj/blob/7c41cdeb16b6b321c64e789a966b6adf723816a5/cli/src/config/revsets.toml) · [`cli/src/revset_util.rs`](https://github.com/jj-vcs/jj/blob/7c41cdeb16b6b321c64e789a966b6adf723816a5/cli/src/revset_util.rs)
