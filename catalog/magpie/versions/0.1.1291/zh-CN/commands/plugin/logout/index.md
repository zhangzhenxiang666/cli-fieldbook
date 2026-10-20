---
title: magpie plugin logout
command:
  - plugin
  - logout
---

忘记一个插件 provider 的登录(别名 `signout`)。

## 简介

清除 magpie 保存的该 provider 登录态;不影响其他 provider。

## 参数

### `provider`

`<provider>`。插件添加的 provider id。

## 示例

```sh
magpie plugin logout antigravity
```

以上示例为说明性内容,未实际运行。

## 源码补充

- 实现见 [plugins_cli.go](https://github.com/yetone/magpie/blob/33dbdcc529622cf0dd053c99eb34f51c06fbba77/internal/cli/plugins_cli.go)。
