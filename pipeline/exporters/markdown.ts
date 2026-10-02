import { sections, toString, rewriteLinks } from '../core/markdown.js';
import { route } from '../core/identity.js';
import type { Page, ToolVersion } from '../core/model.js';
import path from 'node:path';

export function commandView(page: Page): string {
  if (!page.command) return page.body;
  const command=page.command;
  const prose=(section:string,name:string):string=>{
    const nodes=sections(page.body,2).find(s=>s.title===section)?.nodes??[];
    const start=nodes.findIndex(n=>n.type==='heading'&&toString(n)===name);
    if(start<0)return '';
    const end=nodes.findIndex((n,i)=>i>start&&n.type==='heading'&&n.depth===3);
    return nodes.slice(start+1,end<0?undefined:end).map(n=>toString(n)).join(' ').replace(/\s+/g,' ');
  };
  const help=[...command.synopsis.map((s,i)=>`${i===0?'Usage: ':'       '}${s}`),...(['Arguments','Options'] as const).flatMap(label=>{
    const fields=label==='Arguments'?command.arguments:command.options.filter(f=>!f.inherited);
    return fields.length?['',`${label}:`,...fields.map(f=>`  ${f.display}\n      ${prose(label==='Arguments'?'参数':'选项',f.name)}`)]:[];
  })].join('\n');
  const attributes=[...command.arguments,...command.options.filter(f=>!f.inherited)].filter(f=>f.aliases.length||f.default!==undefined).map(f=>`| \`${f.name}\` | ${f.aliases.map(a=>`\`${a}\``).join('、')||'—'} | ${f.default===undefined?'未作结构化记录，见释义':`\`${f.default}\``} |`).join('\n');
  return `## 用法与帮助式视图\n\n此视图从固定源码与中文内容重建，未采集二进制原始帮助。\n\n\`\`\`text\n${help}\n\`\`\`\n\n${command.category!=='public'?`> 此节点属于 ${command.category==='hidden'?'隐藏调试入口':'条件编译入口'}，可用性与稳定性须看下文限制。\n\n`:''}${attributes?'## 参数属性\n\n| 标识 | 别名 | 结构化默认值 |\n| --- | --- | --- |\n'+attributes+'\n\n':''}${command.options.some(f=>f.inherited&&!f.group)?'> 全局继承选项参见[根命令](cli:command:)；本页详细解释仅维护本地声明。\n\n':''}${command.options.some(f=>f.group==='diff-format')?`> 共享参数参见[差异格式选项](${path.posix.relative(path.posix.dirname(page.relative),'concepts/diff-options.md')})。\n\n`:''}${page.body}`;
}

export function webBody(version:ToolVersion,page:Page,base='/cli-fieldbook/'):string {
  return rewriteLinks(commandView(page),url=>{
    if(url.startsWith('cli:command:')) {
      const command=version.pages.find(p=>p.kind==='commands'&&p.id===url.slice(12));
      if(!command)throw new Error(`未知逻辑链接：${url}`);
      return route(version.toolId,version.versionId,command.relative,base);
    }
    if (/^[a-zA-Z][a-zA-Z0-9+.-]*:/.test(url)) return url;
    const [href,fragment]=url.split('#');
    const file=href?path.resolve(path.dirname(page.file),decodeURIComponent(href)):page.file;
    const target=version.pages.find(p=>p.file===file);
    if(!target)throw new Error(`断链：${page.relative}: ${url}`);
    return route(version.toolId,version.versionId,target.relative,base)+(fragment?`#${fragment}`:'');
  });
}

export function exportMarkdown(version:ToolVersion,revision:string):string {
  const head=`# ${version.tool.name} ${version.versionId} 中文手册\n\n非官方翻译 · 文档修订 ${revision} · 来源提交 ${version.sources.commit}\n\n帮助未采集，示例与工作流未实测。审核基线只记录复核输入；发布批准见 GitHub 部署记录。\n\n`;
  // The downloadable book uses permanent website links to avoid broken relative
  // links after many independent documents are combined into one file.
  return head+version.pages.map(page=>`# ${page.title}\n\n${webBody(version,page,'https://zhangzhenxiang666.github.io/cli-fieldbook/')}`).join('\n\n---\n\n');
}
