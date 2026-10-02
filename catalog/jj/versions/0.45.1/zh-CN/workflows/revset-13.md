---
title: R13 · 预览空白草稿候选
uses:
  - "command:"
  - command:log
  - reference:revset/functions/description
  - reference:revset/functions/empty
  - reference:revset/functions/mine
  - reference:revset/functions/working_copies
---

**场景：** 找出自己没有说明也没有文件修改、且不是任何工作区当前目标的可变提交。

```sh
jj log -r '(mine() & mutable() & empty() & description("")) ~ working_copies()'
```

**注意：** 这只是审查候选，不等于可安全 abandon。空 merge、被书签引用的提交也可能有用途，清理前仍需核对图关系。

**Source / 语法依据：** [官方 revset 参考](https://github.com/jj-vcs/jj/blob/7c41cdeb16b6b321c64e789a966b6adf723816a5/docs/revsets.md)；本例由本手册组合整理。
