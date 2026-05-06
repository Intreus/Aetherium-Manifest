import test from 'node:test';
import assert from 'node:assert/strict';
import { mapIRToUniforms } from '../../engine/uniforms.js';

test('deterministic IR maps to expected uniforms', () => {
  const uniforms = mapIRToUniforms({
    anchor: { x: 0, y: 0, z: 0 },
    intent: 'question',
    confidence: 0.6,
    energy: 0.4,
    coherence: 0.7,
    turbulence: 0.3,
    flow: 0.4,
    policyRisk: 0.2,
    flags: [],
  } as any);

  assert.equal(uniforms.uMode, 0);
  assert.ok(Math.abs(uniforms.uEnergy - 0.4) <= 0.01);
  assert.ok(Math.abs(uniforms.uTurbulence - 0.3) <= 0.01);
  assert.ok(Math.abs(uniforms.uFlow - 0.4) <= 0.01);
});
