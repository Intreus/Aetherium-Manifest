import test from 'node:test';
import assert from 'node:assert/strict';
import fc from 'fast-check';
import { validateIRInvariants } from '../../core/runtime/irValidator.js';

const scalar01 = fc.double({ min: 0, max: 1, noNaN: true, noDefaultInfinity: true });

test('property: valid IR frames satisfy runtime invariants', async () => {
  await fc.assert(
    fc.asyncProperty(scalar01, scalar01, scalar01, scalar01, (confidence, energy, coherence, policyRisk) => {
      const turbulence = 1 - coherence;
      const ir = {
        anchor: { x: 0, y: 0, z: 0 },
        intent: 'manifest',
        confidence,
        energy,
        coherence,
        turbulence,
        flow: energy,
        policyRisk,
      };

      const result = validateIRInvariants(ir);
      assert.equal(result.ok, true);
      assert.deepEqual(result.violations, []);
    }),
    { numRuns: 200 }
  );
});
