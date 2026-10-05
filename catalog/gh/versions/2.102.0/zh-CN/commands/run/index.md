---
title: gh run
command:
  - run
---

列出、查看与监视 GitHub Actions 的近期工作流运行。

## 简介

`gh run` 汇集操作工作流运行（workflow run）的子命令：列出近期运行、查看运行摘要与日志、重新运行、下载产物、实时监视进度、取消与删除运行。命令默认作用于当前 Git 仓库推断出的目标仓库，也可用 `--repo` 指定其他仓库；工作流本身的列出、启停与手动触发见 [gh workflow](cli:command:workflow)。

## 子命令导览

- [gh run list](cli:command:run/list)：列出近期的工作流运行，别名 `gh run ls`。
- [gh run view](cli:command:run/view)：查看一次运行的摘要、job 与日志。
- [gh run rerun](cli:command:run/rerun)：重新运行整个运行、失败的 job 或指定 job。
- [gh run download](cli:command:run/download)：下载运行生成的产物。
- [gh run watch](cli:command:run/watch)：监视运行直到完成并显示进度。
- [gh run cancel](cli:command:run/cancel)：取消一次工作流运行。
- [gh run delete](cli:command:run/delete)：删除一次工作流运行。

## 选项

### `--repo`

短旗标 `-R`。格式：`--repo <[HOST/]OWNER/REPO>`。以 `[HOST/]OWNER/REPO` 格式选择另一个仓库。

本旗标注册在 `gh run` 命令组上，为持久旗标，对全部子命令生效。

## 环境变量

- `GH_REPO`：未给出 `--repo` 时，以 `[HOST/]OWNER/REPO` 格式指定目标仓库；见[环境变量](../../reference/environment.md)。

## 使用提醒

- 目标仓库默认从当前目录 Git 仓库的远端推断；在仓库外使用这些命令时需给出 `--repo` 或设置 `GH_REPO`。
- 多数子命令在交互终端下省略运行 ID 会进入交互选择，非交互环境（如脚本中）则必须显式给出 ID，详见各子命令页。

## 示例

```sh
# 列出当前仓库的近期运行（默认 20 条）
gh run list

# 交互选择一次运行并查看摘要
gh run view

# 监视一次运行直到完成
gh run watch 12345
```

以上示例为说明性内容，未实际运行。

## 源码补充

- 命令组定义与子命令注册见 [pkg/cmd/run/run.go](https://github.com/cli/cli/blob/fc4b137cdef0a6bd28fd461b7cf9c84a5812a8cd/pkg/cmd/run/run.go)。
