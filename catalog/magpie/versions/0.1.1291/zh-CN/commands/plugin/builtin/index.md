---
title: magpie plugin builtin
command:
  - plugin
  - builtin
---

列出 magpie 的内建插件,或开关其中一个(别名 `builtins`、`built-in`)。

## 简介

magpie 的内建功能以插件形式存在:Sessions、Library、路由组(routing groups)等。不带参数列出各内建插件及其开关状态;`on <id>` / `off <id>` 切换单个。

## 参数

### `verb`

`[on|off`。省略时列出;`on`/`off` 表示要开关。

### `id`

`<id>]`。要开关的内建插件 id(仅在 `on`/`off` 时需要)。

## 示例

```sh
magpie plugin builtin
magpie plugin builtin off sessions
```

以上示例为说明性内容,未实际运行。

## 使用提醒

- 关掉承载核心功能的内建插件(如路由组)会影响相应能力,操作前确认依赖;
- 想按预设批量启用见 [`magpie plugin preset`](cli:command:plugin/preset)。

## 源码补充

- 分发见 [plugins_cli.go](https://github.com/yetone/magpie/blob/33dbdcc529622cf0dd053c99eb34f51c06fbba77/internal/cli/plugins_cli.go);内建插件清单以该提交的 pluginrt 实现为准。
