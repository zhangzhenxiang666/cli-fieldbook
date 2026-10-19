---
title: magpie plugin options
command:
  - plugin
  - options
---

查看或设置交给一个插件的配置(别名 `config`)。

## 简介

即中间件拿到的 `ctx.options`、provider 插件的配置项。三种用法:

- 不带值:显示当前配置 JSON;尚未设置时,显示该插件包建议的示例配置;
- `<json>`:设置为该 JSON;
- `off`:清除设置。

插件名解析宽松:完整安装 spec、包名、社区 README 的短名都能找到。

## 参数

### `name`

`<name>`。插件名(spec、包名或短名均可)。

### `json`

`[<json> | off]`。要设置的 JSON 文本,或 `off` 清除。

## 示例

```sh
magpie plugin options pi-antigravity
magpie plugin options my.middleware.js '{"verbose":true}'
```

以上示例为说明性内容,未实际运行。

## 源码补充

- 名字解析与显示逻辑见 [plugins_cli.go](https://github.com/yetone/magpie/blob/33dbdcc529622cf0dd053c99eb34f51c06fbba77/internal/cli/plugins_cli.go)。
