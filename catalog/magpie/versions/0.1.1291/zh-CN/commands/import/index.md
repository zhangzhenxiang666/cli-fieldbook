---
title: magpie import
command:
  - import
---

按 `magpie://import?…` 链接描述添加一个 provider。

## 简介

解析导入链接,先展示链接描述的 provider(地址、模型等);若本机已存在同 id 的 provider,提示将替换它。随后请求确认后保存。

系统把 `magpie://` 链接交给应用(Windows、Linux 的 URL 分发)时,无图形界面的环境直接等价于本命令。

## 参数

### `link`

`magpie://import?…` 形式的导入链接。

## 选项

### `--yes`

`-y, --yes`。跳过交互确认直接导入。stdin 不是终端(例如脚本或管道)时必须给出本选项,否则报错 `not a terminal: add -y to import without asking`。

## 使用提醒

- 交互确认默认只接受 `y` 或 `yes`,其余输入不保存任何内容。
- 链接不含 key 时保存后提示用 [`provider key`](cli:command:provider/key) 补上。
- 手动添加厂商(预设或自定义)用 [`provider add`](cli:command:provider/add)。

## 示例

```sh
magpie import -y 'magpie://import?…'
```

以上示例为说明性内容,未实际运行。

## 源码补充

- 链接解析、替换提示、终端检测与确认流程见 [providers_cli.go](https://github.com/yetone/magpie/blob/33dbdcc529622cf0dd053c99eb34f51c06fbba77/internal/cli/providers_cli.go) 的 `importCmd()`,`magpie://` 参数分发见 [main.go](https://github.com/yetone/magpie/blob/33dbdcc529622cf0dd053c99eb34f51c06fbba77/internal/cli/main.go)。
