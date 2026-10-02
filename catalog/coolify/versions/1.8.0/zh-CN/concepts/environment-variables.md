---
title: 环境变量体系
---

应用、数据库与一键服务各有一套结构相同的 `env` 子命令组：`create`、`delete`、`get`、`list`、`sync`、`update`。所有子命令的第一个位置参数都是所属资源的 UUID；需要定位单个变量时，用其 UUID 或键名。

## 变量属性

创建与修改变量时，除键值外还可控制三类作用属性：

- **构建期/运行期**：`--build-time`（构建期可用，默认开启）、`--runtime`（运行期可用，默认开启）。两者独立开关，可只保留其一。
- **预览部署**：`--preview` 控制变量是否对预览部署（Pull Request 产生的临时部署）可用。`app env list` 默认只列出非预览变量，加 `--preview` 只看预览变量，`--all` 全部列出。
- **字面量与展示**：`--is-literal` 把值视为字面量、不做变量插值；`--is-multiline` 标记值为多行文本；`--is-shown-once` 使值仅在部署后显示一次。

## 从 .env 文件同步

`env sync <uuid> --file <path>` 读取本地 `.env` 文件并同步到资源：**更新已存在的键、创建缺失的键**，不会删除服务端多出的变量；能批量操作的地方使用批量接口。`--build-time`、`--runtime`、`--preview`、`--is-literal` 在同步时作为整批变量的属性传入。

v1.8.0 修复了应用环境变量 `is_buildtime` 载荷的传递问题（上游 issue #84）；此前通过同步设置构建期属性可能不生效。

## 语义边界

- 同名键重复创建会报错，应使用 `update`；
- `update` 支持以 `--key` 重命名变量；
- `delete` 默认有确认提示，`--force` 跳过。

源码：[S17](https://github.com/coollabsio/coolify-cli/blob/ff0ea90fc40e2d5f10e993f79759f705e5e6af10/cmd/application/env/sync.go) [S13](https://github.com/coollabsio/coolify-cli/blob/ff0ea90fc40e2d5f10e993f79759f705e5e6af10/cmd/application/env/create.go)
