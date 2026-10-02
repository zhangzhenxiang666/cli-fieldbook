---
title: herdr update
command:
  - update
---

## 简介

下载并安装更新。

## 选项

### `--handoff`

安装后尝试实验性的运行中 server 交接。

### `--help`

打印该命令的帮助。

## 使用提醒

#### 行为与限制

更新通道由 channel 管理。包管理器安装的构建可能要求通过原包管理器更新。

升级客户端文件不等于所有已运行 server 都已换成新版本；用 status 比较。

源码：[S01](https://github.com/herdrdev/herdr/blob/7b116c05bfda646af39d2524c54e70c751f57ee8/src/cli/spec.rs#L6-L966) [S02](https://github.com/herdrdev/herdr/blob/7b116c05bfda646af39d2524c54e70c751f57ee8/src/main.rs)
