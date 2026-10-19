---
title: magpie plugin off
command:
  - plugin
  - off
---

停用一个插件(不卸载)。

## 简介

停用后插件不再参与处理;迁移到它上面的 provider(见 [`magpie plugin move`](cli:command:plugin/move))随之停用,magpie 逐个提示——账户与设置保留,重新 `on` 或装回插件即恢复。

## 参数

### `name`

`<name>`。插件名;接受安装名或包名。

## 示例

```sh
magpie plugin off pi-antigravity
```

以上示例为说明性内容,未实际运行。

## 源码补充

- 实现见 [plugins_cli.go](https://github.com/yetone/magpie/blob/33dbdcc529622cf0dd053c99eb34f51c06fbba77/internal/cli/plugins_cli.go)。
