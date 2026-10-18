---
title: 页面快照
uses:
  - command:snapshot
  - command:find
---

**快照**（snapshot）是 playwright-cli 观察页面的基本形式：页面的可访问性树结构化表示，其中可交互元素带短引用（`e15` 这类），供交互命令作为目标使用。本文说明快照的产出时机与按需捕获方式。本文依据官方 skills 文档快照与固定提交源码。

## 自动附带与按需捕获

每条命令执行完成后，响应会自动附带当前页面的状态快照（页面 URL、标题与快照链接），因此多数时候不需要单独拍摄。[snapshot](cli:command:snapshot) 用于按需重新捕获，或在需要精确控制时使用：

- `--filename=<name>`：保存到指定文件（缺省按时间戳命名）。
- 位置参数 `<target>`：只捕获该元素子树（局部快照）。
- `--depth=<n>`：限制深度，减小大页面的输出体积。
- `--boxes`：附带每个元素的边界框 `[box=x,y,width,height]`（视口相对 CSS 像素）。

## 检索而不是整页输出

大快照不必整页读入：[find](cli:command:find) 按文本（大小写不敏感子串）或正则检索快照，返回命中节点与上下文片段，类似 `grep -C`：

```sh
playwright-cli find "Add to cart"
playwright-cli find --regex "\\$[0-9]+\\.[0-9]{2}"
```

## 快照对比

配合 `--raw` 输出与文件重定向，可以对比操作前后的页面结构：

```sh
playwright-cli --raw snapshot > before.yml
playwright-cli click e5
playwright-cli --raw snapshot > after.yml
diff before.yml after.yml
```

以上示例为说明性内容，未实际运行。
