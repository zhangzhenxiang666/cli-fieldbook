---
title: R10 · 查找某个旧 API 的删除
uses:
  - "command:"
  - command:log
  - reference:revset/functions/diff_lines_removed
---

**场景：** 搜索删除侧，避免被相同文本的新增误导。

```sh
jj log -r '::@ & diff_lines_removed(substring:"old_api", root:"src")'
```

**注意：** old_api 是示例文本，src 是示例目录。匹配的是单行变更文本，不做语义级 Rust 符号解析。

**Source / 语法依据：** [官方 revset 参考](https://github.com/jj-vcs/jj/blob/7c41cdeb16b6b321c64e789a966b6adf723816a5/docs/revsets.md)；本例由本手册组合整理。
