---
title: jj unsign
command:
  - unsign
---

## 简介

移除修订的密码学签名。

## 选项

### `--revision`

需要去除签名的修订集合。

### `--help`

显示帮助。

## 使用提醒

全局参数见 [Global Options](../../concepts/global-options.md)。

**Hidden / Compatibility Options（源码补充，不是普通 help 可见项）**

```text
  --revisions <REVSETS>
          --revision 的隐藏长别名；不应据此推断所有命令都接受这两个拼写。
```

**注意：** 去签名也会重写提交对象；不是修改本地 GPG / SSH 密钥。 源码没有提供与 sign 相同的默认 revset；请明确使用 -r 指定目标，勿假设省略后等价于 @。

源码：[cli/src/commands/unsign.rs](https://github.com/jj-vcs/jj/blob/7c41cdeb16b6b321c64e789a966b6adf723816a5/cli/src/commands/unsign.rs)。
