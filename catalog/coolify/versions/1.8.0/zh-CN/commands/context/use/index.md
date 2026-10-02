---
title: coolify context use
command:
  - context
  - use
---
## 简介

切换到指定上下文；实现上是把它设为默认上下文。

## 参数

### `context_name`

上下文名称。

## 选项

### `--help`

打印该命令的帮助。

## 使用提醒

#### 行为与限制

上下文不存在时直接报错，不会自动创建。

## 示例

```sh
coolify context use myserver
```

源码：[S33](https://github.com/coollabsio/coolify-cli/blob/ff0ea90fc40e2d5f10e993f79759f705e5e6af10/cmd/context/use.go)
