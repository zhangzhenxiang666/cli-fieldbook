---
title: tracked_remote_tags([name_pattern], [[remote=]remote_pattern])
identifiers:
  - tracked_remote_tags
  - tracked_remote_tags()
---

**选择已跟踪远端标签的目标。**

**Signature / 签名**

```text
tracked_remote_tags([name_pattern], [[remote=]remote_pattern])
```

**Arguments / 参数：** name_pattern：可选书签/标签名字符串模式；remote_pattern：可选远端名字符串模式，可用 remote= 指定。两者省略时匹配默认范围。

**Returns / 返回：** 名称与远端模式均匹配、且满足已跟踪条件的远端标签目标集合。

**Examples / 示例**

```sh
jj log -r 'tracked_remote_tags(remote="origin")'
```

**Notes / 注意：** 默认不包含特殊 git 跟踪引用；明确 remote="git" 只选这些引用，remote="\*" 才把它们也包括进来。仅查询本地已知远端状态，不会联网 fetch。 参数解析与 remote_bookmarks() 共用；目标集合会去重。

**Source / 来源：** [Rust 定义](https://github.com/jj-vcs/jj/blob/7c41cdeb16b6b321c64e789a966b6adf723816a5/lib/src/revset.rs#L993) · [官方函数参考](https://github.com/jj-vcs/jj/blob/7c41cdeb16b6b321c64e789a966b6adf723816a5/docs/revsets.md#functions)
