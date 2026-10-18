---
title: playwright-cli snapshot
command:
  - snapshot
---

捕获页面快照以获取元素引用。

## 简介

`snapshot` 输出当前页面的可访问性快照：页面的结构化表示，其中每个可交互元素带引用（如 `e15`），供交互命令作为 `target` 使用。每次命令执行后也会自动附带快照；本命令用于按需重新捕获，或做局部、限深捕获。不给 `--filename` 时快照保存为带时间戳的文件并返回链接；给目标参数则只捕获该元素子树。

## 参数

### `target`

可选，写作 `[target]`。只捕获该元素子树：上次快照的元素引用或唯一选择器。

## 选项

### `--filename`

格式：`--filename <VALUE>`。把快照保存到指定 Markdown 文件，而不是按时间戳命名。

### `--depth`

格式：`--depth <VALUE>`。限制快照深度，缺省不限。

### `--boxes`

格式：`--boxes`。在快照中附带每个元素的边界框 `[box=x,y,width,height]`；坐标为视口相对 CSS 像素（Element.getBoundingClientRect）。

## 使用提醒

大页面先用 `--depth` 限深或 [find](cli:command:find) 检索，再对子元素做局部快照，可显著减小体积。

## 示例

```sh
playwright-cli snapshot
playwright-cli snapshot --filename=after-click.yaml
playwright-cli snapshot "#main"
playwright-cli snapshot --depth=4
playwright-cli snapshot --boxes
```

以上示例为说明性内容，未实际运行。

## 源码补充

- 命令声明与底层工具映射见 [commands.ts](https://github.com/microsoft/playwright/blob/d1ead3ecca23182f2d06d761c28e3d4edafb6595/packages/playwright-core/src/tools/cli-daemon/commands.ts)。
