import fs from 'node:fs/promises';
import path from 'node:path';

const root=path.resolve('site/dist');
const base='/cli-fieldbook/';
const origin='https://zhangzhenxiang666.github.io';
async function walk(dir) {
  return (await Promise.all((await fs.readdir(dir,{withFileTypes:true})).map(async entry=>{
    const file=path.join(dir,entry.name);
    if(entry.isSymbolicLink())throw new Error(`构建产物不允许符号链接：${file}`);
    return entry.isDirectory()?walk(file):[file];
  }))).flat();
}
const files=await walk(root);
const html=new Map(await Promise.all(files.filter(f=>f.endsWith('.html')).map(async f=>[f,await fs.readFile(f,'utf8')])));
const decode=s=>s.replace(/&(?:amp|quot|apos|lt|gt);|&#(?:x[\da-f]+|\d+);/gi,entity=>{
  const named={'&amp;':'&','&quot;':'"','&apos;':"'",'&lt;':'<','&gt;':'>'};
  return named[entity]??String.fromCodePoint(entity.startsWith('&#x')?parseInt(entity.slice(3),16):parseInt(entity.slice(2),10));
});
// These attributes are emitted by our trusted HTML renderer. The content AST
// separately rejects arbitrary HTML; this check validates final routes/assets.
const ids=new Map([...html].map(([f,s])=>[f,new Set([...s.matchAll(/\bid="([^"]*)"/g)].map(m=>decode(m[1])))]));
const available=new Set(files);
const failures=[];let checked=0;
for(const [file,text] of html) {
  const relative=path.relative(root,file).split(path.sep).join('/').replace(/index\.html$/,'');
  for(const match of text.matchAll(/\b(?:href|src)="([^"]*)"/g)) {
    const value=decode(match[1]);
    if(/^(?:data:|mailto:|tel:)/i.test(value))continue;
    const url=new URL(value,origin+base+relative);
    if(url.origin!==origin)continue;
    if(!url.pathname.startsWith(base)){failures.push(`${relative}: 项目路径缺失 ${value}`);continue;}
    let target=path.resolve(root,decodeURIComponent(url.pathname.slice(base.length)));
    if(url.pathname===base+'404/')target=path.join(root,'404.html');
    if(!available.has(target))target=path.join(target,'index.html');
    checked++;
    if(!available.has(target)){failures.push(`${relative}: 不存在的目标 ${value}`);continue;}
    if(url.hash&&html.has(target)&&!ids.get(target).has(decodeURIComponent(url.hash.slice(1))))failures.push(`${relative}: 不存在的锚点 ${value}`);
  }
}
for(const file of ['pagefind/pagefind.js','generated/identifiers.json','search.js'])if(!available.has(path.join(root,file)))failures.push(`缺少搜索产物 ${file}`);
const report={htmlPages:html.size,checkedLinksAndAssets:checked,failures};
await fs.mkdir('.generated',{recursive:true});
await fs.writeFile('.generated/site-audit.json',JSON.stringify(report,null,2)+'\n');
if(failures.length){console.error(failures.slice(0,30).join('\n'));throw new Error(`${failures.length} 项构建产物检查失败。`);}
console.log(`站点审查：${html.size} 页，${checked} 条内部链接/资源及锚点通过。`);
