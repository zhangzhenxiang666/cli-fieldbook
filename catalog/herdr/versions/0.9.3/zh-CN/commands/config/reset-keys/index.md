---
title: herdr config reset-keys
command:
  - config
  - reset-keys
---

## 简介

移除自定义快捷键配置以回到内置默认。

## 选项

### `--help`

打印该命令的帮助。

## 使用提醒

#### 行为与限制

会修改配置文件并生成 config.toml.bak-keybind-v2-`<timestamp>` 备份。

删除 \[keys]、\[keys.indexed]、\[\[keys.command]] 的自定义设置，保留其他配置。运行中 server 可用 server reload-config 重载。

源码：[S01](https://github.com/herdrdev/herdr/blob/7b116c05bfda646af39d2524c54e70c751f57ee8/src/cli/spec.rs#L6-L966) [S03](https://github.com/herdrdev/herdr/blob/7b116c05bfda646af39d2524c54e70c751f57ee8/src/cli.rs)
