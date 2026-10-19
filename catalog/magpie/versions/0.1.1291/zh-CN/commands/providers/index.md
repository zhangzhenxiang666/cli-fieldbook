---
title: magpie providers
command:
  - providers
---

列出你已有的 provider:主机、密钥、模型与谁在用它们。

## 简介

以表格列出全部 provider,每行含名称(自定义 provider 附加 custom 标记)、id、主机、密钥状态与模型数量、以及正在使用它的 agent / 路由组。

密钥一列的几种状态:已配置密钥(显示打码后的 key)、订阅账户登录(sign in 见 [`accounts`](cli:command:accounts) 系命令)、Google Vertex 凭据、无需密钥、缺密钥、被 [`provider off`](cli:command:provider/off) 关闭。providers.json 读取失败时不当作"还没有 provider"处理,而是直接报错。

还没有任何 provider 时,提示用 [`provider add`](cli:command:provider/add) 添加、[`presets`](cli:command:presets) 查看预置厂商。

## 使用提醒

- 模型数量形如 "N of M models",表示从厂商列表挑选暴露了 N 个、共获取 M 个,并附上次抓取时间。
- 想看单个 provider 的详情用 [`magpie provider <id>`](cli:command:provider)。

## 示例

```sh
magpie providers
```

以上示例为说明性内容,未实际运行。

## 源码补充

- 列表与各状态渲染见 [providers_cli.go](https://github.com/yetone/magpie/blob/33dbdcc529622cf0dd053c99eb34f51c06fbba77/internal/cli/providers_cli.go) 中 `providers()`。
