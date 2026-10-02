---
title: 三种“历史”分别回答什么
uses:
  - "command:"
  - command:util
---

`jj log`：现在的提交图是怎样的？
`jj evolog`：同一个 change 经历过哪些重写版本？
`jj op log`：仓库状态经过了哪些操作？

遇到异常先分清问题属于哪一层，再选择恢复命令。
对象清理不是第一反应：在需要恢复的阶段，避免运行 `jj op abandon` 和 `jj util gc`。

完整参数、默认值和已核实隐藏兼容项见 `jj-v0.45.1-zh.md`。

***
