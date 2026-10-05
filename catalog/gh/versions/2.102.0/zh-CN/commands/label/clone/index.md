---
title: gh label clone
command:
  - label
  - clone
---

把一个仓库的全部标签复制到另一个仓库。

## 简介

`gh label clone` 把源仓库的全部标签复制到目的仓库，目的仓库默认为当前仓库，也可用 `-R/--repo` 指定其他仓库。

目的仓库中源仓库没有的标签不会被删除或修改；源仓库中已存在于目的仓库的同名标签默认跳过，加 `--force` 后改为覆盖。完成后终端显示成功复制的标签数。

## 参数

### `SOURCE-REPOSITORY`

格式：`<source-repository>`。标签来源仓库，以 `[HOST/]OWNER/REPO` 形式给出；省略时命令报错。

## 选项

### `--force`

短旗标 `-f`。格式：`--force`。覆盖目的仓库中已存在的同名标签，而不是跳过。

## 使用提醒

- `--force` 会以源仓库的同名标签覆盖目的仓库已有标签，覆盖前建议先确认目的仓库现状。

## 示例

```sh
# 把 cli/cli 仓库的标签克隆到当前仓库并覆盖同名标签
gh label clone cli/cli --force

# 把 cli/cli 仓库的标签克隆到 octocat/cli 仓库
gh label clone cli/cli --repo octocat/cli
```

以上示例为说明性内容，未实际运行。

## 源码补充

- 命令定义与并发复制流程见 [pkg/cmd/label/clone.go](https://github.com/cli/cli/blob/fc4b137cdef0a6bd28fd461b7cf9c84a5812a8cd/pkg/cmd/label/clone.go)。
