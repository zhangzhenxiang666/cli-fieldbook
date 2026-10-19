---
title: magpie plugin preset
command:
  - plugin
  - preset
---

按预设决定内建插件从哪些启动。

## 简介

两种预设:

- `essentials`:从最常用的一组内建插件启动;
- `all`:全部内建插件都启动。

设置后立即列出内建插件及其状态。

## 参数

### `kind`

`essentials|all`。预设名,必填。

## 示例

```sh
magpie plugin preset essentials
```

以上示例为说明性内容,未实际运行。

## 使用提醒

- 预设只影响内建插件的启动集合;已安装的社区插件不受影响,个别开关用 [`magpie plugin builtin on|off <id>`](cli:command:plugin/builtin)。

## 源码补充

- 实现见 [plugins_cli.go](https://github.com/yetone/magpie/blob/33dbdcc529622cf0dd053c99eb34f51c06fbba77/internal/cli/plugins_cli.go)。
