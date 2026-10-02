---
title: jj gerrit upload
command:
  - gerrit
  - upload
---

## 简介

把提交上传为 Gerrit change / patch set。

## 选项

### `--revision`

上传这些修订及其可变祖先；可重复。省略时：@ 有描述则选 @，否则选 @-。

### `--remote-branch`

Gerrit 的目标分支；默认读取 gerrit.default-remote-branch。

### `--remote`

远端名称或完整 SSH URL；默认读取 gerrit.default-remote。

### `--dry-run`

只显示拟上传的内容，不执行上传。

### `--reviewer`

请求此审查者；可重复，通常填写邮箱。

### `--cc`

抄送此用户；可重复。

### `--label`

设置投票标签，可带分值（如 Code-Review+1）；无分值时为 +1，可重复；服务端可能忽略未知标签。

### `--topic`

设置 change 的 topic。

### `--hashtag`

添加 hashtag；可重复。

### `--message`

设置新 patch set 的说明，不是修改提交描述。

### `--edit`

把本次上传作为 change edit，而非立即发布新 patch set。

### `--wip`

标记为 work in progress。

### `--ready`

标记为准备好接受审查。

### `--private`

设为 private change。

### `--remove-private`

取消 private 标记。

### `--publish-comments`

发布草稿评论。

### `--no-publish-comments`

不发布草稿评论。

### `--notify`

通知范围：none、owner、owner-reviewers、all；默认 all。

### `--submit`

请求直接提交，需服务端允许且具备相应权限；这是高风险操作。

### `--skip-validation`

跳过提交验证；必须同时指定 --submit，仍受服务端权限限制。

### `--merged`

即使提交已合并，也请求创建 change。

### `--ignore-attention-set`

不让此次上传自动调整 attention set。

### `--deadline`

向 Gerrit 传递请求超时时限，值须符合服务端 deadline 语法。

### `--custom`

设置 Gerrit 自定义键值参数；可重复。

### `--option`

附加 Git push option；可重复。

### `--trace`

为服务端诊断启用带指定标识的 trace。

### `--help`

显示帮助。

## 使用提醒

全局参数见 [Global Options](../../../concepts/global-options.md)。

**注意：** 这是 Gerrit 工作流，不是 GitHub PR 命令。部分参数互斥或受 Gerrit 版本/权限限制。上传时补加 Change-Id trailer 可能使远端提交 ID 与本地不同。

源码：[cli/src/commands/gerrit/upload.rs](https://github.com/jj-vcs/jj/blob/7c41cdeb16b6b321c64e789a966b6adf723816a5/cli/src/commands/gerrit/upload.rs)。
