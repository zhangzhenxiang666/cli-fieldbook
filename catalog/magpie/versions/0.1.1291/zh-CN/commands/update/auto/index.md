---
title: magpie update auto
command:
  - update
  - auto
---

查看或设置应用是否自己检查更新、多久查一次、发现新版是立即下载还是只提示。

## 简介

不带参数时显示当前设置;带参数时更新设置并保存。检查频率默认 6h,可选 30m、1h、6h、24h;下载方式默认立即下载,`notify` 只提示。

## 参数

### `state`

`[on|off]`。开或关自动检查;不带任何参数时显示当前设置。

### `mode`

`[download|notify]`。`download`:发现新版立即下载;`notify`:只提示有新版,由你点击下载或运行 [`update`](cli:command:update)——适合按流量计费的网络。

### `interval`

`[30m|1h|6h|24h]`。检查频率,默认 6h。

## 使用提醒

- 三个参数可任意组合使用,如 `magpie update auto on notify 1h`。
- 自动检查关闭后,仍可用 [`check`](cli:command:update/check) 手动检查。

## 示例

```sh
magpie update auto on download 1h
magpie update auto notify
```

以上示例为说明性内容,未实际运行。

## 源码补充

- 设置解析与当前状态输出见 [update_cli.go](https://github.com/yetone/magpie/blob/33dbdcc529622cf0dd053c99eb34f51c06fbba77/internal/cli/update_cli.go);默认频率(6h)与可选档位(30m/1h/6h/24h)在 `updateEveries` 表中。
