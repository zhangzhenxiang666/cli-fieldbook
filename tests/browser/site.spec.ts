import { test, expect } from '@playwright/test';

test('versioned root and literal index command routes stay distinct',async({page})=>{
  await page.goto('zh-cn/jj/0.45.1/commands/debug/');
  await expect(page.locator('h1')).toHaveText('jj debug');
  await page.goto('zh-cn/jj/0.45.1/commands/debug/index/');
  await expect(page.locator('h1')).toHaveText('jj debug index');
  await expect(page.getByText('条件编译节点')).toHaveCount(0);
});
test('knowledge, downloads and narrow layouts work',async({page})=>{
  await page.goto('zh-cn/jj/0.45.1/reference/revset/');
  await page.locator('main').getByRole('link',{name:'parents(x, [depth])',exact:true}).click();
  await expect(page.locator('h1')).toContainText('parents');
  await expect(page.getByText('depth=0 返回 x',{exact:false})).toBeVisible();
  expect(await page.evaluate(()=>document.documentElement.scrollWidth<=window.innerWidth)).toBeTruthy();
  await page.goto('zh-cn/jj/0.45.1/');
  const href=await page.getByRole('link',{name:'下载合订 Markdown'}).getAttribute('href');
  expect(href).toContain('/cli-fieldbook/generated/jj-0.45.1-zh-CN.md');
  const response=await page.request.get(href!);
  expect(response.ok()).toBeTruthy();
  expect(await response.text()).toContain('reachable(srcs, domain)');
  expect(await response.text()).not.toContain('(/https:');
});
test('scoped exact and Chinese full text search are keyboard accessible',async({page})=>{
  await page.goto('zh-cn/jj/0.45.1/commands/log/');
  await page.getByRole('button',{name:'搜索文档',exact:true}).click();
  const query=page.getByRole('searchbox');
  await expect(query).toBeFocused();
  await query.fill('parents()');
  await expect(page.locator('#search-results a').first()).toContainText('parents');
  await query.fill('-r');
  await expect(page.locator('#search-results li').first()).toBeVisible();
  await expect(page.locator('#search-results')).not.toContainText('herdr');
  for(const term of ['jj log','--revision','::']) {
    await query.fill(term);
    await expect(page.locator('#search-status')).toContainText('显示');
    await expect(page.locator('#search-results li').first()).toBeVisible();
  }
  await query.fill('超时');
  await page.getByRole('combobox',{name:'搜索范围'}).selectOption('all');
  await expect(page.locator('#search-results li').first()).toBeVisible();
  await expect(page.locator('#search-results')).toContainText('herdr');
  await page.keyboard.press('Escape');
  await expect(page.locator('dialog')).not.toBeVisible();
});
test('public asset metadata and generated links include project base',async({page})=>{
  await page.goto('zh-cn/herdr/0.9.3/commands/agent/prompt/');
  await expect(page.locator('h1')).toHaveText('herdr agent prompt');
  const hrefs=await page.locator('main a[href]').evaluateAll(nodes=>nodes.map(n=>n.getAttribute('href')!));
  expect(hrefs.filter(h=>h.startsWith('/')&&!h.startsWith('/cli-fieldbook/'))).toEqual([]);
  expect(hrefs.some(h=>h.startsWith('cli:'))).toBeFalsy();
  expect(await page.evaluate(()=>document.documentElement.scrollWidth<=window.innerWidth)).toBeTruthy();
});
