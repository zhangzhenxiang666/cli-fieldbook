---
title: 内置默认值不等于你的有效配置
---

下表是该版本的内置值。用户、仓库、工作区和本次调用配置都可能改变有效结果。

| 配置键                              | 内置值                         | 解读                         |
| -------------------------------- | --------------------------- | -------------------------- |
| `ui.default-command`             | `log`                       | 裸 jj 的默认命令。                |
| `git.colocate`                   | `true`                      | Git 初始化/克隆的并置默认值，可被个人配置覆盖。 |
| `git.object-hash`                | `sha1`                      | 不是对已有仓库任意切换哈希算法。           |
| `revsets.run`                    | `reachable(@, mutable())`   | 不是固定的 @ 或所有仓库历史。           |
| `revsets.fix`                    | `reachable(@, mutable())`   | fix 从所选起点继续处理后代。           |
| `revsets.sign`                   | `reachable(@, mutable())`   | sign 默认范围与 unsign 不应混为一谈。  |
| `revsets.arrange`                | `reachable(@, mutable())`   | 交互重排的默认集合。                 |
| `revsets.simplify-parents`       | `reachable(@, mutable())`   | 父边简化默认起点。                  |
| `revsets.converge`               | `mutable() & divergent()`   | 默认处理可变分歧。                  |
| `revsets.bookmark-advance-to`    | `@`                         | advance 默认目标。              |
| `revsets.bookmark-advance-from`  | `heads(::to & bookmarks())` | 未给名称时寻找最近书签；表达式可访问 to。     |
| `split.legacy-bookmark-behavior` | `true`                      | 默认拆分后的书签前进语义，拆分后检查。        |

通过下面的命令确认实际生效值，而不是只记住表格：

```sh
jj config get revsets.run
jj config get git.colocate
jj config list --include-defaults
jj config list --include-overridden
```

来源：[revsets.toml](https://github.com/jj-vcs/jj/blob/7c41cdeb16b6b321c64e789a966b6adf723816a5/cli/src/config/revsets.toml) ·
[misc.toml](https://github.com/jj-vcs/jj/blob/7c41cdeb16b6b321c64e789a966b6adf723816a5/cli/src/config/misc.toml)。
