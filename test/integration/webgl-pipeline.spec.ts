import test from 'node:test';
import assert from 'node:assert/strict';
import { AetherPipeline } from '../../core/runtime/pipeline.js';

const tolerance = 0.01;

test('webgl pipeline conformance vectors (tolerance ±0.01)', () => {
  const pipeline = new AetherPipeline();
  const { uniforms } = pipeline.run('?');

  assert.equal(uniforms.uMode, 0);
  assert.ok(Math.abs(uniforms.uEnergy - 0.4) <= tolerance);
  assert.ok(Math.abs(uniforms.uTurbulence - 0.3) <= tolerance);
  assert.ok(Math.abs(uniforms.uFlow - 0.4) <= tolerance);
});
