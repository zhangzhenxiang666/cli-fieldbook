---
title: magpie webdav auto
command:
  - webdav
  - auto
---

设置网关自动同步的间隔(分钟),设置后显示同步状态。

## 简介

网关(应用、[`web`](cli:command:web) 或 [`serve`](cli:command:serve))在运行期间按此间隔自己同步;`off` 表示只在被要求时同步(`magpie webdav now`)。网关没在运行时不会有自动同步。

必须恰好给一个参数,其他值报错。设置成功后打印与 [`magpie webdav`](cli:command:webdav) 相同的状态输出。

## 参数

### `minutes`

`off|3|15|30|60` 之一:`off` 关闭自动同步,或一个分钟数。源码层面接受任意整数分钟(通过数字解析),`off` 之外的非法值会报错并回显正确格式。

## 使用提醒

- 状态输出会提示当前间隔:自动间隔为 0 时显示"只在被要求时同步";内部默认的自动间隔是 3 分钟(见 sync-backup 子系统文档)。
- 自动同步由网关执行;CLI 本身不驻留。

## 示例

```sh
magpie webdav auto off
magpie webdav auto 30
```

以上示例为说明性内容,未实际运行。

## 源码补充

- 见 [webdav_cli.go](https://github.com/yetone/magpie/blob/33dbdcc529622cf0dd053c99eb34f51c06fbba77/internal/cli/webdav_cli.go) 的 `syncCmd` `auto` 分支;默认间隔见 [sync-backup.md](https://github.com/yetone/magpie/blob/33dbdcc529622cf0dd053c99eb34f51c06fbba77/docs/subsystems/sync-backup.md)。
