---
title: herdr completion
command:
  - completion
---

## 简介

生成 shell 补全脚本。

## 参数

### `SHELL`

bash、zsh、fish、powershell、elvish。

## 选项

### `--help`

打印该命令的帮助。

## 使用提醒

#### 行为与限制

脚本写到标准输出；生成脚本本身不修改 shell 配置。

源码：[S12](https://github.com/herdrdev/herdr/blob/7b116c05bfda646af39d2524c54e70c751f57ee8/src/cli/spec/completion.rs)
