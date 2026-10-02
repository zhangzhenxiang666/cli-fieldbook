---
title: pip 兼容接口
uses:
  - command:pip
  - command:pip/compile
  - command:pip/sync
  - command:pip/install
  - command:pip/uninstall
  - command:pip/list
  - command:pip/freeze
  - command:pip/show
  - command:pip/check
  - command:pip/tree
  - command:pip/debug
  - command:venv
---

[uv pip](cli:command:pip) 是一组与 `pip`、`pip-tools`、`virtualenv` 常用命令对应的低层接口：它直接操作虚拟环境本身，而不是像 uv 的项目接口那样自动托管环境。定位是给高级用户与尚未从 pip 体系迁移的团队暴露 uv 的速度与能力。

需要先说明边界：uv 不依赖也不调用 pip。"pip 接口"这个命名只是表明它刻意匹配 pip 的界面，并把这类低层命令与 uv 其余更高抽象层次的命令区分开。它也不是 pip 的精确克隆——偏离常见工作流越远，遇到差异的可能性越大。

## 适用场景与环境发现

典型场景是没有项目上下文的操作：手工管理一个虚拟环境、维护 `requirements.in` / `requirements.txt` 工作流、或在现有脚本里把 `pip install` 换成 `uv pip install`。项目接口（`uv sync` 等）负责的锁定与同步在这里都不发生——环境是什么样，完全取决于你执行了哪些命令。

与 pip 最大的取向差异是虚拟环境默认必需：变更环境的命令（如 [uv pip install](cli:command:pip/install)、[uv pip sync](cli:command:pip/sync)）按以下顺序寻找环境——`VIRTUAL_ENV` 指向的已激活环境、`CONDA_PREFIX` 指向的 Conda 环境、当前目录及父目录中的 `.venv`；找不到时提示用 [uv venv](cli:command:venv) 创建。pip 默认装进全局环境的做法在这里被反转：装进系统 Python 需要显式选择（`--system`，或 `--python /path/to/python` 指定解释器；`--system` 适合 CI 与容器）。虚拟环境也不需要激活，uv 会自动发现 `.venv`。

## 与 pip 的主要差异

除环境默认值外，迁移时最常遇到的差异有：

- 配置：不读 `pip.conf` 与 `PIP_*` 变量，只认 uv 自己的环境变量（如 `UV_INDEX_URL`）、`uv.toml` 及 `pyproject.toml` 的 `[tool.uv.pip]` 段——后者只作用于 `uv pip` 命名空间。
- 多索引：默认 `first-index` 策略，按顺序在第一个包含该包的索引处停止并限定候选版本，以防范依赖混淆攻击；可用 `--index-strategy` 换成 `unsafe-first-match` 或最接近 pip 的 `unsafe-best-match`。
- 预发布：默认 `if-necessary`——优先稳定版，仅在全部稳定候选被拒时回退预发布；另有 `allow`、`disallow`、`explicit` 模式。
- 安装行为：不支持 `--user` 与 user 安装方案；默认不把 `.py` 编译为 `.pyc`（`--compile-bytecode` 或 `UV_COMPILE_BYTECODE=1` 开启，Docker 构建建议开启以改善启动时间）。
- 解析与校验更严格：忽略依赖 `requires-python` 的上界；评估 Python 版本时截断到 major.minor.patch（与 pip 一致）；拒绝文件名与元数据不一致的 wheel（`UV_SKIP_WHEEL_FILENAME_CHECK=1` 可跳过）；不接受传递性 URL 依赖；名称输出按 PEP 503 规范化（pip 倾向保留原文）。
- 面的取舍：只支持 pip 选项与子命令的一个大子集；keyring 仅支持 `subprocess` 提供者且默认关闭；不支持 `.egg` 分发（但对已存在的 `.egg-info` / `.egg-link` 有部分兼容）；约束文件不用于构建依赖，构建约束要单独用 `--build-constraint`。

两个解析器都可能给出多组有效解中的一个，具体版本组合不保证与 pip 一致；结果不合理时通常说明约束太松，应收紧说明符。

## compile：锁定需求

[uv pip compile](cli:command:pip/compile) 是 pip-tools `pip-compile` 的对应物：把需求解析成带精确版本的 `requirements.txt`。输入可以是 `requirements.in`、`pyproject.toml`（配合 `--extra` / `--all-extras` 启用 extras）、`--group` 启用依赖组（可用 `--project` 或 `path:group` 指明来源）、旧的 `setup.py` / `setup.cfg`，或 stdin（`-`）。与 pip-compile 不同，默认不写输出文件，必须用 `-o` / `--output-file` 显式指定。

默认产出平台特定的解析（与 pip-tools 一致）；`--universal` 切换为带环境标记的通用解析，`--python-platform` 与 `--python-version` 可以解析到其他平台与版本。再次编译时，已有输出文件中的固定版本被优先沿用，升级用 `--upgrade-package <package>`（单个）或 `--upgrade`（全部）。默认还会剥除 extras（`--no-strip-extras` 保留）且不输出索引 URL（`--emit-index-url` 输出，且包含默认索引）。

三类旁路文件作用于解析：`--constraint` 收窄版本范围（不引入新包）、`--build-constraint` 约束构建期依赖、`--override` 完全替换相关包的声明需求（常用于去掉传递依赖的错误上界）。输出也可以是 PEP 751 的 `pylock.toml`。

## sync：让环境精确匹配

[uv pip sync](cli:command:pip/sync) 按 `requirements.txt`（或 `pylock.toml`）安装并移除环境中的多余包，使环境精确匹配文件——这是它与 `uv pip install -r` 的关键区别：后者不移除已有包，环境可能残留文件未声明的依赖。可复现的环境应该用 sync 而不是反复 install。

## 检查与审视

配套的只读命令用于了解环境状态：[uv pip list](cli:command:pip/list)（`--format json` 输出机器可读格式）、[uv pip freeze](cli:command:pip/freeze)（`requirements.txt` 格式）、[uv pip show](cli:command:pip/show)（包详情）、[uv pip tree](cli:command:pip/tree)（依赖树）、[uv pip check](cli:command:pip/check)（校验已装包的依赖一致性与 `Requires-Python`，能发现重复安装的版本）、[uv pip debug](cli:command:pip/debug)（调试信息）。卸载用 [uv pip uninstall](cli:command:pip/uninstall)。
