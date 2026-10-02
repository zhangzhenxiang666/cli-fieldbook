---
title: jj run
command:
  - run
---

## 简介

在隔离工作副本中跨多个修订执行外部命令，默认把执行产生的修改写回修订。

## 参数

### `COMMAND`

外部可执行程序。

### `ARGS`

传给外部程序的参数；用 -- 分隔 jj 参数与程序参数。

## 选项

### `--revision`

要处理的修订集合，可重复；省略时使用 revsets.run，内置为 reachable(@, mutable())。

### `--jobs`

并发进程数；覆盖 run.jobs，未配置时为 1。

### `--root`

从每个隔离工作副本的根目录执行，而非调用 jj run 时对应的子目录。

### `--clean`

执行前删除并重建隔离工作副本；默认会复用，以保留构建产物。

### `--restore-descendants`

提交修改后，保持后代内容不变，而非重放后代补丁。

### `--passthrough`

标准输出 / 错误直接连接终端；仅允许单任务，不继承标准输入。

### `--ignore-changes`

丢弃程序产生的文件修改，不重写提交；只读测试通常应带上；允许检查 immutable 提交。

### `--ignore-errors`

失败时继续其他修订；失败任务修改不保存，成功任务最终原子应用；外部失败不决定 jj run 的最终退出码。

### `--help`

显示帮助。

## 使用提醒

全局参数见 [Global Options](../../concepts/global-options.md)。

**Hidden / Compatibility Options（源码补充，不是普通 help 可见项）**

```text
  --revisions <REVSETS>
          --revision 的隐藏长别名；不应据此推断所有命令都接受这两个拼写。

  -x
          隐藏的无操作兼容标志；便于从 git rebase -x 迁移，不用于传递命令。
```

**注意：** 设置 JJ_CHANGE_ID、JJ_COMMIT_ID、JJ_WORKSPACE_ROOT。隔离工作副本不是安全沙箱：外部命令仍可能联网或修改目录外资源。自动化测试慎用 --ignore-errors，以免把失败当成功。 --ignore-changes 与 --restore-descendants 互斥；--passthrough 在 jobs > 1 时会报错。

源码：[cli/src/commands/run.rs](https://github.com/jj-vcs/jj/blob/7c41cdeb16b6b321c64e789a966b6adf723816a5/cli/src/commands/run.rs)。
