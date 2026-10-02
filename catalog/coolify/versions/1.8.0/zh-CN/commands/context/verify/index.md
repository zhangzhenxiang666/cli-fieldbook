---
title: coolify context verify
command:
  - context
  - verify
---
## 简介

校验当前上下文是否可用：向实例发起版本查询，同时验证连通性与令牌有效性。

## 选项

### `--help`

打印该命令的帮助。

## 使用提醒

#### 行为与限制

成功时输出连接与认证的确认信息及服务端版本号；失败信息中包含 API 返回的错误原因。

源码：[S34](https://github.com/coollabsio/coolify-cli/blob/ff0ea90fc40e2d5f10e993f79759f705e5e6af10/cmd/context/verify.go)
