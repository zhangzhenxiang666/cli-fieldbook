---
title: 最值得记住的选择表
---

| 你要做什么          | 首先考虑                   | 不要混淆                     |
| -------------- | ---------------------- | ------------------------ |
| 改当前 change 的描述 | describe               | commit 还会创建新工作 change    |
| 从已有提交继续写       | new REV                | edit REV 是直接编辑那个 change  |
| 把修复归入已有工作      | squash --into REV      | squash --onto 创建新目标的模式不同 |
| 自动按行归属回填祖先     | absorb                 | 不保证所有补丁都能归位              |
| 搬动整段后代         | rebase -s              | -r 只选指定修订                |
| 复制补丁           | duplicate              | rebase 不产生独立的逻辑改动身份      |
| 合并两条线          | new A B                | 不要求先清空一个 Git-style 中间状态  |
| 丢弃本地改动内容       | restore                | 可能覆盖工作副本，不是“只读查看”        |
| 反做已发布提交        | revert                 | op revert 是反做仓库操作        |
| 撤销刚才操作         | undo / redo            | v0.45.1 的 undo 不接受操作 ID  |
| 恢复到指定仓库状态      | op restore             | 不会自动撤回远端 push            |
| 删除远端分支意图       | bookmark delete + push | forget / untrack 的含义不同   |
| 遍历多个提交执行工具     | run                    | 隔离工作副本不是安全沙箱             |
| 定位坏提交          | bisect run             | 会直接切换被测工作副本              |
