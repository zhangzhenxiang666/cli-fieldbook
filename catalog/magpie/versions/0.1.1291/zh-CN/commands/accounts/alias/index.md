---
title: magpie accounts alias
command:
  - accounts
  - alias
---

给订阅账户起一个你自己的名字。

## 简介

名字显示在 [`magpie accounts`](cli:command:accounts) 的卡片、菜单栏与 [`magpie quota`](cli:command:quota) 里,只存在 magpie 内部,从不写给厂商或插件。三种用法:

- 不带名字:显示该账户当前的名字;没有名字时,若它顶着某个 key 档位的卡片,则显示该档位名并提示如何命名;
- 带名字(可含空格,多个参数以空格连接):设置;
- `--clear`:清除名字。

## 参数

### `agent`

`<agent|<plugin>>`。账户所属的订阅类别(含别名),或插件订阅的 provider。

### `email`

`<email>`。要命名的账户;后续命令([`magpie accounts switch`](cli:command:accounts/switch) 等)可以直接用这个名字代替邮箱。

### `name`

`[<name>]`。要设置的名字;省略为查看,`--clear` 为清除。

## 选项

### `--clear`

清除该账户的名字。

## 示例

```sh
magpie accounts alias claude me@example.com 主力号
magpie accounts alias claude 主力号 --clear
```

以上示例为说明性内容,未实际运行。

## 源码补充

- 名字解析与档位卡片逻辑见 [accounts_cli.go](https://github.com/yetone/magpie/blob/33dbdcc529622cf0dd053c99eb34f51c06fbba77/internal/cli/accounts_cli.go)。
