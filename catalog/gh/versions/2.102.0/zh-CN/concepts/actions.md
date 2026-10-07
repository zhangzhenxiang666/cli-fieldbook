---
title: GitHub Actions 集成
uses:
  - command:cache
  - command:cache/delete
  - command:cache/list
  - command:ruleset
  - command:ruleset/check
  - command:ruleset/list
  - command:ruleset/view
  - command:run
  - command:run/cancel
  - command:run/delete
  - command:run/download
  - command:run/list
  - command:run/rerun
  - command:run/view
  - command:run/watch
  - command:secret
  - command:secret/delete
  - command:secret/list
  - command:secret/set
  - command:variable
  - command:variable/delete
  - command:variable/get
  - command:variable/list
  - command:variable/set
  - command:workflow
  - command:workflow/disable
  - command:workflow/enable
  - command:workflow/list
  - command:workflow/run
  - command:workflow/view
---

gh 把 GitHub Actions 的日常操作分摊到六组命令上：[gh run](cli:command:run) 管运行实例，[gh workflow](cli:command:workflow) 管工作流文件，[gh cache](cli:command:cache) 管构建缓存；[gh secret](cli:command:secret) 与 [gh variable](cli:command:variable) 管供运行读取的机密与变量，[gh ruleset](cli:command:ruleset) 查看约束仓库的规则集。这些命令组的目标仓库都默认从当前 Git 仓库推断，也可用 `-R/--repo` 或 `GH_REPO` 指定，见[仓库上下文与默认仓库](repo-context.md)。

## run 族：跟进一次次运行

[gh run list](cli:command:run/list) 列出近期运行（默认 20 条），[gh run view](cli:command:run/view) 查看一次运行的摘要、job 与日志，[gh run download](cli:command:run/download) 取回运行产物，[gh run cancel](cli:command:run/cancel) 与 [gh run delete](cli:command:run/delete) 取消或删除运行。

跟进中的两个典型场景：

- 实时盯一次运行：[gh run watch](cli:command:run/watch) 持续刷新直到运行结束；加 `--exit-status` 后运行结论非成功时命令以非零退出码结束，便于把"等这次运行跑完且成功"写进脚本。
- 失败重跑：[gh run rerun](cli:command:run/rerun) 可以重跑整个运行、只重跑失败的 job，或重跑指定 job。

脚本中要显式给出运行 ID：交互终端下省略 ID 会进入交互选择，非交互环境没有这个退路。

## workflow 族：管理工作流文件与手动触发

[gh workflow list](cli:command:workflow/list) 列出工作流文件（默认隐藏已停用的工作流），[gh workflow view](cli:command:workflow/view) 查看摘要或 YAML，[gh workflow enable](cli:command:workflow/enable) 与 [gh workflow disable](cli:command:workflow/disable) 控制工作流是否可运行。

触发模型是理解 [gh workflow run](cli:command:workflow/run) 的关键：它通过创建 `workflow_dispatch` 事件来触发运行，因此工作流文件必须声明 `on.workflow_dispatch` 触发器，否则无法这样运行。工作流若有输入，可交互填写、用 `-f/--raw-field` 或 `-F/--field` 传入，或经标准输入给 JSON。`--ref` 选择包含该工作流文件版本的分支或标签。

要区分"请求被接受"与"任务完成"：`gh workflow run` 成功返回只表示 `workflow_dispatch` 事件已创建，运行本身异步进行；后续用 `gh run list` 或 `gh run watch` 跟进。

## cache 族：管理构建缓存

[gh cache list](cli:command:cache/list) 列出仓库在 GitHub Actions 中保存的缓存，[gh cache delete](cli:command:cache/delete) 按缓存 ID 或缓存键删除，`--all` 清空。缓存的写入由工作流运行完成，这组命令只负责查看与删除；缓存按仓库归属，删除需要令牌具有 `repo` scope。

## 机密与变量的作用域矩阵

机密与变量都按层级设置，层级由互斥的旗标选择（都不给时作用于仓库级）：

| 层级 | 机密可用范围 | 变量可用范围 |
| --- | --- | --- |
| 仓库（默认） | Actions 运行、Agents 会话、Dependabot | Actions 运行、Dependabot |
| 环境（`--env`） | 该仓库该部署环境的 Actions 运行 | 同左 |
| 组织（`--org`） | Actions、Agents、Dependabot、Codespaces | Actions、Dependabot |
| 用户（`--user`） | 当前用户的 Codespaces | 无此层级 |

[gh secret set](cli:command:secret/set) 还可用 `--app` 在 `actions`、`agents`、`codespaces`、`dependabot` 之间选择目标应用。组织级机密与变量可用可见性（`--visibility`）与所选仓库（`--repos`）限定访问范围。

两者的安全性质不同：机密值在本地加密后才发送到 GitHub，写后不可读回；变量明文存储，[gh variable get](cli:command:variable/get) 可随时读回。敏感内容只应进机密，变量适合放非敏感配置。两者都支持从 dotenv 格式文件批量导入（`set` 的 `-f/--env-file`）；日常排查用 [gh secret list](cli:command:secret/list)、[gh variable list](cli:command:variable/list)，删除用 [gh secret delete](cli:command:secret/delete)、[gh variable delete](cli:command:variable/delete)。

## ruleset 族：查看规则集

规则集（ruleset）是定义一组作用于仓库的规则的载体，可配置在仓库或组织等层级。gh 对它只读：[gh ruleset list](cli:command:ruleset/list) 列出仓库或组织的规则集，[gh ruleset view](cli:command:ruleset/view) 查看详情，[gh ruleset check](cli:command:ruleset/check) 显示将作用于某个分支的全部规则——分支不必真实存在，也会包含配置在更上层（如组织）的规则；不给分支名时用当前分支，`--default` 看默认分支。gh 不提供规则集的创建与修改。

## 在 Actions 运行环境里用 gh

在 GitHub Actions 运行器内，运行器自身会设置 `GITHUB_ACTIONS=true`；gh 检测到它时，未经认证执行命令的提示会换成建议设置 `GH_TOKEN`，并给出 `GH_TOKEN: ${{ github.token }}` 的写法。在其他 CI 环境（`CI` 非空）则提示设置 `GH_TOKEN`。`GH_TOKEN` 一旦设置即优先于已存凭据，也不再触发登录提示，详见[环境变量](../reference/environment.md)。

需要人工判断的命令在自动化里要绕开：交互选择、编辑器撰写正文等都假设有终端。输出与退出码的自动化语义见[输出与自动化约定](output-conventions.md)；`gh run list` 等命令支持 `--json` 导出，便于脚本消费。
