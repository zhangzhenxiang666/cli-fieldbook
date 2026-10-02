---
title: 全局选项
uses:
  - "command:"
---

uv 的全局选项在[根命令](cli:command:)统一解释：它们定义于根命令的参数组（源码 `crates/uv-cli/src/lib.rs` 中的 `CacheArgs` 与 `GlobalArgs`），通过 global 参数机制被所有子命令继承。因此同一选项的释义只在根命令维护一份，子命令页面自动显示继承信息，`--help` 输出中也按 "Cache options"、"Python options"、"Global options" 等标题分组。

## 优先级分层

同一设置可以从多个来源提供，优先级从高到低为：

1. 命令行参数；
2. 环境变量；
3. 配置文件。

多数全局选项绑定了对应的 `UV_*` 环境变量（例如 `--cache-dir` 对应 `UV_CACHE_DIR`，`--offline` 对应 `UV_OFFLINE`），帮助文本以 `[env: ...]` 标注。

配置文件自身也分层合并：项目级 `pyproject.toml` 的 `[tool.uv]` 表或 `uv.toml` 优先于用户级，用户级优先于系统级；合并时标量与布尔值取高优先级一方，数组则拼接且项目级条目在前。同目录同时存在 `uv.toml` 和 `pyproject.toml` 时只读取 `uv.toml`，其 `[tool.uv]` 被忽略；用户级与系统级只能使用 `uv.toml` 格式。

与配置文件发现相关的开关也定义在根命令上：`--no-config` 禁止发现任何持久配置，`--config-file` 指定一个 `uv.toml` 并替代所有已发现的配置文件。注意 `uv tool` 系列命令在用户层面工作，会忽略本地配置文件，只读用户级与系统级配置。

## 常见分组

按帮助标题与用途，常见的全局选项分组如下：

- 缓存：`--no-cache`（`-n`）与 `--cache-dir`，决定是否使用缓存以及缓存目录位置。
- Python：`--managed-python` / `--no-managed-python` 控制是否使用 uv 托管的 Python，`--no-python-downloads` 禁止自动下载；许多子命令另有本地的 `--python` 请求，接受版本、实现名或路径。
- 网络：`--offline` 仅使用本地数据，`--system-certs` 改用系统证书库，`--allow-insecure-host` 对指定主机跳过证书校验（有中间人风险，仅在可信网络使用）。
- 输出：`-v` / `--verbose` 与 `-q` / `--quiet`（可重复，`-qq` 进入静默模式）互斥，`--color` 控制颜色，`--no-progress` 隐藏进度输出。
- 目录：`--directory` 先切换工作目录再执行命令，`--project` 只改变项目根的发现位置；后者对 `uv pip` 接口无效。

`-h` / `--help` 与 `-V` / `--version` 同样声明在根命令上。

## 边界

全局选项"全局继承"不等于"处处等价"：个别子命令会与它们声明互斥或覆盖关系（如 `--quiet` 与 `--verbose` 互斥），个别选项只在部分场景有意义。少量旧写法已弃用或隐藏——`--isolated` 由 `--no-config` 取代，`--no-color` 由 `--color` 取代，`--native-tls` 由 `--system-certs` 取代——具体行为以该版本各命令的参数定义为准。
