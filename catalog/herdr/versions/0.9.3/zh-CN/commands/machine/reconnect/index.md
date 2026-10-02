---
title: herdr machine reconnect
command:
  - machine
  - reconnect
---

## 简介

从当前终端重新进行连接/认证。

## 参数

### `LABEL_OR_ID`

已保存的配置 ID 或唯一显示名称。

## 选项

### `--help`

打印该命令的帮助。

## 使用提醒

#### 行为与限制

不执行安装或升级；与 machine add 的准备流程不同。

源码：[S11](https://github.com/herdrdev/herdr/blob/7b116c05bfda646af39d2524c54e70c751f57ee8/src/cli/spec/machine.rs) [S10](https://github.com/herdrdev/herdr/blob/7b116c05bfda646af39d2524c54e70c751f57ee8/src/cli/target.rs#L174-L301)
