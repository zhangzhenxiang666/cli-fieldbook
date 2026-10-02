import { createHash } from 'node:crypto';
import path from 'node:path';
import type { Command, Kind } from './model.js';

export const hash = (value: string | Uint8Array): string => createHash('sha256').update(value).digest('hex');
export const idOf = (kind: Kind, id: string): string => `${kind}:${id}`;
export function stable(value: unknown): string {
  if (Array.isArray(value)) return `[${value.map(stable).join(',')}]`;
  if (value && typeof value === 'object') return `{${Object.entries(value).sort(([a], [b]) => a.localeCompare(b, 'en')).map(([k, v]) => `${JSON.stringify(k)}:${stable(v)}`).join(',')}}`;
  return JSON.stringify(value);
}
export const commandFile = (command: Command): string => `commands/${[...(command.slug ?? command.path), 'index.md'].join('/')}`;
export const safeToken = (token: string): boolean => /^[a-z0-9][a-z0-9_-]*$/i.test(token) && !/^(?:con|prn|aux|nul|com[1-9]|lpt[1-9])$/i.test(token);
export function within(root: string, candidate: string): boolean {
  const relative = path.relative(root, candidate);
  return relative === '' || (!relative.startsWith(`..${path.sep}`) && relative !== '..' && !path.isAbsolute(relative));
}
export function route(toolId: string, versionId: string, relative: string, base = '/cli-fieldbook/'): string {
  const pagePath = relative.replace(/\.md$/, '').replace(/(^|\/)index$/, '$1').replace(/\/$/, '');
  return `${base.replace(/\/$/, '')}/zh-cn/${encodeURIComponent(toolId)}/${encodeURIComponent(versionId)}/${pagePath ? pagePath + '/' : ''}`;
}
