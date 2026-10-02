---
title: herdr integration
command:
  - integration
---

## 简介

安装和检查内置 Agent 集成。

## 选项

### `--help`

打印该命令的帮助。

## 使用提醒

#### 行为与限制

安装的是 Herdr 的 hook/集成配置，不是安装 Agent 主程序。目标名不总与 agent start --kind 相同。

源码：[S01](https://github.com/herdrdev/herdr/blob/7b116c05bfda646af39d2524c54e70c751f57ee8/src/cli/spec.rs#L6-L966) [S17](https://github.com/herdrdev/herdr/blob/7b116c05bfda646af39d2524c54e70c751f57ee8/src/cli/integration.rs) [S19](https://github.com/herdrdev/herdr/blob/7b116c05bfda646af39d2524c54e70c751f57ee8/src/integration/registry.rs) [S20](https://github.com/herdrdev/herdr/blob/7b116c05bfda646af39d2524c54e70c751f57ee8/src/integration/mod.rs)
