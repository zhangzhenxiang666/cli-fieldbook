---
title: magpie plugin rm
command:
  - plugin
  - rm
---

移除一个插件(别名 `remove`、`uninstall`)。

## 简介

按安装名移除。若有 provider 已迁移到该插件上(见 [`magpie plugin move`](cli:command:plugin/move)),这些 provider 随之停用,直到插件再次安装;它们的账户与设置保留,magpie 会逐个提示。

## 参数

### `name`

`<name>`。插件名;接受安装名或包名。

## 示例

```sh
magpie plugin rm pi-antigravity
```

以上示例为说明性内容,未实际运行。

## 源码补充

- 实现见 [plugins_cli.go](https://github.com/yetone/magpie/blob/33dbdcc529622cf0dd053c99eb34f51c06fbba77/internal/cli/plugins_cli.go)。
