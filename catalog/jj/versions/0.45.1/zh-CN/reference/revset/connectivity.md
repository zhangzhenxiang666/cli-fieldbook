---
title: Examples / reachable、connected、heads、roots 的区别
---

继续使用有合并和分叉的历史：

```text
E
| D
|/|
B C
|/
A
|
root()
```

D 的父是 B、C；E 的父是 B。

| 表达式                   | 结果             | 意义                          |
| --------------------- | -------------- | --------------------------- |
| `reachable(E, A..)`   | `{E, D, C, B}` | 可以经 B 到 D，再到 C，所有节点仍在 A.. 内 |
| `reachable(E, B..)`   | `{E}`          | E 唯一相邻父 B 不在域内，不能跨过去        |
| `reachable(C, B..)`   | `{D, C}`       | C 与 D 在限定域内连通               |
| `reachable(A, A..)`   | `{}`           | 起点 A 不在域里                   |
| `connected(E \| A)`   | `{E, B, A}`    | 只填 E 与 A 之间的祖先路径            |
| `connected(D \| A)`   | `{D, C, B, A}` | D 到 A 的两条路径都填上              |
| `connected(B \| C)`   | `{B, C}`       | 不会因为共享祖先而补入 A               |
| `heads(E \| B)`       | `{E}`          | B 是 E 的祖先                   |
| `heads(E \| C)`       | `{E, C}`       | 二者互不为祖先                     |
| `roots(E \| B)`       | `{B}`          | 保留所选集合的祖先边界                 |
| `fork_point(E \| D)`  | `{B}`          | 最近公共祖先                      |
| `fork_point(E \| C)`  | `{A}`          | 最近公共祖先                      |
| `merge_point(B \| C)` | `{D}`          | 最小公共后代                      |

“选择当前工作的整组相关提交”常用 `reachable(@, mutable())`。它允许沿父和子双向走，可能把兄弟分支一起选入；若只想要当前提交的祖先线，使用 `::@ & mutable()`。

本页示例同样按独立 DAG 模型做了集合结果检查，不代表实际执行过 jj。

**Source / 来源：** [`docs/revsets.md`](https://github.com/jj-vcs/jj/blob/7c41cdeb16b6b321c64e789a966b6adf723816a5/docs/revsets.md#functions)
