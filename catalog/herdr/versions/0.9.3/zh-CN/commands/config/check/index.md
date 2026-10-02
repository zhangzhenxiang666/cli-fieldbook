---
title: herdr config check
command:
  - config
  - check
---

## 简介

校验 config.toml 并输出诊断。

## 选项

### `--help`

打印该命令的帮助。

## 使用提醒

#### 行为与限制

没有问题退出 0；发现问题退出 1。它不是对全部 Agent、插件、SSH 环境的健康检查。

源码：[S01](https://github.com/herdrdev/herdr/blob/7b116c05bfda646af39d2524c54e70c751f57ee8/src/cli/spec.rs#L6-L966) [S03](https://github.com/herdrdev/herdr/blob/7b116c05bfda646af39d2524c54e70c751f57ee8/src/cli.rs)
