import fs from 'node:fs/promises';
import path from 'node:path';
import { Ajv } from 'ajv';
import { readData, readMarkdown, walk, checkedPath } from './files.js';
import { hash, commandFile, safeToken, within, idOf, stable } from '../core/identity.js';
import { safeMarkdown, links, headingIds, entityHeadings, sections } from '../core/markdown.js';
import { reviewState } from '../core/review.js';
import type { Catalog, Command, Diagnostic, Kind, Page, ReviewLock, SourceLock, Tool, ToolVersion, Version } from '../core/model.js';

export async function loadCatalog(root = process.cwd()): Promise<Catalog> {
  const diagnostics: Diagnostic[] = [];
  const versions: ToolVersion[] = [];
  const ajv = new Ajv({ allErrors: true, strict: true });
  const schemaRoot = path.join(root, 'schemas/v1');
  const validators = new Map<string, ReturnType<typeof ajv.compile>>();
  for (const file of await fs.readdir(schemaRoot)) if (file.endsWith('.schema.json')) validators.set(file.replace('.schema.json',''), ajv.compile(await readData(path.join(schemaRoot,file)) as object));
  const error = (file: string, code: string, message: string, fix: string, line = 1, severity: 'error' | 'warning' = 'error'): void => { diagnostics.push({ file: path.relative(root,file), line, code, message, fix, severity }); };
  function validate<T>(name: string, data: unknown, file: string): T {
    const check = validators.get(name)!;
    if (!check(data)) throw new Error(`${name}: ${ajv.errorsText(check.errors, { separator: '; ' })}`);
    return data as T;
  }
  const catalogDir = path.join(root, 'catalog');
  const entries = await fs.readdir(catalogDir, { withFileTypes: true }).catch(() => []);
  for (const entry of entries) {
    if (!entry.isDirectory() || entry.isSymbolicLink() || !safeToken(entry.name)) { error(path.join(catalogDir,entry.name),'unsafe_tool','非法工具目录。','使用安全目录名，禁止符号链接。'); continue; }
    const toolRoot = path.join(catalogDir,entry.name);
    let tool: Tool;
    try { if((await fs.lstat(path.join(toolRoot,'tool.yml'))).isSymbolicLink())throw new Error('tool.yml 不能是符号链接');tool = validate('tool',await readData(path.join(toolRoot,'tool.yml')),path.join(toolRoot,'tool.yml')); }
    catch (e) { error(toolRoot,'schema',String(e),'按 schemas/v1 修正工具元数据。'); continue; }
    const versionEntries = await fs.readdir(path.join(toolRoot,'versions'), { withFileTypes: true }).catch(() => []);
    for (const v of versionEntries) {
      const versionRoot = path.join(toolRoot,'versions',v.name);
      if (!v.isDirectory() || v.isSymbolicLink() || !/^[a-zA-Z0-9][a-zA-Z0-9._-]*$/.test(v.name)) { error(versionRoot,'unsafe_version','非法版本目录。','使用安全版本 ID。'); continue; }
      try {
        const all = await walk(versionRoot);
        for (const file of all) {
          if ((await fs.stat(file)).size > 5 * 1024 * 1024) error(file,'file_size','单个文本文件超过 5 MiB。','减少快照或使用固定归档。');
          if (/\.(?:mdx|astro|js|ts|py|sh|html)$/i.test(file)) error(file,'executable_content','版本内容目录不能包含可执行内容。','源码快照用 .txt 保存，历史脚本留在只读归档。');
        }
        const version = validate<Version>('version',await readData(path.join(versionRoot,'version.yml')),versionRoot);
        if(version.publication==='draft' && !await fs.stat(path.join(versionRoot,'upstream/source.lock.json')).catch(()=>null)) {
          error(versionRoot,'draft_sources_missing','草稿尚未导入固定来源。','填入来源协议或使用 docs import 导入数据目录；不能发布。',1,'warning');
          continue;
        }
        const commands = validate<Command[]>('commands',await readData(path.join(versionRoot,'upstream/commands.json')),versionRoot);
        const sources = validate<SourceLock>('source',await readData(path.join(versionRoot,'upstream/source.lock.json')),versionRoot);
        if (sources.upstreamVersion !== version.upstream.version || sources.repository !== tool.repository || sources.ref !== version.upstream.ref) error(versionRoot,'source_identity','来源身份与工具／版本声明不一致。','固定同一上游版本与仓库。');
        const reviewFile = path.join(versionRoot,'review.lock.json');
        const review = await readData(reviewFile).then(data => validate<ReviewLock>('review',data,reviewFile)).catch(e => { if ((e as NodeJS.ErrnoException).code !== 'ENOENT') throw e; return undefined; });
        const evidenceIds = new Set<string>();
        for (const ev of sources.evidence) {
          if (evidenceIds.has(ev.id)) error(versionRoot,'duplicate_evidence',ev.id,'为每项证据使用唯一 ID。');
          evidenceIds.add(ev.id);
          const file = checkedPath(versionRoot,ev.path);
          if (hash(await fs.readFile(file)) !== ev.sha256) error(file,'evidence_hash','来源摘要不匹配。','检查来源变更后显式重新导入，不要直接修改锁文件。');
          if (ev.method === 'source-snapshot' && !ev.url.includes(`/${sources.commit}/`)) error(file,'floating_source','源码证据没有绑定完整提交。','使用完整提交 SHA 的原始文件 URL。');
        }
        const commandPaths = new Set<string>();
        const slugs = new Set<string>();
        for (const command of commands) {
          const key = command.path.join('/');
          if (commandPaths.has(key)) error(versionRoot,'duplicate_command',key,'移除重复命令。');
          commandPaths.add(key);
          const file = commandFile(command);
          if (slugs.has(file) || !(command.slug ?? command.path).every(safeToken)) error(versionRoot,'slug_conflict',key,'设置唯一、安全的显式 slug。');
          slugs.add(file);
          const fieldKeys = command.arguments.map(f => `arg:${f.name}`).concat(command.options.map(f => `opt:${f.name}`));
          if (new Set(fieldKeys).size !== fieldKeys.length) error(versionRoot,'duplicate_field',key,'合并同一参数的拼写与别名。');
          for (const id of [...command.evidenceIds,...command.arguments.flatMap(f=>f.evidenceIds),...command.options.flatMap(f=>f.evidenceIds)]) if (!evidenceIds.has(id)) error(versionRoot,'missing_evidence',`${key}: ${id}`,'绑定已保存的证据。');
          if (!command.evidenceIds.length) error(versionRoot,'missing_evidence',key,'声明命令来源。');
        }
        for (const command of commands) {
          if (command.path.length && !commandPaths.has(command.path.slice(0,-1).join('/'))) error(versionRoot,'missing_parent',command.path.join('/'),'保留父命令页面。');
          for (const child of command.children) if (!commandPaths.has(child.join('/'))) error(versionRoot,'missing_child',child.join('/'),'修正命令树。');
        }
        const pages: Page[] = [];
        for (const file of all.filter(f=>f.endsWith('.md') && within(path.join(versionRoot,'zh-CN'),f))) {
          const relative = path.relative(path.join(versionRoot,'zh-CN'),file).split(path.sep).join('/');
          const kind = relative.split('/')[0] as Kind;
          if (!['commands','concepts','workflows','reference'].includes(kind)) { error(file,'kind','未知内容类型。','放入四类内容目录。'); continue; }
          const { frontmatter, body, offset } = readMarkdown(await fs.readFile(file,'utf8'));
          validate(kind==='commands'?'commandFrontmatter':'articleFrontmatter',frontmatter,file);
          const command = kind==='commands' ? commands.find(c=>stable(c.path)===stable(frontmatter.command)) : undefined;
          if (kind==='commands' && (!command || commandFile(command)!==relative)) error(file,'command_path','命令身份和文件路径不匹配。','使用命令骨架生成器创建对应路径。');
          const id = command ? command.path.join('/') : relative.slice(kind.length+1).replace(/\.md$/,'').replace(/(?:^|\/)index$/,'').replace(/\/$/,'');
          const page: Page = { file, relative, kind, id, title: frontmatter.title ?? `${tool.binary}${command?.path.length ? ' '+command.path.join(' ') : ''}`, body, frontmatter, ...(command?{command}:{}) };
          diagnostics.push(...safeMarkdown(body,path.relative(root,file)).map(d=>({...d,line:d.line+offset})));
          if (command) {
            if (!sections(body,2).some(s=>s.title==='简介' && s.nodes.length)) error(file,'missing_description','缺少简介。','填写 ## 简介。');
            for (const [section,fields] of [['参数',command.arguments],['选项',command.options.filter(f=>!f.inherited)]] as const) {
              const headings = entityHeadings(body,section);
              for (const field of fields) if (!headings.includes(field.name)) error(file,'missing_field',`缺少${section} ${field.name}`,'在对应章节填写规范名称的三级标题。',1,version.publication==='published'?'error':'warning');
              for (const heading of headings) if (!fields.some(f=>f.name===heading)) error(file,'unknown_field',`未知${section} ${heading}`,'来源补充另放在源码补充章节。');
            }
          }
          pages.push(page);
        }
        for (const command of commands) if (!pages.some(p=>p.relative===commandFile(command))) error(versionRoot,'missing_command',command.path.join(' '),'导入或新建对应命令 Markdown。',1,version.publication==='published'?'error':'warning');
        const model: ToolVersion = { toolId:entry.name,versionId:v.name,locale:'zh-CN',root:versionRoot,tool,version,commands,sources,pages,...(review?{review}:{}) };
        const ids = new Set<string>();
        const aliases = new Map<string,string>();
        for (const command of commands) for (const alias of command.aliases) {
          const key=alias.join('/'); const previous=aliases.get(key);
          if (commandPaths.has(key) || (previous && previous!==command.path.join('/'))) error(versionRoot,'alias_conflict',key,'别名不能指向多个命令或覆盖规范命令。');
          aliases.set(key,command.path.join('/'));
        }
        for (const page of pages) {
          const key=idOf(page.kind,page.id);
          if (ids.has(key)) error(page.file,'duplicate_page',key,'使用唯一实体 ID。');
          ids.add(key);
          for (const dep of page.frontmatter.uses??[]) if (!pages.some(p=>idOf(p.kind,p.id)===dep || (dep.startsWith('command:') && p.kind==='commands' && p.id===dep.slice(8)))) error(page.file,'missing_dependency',dep,'依赖同工具、同版本内存在的实体。');
          for (const link of links(page.body)) {
            if (/^https?:\/\//.test(link.url) || /^mailto:/.test(link.url)) continue;
            if (link.url.startsWith('cli:command:')) {
              if (!commandPaths.has(link.url.slice(12))) error(page.file,'broken_link',link.url,'使用存在的规范命令 ID。',link.line);
              continue;
            }
            if (/^[a-zA-Z][a-zA-Z0-9+.-]*:/.test(link.url)) { error(page.file,'unsafe_protocol',link.url,'只允许 HTTPS、相对链接和 cli:command 逻辑链接。',link.line); continue; }
            const [href,fragment] = link.url.split('#');
            const target=href?path.resolve(path.dirname(page.file),decodeURIComponent(href)):page.file;
            if (!within(path.join(versionRoot,'zh-CN'),target)) { error(page.file,'link_escape',link.url,'链接必须位于同一版本内容内。',link.line);continue; }
            const targetPage=pages.find(p=>p.file===target);
            if (!targetPage || (fragment && !headingIds(targetPage.body).has(decodeURIComponent(fragment)))) error(page.file,'broken_link',link.url,'修正目标文件或标题锚点。',link.line);
          }
          if (version.publication==='published' && reviewState(model,page)!=='prepared') error(page.file,'review_required',`审阅状态：${reviewState(model,page)}`,'完成来源／语义复核后运行 review prepare；最终批准仍在 GitHub 环境。');
        }
        versions.push(model);
      } catch (e) { error(versionRoot,'invalid_version',String(e),'修正 schema、路径或缺失来源；不得伪造证据。'); }
    }
    for (const [locale,defaultVersion] of Object.entries(tool.defaults??{})) if (!versions.some(v=>v.toolId===entry.name && v.locale===locale && v.versionId===defaultVersion && v.version.publication==='published')) error(toolRoot,'invalid_default',`${locale}: ${defaultVersion}`,'默认版本必须是对应语言已申请发布并通过检查的版本。');
  }
  return {versions,diagnostics};
}
