---
title: magpie plugin on
command:
  - plugin
  - on
---

启用一个已安装的插件。

## 简介

插件可以在不卸载的情况下停用/启用。`on` 让插件重新参与 provider 登录、请求承载或网关中间件处理。

## 参数

### `name`

`<name>`。插件名;接受安装名或包名。

## 示例

```sh
magpie plugin on opencode-gemini-auth
```

以上示例为说明性内容,未实际运行。

## 源码补充

- 实现见 [plugins_cli.go](https://github.com/yetone/magpie/blob/33dbdcc529622cf0dd053c99eb34f51c06fbba77/internal/cli/plugins_cli.go)。
