---
title: magpie zed
command:
  - zed
---

`magpie zed` 查看或设置 Zed 的模型。

## 简介

Zed 编辑器的 agent 入口。四种通用形态:

- `magpie zed`:显示 Zed 当前的模型与接线状态。
- `magpie zed <model>`:把模型设为 `provider/model`(或路由组 `group/<id>`)。
- `magpie zed default`:撤销 magpie 的接管;已接线时解除接线,还原 Zed 自己原来的设置。

magpie 改写 `~/.config/zed/settings.json`(macOS 亦然;`MAGPIE_ZED_CONFIG_DIR` 可改配置目录,Windows 在 `%APPDATA%\Zed\settings.json`)。

可设字段:仅有 `model`(以 provider 与模型名成对写入其 assistant 模型设置)。

## 参数

### `target`

要查看或设置的模型(`provider/model` 形式)、字段名,或 `default`(撤销接管、还原原设置)。

### `value`

字段的新值;省略时表示查看该字段当前值。

## 使用提醒

- agent 形式不接受任何 `-` 开头的参数:出现即报错,且什么都不改。
- Zed 的请求经本地网关转译;其 assistant 面板的模型列表会包含经 magpie 接入的模型。

## 示例

```sh
magpie zed
magpie zed minimax/minimax-m3
magpie zed default
```

以上示例为说明性内容,未实际运行。

## 源码补充

- agent 通用分发语法见 [main.go](https://github.com/yetone/magpie/blob/33dbdcc529622cf0dd053c99eb34f51c06fbba77/internal/cli/main.go)。
- Zed 的注册与字段定义见 [agents.go](https://github.com/yetone/magpie/blob/33dbdcc529622cf0dd053c99eb34f51c06fbba77/internal/agent/agents.go) 与 [zed.go](https://github.com/yetone/magpie/blob/33dbdcc529622cf0dd053c99eb34f51c06fbba77/internal/agent/zed.go)。
