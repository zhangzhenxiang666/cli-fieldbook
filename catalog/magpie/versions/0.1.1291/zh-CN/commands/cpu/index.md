---
title: magpie cpu
command:
  - cpu
---

录制正在运行的 magpie 的 Go CPU 画像(默认 30 秒),用于报告 magpie 占用 CPU 过多。

## 简介

`magpie cpu` 与 [`magpie heap`](cli:command:heap) 同理:画像由 magpie 进程自己通过本机网关(loopback)生成。开始录制后,按提示在这段时间里照常使用 magpie(例如跑 Codex),让它复现高负载场景。

画像写入 `file`;省略时写到当前目录的 `magpie-cpu-<日期>-<时间>.pb.gz`,绝不覆盖已存在的文件。完成后打印文件路径、录制期间进程的 CPU 时间与 goroutine 数;报告问题时把文件和这些行一起发上。画像只含时间去了哪里(函数名、源码行)与程序路径,不含密钥或消息。

## 参数

### `file`

`[<file>]`。画像输出文件;省略时用默认名,已存在则报错拒绝。

## 选项

### `--seconds`

`--seconds N`。录制秒数,默认 30,范围 5 到 120;也接受 `--seconds=N` 形式,给出两次报错。

## 示例

```sh
magpie cpu --seconds 60
magpie cpu /tmp/magpie-cpu.pb.gz --seconds 90
```

以上示例为说明性内容,未实际运行。

## 使用提醒

- 网关地址取 Settings 的网关端口(或 `MAGPIE_ADDR`);录制前会先探测一次,连不上直接报错,不白等。

## 源码补充

- 用法文本、参数校验与请求逻辑见 [cpu_cli.go](https://github.com/yetone/magpie/blob/33dbdcc529622cf0dd053c99eb34f51c06fbba77/internal/cli/cpu_cli.go)。
