---
title: 网络观察与拦截
uses:
  - command:requests
  - command:route
  - command:network-state-set
---

playwright-cli 提供三层网络能力：观察（请求列表与详情）、拦截（模拟响应）与状态模拟（离线）。本文依据官方 skills 文档快照（request-mocking 主题）与固定提交源码。

## 观察：编号模型

[requests](cli:command:requests) 列出页面加载以来的请求，每条带 1 起始序号；默认不含成功的静态资源（`--static` 包含），`--filter=<regexp>` 按 URL 正则过滤。后续命令用编号取详情：

- [request](cli:command:request)：完整详情（请求头/请求体/响应头/响应体）。
- [request-headers](cli:command:request-headers)/[request-body](cli:command:request-body)：只看请求侧。
- [response-headers](cli:command:response-headers)/[response-body](cli:command:response-body)：只看响应侧；文本体内联返回，二进制保存为文件并给路径。

配合 [console](cli:command:console) 的消息级别过滤，构成页面行为调试的基本工具。

## 拦截：路由模拟

[route](cli:command:route) 为匹配 URL 模式的请求注册模拟响应（状态码、响应体、Content-Type、附加/移除响应头），命中模式的请求不再发往网络。适合 mock 后端接口、稳定复现失败分支：

```sh
playwright-cli route "**/*.jpg" --status=404
playwright-cli route "https://api.example.com/**" --body='{"mock": true}'
playwright-cli route-list
playwright-cli unroute "**/*.jpg"
playwright-cli unroute   # 移除全部
```

路由在会话内持续生效直到 [unroute](cli:command:unroute) 或会话关闭。

## 状态模拟

[network-state-set](cli:command:network-state-set) 把浏览器切到 `offline`/`online`，测试页面的离线逻辑与恢复处理。

以上示例为说明性内容，未实际运行。
