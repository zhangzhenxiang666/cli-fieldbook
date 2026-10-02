---
title: herdr pane resize
command:
  - pane
  - resize
---

## 简介

调整窗格分割尺寸。

## 选项

### `--direction`

方向：left、right、up、down。

### `--amount`

调整幅度，必须为有限浮点数；不要当作固定的终端列数/行数。

### `--pane`

显式指定作为操作起点的 pane ID。

### `--current`

使用调用进程环境中的 HERDR_PANE_ID；不是“鼠标正指着的窗格”。

### `--help`

打印该命令的帮助。

## 使用提醒

#### 行为与限制

布局与有效调整范围由运行时判定；手册不臆造此选项未标注的默认值。

源码：[S01](https://github.com/herdrdev/herdr/blob/7b116c05bfda646af39d2524c54e70c751f57ee8/src/cli/spec.rs#L6-L966) [S04](https://github.com/herdrdev/herdr/blob/7b116c05bfda646af39d2524c54e70c751f57ee8/src/cli/pane.rs)
