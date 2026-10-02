---
title: untracked_remote_bookmarks([name_pattern], [[remote=]remote_pattern])
identifiers:
  - untracked_remote_bookmarks
  - untracked_remote_bookmarks()
---

**选择未跟踪远端书签的目标。**

**Signature / 签名**

```text
untracked_remote_bookmarks([name_pattern], [[remote=]remote_pattern])
```

**Arguments / 参数：** name_pattern：可选书签/标签名字符串模式；remote_pattern：可选远端名字符串模式，可用 remote= 指定。两者省略时匹配默认范围。

**Returns / 返回：** 名称与远端模式均匹配、且满足未跟踪条件的目标提交集合。

**Examples / 示例**

```sh
jj log -r 'untracked_remote_bookmarks(remote="origin")'
```

**Notes / 注意：** 默认不包含特殊 git 跟踪引用；明确 remote="git" 只选这些引用，remote="\*" 才把它们也包括进来。仅查询本地已知远端状态，不会联网 fetch。 “跟踪”是引用关系状态，不等于已发布/未发布的提交分类；冲突引用可产生多个目标。

**Source / 来源：** [Rust 定义](https://github.com/jj-vcs/jj/blob/7c41cdeb16b6b321c64e789a966b6adf723816a5/lib/src/revset.rs#L971) · [官方函数参考](https://github.com/jj-vcs/jj/blob/7c41cdeb16b6b321c64e789a966b6adf723816a5/docs/revsets.md#functions)
