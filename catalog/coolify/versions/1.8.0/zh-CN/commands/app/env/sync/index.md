---
title: coolify app env sync
command:
  - app
  - env
  - sync
---
## 简介

把 .env 文件同步为应用的环境变量：更新已有键的值，创建尚不存在的键，并尽可能使用批量接口。

## 参数

### `app_uuid`

应用 UUID。

## 选项

### `--build-time`

使同步的全部变量在构建期可用；默认开启。

### `--file`

.env 文件路径（必需）。

### `--help`

打印该命令的帮助。

### `--is-literal`

将全部值视为字面量（不做变量插值）。

### `--preview`

使同步的全部变量在预览部署中可用。

### `--runtime`

使同步的全部变量在运行期可用；默认开启。

## 使用提醒

#### 行为与限制

`--file` 为必需；文件为空时直接结束。v1.8.0 修复了应用环境变量 `is_buildtime` 载荷的传递问题。

## 示例

```sh
coolify app env sync <app-uuid> --file .env.production
```

源码：[S17](https://github.com/coollabsio/coolify-cli/blob/ff0ea90fc40e2d5f10e993f79759f705e5e6af10/cmd/application/env/sync.go)
