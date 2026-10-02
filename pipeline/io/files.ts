import fs from 'node:fs/promises';
import path from 'node:path';
import { parseDocument, stringify } from 'yaml';
import { parseTree, type Node as JsonNode, type ParseError } from 'jsonc-parser';
import { within } from '../core/identity.js';
import type { Frontmatter } from '../core/model.js';

export async function walk(root: string): Promise<string[]> {
  const result: string[] = [];
  for (const entry of await fs.readdir(root, { withFileTypes: true })) {
    const file = path.join(root, entry.name);
    if (entry.isSymbolicLink()) throw new Error(`不允许符号链接：${file}`);
    if (entry.isDirectory()) result.push(...await walk(file));
    else if (entry.isFile()) result.push(file);
  }
  return result.sort();
}
export function parseJson(text: string): unknown {
  const errors: ParseError[] = [];
  const tree = parseTree(text, errors, { allowTrailingComma: false, disallowComments: true });
  if (!tree || errors.length) throw new Error('JSON 语法错误');
  function check(node: JsonNode): void {
    if (node.type === 'object') {
      const keys = node.children?.map(x => x.children?.[0]?.value as string) ?? [];
      if (new Set(keys).size !== keys.length) throw new Error('JSON 含重复键');
    }
    node.children?.forEach(check);
  }
  check(tree);
  return JSON.parse(text);
}
export function parseYaml(text: string): unknown {
  const doc = parseDocument(text, { uniqueKeys: true });
  if (doc.errors.length) throw new Error(doc.errors.map(x => x.message).join('\n'));
  return doc.toJS();
}
export async function readData(file: string): Promise<unknown> {
  const text = await fs.readFile(file, 'utf8');
  return file.endsWith('.json') ? parseJson(text) : parseYaml(text);
}
export function readMarkdown(text: string): { frontmatter: Frontmatter; body: string; offset: number } {
  const match = text.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n/);
  if (!match) throw new Error('缺少 YAML frontmatter');
  return { frontmatter: parseYaml(match[1]!) as Frontmatter, body: text.slice(match[0].length).trim() + '\n', offset: match[0].split('\n').length - 1 };
}
export async function write(file: string, content: string | Uint8Array): Promise<void> {
  await fs.mkdir(path.dirname(file), { recursive: true });
  await fs.writeFile(file, content);
}
export const writeJson = (file: string, data: unknown): Promise<void> => write(file, JSON.stringify(data, null, 2) + '\n');
export const writeYaml = (file: string, data: unknown): Promise<void> => write(file, stringify(data));
export function checkedPath(root: string, relative: string): string {
  const file = path.resolve(root, relative);
  if (!within(root, file)) throw new Error(`路径越界：${relative}`);
  return file;
}
