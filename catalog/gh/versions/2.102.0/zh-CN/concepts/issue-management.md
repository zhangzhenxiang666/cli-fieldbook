---
title: 议题与日常管理
uses:
  - command:issue/close
  - command:issue/create
  - command:issue/delete
  - command:issue/develop
  - command:issue/list
  - command:issue/lock
  - command:issue/pin
  - command:issue/reopen
  - command:issue/status
  - command:issue/transfer
  - command:issue/unlock
  - command:issue/unpin
---

[gh issue](cli:command:issue) 命令族承担仓库的日常事务管理：创建与查看议题、按条件筛选、用标签与置顶组织，以及关闭、转移、删除等生命周期操作。本文说明议题的选择器与编号的双义行为、各管理命令的边界，以及与 [gh pr](cli:command:pr) 共用的实现。PR 侧的工作模型见[PR 工作模型](pr-model.md)；目标仓库如何确定见[仓库上下文与默认仓库](repo-context.md)。

## 选择器与编号的双义

多数 `gh issue` 子命令接受一个议题选择器：议题编号（如 `123`，可带 `#` 前缀）或议题 URL（如 `https://github.com/OWNER/REPO/issues/123`）；URL 自带仓库信息时以该仓库为准。

仓库内编号在议题与拉取请求之间是连续共享的，因此编号是"双义"的，各命令对这种情况的处理不同：[gh issue view](cli:command:issue/view) 按编号照常显示对应的拉取请求；[gh issue close](cli:command:issue/close) 与 [gh issue reopen](cli:command:issue/reopen) 会转而对拉取请求执行对应的关闭/重开；而 [gh issue lock](cli:command:issue/lock) 会报错并提示改用 `gh pr lock`，[gh issue delete](cli:command:issue/delete) 与 [gh issue transfer](cli:command:issue/transfer) 遇到拉取请求直接报错（拉取请求不能删除或转移）。

## 创建与查看

[gh issue create](cli:command:issue/create) 的标题与正文来自 `--title` 与 `--body`/`--body-file`，或 `--editor`（编辑器中第一行为标题）、`--web`（转浏览器）；非交互模式下必须提供标题与正文。元数据旗标包括 `--assignee`（`@me` 指派自己，`@copilot` 指派 Copilot，GitHub Enterprise Server 不支持后者）、`--label`、`--milestone` 与 `--project`（需要 `project` scope 授权，可用 `gh auth refresh -s project` 补齐）。`--template` 接受仓库中的模板名作为正文起始文本，与 `--body`/`--body-file` 互斥。

几个较新的旗标作用于议题的结构关系：`--type` 设置议题类型，`--parent` 把新议题挂为某个父议题的子议题，`--blocked-by` 与 `--blocking` 声明议题间的阻塞关系；这三类关系在议题创建后通过后续请求补齐。`--attach` 为正文附加图片或视频（每条命令最多 50 个，路径后 `#` 跟图片替代文本）。[gh issue edit](cli:command:issue/edit) 可对同一仓库的一个或多个议题修改同一批字段。

[gh issue view](cli:command:issue/view) 显示单个议题的详情；终端直连时渲染为人类可读预览（评论默认摘要，`--comments` 展开全部），输出被重定向到管道或文件时改为制表符分隔的键值行，便于用 head、grep 等工具处理。

## 列表与状态

[gh issue list](cli:command:issue/list) 默认只列开启状态的议题，最多 30 条（`--limit` 调整）；过滤条件来自 `--assignee`、`--author`、`--label`、`--milestone`、`--type` 等旗标（`--author` 与 `--app` 互斥），也可用 `--search` 传入完整搜索查询。给出 `--search`，或给出 `--label`、`--milestone`、`--type` 时改走搜索 API，结果上限 1000 条。

[gh issue status](cli:command:issue/status) 把与当前用户相关的议题分三组列出：指派给你的、提及你的、由你创建的。两者都支持 `--json`/`--jq`/`--template` 导出与加工，见[JSON 输出与格式化](../reference/formatting.md)。

## 标签体系

标签（label）是议题与拉取请求共用的分类手段，由 `gh label` 命令族维护：[gh label create](cli:command:label/create)、[gh label edit](cli:command:label/edit)、[gh label delete](cli:command:label/delete)、[gh label list](cli:command:label/list)。颜色为 6 位十六进制色值（开头的 `#` 会自动去掉），创建时未给则从一组预置颜色中随机选择；同名标签已存在时创建失败，提示改用 `--force` 更新。

[gh label clone](cli:command:label/clone) 把源仓库的全部标签复制到目的仓库（默认当前仓库）：目的仓库中源仓库没有的标签不受影响，同名标签默认跳过、`--force` 改为覆盖。

## 置顶、转移与关联分支

- [gh issue pin](cli:command:issue/pin) 与 [gh issue unpin](cli:command:issue/unpin) 控制议题在仓库中的置顶；已置顶/未置顶时仅提示、不做更改。置顶状态可通过支持 `--json` 的命令以 `isPinned` 字段查看。
- [gh issue transfer](cli:command:issue/transfer) 把议题转移到另一个仓库，成功后打印议题在新仓库的 URL。议题所在仓库（由 URL、当前仓库或 `--repo` 决定）与目标仓库（参数 `DESTINATION-REPO`）是两个独立的选择。
- [gh issue develop](cli:command:issue/develop) 管理议题的关联分支：默认为议题创建新的关联分支（未给 `--name` 时由 GitHub 自动生成分支名），`--list` 改为列出现有分支。`--base` 指定的基分支会被记录为之后 `gh pr create` 从新分支创建拉取请求时的基分支，把议题到拉取请求的链路接起来；`--branch-repo` 指定分支所在仓库，`--checkout`/`--worktree` 同时检出。

## 生命周期：关闭、重开与删除

[gh issue close](cli:command:issue/close) 关闭议题，`--comment` 可同时留评论，`--reason` 指定关闭原因（`completed`、`not planned`、`duplicate`）。`--duplicate-of` 按编号或 URL 把议题标记为另一议题的重复议题：它隐含 duplicate 原因，且只能与 `--reason duplicate` 搭配；指向的对象必须是议题（不能是拉取请求，也不能是议题自身），关闭对象是拉取请求时不支持。已关闭的议题不做更改仅提示。

[gh issue reopen](cli:command:issue/reopen) 重新打开已关闭的议题；`--comment` 添加的评论在重新打开前先行提交。

[gh issue delete](cli:command:issue/delete) 删除议题，删除后不可恢复。交互式运行先显示警告并要求输入议题编号确认；`--yes` 跳过确认（`--confirm` 为已弃用的旧写法）；非交互运行不提示直接删除。

## 锁定：与 pr 共用的实现

[gh issue lock](cli:command:issue/lock) 与 [gh issue unlock](cli:command:issue/unlock) 控制议题对话：锁定后，权限范围之外的用户无法再添加评论。`--reason` 取值固定为 `off_topic`、`resolved`、`spam`、`too_heated`，并在本地校验。已锁定的议题再次锁定时，交互模式询问是否解锁后按新原因重新锁定，非交互模式直接报错。

这组命令与 `gh pr lock`/`gh pr unlock` 共用同一实现（构造时注入父命令名，错误提示与输出随父命令而异）：行为语义一致，差异只在选择器形式（议题侧接受编号与 URL，PR 侧同样只接受编号与 URL）与对象互斥的提示方向。

## 示例

```sh
# 创建带标签与指派人的议题
gh issue create --title "Bug: login fails" --body "Steps to reproduce" \
  --label bug --assignee "@me"

# 列出指派给自己的开启议题
gh issue list --assignee "@me"

# 以 not planned 原因关闭
gh issue close 123 --reason "not planned"

# 把议题转移到另一仓库
gh issue transfer 123 owner/repo

# 为议题创建关联分支并检出，之后从该分支创建拉取请求
gh issue develop 123 --checkout
```

以上示例为说明性内容，未实际运行。
