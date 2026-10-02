---
title: coolify database backup create
command:
  - database
  - backup
  - create
---
## 简介

为数据库创建定时备份配置：频率、保留策略与 S3 上传。

## 参数

### `database_uuid`

数据库 UUID。

## 选项

### `--databases-to-backup`

要备份的数据库列表，逗号分隔。

### `--disable-local-backup`

禁用本地备份存储。

### `--dump-all`

转储全部数据库。

### `--enabled`

启用备份计划。

### `--frequency`

备份频率（cron 表达式，例如 `'0 0 * * *'` 表示每日）。

### `--help`

打印该命令的帮助。

### `--retention-amount-locally`

本地保留的备份份数。

### `--retention-amount-s3`

S3 中保留的备份份数。

### `--retention-days-locally`

本地保留备份的天数。

### `--retention-days-s3`

S3 中保留备份的天数。

### `--retention-max-storage-locally`

本地备份的存储上限（GB，数值）。

### `--retention-max-storage-s3`

S3 备份的存储上限（GB，数值）。

### `--s3-storage-uuid`

S3 存储 UUID。

### `--save-s3`

将备份保存到 S3。

### `--timeout`

备份超时时间（秒）。

## 使用提醒

#### 行为与限制

v1.8.0 起为破坏性变更：`--retention-max-storage-locally` 与 `--retention-max-storage-s3` 接受数值型 GB 上限（旧版本为布尔开关语义）。

源码：[S35](https://github.com/coollabsio/coolify-cli/blob/ff0ea90fc40e2d5f10e993f79759f705e5e6af10/cmd/database/backup/create.go)
