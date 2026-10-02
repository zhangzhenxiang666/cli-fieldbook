---
title: jj metaedit
command:
  - metaedit
---

## 简介

修改提交元数据，而不直接修改文件内容。

## 参数

### `REVSETS`

目标修订；默认 @；也接受隐藏短选项 -r。

## 选项

### `--update-change-id`

为修订重新分配 change ID。

### `--message`

设置提交描述。

### `--update-author-timestamp`

把作者时间更新为当前时间。

### `--update-author`

把作者姓名 / 邮箱更新为当前用户，保留作者时间。

### `--author`

指定作者，格式 Name `<email>`。

### `--author-timestamp`

指定作者时间，接受 RFC 2822 或 RFC 3339。

### `--force-rewrite`

即使元数据没有实质变化也重写提交，更新 committer 信息。

### `--help`

显示帮助。

## 使用提醒

全局参数见 [Global Options](../../concepts/global-options.md)。

**Hidden / Compatibility Options（源码补充，不是普通 help 可见项）**

```text
  -r <REVSETS>
          位置修订参数的隐藏短选项形式；不能据此使用 --revision。
```

**注意：** 重写元数据仍会改变 commit ID，并可能重写后代。作者信息和提交者信息不是一回事；提交者覆盖可使用对应 user 配置 / JJ_USER、JJ_EMAIL。 --author 与 --update-author 互斥；--author-timestamp 与 --update-author-timestamp 互斥。

源码：[cli/src/commands/metaedit.rs](https://github.com/jj-vcs/jj/blob/7c41cdeb16b6b321c64e789a966b6adf723816a5/cli/src/commands/metaedit.rs)。
