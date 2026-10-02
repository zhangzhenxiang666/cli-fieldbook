import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

export default defineConfig({
  site: 'https://zhangzhenxiang666.github.io',
  base: '/cli-fieldbook',
  trailingSlash: 'always',
  integrations: [starlight({
    title: 'CLI Fieldbook · 令册',
    defaultLocale: 'root',
    locales: { root: { label: '简体中文', lang: 'zh-CN' } },
    description: '有版本、有出处的 CLI 中文参考与实战手册。',
    social: [{ icon: 'github', label: 'GitHub', href: 'https://github.com/zhangzhenxiang666/cli-fieldbook' }],
    customCss: ['./src/styles/custom.css'],
    components: {
      Sidebar: './src/components/Sidebar.astro',
      PageTitle: './src/components/PageTitle.astro',
      Search: './src/components/Search.astro',
      Footer: './src/components/Footer.astro'
    },
    lastUpdated: false,
    pagination: false,
    credits: false,
    tableOfContents: { minHeadingLevel: 2, maxHeadingLevel: 3 },
  })],
});
