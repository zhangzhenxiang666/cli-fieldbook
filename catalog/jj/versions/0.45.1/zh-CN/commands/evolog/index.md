---
title: jj evolog
command:
  - evolog
---

## 简介

查看同一个 change 随修改、变基而产生的历史版本。

## 选项

### `--revisions`

追踪这些修订的演化；默认 @。

### `--limit`

限制条数：拓扑排序之后、反转之前应用。

### `--reversed`

反向展示，较旧版本在前。

### `--no-graph`

输出列表而非关系图。

### `--template`

模板类型 CommitEvolutionEntry；默认 templates.evolog。

### `--patch`

显示相对上一版本的修改；临时对齐父提交，避免无关基线变化污染差异。

### `--help`

显示帮助。

## 使用提醒

全局参数见 [Global Options](../../concepts/global-options.md)。

**Hidden / Compatibility Options（源码补充，不是普通 help 可见项）**

```text
  --revision <REVSETS>
          --revisions 的隐藏长别名；本命令的公开拼写是复数 --revisions。
```

源码：[cli/src/commands/evolog.rs](https://github.com/jj-vcs/jj/blob/7c41cdeb16b6b321c64e789a966b6adf723816a5/cli/src/commands/evolog.rs)。
