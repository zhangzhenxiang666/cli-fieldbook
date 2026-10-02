---
title: herdr integration uninstall
command:
  - integration
  - uninstall
---

## 简介

卸载一个 Agent 的 Herdr 集成。

## 参数

### `TARGET`

17 个常规目标及实验性 letta，见集成目标表。

## 选项

### `--help`

打印该命令的帮助。

## 使用提醒

#### 行为与限制

会修改对应 Agent 的配置或 hook 文件。该版本没有 integration install all，也没有此命令的 --json。

源码：[S01](https://github.com/herdrdev/herdr/blob/7b116c05bfda646af39d2524c54e70c751f57ee8/src/cli/spec.rs#L6-L966) [S17](https://github.com/herdrdev/herdr/blob/7b116c05bfda646af39d2524c54e70c751f57ee8/src/cli/integration.rs) [S19](https://github.com/herdrdev/herdr/blob/7b116c05bfda646af39d2524c54e70c751f57ee8/src/integration/registry.rs) [S20](https://github.com/herdrdev/herdr/blob/7b116c05bfda646af39d2524c54e70c751f57ee8/src/integration/mod.rs)
