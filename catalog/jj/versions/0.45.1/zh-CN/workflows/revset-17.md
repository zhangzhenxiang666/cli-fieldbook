---
title: R17 · 找两个 feature 最早共同进入哪里的历史
uses:
  - "command:"
  - command:log
  - reference:revset/functions/bookmarks
  - reference:revset/functions/exactly
  - reference:revset/functions/merge_point
---

**场景：** 寻找共同后代的边界。

```sh
jj log -r 'merge_point(bookmarks(exact:"feature/a") | bookmarks(exact:"feature/b"))'
```

**注意：** 两个书签名是示例，先确认均存在。某个名称不匹配时 bookmarks() 返回空，可能只剩另一个输入；正式脚本应分别加 exactly(..., 1) 断言。

**Source / 语法依据：** [官方 revset 参考](https://github.com/jj-vcs/jj/blob/7c41cdeb16b6b321c64e789a966b6adf723816a5/docs/revsets.md)；本例由本手册组合整理。
