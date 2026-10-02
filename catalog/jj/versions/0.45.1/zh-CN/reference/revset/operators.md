---
title: Operators / 全部运算符与优先级
identifiers:
  - "::"
  - ..
  - "&"
  - "|"
  - "~"
---

下面从**结合最紧到最松**排列。`x`、`y`、`z` 可为任意 revset，而不仅是单个 ID。

| 优先级 | 语法        | 中文含义 / 等价关系               |
| --- | --------- | ------------------------- |
| 1   | `f(x)`    | 函数调用                      |
| 2   | `x-`、`x+` | 直接父、直接子；可连续使用 `x--`、`x++` |
| 3   | `p:x`     | 字符串/日期模式，或名为 p 的模式别名      |
| 4   | `::x`     | x 与全部祖先；`ancestors(x)`    |
| 4   | `x::`     | x 与全部后代；`descendants(x)`  |
| 4   | `x::y`    | x 的后代 ∩ y 的祖先；`x:: & ::y` |
| 4   | `..x`     | x 的祖先去掉虚拟根；`root()..x`    |
| 4   | `x..`     | 搜索域中不属于 x 祖先的提交；`~::x`    |
| 4   | `x..y`    | y 的祖先减去 x 的祖先；`::y ~ ::x` |
| 4   | `::`      | `all()`，受搜索域扩展规则影响        |
| 4   | `..`      | 搜索域去掉虚拟根；`~root()`        |
| 5   | `~x`      | 补集；搜索域中不属于 x 的提交          |
| 6   | `x & y`   | 交集                        |
| 6   | `x ~ y`   | 差集                        |
| 7   | `x \| y`  | 并集                        |

同优先级的中缀集合运算**从左到右**。括号可以改变顺序：

```text
x | y & z       = x | (y & z)
x ~ y & z       = (x ~ y) & z
x ~ (y & z)     需要显式括号，不能省略
~x::            = ~(x::)
(@ | trunk())-  先取集合，再取各自父提交
```

范围运算叠加要用括号明确层级，不要写含混的 `A::B::C`。`p:x` 只在相应模式/别名上下文成立；`A:B` **不是**有效的简写 DAG 范围。

### 区分“所有祖先”“精确第 N 代”“前 N 代”

```text
@---                恰好沿三条父边可到达的提交
parents(@, 3)       与 @--- 等价
ancestors(@, 3)     @ + 直接父 + 再上一代，不是 @ 的第三代父
first_parent(@, 3)  恰好沿第一父链三步
first_ancestors(@)  沿第一父链一直回溯，并包括 @
```

merge 情况下 `@-`、`@--` 可能返回多个结果。`@+` 是子提交关系，不是操作历史里的“下一次命令”，也不是撤销/重做。

**Source / 来源：** [`docs/revsets.md`](https://github.com/jj-vcs/jj/blob/7c41cdeb16b6b321c64e789a966b6adf723816a5/docs/revsets.md#operators) · [`lib/src/revset_parser.rs`](https://github.com/jj-vcs/jj/blob/7c41cdeb16b6b321c64e789a966b6adf723816a5/lib/src/revset_parser.rs) · [`lib/src/revset.rs`](https://github.com/jj-vcs/jj/blob/7c41cdeb16b6b321c64e789a966b6adf723816a5/lib/src/revset.rs#L776-L839)
