---
title: magpie library skill update
command:
  - library
  - skill
  - update
---

library skill update —— 从 GitHub 重新拉取技能。

## 简介

带名称时更新该技能;不带名称时更新每个来自 GitHub 的技能。本地改过的技能保持原样不更新(列出为 not updated);要以其名称更新并覆盖本地改动,用 `--replace-edits`——GitHub 的版本就位,你的版本保存在备份里。

## 参数

### `name`

`[name]`。要更新的技能名称;省略时更新全部来自 GitHub 的技能。

## 选项

### `--replace-edits`

更新一个本地改过的技能时,用 GitHub 的版本替换它,你的改动保存在备份里;不给它时该技能被拒绝更新并提示本命令。

## 使用提醒

- 只有来自 GitHub 的技能(含市场安装)有可检查的远端;本机文件夹链接、从 agent 导入的技能没有远端可更新。
- 技能已是最新时报告"is up to date"。
- 更新检查默认由应用按周期自行执行(每 12 小时一次),本命令立即执行。

## 示例

```sh
magpie library skill update
magpie library skill update magpie-quota
magpie library skill update magpie-quota --replace-edits
```

以上示例为说明性内容,未实际运行。

## 源码补充

- 分发与 `EditedError` 提示见 [library_cli.go](https://github.com/yetone/magpie/blob/33dbdcc529622cf0dd053c99eb34f51c06fbba77/internal/cli/library_cli.go)。
- 改动检测(`Hash`)与替换备份(`keepReplaced`)见官方文档 [library.md](https://github.com/yetone/magpie/blob/33dbdcc529622cf0dd053c99eb34f51c06fbba77/docs/subsystems/library.md)。
