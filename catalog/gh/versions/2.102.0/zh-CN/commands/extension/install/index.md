---
title: gh extension install
command:
  - extension
  - install
---

从仓库安装 gh 扩展。

## 简介

从 GitHub 仓库或本地仓库安装 GitHub CLI 扩展。

GitHub 仓库的参数可写为 `OWNER/REPO`，也可写完整仓库 URL；仓库不在 `github.com` 上时，URL 格式更有用。

对远端仓库，gh 先按二进制扩展处理：优先在 release 中查找随 release 提供的预编译二进制产物。找不到 release 时，再按脚本扩展处理：克隆仓库本身，并假定其根目录已有预置的可执行文件或脚本。

`--pin` 可为二进制扩展指定 release 标签、为脚本扩展指定提交；不指定时使用最新版本。

本地仓库常用于扩展开发，仓库参数传 `.`（当前工作目录）。注意：

- 从本地克隆的仓库安装后，gh 会以符号链接（Windows 上为等价机制）管理该扩展，指向仓库根目录中与仓库同名的可执行文件。例如仓库名为 `gh-foobar` 时，符号链接指向扩展仓库根目录的 `gh-foobar`。
- 执行扩展时，gh 运行符号链接找到的可执行文件；找不到可执行文件时扩展无法执行。
- 预编译扩展的可执行文件需要手动构建，并放在仓库根目录。

可用扩展列表见 [gh-extension 主题页](https://github.com/topics/gh-extension)。

## 参数

### `REPOSITORY`

格式：`<repository>`。安装来源：`OWNER/REPO`、完整仓库 URL 或本地路径 `.`。本地安装不能与 `--pin` 同用。

## 选项

### `--force`

格式：`--force`。强制升级扩展，或在最新版本已安装时忽略。

### `--pin`

格式：`--pin <string>`。把扩展固定（pin）到某个 release 标签或提交引用。

## 使用提醒

- 扩展仓库名必须以 `gh-` 开头，且命令短名不能与内置命令或别名冲突，否则安装报错。
- 同一所有者的同一扩展已安装时，默认只提示已安装并正常退出；带 `--force` 时改为尝试升级。短名已被其他所有者的扩展占用时，安装报错。
- 本地安装（`.`）不支持 `--pin`，同时给出会报错 `local extensions cannot be pinned`。
- 本命令跳过了 gh 根命令的统一认证检查，未登录时也可运行。

## 示例

```sh
# 从 GitHub 上的远端仓库安装扩展
gh extension install owner/gh-extension

# 通过完整 URL 从远端仓库安装扩展
gh extension install https://my.ghes.com/owner/gh-extension

# 从当前工作目录的本地仓库安装扩展
gh extension install .
```

以上示例为说明性内容，未实际运行。

## 源码补充

- 命令与安装分支（远端/本地、`--pin`、`--force` 转升级）内联定义于 [pkg/cmd/extension/command.go](https://github.com/cli/cli/blob/fc4b137cdef0a6bd28fd461b7cf9c84a5812a8cd/pkg/cmd/extension/command.go)。
- 名称与冲突检查见同文件 `checkValidExtension`；`cmdutil.DisableAuthCheck` 跳过统一认证检查，见 [pkg/cmdutil/auth_check.go](https://github.com/cli/cli/blob/fc4b137cdef0a6bd28fd461b7cf9c84a5812a8cd/pkg/cmdutil/auth_check.go)。
