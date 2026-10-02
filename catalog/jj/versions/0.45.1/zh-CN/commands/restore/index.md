---
title: jj restore
command:
  - restore
---

## 简介

把目标修订中的路径内容恢复为来源修订的内容。

## 参数

### `FILESETS`

只恢复匹配路径；省略会作用于所有路径。

## 选项

### `--from`

来源修订；只给 --into 时默认 @。

### `--into`

要重写的目标修订；只给 --from 时默认 @；别名 --to。

### `--changes-in`

撤销该修订相对合并父树的改动；不能简单把 merge 的父树理解成某一个父。

### `--interactive`

交互选择需要恢复的部分。

### `--tool`

指定 diff editor；隐含 --interactive。

### `--restore-descendants`

重写后代时保留其文件树内容，而非继续重放原来的 diff。

### `--help`

显示帮助。

## 使用提醒

全局参数见 [Global Options](../../concepts/global-options.md)。

**Hidden / Compatibility Options（源码补充，不是普通 help 可见项）**

```text
  -r, --revision <REVISION>
          【仅用于报错提示，不是可用功能】解析后会主动返回错误，提示改用 --from 或 --changes-in。
          不要把它当成普通 revision 参数。
```

**注意：** 无端点参数时等价于 --changes-in @：恢复到父树，保留该 change 的描述等元数据。会覆盖工作修改；先检查 diff / 操作日志。 --changes-in 与 --from/--into 互斥；此命令没有正常可用的 -r 模式，隐藏 -r 只是迁移报错入口。

源码：[cli/src/commands/restore.rs](https://github.com/jj-vcs/jj/blob/7c41cdeb16b6b321c64e789a966b6adf723816a5/cli/src/commands/restore.rs)。
