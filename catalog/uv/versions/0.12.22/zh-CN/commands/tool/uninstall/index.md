---
title: uv tool uninstall
command:
  - tool
  - uninstall
---

## 简介

卸载工具。

移除该工具在 uv 工具目录中的环境，并删除其在工具可执行目录中的入口点。用 `--all` 可一次卸载全部工具。

## 参数

### `name`

格式：`<NAME>...`。要卸载的工具名；可提供多个，或改用 `--all`。

## 选项

### `--help`

短旗标 `-h`。显示简明帮助；传入 `--help` 时显示长帮助。

### `--all`

卸载全部工具；与 `<NAME>` 互斥。

## 使用提醒

- 卸载删除工具的 venv 与可执行文件，但不影响缓存中 [uv tool run](cli:command:tool/run) 的临时环境（后者随 `uv cache clean` 清理）。
- 工具名与安装情况可用 [uv tool list](cli:command:tool/list) 查看；重新安装用 [uv tool install](cli:command:tool/install)。

## 示例

卸载单个工具或全部工具：

```console
$ uv tool uninstall ruff
$ uv tool uninstall --all
```

以上示例为说明性内容，未实际运行。
