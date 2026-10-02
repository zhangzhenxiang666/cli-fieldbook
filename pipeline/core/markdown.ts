import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkGfm from 'remark-gfm';
import remarkStringify from 'remark-stringify';
import { toString } from 'mdast-util-to-string';
import { visit } from 'unist-util-visit';
import GithubSlugger from 'github-slugger';
import type { Root, RootContent, Link } from 'mdast';
import type { Diagnostic } from './model.js';

export const markdown = unified().use(remarkParse).use(remarkGfm).use(remarkStringify, { fences: true, bullet: '-', listItemIndent: 'one' });
export const parseMarkdown = (body: string): Root => markdown.parse(body);
export const printMarkdown = (tree: Root): string => markdown.stringify(tree);
export { toString };

function legacyAnchor(node: RootContent): string | undefined {
  const raw = node.type==='html' ? node.value : node.type==='paragraph' && node.children.every(n=>n.type==='html'||(n.type==='text'&&!n.value.trim())) ? node.children.map(n=>'value' in n?n.value:'').join('') : '';
  return raw.trim().match(/^<a (?:id|name)="([^"<>]+)"><\/a>$/)?.[1];
}

/** Slice top-level AST headings; fenced shell comments can never become chapters. */
export function sections(body: string, depth: number): { title: string; nodes: RootContent[]; anchors: string[]; line: number }[] {
  const nodes = parseMarkdown(body).children;
  const result: ReturnType<typeof sections> = [];
  let current: ReturnType<typeof sections>[number] | undefined;
  let pending: string[] = [];
  for (const node of nodes) {
    const anchor=legacyAnchor(node);
    if (anchor) {
      pending.push(anchor);
      continue;
    }
    if (node.type === 'heading' && node.depth === depth) {
      current = { title: toString(node), nodes: [], anchors: pending, line: node.position?.start.line ?? 1 };
      pending = [];
      result.push(current);
    } else if (node.type==='heading' && node.depth<depth) {
      current=undefined;
      pending=[];
    } else if (current) {
      if (pending.length) { current.nodes.push({ type: 'paragraph', children: [{ type: 'text', value: '' }] }); pending = []; }
      current.nodes.push(node);
    }
  }
  return result;
}

/** Preserve literal placeholders as code; strip old HTML anchor markup only. */
export function migrateHtml(body:string):string {
  const tree=parseMarkdown(body);
  visit(tree,'html',(node,index,parent)=>{
    if(index===undefined||!parent)return;
    const replacement=/^<\/?a(?:\s|>)/.test(node.value)?{type:'text' as const,value:''}:{type:'inlineCode' as const,value:node.value};
    (parent.children as unknown[])[index]=replacement;
  });
  return printMarkdown(tree);
}

export function headingIds(body: string): Set<string> {
  const slugger = new GithubSlugger();
  const ids = new Set<string>();
  visit(parseMarkdown(body), 'heading', node => { ids.add(slugger.slug(toString(node))); });
  return ids;
}

export function links(body: string): { url: string; line: number }[] {
  const result: ReturnType<typeof links> = [];
  visit(parseMarkdown(body), node => {
    if (node.type === 'link' || node.type === 'image' || node.type === 'definition') result.push({ url: node.url, line: node.position?.start.line ?? 1 });
  });
  return result;
}

export function rewriteLinks(body: string, resolve: (url: string) => string): string {
  const tree = parseMarkdown(body);
  visit(tree, node => {
    if (node.type === 'link' || node.type === 'image' || node.type === 'definition') node.url = resolve(node.url);
  });
  return printMarkdown(tree);
}

export function safeMarkdown(body: string, file: string): Diagnostic[] {
  const diagnostics: Diagnostic[] = [];
  visit(parseMarkdown(body), node => {
    if (node.type === 'html') diagnostics.push({ file, line: node.position?.start.line ?? 1, code: 'unsafe_html', severity: 'error', message: '普通内容不允许原始 HTML。', fix: '改用 Markdown；锚点由标题生成。' });
    if (node.type === 'link' || node.type === 'image' || node.type === 'definition') {
      const url = node.url.replace(/[\u0000-\u0020]/g, '');
      if (/^(?:javascript|data|vbscript|file):/i.test(url) || url.startsWith('//') || (node.type === 'image' && /^[a-z]+:/i.test(url))) diagnostics.push({ file, line: node.position?.start.line ?? 1, code: 'unsafe_url', severity: 'error', message: `不允许的链接：${url}`, fix: '使用 HTTPS 来源链接或仓库内相对路径；图片必须本地存储。' });
    }
  });
  return diagnostics;
}

export function entityHeadings(body: string, section: string): string[] {
  const part = sections(body, 2).find(x => x.title === section);
  return part ? part.nodes.filter(x => x.type === 'heading' && x.depth === 3).map(x => toString(x)) : [];
}

export function linkedParagraph(label: string, url: string): RootContent {
  const link: Link = { type: 'link', url, children: [{ type: 'text', value: label }] };
  return { type: 'paragraph', children: [link] };
}
