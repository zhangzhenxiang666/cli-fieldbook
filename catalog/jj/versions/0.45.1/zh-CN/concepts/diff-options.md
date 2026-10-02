---
title: 共享差异格式选项
---

并非所有命令都支持它们，只有对应命令节出现 `Diff Formatting Options:` 时才适用。

`--summary / --stat / --types / --name-only` 属于互斥的短格式组；
`--git / --color-words` 属于互斥的长格式组。短格式可以与长格式组合，
例如 `jj diff --stat --git`。`--tool` 的冲突规则还取决于它选择的内置/外部格式。
`--ignore-all-space` 与 `--ignore-space-change` 互斥。

`-w/-b` 短形式只在本手册已核实的 `diff`、`interdiff`、`show` 列出；
log/evolog 等不要据此类推。`--tool` 在展示差异和交互编辑命令中的角色也不同。

来源：[DiffFormatArgs](https://github.com/jj-vcs/jj/blob/7c41cdeb16b6b321c64e789a966b6adf723816a5/cli/src/diff_util.rs)。
