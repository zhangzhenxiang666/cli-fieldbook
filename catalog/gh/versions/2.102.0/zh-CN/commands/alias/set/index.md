---
title: gh alias set
command:
  - alias
  - set
---

为一个 gh 命令定义快捷方式别名。

## 简介

定义一个词，调用时展开为完整的 gh 命令。展开式可以包含额外的参数与旗标：若展开式含有 `$1` 之类的位置占位符，跟在别名后面的额外参数会被插入对应位置；否则额外参数会追加到展开后的命令末尾。

展开式参数传 `-` 表示从标准输入读取展开字符串，可避开定义展开式时的引号问题。

若展开式以 `!` 开头、或给出了 `--shell`，该展开式是 shell 表达式，调用别名时经 `sh` 解释器执行，可以通过管道与重定向串联多条命令。

## 参数

### `ALIAS`

必填，写作 `<alias>`。要定义的别名名称。

### `EXPANSION`

必填，写作 `<expansion>`。别名的展开式；传 `-` 表示从标准输入读取。

## 选项

### `--shell`

短旗标 `-s`。格式：`--shell`。声明别名经 shell 解释器执行。

### `--clobber`

格式：`--clobber`。覆盖同名的既有别名。

## 使用提醒

- 别名与既有 gh 命令或扩展同名时，若它不是要覆盖的既有别名则报错；覆盖既有同名别名需加 `--clobber`。
- 展开式需要能对应到某个 gh 命令、扩展或别名，否则报错。
- Windows 的命令提示符（Command Prompt）要求参数使用双引号。

## 示例

```sh
# 注意：Windows 的命令提示符要求参数使用双引号
gh alias set pv 'pr view'
gh pv -w 123  #=> gh pr view -w 123

gh alias set bugs 'issue list --label=bugs'
gh bugs

gh alias set homework 'issue list --assignee @me'
gh homework

gh alias set 'issue mine' 'issue list --mention @me'
gh issue mine

gh alias set epicsBy 'issue list --author="$1" --label="epic"'
gh epicsBy vilmibm  #=> gh issue list --author="vilmibm" --label="epic"

gh alias set --shell igrep 'gh issue list --label="$1" | grep "$2"'
gh igrep epic foo  #=> gh issue list --label="epic" | grep "foo"
```

以上示例为说明性内容，未实际运行。

## 源码补充

- 占位符展开、`--shell` 前缀处理与名称校验见 [pkg/cmd/alias/set/set.go](https://github.com/cli/cli/blob/fc4b137cdef0a6bd28fd461b7cf9c84a5812a8cd/pkg/cmd/alias/set/set.go)。
