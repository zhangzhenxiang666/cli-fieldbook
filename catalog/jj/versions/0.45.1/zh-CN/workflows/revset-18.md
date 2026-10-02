---
title: R18 · 兼容 main/master，但不吞掉歧义
uses:
  - "command:"
  - command:log
  - reference:revset/functions/coalesce
  - reference:revset/functions/present
  - reference:revset/functions/root
---

**场景：** 按顺序选择存在的远端目标。

```sh
jj log -r 'coalesce(present(main@origin), present(master@origin), root())'
```

**注意：** present() 仅处理缺失，coalesce() 选第一个非空；不是按最新时间选择。main 的冲突或歧义不会被当成无结果自动忽略。

**Source / 语法依据：** [官方 revset 参考](https://github.com/jj-vcs/jj/blob/7c41cdeb16b6b321c64e789a966b6adf723816a5/docs/revsets.md)；本例由本手册组合整理。
