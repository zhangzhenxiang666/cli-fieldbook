---
title: herdr plugin install
command:
  - plugin
  - install
---

## 简介

从 GitHub 安装插件。

## 参数

### `OWNER/REPO/SUBDIR`

GitHub 仓库简写，可带插件子目录；不是任意 HTTPS/Git URL。

## 选项

### `--ref`

指定 Git 引用，如固定 tag 或提交。

### `--yes`

跳过交互确认；只对已审核的来源使用。

### `--help`

打印该命令的帮助。

## 使用提醒

#### 行为与限制

属于磁盘/代码安装操作；--machine 不允许把本地安装器当作远程命令运行。

源码：[S01](https://github.com/herdrdev/herdr/blob/7b116c05bfda646af39d2524c54e70c751f57ee8/src/cli/spec.rs#L6-L966) [S09](https://github.com/herdrdev/herdr/blob/7b116c05bfda646af39d2524c54e70c751f57ee8/src/cli/plugin.rs)
