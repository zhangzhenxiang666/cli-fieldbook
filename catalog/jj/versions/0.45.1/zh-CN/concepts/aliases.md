---
title: 别名的三个层级
---

命令别名如 `operation → op` 来自命令枚举；`bookmark → b`、`describe → desc`、
`commit → ci`、`status → st` 是内置配置中的别名，用户配置可以覆盖。
第三类是参数兼容别名，例如 rebase 的 `--destination` 与 `-d`。
别把“命令别名”“参数别名”“同名参数的不同语义”混成一类。

每节的 Hidden / Compatibility Options 只列已核实兼容项。
`restore -r` 属于专门返回错误的入口，`run -x` 属于无操作兼容项，
它们虽然能出现在解析定义里，却不能当作普通功能宣传。
