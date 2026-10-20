---
title: magpie provider icon
command:
  - provider
  - icon
---

给自定义 provider 设置一个图片或内置图标。

## 简介

接受图片文件路径(PNG、JPEG、SVG 等)或内置图标名;传空字符串清除自定义图标(回落到 `generic`)。仅自定义 provider 可设置:预置厂商与订阅账户 provider 有自己的图标。

## 参数

### `id`

`<id>`。目标自定义 provider 的 id。

### `source`

`<file|name>`。图片文件路径、内置图标名,或空字符串清除。

## 示例

```sh
magpie provider icon my-relay ./logo.svg
```

以上示例为说明性内容,未实际运行。

## 源码补充

- 处理逻辑见 [providers_cli.go](https://github.com/yetone/magpie/blob/33dbdcc529622cf0dd053c99eb34f51c06fbba77/internal/cli/providers_cli.go) 中 `providerCmd()` 的 `icon` 分支。
