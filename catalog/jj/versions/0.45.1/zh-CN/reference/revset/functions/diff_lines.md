---
title: diff_lines(text, [files])
identifiers:
  - diff_lines
  - diff_lines()
---

**按 diff 的新增或删除行搜索。**

**Signature / 签名**

```text
diff_lines(text, [files])
```

**Arguments / 参数：** text：必填字符串模式，逐行匹配；files：可选 fileset 表达式，默认所有修改文件。

**Returns / 返回：** 在所选文件 diff 的新增或删除侧至少有一行满足模式的提交。

**Examples / 示例**

```sh
jj log -r 'diff_lines(substring:"TODO", root:"src")'
```

**Notes / 注意：** 查的是变更行，不是当前文件全部内容。默认字符串模式仍是 glob；用 substring: 可明确搜索词。v0.45.1 省略 files 时不会自动沿用命令行路径过滤；大仓库建议先限定 revset 和 paths。

**Source / 来源：** [Rust 定义](https://github.com/jj-vcs/jj/blob/7c41cdeb16b6b321c64e789a966b6adf723816a5/lib/src/revset.rs#L1139) · [官方函数参考](https://github.com/jj-vcs/jj/blob/7c41cdeb16b6b321c64e789a966b6adf723816a5/docs/revsets.md#functions)
