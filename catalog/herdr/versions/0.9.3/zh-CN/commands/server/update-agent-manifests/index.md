---
title: herdr server update-agent-manifests
command:
  - server
  - update-agent-manifests
---

## 简介

获取并重载 Agent 检测 manifest。

## 选项

### `--json`

输出 JSON，而不是默认的人类可读格式。具体结构以本命令为准，不假定都有 result 外层。

### `--help`

打印该命令的帮助。

## 使用提醒

#### 行为与限制

这是获取检测规则，不是更新 Claude/Codex 等 Agent 可执行文件；--machine 路由不允许这个本地获取操作。

源码：[S01](https://github.com/herdrdev/herdr/blob/7b116c05bfda646af39d2524c54e70c751f57ee8/src/cli/spec.rs#L6-L966) [S13](https://github.com/herdrdev/herdr/blob/7b116c05bfda646af39d2524c54e70c751f57ee8/src/cli/server.rs)
