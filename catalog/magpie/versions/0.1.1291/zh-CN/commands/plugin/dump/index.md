---
title: magpie plugin dump
command:
  - plugin
  - dump
---

显示 plugins.yml 最终合成结果:每个内建插件、其配置,以及每个值来自哪一层。

## 简介

插件配置来自多层合并(预设、plugins.yml、命令行设置过的 [`plugin options`](cli:command:plugin/options) 等)。`dump` 展开合成后的有效配置并标注每个值的来源层,用于排查"配置为什么是这个值"。

## 选项

### `--json`

以 JSON 输出,适合脚本处理。

## 示例

```sh
magpie plugin dump
magpie plugin dump --json
```

以上示例为说明性内容,未实际运行。

## 源码补充

- 实现见 [plugins_cli.go](https://github.com/yetone/magpie/blob/33dbdcc529622cf0dd053c99eb34f51c06fbba77/internal/cli/plugins_cli.go)。
