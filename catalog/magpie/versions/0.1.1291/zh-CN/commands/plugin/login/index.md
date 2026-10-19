---
title: magpie plugin login
command:
  - plugin
  - login
---

登录一个由插件添加的 provider(别名 `signin`)。

## 简介

执行该插件提供的登录流程。个别 provider 支持多种登录方式时,`<method>` 选择其一;省略时用插件的默认方式。[`magpie accounts add`](cli:command:accounts/add) 遇到插件订阅时也会转到这个流程。

## 参数

### `provider`

`<provider>`。插件添加的 provider id。

### `method`

`[<method>]`。登录方式,仅在 provider 支持多种时使用。

## 示例

```sh
magpie plugin login antigravity
```

以上示例为说明性内容,未实际运行。

## 源码补充

- 实现见 [plugins_cli.go](https://github.com/yetone/magpie/blob/33dbdcc529622cf0dd053c99eb34f51c06fbba77/internal/cli/plugins_cli.go)。
