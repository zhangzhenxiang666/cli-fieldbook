---
title: 来源、覆盖与校对记录
---

## 固定基准

- 项目：[jj-vcs/jj](https://github.com/jj-vcs/jj)。
- 稳定版：[v0.45.1](https://github.com/jj-vcs/jj/releases/tag/v0.45.1)，2026-09-03 发布。
- 查证日期：2026-09-17。手册的源码链接均固定到 v0.45.1，不链接未发布 main 代码。
- 官方 CLI reference：[在线入口](https://docs.jj-vcs.dev/latest/cli-reference/)。
  该 URL 是滚动的 latest，不是永久版本快照；本次阅读时据其生成命令清单，并结合固定 tag 源码复核。
- 原项目著作权属于 The Jujutsu Authors，源码使用 Apache-2.0；
  中文说明、结构化组织、场景示例为本次整理。并非 Jujutsu 官方中文发布物。

## 数量怎么计算

| 分类    | 节点数 | 非根叶子命令数 | 说明                         |
| ----- | --: | ------: | -------------------------- |
| 公开    | 122 |     107 | 包含 jj 根入口和各级命令组            |
| debug |  26 |      23 | 包含隐藏根组、object 组、watchman 组 |
| bench |   5 |       4 | 需要 bench feature 的隐藏命令组    |
| 合计    | 153 |     134 | 别名不重复计算                    |

“153 个节点”不能写成“153 个独立公开子命令”。
公开命令表依据完整官方参考；debug 和 bench 参数根据源码逐项补充。
隐藏兼容参数的附录是已核实清单，不承诺穷尽未公开的实现细节或用户自定义 aliases。

## 方法与验证限制

命令枚举用于校验树结构，Args 字段用于检查参数，config 内置文件用于查找真正的默认值；
对危险操作和若干说明冲突，还查看实际执行分支。
并没有在本环境运行 jj，不存在真实逐命令 help 捕获，也没有本地 Rust 编译或完整仓库集成测试。
原始翻译包未保存源码副本；这是原始调研阶段的边界。

可检查的是本次生成物自身的结构一致性：命令数、重复键、来源字段、工作流引用、
代码块配对、HTML 索引与命令数据覆盖、导出脚本的语法及帮助路径。
不能把这些文件级检查表述为 jj 行为测试。

## 重要校对结果

### 1. file track：注释称可省略，解析器实际要求路径

`cli/src/commands/file/track.rs` 的说明提到不带参数可跟踪所有文件，
但路径字段的 clap 声明设置了 `required = true`。
主手册按实际解析要求写为 `<FILESETS>...`，全部路径用 `jj file track 'all()'` 明确表达。
`--include-ignored` 还会越过新文件大小限制，不只是绕过 .gitignore。

来源：[cli/src/commands/file/track.rs](https://github.com/jj-vcs/jj/blob/7c41cdeb16b6b321c64e789a966b6adf723816a5/cli/src/commands/file/track.rs)。

### 2. --no-integrate-operation 不是通用 dry-run；git push 会拒绝

全局参数的说明强调不应据此假定没有仓库外副作用。
更具体地，v0.45.1 的 `git push` 实现会检查此开关并报错，
提示使用自己的 `--dry-run`。因此“带这个选项照样会执行 git push”不适用于该版本。

来源：[GlobalArgs](https://github.com/jj-vcs/jj/blob/7c41cdeb16b6b321c64e789a966b6adf723816a5/cli/src/cli_util.rs) · [cli/src/commands/git/push.rs](https://github.com/jj-vcs/jj/blob/7c41cdeb16b6b321c64e789a966b6adf723816a5/cli/src/commands/git/push.rs)。

### 3. bisect run：COMMAND 在 Usage 中可选，执行时却必须提供

解析层保留位置 COMMAND 的可选形态，是为了兼容隐藏、已弃用的 `--command`。
两种形式都没给时，执行分支返回“需要 Command”错误。不是无命令自动交互模式。

来源：[cli/src/commands/bisect/run.rs](https://github.com/jj-vcs/jj/blob/7c41cdeb16b6b321c64e789a966b6adf723816a5/cli/src/commands/bisect/run.rs)。

### 4. restore -r：隐藏入口是报错引导，不是正常选项

源码保留隐藏 `-r/--revision` 以提示迁移，执行分支主动报错。
真正需要的是 `--from` 或 `--changes-in`，而不是给旧用法编造一种新含义。

来源：[cli/src/commands/restore.rs](https://github.com/jj-vcs/jj/blob/7c41cdeb16b6b321c64e789a966b6adf723816a5/cli/src/commands/restore.rs)。

### 5. -d 与 --onto：不要把同样字母跨命令泛化

rebase、duplicate、split、squash、revert 保留公开短别名 -d；
它们的规范长选项是 --onto，也保留 --destination。
new 则是隐藏短选项 -o 并有 -d/-r 短别名，不表示存在同名长参数。
源码没有把前一组的 -d 标记为已弃用。

来源：[cli/src/commands/rebase.rs](https://github.com/jj-vcs/jj/blob/7c41cdeb16b6b321c64e789a966b6adf723816a5/cli/src/commands/rebase.rs) · [cli/src/commands/new.rs](https://github.com/jj-vcs/jj/blob/7c41cdeb16b6b321c64e789a966b6adf723816a5/cli/src/commands/new.rs) · [cli/src/commands/duplicate.rs](https://github.com/jj-vcs/jj/blob/7c41cdeb16b6b321c64e789a966b6adf723816a5/cli/src/commands/duplicate.rs) ·
[cli/src/commands/split.rs](https://github.com/jj-vcs/jj/blob/7c41cdeb16b6b321c64e789a966b6adf723816a5/cli/src/commands/split.rs) · [cli/src/commands/squash.rs](https://github.com/jj-vcs/jj/blob/7c41cdeb16b6b321c64e789a966b6adf723816a5/cli/src/commands/squash.rs) · [cli/src/commands/revert.rs](https://github.com/jj-vcs/jj/blob/7c41cdeb16b6b321c64e789a966b6adf723816a5/cli/src/commands/revert.rs)。

### 6. --revision 与 --revisions 的公开拼写不统一

diff / evolog 的公开长选项是复数 --revisions，单数是隐藏兼容别名；
log / rebase / run / sign / unsign / git push / revert 则是公开单数、兼容复数。
describe、show 等还存在隐藏短 -r，不能由此推出它们都接受 --revision。

来源：[cli/src/commands/diff.rs](https://github.com/jj-vcs/jj/blob/7c41cdeb16b6b321c64e789a966b6adf723816a5/cli/src/commands/diff.rs) · [cli/src/commands/evolog.rs](https://github.com/jj-vcs/jj/blob/7c41cdeb16b6b321c64e789a966b6adf723816a5/cli/src/commands/evolog.rs) · [cli/src/commands/log.rs](https://github.com/jj-vcs/jj/blob/7c41cdeb16b6b321c64e789a966b6adf723816a5/cli/src/commands/log.rs) ·
[cli/src/commands/describe.rs](https://github.com/jj-vcs/jj/blob/7c41cdeb16b6b321c64e789a966b6adf723816a5/cli/src/commands/describe.rs) · [cli/src/commands/show.rs](https://github.com/jj-vcs/jj/blob/7c41cdeb16b6b321c64e789a966b6adf723816a5/cli/src/commands/show.rs)。

### 7. watchman 与 bench 的“存在”不保证当前二进制可执行

debug watchman 的命令枚举可见于源码，但具体执行受 watchman feature 支持限制。
bench 根组需要 bench feature；它不是每个发行二进制都具备的用户功能。
调试输出亦不承诺长期稳定。

来源：[debug/watchman.rs](https://github.com/jj-vcs/jj/blob/7c41cdeb16b6b321c64e789a966b6adf723816a5/cli/src/commands/debug/watchman.rs) ·
[bench/mod.rs](https://github.com/jj-vcs/jj/blob/7c41cdeb16b6b321c64e789a966b6adf723816a5/cli/src/commands/bench/mod.rs) ·
[命令枚举](https://github.com/jj-vcs/jj/blob/7c41cdeb16b6b321c64e789a966b6adf723816a5/cli/src/commands/mod.rs)。

### 8. Git colocation 与 workspace：严格区分版本

v0.45.1 的 Git colocation 操作只允许主工作区。
额外 workspace 的未来能力不从 main 或旧/新教程混入本版本手册。
git clone/init 的内置并置默认值由 git.colocate=true 决定。

来源：[cli/src/commands/git/colocation.rs](https://github.com/jj-vcs/jj/blob/7c41cdeb16b6b321c64e789a966b6adf723816a5/cli/src/commands/git/colocation.rs) ·
[misc.toml](https://github.com/jj-vcs/jj/blob/7c41cdeb16b6b321c64e789a966b6adf723816a5/cli/src/config/misc.toml)。

### 9. debug object symlink：参数声明与执行要求的差异

file/tree 解析器要求 ID 或 -r；symlink 的声明未标同样的 required，
但实现会读取其中之一。为了避免落入错误分支，示例和说明都要求显式提供目标。

来源：[debug/object.rs](https://github.com/jj-vcs/jj/blob/7c41cdeb16b6b321c64e789a966b6adf723816a5/cli/src/commands/debug/object.rs)。

## 关键共享定义

| 内容           | 固定版本源码                                                                                                                        |
| ------------ | ----------------------------------------------------------------------------------------------------------------------------- |
| 根命令和隐藏组      | [commands/mod.rs](https://github.com/jj-vcs/jj/blob/7c41cdeb16b6b321c64e789a966b6adf723816a5/cli/src/commands/mod.rs)         |
| 全局参数         | [cli_util.rs](https://github.com/jj-vcs/jj/blob/7c41cdeb16b6b321c64e789a966b6adf723816a5/cli/src/cli_util.rs)                 |
| 差异格式选项       | [diff_util.rs](https://github.com/jj-vcs/jj/blob/7c41cdeb16b6b321c64e789a966b6adf723816a5/cli/src/diff_util.rs)               |
| revset 默认值   | [config/revsets.toml](https://github.com/jj-vcs/jj/blob/7c41cdeb16b6b321c64e789a966b6adf723816a5/cli/src/config/revsets.toml) |
| 默认别名及其他配置    | [config/misc.toml](https://github.com/jj-vcs/jj/blob/7c41cdeb16b6b321c64e789a966b6adf723816a5/cli/src/config/misc.toml)       |
| debug 树      | [debug/mod.rs](https://github.com/jj-vcs/jj/blob/7c41cdeb16b6b321c64e789a966b6adf723816a5/cli/src/commands/debug/mod.rs)      |
| bench 树和通用参数 | [bench/mod.rs](https://github.com/jj-vcs/jj/blob/7c41cdeb16b6b321c64e789a966b6adf723816a5/cli/src/commands/bench/mod.rs)      |

## 全命令源码定位表

表中每个文件链接是定位入口，不代表对该文件的所有实现行进行过独立审计。

| 命令                                      | 类别          | 源码                                                                                                                                                                        |
| --------------------------------------- | ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `jj`                                    | 公开          | [cli/src/commands/mod.rs](https://github.com/jj-vcs/jj/blob/7c41cdeb16b6b321c64e789a966b6adf723816a5/cli/src/commands/mod.rs)                                             |
| `jj abandon`                            | 公开          | [cli/src/commands/abandon.rs](https://github.com/jj-vcs/jj/blob/7c41cdeb16b6b321c64e789a966b6adf723816a5/cli/src/commands/abandon.rs)                                     |
| `jj absorb`                             | 公开          | [cli/src/commands/absorb.rs](https://github.com/jj-vcs/jj/blob/7c41cdeb16b6b321c64e789a966b6adf723816a5/cli/src/commands/absorb.rs)                                       |
| `jj arrange`                            | 公开          | [cli/src/commands/arrange.rs](https://github.com/jj-vcs/jj/blob/7c41cdeb16b6b321c64e789a966b6adf723816a5/cli/src/commands/arrange.rs)                                     |
| `jj bisect`                             | 公开          | [cli/src/commands/bisect/mod.rs](https://github.com/jj-vcs/jj/blob/7c41cdeb16b6b321c64e789a966b6adf723816a5/cli/src/commands/bisect/mod.rs)                               |
| `jj bisect run`                         | 公开          | [cli/src/commands/bisect/run.rs](https://github.com/jj-vcs/jj/blob/7c41cdeb16b6b321c64e789a966b6adf723816a5/cli/src/commands/bisect/run.rs)                               |
| `jj bookmark`                           | 公开          | [cli/src/commands/bookmark/mod.rs](https://github.com/jj-vcs/jj/blob/7c41cdeb16b6b321c64e789a966b6adf723816a5/cli/src/commands/bookmark/mod.rs)                           |
| `jj bookmark advance`                   | 公开          | [cli/src/commands/bookmark/advance.rs](https://github.com/jj-vcs/jj/blob/7c41cdeb16b6b321c64e789a966b6adf723816a5/cli/src/commands/bookmark/advance.rs)                   |
| `jj bookmark create`                    | 公开          | [cli/src/commands/bookmark/create.rs](https://github.com/jj-vcs/jj/blob/7c41cdeb16b6b321c64e789a966b6adf723816a5/cli/src/commands/bookmark/create.rs)                     |
| `jj bookmark delete`                    | 公开          | [cli/src/commands/bookmark/delete.rs](https://github.com/jj-vcs/jj/blob/7c41cdeb16b6b321c64e789a966b6adf723816a5/cli/src/commands/bookmark/delete.rs)                     |
| `jj bookmark forget`                    | 公开          | [cli/src/commands/bookmark/forget.rs](https://github.com/jj-vcs/jj/blob/7c41cdeb16b6b321c64e789a966b6adf723816a5/cli/src/commands/bookmark/forget.rs)                     |
| `jj bookmark list`                      | 公开          | [cli/src/commands/bookmark/list.rs](https://github.com/jj-vcs/jj/blob/7c41cdeb16b6b321c64e789a966b6adf723816a5/cli/src/commands/bookmark/list.rs)                         |
| `jj bookmark move`                      | 公开          | [cli/src/commands/bookmark/move.rs](https://github.com/jj-vcs/jj/blob/7c41cdeb16b6b321c64e789a966b6adf723816a5/cli/src/commands/bookmark/move.rs)                         |
| `jj bookmark rename`                    | 公开          | [cli/src/commands/bookmark/rename.rs](https://github.com/jj-vcs/jj/blob/7c41cdeb16b6b321c64e789a966b6adf723816a5/cli/src/commands/bookmark/rename.rs)                     |
| `jj bookmark set`                       | 公开          | [cli/src/commands/bookmark/set.rs](https://github.com/jj-vcs/jj/blob/7c41cdeb16b6b321c64e789a966b6adf723816a5/cli/src/commands/bookmark/set.rs)                           |
| `jj bookmark track`                     | 公开          | [cli/src/commands/bookmark/track.rs](https://github.com/jj-vcs/jj/blob/7c41cdeb16b6b321c64e789a966b6adf723816a5/cli/src/commands/bookmark/track.rs)                       |
| `jj bookmark untrack`                   | 公开          | [cli/src/commands/bookmark/untrack.rs](https://github.com/jj-vcs/jj/blob/7c41cdeb16b6b321c64e789a966b6adf723816a5/cli/src/commands/bookmark/untrack.rs)                   |
| `jj commit`                             | 公开          | [cli/src/commands/commit.rs](https://github.com/jj-vcs/jj/blob/7c41cdeb16b6b321c64e789a966b6adf723816a5/cli/src/commands/commit.rs)                                       |
| `jj config`                             | 公开          | [cli/src/commands/config/mod.rs](https://github.com/jj-vcs/jj/blob/7c41cdeb16b6b321c64e789a966b6adf723816a5/cli/src/commands/config/mod.rs)                               |
| `jj config edit`                        | 公开          | [cli/src/commands/config/edit.rs](https://github.com/jj-vcs/jj/blob/7c41cdeb16b6b321c64e789a966b6adf723816a5/cli/src/commands/config/edit.rs)                             |
| `jj config gc`                          | 公开          | [cli/src/commands/config/gc.rs](https://github.com/jj-vcs/jj/blob/7c41cdeb16b6b321c64e789a966b6adf723816a5/cli/src/commands/config/gc.rs)                                 |
| `jj config get`                         | 公开          | [cli/src/commands/config/get.rs](https://github.com/jj-vcs/jj/blob/7c41cdeb16b6b321c64e789a966b6adf723816a5/cli/src/commands/config/get.rs)                               |
| `jj config list`                        | 公开          | [cli/src/commands/config/list.rs](https://github.com/jj-vcs/jj/blob/7c41cdeb16b6b321c64e789a966b6adf723816a5/cli/src/commands/config/list.rs)                             |
| `jj config path`                        | 公开          | [cli/src/commands/config/path.rs](https://github.com/jj-vcs/jj/blob/7c41cdeb16b6b321c64e789a966b6adf723816a5/cli/src/commands/config/path.rs)                             |
| `jj config set`                         | 公开          | [cli/src/commands/config/set.rs](https://github.com/jj-vcs/jj/blob/7c41cdeb16b6b321c64e789a966b6adf723816a5/cli/src/commands/config/set.rs)                               |
| `jj config unset`                       | 公开          | [cli/src/commands/config/unset.rs](https://github.com/jj-vcs/jj/blob/7c41cdeb16b6b321c64e789a966b6adf723816a5/cli/src/commands/config/unset.rs)                           |
| `jj converge`                           | 公开          | [cli/src/commands/converge.rs](https://github.com/jj-vcs/jj/blob/7c41cdeb16b6b321c64e789a966b6adf723816a5/cli/src/commands/converge.rs)                                   |
| `jj describe`                           | 公开          | [cli/src/commands/describe.rs](https://github.com/jj-vcs/jj/blob/7c41cdeb16b6b321c64e789a966b6adf723816a5/cli/src/commands/describe.rs)                                   |
| `jj diff`                               | 公开          | [cli/src/commands/diff.rs](https://github.com/jj-vcs/jj/blob/7c41cdeb16b6b321c64e789a966b6adf723816a5/cli/src/commands/diff.rs)                                           |
| `jj diffedit`                           | 公开          | [cli/src/commands/diffedit.rs](https://github.com/jj-vcs/jj/blob/7c41cdeb16b6b321c64e789a966b6adf723816a5/cli/src/commands/diffedit.rs)                                   |
| `jj duplicate`                          | 公开          | [cli/src/commands/duplicate.rs](https://github.com/jj-vcs/jj/blob/7c41cdeb16b6b321c64e789a966b6adf723816a5/cli/src/commands/duplicate.rs)                                 |
| `jj edit`                               | 公开          | [cli/src/commands/edit.rs](https://github.com/jj-vcs/jj/blob/7c41cdeb16b6b321c64e789a966b6adf723816a5/cli/src/commands/edit.rs)                                           |
| `jj evolog`                             | 公开          | [cli/src/commands/evolog.rs](https://github.com/jj-vcs/jj/blob/7c41cdeb16b6b321c64e789a966b6adf723816a5/cli/src/commands/evolog.rs)                                       |
| `jj file`                               | 公开          | [cli/src/commands/file/mod.rs](https://github.com/jj-vcs/jj/blob/7c41cdeb16b6b321c64e789a966b6adf723816a5/cli/src/commands/file/mod.rs)                                   |
| `jj file annotate`                      | 公开          | [cli/src/commands/file/annotate.rs](https://github.com/jj-vcs/jj/blob/7c41cdeb16b6b321c64e789a966b6adf723816a5/cli/src/commands/file/annotate.rs)                         |
| `jj file chmod`                         | 公开          | [cli/src/commands/file/chmod.rs](https://github.com/jj-vcs/jj/blob/7c41cdeb16b6b321c64e789a966b6adf723816a5/cli/src/commands/file/chmod.rs)                               |
| `jj file list`                          | 公开          | [cli/src/commands/file/list.rs](https://github.com/jj-vcs/jj/blob/7c41cdeb16b6b321c64e789a966b6adf723816a5/cli/src/commands/file/list.rs)                                 |
| `jj file search`                        | 公开          | [cli/src/commands/file/search.rs](https://github.com/jj-vcs/jj/blob/7c41cdeb16b6b321c64e789a966b6adf723816a5/cli/src/commands/file/search.rs)                             |
| `jj file show`                          | 公开          | [cli/src/commands/file/show.rs](https://github.com/jj-vcs/jj/blob/7c41cdeb16b6b321c64e789a966b6adf723816a5/cli/src/commands/file/show.rs)                                 |
| `jj file track`                         | 公开          | [cli/src/commands/file/track.rs](https://github.com/jj-vcs/jj/blob/7c41cdeb16b6b321c64e789a966b6adf723816a5/cli/src/commands/file/track.rs)                               |
| `jj file untrack`                       | 公开          | [cli/src/commands/file/untrack.rs](https://github.com/jj-vcs/jj/blob/7c41cdeb16b6b321c64e789a966b6adf723816a5/cli/src/commands/file/untrack.rs)                           |
| `jj fix`                                | 公开          | [cli/src/commands/fix.rs](https://github.com/jj-vcs/jj/blob/7c41cdeb16b6b321c64e789a966b6adf723816a5/cli/src/commands/fix.rs)                                             |
| `jj gerrit`                             | 公开          | [cli/src/commands/gerrit/mod.rs](https://github.com/jj-vcs/jj/blob/7c41cdeb16b6b321c64e789a966b6adf723816a5/cli/src/commands/gerrit/mod.rs)                               |
| `jj gerrit upload`                      | 公开          | [cli/src/commands/gerrit/upload.rs](https://github.com/jj-vcs/jj/blob/7c41cdeb16b6b321c64e789a966b6adf723816a5/cli/src/commands/gerrit/upload.rs)                         |
| `jj git`                                | 公开          | [cli/src/commands/git/mod.rs](https://github.com/jj-vcs/jj/blob/7c41cdeb16b6b321c64e789a966b6adf723816a5/cli/src/commands/git/mod.rs)                                     |
| `jj git clone`                          | 公开          | [cli/src/commands/git/clone.rs](https://github.com/jj-vcs/jj/blob/7c41cdeb16b6b321c64e789a966b6adf723816a5/cli/src/commands/git/clone.rs)                                 |
| `jj git colocation`                     | 公开          | [cli/src/commands/git/colocation.rs](https://github.com/jj-vcs/jj/blob/7c41cdeb16b6b321c64e789a966b6adf723816a5/cli/src/commands/git/colocation.rs)                       |
| `jj git colocation disable`             | 公开          | [cli/src/commands/git/colocation.rs](https://github.com/jj-vcs/jj/blob/7c41cdeb16b6b321c64e789a966b6adf723816a5/cli/src/commands/git/colocation.rs)                       |
| `jj git colocation enable`              | 公开          | [cli/src/commands/git/colocation.rs](https://github.com/jj-vcs/jj/blob/7c41cdeb16b6b321c64e789a966b6adf723816a5/cli/src/commands/git/colocation.rs)                       |
| `jj git colocation status`              | 公开          | [cli/src/commands/git/colocation.rs](https://github.com/jj-vcs/jj/blob/7c41cdeb16b6b321c64e789a966b6adf723816a5/cli/src/commands/git/colocation.rs)                       |
| `jj git export`                         | 公开          | [cli/src/commands/git/export.rs](https://github.com/jj-vcs/jj/blob/7c41cdeb16b6b321c64e789a966b6adf723816a5/cli/src/commands/git/export.rs)                               |
| `jj git fetch`                          | 公开          | [cli/src/commands/git/fetch.rs](https://github.com/jj-vcs/jj/blob/7c41cdeb16b6b321c64e789a966b6adf723816a5/cli/src/commands/git/fetch.rs)                                 |
| `jj git import`                         | 公开          | [cli/src/commands/git/import.rs](https://github.com/jj-vcs/jj/blob/7c41cdeb16b6b321c64e789a966b6adf723816a5/cli/src/commands/git/import.rs)                               |
| `jj git init`                           | 公开          | [cli/src/commands/git/init.rs](https://github.com/jj-vcs/jj/blob/7c41cdeb16b6b321c64e789a966b6adf723816a5/cli/src/commands/git/init.rs)                                   |
| `jj git push`                           | 公开          | [cli/src/commands/git/push.rs](https://github.com/jj-vcs/jj/blob/7c41cdeb16b6b321c64e789a966b6adf723816a5/cli/src/commands/git/push.rs)                                   |
| `jj git remote`                         | 公开          | [cli/src/commands/git/remote/mod.rs](https://github.com/jj-vcs/jj/blob/7c41cdeb16b6b321c64e789a966b6adf723816a5/cli/src/commands/git/remote/mod.rs)                       |
| `jj git remote add`                     | 公开          | [cli/src/commands/git/remote/add.rs](https://github.com/jj-vcs/jj/blob/7c41cdeb16b6b321c64e789a966b6adf723816a5/cli/src/commands/git/remote/add.rs)                       |
| `jj git remote list`                    | 公开          | [cli/src/commands/git/remote/list.rs](https://github.com/jj-vcs/jj/blob/7c41cdeb16b6b321c64e789a966b6adf723816a5/cli/src/commands/git/remote/list.rs)                     |
| `jj git remote remove`                  | 公开          | [cli/src/commands/git/remote/remove.rs](https://github.com/jj-vcs/jj/blob/7c41cdeb16b6b321c64e789a966b6adf723816a5/cli/src/commands/git/remote/remove.rs)                 |
| `jj git remote rename`                  | 公开          | [cli/src/commands/git/remote/rename.rs](https://github.com/jj-vcs/jj/blob/7c41cdeb16b6b321c64e789a966b6adf723816a5/cli/src/commands/git/remote/rename.rs)                 |
| `jj git remote set-url`                 | 公开          | [cli/src/commands/git/remote/set_url.rs](https://github.com/jj-vcs/jj/blob/7c41cdeb16b6b321c64e789a966b6adf723816a5/cli/src/commands/git/remote/set_url.rs)               |
| `jj git root`                           | 公开          | [cli/src/commands/git/root.rs](https://github.com/jj-vcs/jj/blob/7c41cdeb16b6b321c64e789a966b6adf723816a5/cli/src/commands/git/root.rs)                                   |
| `jj help`                               | 公开          | [cli/src/commands/help.rs](https://github.com/jj-vcs/jj/blob/7c41cdeb16b6b321c64e789a966b6adf723816a5/cli/src/commands/help.rs)                                           |
| `jj interdiff`                          | 公开          | [cli/src/commands/interdiff.rs](https://github.com/jj-vcs/jj/blob/7c41cdeb16b6b321c64e789a966b6adf723816a5/cli/src/commands/interdiff.rs)                                 |
| `jj log`                                | 公开          | [cli/src/commands/log.rs](https://github.com/jj-vcs/jj/blob/7c41cdeb16b6b321c64e789a966b6adf723816a5/cli/src/commands/log.rs)                                             |
| `jj metaedit`                           | 公开          | [cli/src/commands/metaedit.rs](https://github.com/jj-vcs/jj/blob/7c41cdeb16b6b321c64e789a966b6adf723816a5/cli/src/commands/metaedit.rs)                                   |
| `jj new`                                | 公开          | [cli/src/commands/new.rs](https://github.com/jj-vcs/jj/blob/7c41cdeb16b6b321c64e789a966b6adf723816a5/cli/src/commands/new.rs)                                             |
| `jj next`                               | 公开          | [cli/src/commands/next.rs](https://github.com/jj-vcs/jj/blob/7c41cdeb16b6b321c64e789a966b6adf723816a5/cli/src/commands/next.rs)                                           |
| `jj operation`                          | 公开          | [cli/src/commands/operation/mod.rs](https://github.com/jj-vcs/jj/blob/7c41cdeb16b6b321c64e789a966b6adf723816a5/cli/src/commands/operation/mod.rs)                         |
| `jj operation abandon`                  | 公开          | [cli/src/commands/operation/abandon.rs](https://github.com/jj-vcs/jj/blob/7c41cdeb16b6b321c64e789a966b6adf723816a5/cli/src/commands/operation/abandon.rs)                 |
| `jj operation diff`                     | 公开          | [cli/src/commands/operation/diff.rs](https://github.com/jj-vcs/jj/blob/7c41cdeb16b6b321c64e789a966b6adf723816a5/cli/src/commands/operation/diff.rs)                       |
| `jj operation integrate`                | 公开          | [cli/src/commands/operation/integrate.rs](https://github.com/jj-vcs/jj/blob/7c41cdeb16b6b321c64e789a966b6adf723816a5/cli/src/commands/operation/integrate.rs)             |
| `jj operation log`                      | 公开          | [cli/src/commands/operation/log.rs](https://github.com/jj-vcs/jj/blob/7c41cdeb16b6b321c64e789a966b6adf723816a5/cli/src/commands/operation/log.rs)                         |
| `jj operation restore`                  | 公开          | [cli/src/commands/operation/restore.rs](https://github.com/jj-vcs/jj/blob/7c41cdeb16b6b321c64e789a966b6adf723816a5/cli/src/commands/operation/restore.rs)                 |
| `jj operation revert`                   | 公开          | [cli/src/commands/operation/revert.rs](https://github.com/jj-vcs/jj/blob/7c41cdeb16b6b321c64e789a966b6adf723816a5/cli/src/commands/operation/revert.rs)                   |
| `jj operation show`                     | 公开          | [cli/src/commands/operation/show.rs](https://github.com/jj-vcs/jj/blob/7c41cdeb16b6b321c64e789a966b6adf723816a5/cli/src/commands/operation/show.rs)                       |
| `jj parallelize`                        | 公开          | [cli/src/commands/parallelize.rs](https://github.com/jj-vcs/jj/blob/7c41cdeb16b6b321c64e789a966b6adf723816a5/cli/src/commands/parallelize.rs)                             |
| `jj prev`                               | 公开          | [cli/src/commands/prev.rs](https://github.com/jj-vcs/jj/blob/7c41cdeb16b6b321c64e789a966b6adf723816a5/cli/src/commands/prev.rs)                                           |
| `jj rebase`                             | 公开          | [cli/src/commands/rebase.rs](https://github.com/jj-vcs/jj/blob/7c41cdeb16b6b321c64e789a966b6adf723816a5/cli/src/commands/rebase.rs)                                       |
| `jj redo`                               | 公开          | [cli/src/commands/redo.rs](https://github.com/jj-vcs/jj/blob/7c41cdeb16b6b321c64e789a966b6adf723816a5/cli/src/commands/redo.rs)                                           |
| `jj resolve`                            | 公开          | [cli/src/commands/resolve.rs](https://github.com/jj-vcs/jj/blob/7c41cdeb16b6b321c64e789a966b6adf723816a5/cli/src/commands/resolve.rs)                                     |
| `jj restore`                            | 公开          | [cli/src/commands/restore.rs](https://github.com/jj-vcs/jj/blob/7c41cdeb16b6b321c64e789a966b6adf723816a5/cli/src/commands/restore.rs)                                     |
| `jj revert`                             | 公开          | [cli/src/commands/revert.rs](https://github.com/jj-vcs/jj/blob/7c41cdeb16b6b321c64e789a966b6adf723816a5/cli/src/commands/revert.rs)                                       |
| `jj root`                               | 公开          | [cli/src/commands/root.rs](https://github.com/jj-vcs/jj/blob/7c41cdeb16b6b321c64e789a966b6adf723816a5/cli/src/commands/root.rs)                                           |
| `jj run`                                | 公开          | [cli/src/commands/run.rs](https://github.com/jj-vcs/jj/blob/7c41cdeb16b6b321c64e789a966b6adf723816a5/cli/src/commands/run.rs)                                             |
| `jj show`                               | 公开          | [cli/src/commands/show.rs](https://github.com/jj-vcs/jj/blob/7c41cdeb16b6b321c64e789a966b6adf723816a5/cli/src/commands/show.rs)                                           |
| `jj sign`                               | 公开          | [cli/src/commands/sign.rs](https://github.com/jj-vcs/jj/blob/7c41cdeb16b6b321c64e789a966b6adf723816a5/cli/src/commands/sign.rs)                                           |
| `jj simplify-parents`                   | 公开          | [cli/src/commands/simplify_parents.rs](https://github.com/jj-vcs/jj/blob/7c41cdeb16b6b321c64e789a966b6adf723816a5/cli/src/commands/simplify_parents.rs)                   |
| `jj sparse`                             | 公开          | [cli/src/commands/sparse/mod.rs](https://github.com/jj-vcs/jj/blob/7c41cdeb16b6b321c64e789a966b6adf723816a5/cli/src/commands/sparse/mod.rs)                               |
| `jj sparse edit`                        | 公开          | [cli/src/commands/sparse/edit.rs](https://github.com/jj-vcs/jj/blob/7c41cdeb16b6b321c64e789a966b6adf723816a5/cli/src/commands/sparse/edit.rs)                             |
| `jj sparse list`                        | 公开          | [cli/src/commands/sparse/list.rs](https://github.com/jj-vcs/jj/blob/7c41cdeb16b6b321c64e789a966b6adf723816a5/cli/src/commands/sparse/list.rs)                             |
| `jj sparse reset`                       | 公开          | [cli/src/commands/sparse/reset.rs](https://github.com/jj-vcs/jj/blob/7c41cdeb16b6b321c64e789a966b6adf723816a5/cli/src/commands/sparse/reset.rs)                           |
| `jj sparse set`                         | 公开          | [cli/src/commands/sparse/set.rs](https://github.com/jj-vcs/jj/blob/7c41cdeb16b6b321c64e789a966b6adf723816a5/cli/src/commands/sparse/set.rs)                               |
| `jj split`                              | 公开          | [cli/src/commands/split.rs](https://github.com/jj-vcs/jj/blob/7c41cdeb16b6b321c64e789a966b6adf723816a5/cli/src/commands/split.rs)                                         |
| `jj squash`                             | 公开          | [cli/src/commands/squash.rs](https://github.com/jj-vcs/jj/blob/7c41cdeb16b6b321c64e789a966b6adf723816a5/cli/src/commands/squash.rs)                                       |
| `jj status`                             | 公开          | [cli/src/commands/status.rs](https://github.com/jj-vcs/jj/blob/7c41cdeb16b6b321c64e789a966b6adf723816a5/cli/src/commands/status.rs)                                       |
| `jj tag`                                | 公开          | [cli/src/commands/tag/mod.rs](https://github.com/jj-vcs/jj/blob/7c41cdeb16b6b321c64e789a966b6adf723816a5/cli/src/commands/tag/mod.rs)                                     |
| `jj tag delete`                         | 公开          | [cli/src/commands/tag/delete.rs](https://github.com/jj-vcs/jj/blob/7c41cdeb16b6b321c64e789a966b6adf723816a5/cli/src/commands/tag/delete.rs)                               |
| `jj tag list`                           | 公开          | [cli/src/commands/tag/list.rs](https://github.com/jj-vcs/jj/blob/7c41cdeb16b6b321c64e789a966b6adf723816a5/cli/src/commands/tag/list.rs)                                   |
| `jj tag set`                            | 公开          | [cli/src/commands/tag/set.rs](https://github.com/jj-vcs/jj/blob/7c41cdeb16b6b321c64e789a966b6adf723816a5/cli/src/commands/tag/set.rs)                                     |
| `jj tag track`                          | 公开          | [cli/src/commands/tag/track.rs](https://github.com/jj-vcs/jj/blob/7c41cdeb16b6b321c64e789a966b6adf723816a5/cli/src/commands/tag/track.rs)                                 |
| `jj tag untrack`                        | 公开          | [cli/src/commands/tag/untrack.rs](https://github.com/jj-vcs/jj/blob/7c41cdeb16b6b321c64e789a966b6adf723816a5/cli/src/commands/tag/untrack.rs)                             |
| `jj undo`                               | 公开          | [cli/src/commands/undo.rs](https://github.com/jj-vcs/jj/blob/7c41cdeb16b6b321c64e789a966b6adf723816a5/cli/src/commands/undo.rs)                                           |
| `jj unsign`                             | 公开          | [cli/src/commands/unsign.rs](https://github.com/jj-vcs/jj/blob/7c41cdeb16b6b321c64e789a966b6adf723816a5/cli/src/commands/unsign.rs)                                       |
| `jj util`                               | 公开          | [cli/src/commands/util/mod.rs](https://github.com/jj-vcs/jj/blob/7c41cdeb16b6b321c64e789a966b6adf723816a5/cli/src/commands/util/mod.rs)                                   |
| `jj util backend`                       | 公开          | [cli/src/commands/util/backend/mod.rs](https://github.com/jj-vcs/jj/blob/7c41cdeb16b6b321c64e789a966b6adf723816a5/cli/src/commands/util/backend/mod.rs)                   |
| `jj util backend name`                  | 公开          | [cli/src/commands/util/backend/name.rs](https://github.com/jj-vcs/jj/blob/7c41cdeb16b6b321c64e789a966b6adf723816a5/cli/src/commands/util/backend/name.rs)                 |
| `jj util completion`                    | 公开          | [cli/src/commands/util/completion.rs](https://github.com/jj-vcs/jj/blob/7c41cdeb16b6b321c64e789a966b6adf723816a5/cli/src/commands/util/completion.rs)                     |
| `jj util config-schema`                 | 公开          | [cli/src/commands/util/config_schema.rs](https://github.com/jj-vcs/jj/blob/7c41cdeb16b6b321c64e789a966b6adf723816a5/cli/src/commands/util/config_schema.rs)               |
| `jj util exec`                          | 公开          | [cli/src/commands/util/exec.rs](https://github.com/jj-vcs/jj/blob/7c41cdeb16b6b321c64e789a966b6adf723816a5/cli/src/commands/util/exec.rs)                                 |
| `jj util gc`                            | 公开          | [cli/src/commands/util/gc.rs](https://github.com/jj-vcs/jj/blob/7c41cdeb16b6b321c64e789a966b6adf723816a5/cli/src/commands/util/gc.rs)                                     |
| `jj util install-man-pages`             | 公开          | [cli/src/commands/util/install_man_pages.rs](https://github.com/jj-vcs/jj/blob/7c41cdeb16b6b321c64e789a966b6adf723816a5/cli/src/commands/util/install_man_pages.rs)       |
| `jj util markdown-help`                 | 公开          | [cli/src/commands/util/markdown_help.rs](https://github.com/jj-vcs/jj/blob/7c41cdeb16b6b321c64e789a966b6adf723816a5/cli/src/commands/util/markdown_help.rs)               |
| `jj util snapshot`                      | 公开          | [cli/src/commands/util/snapshot.rs](https://github.com/jj-vcs/jj/blob/7c41cdeb16b6b321c64e789a966b6adf723816a5/cli/src/commands/util/snapshot.rs)                         |
| `jj version`                            | 公开          | [cli/src/commands/version.rs](https://github.com/jj-vcs/jj/blob/7c41cdeb16b6b321c64e789a966b6adf723816a5/cli/src/commands/version.rs)                                     |
| `jj workspace`                          | 公开          | [cli/src/commands/workspace/mod.rs](https://github.com/jj-vcs/jj/blob/7c41cdeb16b6b321c64e789a966b6adf723816a5/cli/src/commands/workspace/mod.rs)                         |
| `jj workspace add`                      | 公开          | [cli/src/commands/workspace/add.rs](https://github.com/jj-vcs/jj/blob/7c41cdeb16b6b321c64e789a966b6adf723816a5/cli/src/commands/workspace/add.rs)                         |
| `jj workspace forget`                   | 公开          | [cli/src/commands/workspace/forget.rs](https://github.com/jj-vcs/jj/blob/7c41cdeb16b6b321c64e789a966b6adf723816a5/cli/src/commands/workspace/forget.rs)                   |
| `jj workspace list`                     | 公开          | [cli/src/commands/workspace/list.rs](https://github.com/jj-vcs/jj/blob/7c41cdeb16b6b321c64e789a966b6adf723816a5/cli/src/commands/workspace/list.rs)                       |
| `jj workspace rename`                   | 公开          | [cli/src/commands/workspace/rename.rs](https://github.com/jj-vcs/jj/blob/7c41cdeb16b6b321c64e789a966b6adf723816a5/cli/src/commands/workspace/rename.rs)                   |
| `jj workspace root`                     | 公开          | [cli/src/commands/workspace/root.rs](https://github.com/jj-vcs/jj/blob/7c41cdeb16b6b321c64e789a966b6adf723816a5/cli/src/commands/workspace/root.rs)                       |
| `jj workspace update-stale`             | 公开          | [cli/src/commands/workspace/update_stale.rs](https://github.com/jj-vcs/jj/blob/7c41cdeb16b6b321c64e789a966b6adf723816a5/cli/src/commands/workspace/update_stale.rs)       |
| `jj debug`                              | 隐藏 / 开发者    | [cli/src/commands/debug/mod.rs](https://github.com/jj-vcs/jj/blob/7c41cdeb16b6b321c64e789a966b6adf723816a5/cli/src/commands/debug/mod.rs)                                 |
| `jj debug copy-detection`               | 隐藏 / 开发者    | [cli/src/commands/debug/copy_detection.rs](https://github.com/jj-vcs/jj/blob/7c41cdeb16b6b321c64e789a966b6adf723816a5/cli/src/commands/debug/copy_detection.rs)           |
| `jj debug fileset`                      | 隐藏 / 开发者    | [cli/src/commands/debug/fileset.rs](https://github.com/jj-vcs/jj/blob/7c41cdeb16b6b321c64e789a966b6adf723816a5/cli/src/commands/debug/fileset.rs)                         |
| `jj debug index`                        | 隐藏 / 开发者    | [cli/src/commands/debug/index.rs](https://github.com/jj-vcs/jj/blob/7c41cdeb16b6b321c64e789a966b6adf723816a5/cli/src/commands/debug/index.rs)                             |
| `jj debug index-changed-paths`          | 隐藏 / 开发者    | [cli/src/commands/debug/index_changed_paths.rs](https://github.com/jj-vcs/jj/blob/7c41cdeb16b6b321c64e789a966b6adf723816a5/cli/src/commands/debug/index_changed_paths.rs) |
| `jj debug init-simple`                  | 隐藏 / 开发者    | [cli/src/commands/debug/init_simple.rs](https://github.com/jj-vcs/jj/blob/7c41cdeb16b6b321c64e789a966b6adf723816a5/cli/src/commands/debug/init_simple.rs)                 |
| `jj debug local-working-copy`           | 隐藏 / 开发者    | [cli/src/commands/debug/local_working_copy.rs](https://github.com/jj-vcs/jj/blob/7c41cdeb16b6b321c64e789a966b6adf723816a5/cli/src/commands/debug/local_working_copy.rs)   |
| `jj debug object`                       | 隐藏 / 开发者    | [cli/src/commands/debug/object.rs](https://github.com/jj-vcs/jj/blob/7c41cdeb16b6b321c64e789a966b6adf723816a5/cli/src/commands/debug/object.rs)                           |
| `jj debug object commit`                | 隐藏 / 开发者    | [cli/src/commands/debug/object.rs](https://github.com/jj-vcs/jj/blob/7c41cdeb16b6b321c64e789a966b6adf723816a5/cli/src/commands/debug/object.rs)                           |
| `jj debug object file`                  | 隐藏 / 开发者    | [cli/src/commands/debug/object.rs](https://github.com/jj-vcs/jj/blob/7c41cdeb16b6b321c64e789a966b6adf723816a5/cli/src/commands/debug/object.rs)                           |
| `jj debug object operation`             | 隐藏 / 开发者    | [cli/src/commands/debug/object.rs](https://github.com/jj-vcs/jj/blob/7c41cdeb16b6b321c64e789a966b6adf723816a5/cli/src/commands/debug/object.rs)                           |
| `jj debug object symlink`               | 隐藏 / 开发者    | [cli/src/commands/debug/object.rs](https://github.com/jj-vcs/jj/blob/7c41cdeb16b6b321c64e789a966b6adf723816a5/cli/src/commands/debug/object.rs)                           |
| `jj debug object tree`                  | 隐藏 / 开发者    | [cli/src/commands/debug/object.rs](https://github.com/jj-vcs/jj/blob/7c41cdeb16b6b321c64e789a966b6adf723816a5/cli/src/commands/debug/object.rs)                           |
| `jj debug object view`                  | 隐藏 / 开发者    | [cli/src/commands/debug/object.rs](https://github.com/jj-vcs/jj/blob/7c41cdeb16b6b321c64e789a966b6adf723816a5/cli/src/commands/debug/object.rs)                           |
| `jj debug reindex`                      | 隐藏 / 开发者    | [cli/src/commands/debug/reindex.rs](https://github.com/jj-vcs/jj/blob/7c41cdeb16b6b321c64e789a966b6adf723816a5/cli/src/commands/debug/reindex.rs)                         |
| `jj debug revset`                       | 隐藏 / 开发者    | [cli/src/commands/debug/revset.rs](https://github.com/jj-vcs/jj/blob/7c41cdeb16b6b321c64e789a966b6adf723816a5/cli/src/commands/debug/revset.rs)                           |
| `jj debug snapshot`                     | 隐藏 / 开发者    | [cli/src/commands/debug/snapshot.rs](https://github.com/jj-vcs/jj/blob/7c41cdeb16b6b321c64e789a966b6adf723816a5/cli/src/commands/debug/snapshot.rs)                       |
| `jj debug stacked-table`                | 隐藏 / 开发者    | [cli/src/commands/debug/stacked_table.rs](https://github.com/jj-vcs/jj/blob/7c41cdeb16b6b321c64e789a966b6adf723816a5/cli/src/commands/debug/stacked_table.rs)             |
| `jj debug template`                     | 隐藏 / 开发者    | [cli/src/commands/debug/template.rs](https://github.com/jj-vcs/jj/blob/7c41cdeb16b6b321c64e789a966b6adf723816a5/cli/src/commands/debug/template.rs)                       |
| `jj debug tree`                         | 隐藏 / 开发者    | [cli/src/commands/debug/tree.rs](https://github.com/jj-vcs/jj/blob/7c41cdeb16b6b321c64e789a966b6adf723816a5/cli/src/commands/debug/tree.rs)                               |
| `jj debug watchman`                     | 隐藏 / 开发者    | [cli/src/commands/debug/watchman.rs](https://github.com/jj-vcs/jj/blob/7c41cdeb16b6b321c64e789a966b6adf723816a5/cli/src/commands/debug/watchman.rs)                       |
| `jj debug watchman query-changed-files` | 隐藏 / 开发者    | [cli/src/commands/debug/watchman.rs](https://github.com/jj-vcs/jj/blob/7c41cdeb16b6b321c64e789a966b6adf723816a5/cli/src/commands/debug/watchman.rs)                       |
| `jj debug watchman query-clock`         | 隐藏 / 开发者    | [cli/src/commands/debug/watchman.rs](https://github.com/jj-vcs/jj/blob/7c41cdeb16b6b321c64e789a966b6adf723816a5/cli/src/commands/debug/watchman.rs)                       |
| `jj debug watchman reset-clock`         | 隐藏 / 开发者    | [cli/src/commands/debug/watchman.rs](https://github.com/jj-vcs/jj/blob/7c41cdeb16b6b321c64e789a966b6adf723816a5/cli/src/commands/debug/watchman.rs)                       |
| `jj debug watchman status`              | 隐藏 / 开发者    | [cli/src/commands/debug/watchman.rs](https://github.com/jj-vcs/jj/blob/7c41cdeb16b6b321c64e789a966b6adf723816a5/cli/src/commands/debug/watchman.rs)                       |
| `jj debug working-copy`                 | 隐藏 / 开发者    | [cli/src/commands/debug/working_copy.rs](https://github.com/jj-vcs/jj/blob/7c41cdeb16b6b321c64e789a966b6adf723816a5/cli/src/commands/debug/working_copy.rs)               |
| `jj bench`                              | 条件编译 / 基准测试 | [cli/src/commands/bench/mod.rs](https://github.com/jj-vcs/jj/blob/7c41cdeb16b6b321c64e789a966b6adf723816a5/cli/src/commands/bench/mod.rs)                                 |
| `jj bench common-ancestors`             | 条件编译 / 基准测试 | [cli/src/commands/bench/common_ancestors.rs](https://github.com/jj-vcs/jj/blob/7c41cdeb16b6b321c64e789a966b6adf723816a5/cli/src/commands/bench/common_ancestors.rs)       |
| `jj bench is-ancestor`                  | 条件编译 / 基准测试 | [cli/src/commands/bench/is_ancestor.rs](https://github.com/jj-vcs/jj/blob/7c41cdeb16b6b321c64e789a966b6adf723816a5/cli/src/commands/bench/is_ancestor.rs)                 |
| `jj bench resolve-prefix`               | 条件编译 / 基准测试 | [cli/src/commands/bench/resolve_prefix.rs](https://github.com/jj-vcs/jj/blob/7c41cdeb16b6b321c64e789a966b6adf723816a5/cli/src/commands/bench/resolve_prefix.rs)           |
| `jj bench revset`                       | 条件编译 / 基准测试 | [cli/src/commands/bench/revset.rs](https://github.com/jj-vcs/jj/blob/7c41cdeb16b6b321c64e789a966b6adf723816a5/cli/src/commands/bench/revset.rs)                           |

## 如何与自己安装的版本对照

先运行 `jj --version`。若不是 0.45.1，差异可能是正常版本变化，不应通过猜测补齐参数。
`jj help git push` 或 `jj git push --help` 查看完整帮助；
`jj git push -h` 是短帮助。默认配置别名还可能被你的用户配置覆盖。

交付的 `export_help.py` 在临时空目录中调用版本和 help，
默认使用 JJ_CONFIG 指向空设备避免用户 aliases 改写命令路径。
它只抓取本手册命令路径，不自动发现未来新增命令；未编译的 bench/watchman 情况会记录状态。
导出脚本不是中文自动翻译器，也不是源码 AST 审计器。

***

## Revset 补充修订（2026-09-17）

新增 54 个文档函数、1 个仍注册的弃用兼容名、8 个默认别名、11 个 revsets 默认配置项、完整符号/运算符/模式与 20 个查询场景。CLI 命令表仍沿用原先的固定版本核对范围，不因本次扩充而声称全量重审。

| 旧写法或常见误解                       | v0.45.1 的状态 / 应如何写                                            |
| ------------------------------ | ------------------------------------------------------------- |
| `all:表达式`                      | 已移除；0.38.0 起不再支持。直接传合法集合表达式，是否允许多目标由该命令参数决定                   |
| `all()`                        | 仍是合法的全部集合函数，与上一行无关                                            |
| `diff_contains(text, files)`   | 仍注册，但会发弃用警告；改用 `diff_lines(text, files)`                      |
| `git_head()`                   | 0.43.0 已移除，不应写进本版函数清单                                         |
| `git_refs()`                   | 0.43.0 已移除；按意图使用 bookmarks/tags/remote\_\* 等，不存在对所有场景都等价的机械替换 |
| `refs/heads/main` 的 Git 风格符号解析 | 0.43.0 已移除这一特殊解析；用本地 `main` 或显式 `bookmarks(exact:"main")` 等   |
| `x^`                           | 不是当前父提交语法；改用 `x-`                                             |
| `x:y`、`:x`、`x:`                | 不是有效 DAG 范围；按含义改成 `x::y`、`::x`、`x::`                          |
| `x + y` / `x - y`              | 不是并集/差集；用 `x \| y` / `x ~ y`                                  |
| `HEAD~3`                       | 不要套 Git 祖先语法；如想当前工作提交往前三代，用 `@---` 或 `parents(@, 3)`          |
| `A...B`                        | 不要当成 jj 的内置对称差；用 `(A..B) \| (B..A)`                           |
| `description("fix")`           | 默认 glob，并非“包含 fix”；明确用 `description(substring:"fix")`         |
| 以 `mutable()` 判断“未推送”          | 不可靠；它是不可变策略的补集，不是远端状态                                         |
| 以 `signed()` 判断“可信签名”          | 不可靠；它仅判断签名存在                                                  |

共置 Git 工作区里，某些旧 `git_head()` 用途可以通过 `first_parent(@)` 表达，但不要把它当成适用于所有仓库状态的一对一替换。`HEAD` 也不是本参考承诺始终存在的内置别名；官方别名示例中的 HEAD 是用户自己配置的。

### 此次纠正上一份手册的内容

原 Revset 速查曾建议部分多修订操作可使用 `all:`。该建议不适用于固定的 v0.45.1，已从更新版 Markdown 和 HTML 中删除；TXT 也已追加相应版本警告。

函数注册表里的 `diff_contains` 仍映射到 `diff_lines`，尽管注释有 “Remove in jj 0.44+” 的 TODO。清单按**实际注册代码**而不是 TODO 的计划日期判断。

不是看到解析器里有一个 token 就说明语法可用：`^`、单冒号旧范围、二元 `+`/`-` 等在源码中可能只是为了给出更友好的迁移错误。

**Source / 来源：** [`CHANGELOG.md`](https://github.com/jj-vcs/jj/blob/7c41cdeb16b6b321c64e789a966b6adf723816a5/CHANGELOG.md) · [`lib/src/revset.rs`](https://github.com/jj-vcs/jj/blob/7c41cdeb16b6b321c64e789a966b6adf723816a5/lib/src/revset.rs#L1088-L1129) · [`lib/src/revset.pest`](https://github.com/jj-vcs/jj/blob/7c41cdeb16b6b321c64e789a966b6adf723816a5/lib/src/revset.pest) · [`lib/src/revset_parser.rs`](https://github.com/jj-vcs/jj/blob/7c41cdeb16b6b321c64e789a966b6adf723816a5/lib/src/revset_parser.rs)

**函数清单口径：** `docs/revsets.md` 的 Functions 部分列出 54 个正式文档名称；`lib/src/revset.rs` 的 `BUILTIN_FUNCTION_MAP` 另外保留 `diff_contains`，因此记录 55 个注册名称。弃用别名不是一种新的功能。默认配置中的 8 个 revset 别名单独列出，没有混进 55 的计数。

**交叉校对：** 函数签名与可选参数对照 Rust 注册代码；运算符对照解析器/grammar；日期边界对照 time_util；别名对照固定版本 TOML；显示符号对照模板与 CommitRef formatter；已移除语法对照 CHANGELOG。覆盖清单保存在 `revsets-functions.json`、`revsets-aliases.json` 和 `revsets-validation.json`。

| 源码文件                                               | 主要用途                               |
| -------------------------------------------------- | ---------------------------------- |
| `docs/revsets.md`                                  | 官方语言参考、函数签名、符号、示例                  |
| `lib/src/revset.rs`                                | 55 个注册名称、默认值、参数解析和求值               |
| `lib/src/revset_parser.rs` / `lib/src/revset.pest` | 优先级、语法、兼容错误诊断                      |
| `lib/src/dsl_util.rs`                              | 位置实参与命名实参检查                        |
| `cli/src/config/revsets.toml`                      | 8 个默认别名、11 个 revsets 配置键           |
| `cli/src/revset_util.rs`                           | CLI revset 求值、真正的不可变策略             |
| `lib/src/time_util.rs`                             | 日期边界、时区解析及测试                       |
| `docs/filesets.md`                                 | files()/diff_lines() 的 fileset 实参  |
| `docs/glossary.md`                                 | change offset、可见性、author/committer |
| `cli/src/config/templates.toml`                    | 日志节点、状态、签名与引用列表显示                  |
| `cli/src/commit_templater.rs`                      | 引用后缀 \* / ?? 的具体格式化                |
| `CHANGELOG.md`                                     | all:、git_head()/git_refs() 等移除记录   |

**未做的验证：** 没有在本环境安装或编译 jj，没有在实际仓库执行这些命令，没有保存一个经校验的上游完整源码快照。源码通过在线固定 tag 查阅；不把网页阅读说成本地 AST 全量审计。JSON 覆盖检查比较的是由源码逐项抄录的名称清单，DAG 示例测试使用独立集合模型。

HTML 的搜索、分类、锚点、移动端布局及无外部资源加载检查，属于文档本身的验证，不是 jj 命令行为测试。具体结果查看附带验证记录。

本补篇为非官方中文整理。上游项目归 The Jujutsu Authors 所有，采用 Apache-2.0；此处保留源码链接和来源说明。中文解释与工作示例为本次重述整理，不把可配置默认值宣传成永久不变的规范。

**Source / 来源：** [`docs/revsets.md`](https://github.com/jj-vcs/jj/blob/7c41cdeb16b6b321c64e789a966b6adf723816a5/docs/revsets.md) · [`lib/src/revset.rs`](https://github.com/jj-vcs/jj/blob/7c41cdeb16b6b321c64e789a966b6adf723816a5/lib/src/revset.rs) · [`lib/src/revset_parser.rs`](https://github.com/jj-vcs/jj/blob/7c41cdeb16b6b321c64e789a966b6adf723816a5/lib/src/revset_parser.rs) · [`lib/src/revset.pest`](https://github.com/jj-vcs/jj/blob/7c41cdeb16b6b321c64e789a966b6adf723816a5/lib/src/revset.pest) · [`lib/src/dsl_util.rs`](https://github.com/jj-vcs/jj/blob/7c41cdeb16b6b321c64e789a966b6adf723816a5/lib/src/dsl_util.rs) · [`cli/src/config/revsets.toml`](https://github.com/jj-vcs/jj/blob/7c41cdeb16b6b321c64e789a966b6adf723816a5/cli/src/config/revsets.toml) · [`cli/src/revset_util.rs`](https://github.com/jj-vcs/jj/blob/7c41cdeb16b6b321c64e789a966b6adf723816a5/cli/src/revset_util.rs) · [`lib/src/time_util.rs`](https://github.com/jj-vcs/jj/blob/7c41cdeb16b6b321c64e789a966b6adf723816a5/lib/src/time_util.rs) · [`docs/filesets.md`](https://github.com/jj-vcs/jj/blob/7c41cdeb16b6b321c64e789a966b6adf723816a5/docs/filesets.md) · [`docs/glossary.md`](https://github.com/jj-vcs/jj/blob/7c41cdeb16b6b321c64e789a966b6adf723816a5/docs/glossary.md) · [`cli/src/config/templates.toml`](https://github.com/jj-vcs/jj/blob/7c41cdeb16b6b321c64e789a966b6adf723816a5/cli/src/config/templates.toml) · [`cli/src/commit_templater.rs`](https://github.com/jj-vcs/jj/blob/7c41cdeb16b6b321c64e789a966b6adf723816a5/cli/src/commit_templater.rs) · [`CHANGELOG.md`](https://github.com/jj-vcs/jj/blob/7c41cdeb16b6b321c64e789a966b6adf723816a5/CHANGELOG.md)

## 令册首版迁移复核

本次迁移把 tag 解析为完整提交 SHA，并将实际使用的源码与上游仓库文档原文保存到 `upstream/source-extracts/`。每份原文的路径、固定提交 URL、SHA-256 和取得时间记录在 `upstream/source.lock.json`；它是所用文件集合，不是上游仓库的完整镜像。

结构检查覆盖全部迁移节点、参数说明与内部引用；行为复核范围和发现的修正详见[首版审核报告](https://github.com/zhangzhenxiang666/cli-fieldbook/blob/main/docs/AUDIT.md)。历史网页调研及其日期保留为出处背景，不用滚动 latest 证明当前固定版本。没有补写原始帮助、二进制运行日志或历史批准记录。示例和工作流仍未实测。
