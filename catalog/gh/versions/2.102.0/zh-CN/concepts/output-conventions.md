---
title: 输出与自动化约定
uses:
  - command:api
  - command:gist/view
  - command:pr/checks
  - command:pr/diff
  - command:pr/list
  - command:release/download
  - command:release/verify
  - command:release/verify-asset
  - command:repo/read-file
  - command:run/watch
---

gh 的输出有一套贯穿各命令的约定：面向人的表格与颜色、面向机器的 JSON 导出、统一的退出码。本篇是这些约定的导览；逐项细节见 [JSON 输出与格式化](../reference/formatting.md)、[退出代码](../reference/exit-codes.md)与[环境变量](../reference/environment.md)三个参考页，这里只讲机制与取舍，不复抄清单。

## --json、--jq 与 --template

支持导出的命令共享一组旗标：`--json <字段列表>` 把结果转成 JSON，只导出列出的字段；`--jq <表达式>` 用 jq 语法筛选与重组（系统无需安装 jq，连接终端时自动美化）；`--template <模板>` 用 Go 模板排版输出，可用的辅助函数见[格式化参考](../reference/formatting.md)。三者由同一套机制注册，规则有三条：

- `--jq` 与 `--template` 必须搭配 `--json` 与字段列表，单独给出格式旗标会报错；
- 运行命令时给 `--json` 但省略字段列表，会打印该命令支持的全部字段名——这是发现字段的第一入口；
- `--web` 与 `--json` 不能同用。

[gh pr list](cli:command:pr/list) 这类列表命令的默认表格输出给人看，列宽与列序都可能随版本调整；脚本应固定走 `--json` 导出。

`gh api` 是一个例外：它的 `--jq` 与 `--template` 由命令自身注册，直接作用于 API 响应，不需要也不存在字段列表，机制详见 [gh api 与脚本化](api-scripting.md)。

## --format json 变体

少数命令走另一组旗标：`--format json` 不带字段列表，导出完整的结果对象，`--jq`/`--template` 在这些命令上要求先给 `--format json`。本版收录的命令中，[gh release verify](cli:command:release/verify) 与 [gh release verify-asset](cli:command:release/verify-asset) 采用这种形式。与 `--json` 的取舍是：字段列表让输出只含所需字段，`--format json` 省去查字段名的步骤。

## 颜色与终端检测

输出形态跟着标准输出走：连接终端时有颜色、表格对齐与分页；被管道或重定向后输出退为朴素文本。这套检测可以通过环境变量干预：

- `NO_COLOR`（任意值）关闭 ANSI 颜色；`CLICOLOR=0` 同样关闭；
- `CLICOLOR_FORCE` 设为非 `0` 值时，即使输出被管道重定向也保留颜色；
- `GH_FORCE_TTY` 强制采用终端式输出，值为数字时按可用列数解析，为百分比时按当前视口列数的比例解析；
- `GH_COLOR_LABELS` 在支持真彩的终端以 RGB 十六进制色码显示标签。

分页只在标准输出是终端时发生，`GH_PAGER`/`PAGER` 选择分页程序，值设为 `cat` 即不分页。这些变量与 `GH_MDWIDTH`、`GLAMOUR_STYLE` 等渲染相关变量的完整语义见[环境变量](../reference/environment.md)。

## 转义序列拦截

来自远端的内容（API 响应、diff、文件）可能携带终端转义序列，打印到终端可能篡改显示甚至执行终端操作。gh 的默认防线因命令而异，分两种：

- 拦截：[gh api](cli:command:api)、[gh gist view](cli:command:gist/view)、[gh release download](cli:command:release/download)（输出到标准输出时）与 [gh repo read-file](cli:command:repo/read-file) 在内容携带转义序列时报错拒绝。其中 gh api 与 gh release download 对二进制内容另有一道判断：绑定终端时拒绝输出，重定向或管道时按字节原样写出。
- 中和：[gh pr diff](cli:command:pr/diff) 在终端上把转义序列替换为无害形式后显示；输出被管道时，干净的 diff 原样输出，携带转义序列的 diff 报错拒绝。

`--allow-escape-sequences` 是统一出口：明确要求原样输出时加上它，适合把补丁原样交给其他程序处理这类场景。

## 退出码

gh 遵循常见退出码约定：`0` 成功，`1` 失败，`2` 运行中被取消，`4` 需要认证。个别命令在此之上另有定义，例如 [gh pr checks](cli:command:pr/checks) 用 `8` 表示存在待定检查，[gh run watch](cli:command:run/watch) 的 `--exit-status` 让运行失败时以非零退出码结束。依赖退出码控制流程时，先查该命令页有无附加码；完整约定见[退出代码](../reference/exit-codes.md)。

对自动化友好的两个细节：部分查询类命令没有结果时不算失败（退出码仍为 0，提示只在连接终端时打印）；扩展与 shell 别名内部的退出码会原样向外传递，不会被吞掉。

## 脚本与自动化的稳定输出

把上面的约定合起来，脚本侧的稳定姿势是：

- 数据一律走 `--json` 加 `--jq`/`--template`，不解析表格文本；字段清单用空字段列表的 `--json` 现查。
- 非交互环境显式给出 ID 与选择器，不依赖交互提示；必要时用 `GH_PROMPT_DISABLED` 关闭交互。
- 关闭更新提示（`GH_NO_UPDATE_NOTIFIER`）与旋转动画（`GH_SPINNER_DISABLED`）可让标准错误更干净；需要终端式排版时再考虑 `GH_FORCE_TTY`，它会改变输出形态，不要与机器解析混用。
- 认证用 `GH_TOKEN`，失败时的退出码为 `4`；各变量的完整清单见[环境变量](../reference/environment.md)。

## 示例

```sh
# 只取编号与标题两个字段
gh pr list --json number,title

# --jq 输出纯文本列，方便继续拼接管道
gh pr list --json author --jq '.[].author.login'

# --template 排版成对齐的表格
gh pr list --json number,title,updatedAt --template \
  '{{range .}}{{tablerow (printf "#%v" .number) .title (timeago .updatedAt)}}{{end}}'

# 把携带转义序列的补丁原样交给其他程序
gh pr diff 123 --allow-escape-sequences > 123.patch
```

以上示例为说明性内容，未实际运行。
