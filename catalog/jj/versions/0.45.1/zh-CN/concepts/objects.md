---
title: 核心对象与常见误解
---

| 对象                        | 中文含义         | 最重要的区别                               |
| ------------------------- | ------------ | ------------------------------------ |
| working-copy commit / `@` | 当前工作区正在编辑的提交 | jj 没有必须经过 Git index 的通用暂存流程          |
| change ID                 | 一项逻辑改动的标识    | 重写通常保持；有分歧时可能对应多个版本                  |
| commit ID                 | 某个不可变提交对象的标识 | 内容、描述、父关系或签名改变都可能产生新对象               |
| bookmark                  | 可移动的命名引用     | 是远端 Git 分支交互的重要入口，不等于 change 本身      |
| tag                       | 发布/标记引用      | 默认不允许任意移动；也影响默认不可变集合                 |
| operation ID              | 一次仓库状态操作的标识  | 用于 op log / restore / revert，不是提交 ID |
| workspace                 | 独立目录与自己的 `@` | 与其他 workspace 共享仓库对象和引用              |
| immutable                 | 默认受重写保护的历史   | `--ignore-immutable` 绕过的是保护，不是“更安全”  |

通常运行 jj 命令时会为工作副本制作快照，所以 `status`、`diff` 也不应被理解成
对仓库元数据绝对零写入的命令。`--ignore-working-copy` 只控制工作副本快照/更新，
不是“所有命令只读”。`--no-integrate-operation` 也不是通用 dry-run。
