import test from 'node:test';
import assert from 'node:assert/strict';
import { AetherPipeline } from '../../core/runtime/pipeline.js';

test('pipeline outputs deterministic uniform vector', () => {
  const pipeline = new AetherPipeline();
  const result = pipeline.run('hello world');

  assert.equal(result.uniforms.uMode, 0);
  assert.ok(Math.abs(result.uniforms.uEnergy - 0.4) <= 0.01);
  assert.ok(Math.abs(result.uniforms.uTurbulence - 0.1) <= 0.01);
  assert.ok(Math.abs(result.uniforms.uFlow - 0.4) <= 0.01);
});
