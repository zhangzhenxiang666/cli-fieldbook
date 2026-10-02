---
title: herdr machine remove
command:
  - machine
  - remove
---

## 简介

移除保存的机器配置。

## 参数

### `PROFILE_ID`

machine list 返回的配置 ID。

## 选项

### `--help`

打印该命令的帮助。

## 使用提醒

#### 行为与限制

只移除本地连接配置，不负责停止远程 server。

源码：[S11](https://github.com/herdrdev/herdr/blob/7b116c05bfda646af39d2524c54e70c751f57ee8/src/cli/spec/machine.rs) [S10](https://github.com/herdrdev/herdr/blob/7b116c05bfda646af39d2524c54e70c751f57ee8/src/cli/target.rs#L174-L301)
