---
title: herdr api snapshot
command:
  - api
  - snapshot
---

## 简介

打印当前会话的实时运行快照。

## 选项

### `--help`

打印该命令的帮助。

## 使用提醒

#### 行为与限制

这是实时 API 查询，依赖目标 server；与内置 api schema 不同。

源码：[S01](https://github.com/herdrdev/herdr/blob/7b116c05bfda646af39d2524c54e70c751f57ee8/src/cli/spec.rs#L6-L966) [S14](https://github.com/herdrdev/herdr/blob/7b116c05bfda646af39d2524c54e70c751f57ee8/src/cli/api.rs) [S15](https://github.com/herdrdev/herdr/blob/7b116c05bfda646af39d2524c54e70c751f57ee8/src/cli/runtime.rs)
