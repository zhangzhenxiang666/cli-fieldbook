---
title: gh completion
command:
  - completion
---

为 GitHub CLI 命令生成 shell 补全脚本。

## 简介

为 GitHub CLI 命令生成 shell 补全脚本，支持 `bash`、`zsh`、`fish` 与 `powershell`。通过包管理器安装 GitHub CLI 时，可能无需额外配置 shell 即可获得补全支持；Homebrew 用户参见 [Shell Completion](https://docs.brew.sh/Shell-Completion)。手动配置方法如下，配置文件位置因系统而异，改完需重启 shell 再测试补全是否生效。

bash：先用包管理器安装 `bash-completion`，再在 `~/.bash_profile` 中加入：

```sh
eval "$(gh completion -s bash)"
```

zsh：生成 `_gh` 补全脚本并放入 `$fpath` 中的某个目录：

```sh
gh completion -s zsh > /usr/local/share/zsh/site-functions/_gh
```

并确保 `~/.zshrc` 中有以下两行（推荐 zsh 5.7 或更高版本）：

```sh
autoload -U compinit
compinit -i
```

fish：生成 `gh.fish` 补全脚本：

```sh
gh completion -s fish > ~/.config/fish/completions/gh.fish
```

PowerShell：用以下命令打开 profile 脚本：

```powershell
mkdir -Path (Split-Path -Parent $profile) -ErrorAction SilentlyContinue
notepad $profile
```

```powershell
Invoke-Expression -Command $(gh completion -s powershell | Out-String)
```

## 参数

### `SHELL`

必填，写作 `-s <shell>`。目标 shell。该参数与 `--shell` 旗标成对出现：实际用法是 `gh completion -s <shell>`，`<shell>` 作为 `-s`/`--shell` 旗标的值传入，而不是独立的位置参数。取值 `bash`、`zsh`、`fish`、`powershell`。

## 选项

### `--shell`

短旗标 `-s`。格式：`--shell <string>`。目标 shell 类型，取值 `bash`、`zsh`、`fish`、`powershell`。交互式使用时必须提供，否则报错。

## 使用提醒

- 本命令不需要认证即可运行。
- 输出被重定向（非终端）且未指定 `--shell` 时，按 `bash` 生成。
- 补全脚本由 gh 根命令动态生成，升级 gh 后建议重新生成并重新加载。

## 示例

```sh
# 生成并加载 bash 补全
eval "$(gh completion -s bash)"

# 生成 zsh 补全脚本
gh completion -s zsh > /usr/local/share/zsh/site-functions/_gh

# 生成 fish 补全脚本
gh completion -s fish > ~/.config/fish/completions/gh.fish
```

以上示例为说明性内容，未实际运行。

## 源码补充

- 各 shell 的手动配置指引与脚本生成入口见 [pkg/cmd/completion/completion.go](https://github.com/cli/cli/blob/fc4b137cdef0a6bd28fd461b7cf9c84a5812a8cd/pkg/cmd/completion/completion.go)。
