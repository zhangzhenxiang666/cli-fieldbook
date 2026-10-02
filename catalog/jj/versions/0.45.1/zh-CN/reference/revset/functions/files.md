---
title: files(expression)
identifiers:
  - files
  - files()
---

**按被修改的文件路径筛选提交。**

**Signature / 签名**

```text
files(expression)
```

**Arguments / 参数：** expression：必填 fileset 表达式，不是另一个 revset。

**Returns / 返回：** 修改了至少一条匹配路径的提交。

**Examples / 示例**

```sh
jj log -r 'files(root:"src") & ::@'
```

**Notes / 注意：** 默认路径相对 jj 启动目录；目录匹配其子树。files(".") 的点要加引号。root: / root-file: 可避免依赖当前目录；这不是搜索快照中是否存在某文件。

**Source / 来源：** [Rust 定义](https://github.com/jj-vcs/jj/blob/7c41cdeb16b6b321c64e789a966b6adf723816a5/lib/src/revset.rs#L1128) · [官方函数参考](https://github.com/jj-vcs/jj/blob/7c41cdeb16b6b321c64e789a966b6adf723816a5/docs/revsets.md#functions)
