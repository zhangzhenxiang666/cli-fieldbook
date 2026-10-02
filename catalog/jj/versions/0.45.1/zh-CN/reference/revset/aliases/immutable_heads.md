---
title: immutable_heads()
identifiers:
  - immutable_heads()
---

**确定不可变集合边界的配置入口。**

**Default / 默认定义**

```text
builtin_immutable_heads()
```

**Notes / 注意：** 表示不可变集合的边界 heads，不是“从所有不可变提交中随便挑出一部分”。jj 将其祖先和 root() 视为不可变；不存在的可选符号可用 present() 包住，防止多个命令因解析失败而无法使用。

**Source / 来源：** [固定版本默认配置](https://github.com/jj-vcs/jj/blob/7c41cdeb16b6b321c64e789a966b6adf723816a5/cli/src/config/revsets.toml)
