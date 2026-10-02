---
title: herdr pane move
command:
  - pane
  - move
---

## 简介

把窗格移到其他标签页或工作区。

## 参数

### `PANE_ID`

被移动的窗格。

## 选项

### `--tab`

移入现有标签页。

### `--split`

现有标签页中的分割方向：right 或 down。

### `--target-pane`

现有标签页里作为分割锚点的窗格。

### `--ratio`

移入现有布局时的分割比例。

### `--new-tab`

创建新标签页承载被移动窗格。

### `--workspace`

新标签页的目标工作区。

### `--new-workspace`

创建新工作区承载被移动窗格。

### `--label`

新标签页或新工作区的名称。

### `--tab-label`

新工作区内初始标签页名称。

### `--focus`

创建后切换焦点到新对象。

### `--no-focus`

创建后不改变当前焦点；不要与 --focus 同时传入。

### `--help`

打印该命令的帮助。

## 使用提醒

#### 行为与限制

现有 tab：--tab TAB_ID --split right|down \[--target-pane ID] \[--ratio FLOAT]。

新 tab：--new-tab \[--workspace ID] \[--label TEXT]。

新 workspace：--new-workspace \[--label TEXT] \[--tab-label TEXT]。三种目的地形式互斥。

源码：[S01](https://github.com/herdrdev/herdr/blob/7b116c05bfda646af39d2524c54e70c751f57ee8/src/cli/spec.rs#L6-L966) [S04](https://github.com/herdrdev/herdr/blob/7b116c05bfda646af39d2524c54e70c751f57ee8/src/cli/pane.rs)
