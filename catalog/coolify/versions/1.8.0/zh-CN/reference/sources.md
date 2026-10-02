---
title: 版本、来源与调研方法
---

## 基准版本

- 官方仓库：<https://github.com/coollabsio/coolify-cli>
- 固定 release：<https://github.com/coollabsio/coolify-cli/releases/tag/v1.8.0>
- 发布日期：2026-08-19；完整提交：`ff0ea90fc40e2d5f10e993f79759f705e5e6af10`。
- 调研日期：2026-10-02。
- 官方文档以仓库内 README 与 `llms.txt` 为准（无独立文档站）；用于交叉检查，行为以锁定版本源码为准。
- 上游许可证：[MIT](https://github.com/coollabsio/coolify-cli/blob/ff0ea90fc40e2d5f10e993f79759f705e5e6af10/LICENSE)。

## 主要源码索引

下表为页面正文引用的源码文件；`upstream/source.lock.json` 记录全部 103 个快照文件的路径、SHA-256 与固定提交 URL，是完整清单。

| 编号 | 核对内容 | 固定版本源码 |
| --- | --- | --- |
| S05 | app 命令、app env 命令 定义 | [cmd/application/application.go](https://github.com/coollabsio/coolify-cli/blob/ff0ea90fc40e2d5f10e993f79759f705e5e6af10/cmd/application/application.go) |
| S06 | app create 命令 定义 | [cmd/application/create/create.go](https://github.com/coollabsio/coolify-cli/blob/ff0ea90fc40e2d5f10e993f79759f705e5e6af10/cmd/application/create/create.go) |
| S07 | app create deploy-key 命令 定义 | [cmd/application/create/deploy_key.go](https://github.com/coollabsio/coolify-cli/blob/ff0ea90fc40e2d5f10e993f79759f705e5e6af10/cmd/application/create/deploy_key.go) |
| S08 | app create dockerfile 命令 定义 | [cmd/application/create/dockerfile.go](https://github.com/coollabsio/coolify-cli/blob/ff0ea90fc40e2d5f10e993f79759f705e5e6af10/cmd/application/create/dockerfile.go) |
| S09 | app create dockerimage 命令 定义 | [cmd/application/create/dockerimage.go](https://github.com/coollabsio/coolify-cli/blob/ff0ea90fc40e2d5f10e993f79759f705e5e6af10/cmd/application/create/dockerimage.go) |
| S10 | app create github 命令 定义 | [cmd/application/create/github.go](https://github.com/coollabsio/coolify-cli/blob/ff0ea90fc40e2d5f10e993f79759f705e5e6af10/cmd/application/create/github.go) |
| S11 | app create public 命令 定义 | [cmd/application/create/public.go](https://github.com/coollabsio/coolify-cli/blob/ff0ea90fc40e2d5f10e993f79759f705e5e6af10/cmd/application/create/public.go) |
| S12 | app delete 命令 定义 | [cmd/application/delete.go](https://github.com/coollabsio/coolify-cli/blob/ff0ea90fc40e2d5f10e993f79759f705e5e6af10/cmd/application/delete.go) |
| S13 | app env create 命令 定义 | [cmd/application/env/create.go](https://github.com/coollabsio/coolify-cli/blob/ff0ea90fc40e2d5f10e993f79759f705e5e6af10/cmd/application/env/create.go) |
| S14 | app env delete 命令 定义 | [cmd/application/env/delete.go](https://github.com/coollabsio/coolify-cli/blob/ff0ea90fc40e2d5f10e993f79759f705e5e6af10/cmd/application/env/delete.go) |
| S16 | app env list 命令 定义 | [cmd/application/env/list.go](https://github.com/coollabsio/coolify-cli/blob/ff0ea90fc40e2d5f10e993f79759f705e5e6af10/cmd/application/env/list.go) |
| S17 | app env sync 命令 定义 | [cmd/application/env/sync.go](https://github.com/coollabsio/coolify-cli/blob/ff0ea90fc40e2d5f10e993f79759f705e5e6af10/cmd/application/env/sync.go) |
| S20 | app rollback 命令、app rollback images 命令、app rollback run 命令 定义 | [cmd/application/lifecycle.go](https://github.com/coollabsio/coolify-cli/blob/ff0ea90fc40e2d5f10e993f79759f705e5e6af10/cmd/application/lifecycle.go) |
| S22 | app logs 命令 定义 | [cmd/application/logs.go](https://github.com/coollabsio/coolify-cli/blob/ff0ea90fc40e2d5f10e993f79759f705e5e6af10/cmd/application/logs.go) |
| S24 | app start 命令 定义 | [cmd/application/start.go](https://github.com/coollabsio/coolify-cli/blob/ff0ea90fc40e2d5f10e993f79759f705e5e6af10/cmd/application/start.go) |
| S26 | context add 命令 定义 | [cmd/context/add.go](https://github.com/coollabsio/coolify-cli/blob/ff0ea90fc40e2d5f10e993f79759f705e5e6af10/cmd/context/add.go) |
| S27 | context 命令 定义 | [cmd/context/context.go](https://github.com/coollabsio/coolify-cli/blob/ff0ea90fc40e2d5f10e993f79759f705e5e6af10/cmd/context/context.go) |
| S29 | context get 命令 定义 | [cmd/context/get.go](https://github.com/coollabsio/coolify-cli/blob/ff0ea90fc40e2d5f10e993f79759f705e5e6af10/cmd/context/get.go) |
| S30 | context list 命令 定义 | [cmd/context/list.go](https://github.com/coollabsio/coolify-cli/blob/ff0ea90fc40e2d5f10e993f79759f705e5e6af10/cmd/context/list.go) |
| S33 | context use 命令 定义 | [cmd/context/use.go](https://github.com/coollabsio/coolify-cli/blob/ff0ea90fc40e2d5f10e993f79759f705e5e6af10/cmd/context/use.go) |
| S34 | context verify 命令 定义 | [cmd/context/verify.go](https://github.com/coollabsio/coolify-cli/blob/ff0ea90fc40e2d5f10e993f79759f705e5e6af10/cmd/context/verify.go) |
| S35 | database backup create 命令 定义 | [cmd/database/backup/create.go](https://github.com/coollabsio/coolify-cli/blob/ff0ea90fc40e2d5f10e993f79759f705e5e6af10/cmd/database/backup/create.go) |
| S36 | database backup delete-execution 命令 定义 | [cmd/database/backup/delete-execution.go](https://github.com/coollabsio/coolify-cli/blob/ff0ea90fc40e2d5f10e993f79759f705e5e6af10/cmd/database/backup/delete-execution.go) |
| S37 | database backup delete 命令 定义 | [cmd/database/backup/delete.go](https://github.com/coollabsio/coolify-cli/blob/ff0ea90fc40e2d5f10e993f79759f705e5e6af10/cmd/database/backup/delete.go) |
| S38 | database backup executions 命令 定义 | [cmd/database/backup/execution.go](https://github.com/coollabsio/coolify-cli/blob/ff0ea90fc40e2d5f10e993f79759f705e5e6af10/cmd/database/backup/execution.go) |
| S40 | database backup trigger 命令 定义 | [cmd/database/backup/trigger.go](https://github.com/coollabsio/coolify-cli/blob/ff0ea90fc40e2d5f10e993f79759f705e5e6af10/cmd/database/backup/trigger.go) |
| S41 | database backup update 命令 定义 | [cmd/database/backup/update.go](https://github.com/coollabsio/coolify-cli/blob/ff0ea90fc40e2d5f10e993f79759f705e5e6af10/cmd/database/backup/update.go) |
| S42 | database create 命令 定义 | [cmd/database/create.go](https://github.com/coollabsio/coolify-cli/blob/ff0ea90fc40e2d5f10e993f79759f705e5e6af10/cmd/database/create.go) |
| S43 | database 命令、database backup 命令、database env 命令 定义 | [cmd/database/database.go](https://github.com/coollabsio/coolify-cli/blob/ff0ea90fc40e2d5f10e993f79759f705e5e6af10/cmd/database/database.go) |
| S44 | database delete 命令 定义 | [cmd/database/delete.go](https://github.com/coollabsio/coolify-cli/blob/ff0ea90fc40e2d5f10e993f79759f705e5e6af10/cmd/database/delete.go) |
| S46 | database env delete 命令 定义 | [cmd/database/env/delete.go](https://github.com/coollabsio/coolify-cli/blob/ff0ea90fc40e2d5f10e993f79759f705e5e6af10/cmd/database/env/delete.go) |
| S49 | database env sync 命令 定义 | [cmd/database/env/sync.go](https://github.com/coollabsio/coolify-cli/blob/ff0ea90fc40e2d5f10e993f79759f705e5e6af10/cmd/database/env/sync.go) |
| S57 | deploy batch 命令 定义 | [cmd/deployment/batch.go](https://github.com/coollabsio/coolify-cli/blob/ff0ea90fc40e2d5f10e993f79759f705e5e6af10/cmd/deployment/batch.go) |
| S58 | deploy cancel 命令 定义 | [cmd/deployment/cancel.go](https://github.com/coollabsio/coolify-cli/blob/ff0ea90fc40e2d5f10e993f79759f705e5e6af10/cmd/deployment/cancel.go) |
| S59 | deploy 命令 定义 | [cmd/deployment/deployment.go](https://github.com/coollabsio/coolify-cli/blob/ff0ea90fc40e2d5f10e993f79759f705e5e6af10/cmd/deployment/deployment.go) |
| S62 | deploy name 命令 定义 | [cmd/deployment/name.go](https://github.com/coollabsio/coolify-cli/blob/ff0ea90fc40e2d5f10e993f79759f705e5e6af10/cmd/deployment/name.go) |
| S63 | deploy uuid 命令 定义 | [cmd/deployment/uuid.go](https://github.com/coollabsio/coolify-cli/blob/ff0ea90fc40e2d5f10e993f79759f705e5e6af10/cmd/deployment/uuid.go) |
| S64 | project create 命令 定义 | [cmd/project/create.go](https://github.com/coollabsio/coolify-cli/blob/ff0ea90fc40e2d5f10e993f79759f705e5e6af10/cmd/project/create.go) |
| S68 | project 命令 定义 | [cmd/project/project.go](https://github.com/coollabsio/coolify-cli/blob/ff0ea90fc40e2d5f10e993f79759f705e5e6af10/cmd/project/project.go) |
| S69 | 根命令 定义 | [cmd/root.go](https://github.com/coollabsio/coolify-cli/blob/ff0ea90fc40e2d5f10e993f79759f705e5e6af10/cmd/root.go) |
| S70 | server add 命令 定义 | [cmd/server/add.go](https://github.com/coollabsio/coolify-cli/blob/ff0ea90fc40e2d5f10e993f79759f705e5e6af10/cmd/server/add.go) |
| S74 | server 命令 定义 | [cmd/server/server.go](https://github.com/coollabsio/coolify-cli/blob/ff0ea90fc40e2d5f10e993f79759f705e5e6af10/cmd/server/server.go) |
| S75 | server validate 命令 定义 | [cmd/server/validate.go](https://github.com/coollabsio/coolify-cli/blob/ff0ea90fc40e2d5f10e993f79759f705e5e6af10/cmd/server/validate.go) |
| S76 | service create 命令 定义 | [cmd/service/create.go](https://github.com/coollabsio/coolify-cli/blob/ff0ea90fc40e2d5f10e993f79759f705e5e6af10/cmd/service/create.go) |
| S77 | service delete 命令 定义 | [cmd/service/delete.go](https://github.com/coollabsio/coolify-cli/blob/ff0ea90fc40e2d5f10e993f79759f705e5e6af10/cmd/service/delete.go) |
| S79 | service env delete 命令 定义 | [cmd/service/env/delete.go](https://github.com/coollabsio/coolify-cli/blob/ff0ea90fc40e2d5f10e993f79759f705e5e6af10/cmd/service/env/delete.go) |
| S80 | service env 命令 定义 | [cmd/service/env/env.go](https://github.com/coollabsio/coolify-cli/blob/ff0ea90fc40e2d5f10e993f79759f705e5e6af10/cmd/service/env/env.go) |
| S83 | service env sync 命令 定义 | [cmd/service/env/sync.go](https://github.com/coollabsio/coolify-cli/blob/ff0ea90fc40e2d5f10e993f79759f705e5e6af10/cmd/service/env/sync.go) |
| S89 | service 命令 定义 | [cmd/service/service.go](https://github.com/coollabsio/coolify-cli/blob/ff0ea90fc40e2d5f10e993f79759f705e5e6af10/cmd/service/service.go) |
| S92 | update 命令 定义 | [cmd/update/update.go](https://github.com/coollabsio/coolify-cli/blob/ff0ea90fc40e2d5f10e993f79759f705e5e6af10/cmd/update/update.go) |
| S95 | 配置结构、默认上下文与 config.json 路径 | [internal/config/config.go](https://github.com/coollabsio/coolify-cli/blob/ff0ea90fc40e2d5f10e993f79759f705e5e6af10/internal/config/config.go) |
| S98 | 输出格式化入口（table 回退 pretty 等行为） | [internal/output/formatter.go](https://github.com/coollabsio/coolify-cli/blob/ff0ea90fc40e2d5f10e993f79759f705e5e6af10/internal/output/formatter.go) |
| S99 | JSON 输出实现 | [internal/output/json.go](https://github.com/coollabsio/coolify-cli/blob/ff0ea90fc40e2d5f10e993f79759f705e5e6af10/internal/output/json.go) |

> 注：页面引用编号与 `source.lock.json` 证据顺序对应；上表编号即快照在锁文件中的排序编号，全部 103 个文件的完整映射见锁文件。

## 方法

先固定 release 标签并核对完整提交 SHA，再从源码 `cmd/` 各组的 Cobra 定义梳命令树、别名、旗标与默认值；同时在本机用 1.8.0 二进制递归采集全部 `--help` 原文（330 个节点），与源码逐节点交叉验证接口形态。行为类结论（确认提示、版本门槛、脱敏边界、同步语义、保留策略变更）均回到实现代码核对。README 与 `llms.txt` 用于交叉检查术语与推荐用法。

## 覆盖范围与排除

本版本收录 94 个节点（含根与分组），为递归帮助普查所得 330 个节点的核心子集。未收录部分（含理由）：

- **云厂商开通**：`server hetzner/digitalocean/vultr` 及其 images/regions/sizes 等查询子命令——开通类低频操作且涉及云凭据；
- **设置面**：`server proxy/sentinel/log-drains/cloudflare-tunnel/docker-cleanup/destinations/domains/update`、`settings`、`notification`、`mcp`——实例级运维设置，不在部署主干上；
- **集成与凭据**：`github`、`gitlab`、`private-key`、`s3`、`destination`、`cloud-init`、`cloud-token`——集中在首次接入阶段，后续版本扩展；
- **组织与结构**：顶层与各资源的 `tag`、`teams`、`resource`、三处 `storage` 子组与 `run-storage-backup`、`task`/`execute-task`、`app previews/deployments/destinations/clone/move/update`、`database/service` 的 `clone/move/update`、`service application/database` 内嵌子资源、`project environments/update/update-environment`、`context update/version`、`shared-env`（3 层 21 节点）、`config`、`resource`；
- **非公开/生成物**：`completion`、Cobra 自动生成的 `help`、隐藏命令 `docs`；源码树中故意未注册的 `cmd/init` 与 `cmd/firewall`（v5 mesh 开发树，root.go 注释明确不暴露）。

以上均为后续版本的扩展候选；分母 330 来自全树帮助普查（`upstream/help-captures/_census.txt`）。

## 帮助采集报告

- 采集时间与门禁：2026-10-02，本机二进制 `/opt/homebrew/bin/coolify`，`coolify version` 输出 `1.8.0`（见 `upstream/help-captures/_version-gate.txt`）；
- 方式：递归执行 `--help`，原文按节点保存于 `upstream/help-captures/`；`--help` 在命令执行前短路，不发起 API 请求；首次运行可能创建 `~/.config/coolify/config.json`（本机已存在，未受影响）；
- 边界：该二进制为 Homebrew 发布构建，未与标签提交做字节级比对；接口事实以源码为准，帮助输出用于交叉验证。帮助采集是独立证据步骤，不进入 `docs check`/`docs build` 流程；
- 站点生成器当前固定文案称「原始帮助未采集」，与本版本实际情况不符（见下「已知差异」）。

## 已知差异

- 合订本导出与站点概览页由流水线生成的「未采集二进制原始帮助」等说明是首版协议的固定文案，对 coolify 1.8.0 不准确；本页与交付说明如实声明，待协议演进（版本级帮助采集标记）后修正；
- v1.8.0 两处行为变化已按源码记录：`database backup` 的 `--retention-max-storage-locally/-s3` 改为数值型 GB；`context list` 结构化输出移除 `token` 字段。

## 翻译约定

命令、选项、参数、别名与环境变量保持原拼写；术语对照见仓库 `style/tools/coolify.yml`（context→上下文、application→应用、destination→网络目标、sentinel 等组件名保留原文）。帮助文本中的占位符保留英文形式。未在源码中明示的默认值不补猜。

## 证据边界

本轮验证范围：命令树结构、参数与选项、默认值、以及上文标注的行为边界均经源码核对；帮助原文为真实采集。**示例与工作流全部未实测**——未连接真实 Coolify 实例，工作流中的输出均为预期形式而非实测记录。未对 94 节点之外的全部实现做完整审计。
