---
title: 存储状态
uses:
  - command:state-save
  - command:cookie-list
  - command:localstorage-list
---

页面的持久数据分三层：cookie、localStorage（跨会话）与 sessionStorage（标签页会话内）。playwright-cli 为每层提供 list/get/set/delete/clear 命令族，另提供整体的**存储状态文件**导出/导入。本文依据官方 skills 文档快照（storage-state 主题）与固定提交源码。

## 三层存储与命令族

| 层 | 命令族前缀 | 生命周期 |
| --- | --- | --- |
| cookie | `cookie-*` | 随浏览器 profile；域与路径作用 |
| localStorage | `localstorage-*` | 按源持久，直到清除 |
| sessionStorage | `sessionstorage-*` | 标签页会话内 |

```sh
playwright-cli cookie-list --domain=example.com
playwright-cli cookie-get session_id
playwright-cli localstorage-set theme dark
playwright-cli sessionstorage-get step
```

list 与 get 命令以 raw 模式输出，便于取值入变量。

## 存储状态文件

[state-save](cli:command:state-save) 把当前 cookie 与 localStorage 导出为一个 JSON 状态文件；[state-load](cli:command:state-load) 把文件应用回会话。这是官方推荐的登录态复用方式，与 Playwright 测试的 `storageState` 同一格式：

```sh
# 登录一次后保存
playwright-cli state-save auth.json
# 之后的新会话直接恢复登录态
playwright-cli open https://example.com
playwright-cli state-load auth.json
```

## 安全边界

存储状态文件包含会话凭据（cookie 中的令牌、localStorage 中的令牌等），应按敏感数据处理，避免提交到版本库或随附件外发。

以上示例为说明性内容，未实际运行。
