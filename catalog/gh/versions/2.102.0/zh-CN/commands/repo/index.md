---
title: gh repo
command:
  - repo
---

管理 GitHub 仓库：创建、克隆、查看、复刻、同步与修改仓库设置。

## 简介

`gh repo` 是仓库管理命令的分组入口，自身不直接执行操作；`gh repo` 不带子命令运行时仅显示帮助。各子命令按源码中的帮助分组分为两类：常规命令（General commands，[`gh repo list`](cli:command:repo/list) 与 [`gh repo create`](cli:command:repo/create)）与定向命令（Targeted commands，其余子命令）。

多数子命令接受可选的仓库位置参数。按源码帮助注记，仓库参数支持两种形式：

- `OWNER/REPO`
- URL，例如 `https://github.com/OWNER/REPO`

省略仓库参数时，命令通常作用于当前目录对应的仓库（由本地 git 远端与默认仓库解析得到），也可用 `GH_REPO` 环境变量或继承的 `-R/--repo` 旗标显式指定，见[环境变量](../../reference/environment.md)。

## 子命令导览

**General commands**

- [gh repo list](cli:command:repo/list)：列出用户或组织拥有的仓库，别名 `gh repo ls`。
- [gh repo create](cli:command:repo/create)：创建新仓库，别名 `gh repo new`。

**Targeted commands**

- [gh repo view](cli:command:repo/view)：查看仓库的描述与 README。
- [gh repo clone](cli:command:repo/clone)：克隆仓库到本地，可在 `--` 后透传 `git clone` 旗标。
- [gh repo fork](cli:command:repo/fork)：创建仓库的复刻。
- [gh repo set-default](cli:command:repo/set-default)：配置当前目录查询 GitHub API 时使用的默认仓库。
- [gh repo sync](cli:command:repo/sync)：从源仓库同步目标仓库的分支。
- [gh repo edit](cli:command:repo/edit)：编辑仓库设置。
- [gh repo read-dir](cli:command:repo/read-dir)：列出仓库中的目录（preview）。
- [gh repo read-file](cli:command:repo/read-file)：读取仓库中的文件（preview）。
- [gh repo deploy-key](cli:command:repo/deploy-key)：管理仓库的部署密钥。
- [gh repo license](cli:command:repo/license)：浏览仓库许可证。
- [gh repo gitignore](cli:command:repo/gitignore)：列出并查看可用的仓库 gitignore 模板。
- [gh repo rename](cli:command:repo/rename)：重命名仓库。
- [gh repo archive](cli:command:repo/archive)：归档仓库。
- [gh repo unarchive](cli:command:repo/unarchive)：取消归档仓库。
- [gh repo delete](cli:command:repo/delete)：删除仓库。
- [gh repo credits](cli:command:repo/credits)：查看仓库致谢（隐藏命令，不出现在帮助中）。
- [gh repo autolink](cli:command:repo/autolink)：管理自动链接引用。

## 使用提醒

- 子命令继承全局 `-R/--repo` 旗标，可用 `[HOST/]OWNER/REPO` 形式指定目标仓库；`GH_REPO` 环境变量作用于依赖本地仓库上下文的命令，详见[环境变量](../../reference/environment.md)。
- `gh repo credits` 在本版本为隐藏命令；`read-dir` 与 `read-file` 标注为 preview。
- 归档、删除等操作不可轻易撤销，相关子命令页列出了各自的确认与权限要求。

## 示例

```sh
# 交互式创建仓库
gh repo create

# 克隆 cli/cli 仓库
gh repo clone cli/cli

# 在浏览器中打开当前仓库
gh repo view --web
```

以上示例为说明性内容，未实际运行。

## 源码补充

- 分组结构、帮助注记与全部子命令的注册顺序见 [pkg/cmd/repo/repo.go](https://github.com/cli/cli/blob/fc4b137cdef0a6bd28fd461b7cf9c84a5812a8cd/pkg/cmd/repo/repo.go)。
