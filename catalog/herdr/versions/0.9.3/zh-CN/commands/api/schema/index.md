---
title: herdr api schema
command:
  - api
  - schema
---

## 简介

查看或导出当前二进制内置 API schema。

## 选项

### `--json`

输出 JSON，而不是默认的人类可读格式。具体结构以本命令为准，不假定都有 result 外层。

### `--output`

将完整 schema 写入文件。

### `--help`

打印该命令的帮助。

## 使用提醒

#### 行为与限制

不加参数输出概要。--json 与 --output 在实际解析器中互斥。

schema 随客户端二进制打包，不需要在线 server；应与目标 server 的协议版本核对。

源码：[S01](https://github.com/herdrdev/herdr/blob/7b116c05bfda646af39d2524c54e70c751f57ee8/src/cli/spec.rs#L6-L966) [S14](https://github.com/herdrdev/herdr/blob/7b116c05bfda646af39d2524c54e70c751f57ee8/src/cli/api.rs) [S15](https://github.com/herdrdev/herdr/blob/7b116c05bfda646af39d2524c54e70c751f57ee8/src/cli/runtime.rs)
