---
title: magpie search move
command:
  - search
  - move
---

把一个搜索 API 移到询问顺序中的第 n 位。别名 `search mv`。

## 简介

询问顺序默认为添加顺序;本命令把指定 API 移到位置 `n`(从 1 起,最大为 API 总数),其余顺延。

## 参数

### `api`

`<api>`。API 名称,不区分大小写;必须是已配置的 API。

### `n`

`<n>`。目标位置,从 1 到当前 API 总数;越界报错并提示有效范围。

## 示例

```sh
magpie search move tavily 1
```

以上示例为说明性内容,未实际运行。

## 源码补充

- 顺序重排见 [search_cli.go](https://github.com/yetone/magpie/blob/33dbdcc529622cf0dd053c99eb34f51c06fbba77/internal/cli/search_cli.go) 中的 `move` 分支。
