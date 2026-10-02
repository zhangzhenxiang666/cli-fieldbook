---
title: 3. 非公开命令树中的入口
---

### `herdr server live-handoff`

```text
Usage: herdr server live-handoff [OPTIONS]

Options:
  --import-exe <PATH>           交接导入方可执行文件
  --expected-protocol <N>       期望协议版本
  --expected-version <VERSION>  期望程序版本
```

该入口在 server 手写运行分发/帮助中可见，但不在统一公开 spec 树中。用于实验性 live handoff 和特定恢复路径，可能绕过普通命令前置的版本/协议检查。这里单独列出，不计入 125 个公开节点，也不放进默认帮助采集脚本。**不是常规升级必跑命令。** [S13](https://github.com/herdrdev/herdr/blob/7b116c05bfda646af39d2524c54e70c751f57ee8/src/cli/server.rs)

### 内部启动与桥接入口

`client`、`remote-client-bridge`、`remote-api-bridge` 是主分发里的内部启动/传输入口。`server --handoff-import` 是交接导入路径。这些不是普通操作手册应承诺稳定性的 API；不建议从名称推断参数，更不要把它们加入批量“试运行”脚本。

本手册记录其存在，但不臆造未展开检查的内部协议、文件描述符、环境约定及完整参数表。[S02](https://github.com/herdrdev/herdr/blob/7b116c05bfda646af39d2524c54e70c751f57ee8/src/main.rs)[S03](https://github.com/herdrdev/herdr/blob/7b116c05bfda646af39d2524c54e70c751f57ee8/src/cli.rs)[S13](https://github.com/herdrdev/herdr/blob/7b116c05bfda646af39d2524c54e70c751f57ee8/src/cli/server.rs)
