---
title: 4. 不要混用旧文档的拼写
---

v0.9.3 的公开命令树中没有顶层 `wait output`、`agent send` 或根级 `--no-session`。与当前功能对应的规范命令是：

```text
herdr pane wait-output ...
herdr agent prompt ...
herdr pane send-text ...
herdr pane send-keys ...
```

看到其他版本、分叉仓库或旧教程出现不同拼写时，先用 `herdr --version` 与精确子命令 `--help` 核对；不要把所有网上出现过的命令合并成一份“超集手册”。[S01](https://github.com/herdrdev/herdr/blob/7b116c05bfda646af39d2524c54e70c751f57ee8/src/cli/spec.rs#L6-L966)[S03](https://github.com/herdrdev/herdr/blob/7b116c05bfda646af39d2524c54e70c751f57ee8/src/cli.rs)
