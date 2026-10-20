---
title: magpie gateway-key
command:
  - gateway-key
---

管理客户端调用共享网关时使用的网关密钥:增删、轮换、限额与可用范围。

## 简介

当 magpie 的网关被共享给其他客户端(其他机器、同事或脚本)时,每个客户端用一个网关密钥(gateway key)调用;`gateway-key` 系列命令管理这些密钥。不带子命令时等同 [`list`](cli:command:gateway-key/list)。

子命令一览:

- [`list`](cli:command:gateway-key/list):列出全部密钥及限额、可用模型与账户
- [`add`](cli:command:gateway-key/add):新建一个密钥
- [`rotate`](cli:command:gateway-key/rotate):换掉某个密钥的值
- [`remove`](cli:command:gateway-key/remove):删除某个密钥
- [`limit`](cli:command:gateway-key/limit):设置该密钥自身的用量限额
- [`models`](cli:command:gateway-key/models):限定该密钥可用的模型
- [`quotas`](cli:command:gateway-key/quotas):是否向该密钥告知其可用范围的配额

## 使用提醒

- `add` 与 `rotate` 会打印新生成的密钥,只显示一次;`remove` 成功后打印 `Gateway key removed`。
- 源码中另有 `gateway-key accounts <id>` 子形式(限定密钥可用的订阅账户白名单),主帮助未列出,本版命令参考未单独收录。

## 源码补充

- 全部分发与表格输出见 [gateway_keys_cli.go](https://github.com/yetone/magpie/blob/33dbdcc529622cf0dd053c99eb34f51c06fbba77/internal/cli/gateway_keys_cli.go)。
