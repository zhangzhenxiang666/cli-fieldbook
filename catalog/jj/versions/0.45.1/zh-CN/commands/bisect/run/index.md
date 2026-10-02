---
title: jj bisect run
command:
  - bisect
  - run
---

## 简介

执行检测命令，二分定位引入问题的修订。

## 参数

### `COMMAND`

检测程序。退出码 0 为 good，125 为跳过，127 为中止；其余非零码为 bad。

### `ARGS`

传给检测程序的参数；建议用 -- 隔开 jj 参数和程序参数。

## 选项

### `--range`

必填，可重复；取各范围的并集。通常使用 GOOD..BAD。范围顶端假定为坏，范围外的祖先假定为好。

### `--find-good`

改为找第一个好修订；反转普通 good/bad 退出码解释，125 和 127 的特殊意义不变。

### `--help`

显示帮助。

## 使用提醒

全局参数见 [Global Options](../../../concepts/global-options.md)。

**Hidden / Compatibility Options（源码补充，不是普通 help 可见项）**

```text
  --command <COMMAND>
          已弃用的隐藏形式；与位置 COMMAND 互斥。改用 -- 后的位置命令及参数。
```

**注意：** 每次会直接编辑被测修订并切换当前工作副本，不是 jj run 的独立工作目录模型。目标 commit ID 通过 JJ_BISECT_TARGET 提供。要求问题在所选历史上近似单调。 虽然 clap 的 Usage 将 \[COMMAND] 显示为可选，但实际执行要求位置命令或旧 --command 至少提供一个；省略会报错。

源码：[cli/src/commands/bisect/run.rs](https://github.com/jj-vcs/jj/blob/7c41cdeb16b6b321c64e789a966b6adf723816a5/cli/src/commands/bisect/run.rs)。
