---
title: herdr integration status
command:
  - integration
  - status
---

## 简介

检查集成安装状态。

## 选项

### `--outdated-only`

只列出被判为过期、需要更新的集成。

### `--help`

打印该命令的帮助。

## 使用提醒

#### 行为与限制

检查后可对具体目标重新运行 integration install；检测支持的 Agent 数量不等于可安装集成目标数量。

源码：[S01](https://github.com/herdrdev/herdr/blob/7b116c05bfda646af39d2524c54e70c751f57ee8/src/cli/spec.rs#L6-L966) [S17](https://github.com/herdrdev/herdr/blob/7b116c05bfda646af39d2524c54e70c751f57ee8/src/cli/integration.rs) [S19](https://github.com/herdrdev/herdr/blob/7b116c05bfda646af39d2524c54e70c751f57ee8/src/integration/registry.rs) [S20](https://github.com/herdrdev/herdr/blob/7b116c05bfda646af39d2524c54e70c751f57ee8/src/integration/mod.rs)
