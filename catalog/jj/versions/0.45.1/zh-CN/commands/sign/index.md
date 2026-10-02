---
title: jj sign
command:
  - sign
---

## 简介

为修订添加密码学签名。

## 选项

### `--revision`

要签名的修订；默认 revsets.sign。

### `--key`

用于签名的密钥标识。

### `--help`

显示帮助。

## 使用提醒

全局参数见 [Global Options](../../concepts/global-options.md)。

**Hidden / Compatibility Options（源码补充，不是普通 help 可见项）**

```text
  --revisions <REVSETS>
          --revision 的隐藏长别名；不应据此推断所有命令都接受这两个拼写。
```

**注意：** 需配置 signing backend。即使已有签名，也会重新签名；硬件令牌可能再次要求交互。签名会重写提交对象。

源码：[cli/src/commands/sign.rs](https://github.com/jj-vcs/jj/blob/7c41cdeb16b6b321c64e789a966b6adf723816a5/cli/src/commands/sign.rs)。
