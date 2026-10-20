---
title: magpie plugin add
command:
  - plugin
  - add
---

安装一个插件:npm 包、Git 仓库或本地路径(别名 `install`)。

## 简介

`<npm | git | path>` 三种写法:

- npm 包名,如 `opencode-gemini-auth`;
- Git 仓库,如 `github:owner/repo`;
- 本地路径,如 `./my-plugin.js`(网关中间件)、`./alias.middleware.js`、`./recall.hooks.ts`(hook)。

pi 包(如 `pi-antigravity`)同法安装。本机没有 Bun(插件的运行时)时先自动下载。安装后若该插件接手了某个已退役的内建订阅,相应 provider 随之移交,并立即列出插件清单。

## 参数

### `package`

`<npm | git | path>`。插件来源,一次一个。

## 示例

```sh
magpie plugin add opencode-gemini-auth
magpie plugin add github:someone/some-plugin
magpie plugin add ./my.middleware.js
```

以上示例为说明性内容,未实际运行。

## 使用提醒

- 插件代码会在本机运行:只安装信任来源的插件;
- 装完按需用 [`magpie plugin login <provider>`](cli:command:plugin/login) 登录、[`magpie plugin options`](cli:command:plugin/options) 配置。

## 源码补充

- 安装流程与 Bun 下载见 [plugins_cli.go](https://github.com/yetone/magpie/blob/33dbdcc529622cf0dd053c99eb34f51c06fbba77/internal/cli/plugins_cli.go)。
