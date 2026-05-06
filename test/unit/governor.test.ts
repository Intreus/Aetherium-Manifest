import test from 'node:test';
import assert from 'node:assert/strict';
import { Governor, safeState } from '../../core/runtime/governor.js';

const governor = new Governor();

test('invalid input (NaN, missing fields) falls back to safeState()', () => {
  const invalid = { energy: Number.NaN, anchor: { x: Number.NaN } } as any;
  const safe = safeState(invalid);

  assert.equal(safe.energy, 0);
  assert.equal(safe.anchor.x, 0);
  assert.equal(safe.intent, 'default');
  assert.equal(safe.turbulence, 0.5);
});

test('overload policy dampens turbulence when energy > 0.9 and turbulence > 0.6', () => {
  const result = governor.process({
    anchor: { x: 0, y: 0, z: 0 },
    intent: 'complex',
    confidence: 0.9,
    energy: 0.95,
    coherence: 0.2,
    turbulence: 0.9,
    flow: 1,
    policyRisk: 0.1,
    contract: { condition: 'IF', behavior: 'THEN', principle: 'BECAUSE' },
  } as any);

  assert.ok(result.flags.includes('OVERLOAD_DAMPED'));
  assert.ok(Math.abs(result.turbulence - 0.585) <= 0.01);
});
