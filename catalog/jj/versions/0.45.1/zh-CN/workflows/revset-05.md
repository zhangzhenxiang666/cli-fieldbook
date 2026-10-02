---
title: R05 · 按标题约定查找修复
uses:
  - "command:"
  - command:log
  - reference:revset/functions/subject
---

**场景：** 筛选以 fix: 开头，或以 fix(scope): 开头的标题。

```sh
jj log -r 'subject(regex:"^fix([(][^)]*[)])?:")'
```

**注意：** 使用字符组 \[(]、\[)] 表示字面括号，避免 shell 与 revset 双层转义。更简单但宽松的选择是 subject(glob:"fix\*")。

**Source / 语法依据：** [官方 revset 参考](https://github.com/jj-vcs/jj/blob/7c41cdeb16b6b321c64e789a966b6adf723816a5/docs/revsets.md)；本例由本手册组合整理。
