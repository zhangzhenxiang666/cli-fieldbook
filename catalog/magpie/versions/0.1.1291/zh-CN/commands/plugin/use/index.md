---
title: magpie plugin use
command:
  - plugin
  - use
---

指定由这个插件承载另一个插件也登入了的 provider(别名 `prefer`)。

## 简介

当两个插件都能服务同一个 provider(一个负责登录、另一个负责承载请求)时,`use` 指定由哪个插件实际服务。设置后立即列出插件清单确认结果。

## 参数

### `name`

`<name>`。负责承载的插件名。

### `provider`

`<provider>`。被服务的 provider id。

## 示例

```sh
magpie plugin use pi-antigravity antigravity
```

以上示例为说明性内容,未实际运行。

## 使用提醒

- 插件清单中"signed in to it too"的提示行会给出当前可 `use` 的组合。

## 源码补充

- 实现见 [plugins_cli.go](https://github.com/yetone/magpie/blob/33dbdcc529622cf0dd053c99eb34f51c06fbba77/internal/cli/plugins_cli.go)。
