---
title: 配置、别名与扩展
uses:
  - command:alias
  - command:alias/delete
  - command:alias/import
  - command:alias/list
  - command:alias/set
  - command:completion
  - command:config
  - command:config/clear-cache
  - command:config/get
  - command:config/list
  - command:config/set
  - command:extension
  - command:extension/browse
  - command:extension/create
  - command:extension/exec
  - command:extension/install
  - command:extension/list
  - command:extension/remove
  - command:extension/search
  - command:extension/upgrade
---

gh 的可定制面分三层：配置文件决定编辑器、协议、提示等默认行为；别名给常用命令起短名字；扩展则是第三方仓库提供的额外子命令。本文讲三者的存放位置、生效规则与边界。

## 配置目录与两个文件

配置目录由 `GH_CONFIG_DIR` 指定，未设置时按平台取默认路径（见[环境变量](../reference/environment.md)）。目录下有两个 YAML 文件，职责不同：

- `config.yml`：全局配置。保存各配置键的值与 `aliases` 一节，`gh alias` 组的读写都落在这里。
- `hosts.yml`：按主机划分的配置与凭据。`gh auth login` 写入的主机条目带已认证用户与令牌，也可携带按主机覆盖的配置键。

取值时按主机设置的值优先于全局值，都没有时落到内置默认。并非每个键都两级皆可：`clipboard` 只能全局设置，`api_host` 只能按主机设置（且须配 `--host`），其余键均可全局或按主机设置。受支持键的完整清单（含合法取值与默认值）见 [`gh config`](cli:command:config) 命令页，也可用 [gh config list](cli:command:config/list) 直接查看当前值；读取与写入用 [gh config get](cli:command:config/get) 与 [gh config set](cli:command:config/set)，带 `--host` 即作用于该主机。[gh config clear-cache](cli:command:config/clear-cache) 清的是 gh 的缓存目录，不动配置文件。另有细节：用 `gh config get oauth_token --host <主机>` 查询时，返回的是该主机当前活动令牌。

## 别名：短名字与命令组合

别名是"名字 → 展开式"的映射，存放在 `config.yml` 的 `aliases` 一节。全新安装自带一个默认别名 `co`，展开为 `pr checkout`。

[gh alias set](cli:command:alias/set) 定义别名，展开语义有两档：

- 普通别名：展开式是完整的 gh 命令行。展开式里的 `$1`、`$2` 等占位符由调用时的额外参数填入，多余的参数追加到展开后的命令末尾；占位符没有被足够的参数填上时直接报错。展开式也可以传 `-` 从标准输入读取，避开引号转义问题。
- shell 别名：展开式以 `!` 开头，或定义时给了 `--shell`。调用时把 `!` 后的内容交给 `sh -c` 执行，因此可以用管道与重定向串联多条命令；shell 里的退出码会作为 gh 的退出码向外传递。

命名有约束：别名不能与既有命令或扩展重名；重新定义已有的同名别名要加 `--clobber`。名字本身可以带层级，例如 `issue mine` 定义在 `gh issue` 之下。展开式必须能对应到某个命令、扩展或别名，否则不被接受。已定义的别名在启动时注册为命令，帮助中归入别名分组。

[gh alias list](cli:command:alias/list) 以 YAML 映射输出全部别名，这份输出可直接交给 [gh alias import](cli:command:alias/import) 在机器之间迁移；删除用 [gh alias delete](cli:command:alias/delete)。

## 扩展：第三方子命令

扩展是名称以 `gh-` 开头的仓库，仓库根目录要有同名可执行文件：调用 `gh <扩展名>` 时，gh 把全部参数转发给该可执行文件。扩展不能覆盖核心命令——与核心命令重名的扩展不会注册成命令，此时可用 [gh extension exec](cli:command:extension/exec) 按短名调用。

形态有两类，也影响 [gh extension install](cli:command:extension/install) 的安装方式：预编译扩展优先取 release 附件中的平台二进制；仓库没有 release 时按脚本扩展克隆整个仓库。`--pin` 可固定到标签或提交，被固定的扩展不能用 [gh extension upgrade](cli:command:extension/upgrade) 升级。[gh extension create](cli:command:extension/create) 生成脚手架，交互选择或用 `--precompiled=go`、`--precompiled=other` 指明预编译类型，默认是脚本类。其余日常操作：[gh extension list](cli:command:extension/list) 看已装列表，[gh extension search](cli:command:extension/search) 搜索，[gh extension browse](cli:command:extension/browse) 进入交互式浏览界面，[gh extension remove](cli:command:extension/remove) 移除。

开发中的本地扩展用 `gh extension install .` 从当前目录安装：gh 在扩展安装目录（gh 数据目录下的 `extensions` 子目录）建立指向该仓库的符号链接（Windows 用等效机制）。可执行文件须以仓库名存在于仓库根目录；缺失时安装本身仍算完成，但执行会失败，需要先构建或手工补上。本地扩展与被固定的扩展一样不能升级。

gh 调用扩展时会为它设置两个环境变量：`GH_EXTENSION=1` 让扩展判断自己是被 gh 调起还是独立运行；`GH_PATH` 指回当前 gh 可执行文件，扩展借此回调同一个 gh。执行扩展时 gh 每 24 小时检查一次新版本并在标准错误提示，`GH_NO_EXTENSION_UPDATE_NOTIFIER` 可关闭。扩展不经 GitHub 验证或背书，安装即信任其发布者。

## 补全

[gh completion](cli:command:completion) 为 `bash`、`zsh`、`fish` 与 `powershell` 生成补全脚本，不需要认证。经包管理器安装 gh 时补全可能已经就位；手动配置是把生成的脚本放进 shell 的补全目录或 profile，升级 gh 后建议重新生成并重新加载。
