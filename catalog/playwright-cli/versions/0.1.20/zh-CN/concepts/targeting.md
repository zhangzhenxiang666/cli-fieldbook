---
title: 目标与定位器
uses:
  - command:click
  - command:snapshot
  - command:generate-locator
---

与页面元素交互的命令（[click](cli:command:click)、[fill](cli:command:fill)、[hover](cli:command:hover) 等）都接受一个**目标**（target）参数。本文说明三种目标写法与选择依据。本文依据官方 skills 文档快照与固定提交源码。

## 三种目标写法

- **快照引用**：页面[快照](snapshot.md)中每个可交互元素的短引用（如 `e15`）。默认推荐写法：引用来自刚刚看到的页面状态，精确且无歧义。
- **CSS 选择器**：如 `"#main > button.submit"`。适合结构稳定的页面局部。
- **Playwright 定位器**：直接写 Playwright 定位器表达式，如 `getByRole('button', { name: 'Submit' })` 或 `getByTestId('submit-button')`。适合以语义角色或测试标识定位，多来自既有测试代码。

```sh
playwright-cli click e15
playwright-cli click "#main > button.submit"
playwright-cli click "getByRole('button', { name: 'Submit' })"
```

## 快照引用的用法与局限

引用只在快照之间保持有效：页面重载或结构变化后，旧引用可能失效，此时重新 [snapshot](cli:command:snapshot) 获取新引用。引用之外的元素属性（如 `data-testid`）不在快照里时，用 [eval](cli:command:eval) 直接读取：`playwright-cli eval "el => el.getAttribute('data-testid')" e5`。

## 从引用沉淀为定位器

交互验证通过后，用 [generate-locator](cli:command:generate-locator) 把目标元素转成推荐的 Playwright 定位器，用于测试代码或后续复用：

```sh
playwright-cli generate-locator e5 --raw
```

以上示例为说明性内容，未实际运行。
