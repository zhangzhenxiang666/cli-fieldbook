---
title: magpie heap
command:
  - heap
---

导出正在运行的 magpie 的 Go 堆内存画像,并打印内存数据,用于报告 magpie 占用内存过多。

## 简介

`magpie heap` 通过本机网关(loopback)向 magpie 进程本身索取堆画像:macOS 的 `sample` 看到的 Go 帧是 `???`,所以画像必须由进程自己生成。画像写入 `file` 指定的文件;省略时写到当前目录的 `magpie-heap-<日期>-<时间>.pb.gz`,绝不覆盖已存在的文件。

完成后打印文件路径与进程的内存数据(Go 口径:HeapAlloc、HeapSys、goroutine 数等);提交内存问题报告时把文件和这些行一起发上。画像包含内存分配位置(函数名、源码行、大小)与 magpie 程序路径,不含密钥或消息内容;`go tool pprof <file>` 可以读取。

网关地址取 Settings 的网关端口(或 `MAGPIE_ADDR`);索取画像的上限时限为 2 分钟(巨大的堆需要先做一次回收)。

## 参数

### `file`

`[<file>]`。画像输出文件;省略时用默认名。已存在则报错拒绝,绝不覆盖。只接受一个文件名,不接受 `-`。

## 示例

```sh
magpie heap
magpie heap /tmp/magpie-heap.pb.gz
```

以上示例为说明性内容,未实际运行。

## 使用提醒

- 对端 magpie 版本过旧、没有画像端点时会明确提示"先更新再试"。
- 报告 CPU 问题用 [`magpie cpu`](cli:command:cpu)。

## 源码补充

- 用法文本、参数校验与请求逻辑见 [heap_cli.go](https://github.com/yetone/magpie/blob/33dbdcc529622cf0dd053c99eb34f51c06fbba77/internal/cli/heap_cli.go)。
