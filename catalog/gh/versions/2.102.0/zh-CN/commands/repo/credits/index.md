---
title: gh repo credits
command:
  - repo
  - credits
---

## 简介

此命令在 `gh --help` 中隐藏。它列出并致谢仓库的贡献者：获取仓库的 contributors 列表，只统计类型为 User 的贡献者。

交互式终端下播放滚动致谢动画，需按 Ctrl-C 退出；传入 `-s` 或在 Windows 上则打印静态致谢。stdout 被管道或重定向时，逐行打印贡献者登录名。

## 参数

### `REPOSITORY`

格式：`[<repository>]`。目标仓库；省略时使用当前 git 仓库。

## 选项

### `--static`

短旗标 `-s`。格式：`--static`。打印静态版致谢，不播放动画。

## 使用提醒

- 动画模式会持续刷新播放，需要 Ctrl-C 退出（画面底部亦有提示）。
- Windows 上不做动画，始终输出静态版本。
- 管道输出（如 `| cat`）时逐行打印贡献者登录名，适合脚本处理。

## 示例

```sh
# 查看当前仓库的贡献者致谢
gh repo credits

# 查看指定仓库的贡献者致谢
gh repo credits cool/repo

# 打印非动画的致谢
gh repo credits -s

# 接管道时只逐行打印贡献者
gh repo credits | cat
```

以上示例为说明性内容，未实际运行。

## 源码补充

- 命令以 `Hidden: true` 注册；贡献者取自仓库 contributors 接口，动画与静态输出见 [pkg/cmd/repo/credits/credits.go](https://github.com/cli/cli/blob/fc4b137cdef0a6bd28fd461b7cf9c84a5812a8cd/pkg/cmd/repo/credits/credits.go)。
