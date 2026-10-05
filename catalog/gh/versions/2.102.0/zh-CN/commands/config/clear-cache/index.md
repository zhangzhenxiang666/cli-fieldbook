---
title: gh config clear-cache
command:
  - config
  - clear-cache
---

清除 gh 的缓存目录。

## 简介

删除 gh 的整个缓存目录（其中存放 gh 的缓存数据，例如 [`gh api --cache`](cli:command:api) 的响应缓存），完成后输出 `Cleared the cache`。缓存会在后续使用中按需重建。

## 参数

本命令不接受位置参数。

## 使用提醒

- 清除缓存不影响认证凭据与配置文件，它们存储在别处。
- 缓存目录的位置可用 `gh environment` 查看。

## 示例

```sh
# 清除 cli 缓存
gh config clear-cache
```

以上示例为说明性内容，未实际运行。

## 源码补充

- 缓存目录的删除逻辑见 [pkg/cmd/config/clear-cache/clear_cache.go](https://github.com/cli/cli/blob/fc4b137cdef0a6bd28fd461b7cf9c84a5812a8cd/pkg/cmd/config/clear-cache/clear_cache.go)；目录解析来自 go-gh 的配置包。
