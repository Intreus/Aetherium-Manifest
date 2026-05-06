import { createHash } from 'node:crypto';

function stableCanonicalize(value) {
  if (value === null || typeof value !== 'object') return JSON.stringify(value);
  if (Array.isArray(value)) return `[${value.map(stableCanonicalize).join(',')}]`;
  const keys = Object.keys(value).sort();
  return `{${keys.map((k) => `${JSON.stringify(k)}:${stableCanonicalize(value[k])}`).join(',')}}`;
}

export function semanticChecksum(payload) {
  return createHash('sha256').update(stableCanonicalize(payload)).digest('hex');
}
