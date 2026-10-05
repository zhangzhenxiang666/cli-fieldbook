---
title: gh extension
command:
  - extension
---

管理 gh 扩展；本命令有 `extensions`、`ext` 两个别名。

## 简介

GitHub CLI 扩展是提供额外 gh 命令的仓库。扩展仓库名必须以 `gh-` 开头，且仓库中要有同名可执行文件：调用 `gh <扩展名>` 时传入的全部参数，都会转发给扩展的 `gh-<扩展名>` 可执行文件。

扩展不能覆盖任何核心 gh 命令；扩展名与核心命令冲突时，可用 [`gh extension exec`](cli:command:extension/exec) 调用。

执行扩展时，gh 每 24 小时检查一次新版本并显示升级提示，关闭方式见[环境变量](../../reference/environment.md)。

扩展未经 GitHub 验证、签名或背书。安装或升级某个扩展，即表示信任其发布者；使用前审查扩展的来源与出处是用户自己的责任。可用扩展列表见 [gh-extension 主题页](https://github.com/topics/gh-extension)。

## 子命令导览

- [gh extension search](cli:command:extension/search)：搜索可安装的 gh 扩展，也可改在浏览器中打开搜索。
- [gh extension list](cli:command:extension/list)：以表格列出已安装的扩展与版本；别名 `gh extension ls`。
- [gh extension install](cli:command:extension/install)：从远端或本地仓库安装扩展，可固定到指定版本。
- [gh extension upgrade](cli:command:extension/upgrade)：升级已安装的扩展，或用 `--all` 一次升级全部。
- [gh extension remove](cli:command:extension/remove)：移除已安装的扩展；别名 `gh extension uninstall`。
- [gh extension browse](cli:command:extension/browse)：进入浏览、添加与移除扩展的交互式界面。
- [gh extension exec](cli:command:extension/exec)：本地可执行扩展的执行入口，按短名转发参数；一般由扩展自身调用，也可在扩展短名与核心 gh 命令冲突时手动使用。
- [gh extension create](cli:command:extension/create)：从脚手架模板创建新扩展。

## 环境变量

- `GH_NO_EXTENSION_UPDATE_NOTIFIER`：设为任意值关闭扩展更新提示（执行扩展时每 24 小时检查一次新版本）。
- `GH_PATH`：gh 调用扩展时设置该变量，便于扩展回调同一个 gh 可执行文件。
- `GH_EXTENSION`：gh 调用扩展时设为 `1`，扩展据此区分自身是被 `gh <扩展名>` 调用还是独立运行。

完整清单见[环境变量](../../reference/environment.md)。

## 使用提醒

- 安装后的扩展以 `gh <扩展名>` 的形式成为新的子命令；直接运行 `gh extension` 只显示本组子命令的帮助。
- 第三方扩展不由 GitHub 验证、签名或背书，安装前先审查其仓库与发布者。
- 扩展更新提示至多每 24 小时出现一次，关闭方式见上方环境变量。

## 示例

```sh
# 列出已安装的扩展
gh extension list

# 从 OWNER/REPO 仓库安装扩展
gh extension install owner/gh-extension

# 升级全部已安装的扩展
gh extension upgrade --all
```

以上示例为说明性内容，未实际运行。

## 源码补充

- 本组命令与其全部子命令内联定义于 [pkg/cmd/extension/command.go](https://github.com/cli/cli/blob/fc4b137cdef0a6bd28fd461b7cf9c84a5812a8cd/pkg/cmd/extension/command.go)。
