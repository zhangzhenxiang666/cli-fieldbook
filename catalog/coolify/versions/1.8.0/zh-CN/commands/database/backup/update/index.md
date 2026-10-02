---
title: coolify database backup update
command:
  - database
  - backup
  - update
---
## 简介

更新备份配置（频率、保留策略、S3 等）。

## 参数

### `database_uuid`

数据库 UUID。

### `backup_uuid`

备份配置 UUID。

## 选项

### `--databases-to-backup`

要备份的数据库列表，逗号分隔。

### `--dump-all`

转储全部数据库。

### `--enabled`

启用或禁用该备份配置。

### `--frequency`

备份频率（cron 表达式）。

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

## 使用提醒

#### 行为与限制

第一个 UUID 是数据库，第二个是备份配置。v1.8.0 起 `--retention-max-storage-*` 同样为数值型 GB。

源码：[S41](https://github.com/coollabsio/coolify-cli/blob/ff0ea90fc40e2d5f10e993f79759f705e5e6af10/cmd/database/backup/update.go)
