---
title: jj debug object tree
command:
  - debug
  - object
  - tree
---

## 简介

打印指定目录的 tree 对象。

## 参数

### `DIR`

仓库内部路径；不是任意本机绝对路径。

### `ID`

完整十六进制对象 ID；与 -r 二选一。

## 选项

### `--revision`

从指定修订中按给定路径查找对象；与 ID 互斥。

### `--help`

显示帮助。

## 使用提醒

全局参数见 [Global Options](../../../../concepts/global-options.md)。

**注意：** 开发者诊断接口，输出不保证稳定，不建议作为生产脚本协议。file/tree 在解析器中要求 ID 或 -r。symlink 的参数声明未标 required，但执行分支会读取其中之一；实际调用同样必须明确给出 ID 或 -r。

源码：[cli/src/commands/debug/object.rs](https://github.com/jj-vcs/jj/blob/7c41cdeb16b6b321c64e789a966b6adf723816a5/cli/src/commands/debug/object.rs)。
